'use client';

import { useRef, useState } from 'react';
import { Loader2, Upload } from 'lucide-react';
import { uploadProductImage } from '../actions/media';
import { btnGhost } from './ui';

export interface UploadedImage {
  path: string;
  url: string;
}

// Botón "Subir": envía las imágenes elegidas al servidor, que las optimiza y las guarda en Cloudflare R2.
export default function ImageUploadButton({
  folder,
  label = 'Subir',
  multiple = false,
  onUploaded,
}: {
  folder: string;
  label?: string;
  multiple?: boolean;
  onUploaded: (images: UploadedImage[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const upload = async (files: File[]) => {
    if (files.length === 0) return;
    setError(null);
    const done: UploadedImage[] = [];
    const failed: string[] = [];
    try {
      for (const [i, file] of files.entries()) {
        setBusy(files.length > 1 ? `Subiendo ${i + 1} de ${files.length}…` : 'Subiendo…');
        const fd = new FormData();
        fd.set('file', file);
        fd.set('folder', folder);
        const res = await uploadProductImage(fd);
        if (res.ok) done.push({ path: res.path, url: res.url });
        else failed.push(`${file.name}: ${res.error}`);
      }
    } catch {
      failed.push('No se pudo completar la subida (error de red o archivo demasiado grande).');
    } finally {
      setBusy(null);
      if (inputRef.current) inputRef.current.value = '';
    }
    if (done.length > 0) onUploaded(done);
    if (failed.length > 0) setError(failed.join('\n'));
  };

  return (
    <div className="space-y-1.5">
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
        multiple={multiple}
        className="hidden"
        onChange={(e) => upload(Array.from(e.target.files ?? []))}
      />
      <button type="button" className={btnGhost} disabled={busy !== null} onClick={() => inputRef.current?.click()}>
        {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
        {busy ?? label}
      </button>
      {error && <p className="text-xs text-rose-300 whitespace-pre-line">{error}</p>}
    </div>
  );
}
