import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/proxy';
import { isAdminConfigured } from '@/lib/supabase/config';

// Páginas de /admin accesibles sin sesión.
const PUBLIC_ADMIN_PATHS = ['/admin/login'];

// Comprobación optimista: la autorización real (rol + 2FA) se hace en cada
// página y acción mediante requireAdmin().
export async function proxy(request: NextRequest) {
  // Sin Supabase configurado nada del panel funciona: todo lleva al aviso del login.
  if (!isAdminConfigured()) {
    if (PUBLIC_ADMIN_PATHS.includes(request.nextUrl.pathname)) return NextResponse.next();
    const url = request.nextUrl.clone();
    url.pathname = '/admin/login';
    url.search = '';
    return NextResponse.redirect(url);
  }

  const { response, user } = await updateSession(request);
  const { pathname } = request.nextUrl;

  if (!user && !PUBLIC_ADMIN_PATHS.includes(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = '/admin/login';
    url.search = '';
    return NextResponse.redirect(url);
  }

  response.headers.set('Cache-Control', 'no-store');
  response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  return response;
}

export const config = {
  matcher: ['/admin/:path*'],
};
