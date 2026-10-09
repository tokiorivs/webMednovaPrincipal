import 'server-only';
import { getServiceClient } from '@/lib/supabase/admin';
import type { AdminRow } from './session';

// Registro de auditoría: nunca debe romper la acción principal si falla.
export async function audit(
  actor: Pick<AdminRow, 'user_id' | 'email'> | null,
  action: string,
  entity?: string,
  entityId?: string,
  detail?: Record<string, unknown>
) {
  try {
    await getServiceClient().from('audit_log').insert({
      user_id: actor?.user_id ?? null,
      email: actor?.email ?? null,
      action,
      entity: entity ?? null,
      entity_id: entityId ?? null,
      detail: detail ?? null,
    });
  } catch (err) {
    console.error('No se pudo registrar la auditoría', err);
  }
}
