'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronDown, FileDown, MessageCircle } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/data';
import { FIBER_LINES, FIBRAS_FAQS, type FiberLine } from '@/lib/fibras';
import { Product } from '@/types/product';
import VpgBacking from '@/components/VpgBacking';

interface FibrasDetailViewProps {
  product: Product;
  relatedEquipos?: Product[];
}

const heroImages = [
  { src: '/images/products/fibras-quirurgicas-vpg/vpg_fibers_hero.webp', label: 'Línea completa' },
  { src: '/images/products/fibras-quirurgicas-vpg/onepush_fiber.webp', label: 'OnePush' },
  { src: '/images/products/fibras-quirurgicas-vpg/hp_fiber.webp', label: 'HP' },
];

const fiberDiameters = [
  { um: 940, size: 'w-20 h-20' },
  { um: 550, size: 'w-[4.5rem] h-[4.5rem]' },
  { um: 365, size: 'w-16 h-16' },
  { um: 200, size: 'w-14 h-14' },
  { um: 150, size: 'w-12 h-12' },
];

const primaryButton =
  'relative overflow-hidden inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-teal-ink hover:bg-[#00819a] text-white font-semibold shadow-lg shadow-[#009EBC]/20 hover:shadow-xl hover:shadow-[#009EBC]/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 before:absolute before:inset-0 before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700 before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent';

const ghostButton =
  'inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-white/40 hover:border-white hover:bg-white hover:text-[#001041] text-white font-medium hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300';

function SpecTable({ line }: { line: FiberLine }) {
  const { columns, rows, shared } = line.table;
  return (
    <div className="overflow-x-auto rounded-2xl border border-[#D2D3D5] bg-white">
      <table className="w-full text-left text-sm sm:text-base">
        <caption className="sr-only">Especificaciones de {line.name} {line.subtitle}</caption>
        <thead>
          <tr className="bg-[#001041] text-white">
            <th scope="col" className="px-4 sm:px-6 py-3 font-semibold">Parámetro</th>
            {columns.map((col) => (
              <th key={col} scope="col" className="px-4 py-3 font-semibold whitespace-nowrap">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#D2D3D5] text-[#494f52]">
          {rows.map((row) => (
            <tr key={row.label}>
              <th scope="row" className="px-4 sm:px-6 py-3 font-medium text-[#001041]">{row.label}</th>
              {row.values.map((v, i) => (
                <td key={`${row.label}-${i}`} className="px-4 py-3 whitespace-nowrap">{v}</td>
              ))}
            </tr>
          ))}
          {shared.map((row) => (
            <tr key={row.label}>
              <th scope="row" className="px-4 sm:px-6 py-3 font-medium text-[#001041]">{row.label}</th>
              <td colSpan={columns.length} className="px-4 py-3 text-center sm:text-left">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function LineBlock({ line, tone }: { line: FiberLine; tone: 'white' | 'gray' }) {
  return (
    <section className={`${tone === 'white' ? 'bg-white' : 'bg-[#f4f5f6]'} py-16 sm:py-20`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className={`${line.image ? 'lg:col-span-7' : 'lg:col-span-12'} space-y-4`}>
            <p className="text-sm font-medium text-teal-ink">{line.subtitle}</p>
            <h2 className="font-heading text-3xl sm:text-4xl">{line.name}</h2>
            <ul className="flex flex-wrap gap-2" aria-label="Especialidades">
              {line.specialties.map((s) => (
                <li key={s} className="rounded-full bg-[#001041] px-3 py-1 text-sm font-medium text-[#7fdcf0]">{s}</li>
              ))}
            </ul>
            {line.description.map((p) => (
              <p key={p.slice(0, 24)} className="text-base sm:text-lg text-[#494f52] leading-relaxed">{p}</p>
            ))}
          </div>
          {line.image && (
            <div className="lg:col-span-5">
              <div className="rounded-3xl bg-white border border-[#D2D3D5] aspect-[4/3] flex items-center justify-center overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={line.image}
                  alt={`${line.name} ${line.subtitle}`}
                  loading="lazy"
                  className="w-full h-full object-contain p-4"
                />
              </div>
            </div>
          )}
        </div>

        {line.highlights.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {line.highlights.map((h) => (
              <div key={h.title} className="rounded-2xl border border-[#D2D3D5] bg-white p-6 space-y-2 hover:border-[#009EBC] hover:shadow-lg hover:shadow-[#009EBC]/10 transition-all duration-300">
                <h3 className="font-heading text-lg">{h.title}</h3>
                <p className="text-base text-[#494f52] leading-relaxed">{h.text}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8">
          <h3 className="font-heading text-xl mb-4">Especificaciones</h3>
          <SpecTable line={line} />
        </div>
      </div>
    </section>
  );
}

export default function FibrasDetailView({ product }: FibrasDetailViewProps) {
  const [heroIdx, setHeroIdx] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const waLink = (text: string) => `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(text)}`;
  const quoteUrl = waLink(product.whatsapp_message || 'Hola Mednova Technologies, deseo cotizar fibras quirúrgicas VPG.');

  const urologia = FIBER_LINES.filter((l) => l.group === 'urologia');
  const otras = FIBER_LINES.filter((l) => l.group === 'otras');

  return (
    <div className="w-full bg-[#f4f5f6] text-[#001041]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#001041] text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 55% 70% at 85% 25%, rgba(0,158,188,0.25) 0%, transparent 60%), radial-gradient(ellipse 50% 50% at 0% 100%, rgba(20,55,127,0.5) 0%, transparent 70%)',
          }}
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          <nav aria-label="Ruta" className="text-sm text-[#c9ced3] mb-8">
            <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <Link href="/consumibles" className="hover:text-white transition-colors">Consumibles</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span className="text-white">Fibras VPG</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-6">
              <p className="inline-flex items-center gap-2 text-sm font-medium text-[#7fdcf0]">
                <span className="w-8 h-px bg-[#009EBC]" aria-hidden="true" />
                Distribuidor exclusivo de VPG LaserOne en Perú
              </p>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl leading-[1.05]">
                Fibras quirúrgicas <span className="text-[#33c3df]">VPG</span>
              </h1>
              <p className="text-base sm:text-lg text-[#c9ced3] leading-relaxed max-w-xl">{product.short_description}</p>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a href={quoteUrl} target="_blank" rel="noopener noreferrer" className={primaryButton}>
                  <MessageCircle className="w-5 h-5" />
                  <span className="relative">Solicitar cotización</span>
                </a>
                {product.brochure_url && (
                  <a href={product.brochure_url} target="_blank" rel="noopener noreferrer" className={ghostButton}>
                    <FileDown className="w-5 h-5" />
                    Descargar ficha (PDF)
                  </a>
                )}
              </div>
            </div>

            <div className="lg:col-span-6 space-y-3">
              <div role="tablist" aria-label="Imágenes" className="flex flex-wrap gap-2">
                {heroImages.map((img, i) => (
                  <button
                    key={img.label}
                    role="tab"
                    aria-selected={!showVideo && heroIdx === i}
                    onClick={() => {
                      setShowVideo(false);
                      setHeroIdx(i);
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                      !showVideo && heroIdx === i ? 'bg-white text-[#001041]' : 'bg-white/10 text-white hover:bg-white/20 border border-white/15'
                    }`}
                  >
                    {img.label}
                  </button>
                ))}
                <button
                  role="tab"
                  aria-selected={showVideo}
                  onClick={() => setShowVideo(true)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                    showVideo ? 'bg-white text-[#001041]' : 'bg-white/10 text-white hover:bg-white/20 border border-white/15'
                  }`}
                >
                  Video: conector OnePush
                </button>
              </div>
              <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden border border-white/10 bg-white">
                {showVideo ? (
                  <video
                    src="/videos/OnePuch_activation.webm"
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls
                    className="absolute inset-0 w-full h-full object-contain bg-black"
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={heroImages[heroIdx].src}
                    alt={`Fibras quirúrgicas VPG: ${heroImages[heroIdx].label}`}
                    className="absolute inset-0 w-full h-full object-contain p-4"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key metrics */}
      <section className="bg-white border-b border-[#D2D3D5]">
        <dl className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-6">
          {product.key_metrics?.map((metric) => (
            <div key={metric.label}>
              <dt className="text-sm text-[#494f52]">{metric.label}</dt>
              <dd className="font-heading text-2xl text-[#001041] mt-1">
                {metric.value}
                {metric.unit && <span className="text-base ml-1 text-[#494f52]">{metric.unit}</span>}
              </dd>
              {metric.helper && <p className="text-sm text-[#494f52] mt-1 leading-snug">{metric.helper}</p>}
            </div>
          ))}
        </dl>
      </section>

      {/* Diameters */}
      <section className="bg-[#f4f5f6] py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-3">
            <h2 className="font-heading text-3xl sm:text-4xl">Fibras quirúrgicas VPG OnePush</h2>
            <p className="text-base sm:text-lg text-[#494f52] leading-relaxed">
              Disponibles en formato desechable (uso único) y reutilizable (uso múltiple), en cinco diámetros de núcleo.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="rounded-full bg-white border border-[#D2D3D5] px-3 py-1 text-sm">Desechable (uso único)</span>
              <span className="rounded-full bg-white border border-[#D2D3D5] px-3 py-1 text-sm">Reutilizable (uso múltiple)</span>
            </div>
          </div>
          <div className="rounded-3xl bg-white border border-[#D2D3D5] p-8">
            <p className="text-sm text-[#494f52] mb-4">Diámetros disponibles, µm</p>
            <div className="flex items-end gap-3 sm:gap-5 flex-wrap">
              {fiberDiameters.map((d) => (
                <div key={d.um} className="flex flex-col items-center gap-2">
                  <div className={`${d.size} rounded-full bg-teal-ink`} />
                  <span className="text-sm font-medium text-[#001041]">{d.um}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Urology lines */}
      {urologia.map((line, i) => (
        <LineBlock key={line.id} line={line} tone={i % 2 === 0 ? 'white' : 'gray'} />
      ))}

      {/* Link to Urolase MAX */}
      <section className="bg-[#001041] text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <h2 className="font-heading text-2xl sm:text-3xl">Fibras OnePush para Urolase MAX</h2>
            <p className="text-base text-[#e4e6e8] leading-relaxed">
              Conozca la plataforma láser de fibra de tulio para la que está diseñado el conector OnePush.
            </p>
          </div>
          <Link href="/equipos/urolase-max" className={ghostButton}>
            Ver Urolase MAX
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Other VPG lines */}
      <section className="bg-white pt-16 sm:pt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl sm:text-4xl">Otras líneas VPG</h2>
          <p className="mt-3 max-w-3xl text-base sm:text-lg text-[#494f52] leading-relaxed">
            VPG LaserOne también ofrece fibras LP para otras especialidades, con conector SMA-905. Si le interesan, consúltenos.
          </p>
        </div>
      </section>
      {otras.map((line, i) => (
        <LineBlock key={line.id} line={line} tone={i % 2 === 0 ? 'white' : 'gray'} />
      ))}

      <VpgBacking className="bg-[#f4f5f6]" />

      {/* Mednova accompaniment */}
      <section className="bg-[#001041] text-white py-16 sm:py-24 relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 60% 80% at 90% 10%, rgba(0,158,188,0.25) 0%, transparent 60%)' }}
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-5">
            <p className="text-sm font-medium text-[#7fdcf0]">Con Mednova Technologies</p>
            <h2 className="font-heading text-3xl sm:text-5xl leading-[1.1]">Cuéntenos qué fibras necesita</h2>
            <p className="text-base sm:text-lg text-[#e4e6e8] leading-relaxed">
              Indíquenos el sistema láser que utiliza y los diámetros que necesita. Somos el distribuidor exclusivo de VPG LaserOne en Perú, con servicio postventa personalizado.
            </p>
            <div className="pt-2">
              <a href={quoteUrl} target="_blank" rel="noopener noreferrer" className={primaryButton}>
                <MessageCircle className="w-5 h-5" />
                <span className="relative">Solicitar cotización</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl sm:text-4xl">Preguntas frecuentes sobre las fibras VPG</h2>
          <div className="mt-8 space-y-3">
            {FIBRAS_FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={faq.question} className="rounded-2xl border border-[#D2D3D5] bg-[#f4f5f6] overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 text-left px-6 py-5 cursor-pointer"
                  >
                    <span className="font-heading text-lg leading-snug">{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 shrink-0 text-teal-ink transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && <p className="px-6 pb-6 text-base text-[#494f52] leading-relaxed">{faq.answer}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mobile sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#001041]/95 backdrop-blur-md border-t border-white/15 p-3 sm:hidden">
        <div className="flex items-center gap-2">
          <a
            href={quoteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3 px-4 rounded-full bg-teal-ink text-white text-base font-semibold text-center flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            Solicitar cotización
          </a>
          {product.brochure_url && (
            <a
              href={product.brochure_url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Descargar ficha técnica en PDF"
              className="py-3 px-4 rounded-full bg-white/10 text-white border border-white/30 flex items-center justify-center"
            >
              <FileDown className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
