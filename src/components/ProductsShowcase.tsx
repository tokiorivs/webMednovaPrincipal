import React from 'react';
import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/data';
import { Product } from '@/types/product';

const FEATURED_SLUGS = ['urolase-max', 'fibras-quirurgicas-vpg'];

const highlights: Record<string, string[]> = {
  'urolase-max': [
    'Tissue Sensor: detiene el láser al detectar tejido blando',
    'Litotricia y enucleación prostática en un solo sistema',
    'Compacto, refrigerado por aire y sin mantenimiento rutinario',
  ],
  'fibras-quirurgicas-vpg': [
    'Conector OnePush con obturador automático',
    '5 diámetros: 150, 200, 365, 550 y 940 µm',
    'Desechables y reutilizables',
  ],
};

export default function ProductsShowcase({ products }: { products: Product[] }) {
  const featured = FEATURED_SLUGS
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p): p is Product => Boolean(p));

  return (
    <section id="portafolio" className="py-16 sm:py-24 bg-[#f4f5f6] scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl space-y-3">
          <h2 className="font-heading text-3xl sm:text-4xl text-[#001041]">Soluciones VPG LaserOne</h2>
          <p className="text-base sm:text-lg text-[#494f52] leading-relaxed">
            Plataforma láser de fibra de tulio y fibras quirúrgicas para urología, con distribución exclusiva de Mednova en Perú.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {featured.map((product) => {
            const href = `/${product.category === 'consumible' ? 'consumibles' : 'equipos'}/${product.slug}`;
            const waText = product.whatsapp_message || `Hola Mednova Technologies, deseo cotizar ${product.name}.`;
            return (
              <article key={product.id} className="rounded-3xl bg-white border border-[#D2D3D5] overflow-hidden flex flex-col">
                <Link href={href} className="block bg-gradient-to-b from-[#f4f5f6] to-white aspect-[4/3] relative" aria-label={product.name}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.images[0]}
                    alt={`${product.name} - Mednova Technologies Perú`}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-contain p-6"
                  />
                </Link>
                <div className="p-6 sm:p-8 flex flex-col gap-4 flex-1">
                  <div>
                    <p className="text-sm font-medium text-[#007f97]">{product.brand}</p>
                    <h3 className="font-heading text-2xl text-[#001041] mt-1">{product.model}</h3>
                  </div>
                  <p className="text-base text-[#494f52] leading-relaxed">{product.short_description}</p>
                  <ul className="space-y-2 text-sm sm:text-base text-[#334155]">
                    {(highlights[product.slug] || []).map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="text-teal-ink mt-1.5 w-1.5 h-1.5 rounded-full bg-current shrink-0" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-4 flex flex-col sm:flex-row gap-3">
                    <a
                      href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(waText)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-teal-ink hover:bg-[#00819a] text-white font-semibold transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Cotizar por WhatsApp
                    </a>
                    <Link
                      href={href}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-[#D2D3D5] hover:border-[#001041] text-[#001041] font-medium transition-colors"
                    >
                      Ver detalles
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
