export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
// Supabase llama a esta clave "anon" (antigua) o "publishable" (nueva): se acepta cualquiera.
export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '';

export function isSupabaseConfigured(): boolean {
  return Boolean(
    SUPABASE_URL &&
      SUPABASE_ANON_KEY &&
      SUPABASE_URL.startsWith('https://') &&
      !SUPABASE_URL.includes('placeholder')
  );
}

// El panel necesita además la clave secreta del servidor.
export function isAdminConfigured(): boolean {
  return isSupabaseConfigured() && Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);
}

// Opciones de las cookies de sesión: solo el servidor las lee (httpOnly).
export const AUTH_COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
  path: '/',
};
