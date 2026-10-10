import { MetadataRoute } from 'next';
import { SITE_URL, ALLOW_INDEXING } from '@/lib/site';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = SITE_URL;

  // Fase de pruebas: bloquear todo el sitio a los buscadores.
  if (!ALLOW_INDEXING) {
    return { rules: [{ userAgent: '*', disallow: '/' }] };
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
