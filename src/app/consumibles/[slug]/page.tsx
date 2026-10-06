import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import FibrasDetailView from '@/components/FibrasDetailView';
import { INITIAL_PRODUCTS } from '@/lib/data';
import { fetchProducts } from '@/lib/supabase';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return INITIAL_PRODUCTS
    .filter((p) => p.category === 'consumible')
    .map((product) => ({
      slug: product.slug,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  let products = INITIAL_PRODUCTS;
  try {
    const loaded = await fetchProducts();
    if (loaded && loaded.length > 0) {
      products = loaded;
    }
  } catch {
    // fallback to initial data
  }

  const product = products.find((p) => p.slug === slug || p.id === slug);

  if (!product) {
    return {
      title: 'Consumible no encontrado • Mednova Technologies',
    };
  }

  const isFibers = product.slug === 'fibras-quirurgicas-vpg';

  const metaTitle = isFibers
    ? 'Fibras Quirúrgicas VPG LaserOne (OnePush™ & SMA-905) • Fibras Ópticas Perú'
    : `${product.name} (${product.model}) • Consumibles Quirúrgicos Perú`;

  const metaDescription = isFibers
    ? 'Fibras ópticas de cuarzo de alta pureza (150 a 940 µm) para Urolase MAX, Tulio TFL, Holmium y EVLT. Conector OnePush™ antipolvo y hasta 20 ciclos de autoclave en Perú.'
    : (product.short_description || product.full_description || '').slice(0, 155);

  const keywords = isFibers
    ? [
        'fibras quirúrgicas perú',
        'fibras láser urología lima',
        'vpg laserone perú',
        'onepush bare fiber',
        'microfibra 150 um rirs',
        'fibra radial 360 evlt perú',
        'fibra conica hemorroides',
        'fibras laser tulio comprar',
        'mednova technologies consumibles',
      ]
    : [product.name, product.model, product.brand, 'consumibles médicos perú', 'mednova'];

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mednovatechnologies.com';
  const primaryImage =
    product.images && product.images.length > 0
      ? product.images[0]
      : '/images/products/fibras-quirurgicas-vpg/vpg_fibers_hero.webp';
  const fullImageUrl = primaryImage.startsWith('http') ? primaryImage : `${siteUrl}${primaryImage}`;

  return {
    title: metaTitle,
    description: metaDescription,
    keywords,
    alternates: {
      canonical: `${siteUrl}/consumibles/${product.slug}`,
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: `${siteUrl}/consumibles/${product.slug}`,
      siteName: 'Mednova Technologies',
      locale: 'es_PE',
      type: 'website',
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: `${product.name} - Mednova Technologies Perú`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: [fullImageUrl],
    },
  };
}

export default async function ConsumibleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  let products = INITIAL_PRODUCTS;
  try {
    const loaded = await fetchProducts();
    if (loaded && loaded.length > 0) {
      products = loaded;
    }
  } catch {
    // fallback
  }

  const product = products.find((p) => p.slug === slug || p.id === slug);

  if (!product) {
    notFound();
  }

  const relatedEquipos = products.filter((p) => p.category === 'equipo');
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mednovatechnologies.com';

  // Schema.org Structured Data
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images.map((img) => (img.startsWith('http') ? img : `${siteUrl}${img}`)),
    description: product.full_description || product.short_description,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    model: product.model,
    category: 'Surgical Consumables & Optical Fibers',
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Mednova Technologies',
      },
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Inicio',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Consumibles Quirúrgicos',
        item: `${siteUrl}/consumibles`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.name,
        item: `${siteUrl}/consumibles/${product.slug}`,
      },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Cómo se esterilizan las fibras quirúrgicas reutilizables en autoclave?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Las fibras VPG reutilizables están certificadas para hasta 20 ciclos de autoclave a 134 °C durante 5 minutos o 121 °C durante 20 minutos con tarjeta de trazabilidad hospitalaria.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Son compatibles las fibras VPG con equipos de otras marcas?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sí, cuentan con conector OnePush para la serie Urolase y conector universal SMA-905 para equipos Lumenis, Quanta System, Dornier, Biolitec y otros.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Qué ventaja clínica ofrece el calibre de 150 µm frente a fibras de 200 o 272 µm?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'La microfibra de 150 µm permite la deflexión activa completa (>275°) del ureteroscopio flexible digital en cálices renales inferiores y un flujo salino superior al 90%.',
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#f4f5f6] flex flex-col font-mono-tech selection:bg-[#009EBC] selection:text-white">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <Navbar />

      <main className="flex-1 pt-16 sm:pt-20">
        <FibrasDetailView product={product} relatedEquipos={relatedEquipos} />
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
