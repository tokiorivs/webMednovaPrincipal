import { MetadataRoute } from 'next';
import { INITIAL_PRODUCTS } from '@/lib/data';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mednovatechnologies.com';
  const now = new Date();

  const productRoutes = INITIAL_PRODUCTS.map((product) => ({
    url: `${siteUrl}/${product.category === 'consumible' ? 'consumibles' : 'equipos'}/${product.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: product.slug === 'urolase-max' ? 0.9 : 0.7,
  }));

  const staticRoutes = [
    { path: '', changeFrequency: 'weekly' as const, priority: 1.0 },
    { path: '/contacto', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/pilares-empresariales', changeFrequency: 'monthly' as const, priority: 0.5 },
    { path: '/politicas-de-privacidad', changeFrequency: 'yearly' as const, priority: 0.2 },
    { path: '/terminos-y-condiciones', changeFrequency: 'yearly' as const, priority: 0.2 },
  ].map((r) => ({
    url: `${siteUrl}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  return [...staticRoutes, ...productRoutes];
}
