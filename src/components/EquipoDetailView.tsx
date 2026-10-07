'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ChevronDown,
  Cpu,
  FileDown,
  Maximize2,
  MessageCircle,
  Plug,
  ShieldCheck,
  Wind,
  Wrench,
} from 'lucide-react';
import { COMPANY_INFO } from '@/lib/data';
import { UROLASE_FAQS } from '@/lib/urolase-faq';
import { Product } from '@/types/product';
import ModelViewer3D from '@/components/ModelViewer3D';
import VpgBacking from '@/components/VpgBacking';

interface EquipoDetailViewProps {
  product: Product;
  relatedEquipos: Product[];
}

type MediaTab = 'model-3d' | 'photos' | 'video-ergo' | 'video-onepush';

const MODEL_URL = '/modelos_3d/urolase_max_mejorado2.glb';

const advantageIcons = [Maximize2, Plug, Wind, Wrench];

const fiberDiameters = [
  { um: 940, size: 'w-20 h-20' },
  { um: 550, size: 'w-[4.5rem] h-[4.5rem]' },
  { um: 365, size: 'w-16 h-16' },
  { um: 200, size: 'w-14 h-14' },
  { um: 150, size: 'w-12 h-12' },
];

// Barras del gráfico de retropulsión del brochure (0 – 10 mm). El brochure no publica valores numéricos,
// por eso solo se muestra la escala relativa.
const retropulsionBars = [
  { label: 'Pulso 120 H, pulso largo', width: 100, highlight: false },
  { label: 'Pulso 120 H, pulso Moses', width: 92, highlight: false },
  { label: 'Urolase SP+, pulso optimizado', width: 44, highlight: false },
  { label: 'Urolase MAX', width: 36, highlight: true },
];

const primaryButton =
  'relative overflow-hidden inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-teal-ink hover:bg-[#00819a] text-white font-semibold shadow-lg shadow-[#009EBC]/20 hover:shadow-xl hover:shadow-[#009EBC]/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 before:absolute before:inset-0 before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700 before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent';

const ghostButton =
  'inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-white/40 hover:border-white hover:bg-white hover:text-[#001041] text-white font-medium hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300';

export default function EquipoDetailView({ product }: EquipoDetailViewProps) {
  const [mediaTab, setMediaTab] = useState<MediaTab>('model-3d');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const waLink = (text: string) => `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(text)}`;
  const quoteUrl = waLink(product.whatsapp_message || `Hola Mednova Technologies, deseo una cotización de ${product.name}.`);
  const mentoringUrl = waLink('Hola Mednova Technologies, deseo conocer más sobre la mentoría y el servicio postventa de Urolase MAX.');

  const litotricia = product.clinical_applications?.find((a) => a.id === 'litotricia');
  const tejidos = product.clinical_applications?.find((a) => a.id === 'tejidos-blandos');
  const tissueSensor = product.safety_features?.find((f) => f.title === 'Tissue Sensor');
  const assistant = product.safety_features?.find((f) => f.title === "Surgeon's Assistant");
  const onePush = product.safety_features?.find((f) => f.title === 'Conector OnePush');

  const tabs: { id: MediaTab; label: string }[] = [
    { id: 'model-3d', label: 'Vista 3D' },
    { id: 'photos', label: 'Fotografías' },
    { id: 'video-ergo', label: 'Video: ergonomía' },
    { id: 'video-onepush', label: 'Video: conector OnePush' },
  ];

  return (
    <div className="w-full bg-[#f4f5f6] text-[#001041] pb-20 sm:pb-0">
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
            <span className="text-white">Urolase MAX</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-6">
              <p className="inline-flex items-center gap-2 text-sm font-medium text-[#7fdcf0]">
                <span className="w-8 h-px bg-[#009EBC]" aria-hidden="true" />
                Distribuidor exclusivo de VPG LaserOne en Perú
              </p>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl leading-[1.05]">
                Urolase <span className="text-[#33c3df]">MAX</span>
              </h1>
              <p className="text-xl sm:text-2xl font-heading text-[#e4e6e8] leading-snug">{product.tagline}</p>
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

            {/* Media */}
            <div className="lg:col-span-6 space-y-3">
              <div role="tablist" aria-label="Contenido multimedia" className="flex flex-wrap gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    role="tab"
                    aria-selected={mediaTab === tab.id}
                    onClick={() => setMediaTab(tab.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                      mediaTab === tab.id
                        ? 'bg-white text-[#001041]'
                        : 'bg-white/10 text-white hover:bg-white/20 border border-white/15'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden border border-white/10 bg-black">
                {mediaTab === 'model-3d' && (
                  <ModelViewer3D src={MODEL_URL} alt={`Modelo 3D interactivo del láser ${product.name}`} />
                )}
                {mediaTab === 'photos' && (
                  <div className="absolute inset-0 bg-white flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={product.images[0]}
                      alt="Consola láser Urolase MAX de VPG LaserOne"
                      className="w-full h-full object-contain p-4"
                    />
                  </div>
                )}
                {mediaTab === 'video-ergo' && (
                  <video
                    key="ergo"
                    src="/videos/UMax - ergonomics.webm"
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls
                    className="absolute inset-0 w-full h-full object-contain"
                  />
                )}
                {mediaTab === 'video-onepush' && (
                  <video
                    key="onepush"
                    src="/videos/UMax - ergonomics.webm"
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls
                    className="absolute inset-0 w-full h-full object-contain"
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

      {/* Advantages */}
      <section className="bg-[#f4f5f6] py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-3">
            <h2 className="font-heading text-3xl sm:text-4xl">Ventajas del sistema</h2>
            <p className="text-base sm:text-lg text-[#494f52] leading-relaxed">
              Una plataforma pensada para integrarse con facilidad a su quirófano.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {product.system_advantages?.map((adv, i) => {
              const Icon = advantageIcons[i] ?? Cpu;
              return (
                <div
                  key={adv.title}
                  className="group rounded-3xl bg-white border border-[#D2D3D5] p-7 space-y-4 hover:border-[#009EBC] hover:shadow-xl hover:shadow-[#009EBC]/10 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#001041] text-[#33c3df] flex items-center justify-center group-hover:bg-teal-ink group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading text-lg leading-snug">{adv.title}</h3>
                  <p className="text-base text-[#494f52] leading-relaxed">{adv.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tissue Sensor */}
      {tissueSensor && (
        <section className="bg-[#001041] text-white py-16 sm:py-24 relative overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse 50% 60% at 10% 50%, rgba(0,158,188,0.18) 0%, transparent 70%)' }}
          />
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-5">
              <p className="inline-flex items-center gap-2 text-sm font-medium text-[#7fdcf0]">
                <ShieldCheck className="w-4 h-4" />
                Seguridad
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl">Tissue Sensor: reconocimiento de cálculo vs tejido</h2>
              <p className="text-base sm:text-lg text-[#e4e6e8] leading-relaxed">{tissueSensor.description}</p>
              <p className="text-base text-[#c9ced3] leading-relaxed">
                El sistema opera bajo el principio de diferenciación tisular en tiempo real. Detecta si frente a la punta de la fibra quirúrgica hay tejido duro (cálculo) o blando. Durante la litotricia, detiene automáticamente la emisión láser al detectar tejido blando, reduciendo significativamente el riesgo de lesión o perforación.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-3xl border border-white/15 bg-white/[0.05] p-6 space-y-3">
                <span className="inline-flex items-center rounded-full bg-[#0b6b55] px-3 py-1 text-sm font-semibold text-white">Láser activo</span>
                <h3 className="font-heading text-xl">Frente a un cálculo</h3>
                <p className="text-base text-[#c9ced3] leading-relaxed">
                  La fibra detecta tejido duro y el láser emite para realizar la litotricia.
                </p>
              </div>
              <div className="rounded-3xl border border-[#33c3df]/40 bg-white/[0.08] p-6 space-y-3">
                <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-sm font-semibold text-[#001041]">Emisión detenida</span>
                <h3 className="font-heading text-xl">Frente a tejido blando</h3>
                <p className="text-base text-[#c9ced3] leading-relaxed">
                  El sistema detiene la emisión del láser de forma automática.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Litotricia */}
      {litotricia && (
        <section className="bg-white py-16 sm:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-3">
              <p className="text-sm font-medium text-teal-ink">{litotricia.subtitle}</p>
              <h2 className="font-heading text-3xl sm:text-4xl">{litotricia.title}</h2>
              <p className="text-base sm:text-lg text-[#494f52] leading-relaxed">{litotricia.description}</p>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              {litotricia.modes.map((mode) => (
                <div
                  key={mode.title}
                  className="rounded-3xl bg-[#f4f5f6] border border-[#D2D3D5] p-7 space-y-3 hover:border-[#009EBC] hover:shadow-lg hover:shadow-[#009EBC]/10 transition-all duration-300"
                >
                  {mode.badge && (
                    <span className="inline-flex rounded-full bg-[#001041] px-3 py-1 text-sm font-medium text-[#7fdcf0]">{mode.badge}</span>
                  )}
                  <h3 className="font-heading text-xl">{mode.title}</h3>
                  <p className="text-base text-[#494f52] leading-relaxed">{mode.description}</p>
                </div>
              ))}
            </div>

            {/* Retropulsion chart (relative scale, as published by VPG LaserOne) */}
            <div className="mt-10 rounded-3xl border border-[#D2D3D5] bg-[#f4f5f6] p-6 sm:p-10">
              <h3 className="font-heading text-xl sm:text-2xl">Modo MRP: retropulsión del cálculo</h3>
              <p className="mt-2 text-base text-[#494f52] leading-relaxed max-w-3xl">
                Comparación de la retropulsión del cálculo entre láseres de holmio, modos de pulso estándar de la serie Urolase y Urolase MAX.
              </p>
              <div className="mt-8 space-y-4" role="img" aria-label="Gráfico de barras: Urolase MAX muestra la menor retropulsión entre las opciones comparadas">
                {retropulsionBars.map((bar) => (
                  <div key={bar.label} className="grid grid-cols-[8rem_1fr] sm:grid-cols-[14rem_1fr] items-center gap-4">
                    <span className={`text-sm sm:text-base ${bar.highlight ? 'font-semibold text-teal-ink' : 'text-[#494f52]'}`}>{bar.label}</span>
                    <div className="h-8 rounded-sm bg-[#e4e6e8] overflow-hidden">
                      <div
                        className={`h-full rounded-sm ${bar.highlight ? 'bg-teal-ink' : 'bg-[#8c9096]'}`}
                        style={{ width: `${bar.width}%` }}
                      />
                    </div>
                  </div>
                ))}
                <div className="grid grid-cols-[8rem_1fr] sm:grid-cols-[14rem_1fr] gap-4">
                  <span />
                  <div className="flex justify-between text-sm text-[#494f52]">
                    <span>0</span>
                    <span>5</span>
                    <span>10 mm</span>
                  </div>
                </div>
              </div>
              {litotricia.scientific_note && (
                <p className="mt-6 text-sm text-[#494f52] leading-relaxed">
                  * Pulso largo. Gráfico reproducido a partir del brochure de VPG LaserOne; el brochure no publica valores numéricos. {litotricia.scientific_note}
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Tejidos blandos */}
      {tejidos && (
        <section className="bg-[#f4f5f6] py-16 sm:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-3">
              <p className="text-sm font-medium text-teal-ink">{tejidos.subtitle}</p>
              <h2 className="font-heading text-3xl sm:text-4xl">{tejidos.title}</h2>
              <p className="text-base sm:text-lg text-[#494f52] leading-relaxed">{tejidos.description}</p>
            </div>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              {tejidos.modes.map((mode) => (
                <div
                  key={mode.title}
                  className="rounded-3xl bg-white border border-[#D2D3D5] p-7 space-y-3 hover:border-[#009EBC] hover:shadow-lg hover:shadow-[#009EBC]/10 transition-all duration-300"
                >
                  {mode.badge && (
                    <span className="inline-flex rounded-full bg-[#001041] px-3 py-1 text-sm font-medium text-[#7fdcf0]">{mode.badge}</span>
                  )}
                  <h3 className="font-heading text-xl">{mode.title}</h3>
                  <p className="text-base text-[#494f52] leading-relaxed">{mode.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Surgeon's Assistant + OnePush */}
      <section className="bg-[#001041] text-white py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {assistant && (
            <div className="rounded-3xl border border-white/15 bg-white/[0.05] p-8 sm:p-10 space-y-4">
              <p className="text-sm font-medium text-[#7fdcf0]">{assistant.subtitle}</p>
              <h2 className="font-heading text-3xl">Surgeon&apos;s Assistant</h2>
              <p className="text-base sm:text-lg text-[#e4e6e8] leading-relaxed">{assistant.description}</p>
              <p className="text-base text-[#c9ced3] leading-relaxed">
                Pantalla táctil con perfiles Soft Tissue y Stone, y modos Quick Start, Assistant y Expert.
              </p>
            </div>
          )}
          {onePush && (
            <div className="rounded-3xl border border-white/15 bg-white/[0.05] p-8 sm:p-10 space-y-5">
              <p className="text-sm font-medium text-[#7fdcf0]">{onePush.subtitle}</p>
              <h2 className="font-heading text-3xl">Conector OnePush y fibras VPG</h2>
              <p className="text-base sm:text-lg text-[#e4e6e8] leading-relaxed">{onePush.description}</p>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-white/10 border border-white/20 px-3 py-1 text-sm">Desechable (uso único)</span>
                <span className="rounded-full bg-white/10 border border-white/20 px-3 py-1 text-sm">Reutilizable (uso múltiple)</span>
              </div>
              <div>
                <p className="text-sm text-[#c9ced3] mb-3">Diámetros disponibles, µm</p>
                <div className="flex items-end gap-3 sm:gap-4 flex-wrap">
                  {fiberDiameters.map((d) => (
                    <div key={d.um} className="flex flex-col items-center gap-2">
                      <div className={`${d.size} rounded-full bg-[#33c3df]/90`} />
                      <span className="text-sm text-[#e4e6e8]">{d.um}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Link
                href="/consumibles/fibras-quirurgicas-vpg"
                className="inline-flex items-center gap-2 text-base font-semibold text-[#7fdcf0] hover:text-white transition-colors"
              >
                Ver fibras quirúrgicas VPG
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* VPG LaserOne backing */}
      <VpgBacking className="bg-white" />

      {/* Technical sheet */}
      {product.specifications && (
        <section className="bg-[#f4f5f6] py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-3xl sm:text-4xl">Ficha técnica</h2>
            <p className="mt-3 text-base text-[#494f52] leading-relaxed">
              Resumen según el brochure oficial de VPG LaserOne. Para parámetros eléctricos y técnicos detallados, solicite la ficha completa.
            </p>
            <dl className="mt-8 rounded-3xl bg-white border border-[#D2D3D5] divide-y divide-[#D2D3D5] overflow-hidden">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-6 px-6 py-4">
                  <dt className="text-base font-semibold text-[#001041]">{key}</dt>
                  <dd className="sm:col-span-2 text-base text-[#494f52]">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

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
            <h2 className="font-heading text-3xl sm:text-5xl leading-[1.1]">Mentoría y servicio postventa personalizados</h2>
            <p className="text-base sm:text-lg text-[#e4e6e8] leading-relaxed">
              Somos el distribuidor exclusivo de VPG LaserOne en Perú. Cada institución es distinta, por eso el acompañamiento y el servicio postventa se definen con usted.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a href={quoteUrl} target="_blank" rel="noopener noreferrer" className={primaryButton}>
                <MessageCircle className="w-5 h-5" />
                <span className="relative">Solicitar cotización</span>
              </a>
              <a href={mentoringUrl} target="_blank" rel="noopener noreferrer" className={ghostButton}>
                Consultar por la mentoría
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl sm:text-4xl">Preguntas frecuentes sobre Urolase MAX</h2>
          <div className="mt-8 space-y-3">
            {UROLASE_FAQS.map((faq, idx) => {
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
