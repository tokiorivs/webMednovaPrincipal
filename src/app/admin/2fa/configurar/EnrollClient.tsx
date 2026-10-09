'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { confirmEnroll, signOut, startEnroll } from '../../actions/auth';
import { Alert, Field, btnGhost, btnPrimary, inputCls } from '../../_components/ui';
import RecoveryCodes from '../../_components/RecoveryCodes';

type Stage =
  | { name: 'intro' }
  | { name: 'scan'; factorId: string; qr: string; secret: string }
  | { name: 'codes'; codes: string[] };

export default function EnrollClient({ alreadyActive }: { alreadyActive: boolean }) {
  const router = useRouter();
  const [stage, setStage] = useState<Stage>({ name: 'intro' });
  const [error, setError] = useState<string | null>(null);
  const [code, setCode] = useState('');
  const [pending, startTransition] = useTransition();

  const begin = () => {
    setError(null);
    startTransition(async () => {
      const res = await startEnroll();
      if (!res.ok) return setError(res.error);
      setStage({ name: 'scan', factorId: res.factorId, qr: res.qr, secret: res.secret });
    });
  };

  const confirm = (factorId: string) => {
    setError(null);
    startTransition(async () => {
      const res = await confirmEnroll(factorId, code);
      if (!res.ok) return setError(res.error);
      setStage({ name: 'codes', codes: res.codes });
    });
  };

  if (stage.name === 'intro' && alreadyActive) {
    return (
      <div className="space-y-5">
        <Alert kind="ok">Tu 2FA ya está activo.</Alert>
        <button onClick={() => router.replace('/admin')} className={`${btnPrimary} w-full`}>
          Ir al panel
        </button>
      </div>
    );
  }

  if (stage.name === 'intro') {
    return (
      <div className="space-y-5">
        {error && <Alert>{error}</Alert>}
        <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-300">
          <li>Instala <strong>Google Authenticator</strong> en tu teléfono.</li>
          <li>Escanea el código QR que te mostraremos.</li>
          <li>Escribe el código de 6 dígitos para confirmar.</li>
          <li>Guarda tus códigos de recuperación en un lugar seguro.</li>
        </ol>
        <button onClick={begin} disabled={pending} className={`${btnPrimary} w-full`}>
          {pending ? 'Generando…' : 'Generar código QR'}
        </button>
        <form action={signOut}>
          <button type="submit" className={`${btnGhost} w-full`}>
            Cerrar sesión
          </button>
        </form>
      </div>
    );
  }

  if (stage.name === 'scan') {
    return (
      <div className="space-y-5">
        {error && <Alert>{error}</Alert>}
        <div className="flex justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={stage.qr} alt="Código QR para Google Authenticator" className="w-48 h-48 bg-white rounded-xl p-2" />
        </div>
        <details className="text-xs text-slate-400">
          <summary className="cursor-pointer hover:text-white">¿No puedes escanear? Ingresa la clave manualmente</summary>
          <code className="block mt-2 break-all rounded-lg bg-slate-900 border border-slate-800 p-3 text-slate-200 select-all">
            {stage.secret}
          </code>
        </details>
        <Field label="Código de 6 dígitos">
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
        <button
          onClick={() => confirm(stage.factorId)}
          disabled={pending || code.replace(/\s/g, '').length !== 6}
          className={`${btnPrimary} w-full`}
        >
          {pending ? 'Verificando…' : 'Confirmar y activar'}
        </button>
      </div>
    );
  }

  return <RecoveryCodes codes={stage.codes} onDone={() => router.replace('/admin')} doneLabel="Entrar al panel" />;
}
