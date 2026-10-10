'use server';

import { revalidatePath } from 'next/cache';
import { getServiceClient } from '@/lib/supabase/admin';
import { requireOwner } from '@/lib/admin/session';
import { audit } from '@/lib/admin/audit';
import { generateTempPassword } from '@/lib/admin/crypto';
import { emailSchema, uuidSchema } from '@/lib/admin/validation';
import type { ActionResult } from './products';

// Todas las acciones de este archivo son exclusivas del propietario.

export async function createAdminUser(
  emailInput: string
): Promise<ActionResult<{ email: string; tempPassword: string }>> {
  const owner = await requireOwner();

  const parsed = emailSchema.safeParse(emailInput);
  if (!parsed.success) return { ok: false, error: 'Correo no válido.' };
  const email = parsed.data;

  const service = getServiceClient();
  const tempPassword = generateTempPassword();

  const { data, error } = await service.auth.admin.createUser({
    email,
    password: tempPassword,
    email_confirm: true,
  });
  if (error || !data.user) {
    const exists = error?.message?.toLowerCase().includes('already');
    return {
      ok: false,
      error: exists ? 'Ya existe una cuenta con ese correo.' : 'No se pudo crear el usuario. Inténtalo de nuevo.',
    };
  }

  const { error: insertError } = await service.from('admins').insert({
    user_id: data.user.id,
    email,
    role: 'admin',
    active: true,
    must_change_password: true,
    created_by: owner.user_id,
  });
  if (insertError) {
    await service.auth.admin.deleteUser(data.user.id);
    return { ok: false, error: 'No se pudo registrar al administrador.' };
  }

  await audit(owner, 'user_created', 'admin', data.user.id, { email });
  revalidatePath('/admin/usuarios');
  return { ok: true, email, tempPassword };
}

export async function setUserActive(userId: string, active: boolean): Promise<ActionResult> {
  const owner = await requireOwner();
  if (!uuidSchema.safeParse(userId).success) return { ok: false, error: 'Usuario no válido.' };
  if (userId === owner.user_id) return { ok: false, error: 'No puedes desactivar tu propia cuenta.' };

  const service = getServiceClient();
  const { data: target } = await service.from('admins').select('email, role').eq('user_id', userId).maybeSingle();
  if (!target) return { ok: false, error: 'Usuario no encontrado.' };
  if (target.role === 'owner') return { ok: false, error: 'No se puede desactivar al propietario.' };

  const { error } = await service.from('admins').update({ active }).eq('user_id', userId);
  if (error) return { ok: false, error: 'No se pudo actualizar el usuario.' };

  // Además bloquea el inicio de sesión en Supabase mientras esté desactivado.
  await service.auth.admin.updateUserById(userId, { ban_duration: active ? 'none' : '876000h' });

  await audit(owner, active ? 'user_activated' : 'user_deactivated', 'admin', userId, { email: target.email });
  revalidatePath('/admin/usuarios');
  return { ok: true };
}

// Quita el Google Authenticator del usuario: deberá configurar uno nuevo en su próximo ingreso.
export async function resetUserMfa(userId: string): Promise<ActionResult> {
  const owner = await requireOwner();
  if (!uuidSchema.safeParse(userId).success) return { ok: false, error: 'Usuario no válido.' };
  if (userId === owner.user_id) {
    return { ok: false, error: 'Tu propio 2FA no se puede resetear desde aquí.' };
  }

  const service = getServiceClient();
  const { data: target } = await service.from('admins').select('email').eq('user_id', userId).maybeSingle();
  if (!target) return { ok: false, error: 'Usuario no encontrado.' };

  const { data: factors } = await service.auth.admin.mfa.listFactors({ userId });
  for (const factor of factors?.factors ?? []) {
    await service.auth.admin.mfa.deleteFactor({ id: factor.id, userId });
  }
  await service.from('recovery_codes').delete().eq('user_id', userId);

  await audit(owner, 'user_mfa_reset', 'admin', userId, { email: target.email });
  revalidatePath('/admin/usuarios');
  return { ok: true };
}

// Genera una nueva contraseña temporal (p. ej. si el usuario la olvidó).
export async function resetUserPassword(userId: string): Promise<ActionResult<{ tempPassword: string }>> {
  const owner = await requireOwner();
  if (!uuidSchema.safeParse(userId).success) return { ok: false, error: 'Usuario no válido.' };
  if (userId === owner.user_id) {
    return { ok: false, error: 'Tu propia contraseña no se puede resetear desde aquí.' };
  }

  const service = getServiceClient();
  const { data: target } = await service.from('admins').select('email').eq('user_id', userId).maybeSingle();
  if (!target) return { ok: false, error: 'Usuario no encontrado.' };

  const tempPassword = generateTempPassword();
  const { error } = await service.auth.admin.updateUserById(userId, { password: tempPassword });
  if (error) return { ok: false, error: 'No se pudo generar la contraseña temporal.' };

  await service.from('admins').update({ must_change_password: true }).eq('user_id', userId);
  await audit(owner, 'user_password_reset', 'admin', userId, { email: target.email });
  revalidatePath('/admin/usuarios');
  return { ok: true, tempPassword };
}
