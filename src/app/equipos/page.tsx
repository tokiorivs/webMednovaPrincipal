import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import EquiposView from '@/components/EquiposView';
import { getAllProducts } from '@/lib/products';
import { SITE_URL } from '@/lib/site';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Equipos médicos para urología en Perú',
  description:
    'Equipos láser y tecnología quirúrgica para urología. Distribuidor exclusivo de VPG LaserOne en Perú.',
  alternates: { canonical: `${SITE_URL}/equipos` },
};

export default async function EquiposPage() {
  const products = await getAllProducts();

  return (
    <div className="min-h-screen bg-[#f4f5f6] flex flex-col font-mono-tech selection:bg-teal-ink selection:text-white">
      <Navbar />
      <main className="flex-1 pt-16 sm:pt-20">
        <EquiposView products={products} />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
