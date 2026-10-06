import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProductsShowcase from '@/components/ProductsShowcase';
import AboutUs from '@/components/AboutUs';
import WhyUs from '@/components/WhyUs';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { fetchProducts } from '@/lib/supabase';
import { INITIAL_PRODUCTS } from '@/lib/data';

export default async function Home() {
  let products = INITIAL_PRODUCTS;
  try {
    const loaded = await fetchProducts();
    if (loaded && loaded.length > 0) {
      products = loaded;
    }
  } catch {
    // fallback to initial data
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mednovatechnologies.com';
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Mednova Technologies',
    url: siteUrl,
    logo: `${siteUrl}/images/logo_color_fondo_blanco_vertical.webp`,
    description: 'Distribuidor exclusivo de VPG LaserOne en Perú: láser de fibra de tulio Urolase MAX y fibras quirúrgicas OnePush.',
    telephone: '+51 913 698 837',
    email: 'contacto@mednovaperu.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Av. Javier Prado Este 4500',
      addressLocality: 'San Borja, Lima',
      addressCountry: 'PE',
    },
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
