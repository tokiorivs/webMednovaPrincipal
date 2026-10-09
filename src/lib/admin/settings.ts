import 'server-only';
import { getServiceClient } from '@/lib/supabase/admin';
import { normalizeHost } from '@/lib/media';

const MEDIA_HOSTS_KEY = 'media_hosts';

// Dominios de Cloudflare (y similares) desde los que se aceptan imágenes, videos y PDF.
export async function getMediaHosts(): Promise<string[]> {
  const { data } = await getServiceClient().from('site_settings').select('value').eq('key', MEDIA_HOSTS_KEY).maybeSingle();
  const hosts = (data?.value as { hosts?: unknown } | undefined)?.hosts;
  if (!Array.isArray(hosts)) return [];
  return hosts.filter((h): h is string => typeof h === 'string' && normalizeHost(h) === h);
}

export async function setMediaHosts(hosts: string[], userId: string) {
  return getServiceClient()
    .from('site_settings')
    .upsert({ key: MEDIA_HOSTS_KEY, value: { hosts }, updated_at: new Date().toISOString(), updated_by: userId });
}
