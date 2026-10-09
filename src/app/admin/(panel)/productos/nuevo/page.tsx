import { getMediaHosts } from '@/lib/admin/settings';
import ProductForm, { EMPTY_PRODUCT } from '../../../_components/ProductForm';

export default async function NewProductPage() {
  const hosts = await getMediaHosts();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading font-light uppercase text-2xl sm:text-3xl text-white tracking-tight">Nuevo producto</h1>
        <p className="text-xs text-slate-400 mt-1">Empieza como borrador y publícalo cuando esté listo.</p>
      </div>
      <ProductForm productId={null} initial={EMPTY_PRODUCT} hosts={hosts} />
    </div>
  );
}
