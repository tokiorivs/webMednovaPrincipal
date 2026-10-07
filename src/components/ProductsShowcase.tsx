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

const badges: Record<string, string> = {
  'urolase-max': 'Plataforma láser',
  'fibras-quirurgicas-vpg': 'Fibras quirúrgicas',
};

const primaryButton =
  'group/btn relative overflow-hidden inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-teal-ink hover:bg-[#00819a] text-white font-semibold shadow-lg shadow-[#009EBC]/20 hover:shadow-xl hover:shadow-[#009EBC]/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 before:absolute before:inset-0 before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700 before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent';

const secondaryButton =
  'group/btn inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-[#001041]/30 hover:border-[#001041] hover:bg-[#001041] hover:text-white text-[#001041] font-medium hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300';

export default function ProductsShowcase({ products }: { products: Product[] }) {
  const featured = FEATURED_SLUGS
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p): p is Product => Boolean(p));

  return (
    <section id="portafolio" className="relative overflow-hidden bg-[#f4f5f6] text-[#001041] py-20 sm:py-28 scroll-mt-16">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 45% at 15% 0%, rgba(0,158,188,0.12) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 95% 100%, rgba(0,16,65,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl space-y-4">
          <p className="inline-flex items-center gap-2 text-sm font-medium text-teal-ink">
            <span className="w-8 h-px bg-[#009EBC]" aria-hidden="true" />
            Portafolio de productos
          </p>
          <h2 className="font-heading text-3xl sm:text-5xl leading-[1.1] text-[#001041]">Soluciones VPG LaserOne</h2>
          <p className="text-base sm:text-lg text-[#494f52] leading-relaxed">
            Plataforma láser de fibra de tulio y fibras quirúrgicas para urología, con distribución exclusiva de Mednova en Perú.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {featured.map((product) => {
            const isLaser = product.slug === 'urolase-max';
            const href = `/${product.category === 'consumible' ? 'consumibles' : 'equipos'}/${product.slug}`;
            const waText = product.whatsapp_message || `Hola Mednova Technologies, deseo cotizar ${product.name}.`;

            return (
              <article
                key={product.id}
                className={`group relative rounded-3xl border border-[#D2D3D5] bg-white shadow-sm overflow-hidden flex flex-col transition-all duration-500 hover:border-[#009EBC]/60 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#001041]/15 ${
                  isLaser ? 'lg:col-span-7' : 'lg:col-span-5'
                }`}
              >
                {/* Visual */}
                <div className="relative aspect-[4/3] border-b border-[#D2D3D5] overflow-hidden">
                  {isLaser ? (
                    <video
                      src="/videos/UMax - ergonomics.webm"
                      aria-label="Video del láser Urolase MAX"
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover bg-[#001041]"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-white">
                      {/* eslint-disable @next/next/no-img-element */}
                      <img
                        src="/images/products/fibras-quirurgicas-vpg/conical_fiber.webp"
                        alt="Fibra quirúrgica VPG LaserOne serie LP"
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-contain p-6 transition-all duration-700 group-hover:opacity-0 group-hover:scale-95"
                      />
                      <img
                        src="/images/products/fibras-quirurgicas-vpg/hp_fiber.webp"
                        alt="Fibra quirúrgica VPG LaserOne serie HP"
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-contain p-6 opacity-0 scale-105 transition-all duration-700 group-hover:opacity-100 group-hover:scale-100"
                      />
                      {/* eslint-enable @next/next/no-img-element */}
                    </div>
                  )}
                  <span className="absolute top-4 left-4 z-10 rounded-full bg-[#001041]/80 backdrop-blur-sm border border-white/15 px-3 py-1 text-xs font-medium text-[#7fdcf0]">
                    {badges[product.slug]}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 flex flex-col gap-4 flex-1">
                  <div>
                    <p className="text-sm font-medium text-teal-ink">{product.brand}</p>
                    <h3 className="font-heading text-2xl sm:text-3xl text-[#001041] mt-1">{product.model}</h3>
                  </div>
                  <p className="text-base text-[#494f52] leading-relaxed">{product.short_description}</p>
                  <ul className="space-y-2.5 text-sm sm:text-base text-[#334155]">
                    {(highlights[product.slug] || []).map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#009EBC] shrink-0" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-5 flex flex-col sm:flex-row gap-3">
                    <a
                      href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(waText)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={primaryButton}
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span className="relative">Cotizar por WhatsApp</span>
                    </a>
                    <Link href={href} className={secondaryButton}>
                      Ver detalles
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
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
