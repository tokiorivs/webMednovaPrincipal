import 'server-only';
import { headers } from 'next/headers';

// Límite de intentos en memoria (un solo proceso). Es una barrera adicional:
// Supabase ya limita el login por su cuenta.
interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

export async function clientIp(): Promise<string> {
  const h = await headers();
  return h.get('x-forwarded-for')?.split(',')[0]?.trim() || h.get('x-real-ip') || 'unknown';
}

// Devuelve los segundos de espera si se superó el límite, o 0 si puede continuar.
export function checkLimit(key: string, max: number): number {
  const now = Date.now();
  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) return 0;
  return bucket.count >= max ? Math.ceil((bucket.resetAt - now) / 1000) : 0;
}

export function registerFailure(key: string, windowMs: number) {
  const now = Date.now();
  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
  } else {
    bucket.count += 1;
  }
  if (buckets.size > 5000) {
    for (const [k, b] of buckets) if (b.resetAt <= now) buckets.delete(k);
  }
}

export function clearLimit(key: string) {
  buckets.delete(key);
}
