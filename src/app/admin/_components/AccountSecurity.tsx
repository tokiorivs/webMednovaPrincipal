'use client';

import { useState, useTransition } from 'react';
import { regenerateRecoveryCodes } from '../actions/auth';
import RecoveryCodes from './RecoveryCodes';
import { Alert, Field, btnPrimary, inputCls } from './ui';

export default function AccountSecurity() {
  const [code, setCode] = useState('');
  const [codes, setCodes] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const regenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const res = await regenerateRecoveryCodes(code);
      if (!res.ok) return setError(res.error);
      setCode('');
      setCodes(res.codes);
    });
  };

  return (
    <section className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5 max-w-xl">
      <div>
        <h2 className="font-heading text-lg text-white">Códigos de recuperación</h2>
        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
          Sirven para entrar si pierdes tu teléfono. Al generar códigos nuevos, <strong>los anteriores dejan de
          funcionar</strong>. Se muestran una sola vez.
        </p>
      </div>

      {codes ? (
        <RecoveryCodes codes={codes} onDone={() => setCodes(null)} doneLabel="Listo" />
      ) : (
        <form onSubmit={regenerate} className="space-y-4">
          {error && <Alert>{error}</Alert>}
          <Field label="Código actual de Google Authenticator" hint="Confirma que eres tú antes de generar códigos nuevos.">
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              inputMode="numeric"
              maxLength={7}
              autoComplete="one-time-code"
              className={`${inputCls} tracking-[0.4em] text-lg`}
              placeholder="000000"
            />
          </Field>
          <button type="submit" disabled={pending || code.replace(/\s/g, '').length !== 6} className={btnPrimary}>
            {pending ? 'Generando…' : 'Generar códigos nuevos'}
          </button>
        </form>
      )}
    </section>
  );
}
