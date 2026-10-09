'use client';

import { useActionState } from 'react';
import { Lock, Mail } from 'lucide-react';
import { signIn } from '../actions/auth';
import { Alert, Field, btnPrimary, inputCls } from '../_components/ui';

export default function LoginForm() {
  const [state, action, pending] = useActionState(signIn, undefined);

  return (
    <form action={action} className="space-y-5" autoComplete="on">
      {state?.error && <Alert>{state.error}</Alert>}

      <Field label="Correo electrónico">
        <div className="relative">
          <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            name="email"
            type="email"
            required
            autoComplete="username"
            className={`${inputCls} pl-10`}
            placeholder="tu@correo.com"
          />
        </div>
      </Field>

      <Field label="Contraseña">
        <div className="relative">
          <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className={`${inputCls} pl-10`}
            placeholder="••••••••••••"
          />
        </div>
      </Field>

      <button type="submit" disabled={pending} className={`${btnPrimary} w-full`}>
        {pending ? 'Verificando…' : 'Continuar'}
      </button>
    </form>
  );
}
