// URL pública del sitio. Se puede sobrescribir con NEXT_PUBLIC_SITE_URL al compilar.
// Por defecto usa el dominio que figura en el brochure oficial de Mednova.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mednovaperu.com').replace(/\/$/, '');
