import 'server-only';
import { Product } from '@/types/product';
import { INITIAL_PRODUCTS } from '@/lib/data';
import { getPublicClient } from '@/lib/supabase/public';

// Productos con página propia hecha a medida (no se administran desde el panel).
export const STATIC_SLUGS: ReadonlySet<string> = new Set(INITIAL_PRODUCTS.map((p) => p.slug));

export async function getDbProducts(): Promise<Product[]> {
  const supabase = getPublicClient();
  if (!supabase) return [];
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .in('status', ['active', 'featured'])
      .order('created_at', { ascending: false });
    if (error || !data) return [];
    return data as Product[];
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
