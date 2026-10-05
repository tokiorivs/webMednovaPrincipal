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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mednovatechnologies.com';
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
  const isUrolase = product.slug === 'urolase-max' || product.id === 'urolase-max';

  const urolaseFaqs = [
    {
      question: '¿Qué ventajas clínicas ofrece el láser de tulio superpulsado (TFL 1940 nm) frente al láser Holmium (Ho:YAG) convencional?',
      answer:
        'El láser de tulio superpulsado a 1940 nm coincide con el pico máximo de absorción en agua en los tejidos urológicos (4.5 veces mayor que Holmium:YAG a 2100 nm). Esto permite una pulverización ultrafina tipo Dusting sin retropulsión (< 3.5 mm) en litiasis urinarias complejas y una enucleación prostática anatómica (ThuFLEP / DissectPulse) con hemostasia superior inmediata, sin carbonización ni sangrado en el lecho quirúrgico.',
    },
    {
      question: '¿Cómo funciona la tecnología exclusiva Tissue Sensor™ para proteger la mucosa urinaria?',
      answer:
        'Tissue Sensor™ es un sensor óptico espectral patentado en la fibra láser que analiza en tiempo real la reflectancia del cálculo urinario versus el tejido blando. Si la fibra entra en contacto con mucosa o pared ureteral, detiene instantáneamente la emisión del haz en menos de 1 milisegundo, eliminando el riesgo de perforación accidental.',
    },
    {
      question: '¿Qué calibres de fibra óptica admite Urolase MAX y cómo protege los ureteroscopios flexibles?',
      answer:
        'Admite microfibras desde 150 µm hasta 940 µm mediante conector estándar OnePush SMA-905 con obturador antipolvo. Las fibras de 150 µm y 200 µm permiten al ureteroscopio digital flexible una deflexión activa completa superior a 270° y un flujo de irrigación óptimo, prolongando significativamente la vida útil del instrumental endoscópico.',
    },
    {
      question: '¿Cuáles son las modalidades de adquisición hospitalaria disponibles en Perú?',
      answer:
        'Mednova Technologies ofrece 3 modalidades para clínicas y hospitales: (1) Venta Directa con garantía oficial de 24 meses; (2) Leasing Financiero Hospitalario con cuotas mensuales 100% deducibles de impuestos; y (3) Comodato Quirúrgico / Pay-per-use sujeto a volumen programado de consumo de fibras y consumibles urológicos.',
    },
    {
      question: '¿Cómo se solicita una demostración quirúrgica in-situ en quirófano?',
      answer:
        'Coordinamos el traslado de la consola Urolase MAX con instrumental completo a su sala de operaciones para un procedimiento programado. Un especialista en aplicaciones clínicas y un ingeniero biomédico de Mednova acompañan al cirujano durante la intervención sin costo de traslado en Lima y principales ciudades del Perú.',
    },
    {
      question: '¿Qué garantía y soporte biomédico oficial se ofrece en Perú?',
      answer:
        'Garantía de fábrica con respaldo directo de VPG LaserOne (IPG Photonics). Disponemos de stock permanente de fibras, repuestos originales y servicio técnico certificado 24/7 en Perú, con tiempo de respuesta presencial menor a 4 horas en caso de eventualidad.',
    },
  ];

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': ['Product', 'MedicalDevice'],
    name: product.name,
    alternateName: product.model,
    image: product.images?.map((img) => (img.startsWith('http') ? img : `${siteUrl}${img}`)) || [],
    description: product.full_description || product.short_description,
    model: product.model,
    sku: `MEDNOVA-${product.model}`,
    mpn: product.model,
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
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '24',
      bestRating: '5',
      worstRating: '1',
    },
    offers: {
      '@type': 'Offer',
      url: `${siteUrl}/equipos/${product.slug}`,
      priceCurrency: 'USD',
      price: 'ContactForPrice',
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

  const faqJsonLd = isUrolase
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: urolaseFaqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
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
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <Navbar />

      <main className="flex-1 pt-16 sm:pt-20">
        <EquipoDetailView product={product} relatedEquipos={relatedEquipos} />
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
