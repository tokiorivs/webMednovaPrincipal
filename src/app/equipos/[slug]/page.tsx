import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import EquipoDetailView from '@/components/EquipoDetailView';
import { INITIAL_PRODUCTS } from '@/lib/data';
import { fetchProducts } from '@/lib/supabase';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return INITIAL_PRODUCTS
    .filter((p) => p.category === 'equipo')
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
      title: 'Equipo no encontrado • Mednova Technologies',
    };
  }

  const isUrolase = product.slug === 'urolase-max';

  const metaTitle = isUrolase
    ? 'Láser de Tulio Urolase MAX (TFL 1940nm) • Urología Perú'
    : `${product.name} (${product.model}) • Equipos Quirúrgicos Perú`;

  const metaDescription = isUrolase
    ? 'Plataforma láser de tulio superpulsado (TFL 1940nm) para litotricia y próstata con Tissue Sensor™. Solicite cotización formal y demo quirúrgica en Perú.'
    : (product.short_description || product.full_description || '').slice(0, 155);

  const keywords = isUrolase
    ? [
        'láser de tulio urología perú',
        'urolase max perú',
        'láser tfl litotricia comprar lima',
        'enucleación prostática thuflep perú',
        'láser superpulsado thulium fiber',
        'vpg laserone perú',
        'cotización láser urológico',
        'mednova technologies perú',
      ]
    : [product.name, product.model, product.brand, 'equipos médicos perú', 'mednova'];

  const primaryImage =
    product.images && product.images.length > 0
      ? product.images[0]
      : '/images/products/urolase-max/urolase_max_console.webp';

  return {
    title: metaTitle,
    description: metaDescription,
    keywords,
    alternates: {
      canonical: `/equipos/${product.slug}`,
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: `/equipos/${product.slug}`,
      siteName: 'Mednova Technologies',
      locale: 'es_PE',
      type: 'website',
      images: [
        {
          url: primaryImage,
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
      images: [primaryImage],
    },
  };
}

export default async function EquipoDetailPage({ params }: PageProps) {
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
    notFound();
  }

  const relatedEquipos = products.filter(
    (p) => p.category === 'equipo' && p.id !== product.id
  );

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mednovatechnologies.com';

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': ['Product', 'MedicalDevice'],
    name: product.name,
    alternateName: product.model,
    image: product.images?.map((img) => (img.startsWith('http') ? img : `${siteUrl}${img}`)) || [],
    description: product.full_description || product.short_description,
    model: product.model,
    category: 'Medical Device / Urology Surgical Laser',
    medicalSpecialty: 'Urology',
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    manufacturer: {
      '@type': 'Organization',
      name: product.manufacturer_info?.name || product.brand,
      url: siteUrl,
    },
    offers: {
      '@type': 'Offer',
      url: `${siteUrl}/equipos/${product.slug}`,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: 'Mednova Technologies',
        telephone: '+51 984 763 547',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'PE',
          addressLocality: 'Lima',
        },
      },
      areaServed: {
        '@type': 'Country',
        name: 'Peru',
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
        name: 'Equipos Médicos',
        item: `${siteUrl}/equipos`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.name,
        item: `${siteUrl}/equipos/${product.slug}`,
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

      <Navbar />

      <main className="flex-1 pt-16 sm:pt-20">
        <EquipoDetailView product={product} relatedEquipos={relatedEquipos} />
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
