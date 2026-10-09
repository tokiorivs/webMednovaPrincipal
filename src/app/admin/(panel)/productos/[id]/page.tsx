import { notFound } from 'next/navigation';
import { getServiceClient } from '@/lib/supabase/admin';
import { getMediaHosts } from '@/lib/admin/settings';
import ProductForm, { EMPTY_PRODUCT } from '../../../_components/ProductForm';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!UUID_RE.test(id)) notFound();

  const { data: p } = await getServiceClient().from('products').select('*').eq('id', id).maybeSingle();
  if (!p) notFound();

  const hosts = await getMediaHosts();

  const initial = {
    ...EMPTY_PRODUCT,
    name: p.name,
    slug: p.slug,
    h1: p.h1 ?? p.name,
    brand: p.brand,
    model: p.model,
    specialty: p.specialty,
    category: p.category,
    tagline: p.tagline ?? '',
    short_description: p.short_description,
    full_description: p.full_description ?? '',
    images: p.images ?? [],
    hero_media_url: p.hero_media_url ?? p.video_url ?? '',
    brochure_url: p.brochure_url ?? '',
    hero_background_url: p.hero_background_url ?? '',
    // Siempre al menos 4 filas para completar (mínimo exigido).
    features: [...(p.features ?? []), ...Array(Math.max(0, 4 - (p.features ?? []).length)).fill('')],
    key_metrics: (p.key_metrics ?? []).map((m: { label: string; value: string; unit?: string; helper?: string }) => ({
      label: m.label,
      value: m.value,
      unit: m.unit ?? '',
      helper: m.helper ?? '',
    })),
    info_blocks: (p.info_blocks ?? []).map((b: { image: string; title: string; subtitle?: string; description: string }) => ({
      image: b.image,
      title: b.title,
      subtitle: b.subtitle ?? '',
      description: b.description,
    })),
    specifications: Array.isArray(p.specifications)
      ? (p.specifications as Array<{ key: string; value: string }>).map((s) => ({ key: s.key, value: String(s.value) }))
      : Object.entries((p.specifications ?? {}) as Record<string, string>).map(([key, value]) => ({
          key,
          value: String(value),
        })),
    faqs: p.faqs ?? [],
    status: p.status,
    whatsapp_message: p.whatsapp_message ?? '',
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading font-light uppercase text-2xl sm:text-3xl text-white tracking-tight">Editar producto</h1>
        <p className="text-xs text-slate-400 mt-1">{p.name}</p>
      </div>
      {/* key fuerza a reiniciar el formulario si se navega a otro producto */}
      <ProductForm key={p.id} productId={p.id} initial={initial} hosts={hosts} />
    </div>
  );
}
