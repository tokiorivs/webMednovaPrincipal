// Compresión de PDF pesados EN EL NAVEGADOR (solo se importa desde componentes de cliente).
// Dibuja cada página y la convierte en una imagen JPEG: así un brochure de decenas de MB queda en
// pocos MB sin subir nunca el archivo original al servidor.

export const MAX_PAGES = 30;
export const TARGET_BYTES = 18 * 1024 * 1024; // margen bajo el límite de 20 MB del servidor

export interface CompressedPdf {
  files: File[];
  pages: number;
  totalBytes: number;
}

// De más a menos calidad: se usa la primera que deje el total por debajo de TARGET_BYTES.
const LADDER = [
  { longSide: 2200, quality: 0.85 },
  { longSide: 1800, quality: 0.78 },
  { longSide: 1400, quality: 0.7 },
];

function canvasToJpeg(canvas: HTMLCanvasElement, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('No se pudo crear la imagen de la página.'))), 'image/jpeg', quality);
  });
}

export async function compressPdfToImages(file: File, onProgress?: (done: number, total: number) => void): Promise<CompressedPdf> {
  const pdfjs = await import('pdfjs-dist');
  pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();

  const data = new Uint8Array(await file.arrayBuffer());
  const task = pdfjs.getDocument({ data });
  const doc = await task.promise;
  try {
    if (doc.numPages > MAX_PAGES) {
      throw new Error(`El PDF tiene ${doc.numPages} páginas y el máximo es ${MAX_PAGES}. Deja solo las páginas del producto.`);
    }

    for (const step of LADDER) {
      const files: File[] = [];
      let total = 0;
      for (let n = 1; n <= doc.numPages; n++) {
        onProgress?.(n - 1, doc.numPages);
        const page = await doc.getPage(n);
        const base = page.getViewport({ scale: 1 });
        const scale = step.longSide / Math.max(base.width, base.height);
        const viewport = page.getViewport({ scale });

        const canvas = document.createElement('canvas');
        canvas.width = Math.ceil(viewport.width);
        canvas.height = Math.ceil(viewport.height);
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Tu navegador no permite comprimir el PDF.');
        // Fondo blanco: los PDF con transparencia saldrían negros en JPEG.
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        await page.render({ canvas, canvasContext: ctx, viewport }).promise;
        const blob = await canvasToJpeg(canvas, step.quality);
        files.push(new File([blob], `pagina-${String(n).padStart(2, '0')}.jpg`, { type: 'image/jpeg' }));
        total += blob.size;

        canvas.width = 0;
        canvas.height = 0;
        page.cleanup();
      }
      onProgress?.(doc.numPages, doc.numPages);
      if (total <= TARGET_BYTES) return { files, pages: doc.numPages, totalBytes: total };
    }
    throw new Error('Aun comprimido, el PDF sigue siendo demasiado pesado. Deja solo las páginas del producto.');
  } finally {
    await task.destroy();
  }
}
