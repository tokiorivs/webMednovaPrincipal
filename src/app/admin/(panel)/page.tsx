import Link from 'next/link';
import { Plus } from 'lucide-react';
import { getServiceClient } from '@/lib/supabase/admin';
import { INITIAL_PRODUCTS } from '@/lib/data';
import { btnPrimary } from '../_components/ui';
import ProductsTable, { type AdminProductRow } from '../_components/ProductsTable';

export default async function AdminProductsPage() {
  const { data, error } = await getServiceClient()
    .from('products')
    .select('id, name, slug, brand, model, specialty, category, status, images, updated_at')
    .order('created_at', { ascending: false });

  const rows: AdminProductRow[] = [
    // Fichas hechas a medida: se muestran como referencia, no se editan desde el panel.
    ...INITIAL_PRODUCTS.map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      brand: p.brand,
      model: p.model,
      specialty: p.specialty,
      category: p.category,
      status: p.status,
      image: p.images[0] ?? null,
      locked: true,
    })),
    ...((data ?? []) as Array<Omit<AdminProductRow, 'image' | 'locked'> & { images: string[] }>).map(
      ({ images, ...p }) => ({ ...p, image: images?.[0] ?? null, locked: false })
    ),
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-light uppercase text-2xl sm:text-3xl text-white tracking-tight">
            Catálogo de productos
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Crea equipos y consumibles. Al publicarlos aparecen solos en su página principal y se genera su enlace.
          </p>
        </div>
        <Link href="/admin/productos/nuevo" className={btnPrimary}>
          <Plus className="w-4 h-4" />
          Nuevo producto
        </Link>
      </div>

      {error && (
        <div role="alert" className="rounded-xl border border-rose-500/40 bg-rose-500/10 text-rose-200 px-4 py-3 text-sm">
          No se pudieron cargar los productos. Revisa que el esquema SQL esté aplicado en Supabase.
        </div>
      )}

      <ProductsTable rows={rows} />
    </div>
  );
}
