import { requireStep } from '@/lib/admin/session';
import { AuthShell } from '../_components/ui';
import ChangePasswordForm from './ChangePasswordForm';

export default async function ChangePasswordPage() {
  const { admin } = await requireStep('must_change_password');

  return (
    <AuthShell
      title="Crea tu contraseña"
      subtitle={`Cuenta ${admin.email}. La contraseña temporal solo sirve para este primer ingreso.`}
    >
      <ChangePasswordForm />
    </AuthShell>
  );
}
