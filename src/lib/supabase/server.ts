import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { AUTH_COOKIE_OPTIONS, SUPABASE_ANON_KEY, SUPABASE_URL } from './config';

// Cliente con la sesión del usuario (cookies). Solo para Server Components,
// Server Actions y Route Handlers.
export async function createSessionClient() {
  const cookieStore = await cookies();
  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, { ...options, ...AUTH_COOKIE_OPTIONS })
          );
        } catch {
          // Llamado desde un Server Component: el proxy ya refresca la sesión.
        }
      },
    },
  });
}
