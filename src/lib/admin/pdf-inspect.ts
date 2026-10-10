// Inspección profunda de un PDF antes de publicarlo para descarga. Solo servidor.
// Abre el documento con pdf.js (el mismo motor que usa Firefox), que descomprime los bloques internos
// y lee de verdad sus acciones, adjuntos y anotaciones. Así no depende de buscar palabras en el texto,
// que un PDF puede ocultar comprimiéndolas. Sigue sin ser un antivirus.
import { PdfError } from './pdf-check';

const MAX_PAGES = 200;
const TIMEOUT_MS = 20_000;
const DANGEROUS_SUBTYPES = new Set(['FileAttachment', 'Movie', 'Sound', 'Screen', 'RichMedia', '3D']);
const DANGEROUS_URL = /^\s*(javascript|file|data|vbscript):/i;

type Annotation = { subtype?: string; attachment?: unknown; unsafeUrl?: string; url?: string; jsAction?: unknown; actions?: Record<string, unknown> };

export async function inspectPdf(bytes: Buffer): Promise<void> {
  const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');

  const task = pdfjs.getDocument({
    data: new Uint8Array(bytes),
    enableXfa: false,
    useSystemFonts: false,
    disableFontFace: true,
    verbosity: 0,
  });

  const timer = setTimeout(() => void task.destroy(), TIMEOUT_MS);
  try {
    let doc;
    try {
      doc = await task.promise;
    } catch (error) {
      if ((error as { name?: string }).name === 'PasswordException') {
        throw new PdfError('El PDF está protegido con contraseña. Expórtalo sin protección y vuelve a subirlo.');
      }
      console.error('pdf.js no pudo abrir el PDF', error);
      throw new PdfError('No se pudo leer el PDF: está dañado o tiene un formato no estándar. Expórtalo de nuevo como PDF estándar.');
    }

    if (doc.numPages > MAX_PAGES) {
      throw new PdfError(`El PDF tiene ${doc.numPages} páginas y el máximo para una descarga es ${MAX_PAGES}.`);
    }

    const hasJs = await doc.hasJSActions();
    const jsActions = await doc.getJSActions();
    if (hasJs || (jsActions && jsActions.size > 0)) {
      throw new PdfError('El PDF contiene scripts (JavaScript), que no se permiten en descargas públicas. Expórtalo de nuevo como PDF estándar.');
    }

    const attachments = await doc.getAttachments();
    if (attachments && attachments.size > 0) {
      throw new PdfError('El PDF tiene archivos adjuntos incrustados, que no se permiten en descargas públicas. Expórtalo de nuevo sin adjuntos.');
    }

    for (let n = 1; n <= doc.numPages; n++) {
      const page = await doc.getPage(n);
      const annotations = (await page.getAnnotations()) as Annotation[];
      for (const a of annotations) {
        if (a.subtype && DANGEROUS_SUBTYPES.has(a.subtype)) {
          throw new PdfError(`El PDF contiene elementos multimedia o adjuntos (${a.subtype}) en la página ${n}, que no se permiten en descargas públicas.`);
        }
        if (a.attachment || a.jsAction) {
          throw new PdfError(`El PDF tiene acciones o adjuntos ocultos en la página ${n}, que no se permiten en descargas públicas.`);
        }
        const url = a.unsafeUrl ?? a.url;
        if (typeof url === 'string' && DANGEROUS_URL.test(url)) {
          throw new PdfError(`El PDF contiene un enlace peligroso en la página ${n} (${url.slice(0, 20)}…).`);
        }
      }
      page.cleanup();
    }
  } finally {
    clearTimeout(timer);
    await task.destroy().catch(() => undefined);
  }
}
