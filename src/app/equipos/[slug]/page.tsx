import { notFound, redirect } from 'next/navigation';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import EquipoDetailView from '@/components/EquipoDetailView';
import { INITIAL_PRODUCTS } from '@/lib/data';
import { getAllProducts, STATIC_SLUGS } from '@/lib/products';
import ProductDetailView from '@/components/ProductDetailView';
import { UROLASE_FAQS } from '@/lib/urolase-faq';
import { SITE_URL } from '@/lib/site';

export const revalidate = 60;

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
  const products = await getAllProducts();

  const product = products.find((p) => p.slug === slug || p.id === slug);

  if (!product) {
    return {
      title: 'Equipo no encontrado • Mednova Technologies',
    };
  }

  const isUrolase = product.slug === 'urolase-max';

  const metaTitle = isUrolase
    ? 'Urolase MAX: láser de fibra de tulio para urología en Perú'
    : `${product.name} (${product.model}) • Equipos Quirúrgicos Perú`;

  const metaDescription = isUrolase
    ? 'Plataforma láser todo en uno de VPG LaserOne para litotricia y cirugía de tejidos blandos, con Tissue Sensor. Distribuidor exclusivo en Perú. Solicite su cotización.'
    : (product.short_description || product.full_description || '').slice(0, 155);

  const keywords = isUrolase
    ? [
        'urolase max perú',
        'láser de fibra de tulio perú',
        'láser urología perú',
        'litotricia láser',
        'enucleación prostática ThuFLEP',
        'tissue sensor',
        'vpg laserone perú',
        'mednova technologies',
      ]
    : [product.name, product.model, product.brand, 'equipos médicos perú', 'mednova'];

  const siteUrl = SITE_URL;
  const primaryImage =
    product.images && product.images.length > 0
      ? product.images[0]
      : '/images/products/urolase-max/urolase_max_console.webp';
  const fullImageUrl = primaryImage.startsWith('http') ? primaryImage : `${siteUrl}${primaryImage}`;

  return {
    title: metaTitle,
    description: metaDescription,
    keywords,
    alternates: {
      canonical: `${siteUrl}/equipos/${product.slug}`,
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: `${siteUrl}/equipos/${product.slug}`,
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

export default async function EquipoDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const products = await getAllProducts();

  const product = products.find((p) => p.slug === slug || p.id === slug);

  if (!product) {
    notFound();
  }

  if (product.category === 'consumible') {
    redirect(`/consumibles/${product.slug}`);
  }

  const relatedEquipos = products.filter(
    (p) => p.category === 'equipo' && p.id !== product.id
  );

  const siteUrl = SITE_URL;
  const isUrolase = product.slug === 'urolase-max' || product.id === 'urolase-max';

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    alternateName: product.model,
    image: product.images?.map((img) => (img.startsWith('http') ? img : `${siteUrl}${img}`)) || [],
    description: product.full_description || product.short_description,
    model: product.model,
    category: 'Urology Surgical Laser',
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    manufacturer: {
      '@type': 'Organization',
      name: product.manufacturer_info?.name || product.brand,
      url: 'https://vpglaser.com',
    },
  };

  const genericFaqs = product.faqs ?? [];
  const faqJsonLd = isUrolase
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: UROLASE_FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      }
    : genericFaqs.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: genericFaqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      }
    : null;

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
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <Navbar />

      <main className="flex-1 pt-16 sm:pt-20">
        {STATIC_SLUGS.has(product.slug) ? (
          <EquipoDetailView product={product} relatedEquipos={relatedEquipos} />
        ) : (
          <ProductDetailView product={product} related={relatedEquipos} />
        )}
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
