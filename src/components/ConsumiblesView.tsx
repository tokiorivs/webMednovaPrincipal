'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Product } from '@/types/product';
import { COMPANY_INFO } from '@/lib/data';

export default function ConsumiblesView({ products }: { products: Product[] }) {
  const consumables = useMemo(() => products.filter((p) => p.category === 'consumible'), [products]);

  return (
    <div className="w-full">
      <section className="relative overflow-hidden bg-[#001041] text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 55% 70% at 85% 25%, rgba(0,158,188,0.25) 0%, transparent 60%)',
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 space-y-4">
          <p className="inline-flex items-center gap-2 text-sm font-medium text-[#7fdcf0]">
            <span className="w-8 h-px bg-[#009EBC]" aria-hidden="true" />
            Consumibles
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl leading-[1.05]">Consumibles quirúrgicos</h1>
          <p className="text-base sm:text-lg text-[#e4e6e8] leading-relaxed max-w-2xl">
            Fibras láser y consumibles quirúrgicos para urología. Distribuidor exclusivo de VPG LaserOne en Perú.
          </p>
        </div>
      </section>

      <section className="bg-[#f4f5f6] py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {consumables.map((product) => {
            const waText = product.whatsapp_message || `Hola Mednova Technologies, deseo cotizar ${product.name}.`;
            return (
              <article
                key={product.id}
                className="group rounded-3xl bg-white border border-[#D2D3D5] overflow-hidden flex flex-col hover:border-[#009EBC] hover:shadow-xl hover:shadow-[#009EBC]/10 hover:-translate-y-1 transition-all duration-300"
              >
                <Link
                  href={`/consumibles/${product.slug}`}
                  aria-label={product.name}
                  className="block aspect-[4/3] bg-white border-b border-[#D2D3D5] relative"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.images[0] || '/images/logo.png'}
                    alt={`${product.name} - Mednova Technologies Perú`}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>
                <div className="p-6 sm:p-8 flex flex-col gap-4 flex-1">
                  <div>
                    <p className="text-sm font-medium text-teal-ink">{product.brand}</p>
                    <h2 className="font-heading text-2xl text-[#001041] mt-1">{product.model}</h2>
                  </div>
                  <p className="text-base text-[#494f52] leading-relaxed">{product.short_description}</p>
                  <div className="mt-auto pt-4 flex flex-col sm:flex-row gap-3">
                    <a
                      href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(waText)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative overflow-hidden inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-teal-ink hover:bg-[#00819a] text-white font-semibold hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Cotizar por WhatsApp
                    </a>
                    <Link
                      href={`/consumibles/${product.slug}`}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-[#D2D3D5] hover:border-[#001041] text-[#001041] font-medium hover:-translate-y-0.5 transition-all duration-300"
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
      </section>
    </div>
  );
}
