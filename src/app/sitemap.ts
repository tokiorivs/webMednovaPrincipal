import { MetadataRoute } from 'next';
import { getAllProducts } from '@/lib/products';
import { SITE_URL, ALLOW_INDEXING } from '@/lib/site';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fase de pruebas: no anunciar URLs a los buscadores.
  if (!ALLOW_INDEXING) return [];

  const products = await getAllProducts();
  const siteUrl = SITE_URL;
  const now = new Date();

  const productRoutes = products.map((product) => ({
    url: `${siteUrl}/${product.category === 'consumible' ? 'consumibles' : 'equipos'}/${product.slug}`,
    // Productos del panel: fecha real de su última edición. Fichas a medida: ahora.
    lastModified: product.updated_at ? new Date(product.updated_at) : now,
    images: (product.images ?? []).map((img) => (img.startsWith('http') ? img : `${siteUrl}${img}`)),
    changeFrequency: 'weekly' as const,
    priority: product.slug === 'urolase-max' ? 0.9 : 0.7,
  }));

  const staticRoutes = [
    { path: '', changeFrequency: 'weekly' as const, priority: 1.0 },
    { path: '/equipos', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/consumibles', changeFrequency: 'weekly' as const, priority: 0.8 },
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
