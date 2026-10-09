'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Check, Copy, KeyRound, ShieldOff, UserCheck, UserMinus, UserPlus } from 'lucide-react';
import { createAdminUser, resetUserMfa, resetUserPassword, setUserActive } from '../actions/users';
import { Alert, Field, btnGhost, btnPrimary, inputCls } from './ui';

export interface AdminUserRow {
  user_id: string;
  email: string;
  role: 'owner' | 'admin';
  active: boolean;
  must_change_password: boolean;
  created_at: string;
  hasMfa: boolean;
  isSelf: boolean;
}

interface Credentials {
  email: string;
  tempPassword: string;
}

export default function UsersManager({ rows }: { rows: AdminUserRow[] }) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [creds, setCreds] = useState<Credentials | null>(null);
  const [copied, setCopied] = useState(false);
  const [pending, startTransition] = useTransition();

  const create = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setNotice(null);
    startTransition(async () => {
      const res = await createAdminUser(email);
      if (!res.ok) return setError(res.error);
      setCreds({ email: res.email, tempPassword: res.tempPassword });
      setEmail('');
      router.refresh();
    });
  };

  const act = (task: () => Promise<{ ok: boolean; error?: string }>, okText: string) => {
    setError(null);
    setNotice(null);
    startTransition(async () => {
      const res = await task();
      if (!res.ok) return setError(res.error ?? 'No se pudo completar la acción.');
      setNotice(okText);
      router.refresh();
    });
  };

  const resetPassword = (u: AdminUserRow) => {
    if (!confirm(`¿Generar una contraseña temporal nueva para ${u.email}? La actual dejará de funcionar.`)) return;
    setError(null);
    setNotice(null);
    startTransition(async () => {
      const res = await resetUserPassword(u.user_id);
      if (!res.ok) return setError(res.error);
      setCreds({ email: u.email, tempPassword: res.tempPassword });
      router.refresh();
    });
  };

  const copyCreds = async () => {
    if (!creds) return;
    try {
      await navigator.clipboard.writeText(`Correo: ${creds.email}\nContraseña temporal: ${creds.tempPassword}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError('No se pudo copiar. Selecciona el texto y cópialo manualmente.');
    }
  };

  return (
    <div className="space-y-6">
      {error && <Alert>{error}</Alert>}
      {notice && <Alert kind="ok">{notice}</Alert>}

      {creds && (
        <div className="rounded-3xl border border-amber-500/40 bg-amber-500/10 p-6 space-y-3">
          <p className="text-sm font-semibold text-amber-200">Credenciales temporales — se muestran solo una vez</p>
          <p className="text-xs text-amber-100/80 leading-relaxed">
            Envíaselas a la persona por un canal seguro. En su primer ingreso deberá crear su propia contraseña y
            configurar su Google Authenticator.
          </p>
          <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 text-sm space-y-1 select-all">
            <p>
              <span className="text-slate-400">Correo:</span> {creds.email}
            </p>
            <p>
              <span className="text-slate-400">Contraseña temporal:</span>{' '}
              <span className="font-mono text-white">{creds.tempPassword}</span>
            </p>
          </div>
          <div className="flex gap-2">
            <button onClick={copyCreds} className={btnGhost}>
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copiado' : 'Copiar'}
            </button>
            <button onClick={() => setCreds(null)} className={btnGhost}>
              Ya las guardé
            </button>
          </div>
        </div>
      )}

      <form onSubmit={create} className="bg-slate-950 border border-slate-800 rounded-3xl p-6 space-y-4">
        <h2 className="font-heading text-lg text-white">Agregar administrador</h2>
        <div className="flex flex-col sm:flex-row gap-3 sm:items-end">
          <div className="flex-1">
            <Field label="Correo electrónico">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputCls}
                placeholder="persona@correo.com"
              />
            </Field>
          </div>
          <button type="submit" disabled={pending} className={btnPrimary}>
            <UserPlus className="w-4 h-4" />
            Crear acceso
          </button>
        </div>
      </form>

      <div className="bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-4 px-6">Usuario</th>
                <th className="py-4 px-6">Rol</th>
                <th className="py-4 px-6">2FA</th>
                <th className="py-4 px-6">Estado</th>
                <th className="py-4 px-6 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70">
              {rows.map((u) => (
                <tr key={u.user_id} className="hover:bg-slate-900/50">
                  <td className="py-4 px-6">
                    <p className="font-semibold text-white">{u.email}</p>
                    {u.isSelf && <p className="text-slate-500">Tu cuenta</p>}
                    {u.must_change_password && <p className="text-amber-300">Pendiente de primer ingreso</p>}
                  </td>
                  <td className="py-4 px-6 text-slate-300">{u.role === 'owner' ? 'Propietario' : 'Administrador'}</td>
                  <td className="py-4 px-6">
                    <span className={u.hasMfa ? 'text-emerald-400' : 'text-slate-500'}>
                      {u.hasMfa ? 'Activo' : 'Sin configurar'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={u.active ? 'text-emerald-400' : 'text-rose-300'}>
                      {u.active ? 'Activo' : 'Desactivado'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    {u.role === 'owner' ? (
                      <p className="text-right text-slate-500">—</p>
                    ) : (
                      <div className="flex flex-wrap items-center justify-end gap-2">
                        <button
                          onClick={() => resetPassword(u)}
                          disabled={pending}
                          title="Nueva contraseña temporal"
                          className={btnGhost}
                        >
                          <KeyRound className="w-3.5 h-3.5" />
                          Clave
                        </button>
                        <button
                          onClick={() => {
                            if (!confirm(`¿Quitar el Google Authenticator de ${u.email}? Tendrá que configurar uno nuevo.`)) return;
                            act(() => resetUserMfa(u.user_id), `2FA de ${u.email} reseteado.`);
                          }}
                          disabled={pending || !u.hasMfa}
                          title="Resetear 2FA"
                          className={btnGhost}
                        >
                          <ShieldOff className="w-3.5 h-3.5" />
                          2FA
                        </button>
                        <button
                          onClick={() =>
                            act(
                              () => setUserActive(u.user_id, !u.active),
                              u.active ? `${u.email} desactivado.` : `${u.email} reactivado.`
                            )
                          }
                          disabled={pending}
                          className={btnGhost}
                        >
                          {u.active ? <UserMinus className="w-3.5 h-3.5" /> : <UserCheck className="w-3.5 h-3.5" />}
                          {u.active ? 'Desactivar' : 'Reactivar'}
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
