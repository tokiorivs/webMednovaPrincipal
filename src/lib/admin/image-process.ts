// Procesamiento de imágenes antes de subirlas a Cloudflare R2. Solo servidor.
// Autocontenido (sin imports del proyecto) para poder probarlo de forma aislada.
import sharp, { type Metadata } from 'sharp';

export const MAX_UPLOAD_BYTES = 15 * 1024 * 1024; // imagen original
export const MAX_SIDE = 2000; // px del lado más largo tras optimizar
export const WEBP_QUALITY = 82;

// Formatos de entrada admitidos. SVG queda fuera a propósito: puede llevar scripts.
const ALLOWED_FORMATS = new Set(['jpeg', 'png', 'webp', 'gif', 'avif', 'heif', 'tiff']);

// Nombre seguro y legible para URL: minúsculas, sin tildes, solo letras, números y guiones.
export function slugifyName(input: string, fallback = 'imagen', max = 60): string {
  const slug = input
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/\.[a-z0-9]{2,5}$/i, '') // quita la extensión
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, max)
    .replace(/-+$/g, '');
  return slug || fallback;
}

export interface ProcessedImage {
  buffer: Buffer;
  width: number;
  height: number;
  originalFormat: string;
}

export class ImageError extends Error {}

// Valida que sea realmente una imagen (por su contenido, no por la extensión), la orienta según
// su EXIF, la reduce, la convierte a WebP y le quita los metadatos (ubicación, cámara, etc.).
export async function processImage(input: Buffer): Promise<ProcessedImage> {
  if (input.length === 0) throw new ImageError('El archivo está vacío.');
  if (input.length > MAX_UPLOAD_BYTES) throw new ImageError('La imagen pesa más de 15 MB.');

  let meta: Metadata;
  try {
    meta = await sharp(input, { limitInputPixels: 100_000_000 }).metadata();
  } catch {
    throw new ImageError('El archivo no es una imagen válida.');
  }
  if (!meta.format || !ALLOWED_FORMATS.has(meta.format)) {
    throw new ImageError('Formato no admitido. Usa JPG, PNG, WebP, GIF o AVIF.');
  }

  try {
    const { data, info } = await sharp(input, { limitInputPixels: 100_000_000 })
      .rotate()
      .resize({ width: MAX_SIDE, height: MAX_SIDE, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY })
      .toBuffer({ resolveWithObject: true });
    return { buffer: data, width: info.width, height: info.height, originalFormat: meta.format };
  } catch {
    throw new ImageError('No se pudo procesar la imagen.');
  }
}
