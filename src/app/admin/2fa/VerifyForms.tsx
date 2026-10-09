'use client';

import { useActionState, useState } from 'react';
import { KeyRound, ShieldCheck } from 'lucide-react';
import { signOut, redeemRecoveryCode, verifyTotp } from '../actions/auth';
import { Alert, Field, btnGhost, btnPrimary, inputCls } from '../_components/ui';

export default function VerifyForms() {
  const [mode, setMode] = useState<'totp' | 'recovery'>('totp');
  const [totpState, totpAction, totpPending] = useActionState(verifyTotp, undefined);
  const [recState, recAction, recPending] = useActionState(redeemRecoveryCode, undefined);

  return (
    <div className="space-y-5">
      {mode === 'totp' ? (
        <form action={totpAction} className="space-y-5">
          {totpState?.error && <Alert>{totpState.error}</Alert>}
          <Field label="Código de 6 dígitos" hint="Abre Google Authenticator y escribe el código de Mednova Admin.">
            <div className="relative">
              <ShieldCheck className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                name="code"
                inputMode="numeric"
                pattern="[0-9 ]{6,7}"
                maxLength={7}
                autoComplete="one-time-code"
                autoFocus
                required
                className={`${inputCls} pl-10 tracking-[0.4em] text-lg`}
                placeholder="000000"
              />
            </div>
          </Field>
          <button type="submit" disabled={totpPending} className={`${btnPrimary} w-full`}>
            {totpPending ? 'Verificando…' : 'Verificar'}
          </button>
          <button
            type="button"
            onClick={() => setMode('recovery')}
            className="w-full text-xs text-slate-400 hover:text-white underline underline-offset-4 cursor-pointer"
          >
            No tengo mi teléfono: usar código de recuperación
          </button>
        </form>
      ) : (
        <form action={recAction} className="space-y-5">
          <Alert kind="info">
            Un código de recuperación se usa una sola vez y desactiva tu Authenticator actual: después tendrás
            que configurar uno nuevo.
          </Alert>
          {recState?.error && <Alert>{recState.error}</Alert>}
          <Field label="Código de recuperación" hint="Formato XXXXX-XXXXX">
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                name="code"
                autoComplete="off"
                autoFocus
                required
                className={`${inputCls} pl-10 uppercase tracking-widest`}
                placeholder="ABCDE-FGHJK"
              />
            </div>
          </Field>
          <button type="submit" disabled={recPending} className={`${btnPrimary} w-full`}>
            {recPending ? 'Verificando…' : 'Usar código de recuperación'}
          </button>
          <button
            type="button"
            onClick={() => setMode('totp')}
            className="w-full text-xs text-slate-400 hover:text-white underline underline-offset-4 cursor-pointer"
          >
            Volver al código de la app
          </button>
        </form>
      )}

      <form action={signOut} className="pt-2 border-t border-slate-800">
        <button type="submit" className={`${btnGhost} w-full`}>
          Cancelar y cerrar sesión
        </button>
      </form>
    </div>
  );
}
