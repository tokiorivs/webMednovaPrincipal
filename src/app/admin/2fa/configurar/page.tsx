import { redirect } from 'next/navigation';
import { getAdminState, pathForState } from '@/lib/admin/session';
import { AuthShell } from '../../_components/ui';
import EnrollClient from './EnrollClient';

export default async function EnrollPage() {
  // Se admite también el estado 'ok': al confirmar el código la sesión ya queda
  // verificada y esta pantalla debe seguir mostrando los códigos de recuperación.
  const state = await getAdminState();
  if (state.status !== 'needs_enroll' && state.status !== 'ok') redirect(pathForState(state));
  const { admin } = state;

  return (
    <AuthShell
      title="Configura tu 2FA"
      subtitle={`Cuenta ${admin.email}. Protege el acceso con Google Authenticator.`}
    >
      <EnrollClient alreadyActive={state.status === 'ok'} />
    </AuthShell>
  );
}
