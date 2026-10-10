// Comprobación básica de PDF antes de subirlo para descarga pública. Autocontenido.
// OJO: es una barrera básica, no un antivirus. Un PDF con contenido activo dentro de flujos
// comprimidos puede pasarla; por eso solo suben administradores con sesión y 2FA.

export const MAX_PDF_BYTES = 20 * 1024 * 1024;
export const WARN_PDF_BYTES = 8 * 1024 * 1024;

export class PdfError extends Error {}

// Marcas de contenido activo en PDF: scripts, lanzamiento de programas y archivos incrustados.
const ACTIVE_CONTENT = /\/(JavaScript|JS|Launch|EmbeddedFile|RichMedia)(?![A-Za-z0-9])/;

export function checkPdf(bytes: Buffer): void {
  if (bytes.length === 0) throw new PdfError('El archivo está vacío.');
  if (bytes.length > MAX_PDF_BYTES) throw new PdfError('El PDF pesa más de 20 MB.');
  if (bytes.subarray(0, 5).toString('latin1') !== '%PDF-') throw new PdfError('El archivo no es un PDF válido.');

  // Un PDF íntegro termina con %%EOF (se admite algo de basura después).
  const tail = bytes.subarray(Math.max(0, bytes.length - 2048)).toString('latin1');
  if (!tail.includes('%%EOF')) throw new PdfError('El PDF parece incompleto o dañado (no termina correctamente).');

  // Los nombres PDF admiten escapes (/J#61vaScript = /JavaScript): se decodifican antes de buscar.
  const text = bytes.toString('latin1').replace(/#([0-9A-Fa-f]{2})/g, (_, h: string) => String.fromCharCode(parseInt(h, 16)));

  if (/\/Encrypt\b/.test(text)) {
    throw new PdfError('El PDF está protegido con contraseña o cifrado. Expórtalo sin protección y vuelve a subirlo.');
  }
  if (ACTIVE_CONTENT.test(text)) {
    throw new PdfError('El PDF contiene scripts o archivos incrustados, que no se permiten en descargas públicas. Expórtalo de nuevo como PDF estándar.');
  }
}
