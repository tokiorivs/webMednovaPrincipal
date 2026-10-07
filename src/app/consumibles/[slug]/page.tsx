import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import FibrasDetailView from '@/components/FibrasDetailView';
import { INITIAL_PRODUCTS } from '@/lib/data';
import { fetchProducts } from '@/lib/supabase';
import { FIBRAS_FAQS } from '@/lib/fibras';
import { SITE_URL } from '@/lib/site';

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
    ? 'Fibras quirúrgicas VPG LaserOne: OnePush, HP y LP en Perú'
    : `${product.name} (${product.model}) • Consumibles Quirúrgicos Perú`;

  const metaDescription = isFibers
    ? 'Fibras quirúrgicas VPG OnePush, HP y LP con núcleo de 150 a 940 µm. OnePush para Urolase MAX, fibras reutilizables hasta 20 ciclos de esterilización. Distribuidor exclusivo en Perú.'
    : (product.short_description || product.full_description || '').slice(0, 155);

  const keywords = isFibers
    ? [
        'fibras quirúrgicas vpg perú',
        'fibras láser urología',
        'vpg laserone perú',
        'fibra onepush urolase',
        'fibra hp sma-905',
        'microfibra 150 µm',
        'mednova technologies',
      ]
    : [product.name, product.model, product.brand, 'consumibles médicos perú', 'mednova'];

  const siteUrl = SITE_URL;
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
  const siteUrl = SITE_URL;

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
    category: 'Surgical Laser Fibers',
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
    mainEntity: FIBRAS_FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-[#f4f5f6] flex flex-col font-mono-tech selection:bg-teal-ink selection:text-white">
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
