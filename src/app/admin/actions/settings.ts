'use server';

import { revalidatePath } from 'next/cache';
import { requireOwner } from '@/lib/admin/session';
import { audit } from '@/lib/admin/audit';
import { setMediaHosts } from '@/lib/admin/settings';
import { normalizeHost } from '@/lib/media';
import type { ActionResult } from './products';

// Recibe los enlaces/dominios de Cloudflare (uno por línea) y guarda solo los hosts.
export async function saveMediaHosts(raw: string): Promise<ActionResult<{ hosts: string[] }>> {
  const owner = await requireOwner();

  const entries = raw
    .split(/[\n,;]+/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (entries.length > 20) return { ok: false, error: 'Máximo 20 dominios.' };

  const hosts: string[] = [];
  for (const entry of entries) {
    const host = normalizeHost(entry);
    if (!host) {
      return { ok: false, error: `"${entry}" no es un dominio https válido (ej.: cdn.midominio.com).` };
    }
    if (!hosts.includes(host)) hosts.push(host);
  }

  const { error } = await setMediaHosts(hosts, owner.user_id);
  if (error) return { ok: false, error: 'No se pudo guardar. Inténtalo de nuevo.' };

  await audit(owner, 'settings_media_hosts', 'settings', 'media_hosts', { hosts });
  revalidatePath('/admin/ajustes');
  return { ok: true, hosts };
}
