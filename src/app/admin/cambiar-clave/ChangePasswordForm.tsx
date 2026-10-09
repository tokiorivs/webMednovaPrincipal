'use client';

import { useActionState } from 'react';
import { changePassword, signOut } from '../actions/auth';
import { Alert, Field, btnGhost, btnPrimary, inputCls } from '../_components/ui';

export default function ChangePasswordForm() {
  const [state, action, pending] = useActionState(changePassword, undefined);

  return (
    <div className="space-y-5">
      <form action={action} className="space-y-5">
        {state?.error && <Alert>{state.error}</Alert>}
        <Field label="Nueva contraseña" hint="Mínimo 12 caracteres, con mayúscula, minúscula y número.">
          <input name="password" type="password" required autoComplete="new-password" className={inputCls} />
        </Field>
        <Field label="Repite la contraseña">
          <input name="confirm" type="password" required autoComplete="new-password" className={inputCls} />
        </Field>
        <button type="submit" disabled={pending} className={`${btnPrimary} w-full`}>
          {pending ? 'Guardando…' : 'Guardar contraseña'}
        </button>
      </form>
      <form action={signOut}>
        <button type="submit" className={`${btnGhost} w-full`}>
          Cerrar sesión
        </button>
      </form>
    </div>
  );
}
