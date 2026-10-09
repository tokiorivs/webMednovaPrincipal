import { requireAdmin } from '@/lib/admin/session';
import AccountSecurity from '../../_components/AccountSecurity';

export default async function AccountPage() {
  const admin = await requireAdmin();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading font-light uppercase text-2xl sm:text-3xl text-white tracking-tight">Mi cuenta</h1>
        <p className="text-xs text-slate-400 mt-1">
          {admin.email} · {admin.role === 'owner' ? 'Propietario' : 'Administrador'}
        </p>
      </div>
      <AccountSecurity />
    </div>
  );
}
