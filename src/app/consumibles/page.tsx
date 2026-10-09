import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import ConsumiblesView from '@/components/ConsumiblesView';
import { getAllProducts } from '@/lib/products';
import { SITE_URL } from '@/lib/site';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Consumibles quirúrgicos para urología en Perú',
  description:
    'Fibras láser y consumibles quirúrgicos para urología. Distribuidor exclusivo de VPG LaserOne en Perú.',
  alternates: { canonical: `${SITE_URL}/consumibles` },
};

export default async function ConsumiblesPage() {
  const products = await getAllProducts();

  return (
    <div className="min-h-screen bg-[#f4f5f6] flex flex-col font-mono-tech selection:bg-teal-ink selection:text-white">
      <Navbar />
      <main className="flex-1 pt-16 sm:pt-20">
        <ConsumiblesView products={products} />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
