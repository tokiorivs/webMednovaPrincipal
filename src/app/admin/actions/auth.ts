'use server';

import { redirect } from 'next/navigation';
import { createSessionClient } from '@/lib/supabase/server';
import { getServiceClient } from '@/lib/supabase/admin';
import { requireAdmin, requireStep } from '@/lib/admin/session';
import { audit } from '@/lib/admin/audit';
import { checkLimit, clearLimit, clientIp, registerFailure } from '@/lib/admin/ratelimit';
import { generateRecoveryCodes, hashRecoveryCode, normalizeRecoveryCode } from '@/lib/admin/crypto';
import { emailSchema, passwordSchema } from '@/lib/admin/validation';

export type FormState = { error?: string } | undefined;

const GENERIC_LOGIN_ERROR = 'Correo o contraseña incorrectos.';
const WINDOW_MS = 15 * 60 * 1000;

function waitMessage(seconds: number) {
  return `Demasiados intentos. Intenta de nuevo en ${Math.max(1, Math.ceil(seconds / 60))} min.`;
}

// ---------------------------------------------------------------------------
// Inicio y cierre de sesión
// ---------------------------------------------------------------------------

export async function signIn(_prev: FormState, formData: FormData): Promise<FormState> {
  const parsedEmail = emailSchema.safeParse(formData.get('email'));
  const password = String(formData.get('password') ?? '');
  if (!parsedEmail.success || !password) return { error: GENERIC_LOGIN_ERROR };
  const email = parsedEmail.data;

  const ipKey = `login:ip:${await clientIp()}`;
  const emailKey = `login:email:${email}`;
  const wait = Math.max(checkLimit(ipKey, 20), checkLimit(emailKey, 5));
  if (wait > 0) return { error: waitMessage(wait) };

  const supabase = await createSessionClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error || !data.user) {
    registerFailure(ipKey, WINDOW_MS);
    registerFailure(emailKey, WINDOW_MS);
    await audit(null, 'login_failed', 'auth', undefined, { email });
    return { error: GENERIC_LOGIN_ERROR };
  }

  // Tener cuenta no basta: debe estar en la lista de administradores y activo.
  const { data: row } = await getServiceClient()
    .from('admins')
    .select('user_id, email, active')
    .eq('user_id', data.user.id)
    .maybeSingle();

  if (!row || !row.active) {
    await supabase.auth.signOut();
    registerFailure(ipKey, WINDOW_MS);
    registerFailure(emailKey, WINDOW_MS);
    await audit(null, 'login_denied', 'auth', data.user.id, { email });
    return { error: GENERIC_LOGIN_ERROR };
  }

  clearLimit(emailKey);
  await audit({ user_id: row.user_id, email: row.email }, 'login_password_ok', 'auth', row.user_id);
  redirect('/admin');
}

export async function signOut() {
  const supabase = await createSessionClient();
  await supabase.auth.signOut();
  redirect('/admin/login');
}

// ---------------------------------------------------------------------------
// Cambio obligatorio de contraseña (primer ingreso con clave temporal)
// ---------------------------------------------------------------------------

export async function changePassword(_prev: FormState, formData: FormData): Promise<FormState> {
  const { admin } = await requireStep('must_change_password');

  const password = String(formData.get('password') ?? '');
  const confirm = String(formData.get('confirm') ?? '');
  const parsed = passwordSchema.safeParse(password);
  if (!parsed.success) return { error: parsed.error.issues[0].message };
  if (password !== confirm) return { error: 'Las contraseñas no coinciden.' };

  const supabase = await createSessionClient();
  const { error } = await supabase.auth.updateUser({ password });
  if (error) {
    return { error: 'No se pudo cambiar la contraseña. Usa una distinta a la temporal e inténtalo de nuevo.' };
  }

  await getServiceClient().from('admins').update({ must_change_password: false }).eq('user_id', admin.user_id);
  await audit(admin, 'password_changed', 'admin', admin.user_id);
  redirect('/admin');
}

// ---------------------------------------------------------------------------
// 2FA: alta de Google Authenticator
// ---------------------------------------------------------------------------

export type EnrollStart =
  | { ok: true; factorId: string; qr: string; secret: string }
  | { ok: false; error: string };

export async function startEnroll(): Promise<EnrollStart> {
  const { admin } = await requireStep('needs_enroll');
  const supabase = await createSessionClient();
  const service = getServiceClient();

  // Elimina intentos de alta anteriores que nunca se verificaron.
  const { data: factors } = await supabase.auth.mfa.listFactors();
  for (const factor of factors?.all ?? []) {
    if (factor.status === 'unverified') {
      await service.auth.admin.mfa.deleteFactor({ id: factor.id, userId: admin.user_id });
    }
  }

  const { data, error } = await supabase.auth.mfa.enroll({
    factorType: 'totp',
    issuer: 'Mednova Admin',
    friendlyName: `Authenticator ${new Date().toISOString().slice(0, 10)}`,
  });
  if (error || !data) return { ok: false, error: 'No se pudo generar el código QR. Inténtalo de nuevo.' };

  return { ok: true, factorId: data.id, qr: data.totp.qr_code, secret: data.totp.secret };
}

export type EnrollConfirm = { ok: true; codes: string[] } | { ok: false; error: string };

export async function confirmEnroll(factorId: string, code: string): Promise<EnrollConfirm> {
  const { admin } = await requireStep('needs_enroll');

  const key = `enroll:${admin.user_id}`;
  const wait = checkLimit(key, 8);
  if (wait > 0) return { ok: false, error: waitMessage(wait) };

  const cleanCode = code.replace(/\s/g, '');
  if (!/^\d{6}$/.test(cleanCode)) return { ok: false, error: 'Ingresa el código de 6 dígitos.' };

  const supabase = await createSessionClient();
  const { error } = await supabase.auth.mfa.challengeAndVerify({ factorId, code: cleanCode });
  if (error) {
    registerFailure(key, 10 * 60 * 1000);
    return { ok: false, error: 'Código incorrecto. Revisa la hora de tu teléfono e inténtalo de nuevo.' };
  }
  clearLimit(key);

  // Genera códigos de recuperación nuevos (invalida los anteriores).
  const service = getServiceClient();
  const codes = generateRecoveryCodes(10);
  await service.from('recovery_codes').delete().eq('user_id', admin.user_id);
  await service
    .from('recovery_codes')
    .insert(codes.map((c) => ({ user_id: admin.user_id, code_hash: hashRecoveryCode(c) })));

  await audit(admin, 'mfa_enrolled', 'admin', admin.user_id);
  return { ok: true, codes };
}

// ---------------------------------------------------------------------------
// 2FA: verificación al iniciar sesión
// ---------------------------------------------------------------------------

export async function verifyTotp(_prev: FormState, formData: FormData): Promise<FormState> {
  const { admin } = await requireStep('needs_verify');

  const key = `totp:${admin.user_id}`;
  const wait = checkLimit(key, 6);
  if (wait > 0) return { error: waitMessage(wait) };

  const code = String(formData.get('code') ?? '').replace(/\s/g, '');
  if (!/^\d{6}$/.test(code)) return { error: 'Ingresa el código de 6 dígitos.' };

  const supabase = await createSessionClient();
  const { data: factors } = await supabase.auth.mfa.listFactors();
  const factor = factors?.totp[0];
  if (!factor) redirect('/admin');

  const { error } = await supabase.auth.mfa.challengeAndVerify({ factorId: factor.id, code });
  if (error) {
    registerFailure(key, 10 * 60 * 1000);
    await audit(admin, 'mfa_failed', 'admin', admin.user_id);
    return { error: 'Código incorrecto o vencido.' };
  }

  clearLimit(key);
  await audit(admin, 'login_ok', 'admin', admin.user_id);
  redirect('/admin');
}

// Un código de recuperación (un solo uso) elimina el 2FA actual y obliga a
// configurar uno nuevo con otro teléfono.
export async function redeemRecoveryCode(_prev: FormState, formData: FormData): Promise<FormState> {
  const { admin } = await requireStep('needs_verify');

  const key = `recovery:${admin.user_id}`;
  const wait = checkLimit(key, 5);
  if (wait > 0) return { error: waitMessage(wait) };

  const normalized = normalizeRecoveryCode(String(formData.get('code') ?? ''));
  if (normalized.length !== 10) return { error: 'El código de recuperación tiene 10 caracteres (XXXXX-XXXXX).' };

  const service = getServiceClient();
  const { data: row } = await service
    .from('recovery_codes')
    .select('id')
    .eq('user_id', admin.user_id)
    .eq('code_hash', hashRecoveryCode(normalized))
    .is('used_at', null)
    .maybeSingle();

  if (!row) {
    registerFailure(key, 30 * 60 * 1000);
    await audit(admin, 'recovery_failed', 'admin', admin.user_id);
    return { error: 'Código de recuperación incorrecto o ya usado.' };
  }

  await service.from('recovery_codes').update({ used_at: new Date().toISOString() }).eq('id', row.id);

  const { data: factors } = await service.auth.admin.mfa.listFactors({ userId: admin.user_id });
  for (const factor of factors?.factors ?? []) {
    await service.auth.admin.mfa.deleteFactor({ id: factor.id, userId: admin.user_id });
  }

  clearLimit(key);
  await audit(admin, 'recovery_code_used', 'admin', admin.user_id);
  redirect('/admin');
}

// ---------------------------------------------------------------------------
// Cuenta: generar códigos de recuperación nuevos (invalida los anteriores)
// ---------------------------------------------------------------------------

export async function regenerateRecoveryCodes(code: string): Promise<EnrollConfirm> {
  const admin = await requireAdmin();

  const key = `regen:${admin.user_id}`;
  const wait = checkLimit(key, 5);
  if (wait > 0) return { ok: false, error: waitMessage(wait) };

  const cleanCode = code.replace(/s/g, '');
  if (!/^d{6}$/.test(cleanCode)) return { ok: false, error: 'Ingresa el código de 6 dígitos de tu Authenticator.' };

  // Se vuelve a pedir el código actual: una sesión abierta no basta para cambiar la recuperación.
  const supabase = await createSessionClient();
  const { data: factors } = await supabase.auth.mfa.listFactors();
  const factor = factors?.totp[0];
  if (!factor) return { ok: false, error: 'No tienes un 2FA configurado.' };

  const { error } = await supabase.auth.mfa.challengeAndVerify({ factorId: factor.id, code: cleanCode });
  if (error) {
    registerFailure(key, 10 * 60 * 1000);
    return { ok: false, error: 'Código incorrecto o vencido.' };
  }
  clearLimit(key);

  const service = getServiceClient();
  const codes = generateRecoveryCodes(10);
  await service.from('recovery_codes').delete().eq('user_id', admin.user_id);
  await service
    .from('recovery_codes')
    .insert(codes.map((c) => ({ user_id: admin.user_id, code_hash: hashRecoveryCode(c) })));

  await audit(admin, 'recovery_codes_regenerated', 'admin', admin.user_id);
  return { ok: true, codes };
}
