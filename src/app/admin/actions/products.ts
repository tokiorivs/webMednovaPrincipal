'use server';

import { revalidatePath } from 'next/cache';
import { getServiceClient } from '@/lib/supabase/admin';
import { requireAdmin } from '@/lib/admin/session';
import { audit } from '@/lib/admin/audit';
import { getMediaHosts } from '@/lib/admin/settings';
import { productInputSchema, type ProductInput } from '@/lib/admin/validation';
import { STATIC_SLUGS } from '@/lib/products';
import { validateMediaUrl } from '@/lib/media';

export type ActionResult<T = object> = ({ ok: true } & T) | { ok: false; error: string };

function revalidateCatalog(slug?: string) {
  revalidatePath('/equipos');
  revalidatePath('/consumibles');
  revalidatePath('/sitemap.xml');
  if (slug) {
    revalidatePath(`/equipos/${slug}`);
    revalidatePath(`/consumibles/${slug}`);
  }
}

export async function saveProduct(
  id: string | null,
  input: ProductInput
): Promise<ActionResult<{ id: string; slug: string }>> {
  const admin = await requireAdmin();

  const parsed = productInputSchema.safeParse(input);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return { ok: false, error: issue.message };
  }
  const data = parsed.data;

  if (STATIC_SLUGS.has(data.slug)) {
    return { ok: false, error: 'Ese enlace está reservado por una ficha existente. Elige otro.' };
  }

  // Todos los medios deben venir de dominios registrados en Ajustes.
  const hosts = await getMediaHosts();
  const images: string[] = [];
  for (const [i, raw] of data.images.entries()) {
    const check = validateMediaUrl(raw, 'image', hosts);
    if (!check.ok) return { ok: false, error: `Imagen ${i + 1}: ${check.error}` };
    images.push(check.url);
  }
  const infoBlocks: { image: string; title: string; subtitle?: string; description: string }[] = [];
  for (const [i, b] of data.info_blocks.entries()) {
    const check = validateMediaUrl(b.image, 'image', hosts);
    if (!check.ok) return { ok: false, error: `Más información, bloque ${i + 1}: ${check.error}` };
    infoBlocks.push({
      image: check.url,
      title: b.title,
      ...(b.subtitle ? { subtitle: b.subtitle } : {}),
      description: b.description,
    });
  }
  let heroMediaUrl: string | null = null;
  if (data.hero_media_url) {
    const check = validateMediaUrl(data.hero_media_url, 'promo', hosts);
    if (!check.ok) return { ok: false, error: `Imagen o video de portada: ${check.error}` };
    heroMediaUrl = check.url;
  }
  let brochureUrl: string | null = null;
  if (data.brochure_url) {
    const check = validateMediaUrl(data.brochure_url, 'pdf', hosts);
    if (!check.ok) return { ok: false, error: `Ficha PDF: ${check.error}` };
    brochureUrl = check.url;
  }

  let heroBackgroundUrl: string | null = null;
  if (data.hero_background_url) {
    const check = validateMediaUrl(data.hero_background_url, 'hero', hosts);
    if (!check.ok) return { ok: false, error: `Fondo de portada: ${check.error}` };
    heroBackgroundUrl = check.url;
  }

  if (data.status !== 'draft' && images.length === 0) {
    return { ok: false, error: 'Para publicar el producto agrega al menos una imagen.' };
  }

  const row = {
    name: data.name,
    slug: data.slug,
    h1: data.h1,
    brand: data.brand,
    model: data.model,
    specialty: data.specialty,
    category: data.category,
    tagline: data.tagline || null,
    short_description: data.short_description,
    full_description: data.full_description,
    images,
    hero_media_url: heroMediaUrl,
    video_url: null,
    brochure_url: brochureUrl,
    hero_background_url: heroBackgroundUrl,
    features: data.features,
    key_metrics: data.key_metrics.map((m) => ({
      label: m.label,
      value: m.value,
      ...(m.unit ? { unit: m.unit } : {}),
      ...(m.helper ? { helper: m.helper } : {}),
    })),
    info_blocks: infoBlocks,
    // Lista de pares: jsonb reordena las claves de un objeto, una lista conserva el orden.
    specifications: data.specifications,
    faqs: data.faqs,
    status: data.status,
    whatsapp_message: data.whatsapp_message || null,
  };

  const service = getServiceClient();
  const query = id
    ? service.from('products').update(row).eq('id', id).select('id, slug').single()
    : service.from('products').insert({ ...row, created_by: admin.user_id }).select('id, slug').single();

  const { data: saved, error } = await query;
  if (error || !saved) {
    if (error?.code === '23505') {
      return { ok: false, error: 'Ya existe un producto con ese enlace. Cambia el enlace e inténtalo de nuevo.' };
    }
    console.error('Error guardando producto', error);
    return { ok: false, error: 'No se pudo guardar el producto. Inténtalo de nuevo.' };
  }

  await audit(admin, id ? 'product_updated' : 'product_created', 'product', saved.id, {
    name: data.name,
    slug: data.slug,
    status: data.status,
  });
  revalidateCatalog(saved.slug);
  return { ok: true, id: saved.id, slug: saved.slug };
}

export async function setProductStatus(
  id: string,
  status: 'draft' | 'active' | 'featured'
): Promise<ActionResult> {
  const admin = await requireAdmin();
  if (!['draft', 'active', 'featured'].includes(status)) return { ok: false, error: 'Estado no válido.' };

  const service = getServiceClient();
  if (status !== 'draft') {
    const { data: current } = await service.from('products').select('images').eq('id', id).maybeSingle();
    if (!current || !Array.isArray(current.images) || current.images.length === 0) {
      return { ok: false, error: 'Para publicar el producto agrega al menos una imagen.' };
    }
  }

  const { data, error } = await service.from('products').update({ status }).eq('id', id).select('slug').single();
  if (error || !data) return { ok: false, error: 'No se pudo cambiar el estado.' };

  await audit(admin, 'product_status', 'product', id, { status });
  revalidateCatalog(data.slug);
  return { ok: true };
}

export async function deleteProduct(id: string): Promise<ActionResult> {
  const admin = await requireAdmin();
  const service = getServiceClient();

  const { data: product } = await service.from('products').select('name, slug').eq('id', id).maybeSingle();
  if (!product) return { ok: false, error: 'El producto ya no existe.' };

  const { error } = await service.from('products').delete().eq('id', id);
  if (error) return { ok: false, error: 'No se pudo eliminar el producto.' };

  await audit(admin, 'product_deleted', 'product', id, product);
  revalidateCatalog(product.slug);
  return { ok: true };
}
