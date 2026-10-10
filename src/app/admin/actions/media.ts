'use server';

import { HeadObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { requireAdmin, type AdminRow } from '@/lib/admin/session';
import { audit } from '@/lib/admin/audit';
import { getMediaHosts } from '@/lib/admin/settings';
import { reserveQuota } from '@/lib/admin/ratelimit';
import { ImageError, processImage, slugifyName } from '@/lib/admin/image-process';
import { MAX_PDF_BYTES, PdfError, checkPdf } from '@/lib/admin/pdf-check';
import { inspectPdf } from '@/lib/admin/pdf-inspect';

const MAX_IMAGE_UPLOADS_PER_HOUR = 60;
const MAX_PDF_UPLOADS_PER_HOUR = 20;
const MAX_NAME_ATTEMPTS = 50;

export type UploadResult =
  | { ok: true; path: string; url: string; bytes: number; width?: number; height?: number }
  | { ok: false; error: string };

const r2Config = () => ({
  accountId: process.env.R2_ACCOUNT_ID?.trim() || '',
  accessKeyId: process.env.R2_ACCESS_KEY_ID?.trim() || '',
  secretAccessKey: process.env.R2_SECRET_ACCESS_KEY?.trim() || '',
  bucket: process.env.R2_BUCKET?.trim() || '',
});

// Indica si la subida a Cloudflare está configurada (nunca devuelve las claves).
export async function getUploadStatus(): Promise<{ configured: boolean }> {
  await requireAdmin();
  const c = r2Config();
  return { configured: Boolean(c.accountId && c.accessKeyId && c.secretAccessKey && c.bucket) };
}

async function exists(client: S3Client, bucket: string, key: string): Promise<boolean> {
  try {
    await client.send(new HeadObjectCommand({ Bucket: bucket, Key: key }));
    return true;
  } catch (error) {
    const status = (error as { $metadata?: { httpStatusCode?: number } }).$metadata?.httpStatusCode;
    if (status === 404) return false;
    throw error;
  }
}

type Ready = { ok: true; client: S3Client; bucket: string; host: string } | { ok: false; error: string };

// Comprueba la configuración y el límite por hora, y crea el cliente de R2.
async function prepare(admin: Pick<AdminRow, 'user_id'>, action: 'media_upload' | 'media_upload_pdf', maxPerHour: number): Promise<Ready> {
  const c = r2Config();
  if (!c.accountId || !c.accessKeyId || !c.secretAccessKey || !c.bucket) {
    return {
      ok: false,
      error: 'Falta configurar Cloudflare R2: agrega R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY y R2_BUCKET en .env.local y reinicia el servidor.',
    };
  }
  const hosts = await getMediaHosts();
  if (hosts.length === 0) return { ok: false, error: 'Primero registra el dominio público de tu bucket en Ajustes → Medios.' };

  // Reserva atómica del cupo antes de procesar y subir el archivo.
  const wait = await reserveQuota(`quota:${action}:${admin.user_id}`, maxPerHour, 60 * 60 * 1000);
  if (wait > 0) {
    return { ok: false, error: `Llegaste al límite de ${maxPerHour} subidas por hora. Inténtalo más tarde.` };
  }

  const client = new S3Client({
    region: 'auto',
    endpoint: `https://${c.accountId}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId: c.accessKeyId, secretAccessKey: c.secretAccessKey },
    // R2 no admite las sumas de verificación automáticas que el SDK añade por defecto.
    requestChecksumCalculation: 'WHEN_REQUIRED',
    responseChecksumValidation: 'WHEN_REQUIRED',
  });
  return { ok: true, client, bucket: c.bucket, host: hosts[0] };
}

// Guarda el archivo en R2 con un nombre que no existía (añade -2, -3… si hace falta).
async function putUnique(
  ready: Extract<Ready, { ok: true }>,
  folder: string,
  base: string,
  ext: string,
  body: Buffer,
  contentType: string,
  contentDisposition?: string,
): Promise<{ ok: true; key: string } | { ok: false; error: string }> {
  try {
    let key = '';
    for (let n = 1; n <= MAX_NAME_ATTEMPTS; n++) {
      const candidate = `${folder}/${n === 1 ? base : `${base}-${n}`}.${ext}`;
      if (!(await exists(ready.client, ready.bucket, candidate))) {
        key = candidate;
        break;
      }
    }
    if (!key) return { ok: false, error: 'Ya hay demasiados archivos con ese nombre en la carpeta. Usa otro nombre.' };

    await ready.client.send(
      new PutObjectCommand({
        Bucket: ready.bucket,
        Key: key,
        Body: body,
        ContentType: contentType,
        CacheControl: 'public, max-age=31536000, immutable',
        ...(contentDisposition ? { ContentDisposition: contentDisposition } : {}),
      }),
    );
    return { ok: true, key };
  } catch (error) {
    const name = (error as { name?: string }).name;
    if (name === 'InvalidAccessKeyId' || name === 'SignatureDoesNotMatch' || name === 'AccessDenied') {
      return { ok: false, error: 'Cloudflare rechazó las credenciales de R2. Revisa R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY y que el token tenga permiso de escritura en el bucket.' };
    }
    if (name === 'NoSuchBucket') {
      return { ok: false, error: 'El bucket configurado en R2_BUCKET no existe en esa cuenta de Cloudflare. Revisa R2_BUCKET y R2_ACCOUNT_ID.' };
    }
    console.error('Error subiendo archivo a R2', error);
    return { ok: false, error: 'No se pudo subir el archivo a Cloudflare. Inténtalo de nuevo.' };
  }
}

const publicUrl = (host: string, key: string) => `https://${host}/${key.split('/').map(encodeURIComponent).join('/')}`;

// Sube UNA imagen: la valida, la convierte a WebP optimizado y la guarda en R2 con un nombre limpio
// (carpeta del producto + nombre), sin sobrescribir nada existente. Devuelve la ruta para el campo.
export async function uploadProductImage(formData: FormData): Promise<UploadResult> {
  const admin = await requireAdmin();
  const file = formData.get('file');
  if (!(file instanceof File) || file.size === 0) return { ok: false, error: 'Elige una imagen.' };

  const ready = await prepare(admin, 'media_upload', MAX_IMAGE_UPLOADS_PER_HOUR);
  if (!ready.ok) return ready;

  let processed;
  try {
    processed = await processImage(Buffer.from(await file.arrayBuffer()));
  } catch (error) {
    if (error instanceof ImageError) return { ok: false, error: error.message };
    console.error('Error procesando imagen', error);
    return { ok: false, error: 'No se pudo procesar la imagen.' };
  }

  const folder = slugifyName(String(formData.get('folder') ?? ''), 'general', 50);
  const base = slugifyName(String(formData.get('name') ?? '') || file.name, 'imagen');
  const saved = await putUnique(ready, folder, base, 'webp', processed.buffer, 'image/webp');
  if (!saved.ok) return saved;

  await audit(admin, 'media_upload', 'media', undefined, {
    key: saved.key,
    bytes_in: file.size,
    bytes_out: processed.buffer.length,
    original_format: processed.originalFormat,
    width: processed.width,
    height: processed.height,
  });
  return {
    ok: true,
    path: saved.key,
    url: publicUrl(ready.host, saved.key),
    width: processed.width,
    height: processed.height,
    bytes: processed.buffer.length,
  };
}

// Sube UN PDF (ficha técnica descargable). Se guarda tal cual, sin recomprimir. Límites: 20 MB,
// 20 subidas por hora, y una comprobación básica de que es un PDF íntegro y sin contenido activo.
export async function uploadProductPdf(formData: FormData): Promise<UploadResult> {
  const admin = await requireAdmin();
  const file = formData.get('file');
  if (!(file instanceof File) || file.size === 0) return { ok: false, error: 'Elige un PDF.' };
  if (file.size > MAX_PDF_BYTES) {
    return { ok: false, error: `El PDF pesa ${(file.size / 1024 / 1024).toFixed(1)} MB y el máximo es ${MAX_PDF_BYTES / 1024 / 1024} MB. Comprímelo y vuelve a subirlo.` };
  }

  const ready = await prepare(admin, 'media_upload_pdf', MAX_PDF_UPLOADS_PER_HOUR);
  if (!ready.ok) return ready;

  const bytes = Buffer.from(await file.arrayBuffer());
  try {
    checkPdf(bytes);
    await inspectPdf(bytes);
  } catch (error) {
    if (error instanceof PdfError) return { ok: false, error: error.message };
    console.error('Error comprobando PDF', error);
    return { ok: false, error: 'No se pudo comprobar el PDF.' };
  }

  const folder = slugifyName(String(formData.get('folder') ?? ''), 'general', 50);
  const base = slugifyName(String(formData.get('name') ?? '') || file.name, 'ficha-tecnica');
  const saved = await putUnique(ready, folder, base, 'pdf', bytes, 'application/pdf', 'inline');
  if (!saved.ok) return saved;

  await audit(admin, 'media_upload_pdf', 'media', undefined, { key: saved.key, bytes: bytes.length });
  return { ok: true, path: saved.key, url: publicUrl(ready.host, saved.key), bytes: bytes.length };
}
