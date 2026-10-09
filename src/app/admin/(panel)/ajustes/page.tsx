import { requireOwner } from '@/lib/admin/session';
import { getMediaHosts } from '@/lib/admin/settings';
import MediaSettings from '../../_components/MediaSettings';

export default async function SettingsPage() {
  await requireOwner();
  const hosts = await getMediaHosts();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading font-light uppercase text-2xl sm:text-3xl text-white tracking-tight">Ajustes</h1>
        <p className="text-xs text-slate-400 mt-1">Configuración general del panel.</p>
      </div>
      <MediaSettings initialHosts={hosts} />
    </div>
  );
}
