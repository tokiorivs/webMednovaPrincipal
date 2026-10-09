import 'server-only';
import { cache } from 'react';
import { redirect } from 'next/navigation';
import { createSessionClient } from '@/lib/supabase/server';
import { getServiceClient } from '@/lib/supabase/admin';
import { isAdminConfigured } from '@/lib/supabase/config';

export type AdminRole = 'owner' | 'admin';

export interface AdminRow {
  user_id: string;
  email: string;
  role: AdminRole;
  active: boolean;
  must_change_password: boolean;
}

export type AdminState =
  | { status: 'anon' }
  | { status: 'not_admin' }
  | { status: 'must_change_password'; admin: AdminRow }
  | { status: 'needs_enroll'; admin: AdminRow }
  | { status: 'needs_verify'; admin: AdminRow }
  | { status: 'ok'; admin: AdminRow };

// Estado de acceso del usuario actual. Es la única fuente de verdad para decidir
// si alguien puede entrar al panel: sesión válida + estar en la tabla admins y
// activo + contraseña propia + 2FA verificado en ESTA sesión (nivel aal2).
export const getAdminState = cache(async (): Promise<AdminState> => {
  if (!isAdminConfigured()) return { status: 'anon' };

  const supabase = await createSessionClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { status: 'anon' };

  const { data: row } = await getServiceClient()
    .from('admins')
    .select('user_id, email, role, active, must_change_password')
    .eq('user_id', user.id)
    .maybeSingle();

  if (!row || !row.active) return { status: 'not_admin' };
  const admin = row as AdminRow;

  if (admin.must_change_password) return { status: 'must_change_password', admin };

  const { data: factors } = await supabase.auth.mfa.listFactors();
  // factors.totp solo incluye factores ya verificados.
  if (!factors || factors.totp.length === 0) return { status: 'needs_enroll', admin };

  const { data: aal } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
  if (aal?.currentLevel !== 'aal2') return { status: 'needs_verify', admin };

  return { status: 'ok', admin };
});

export function pathForState(state: AdminState): string {
  switch (state.status) {
    case 'anon':
      return '/admin/login';
    case 'not_admin':
      return '/admin/login?e=acceso';
    case 'must_change_password':
      return '/admin/cambiar-clave';
    case 'needs_enroll':
      return '/admin/2fa/configurar';
    case 'needs_verify':
      return '/admin/2fa';
    case 'ok':
      return '/admin';
  }
}

// Para páginas del panel y Server Actions: devuelve el admin o redirige al paso pendiente.
export async function requireAdmin(): Promise<AdminRow> {
  const state = await getAdminState();
  if (state.status !== 'ok') redirect(pathForState(state));
  return state.admin;
}

export async function requireOwner(): Promise<AdminRow> {
  const admin = await requireAdmin();
  if (admin.role !== 'owner') redirect('/admin');
  return admin;
}

// Para las pantallas intermedias (cambio de clave, 2FA): solo se ve si ese es el paso actual.
export async function requireStep<S extends AdminState['status']>(
  step: S
): Promise<Extract<AdminState, { status: S }>> {
  const state = await getAdminState();
  if (state.status !== step) redirect(pathForState(state));
  return state as Extract<AdminState, { status: S }>;
}
