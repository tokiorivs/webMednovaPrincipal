// URL pública del sitio. Se puede sobrescribir con NEXT_PUBLIC_SITE_URL al compilar.
// Por defecto usa el dominio que figura en el brochure oficial de Mednova.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mednovaperu.com').replace(/\/$/, '');

// Fase de pruebas: mientras NEXT_PUBLIC_ALLOW_INDEXING no sea "true", el sitio se oculta a Google
// (robots.txt, meta robots y cabecera X-Robots-Tag). Al lanzar, poner NEXT_PUBLIC_ALLOW_INDEXING=true y recompilar.
export const ALLOW_INDEXING = process.env.NEXT_PUBLIC_ALLOW_INDEXING === 'true';
