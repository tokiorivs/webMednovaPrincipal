import { redirect } from 'next/navigation';
import { getAdminState, pathForState } from '@/lib/admin/session';
import { isAdminConfigured } from '@/lib/supabase/config';
import { AuthShell, Alert } from '../_components/ui';
import LoginForm from './LoginForm';

export default async function AdminLoginPage({ searchParams }: { searchParams: Promise<{ e?: string }> }) {
  const { e } = await searchParams;

  if (!isAdminConfigured()) {
    return (
      <AuthShell title="Panel administrativo">
        <Alert>
          El panel aún no está configurado. Faltan las variables de Supabase en el servidor
          (<code>NEXT_PUBLIC_SUPABASE_URL</code>, <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> y{' '}
          <code>SUPABASE_SERVICE_ROLE_KEY</code>).
        </Alert>
      </AuthShell>
    );
  }

  // Si ya hay sesión completa (o un paso pendiente), continúa donde corresponda.
  const state = await getAdminState();
  if (state.status !== 'anon' && state.status !== 'not_admin') redirect(pathForState(state));

  return (
    <AuthShell title="Panel administrativo" subtitle="Acceso restringido al equipo de Mednova." showBack>
      {(e === 'acceso' || state.status === 'not_admin') && (
        <Alert>Tu cuenta no tiene acceso al panel. Si crees que es un error, contacta al propietario.</Alert>
      )}
      <LoginForm />
    </AuthShell>
  );
}
