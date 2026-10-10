import 'server-only';
import { Product } from '@/types/product';
import { INITIAL_PRODUCTS } from '@/lib/data';
import { getPublicClient } from '@/lib/supabase/public';

// Productos con página propia hecha a medida (no se administran desde el panel).
export const STATIC_SLUGS: ReadonlySet<string> = new Set(INITIAL_PRODUCTS.map((p) => p.slug));

// El panel guarda las características como lista de pares (conserva el orden);
// la web las usa como objeto. Se acepta también el formato antiguo (objeto).
function normalizeSpecs(raw: unknown): Record<string, string> {
  if (Array.isArray(raw)) {
    const out: Record<string, string> = {};
    for (const item of raw as Array<{ key?: string; value?: string }>) {
      if (item?.key) out[item.key] = String(item.value ?? '');
    }
    return out;
  }
  return (raw ?? {}) as Record<string, string>;
}

// Columnas visibles al público (deben coincidir con el GRANT SELECT de supabase-schema.sql).
// Se excluyen created_by y ai_review_accepted_* para no exponer IDs de administradores.
const PUBLIC_COLUMNS =
  'id, name, slug, seo_title, image_alts, h1, brand, model, specialty, category, short_description, ' +
  'full_description, images, brochure_url, video_url, hero_media_url, hero_background_url, tagline, ' +
  'key_metrics, info_blocks, system_advantages, faqs, features, specifications, status, ' +
  'whatsapp_message, created_at, updated_at';

export async function getDbProducts(): Promise<Product[]> {
  const supabase = getPublicClient();
  if (!supabase) return [];
  try {
    const { data, error } = await supabase
      .from('products')
      .select(PUBLIC_COLUMNS)
      .in('status', ['active', 'featured'])
      .order('created_at', { ascending: false });
    if (error || !data) return [];
    return (data as unknown as Product[]).map((p) => ({ ...p, specifications: normalizeSpecs(p.specifications) }));
  } catch {
    return [];
  }
}

// Catálogo completo para el sitio público: fichas a medida + productos del panel.
export async function getAllProducts(): Promise<Product[]> {
  const dbProducts = await getDbProducts();
  const extra = dbProducts.filter((p) => !STATIC_SLUGS.has(p.slug));
  return [...INITIAL_PRODUCTS, ...extra];
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const staticProduct = INITIAL_PRODUCTS.find((p) => p.slug === slug);
  if (staticProduct) return staticProduct;
  return (await getDbProducts()).find((p) => p.slug === slug);
}
