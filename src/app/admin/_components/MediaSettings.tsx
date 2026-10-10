'use client';

import { useState, useTransition } from 'react';
import { saveMediaHosts } from '../actions/settings';
import { Alert, Field, btnPrimary, inputCls } from './ui';

export default function MediaSettings({ initialHosts }: { initialHosts: string[] }) {
  const [text, setText] = useState(initialHosts.join('\n'));
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState<string[] | null>(null);
  const [pending, startTransition] = useTransition();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaved(null);
    startTransition(async () => {
      const res = await saveMediaHosts(text);
      if (!res.ok) return setError(res.error);
      setSaved(res.hosts);
      setText(res.hosts.join('\n'));
    });
  };

  return (
    <form onSubmit={submit} className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5 max-w-3xl">
      <div>
        <h2 className="font-heading text-lg text-white">Medios — enlaces de Cloudflare</h2>
        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
          Pega el enlace público de tu bucket de Cloudflare R2 (por ejemplo <code>https://cdn.tudominio.com</code> o{' '}
          <code>https://pub-xxxx.r2.dev</code>), uno por línea. Solo se aceptarán imágenes, videos y PDF que
          provengan de estos dominios. YouTube, Vimeo y Cloudflare Stream se aceptan siempre para video.
        </p>
      </div>

      {error && <Alert>{error}</Alert>}
      {saved && (
        <Alert kind="ok">
          Guardado. Dominios permitidos: {saved.length > 0 ? saved.join(', ') : 'ninguno'}.
        </Alert>
      )}

      <Field label="Dominios permitidos" hint="Se guarda solo el dominio; la ruta del enlace se ignora. El PRIMERO es el dominio principal: al escribir solo el nombre de un archivo en un producto, se completa con él.">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className={`${inputCls} min-h-32 font-mono`}
          placeholder={'https://cdn.tudominio.com\nhttps://pub-xxxx.r2.dev'}
          spellCheck={false}
        />
      </Field>

      <button type="submit" disabled={pending} className={btnPrimary}>
        {pending ? 'Guardando…' : 'Guardar'}
      </button>
    </form>
  );
}
