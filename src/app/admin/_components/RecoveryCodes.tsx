'use client';

import { useState } from 'react';
import { Check, Copy, Download } from 'lucide-react';
import { Alert, btnGhost, btnPrimary } from './ui';

// Muestra los códigos de recuperación una sola vez. Se queda en pantalla hasta
// que la persona confirme que los guardó.
export default function RecoveryCodes({
  codes,
  onDone,
  doneLabel,
}: {
  codes: string[];
  onDone: () => void;
  doneLabel: string;
}) {
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const text = codes.join('\n');

  const download = () => {
    const blob = new Blob(
      [`Códigos de recuperación - Mednova Admin\n(cada código se usa una sola vez)\n\n${text}\n`],
      { type: 'text/plain' }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mednova-codigos-recuperacion.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError('No se pudo copiar. Selecciona los códigos y cópialos manualmente.');
    }
  };

  return (
    <div className="space-y-5">
      <Alert kind="ok">Guarda ahora tus códigos de recuperación.</Alert>
      <p className="text-xs text-slate-400 leading-relaxed">
        Cada código sirve <strong>una sola vez</strong> si pierdes tu teléfono. No se volverán a mostrar. Guárdalos
        impresos o en un gestor de contraseñas, nunca en el mismo teléfono.
      </p>
      <ul className="grid grid-cols-2 gap-2 rounded-xl bg-slate-900 border border-slate-800 p-4 font-mono text-sm text-white select-all">
        {codes.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
      {error && <Alert>{error}</Alert>}
      <div className="flex gap-2">
        <button type="button" onClick={copy} className={`${btnGhost} flex-1`}>
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copiado' : 'Copiar'}
        </button>
        <button type="button" onClick={download} className={`${btnGhost} flex-1`}>
          <Download className="w-4 h-4" />
          Descargar
        </button>
      </div>
      <label className="flex items-start gap-2 text-sm text-slate-300 cursor-pointer">
        <input type="checkbox" checked={saved} onChange={(e) => setSaved(e.target.checked)} className="mt-1" />
        <span>Ya guardé mis códigos de recuperación en un lugar seguro.</span>
      </label>
      <button type="button" onClick={onDone} disabled={!saved} className={`${btnPrimary} w-full`}>
        {doneLabel}
      </button>
    </div>
  );
}
