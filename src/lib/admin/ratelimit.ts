import 'server-only';
import { headers } from 'next/headers';
import { getServiceClient } from '@/lib/supabase/admin';

// Límites de intentos y cuotas guardados en Postgres (tabla rate_limits, funciones rl_*): se
// comparten entre procesos, sobreviven reinicios y las reservas son atómicas. Si la base de datos
// falla, se deniega (fail closed).
const DB_ERROR_WAIT = 60;

// IP del cliente. Con CLIENT_IP_HEADER (p. ej. "cf-connecting-ip" detrás de Cloudflare) se usa esa
// cabecera; si no, x-real-ip, y por último el ÚLTIMO valor de x-forwarded-for (el que añadió el
// proxy más cercano). El primer valor lo controla el cliente y no es confiable.
export async function clientIp(): Promise<string> {
  const h = await headers();
  const custom = process.env.CLIENT_IP_HEADER?.trim().toLowerCase();
  if (custom) {
    const v = h.get(custom)?.trim();
    if (v) return v;
  }
  const real = h.get('x-real-ip')?.trim();
  if (real) return real;
  const forwarded = h.get('x-forwarded-for')?.split(',').map((s) => s.trim()).filter(Boolean);
  return forwarded?.[forwarded.length - 1] || 'unknown';
}

// Devuelve los segundos de espera si se superó el límite, o 0 si puede continuar.
export async function checkLimit(key: string, max: number): Promise<number> {
  const { data, error } = await getServiceClient().rpc('rl_wait', { p_key: key, p_max: max });
  if (error) {
    console.error('rate limit (check)', error);
    return DB_ERROR_WAIT;
  }
  return Number(data) || 0;
}

export async function registerFailure(key: string, windowMs: number): Promise<void> {
  const { error } = await getServiceClient().rpc('rl_fail', { p_key: key, p_window_secs: Math.ceil(windowMs / 1000) });
  if (error) console.error('rate limit (fail)', error);
}

export async function clearLimit(key: string): Promise<void> {
  const { error } = await getServiceClient().rpc('rl_clear', { p_key: key });
  if (error) console.error('rate limit (clear)', error);
}

// Reserva atómica de un cupo ANTES de hacer el trabajo costoso (IA, subidas). Devuelve 0 si se
// reservó, o los segundos de espera si se agotó la cuota. Peticiones en paralelo no pueden pasarla.
export async function reserveQuota(key: string, max: number, windowMs: number): Promise<number> {
  const { data, error } = await getServiceClient().rpc('rl_reserve', {
    p_key: key,
    p_max: max,
    p_window_secs: Math.ceil(windowMs / 1000),
  });
  if (error) {
    console.error('rate limit (reserve)', error);
    return DB_ERROR_WAIT;
  }
  return Number(data) || 0;
}
