import { requireOwner } from '@/lib/admin/session';
import { getServiceClient } from '@/lib/supabase/admin';
import UsersManager, { type AdminUserRow } from '../../_components/UsersManager';

export default async function UsersPage() {
  const owner = await requireOwner();
  const service = getServiceClient();

  const { data: admins } = await service
    .from('admins')
    .select('user_id, email, role, active, must_change_password, created_at')
    .order('created_at', { ascending: true });

  // Estado del 2FA de cada usuario.
  const rows: AdminUserRow[] = await Promise.all(
    (admins ?? []).map(async (a) => {
      const { data } = await service.auth.admin.mfa.listFactors({ userId: a.user_id });
      const hasMfa = (data?.factors ?? []).some((f) => f.status === 'verified');
      return { ...a, hasMfa, isSelf: a.user_id === owner.user_id } as AdminUserRow;
    })
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading font-light uppercase text-2xl sm:text-3xl text-white tracking-tight">Usuarios</h1>
        <p className="text-xs text-slate-400 mt-1">
          Quién puede entrar al panel. Cada persona usa su propio correo, contraseña y Google Authenticator.
        </p>
      </div>
      <UsersManager rows={rows} />
    </div>
  );
}
