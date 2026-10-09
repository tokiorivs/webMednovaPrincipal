import { requireStep } from '@/lib/admin/session';
import { AuthShell } from '../_components/ui';
import VerifyForms from './VerifyForms';

export default async function TwoFactorPage() {
  const { admin } = await requireStep('needs_verify');

  return (
    <AuthShell
      title="Verificación en dos pasos"
      subtitle={`Hola, ${admin.email}. Ingresa el código de Google Authenticator para continuar.`}
    >
      <VerifyForms />
    </AuthShell>
  );
}
