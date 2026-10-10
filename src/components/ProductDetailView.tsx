'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronDown, FileDown, MessageCircle } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/data';
import { getVideoSource, isHeroVideo } from '@/lib/media';
import { imageAlt } from '@/lib/seo';
import { Product } from '@/types/product';

// Ficha genérica para los productos creados desde el panel administrativo.
// Urolase MAX y las fibras VPG conservan sus vistas a medida.

const primaryButton =
  'relative overflow-hidden inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-teal-ink hover:bg-[#00819a] text-white font-semibold shadow-lg shadow-[#009EBC]/20 hover:shadow-xl hover:shadow-[#009EBC]/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300';

const ghostButton =
  'inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-white/40 hover:border-white hover:bg-white hover:text-[#001041] text-white font-medium hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300';

export default function ProductDetailView({ product, related }: { product: Product; related: Product[] }) {
  const isEquipo = product.category === 'equipo';
  const listPath = isEquipo ? '/equipos' : '/consumibles';
  const listLabel = isEquipo ? 'Equipos' : 'Consumibles';

  const heroBg = product.hero_background_url || null;
  const images = product.images ?? [];
  // Portada: un solo medio promocional (imagen o video). Sin él, se usa la primera foto.
  const promoUrl = product.hero_media_url || product.video_url || images[0] || null;
  const promoVideo = promoUrl ? getVideoSource(promoUrl) : null;
  const promoIndex = promoUrl ? images.indexOf(promoUrl) : -1;
  const promoAlt = promoIndex >= 0 ? imageAlt(product, promoIndex) : `${product.name} - Mednova Technologies Perú`;
  const promo: { kind: 'image' | 'iframe' | 'file'; src: string } | null = promoUrl
    ? promoVideo
      ? { kind: promoVideo.type, src: promoVideo.src }
      : { kind: 'image', src: promoUrl }
    : null;

  const [galleryIndex, setGalleryIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const quoteText = product.whatsapp_message || `Hola Mednova Technologies, deseo una cotización de ${product.name}.`;
  const quoteUrl = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(quoteText)}`;

  const metrics = product.key_metrics ?? [];
  const infoBlocks = (product.info_blocks ?? []).slice(0, 6);
  const faqs = product.faqs ?? [];
  const specs = Object.entries(product.specifications ?? {});
  const features = product.features ?? [];
  const others = related.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="w-full bg-[#f4f5f6] text-[#001041] pb-20 sm:pb-0">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#001041] text-white">
        {heroBg &&
          (isHeroVideo(heroBg) ? (
            <video
              aria-hidden="true"
              src={heroBg}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img aria-hidden="true" alt="" src={heroBg} className="absolute inset-0 w-full h-full object-cover" />
          ))}
        {heroBg && <div aria-hidden="true" className="absolute inset-0 bg-[#001041]/75" />}
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
            <Link href={listPath} className="hover:text-white transition-colors">{listLabel}</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span className="text-white">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-6">
              <p className="inline-flex items-center gap-2 text-sm font-medium text-[#7fdcf0]">
                <span className="w-8 h-px bg-[#009EBC]" aria-hidden="true" />
                {product.brand} · {product.specialty}
              </p>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl leading-[1.05]">{product.h1 || product.name}</h1>
              {product.tagline && (
                <p className="text-xl sm:text-2xl font-heading text-[#e4e6e8] leading-snug">{product.tagline}</p>
              )}
              <p className="text-base sm:text-lg text-[#c9ced3] leading-relaxed max-w-xl">{product.short_description}</p>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a href={quoteUrl} target="_blank" rel="noopener noreferrer" className={primaryButton}>
                  <MessageCircle className="w-5 h-5" />
                  Solicitar cotización
                </a>
                {product.brochure_url && (
                  <a href={product.brochure_url} target="_blank" rel="noopener noreferrer" className={ghostButton}>
                    <FileDown className="w-5 h-5" />
                    Descargar ficha (PDF)
                  </a>
                )}
              </div>
            </div>

            {/* Media promocional: una sola imagen o un solo video */}
            {promo && (
              <div className="lg:col-span-6">
                <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden border border-white/10 bg-[#0a1a4a] shadow-2xl shadow-black/30">
                  {promo.kind === 'image' && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={promo.src}
                      alt={promoAlt}
                      fetchPriority="high"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                  {promo.kind === 'iframe' && (
                    <iframe
                      src={promo.src}
                      title={`Video de ${product.name}`}
                      allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                      allowFullScreen
                      referrerPolicy="strict-origin-when-cross-origin"
                      className="absolute inset-0 w-full h-full bg-black"
                    />
                  )}
                  {promo.kind === 'file' && (
                    <video
                      src={promo.src}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      aria-label={`Video de ${product.name}`}
                      className="absolute inset-0 w-full h-full object-cover bg-black"
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Key metrics */}
      {metrics.length > 0 && (
        <section className="border-t border-white/15 bg-[#001041] text-white">
          <dl className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-5">
            {metrics.map((metric) => (
              <div key={metric.label}>
                <dt className="font-heading text-xl sm:text-2xl text-white">
                  {metric.value}
                  {metric.unit && <span className="ml-1">{metric.unit}</span>}
                </dt>
                <dd className="text-sm text-[#c9ced3] mt-0.5">{metric.helper ?? metric.label}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {/* Galería (izquierda) + características (derecha) */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className={`grid grid-cols-1 gap-10 lg:gap-14 ${images.length > 0 ? 'lg:grid-cols-2' : ''}`}>
            {images.length > 0 && (
              <div className="space-y-4 lg:sticky lg:top-24 self-start">
                <div className="relative aspect-square w-full rounded-3xl overflow-hidden border border-[#D2D3D5] bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={images[galleryIndex] ?? images[0]}
                    alt={imageAlt(product, galleryIndex)}
                    className="absolute inset-0 w-full h-full object-contain p-6"
                  />
                </div>
                {images.length > 1 && (
                  <div className="flex gap-3 overflow-x-auto pb-1">
                    {images.map((src, i) => (
                      <button
                        key={src}
                        type="button"
                        onClick={() => setGalleryIndex(i)}
                        aria-label={`Ver imagen ${i + 1}`}
                        aria-pressed={i === galleryIndex}
                        className={`shrink-0 w-20 h-20 rounded-2xl overflow-hidden bg-white border-2 cursor-pointer transition-colors ${
                          i === galleryIndex ? 'border-teal-ink' : 'border-[#D2D3D5] hover:border-[#8c9096]'
                        }`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={src} alt="" loading="lazy" className="w-full h-full object-contain p-1.5" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="space-y-8 min-w-0">
              <h2 className="font-heading text-3xl sm:text-4xl leading-tight">{product.name}</h2>

              {specs.length > 0 && (
                <dl className="border-t border-[#D2D3D5]">
                  {specs.map(([key, value]) => (
                    <div
                      key={key}
                      className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-4 py-2.5 border-b border-[#D2D3D5]/60 text-base"
                    >
                      <dt className="font-bold text-[#001041]">{key}</dt>
                      <dd className="text-[#494f52]">{value}</dd>
                    </div>
                  ))}
                </dl>
              )}

              {features.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-heading font-semibold text-xl sm:text-2xl text-[#001041]">Sobre este producto</h3>
                  <ul className="list-disc pl-5 space-y-2.5 marker:text-[#001041] text-base sm:text-lg text-[#494f52] leading-snug">
                    {features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {product.full_description && (
            <div className="max-w-3xl space-y-4">
              <h2 className="font-heading text-3xl sm:text-4xl">Descripción</h2>
              {product.full_description.split(/\n{2,}/).map((para, i) => (
                <p key={i} className="text-base sm:text-lg text-[#494f52] leading-relaxed whitespace-pre-line">
                  {para}
                </p>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Más información: bloques con imagen */}
      {infoBlocks.length > 0 && (
        <section className="bg-white py-16 sm:py-24 border-t border-[#D2D3D5]/60">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-3xl sm:text-4xl">Más información</h2>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {infoBlocks.map((block, i) => (
                <article key={`${block.title}-${i}`} className="space-y-4">
                  <div className="aspect-square w-full overflow-hidden rounded-2xl bg-[#f4f5f6]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={block.image} alt={block.title} loading="lazy" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-heading text-xl leading-snug text-[#001041]">{block.title}</h3>
                  {block.subtitle && <p className="text-sm font-bold text-[#001041]">{block.subtitle}</p>}
                  <p className="text-base text-[#494f52] leading-relaxed whitespace-pre-line">{block.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-[#001041] text-white py-16 sm:py-24 relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 60% 80% at 90% 10%, rgba(0,158,188,0.25) 0%, transparent 60%)',
          }}
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-5">
            <p className="text-sm font-medium text-[#7fdcf0]">Con Mednova Technologies</p>
            <h2 className="font-heading text-3xl sm:text-5xl leading-[1.1]">
              Cotice {product.name} con nuestro equipo
            </h2>
            <p className="text-base sm:text-lg text-[#e4e6e8] leading-relaxed">
              Distribuidor exclusivo de VPG LaserOne en Perú. Le asesoramos según las necesidades de su institución.
            </p>
            <div className="pt-2">
              <a href={quoteUrl} target="_blank" rel="noopener noreferrer" className={primaryButton}>
                <MessageCircle className="w-5 h-5" />
                Solicitar cotización
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="bg-white py-16 sm:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-3xl sm:text-4xl">Preguntas frecuentes</h2>
            <div className="mt-8 space-y-3">
              {faqs.map((faq, idx) => {
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
                      <ChevronDown
                        className={`w-5 h-5 shrink-0 text-teal-ink transition-transform ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    <p hidden={!isOpen} className="px-6 pb-6 text-base text-[#494f52] leading-relaxed whitespace-pre-line">
                      {faq.answer}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Related */}
      {others.length > 0 && (
        <section className="bg-[#f4f5f6] py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-2xl sm:text-3xl">Más {isEquipo ? 'equipos' : 'consumibles'}</h2>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {others.map((p) => (
                <Link
                  key={p.id}
                  href={`${listPath}/${p.slug}`}
                  className="group rounded-3xl bg-white border border-[#D2D3D5] overflow-hidden hover:border-[#009EBC] hover:shadow-xl hover:shadow-[#009EBC]/10 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="aspect-[4/3] bg-white relative border-b border-[#D2D3D5]">
                    {p.images[0] && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-contain p-4"
                      />
                    )}
                  </div>
                  <div className="p-5 space-y-1">
                    <h3 className="font-heading text-lg text-[#001041]">{p.name}</h3>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-teal-ink">
                      Ver detalles <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Mobile sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#001041]/95 backdrop-blur-md border-t border-white/15 p-3 sm:hidden">
        <a
          href={quoteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 px-4 rounded-full bg-teal-ink text-white text-base font-semibold flex items-center justify-center gap-2"
        >
          <MessageCircle className="w-5 h-5" />
          Solicitar cotización
        </a>
      </div>
    </div>
  );
}
