import type { Product } from '@/types/product';
import { isHeroVideo } from './media';
import { SITE_URL } from './site';

// Utilidades SEO para las fichas de producto creadas desde el panel.

// Serializa datos estructurados para <script type="application/ld+json">: escapa «<» para que
// ningún texto pueda cerrar la etiqueta (</script>) e inyectar código.
export const jsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c');

export const absoluteUrl = (url: string) => (url.startsWith('http') ? url : `${SITE_URL}${url}`);

// Título de la página: el "Título SEO"; si no existe, el H1 y luego el nombre.
export function productSeoTitle(product: Product): string {
  return (product.seo_title || product.h1 || product.name).trim();
}

// Texto alternativo de la imagen i (o uno descriptivo de respaldo).
export function imageAlt(product: Product, index: number): string {
  const alt = product.image_alts?.[index]?.trim();
  return alt || `${product.name} - imagen ${index + 1}`;
}

// Imagen para redes sociales y buscadores: la promocional (si es imagen) o la primera de la galería.
export function socialImage(product: Product): string | null {
  const hero = product.hero_media_url;
  if (hero && !isHeroVideo(hero) && /\.(jpe?g|png|webp|avif|gif)(\?|$)/i.test(hero)) return absoluteUrl(hero);
  const first = product.images?.[0];
  return first ? absoluteUrl(first) : null;
}

// Datos estructurados schema.org/Product. No incluye precio ni reseñas: los equipos se cotizan,
// y Google sanciona los datos que no se ven en la página.
export function buildProductJsonLd(product: Product) {
  const base = product.category === 'consumible' ? 'consumibles' : 'equipos';
  const images = (product.images ?? []).map((src, i) => ({
    '@type': 'ImageObject',
    contentUrl: absoluteUrl(src),
    url: absoluteUrl(src),
    caption: imageAlt(product, i),
  }));
  const specs = Object.entries(product.specifications ?? {}).map(([name, value]) => ({
    '@type': 'PropertyValue',
    name,
    value,
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    url: `${SITE_URL}/${base}/${product.slug}`,
    sku: product.model,
    mpn: product.model,
    model: product.model,
    category: product.specialty,
    description: (product.full_description || product.short_description).slice(0, 5000),
    ...(images.length > 0 ? { image: images } : {}),
    brand: { '@type': 'Brand', name: product.brand },
    manufacturer: { '@type': 'Organization', name: product.brand },
    ...(specs.length > 0 ? { additionalProperty: specs } : {}),
  };
}
