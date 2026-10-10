'use client';

import { useRef, useState } from 'react';
import { Loader2, Upload } from 'lucide-react';
import { uploadProductPdf } from '../actions/media';
import { MAX_PDF_BYTES, WARN_PDF_BYTES } from '@/lib/admin/pdf-check';
import { btnGhost } from './ui';

const mb = (bytes: number) => (bytes / 1024 / 1024).toFixed(1);

// Botón "Subir PDF": sube la ficha técnica a Cloudflare R2 tal cual (sin recomprimir), con límites.
export default function PdfUploadButton({
  folder,
  name = 'ficha-tecnica',
  onUploaded,
}: {
  folder: string;
  name?: string;
  onUploaded: (path: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);

  const upload = async (file: File | undefined) => {
    if (!file) return;
    setError(null);
    setWarning(null);
    // Se rechaza aquí, antes de enviar nada, lo que el servidor rechazaría igual.
    if (file.size > MAX_PDF_BYTES) {
      setError(`El PDF pesa ${mb(file.size)} MB y el máximo es ${mb(MAX_PDF_BYTES)} MB. Comprímelo con un compresor de PDF y vuelve a subirlo.`);
      if (inputRef.current) inputRef.current.value = '';
      return;
    }
    setBusy(true);
    try {
      const fd = new FormData();
      fd.set('file', file);
      fd.set('folder', folder);
      fd.set('name', name);
      const res = await uploadProductPdf(fd);
      if (!res.ok) {
        setError(res.error);
        return;
      }
      onUploaded(res.path);
      if (res.bytes >= WARN_PDF_BYTES) {
        setWarning(
          `Subido, pero pesa ${mb(res.bytes)} MB: es mucho para una descarga. Conviene comprimirlo (la ficha ideal pesa de 1 a 5 MB) y volver a subirlo.`,
        );
      }
    } catch {
      setError('No se pudo completar la subida (error de red o archivo demasiado grande).');
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-1.5">
      <input ref={inputRef} type="file" accept="application/pdf,.pdf" className="hidden" onChange={(e) => upload(e.target.files?.[0])} />
      <button type="button" className={btnGhost} disabled={busy} onClick={() => inputRef.current?.click()}>
        {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
        {busy ? 'Subiendo…' : `Subir PDF desde mi equipo (máx. ${MAX_PDF_BYTES / 1024 / 1024} MB)`}
      </button>
      {error && <p className="text-xs text-rose-300">{error}</p>}
      {warning && <p className="text-xs text-amber-300">{warning}</p>}
    </div>
  );
}
