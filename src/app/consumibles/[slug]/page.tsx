import React from 'react';
import { notFound, redirect } from 'next/navigation';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import FibrasDetailView from '@/components/FibrasDetailView';
import { INITIAL_PRODUCTS } from '@/lib/data';
import { getAllProducts, STATIC_SLUGS } from '@/lib/products';
import ProductDetailView from '@/components/ProductDetailView';
import { FIBRAS_FAQS } from '@/lib/fibras';
import { SITE_URL } from '@/lib/site';
import { buildProductJsonLd, jsonLd, productSeoTitle, socialImage } from '@/lib/seo';

export const revalidate = 60;

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
  const products = await getAllProducts();

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

  const isCustom = !STATIC_SLUGS.has(product.slug);
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
  const customImage = socialImage(product);
  const fullImageUrl = (isCustom && customImage ? customImage : primaryImage).startsWith('http')
    ? (isCustom && customImage ? customImage : primaryImage)
    : `${siteUrl}${primaryImage}`;

  return {
    title: isCustom ? { absolute: productSeoTitle(product) } : metaTitle,
    description: metaDescription,
    keywords: isCustom ? null : keywords,
    alternates: {
      canonical: `${siteUrl}/consumibles/${product.slug}`,
    },
    openGraph: {
      title: isCustom ? productSeoTitle(product) : metaTitle,
      description: metaDescription,
      url: `${siteUrl}/consumibles/${product.slug}`,
      siteName: 'Mednova Technologies',
      locale: 'es_PE',
      type: 'website',
      images: [
        {
          url: fullImageUrl,
          // Solo las imágenes de fábrica tienen 1200 × 630; las del panel no se declaran con medidas falsas.
          ...(isCustom ? {} : { width: 1200, height: 630 }),
          alt: `${product.name} - Mednova Technologies Perú`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: isCustom ? productSeoTitle(product) : metaTitle,
      description: metaDescription,
      images: [fullImageUrl],
    },
  };
}

export default async function ConsumibleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const products = await getAllProducts();

  const product = products.find((p) => p.slug === slug || p.id === slug);

  if (!product) {
    notFound();
  }

  if (product.category === 'equipo') {
    redirect(`/equipos/${product.slug}`);
  }

  const isStatic = STATIC_SLUGS.has(product.slug);
  const relatedConsumibles = products.filter((p) => p.category === 'consumible' && p.id !== product.id);
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

  const faqSource = isStatic ? FIBRAS_FAQS : product.faqs ?? [];
  const faqJsonLd = faqSource.length === 0 ? null : {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqSource.map((faq) => ({
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
        dangerouslySetInnerHTML={{ __html: jsonLd(STATIC_SLUGS.has(product.slug) ? productJsonLd : buildProductJsonLd(product)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(faqJsonLd) }}
        />
      )}

      <Navbar />

      <main className="flex-1 pt-16 sm:pt-20">
        {isStatic ? (
          <FibrasDetailView product={product} relatedEquipos={relatedEquipos} />
        ) : (
          <ProductDetailView product={product} related={relatedConsumibles} />
        )}
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
