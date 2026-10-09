import { requireOwner } from '@/lib/admin/session';
import { getServiceClient } from '@/lib/supabase/admin';

const ACTION_LABELS: Record<string, string> = {
  login_ok: 'Inicio de sesión',
  login_password_ok: 'Contraseña correcta',
  login_failed: 'Intento de acceso fallido',
  login_denied: 'Acceso denegado (no es administrador)',
  mfa_failed: '2FA incorrecto',
  mfa_enrolled: '2FA configurado',
  recovery_code_used: 'Código de recuperación usado',
  recovery_failed: 'Código de recuperación incorrecto',
  recovery_codes_regenerated: 'Códigos de recuperación regenerados',
  password_changed: 'Contraseña cambiada',
  product_created: 'Producto creado',
  product_updated: 'Producto actualizado',
  product_status: 'Estado de producto cambiado',
  product_deleted: 'Producto eliminado',
  user_created: 'Usuario creado',
  user_activated: 'Usuario reactivado',
  user_deactivated: 'Usuario desactivado',
  user_mfa_reset: '2FA de usuario reseteado',
  user_password_reset: 'Contraseña de usuario reseteada',
  settings_media_hosts: 'Dominios de medios actualizados',
};

export default async function ActivityPage() {
  await requireOwner();
  const { data } = await getServiceClient()
    .from('audit_log')
    .select('id, email, action, entity, detail, created_at')
    .order('created_at', { ascending: false })
    .limit(150);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading font-light uppercase text-2xl sm:text-3xl text-white tracking-tight">Actividad</h1>
        <p className="text-xs text-slate-400 mt-1">Últimos 150 eventos de seguridad y cambios en el catálogo.</p>
      </div>

      <div className="bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-4 px-6">Fecha</th>
                <th className="py-4 px-6">Usuario</th>
                <th className="py-4 px-6">Acción</th>
                <th className="py-4 px-6">Detalle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70">
              {(data ?? []).map((row) => {
                const detail = row.detail as Record<string, unknown> | null;
                const summary = detail ? String(detail.name ?? detail.email ?? detail.slug ?? '') : '';
                return (
                  <tr key={row.id}>
                    <td className="py-3 px-6 text-slate-400 whitespace-nowrap">
                      {new Date(row.created_at).toLocaleString('es-PE', { timeZone: 'America/Lima' })}
                    </td>
                    <td className="py-3 px-6 text-slate-300">{row.email ?? (detail?.email as string | undefined) ?? '—'}</td>
                    <td className="py-3 px-6 text-white">{ACTION_LABELS[row.action] ?? row.action}</td>
                    <td className="py-3 px-6 text-slate-400">{summary}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {(data ?? []).length === 0 && <div className="text-center py-12 text-slate-500 text-xs">Sin actividad todavía.</div>}
        </div>
      </div>
    </div>
  );
}
