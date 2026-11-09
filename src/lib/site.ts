// URL pública del sitio. Se puede sobrescribir con NEXT_PUBLIC_SITE_URL al compilar.
// Por defecto usa el dominio que figura en el brochure oficial de Mednova.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mednovaperu.com').replace(/\/$/, '');

// Fase de pruebas: mientras NEXT_PUBLIC_ALLOW_INDEXING no sea "true", el sitio se oculta a Google
// (robots.txt, meta robots y cabecera X-Robots-Tag). Al lanzar, poner NEXT_PUBLIC_ALLOW_INDEXING=true y recompilar.
export const ALLOW_INDEXING = process.env.NEXT_PUBLIC_ALLOW_INDEXING === 'true';

// Imágenes y videos pesados se sirven desde Cloudflare R2 (bucket público). Se puede sobrescribir con
// NEXT_PUBLIC_ASSET_BASE_URL al compilar. El modelo 3D, los PDF, el favicon y la imagen social siguen en /public.
export const ASSET_BASE = (process.env.NEXT_PUBLIC_ASSET_BASE_URL || 'https://pub-3e46db5f69ac445b96d2cb6a5d6ed08b.r2.dev').replace(/\/$/, '');
export const asset = (path: string) => `${ASSET_BASE}${path}`;
