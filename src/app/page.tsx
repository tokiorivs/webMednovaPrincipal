import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProductsShowcase from '@/components/ProductsShowcase';
import AboutUs from '@/components/AboutUs';
import WhyUs from '@/components/WhyUs';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { INITIAL_PRODUCTS } from '@/lib/data';
import { SITE_URL } from '@/lib/site';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

export default function Home() {
  // El portafolio de portada muestra solo las fichas destacadas a medida.
  const products = INITIAL_PRODUCTS;

  const siteUrl = SITE_URL;
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Mednova Technologies',
    url: siteUrl,
    logo: `${siteUrl}/images/logo_color_fondo_blanco_vertical.webp`,
    description: 'Distribuidor exclusivo de VPG LaserOne en Perú: láser de fibra de tulio Urolase MAX y fibras quirúrgicas OnePush.',
    telephone: '+51 913 698 837',
    email: 'contacto@mednovaperu.com',
  };

  return (
    <div id="top" className="min-h-screen bg-[#f4f5f6] flex flex-col font-mono-tech selection:bg-teal-ink selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <div id="home" className="sr-only" />
      <Navbar />

      <main className="flex-1">
        <Hero />
        <ProductsShowcase products={products} />
        <AboutUs />
        <WhyUs />
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
