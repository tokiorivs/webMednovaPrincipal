'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import {
  ArrowLeft,
  ArrowUpRight,
  ShieldCheck,
  Check,
  MessageCircle,
  FileText,
  Calendar,
  Share2,
  CheckCircle2,
  FileDown,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ChevronDown,
  Zap,
  Activity,
  Sparkles,
  Layers,
  Cpu,
  Eye,
  Wind,
  Wrench,
  Building2,
  Award,
  Clock,
  HeartHandshake,
  CheckCircle,
  Sliders,
  ChevronRight,
  X,
  Microscope,
  Stethoscope,
  Info,
  HelpCircle,
} from 'lucide-react';
import { Product } from '@/types/product';
import { COMPANY_INFO } from '@/lib/data';

interface EquipoDetailViewProps {
  product: Product;
  relatedEquipos: Product[];
}

const ModelViewer3D = dynamic(() => import('./ModelViewer3D'), { ssr: false });

export default function EquipoDetailView({
  product,
  relatedEquipos,
}: EquipoDetailViewProps) {
  // Cinematic Full-Width Video Hero state (Logitech G HITS style)
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const [heroVideoSrc, setHeroVideoSrc] = useState<string>(
    product.video_url || '/videos/UMax - ergonomics.webm'
  );
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  const togglePlay = () => {
    if (heroVideoRef.current) {
      if (isVideoPlaying) {
        heroVideoRef.current.pause();
        setIsVideoPlaying(false);
      } else {
        heroVideoRef.current.play();
        setIsVideoPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (heroVideoRef.current) {
      heroVideoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Media stage state
  const [selectedImage, setSelectedImage] = useState<string>(
    product.images && product.images.length > 0
      ? product.images[0]
      : 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80'
  );

  const model3dUrl = product.slug === 'urolase-max' ? '/modelos_3d/urolase_max_mejorado.glb' : null;
  const [activeMediaTab, setActiveMediaTab] = useState<'image' | 'video-ergo' | 'video-onepush' | 'model-3d'>(
    model3dUrl ? 'model-3d' : 'image'
  );

  // Logitech G Inspired Interactive Pillar Tabs ('HITS Explained' equivalent)
  const [activePillarTab, setActivePillarTab] = useState<
    'tissue-sensor' | 'finepulse' | 'thuflep' | 'onepush'
  >('tissue-sensor');

  // Interactive Tissue Sensor Demo state
  const [sensorSimulationTarget, setSensorSimulationTarget] = useState<'stone' | 'tissue'>('stone');

  // Clinical modes selector state
  const [activeClinicalTab, setActiveClinicalTab] = useState<number>(0);

  // Share button copied state
  const [copied, setCopied] = useState(false);

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const waText =
    product.whatsapp_message ||
    `Hola Mednova Technologies, deseo solicitar asesoría técnica y cotización formal del equipo ${product.name} (Modelo: ${product.model}).`;
  const waUrl = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(waText)}`;

  const demoText = `Hola Mednova Technologies, deseo coordinar una demostración quirúrgica en quirófano del equipo ${product.name} (${product.model}).`;
  const demoUrl = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(demoText)}`;

  return (
    <div className="w-full bg-[#f4f5f6] text-[#001041]">
      {/* ─────────────────────────────────────────────────────────────
          1. TOP NAVIGATION & STATUS BAR
         ───────────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-dashed border-[#D2D3D5] pb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono-tech uppercase text-[#001041] hover:text-teal-ink transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Volver al Inicio</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#25b895]/10 text-ok-ink text-xs font-mono-tech uppercase tracking-wider font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#25b895] animate-pulse" />
              FLAGSHIP QUIRÚRGICO • VPG LASERONE
            </span>
            <span className="text-xs font-mono-tech text-[#334155] uppercase hidden sm:inline">
              EQUIPOS / {product.model}
            </span>
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-dashed border-[#D2D3D5] bg-white text-sm font-mono-tech text-[#001041] hover:border-[#001041] transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-ok-ink" />
                  <span>Enlace copiado</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-[#334155]" />
                  <span>Compartir</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. CINEMATIC VIDEO HERO (Logitech G HITS Style Full-Width)
         ───────────────────────────────────────────────────────────── */}
      <section className="relative w-full min-h-[540px] sm:min-h-[600px] lg:min-h-[660px] bg-black overflow-hidden flex items-center border-b border-dashed border-[#D2D3D5]/40 select-none">
        {/* Background Autoplaying Video */}
        <video
          ref={heroVideoRef}
          src={heroVideoSrc}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-85 transition-opacity duration-700"
        />

        {/* Dual Cinematic Gradients for Crisp Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#001041]/95 via-[#001041]/75 to-transparent z-1" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#001041] via-transparent to-black/40 z-1" />

        {/* Overlaid Typography & Actions */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 py-16 sm:py-20">
          <div className="max-w-3xl space-y-4">
            
            {/* Category / Technology Eyebrow */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full border border-dashed border-[#009EBC]/50 bg-[#001041]/85 backdrop-blur-md text-teal-ink text-xs font-mono-tech uppercase font-bold tracking-widest shadow-lg">
              <span className="w-2 h-2 rounded-full bg-[#25b895] animate-pulse" />
              <span>MEDNOVA • DISTRIBUIDOR EXCLUSIVO PERÚ • VPG LASERONE</span>
            </div>

            {/* Giant Logitech G Style Headline (Single Unique H1 for Full SEO) */}
            <h1 className="font-heading font-light uppercase text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[0.98]">
              UROLASE MAX
              <span className="block text-xl sm:text-2xl lg:text-3xl text-teal-ink font-mono-tech mt-2.5 tracking-normal font-semibold normal-case sm:uppercase">
                Nueva tecnología láser de alta precisión para urología
              </span>
            </h1>

            {/* Subheading / Value Proposition */}
            <p className="text-sm sm:text-base lg:text-lg font-mono-tech text-teal-ink uppercase font-semibold tracking-wide">
              Litotricia Modulada FinePulse • Mínima Retropulsión MRP* • Sensor de Seguridad Tisular
            </p>

            {/* Narrative Lead */}
            <p className="text-base sm:text-lg text-[#D2D3D5] leading-relaxed font-mono-tech max-w-2xl">
              El sistema de láser de fibra de tulio más potente y seguro para urología: litotricia de alta velocidad con mínima retropulsión (≈ 3.5 mm) y dos modos de enucleación prostática (DissectPulse y ThuFLEP) con Tissue Sensor™ de detención automática en tejido blando.
            </p>

            {/* CTA Buttons Cluster */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 px-6 rounded-sm bg-teal-ink hover:bg-[#007f97] text-white font-mono-tech text-xs uppercase tracking-widest font-bold transition-all shadow-lg shadow-[#009EBC]/25 flex items-center gap-2.5 cursor-pointer group"
              >
                <MessageCircle className="w-4 h-4 text-white" />
                <span>Solicitar Cotización Inmediata</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
 href={demoUrl}
 target="_blank"
 rel="noopener noreferrer"
                className="py-3.5 px-6 rounded-sm bg-white/10 hover:bg-white text-white hover:text-[#001041] border border-dashed border-white/30 font-mono-tech text-xs uppercase tracking-widest font-semibold transition-all flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-teal-ink" />
                <span>Agendar Demostración Quirúrgica</span>
              </a>

              <a
                href="#exploracion-tecnica"
                className="py-3.5 px-5 rounded-sm bg-black/40 hover:bg-black/70 text-[#D2D3D5] hover:text-white border border-dashed border-white/20 font-mono-tech text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5"
              >
                <span>Ver Ficha Técnica</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </div>

        {/* Bottom Floating Control Bar (Play/Pause/Mute) */}
        <div className="absolute bottom-4 right-4 sm:right-8 z-20 flex items-center gap-2 pointer-events-auto">
          {/* Play/Pause & Mute controls */}
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isVideoPlaying ? 'Pausar video de fondo' : 'Reproducir video de fondo'}
            className="w-9 h-9 rounded-full bg-black/70 hover:bg-teal-ink text-white backdrop-blur-md border border-dashed border-white/30 flex items-center justify-center transition-all cursor-pointer shadow-md"
          >
            {isVideoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          </button>
          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? 'Activar audio' : 'Silenciar audio'}
            className="w-9 h-9 rounded-full bg-black/70 hover:bg-teal-ink text-white backdrop-blur-md border border-dashed border-white/30 flex items-center justify-center transition-all cursor-pointer shadow-md"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. HARDWARE SHOWCASE & EXPLORATION HUB
         ───────────────────────────────────────────────────────────── */}
      <section id="exploracion-tecnica" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Interactive Media Stage & Direct Official Downloads */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Media Selector Tabs */}
            <div className="flex flex-wrap items-center gap-2 pb-1">
              {model3dUrl && (
                <button
                  onClick={() => setActiveMediaTab('model-3d')}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono-tech uppercase tracking-wider transition-all cursor-pointer ${
                    activeMediaTab === 'model-3d'
                      ? 'bg-[#001041] text-white font-semibold shadow-sm'
                      : 'bg-white text-[#334155] border border-dashed border-[#D2D3D5] hover:text-[#001041]'
                  }`}
                >
                  Vista 3D
                </button>
              )}
              <button
                onClick={() => setActiveMediaTab('image')}
                className={`px-3 py-1.5 rounded-full text-xs font-mono-tech uppercase tracking-wider transition-all cursor-pointer ${
                  activeMediaTab === 'image'
                    ? 'bg-[#001041] text-white font-semibold shadow-sm'
                    : 'bg-white text-[#334155] border border-dashed border-[#D2D3D5] hover:text-[#001041]'
                }`}
              >
                Fotografías de Consola
              </button>
              <button
                onClick={() => setActiveMediaTab('video-ergo')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono-tech uppercase tracking-wider transition-all cursor-pointer ${
                  activeMediaTab === 'video-ergo'
                    ? 'bg-teal-ink text-white font-semibold shadow-sm'
                    : 'bg-white text-[#334155] border border-dashed border-[#D2D3D5] hover:text-teal-ink'
                }`}
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Video: Ergonomía</span>
              </button>
              <button
                onClick={() => setActiveMediaTab('video-onepush')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono-tech uppercase tracking-wider transition-all cursor-pointer ${
                  activeMediaTab === 'video-onepush'
                    ? 'bg-teal-ink text-white font-semibold shadow-sm'
                    : 'bg-white text-[#334155] border border-dashed border-[#D2D3D5] hover:text-teal-ink'
                }`}
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Video: Conector OnePush™</span>
              </button>
            </div>

            {/* Main Stage Viewport */}
            <div className="border border-dashed border-[#D2D3D5] bg-white p-4 sm:p-6 rounded-sm relative overflow-hidden group shadow-sm">
              <div className="relative aspect-4/3 w-full bg-[#f8f9fa] rounded-xs overflow-hidden flex items-center justify-center">
                {activeMediaTab === 'model-3d' && model3dUrl ? (
                  <ModelViewer3D
                    src={model3dUrl}
                    alt={`Modelo 3D interactivo del láser ${product.name}`}
                  />
                ) : activeMediaTab === 'video-ergo' ? (
                  <video
                    src="/videos/UMax - ergonomics.webm"
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls
                    className="w-full h-full object-contain bg-black rounded-xs"
                  />
                ) : activeMediaTab === 'video-onepush' ? (
                  <video
                    src="/videos/OnePuch_activation.webm"
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls
                    className="w-full h-full object-contain bg-black rounded-xs"
                  />
                ) : (
                  <img
                    src={selectedImage}
                    alt={`Consola quirúrgica láser de tulio ${product.name} (${product.model}) para litotricia y próstata - Mednova Perú`}
                    className="w-full h-full object-contain p-2 transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                )}
              </div>

              {/* Technical calibration badge strip */}
              <div className="mt-4 pt-3 border-t border-dashed border-[#D2D3D5] flex flex-wrap items-center justify-between text-sm font-mono-tech text-[#334155] gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#25b895] animate-pulse" />
                  <span className="text-[#001041] font-semibold">DISTRIBUIDOR EXCLUSIVO VPG LASERONE</span>
                </div>
                <span className="font-medium">REF: {product.model} • ESTADO SÓLIDO</span>
              </div>
            </div>

            {/* Thumbnail Strip */}
            {product.images && product.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedImage(img);
                      setActiveMediaTab('image');
                    }}
                    className={`relative w-20 h-20 shrink-0 border rounded-xs overflow-hidden transition-all cursor-pointer bg-white ${
                      selectedImage === img && activeMediaTab === 'image'
                        ? 'border-[#001041] ring-2 ring-[#001041]/20 scale-102'
                        : 'border-dashed border-[#D2D3D5] opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} (${product.model}) - Vista ${idx + 1} de consola láser de fibra de tulio`}
                      className="w-full h-full object-contain p-1"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Key Features Quick List (Placed on left directly under media for visual balance) */}
            {product.features && product.features.length > 0 && (
              <div className="border border-dashed border-[#D2D3D5] bg-white p-5 rounded-sm space-y-3 shadow-sm">
                <div className="flex items-center justify-between pb-2 border-b border-dashed border-[#D2D3D5]">
                  <h3 className="text-sm font-mono-tech font-bold uppercase tracking-wider text-[#001041]">
                    Capacidades Quirúrgicas Destacadas
                  </h3>
                  <span className="text-xs font-mono-tech text-teal-ink font-semibold uppercase">
                    ESTÁNDAR CLÍNICO
                  </span>
                </div>

                <ul className="space-y-2.5 text-sm sm:text-base font-mono-tech text-[#334155]">
                  {product.features.slice(0, 6).map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-4 h-4 rounded-full bg-[#009EBC]/10 text-teal-ink flex items-center justify-center shrink-0 mt-0.5 text-sm font-bold">
                        ✓
                      </span>
                      <span className="leading-relaxed">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>

          {/* Right Column: Identity, Narrative, Tech Badges, Metrics & Conversion Hub */}
          <div className="lg:col-span-6 space-y-5">
            
            {/* Header info & Badges */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full border border-dashed border-[#009EBC] bg-[#009EBC]/10 text-xs font-mono-tech text-teal-ink uppercase tracking-wider font-semibold">
                  {product.specialty}
                </span>
                <span className="px-3 py-1 rounded-full border border-dashed border-[#001041]/20 bg-white text-xs font-mono-tech text-[#001041] uppercase tracking-wider font-semibold">
                  TECNOLOGÍA TFL SUPERPULSADA • 1940 NM
                </span>
              </div>

              <h2 className="font-heading font-light uppercase text-3xl sm:text-4xl lg:text-5xl text-[#001041] leading-[1.08] tracking-tight">
                {product.name}
              </h2>

              {product.tagline && (
                <p className="text-sm sm:text-base font-semibold text-teal-ink font-mono-tech uppercase tracking-wide">
                  {product.tagline}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-4 text-sm font-mono-tech text-[#334155] pt-1 border-b border-dashed border-[#D2D3D5] pb-3">
                <span>MODELO: <strong className="text-[#001041]">{product.model}</strong></span>
                <span>•</span>
                <span>FABRICANTE: <strong className="text-[#001041]">{product.brand} (IPG Photonics)</strong></span>
              </div>

              <p className="text-base text-[#334155] leading-relaxed pt-1 font-mono-tech">
                {product.full_description || product.short_description}
              </p>
            </div>

            {/* Key Metrics Strip (Modular Highlight Grid) */}
            {product.key_metrics && product.key_metrics.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
                {product.key_metrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-white border border-dashed border-[#D2D3D5] rounded-sm space-y-0.5 hover:border-[#009EBC] transition-colors shadow-2xs"
                  >
                    <span className="text-xs font-mono-tech text-[#334155] font-semibold uppercase block truncate">
                      {metric.label}
                    </span>
                    <div className="flex items-baseline gap-1 text-[#001041] font-heading font-bold text-lg sm:text-xl">
                      <span>{metric.value}</span>
                      {metric.unit && (
                        <span className="text-sm font-mono-tech text-teal-ink font-normal">
                          {metric.unit}
                        </span>
                      )}
                    </div>
                    {metric.helper && (
                      <span className="text-sm text-[#334155] block leading-tight font-mono-tech">
                        {metric.helper}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Primary Action Buttons (B2B Conversion Hub) */}
            <div className="pt-2 space-y-3">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 rounded-sm bg-[#001041] hover:bg-teal-ink text-white font-mono-tech text-sm sm:text-base uppercase tracking-wider font-bold transition-all shadow-md shadow-[#001041]/20 flex items-center justify-center gap-3 cursor-pointer group"
              >
                <MessageCircle className="w-5 h-5 text-ok-ink" />
                <span>Solicitar Cotización Inmediata por WhatsApp</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

            </div>

            {/* Direct Official PDF Download */}
            {product.brochure_url && (
              <a
                href={product.brochure_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full p-3.5 rounded-sm bg-gradient-to-r from-[#001041] to-[#041d63] hover:from-[#009EBC] hover:to-[#007f97] text-white border border-[#009EBC]/30 shadow-sm transition-all flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <FileDown className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="text-left font-mono-tech">
                    <p className="text-xs sm:text-sm font-bold tracking-wider uppercase text-white">
                      Descargar Dossier Técnico Oficial (PDF)
                    </p>
                    <p className="text-sm text-[#D2D3D5]">
                      Parámetros biomédicos completos de VPG LaserOne y protocolos clínicos
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
              </a>
            )}

            {/* Warranty & Hospital Support Assurance */}
            <div className="border border-dashed border-[#D2D3D5] bg-white p-4 rounded-sm flex items-start gap-3.5 shadow-2xs">
              <div className="w-9 h-9 rounded-sm bg-[#001041]/5 text-teal-ink flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="font-mono-tech space-y-0.5">
                <p className="font-bold uppercase text-[#001041] tracking-wider text-xs sm:text-sm">
                  Acompañamiento Quirúrgico Mednova
                </p>
                <p className="text-[#334155] leading-relaxed text-sm sm:text-base">
                  Todos nuestros sistemas incluyen entrega e instalación en quirófano, capacitación certificada in-situ para urólogos y personal de enfermería, y soporte biomédico presencial en Perú.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. INTERACTIVE TECHNOLOGY EXPLAINER: 4 PILLARS
             (Logitech G: "HITS, Explained" Tabbed Interactive Deep Dive)
         ───────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#001041] text-white relative overflow-hidden font-mono-tech">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#009EBC]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#25b895]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
          
          {/* Header */}
          <div className="max-w-3xl space-y-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-dashed border-[#D2D3D5]/30 text-teal-ink text-xs font-mono-tech tracking-widest uppercase font-bold">
              INGENIERÍA BIOMÉDICA PROPIETARIA
            </span>
            <h2 className="font-heading font-light uppercase text-3xl sm:text-5xl text-white tracking-tight leading-tight">
              Tecnología Urolase MAX, Explicada
            </h2>
            <p className="text-base text-[#D2D3D5] leading-relaxed">
              Explore los cuatro pilares tecnológicos desarrollados por VPG LaserOne que convierten a Urolase MAX en la plataforma quirúrgica más avanzada del quirófano urológico.
            </p>
          </div>

          {/* Interactive Pillar Tabs Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 border-b border-dashed border-white/20 pb-4">
            <button
              onClick={() => setActivePillarTab('tissue-sensor')}
              className={`p-3.5 rounded-sm border text-left transition-all cursor-pointer ${
                activePillarTab === 'tissue-sensor'
                  ? 'bg-teal-ink text-white border-[#009EBC] shadow-md font-bold'
                  : 'bg-white/5 text-[#D2D3D5] border-white/10 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between text-xs uppercase tracking-wider mb-1 opacity-80">
                <span>01. SEGURIDAD</span>
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs sm:text-sm font-heading font-bold block uppercase">
                Tissue Sensor™
              </span>
            </button>

            <button
              onClick={() => setActivePillarTab('finepulse')}
              className={`p-3.5 rounded-sm border text-left transition-all cursor-pointer ${
                activePillarTab === 'finepulse'
                  ? 'bg-teal-ink text-white border-[#009EBC] shadow-md font-bold'
                  : 'bg-white/5 text-[#D2D3D5] border-white/10 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between text-xs uppercase tracking-wider mb-1 opacity-80">
                <span>02. LITOTRICIA</span>
                <Zap className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs sm:text-sm font-heading font-bold block uppercase">
                FinePulse &amp; MRP
              </span>
            </button>

            <button
              onClick={() => setActivePillarTab('thuflep')}
              className={`p-3.5 rounded-sm border text-left transition-all cursor-pointer ${
                activePillarTab === 'thuflep'
                  ? 'bg-teal-ink text-white border-[#009EBC] shadow-md font-bold'
                  : 'bg-white/5 text-[#D2D3D5] border-white/10 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between text-xs uppercase tracking-wider mb-1 opacity-80">
                <span>03. PRÓSTATA</span>
                <Activity className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs sm:text-sm font-heading font-bold block uppercase">
                ThuFLEP &amp; DissectPulse
              </span>
            </button>

            <button
              onClick={() => setActivePillarTab('onepush')}
              className={`p-3.5 rounded-sm border text-left transition-all cursor-pointer ${
                activePillarTab === 'onepush'
                  ? 'bg-teal-ink text-white border-[#009EBC] shadow-md font-bold'
                  : 'bg-white/5 text-[#D2D3D5] border-white/10 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between text-xs uppercase tracking-wider mb-1 opacity-80">
                <span>04. HARDWARE</span>
                <Cpu className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs sm:text-sm font-heading font-bold block uppercase">
                OnePush™ &amp; Asistente
              </span>
            </button>
          </div>

          {/* Active Pillar Showcase Panel */}
          <div className="bg-[#04164b]/80 border border-[#009EBC]/30 rounded-sm p-6 sm:p-8">
            {activePillarTab === 'tissue-sensor' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-ok-ink text-white text-[10px] sm:text-xs leading-snug font-bold uppercase tracking-normal sm:tracking-wider">
                      INNOVACIÓN EXCLUSIVA DE VPG LASERONE
                    </span>
                    <span className="text-[10px] sm:text-xs leading-snug text-teal-ink">RESPUESTA EN TIEMPO REAL &lt; 1 MS</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-heading text-white uppercase font-light">
                    Tissue Sensor™: Protección Tisular Inteligente en Tiempo Real
                  </h3>

                  <p className="text-base text-[#D2D3D5] leading-relaxed">
                    A través de un sensor fotoespectral continuo integrado en el canal de emisión, Urolase MAX analiza la reflectancia óptica de la superficie objetivo. En el instante exacto en que la fibra toca o roza mucosa urotelial o pared vesical, <strong>el sistema suspende el haz láser en menos de 1 milisegundo</strong>.
                  </p>

                  <ul className="space-y-2.5 text-sm sm:text-base text-[#D2D3D5] pt-2">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#009EBC] shrink-0" />
                      <span><strong>Cero perforaciones accidentales</strong> en uréteres estrechos o tortuosos.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#009EBC] shrink-0" />
                      <span><strong>Confianza absoluta</strong> para el cirujano en cálices renales inferiores de difícil acceso.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#009EBC] shrink-0" />
                      <span><strong>Reactivación automática</strong> inmediata tan pronto la fibra vuelve a apuntar a la litiasis.</span>
                    </li>
                  </ul>
                </div>

                {/* Interactive Simulator Widget */}
                <div className="lg:col-span-5 bg-[#001041] p-5 rounded-sm border border-dashed border-[#009EBC]/40 space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-dashed border-white/10">
                    <span className="text-xs uppercase text-[#94a3b8] tracking-wider font-mono-tech font-semibold">
                      SIMULADOR INTERACTIVO TISSUE SENSOR™
                    </span>
                    <span className="text-sm text-teal-ink font-mono-tech font-semibold">EN VIVO</span>
                  </div>

                  <p className="text-sm text-[#D2D3D5]">
                    Pruebe cómo reacciona el sistema cambiando el objetivo de la fibra óptica:
                  </p>

                  {/* Toggle buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setSensorSimulationTarget('stone')}
                      className={`py-2 px-3 rounded-xs text-xs font-mono-tech uppercase font-bold tracking-wider transition-all cursor-pointer ${
                        sensorSimulationTarget === 'stone'
                          ? 'bg-teal-ink text-white shadow-sm'
                          : 'bg-white/10 text-[#D2D3D5] hover:bg-white/20'
                      }`}
                    >
                      Objetivo: Cálculo
                    </button>
                    <button
                      onClick={() => setSensorSimulationTarget('tissue')}
                      className={`py-2 px-3 rounded-xs text-xs font-mono-tech uppercase font-bold tracking-wider transition-all cursor-pointer ${
                        sensorSimulationTarget === 'tissue'
                          ? 'bg-ok-ink text-white shadow-sm'
                          : 'bg-white/10 text-[#D2D3D5] hover:bg-white/20'
                      }`}
                    >
                      Objetivo: Mucosa
                    </button>
                  </div>

                  {/* Simulator Screen */}
                  <div className="p-4 rounded-sm bg-[#061c5c] border border-white/10 space-y-3">
                    {sensorSimulationTarget === 'stone' ? (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-teal-ink uppercase">
                            ● DISPARO ACTIVO (1940 NM)
                          </span>
                          <span className="text-sm font-mono-tech px-2 py-0.5 rounded-full bg-[#009EBC]/20 text-teal-ink">
                            EMISIÓN PERMITIDA
                          </span>
                        </div>
                        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-[#009EBC] w-full animate-pulse" />
                        </div>
                        <p className="text-sm text-[#D2D3D5] leading-relaxed">
                          La señal óptica confirma densidad mineral. Pulverización Dusting activa a alta velocidad sin interrupción.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-ok-ink uppercase">
                            🛡️ DETENCIÓN INSTANTÁNEA
                          </span>
                          <span className="text-sm font-mono-tech px-2 py-0.5 rounded-full bg-[#25b895]/20 text-ok-ink">
                            PROTECCIÓN ACTIVA (&lt; 1 ms)
                          </span>
                        </div>
                        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-[#25b895] w-2/12" />
                        </div>
                        <p className="text-sm text-[#D2D3D5] leading-relaxed">
                          ¡Contacto con mucosa detectado! El haz láser se apagó automáticamente a 0.0 W para evitar lesión en el tejido.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activePillarTab === 'finepulse' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-6 space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-teal-ink text-white text-xs font-bold uppercase tracking-wider">
                        LITOTRICIA • PULSOS MODULADOS
                      </span>
                      <span className="text-sm text-ok-ink">RETROPULSIÓN ~3.5 MM</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-heading text-white uppercase font-light">
                      Pulsos Modulados: FinePulse, UltraPulse &amp; Modo MRP*
                    </h3>

                    <p className="text-base text-[#D2D3D5] leading-relaxed">
                      Los ajustes de pulso modulado y las características de alta potencia del sistema láser Urolase MAX elevan la litotricia a un nivel de eficiencia clínica fundamentalmente nuevo, superando a los sistemas láser urológicos convencionales.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div className="p-3.5 bg-white/5 border border-white/10 rounded-sm space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-teal-ink uppercase">Nuevo modo FinePulse</span>
                          <span className="text-sm text-[#D2D3D5] font-mono-tech border border-white/20 px-1.5 py-0.5 rounded-xs">10 mm</span>
                        </div>
                        <p className="text-sm sm:text-base text-[#D2D3D5] leading-relaxed">
                          Permite realizar litotricia a alta velocidad, pulverizando eficazmente los cálculos urinarios hasta obtener <strong>polvo ultrafino</strong>.
                        </p>
                      </div>

                      <div className="p-3.5 bg-white/5 border border-white/10 rounded-sm space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-ok-ink uppercase">Modo UltraPulse</span>
                          <span className="text-sm text-[#D2D3D5] font-mono-tech border border-white/20 px-1.5 py-0.5 rounded-xs">10 mm</span>
                        </div>
                        <p className="text-sm sm:text-base text-[#D2D3D5] leading-relaxed">
                          Proporciona <strong>energía de alto impacto</strong>, fragmentando de forma inmediata incluso cálculos densos en fragmentos grandes para extracción eficiente con canastilla.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* MRP* Visual Retropulsion Bar Chart (Exact replica of Brochure Page 3) */}
                  <div className="lg:col-span-6 bg-[#001041] p-5 sm:p-6 rounded-sm border border-dashed border-[#009EBC]/40 space-y-4">
                    <div className="flex items-center justify-between border-b border-dashed border-white/10 pb-2">
                      <div>
                        <span className="text-xs font-bold text-white uppercase tracking-wider block font-heading">
                          MRP* — MÍNIMA RETROPULSIÓN
                        </span>
                        <span className="text-sm text-teal-ink font-mono-tech">
                          Comparativa cuantitativa de desplazamiento de cálculo
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-[#25b895]/20 text-ok-ink text-sm font-bold font-mono-tech">
                        OFICIAL
                      </span>
                    </div>

                    <p className="text-sm sm:text-base text-[#D2D3D5] leading-relaxed">
                      El <strong>Modo MRP*</strong> minimiza la retropulsión del cálculo durante la litotricia en comparación con láseres de holmio y modos de pulso estándar de la serie de láseres de fibra de tulio Urolase.
                    </p>

                    {/* Chart Container */}
                    <div className="space-y-3 pt-1">
                      {/* Scale Header */}
                      <div className="flex justify-between text-sm text-[#94a3b8] font-mono-tech px-1 border-b border-white/10 pb-1">
                        <span>0 mm</span>
                        <span>5 mm</span>
                        <span>10 mm</span>
                      </div>

                      {/* Bar 1: Pulso 120 H / Pulso largo */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm text-[#D2D3D5]">
                          <span>Pulso 120 H / Pulso largo</span>
                          <span className="text-[#e06c75] font-bold font-mono-tech">10.0 mm</span>
                        </div>
                        <div className="h-4 w-full bg-white/5 rounded-xs overflow-hidden flex">
                          <div className="h-full bg-gradient-to-r from-[#494f52] to-[#71797a] w-[100%]" />
                        </div>
                      </div>

                      {/* Bar 2: Pulso 120 H / Pulso Moses */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm text-[#D2D3D5]">
                          <span>Pulso 120 H / Pulso Moses</span>
                          <span className="text-[#e5c07b] font-bold font-mono-tech">9.5 mm</span>
                        </div>
                        <div className="h-4 w-full bg-white/5 rounded-xs overflow-hidden flex">
                          <div className="h-full bg-gradient-to-r from-[#5c6370] to-[#abb2bf] w-[95%]" />
                        </div>
                      </div>

                      {/* Bar 3: Pulso SP+ / Pulso optimizado */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm text-[#D2D3D5]">
                          <span>Pulso SP+ / Pulso optimizado</span>
                          <span className="text-[#61afef] font-bold font-mono-tech">4.8 mm</span>
                        </div>
                        <div className="h-4 w-full bg-white/5 rounded-xs overflow-hidden flex">
                          <div className="h-full bg-gradient-to-r from-[#1e40af] to-[#3b82f6] w-[48%]" />
                        </div>
                      </div>

                      {/* Bar 4: Urolase MAX (MRP*) */}
                      <div className="space-y-1 p-2 rounded-xs bg-[#009EBC]/10 border border-[#009EBC]/30">
                        <div className="flex justify-between text-sm text-white font-bold">
                          <span className="text-teal-ink">UROLASE MAX (Modo MRP*)</span>
                          <span className="text-ok-ink font-mono-tech font-bold text-sm">~3.5 mm (≈65% menor)</span>
                        </div>
                        <div className="h-5 w-full bg-white/10 rounded-xs overflow-hidden flex">
                          <div className="h-full bg-gradient-to-r from-[#009EBC] to-[#25b895] w-[30%]" />
                        </div>
                      </div>
                    </div>

                    <div className="text-sm text-[#94a3b8] font-mono-tech pt-1 italic">
                      * Datos oficiales de retropulsión según mediciones registradas en el brochure de VPG LaserOne.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activePillarTab === 'thuflep' && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-teal-ink text-white text-xs font-bold uppercase tracking-wider">
                      TEJIDOS BLANDOS • ENUCLEACIÓN PROSTÁTICA
                    </span>
                    <span className="text-sm text-ok-ink">DOS MODOS EN UN SOLO SISTEMA</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-heading text-white uppercase font-light">
                    Dos Modos de Enucleación de Próstata en un Solo Sistema
                  </h3>

                  <p className="text-base text-[#D2D3D5] leading-relaxed max-w-3xl">
                    Con dos modos de enucleación integrados, Urolase MAX ofrece mayor versatilidad para cirugías urológicas personalizadas y de alta precisión.
                  </p>
                </div>

                {/* 2 Enucleation Modes Side by Side (Exact 3 checkmarks from Brochure Page 4) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Modo DissectPulse Card */}
                  <div className="p-5 sm:p-6 bg-[#001041] border border-[#009EBC]/40 rounded-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-dashed border-white/10 pb-3">
                      <div>
                        <span className="text-xs font-mono-tech text-teal-ink uppercase tracking-wider block">
                          ENUCLEACIÓN MODULADA
                        </span>
                        <h4 className="text-lg font-heading font-bold text-white uppercase mt-0.5">
                          Modo DissectPulse
                        </h4>
                      </div>
                      <span className="text-sm font-mono-tech text-[#D2D3D5] border border-white/20 px-2 py-0.5 rounded-xs">
                        1 mm
                      </span>
                    </div>

                    <ul className="space-y-2.5 text-sm sm:text-base text-[#D2D3D5]">
                      <li className="flex items-start gap-2.5">
                        <CheckCircle className="w-4 h-4 text-ok-ink shrink-0 mt-0.5" />
                        <span><strong>Proporciona hemostasia superior</strong>, superando significativamente a HoLEP.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle className="w-4 h-4 text-ok-ink shrink-0 mt-0.5" />
                        <span><strong>Permite disección precisa</strong> del tejido adenomatoso, similar a HoLEP.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle className="w-4 h-4 text-ok-ink shrink-0 mt-0.5" />
                        <span><strong>Sin carbonización</strong> de los planos tisulares.</span>
                      </li>
                    </ul>
                  </div>

                  {/* ThuFLEP Card */}
                  <div className="p-5 sm:p-6 bg-[#001041] border border-[#25b895]/40 rounded-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-dashed border-white/10 pb-3">
                      <div>
                        <span className="text-xs font-mono-tech text-ok-ink uppercase tracking-wider block">
                          ENUCLEACIÓN CLÁSICA CON LÁSER DE FIBRA DE TULIO
                        </span>
                        <h4 className="text-lg font-heading font-bold text-white uppercase mt-0.5">
                          Técnica ThuFLEP
                        </h4>
                      </div>
                      <span className="text-sm font-mono-tech text-[#D2D3D5] border border-white/20 px-2 py-0.5 rounded-xs">
                        1 mm
                      </span>
                    </div>

                    <ul className="space-y-2.5 text-sm sm:text-base text-[#D2D3D5]">
                      <li className="flex items-start gap-2.5">
                        <CheckCircle className="w-4 h-4 text-ok-ink shrink-0 mt-0.5" />
                        <span><strong>Alta precisión</strong> gracias a la mínima profundidad de penetración (0.2 mm).</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle className="w-4 h-4 text-ok-ink shrink-0 mt-0.5" />
                        <span><strong>Excelente hemostasia</strong> con prácticamente ausencia de pérdida sanguínea.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle className="w-4 h-4 text-ok-ink shrink-0 mt-0.5" />
                        <span><strong>Vaporización eficiente</strong> de tejido blando y control vascular.</span>
                      </li>
                    </ul>
                  </div>

                </div>

                {/* Secondary Modes: BloodlessPulse & CleanPulse */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 bg-white/5 border border-white/10 rounded-sm space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-bold text-teal-ink uppercase">
                      <span className="w-2 h-2 rounded-full bg-[#009EBC]" />
                      <span>Modo de coagulación BloodlessPulse</span>
                    </div>
                    <p className="text-sm sm:text-base text-[#D2D3D5] leading-relaxed">
                      Urolase MAX incorpora un modo de coagulación de zona amplia que garantiza hemostasia eficaz desde corta distancia, permitiendo tratamientos seguros incluso en zonas de difícil acceso.
                    </p>
                  </div>

                  <div className="p-4 bg-white/5 border border-white/10 rounded-sm space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-bold text-ok-ink uppercase">
                      <span className="w-2 h-2 rounded-full bg-[#25b895]" />
                      <span>Modo CleanPulse sin carbonización</span>
                    </div>
                    <p className="text-sm sm:text-base text-[#D2D3D5] leading-relaxed">
                      Durante la vapoenucleación y vaporización, CleanPulse permite la eliminación de tejido blando sin carbonización y con daño térmico mínimo, ofreciendo eficiencia comparable a láseres de onda continua y preservando la visibilidad.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activePillarTab === 'onepush' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7 space-y-5">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-teal-ink text-white text-xs font-bold uppercase tracking-wider">
                      CONECTOR ONEPUSH™ &amp; FIBRAS VPG
                    </span>
                    <span className="text-sm text-ok-ink">5 CALIBRES DISPONIBLES</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-heading text-white uppercase font-light">
                    Conector OnePush™ y Fibras Quirúrgicas VPG
                  </h3>

                  <p className="text-base text-[#D2D3D5] leading-relaxed">
                    El conector de fibra OnePush, con obturador automático, está diseñado para prevenir la contaminación y permitir conexiones rápidas, seguras y sencillas con un solo clic.
                  </p>

                  {/* Fiber Presentation Badges (Brochure Page 2) */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-mono-tech uppercase font-bold tracking-wider">
                      ● Desechable (uso único)
                    </span>
                    <span className="px-3 py-1.5 rounded-full bg-[#009EBC]/20 border border-[#009EBC]/40 text-teal-ink text-xs font-mono-tech uppercase font-bold tracking-wider">
                      ● Reutilizable (uso múltiple - autoclave)
                    </span>
                  </div>

                  {/* 5 Fiber Diameters Visual Gauge (Brochure Page 2 Circles) */}
                  <div className="p-4 bg-[#001041] border border-dashed border-[#009EBC]/40 rounded-sm space-y-3">
                    <span className="text-xs font-bold text-white uppercase tracking-wider block font-heading">
                      Diámetros disponibles, µm
                    </span>

                    <div className="flex items-end justify-between gap-2 pt-2 px-2">
                      {/* 150 µm */}
                      <div className="flex flex-col items-center gap-2 text-center">
                        <div className="w-4 h-4 rounded-full bg-[#009EBC] shadow-xs" />
                        <span className="text-sm font-bold font-mono-tech text-white">150 µm</span>
                        <span className="text-sm text-[#94a3b8] font-mono-tech">Flexible RIRS</span>
                      </div>

                      {/* 200 µm */}
                      <div className="flex flex-col items-center gap-2 text-center">
                        <div className="w-5 h-5 rounded-full bg-[#009EBC] shadow-xs" />
                        <span className="text-sm font-bold font-mono-tech text-white">200 µm</span>
                        <span className="text-sm text-[#94a3b8] font-mono-tech">Ureteroscopía</span>
                      </div>

                      {/* 365 µm */}
                      <div className="flex flex-col items-center gap-2 text-center">
                        <div className="w-7 h-7 rounded-full bg-[#009EBC] shadow-xs" />
                        <span className="text-sm font-bold font-mono-tech text-white">365 µm</span>
                        <span className="text-sm text-[#94a3b8] font-mono-tech">Semirrígida</span>
                      </div>

                      {/* 550 µm */}
                      <div className="flex flex-col items-center gap-2 text-center">
                        <div className="w-9 h-9 rounded-full bg-[#009EBC] shadow-xs" />
                        <span className="text-sm font-bold font-mono-tech text-white">550 µm</span>
                        <span className="text-sm text-[#94a3b8] font-mono-tech">Vejiga / Tejidos</span>
                      </div>

                      {/* 940 µm */}
                      <div className="flex flex-col items-center gap-2 text-center">
                        <div className="w-11 h-11 rounded-full bg-[#009EBC] shadow-xs" />
                        <span className="text-sm font-bold font-mono-tech text-white">940 µm</span>
                        <span className="text-sm text-[#94a3b8] font-mono-tech">ThuFLEP Próstata</span>
                      </div>
                    </div>
                  </div>

                  {/* Surgeon's Assistant feature block */}
                  <div className="p-4 bg-white/5 border border-white/10 rounded-sm space-y-2">
                    <span className="text-xs font-bold text-ok-ink uppercase block font-heading">
                      Surgeon&apos;s Assistant (Asistente Quirúrgico Inteligente)
                    </span>
                    <p className="text-sm sm:text-base text-[#D2D3D5] leading-relaxed">
                      El primer sistema láser con un asistente quirúrgico inteligente, desarrollado a partir de años de análisis de protocolos por expertos mundiales. Ajusta automáticamente los parámetros del láser en tiempo real para garantizar seguridad, precisión y rendimiento óptimo en Soft Tissue, Stone, Quick Start y Expert.
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-[#001041] p-5 rounded-sm border border-dashed border-[#009EBC]/40 space-y-3">
                  <div className="aspect-video w-full rounded-xs overflow-hidden bg-black flex items-center justify-center">
                    <video
                      src="/videos/OnePuch_activation.webm"
                      autoPlay
                      loop
                      muted
                      playsInline
                      controls
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="text-sm text-[#D2D3D5] text-center font-mono-tech">
                    Activación suave con obturador hermético automático • Máxima durabilidad de la óptica interna.
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. THE PARADIGM SHIFT & SURGEON ENDORSEMENT STATEMENT
             (Logitech G: "Play at the speed of lightning" + Pro Quote)
         ───────────────────────────────────────────────────────────── */}
      <section className="bg-white border-t border-b border-dashed border-[#D2D3D5] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-dashed border-[#009EBC] bg-[#009EBC]/5 text-teal-ink text-xs font-mono-tech uppercase font-bold">
              <span>EL NUEVO ESTÁNDAR DE ORO EN QUIRÓFANO UROLÓGICO</span>
            </div>
            <h2 className="font-heading font-light uppercase text-2xl sm:text-4xl text-[#001041] tracking-tight leading-tight">
              El Cambio de Paradigma: De Ho:YAG Tradicional a Tulio Superpulsado (TFL)
            </h2>
            <p className="text-base text-[#334155] leading-relaxed font-mono-tech">
              Donde el láser Holmium tradicional genera cavitaciones violentas, retropulsión descontrolada y sangrado continuo, Urolase MAX emite un pulso superpulsado continuo con <strong>4.5 veces mayor absorción en agua</strong>, garantizando visibilidad transparente, hemostasia inmediata y pulverización estable.
            </p>
          </div>

          {/* Endorsement Quote Card */}
          <div className="p-6 sm:p-8 rounded-sm bg-[#f8f9fa] border border-dashed border-[#D2D3D5] relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center gap-2 text-teal-ink">
                  <Stethoscope className="w-5 h-5" />
                  <span className="text-xs font-mono-tech uppercase font-bold tracking-widest text-teal-ink">
                    EVIDENCIA &amp; TESTIMONIO QUIRÚRGICO
                  </span>
                </div>

                <blockquote className="text-base sm:text-lg text-[#001041] font-mono-tech leading-relaxed italic border-l-2 border-[#009EBC] pl-4">
                  &ldquo;En urología de alta precisión, la predictibilidad del pulso lo es todo: Urolase MAX nos permite pulverizar cálculos con mínima retropulsión y enuclear próstatas con un campo quirúrgico completamente hemostático y cristalino. La detención automática con Tissue Sensor™ cambia por completo el estándar de seguridad para el paciente en anatomías estrechas.&rdquo;
                </blockquote>

                <div className="pt-2 font-mono-tech">
                  <p className="text-xs sm:text-sm font-bold text-[#001041] uppercase tracking-wide">
                    Dr. Juan Carlos Ramos M.
                  </p>
                  <p className="text-sm sm:text-sm text-[#334155] mt-0.5">
                    Cirujano Urólogo &amp; Especialista en Endourología Láser • Miembro de la Sociedad Peruana de Urología (SPU)
                  </p>
                </div>
              </div>

              {/* 3 Proof Metric Badges */}
              <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3 font-mono-tech">
                <div className="p-3 bg-white border border-dashed border-[#D2D3D5] rounded-sm">
                  <span className="text-sm sm:text-sm text-teal-ink font-bold block">10x MENOR RETROPULSIÓN</span>
                  <p className="text-sm sm:text-sm text-[#334155] mt-1 leading-relaxed">
                    El cálculo permanece estable frente a la fibra sin migrar a cálices superiores.
                  </p>
                </div>
                <div className="p-3 bg-white border border-dashed border-[#D2D3D5] rounded-sm">
                  <span className="text-sm sm:text-sm text-ok-ink font-bold block">0.2 MM PENETRACIÓN TÉRMICA</span>
                  <p className="text-sm sm:text-sm text-[#334155] mt-1 leading-relaxed">
                    Máxima hemostasia sin necrosis profunda ni daño a la cápsula prostática.
                  </p>
                </div>
                <div className="p-3 bg-white border border-dashed border-[#D2D3D5] rounded-sm">
                  <span className="text-sm sm:text-sm text-[#001041] font-bold block">&lt; 1 MS RESPUESTA TISULAR</span>
                  <p className="text-sm sm:text-sm text-[#334155] mt-1 leading-relaxed">
                    Detención instantánea ante contacto con mucosa para evitar perforaciones.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. THE TECH BEHIND: SCIENTIFIC BENCHMARKS & PEER REVIEW
             (Logitech G: "The Tech Behind" data-driven comparison)
         ───────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-white border-b border-dashed border-[#D2D3D5] font-mono-tech">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono-tech text-teal-ink uppercase tracking-widest block font-bold">
              BENCHMARK TÉCNICO &amp; EVIDENCIA PUBLICADA
            </span>
            <h2 className="font-heading font-light uppercase text-2xl sm:text-4xl text-[#001041] tracking-tight">
              La Ciencia Detrás: Urolase MAX vs. Tecnologías Anteriores
            </h2>
            <p className="text-base text-[#334155] leading-relaxed">
              Comparativa cuantitativa entre la plataforma de Tulio Superpulsado (TFL 1940 nm), el Láser Holmium convencional (Ho:YAG 2100 nm) y los sistemas con modulación de pulso Moses.
            </p>
          </div>

          {/* Benchmark Table Grid */}
          <div className="border border-dashed border-[#D2D3D5] rounded-sm overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm sm:text-sm font-mono-tech border-collapse">
                <thead>
                  <tr className="bg-[#001041] text-white border-b border-[#001041]">
                    <th className="py-3.5 px-4 sm:px-6 text-left font-bold uppercase tracking-wider text-xs">
                      Parámetro Quirúrgico / Biomédico
                    </th>
                    <th className="py-3.5 px-4 sm:px-6 text-left font-bold uppercase tracking-wider text-xs bg-teal-ink text-white">
                      UROLASE MAX (TFL 1940 nm)
                    </th>
                    <th className="py-3.5 px-4 sm:px-6 text-left font-bold uppercase tracking-wider text-xs text-[#D2D3D5]">
                      Láser Holmium Clásico (Ho:YAG)
                    </th>
                    <th className="py-3.5 px-4 sm:px-6 text-left font-bold uppercase tracking-wider text-xs text-[#D2D3D5]">
                      Sistemas de Modulación Moses
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dashed divide-[#D2D3D5]">
                  <tr className="hover:bg-[#f8f9fa] transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-semibold text-[#001041]">
                      Absorción Óptica en Agua
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-teal-ink bg-[#009EBC]/5">
                      4.5x Superior (Pico exacto 1940 nm, Coef. ~125 cm⁻¹)
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-[#334155]">
                      Absorción moderada a 2100 nm (Coef. ~28 cm⁻¹)
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-[#334155]">
                      Igual absorción básica de 2100 nm modulada
                    </td>
                  </tr>

                  <tr className="hover:bg-[#f8f9fa] transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-semibold text-[#001041]">
                      Retropulsión del Cálculo
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-ok-ink bg-[#009EBC]/5">
                      ~3.5 mm (Modo MRP* oficial vs 10 mm en Ho:YAG)
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-[#334155]">
                      &gt; 25 mm (Desplazamiento violento y migración)
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-[#334155]">
                      12 - 15 mm (Retropulsión parcial persistente)
                    </td>
                  </tr>

                  <tr className="hover:bg-[#f8f9fa] transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-semibold text-[#001041]">
                      Frecuencia Máxima de Pulso
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-teal-ink bg-[#009EBC]/5">
                      Hasta 2,400 Hz (Pulverización continua ultrafina)
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-[#334155]">
                      Hasta 80 - 100 Hz (Disparos espaciados)
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-[#334155]">
                      Hasta 80 - 120 Hz
                    </td>
                  </tr>

                  <tr className="hover:bg-[#f8f9fa] transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-semibold text-[#001041]">
                      Calibre Mínimo de Fibra Óptica
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-teal-ink bg-[#009EBC]/5">
                      150 µm (Máxima deflexión en flexible digital)
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-[#334155]">
                      272 - 365 µm (Rigidez que limita curvatura)
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-[#334155]">
                      200 - 365 µm
                    </td>
                  </tr>

                  <tr className="hover:bg-[#f8f9fa] transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-semibold text-[#001041]">
                      Sensor de Protección Tisular
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-ok-ink bg-[#009EBC]/5">
                      Tissue Sensor™ Activo (&lt; 1 ms de corte)
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-[#334155]">
                      No disponible (Riesgo en pared ureteral)
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-[#334155]">
                      No disponible
                    </td>
                  </tr>

                  <tr className="hover:bg-[#f8f9fa] transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-semibold text-[#001041]">
                      Alimentación Eléctrica &amp; Refrigeración
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-teal-ink bg-[#009EBC]/5">
                      220V Estándar • Aire Silencioso (&lt; 52 dB)
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-[#334155]">
                      380V Trifásica dedicada • Chiller de agua ruidoso
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-[#334155]">
                      Requiere instalación eléctrica especial
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Peer-Reviewed Scientific Citation Banner */}
          <div className="p-4 rounded-sm bg-[#001041]/5 border border-dashed border-[#009EBC]/40 flex items-start gap-3">
            <Award className="w-5 h-5 text-teal-ink shrink-0 mt-0.5" />
            <div className="font-mono-tech space-y-1">
              <span className="font-bold text-[#001041] uppercase tracking-wider block text-xs sm:text-sm">
                Evidencia Científica en Literatura Urológica Indexada
              </span>
              <p className="text-[#334155] text-sm sm:text-sm leading-relaxed italic">
                &ldquo;Ventimiglia E., et al. (2020) Effect of Temporal Pulse Shape on Urinary Stone Phantom Retropulsion Rate and Ablation Efficiency Using Holmium:YAG and Superpulse Thulium Fiber Lasers. BJU International 2020 Jul; 126(1): 159-167.&rdquo;
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. HARDWARE ECOSYSTEM & OPERATING ROOM MOBILITY
             (Logitech G: Hardware & Ergonomics Breakdown)
         ───────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#f4f5f6] border-b border-dashed border-[#D2D3D5] font-mono-tech">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono-tech text-teal-ink uppercase tracking-widest font-semibold block">
              VENTAJAS DEL SISTEMA • UROLASE MAX
            </span>
            <h2 className="font-heading font-light uppercase text-2xl sm:text-4xl text-[#001041] tracking-tight">
              Ventajas del Sistema Quirúrgico
            </h2>
            <p className="text-base text-[#334155] leading-relaxed">
              Diseñado para reducir tiempos muertos, eliminar obras civiles de instalación y maximizar la disponibilidad en quirófano.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 bg-white border border-dashed border-[#D2D3D5] rounded-sm space-y-3 hover:border-[#009EBC] transition-all">
              <div className="w-10 h-10 rounded-sm bg-[#001041]/5 text-teal-ink flex items-center justify-center font-bold text-sm">
                01
              </div>
              <h3 className="font-heading font-bold text-base text-[#001041] uppercase">
                Hasta 3 veces más compacto y liviano que sistemas Ho:YAG
              </h3>
              <p className="text-base text-[#334155] leading-relaxed">
                Consola ergonómica de solo 42 kg con ruedas antiestáticas y freno doble. Fácil de trasladar entre quirófanos hospitalarios sin esfuerzo ni grúas.
              </p>
            </div>

            <div className="p-5 bg-white border border-dashed border-[#D2D3D5] rounded-sm space-y-3 hover:border-[#009EBC] transition-all">
              <div className="w-10 h-10 rounded-sm bg-[#001041]/5 text-teal-ink flex items-center justify-center font-bold text-sm">
                02
              </div>
              <h3 className="font-heading font-bold text-base text-[#001041] uppercase">
                Instalación sencilla con conexión eléctrica estándar
              </h3>
              <p className="text-base text-[#334155] leading-relaxed">
                Conexión directa a tomacorriente convencional de pared 220 VAC. Cero adaptaciones de tomas trifásicas industriales de alto costo.
              </p>
            </div>

            <div className="p-5 bg-white border border-dashed border-[#D2D3D5] rounded-sm space-y-3 hover:border-[#009EBC] transition-all">
              <div className="w-10 h-10 rounded-sm bg-[#001041]/5 text-teal-ink flex items-center justify-center font-bold text-sm">
                03
              </div>
              <h3 className="font-heading font-bold text-base text-[#001041] uppercase">
                Refrigeración por aire, no requiere unidad externa
              </h3>
              <p className="text-base text-[#334155] leading-relaxed">
                Sistema autónomo libre de mangueras de agua hospitalarias, chillers ruidosos o líquidos contaminantes. Nivel de ruido menor a 52 dB.
              </p>
            </div>

            <div className="p-5 bg-white border border-dashed border-[#D2D3D5] rounded-sm space-y-3 hover:border-[#009EBC] transition-all">
              <div className="w-10 h-10 rounded-sm bg-[#001041]/5 text-teal-ink flex items-center justify-center font-bold text-sm">
                04
              </div>
              <h3 className="font-heading font-bold text-base text-[#001041] uppercase">
                Sin mantenimiento rutinario
              </h3>
              <p className="text-base text-[#334155] leading-relaxed">
                Tecnología de estado sólido en fibra óptica libre de desalineaciones o espejos de cavidad móviles. Disponibilidad quirúrgica permanente del 100%.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. CLINICAL APPLICATIONS & OPERATIVE MODES (Interactive Tabs)
         ───────────────────────────────────────────────────────────── */}
      {product.clinical_applications && product.clinical_applications.length > 0 && (
        <section className="border-t border-b border-dashed border-[#D2D3D5] bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-dashed border-[#D2D3D5] pb-4">
              <div>
                <span className="text-xs font-mono-tech text-teal-ink uppercase tracking-widest block font-bold">
                  APLICACIONES CLÍNICAS EN QUIRÓFANO
                </span>
                <h2 className="font-heading font-light uppercase text-2xl sm:text-4xl text-[#001041] mt-1 tracking-tight">
                  Especialidades y Modos Quirúrgicos
                </h2>
              </div>

              {/* Tabs Switcher */}
              <div className="flex items-center gap-2 bg-[#f4f5f6] p-1 rounded-full border border-dashed border-[#D2D3D5]">
                {product.clinical_applications.map((app, idx) => (
                  <button
                    key={app.id}
                    onClick={() => setActiveClinicalTab(idx)}
                    className={`px-4 py-2 rounded-full text-xs font-mono-tech uppercase tracking-wider transition-all cursor-pointer ${
                      activeClinicalTab === idx
                        ? 'bg-[#001041] text-white font-bold shadow-sm'
                        : 'text-[#334155] hover:text-[#001041]'
                    }`}
                  >
                    {app.title.split('&')[0].trim()}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Tab Panel */}
            {(() => {
              const currentApp = product.clinical_applications[activeClinicalTab];
              if (!currentApp) return null;

              return (
                <div className="space-y-8 animate-fadeIn">
                  <div className="space-y-2 max-w-3xl">
                    <h3 className="text-xl sm:text-2xl font-heading uppercase text-[#001041] font-light">
                      {currentApp.title}
                    </h3>
                    {currentApp.subtitle && (
                      <p className="text-sm sm:text-base font-semibold text-teal-ink font-mono-tech">
                        {currentApp.subtitle}
                      </p>
                    )}
                    <p className="text-base text-[#334155] leading-relaxed font-mono-tech">
                      {currentApp.description}
                    </p>
                  </div>

                  {/* Operative Modes Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {currentApp.modes.map((mode, mIdx) => (
                      <div
                        key={mIdx}
                        className="p-5 rounded-sm bg-[#f8f9fa] border border-dashed border-[#D2D3D5] hover:border-[#009EBC] hover:bg-white transition-all space-y-3 group"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#009EBC] group-hover:scale-125 transition-transform" />
                          {mode.badge && (
                            <span className="px-2 py-0.5 rounded-full text-xs font-mono-tech bg-[#001041]/5 text-[#001041] font-semibold uppercase tracking-wider border border-dashed border-[#D2D3D5]">
                              {mode.badge}
                            </span>
                          )}
                        </div>
                        <h4 className="font-heading font-semibold text-base text-[#001041] group-hover:text-teal-ink transition-colors uppercase">
                          {mode.title}
                        </h4>
                        <p className="text-base text-[#334155] leading-relaxed font-mono-tech">
                          {mode.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Peer-Reviewed Scientific Citation */}
                  {currentApp.scientific_note && (
                    <div className="p-4 rounded-sm bg-[#001041]/5 border border-dashed border-[#009EBC]/40 flex items-start gap-3">
                      <Award className="w-5 h-5 text-teal-ink shrink-0 mt-0.5" />
                      <div className="font-mono-tech space-y-1">
                        <span className="font-bold text-[#001041] uppercase tracking-wider block text-xs sm:text-sm">
                          Evidencia Médica Publicada
                        </span>
                        <p className="text-[#334155] text-sm sm:text-sm leading-relaxed italic">
                          {currentApp.scientific_note}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}

          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          8. TECHNICAL SPECIFICATIONS TABLE (Ficha Técnica Integral)
         ───────────────────────────────────────────────────────────── */}
      {product.specifications && Object.keys(product.specifications).length > 0 && (
        <section className="py-16 bg-[#f4f5f6] border-b border-dashed border-[#D2D3D5] font-mono-tech">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="border-b border-dashed border-[#D2D3D5] pb-4">
              <span className="text-xs font-mono-tech text-[#334155] uppercase tracking-widest block font-bold">
                PARÁMETROS TÉCNICOS &amp; BIOMÉDICOS
              </span>
              <h2 className="font-heading font-light uppercase text-2xl sm:text-3xl text-[#001041] mt-1 tracking-tight">
                Ficha Técnica Integral
              </h2>
            </div>

            <div className="border border-dashed border-[#D2D3D5] rounded-sm overflow-hidden bg-white shadow-sm">
              <table className="w-full text-sm sm:text-sm font-mono-tech border-collapse">
                <tbody>
                  {Object.entries(product.specifications).map(([key, val], idx) => (
                    <tr
                      key={key}
                      className={`border-b border-dashed border-[#D2D3D5]/60 hover:bg-[#009EBC]/5 transition-colors ${
                        idx % 2 === 0 ? 'bg-transparent' : 'bg-[#fafafa]'
                      }`}
                    >
                      <th className="text-left font-semibold py-3.5 px-4 sm:px-6 text-[#334155] uppercase text-xs sm:text-sm w-2/5 sm:w-1/3 align-top border-r border-dashed border-[#D2D3D5]/40">
                        {key}
                      </th>
                      <td className="text-left font-semibold py-3.5 px-4 sm:px-6 text-[#001041] text-sm sm:text-base">
                        {val}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          9. GLOBAL MANUFACTURER PEDIGREE & MEDNOVA ASSURANCE
         ───────────────────────────────────────────────────────────── */}
      {product.manufacturer_info && (
        <section className="py-16 bg-white border-b border-dashed border-[#D2D3D5] font-mono-tech">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs font-mono-tech text-teal-ink uppercase tracking-widest block font-bold">
                  RESPALDO GLOBAL DEL FABRICANTE
                </span>
                <h2 className="font-heading font-light uppercase text-2xl sm:text-3xl text-[#001041] tracking-tight">
                  {product.manufacturer_info.name}
                </h2>
                <p className="text-base text-[#334155] leading-relaxed">
                  {product.manufacturer_info.description}
                </p>
                <p className="text-base text-[#334155] leading-relaxed">
                  En el Perú y Latinoamérica, Mednova Technologies es el distribuidor exclusivo de Urolase MAX, con capacitación y soporte técnico local.
                </p>
              </div>

              <div className="lg:col-span-5 grid grid-cols-2 gap-3">
                {product.manufacturer_info.founded && (
                  <div className="p-4 bg-[#f8f9fa] border border-dashed border-[#D2D3D5] rounded-sm text-center">
                    <span className="text-2xl font-heading font-bold text-[#001041]">
                      {product.manufacturer_info.founded}
                    </span>
                    <span className="text-xs font-semibold text-[#334155] uppercase block mt-1">
                      Año de Fundación
                    </span>
                  </div>
                )}
                {product.manufacturer_info.annual_patients && (
                  <div className="p-4 bg-[#f8f9fa] border border-dashed border-[#D2D3D5] rounded-sm text-center">
                    <span className="text-2xl font-heading font-bold text-teal-ink">
                      {product.manufacturer_info.annual_patients}
                    </span>
                    <span className="text-xs font-semibold text-[#334155] uppercase block mt-1">
                      Pacientes / Año
                    </span>
                  </div>
                )}
                {product.manufacturer_info.patents && (
                  <div className="p-4 bg-[#f8f9fa] border border-dashed border-[#D2D3D5] rounded-sm text-center">
                    <span className="text-2xl font-heading font-bold text-[#001041]">
                      {product.manufacturer_info.patents}
                    </span>
                    <span className="text-xs font-semibold text-[#334155] uppercase block mt-1">
                      Patentes Láser
                    </span>
                  </div>
                )}
                {product.manufacturer_info.installed_units && (
                  <div className="p-4 bg-[#f8f9fa] border border-dashed border-[#D2D3D5] rounded-sm text-center">
                    <span className="text-2xl font-heading font-bold text-teal-ink">
                      {product.manufacturer_info.installed_units}
                    </span>
                    <span className="text-xs font-semibold text-[#334155] uppercase block mt-1">
                      Sistemas Instalados
                    </span>
                  </div>
                )}
              </div>

            </div>
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          10. HOSPITAL ACQUISITION MODALITIES (B2B Commercial Models)
         ───────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#f8f9fa] border-b border-dashed border-[#D2D3D5] font-mono-tech">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono-tech text-teal-ink uppercase tracking-widest block font-bold">
              PLANES COMERCIALES B2B &bull; FLEXIBILIDAD HOSPITALARIA
            </span>
            <h2 className="font-heading font-light uppercase text-2xl sm:text-4xl text-[#001041] tracking-tight leading-tight">
              Modalidades de Adquisición para Clínicas y Hospitales
            </h2>
            <p className="text-base text-[#334155] leading-relaxed">
              En Mednova Technologies adaptamos la incorporación de Urolase MAX a la estructura presupuestal de su institución médica, ya sea como inversión de capital (CAPEX) o como gasto operativo programado (OPEX).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Modalidad 1: Venta Directa */}
            <div className="p-6 bg-white border border-dashed border-[#D2D3D5] rounded-sm space-y-4 hover:border-[#009EBC] transition-all shadow-sm flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#001041]/5 text-[#001041] border border-dashed border-[#D2D3D5]">
                    MODELO CAPEX
                  </span>
                  <span className="text-sm text-teal-ink font-bold">01</span>
                </div>
                <h3 className="font-heading font-light uppercase text-xl text-[#001041]">
                  Venta Directa Integral
                </h3>
                <p className="text-base text-[#334155] leading-relaxed">
                  Adquisición definitiva del equipo como activo fijo institucional con condiciones preferenciales de importación y entrega inmediata.
                </p>
                <ul className="space-y-2 text-sm sm:text-base text-[#334155] pt-2 border-t border-dashed border-[#D2D3D5]">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-ok-ink shrink-0 mt-0.5" />
                    <span>Garantía y soporte técnico detallados en la propuesta</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-ok-ink shrink-0 mt-0.5" />
                    <span>Instalación y calibración técnica en quirófano</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-ok-ink shrink-0 mt-0.5" />
                    <span>Kit de inicio de fibras ópticas de cuarzo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-ok-ink shrink-0 mt-0.5" />
                    <span>Capacitación clínica certificada para el staff</span>
                  </li>
                </ul>
              </div>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xs bg-[#001041] hover:bg-teal-ink text-white text-sm uppercase font-bold tracking-wider text-center flex items-center justify-center gap-2 transition-colors cursor-pointer mt-4"
              >
                <span>Cotizar Venta Directa</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            {/* Modalidad 2: Leasing Financiero */}
            <div className="p-6 bg-white border border-dashed border-[#009EBC] rounded-sm space-y-4 shadow-md flex flex-col justify-between relative">
              <div className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-teal-ink text-white text-xs font-bold uppercase tracking-wider shadow-sm">
                MÁS SOLICITADO
              </div>
              <div className="space-y-3 pt-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#009EBC]/10 text-teal-ink border border-dashed border-[#009EBC]">
                    MODELO OPEX
                  </span>
                  <span className="text-sm text-teal-ink font-bold">02</span>
                </div>
                <h3 className="font-heading font-light uppercase text-xl text-[#001041]">
                  Leasing Hospitalario
                </h3>
                <p className="text-base text-[#334155] leading-relaxed">
                  Financiamiento en cuotas mensuales fijas, 100% deducible de impuestos corporativos y sin descapitalizar la clínica.
                </p>
                <ul className="space-y-2 text-sm sm:text-base text-[#334155] pt-2 border-t border-dashed border-[#D2D3D5]">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-ok-ink shrink-0 mt-0.5" />
                    <span>Plazos flexibles de 12, 24 o 36 meses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-ok-ink shrink-0 mt-0.5" />
                    <span>Mantenimiento preventivo anual incluido</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-ok-ink shrink-0 mt-0.5" />
                    <span>Opción de renovación a nueva generación</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-ok-ink shrink-0 mt-0.5" />
                    <span>Beneficio tributario como gasto operativo</span>
                  </li>
                </ul>
              </div>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xs bg-teal-ink hover:bg-[#007f97] text-white text-sm uppercase font-bold tracking-wider text-center flex items-center justify-center gap-2 transition-colors cursor-pointer mt-4"
              >
                <span>Evaluar Plan Leasing</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            {/* Modalidad 3: Comodato Quirúrgico */}
            <div className="p-6 bg-white border border-dashed border-[#D2D3D5] rounded-sm space-y-4 hover:border-[#009EBC] transition-all shadow-sm flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#001041]/5 text-[#001041] border border-dashed border-[#D2D3D5]">
                    PAGO POR CONSUMO
                  </span>
                  <span className="text-sm text-teal-ink font-bold">03</span>
                </div>
                <h3 className="font-heading font-light uppercase text-xl text-[#001041]">
                  Comodato / Pay-per-Use
                </h3>
                <p className="text-base text-[#334155] leading-relaxed">
                  Cero costo de inversión inicial. Instalamos la consola Urolase MAX en su sala quirúrgica sujeta a consumo acordado de insumos.
                </p>
                <ul className="space-y-2 text-sm sm:text-base text-[#334155] pt-2 border-t border-dashed border-[#D2D3D5]">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-ok-ink shrink-0 mt-0.5" />
                    <span>Cero desembolso inicial de capital</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-ok-ink shrink-0 mt-0.5" />
                    <span>Consola permanente en sala de operaciones</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-ok-ink shrink-0 mt-0.5" />
                    <span>Suministro garantizado de fibras y consumibles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-ok-ink shrink-0 mt-0.5" />
                    <span>Soporte biomédico y equipo de respaldo</span>
                  </li>
                </ul>
              </div>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xs bg-[#001041] hover:bg-teal-ink text-white text-sm uppercase font-bold tracking-wider text-center flex items-center justify-center gap-2 transition-colors cursor-pointer mt-4"
              >
                <span>Consultar Comodato</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          11. FREQUENTLY ASKED QUESTIONS (FAQ - Full SEO & Conversion)
         ───────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-white border-b border-dashed border-[#D2D3D5] font-mono-tech">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono-tech text-teal-ink uppercase tracking-widest block font-bold">
              RESOLUCIÓN DE DUDAS QUIRÚRGICAS &bull; EVIDENCIA &amp; OPERACIÓN
            </span>
            <h2 className="font-heading font-light uppercase text-2xl sm:text-4xl text-[#001041] tracking-tight">
              Preguntas Frecuentes sobre Urolase MAX
            </h2>
            <p className="text-base text-[#334155] leading-relaxed">
              Respuestas directas a las principales dudas técnicas, clínicas y operativas planteadas por cirujanos urólogos, directores médicos y jefes de ingeniería biomédica en el Perú.
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                q: '¿Qué ventajas clínicas ofrece el láser de tulio superpulsado (TFL 1940 nm) frente al láser Holmium (Ho:YAG) convencional?',
                a: 'El láser de tulio superpulsado a 1940 nm coincide exactamente con el pico más alto de absorción en agua en los tejidos urológicos (4.5 veces mayor que Holmium a 2100 nm). Esto permite pulverizar cálculos urinarios hasta convertirlos en polvo microscópico (Dusting) sin retropulsión (< 3.5 mm), evitando que migren a cálices difíciles. En tejidos blandos y próstata (ThuFLEP / DissectPulse), produce cortes anatómicos precisos con hemostasia inmediata y nula carbonización.',
                category: 'Eficacia Clínica & Litotricia',
              },
              {
                q: '¿Cómo funciona la tecnología exclusiva Tissue Sensor™ para proteger la mucosa urinaria?',
                a: 'Tissue Sensor™ es un sensor óptico espectral patentado en la fibra láser que analiza en tiempo real la reflectancia del cálculo urinario versus el tejido blando. Si la fibra entra en contacto con mucosa o pared ureteral, detiene instantáneamente la emisión del haz en menos de 1 milisegundo, eliminando el riesgo de perforación accidental.',
                category: 'Seguridad del Paciente',
              },
              {
                q: '¿Qué calibres de fibra óptica admite Urolase MAX y cómo protege los ureteroscopios flexibles?',
                a: 'Admite microfibras desde 150 µm hasta 940 µm mediante conector estándar OnePush SMA-905 con obturador antipolvo. Las fibras de 150 µm y 200 µm permiten al ureteroscopio digital flexible una deflexión activa completa superior a 270° y un flujo de irrigación óptimo, prolongando significativamente la vida útil del instrumental endoscópico.',
                category: 'Compatibilidad de Fibras',
              },
              {
                q: '¿Cuáles son las modalidades de adquisición hospitalaria disponibles en Perú?',
                a: 'Mednova Technologies ofrece 3 modalidades para clínicas y hospitales: (1) Venta Directa con garantía y soporte técnico según propuesta formal; (2) Leasing Financiero Hospitalario con cuotas mensuales 100% deducibles de impuestos; y (3) Comodato Quirúrgico / Pay-per-use sujeto a volumen programado de consumo de fibras y consumibles urológicos.',
                category: 'Modalidades de Compra',
              },
              {
                q: '¿Cómo se solicita una demostración quirúrgica in-situ en quirófano?',
                a: 'Coordinamos el traslado de la consola Urolase MAX con instrumental completo a su sala de operaciones para un procedimiento programado. Un especialista en aplicaciones clínicas y un ingeniero biomédico de Mednova acompañan al cirujano durante la intervención sin costo de traslado en Lima y principales ciudades del Perú.',
                category: 'Demostración In-Situ',
              },
              {
                q: '¿Qué garantía y soporte se ofrece en Perú?',
                a: 'Urolase MAX es un sistema de VPG LaserOne y Mednova Technologies es su distribuidor exclusivo en Perú. Las condiciones de garantía, soporte técnico y suministro de fibras se detallan en la propuesta formal; solicítela y le respondemos con el alcance exacto.',
                category: 'Garantía & Soporte Local',
              },
            ].map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className={`border border-dashed rounded-sm transition-all overflow-hidden ${
                    isOpen
                      ? 'border-[#009EBC] bg-[#f8f9fa] shadow-xs'
                      : 'border-[#D2D3D5] bg-white hover:border-[#009EBC]'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-4 cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <div className="space-y-1">
                      <span className="text-xs uppercase font-bold tracking-wider text-teal-ink block">
                        {faq.category}
                      </span>
                      <h3 className="text-base sm:text-lg font-heading font-semibold text-[#001041] leading-snug">
                        {faq.q}
                      </h3>
                    </div>
                    <div
                      className={`w-7 h-7 rounded-full border border-dashed flex items-center justify-center shrink-0 transition-transform ${
                        isOpen
                          ? 'border-[#009EBC] bg-teal-ink text-white rotate-180'
                          : 'border-[#D2D3D5] text-[#334155]'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-base text-[#334155] leading-relaxed border-t border-dashed border-[#D2D3D5]/60 pt-3 animate-fadeIn">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick Support Assistance Callout */}
          <div className="p-4 bg-[#f8f9fa] border border-dashed border-[#D2D3D5] rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#001041]/5 text-teal-ink flex items-center justify-center shrink-0">
                <HelpCircle className="w-4 h-4" />
              </div>
              <p className="text-sm sm:text-base text-[#001041]">
                ¿Tiene una consulta clínica, técnica o sobre compatibilidad de instrumental?
              </p>
            </div>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-4 rounded-xs bg-teal-ink hover:bg-[#007f97] text-white text-xs sm:text-sm uppercase font-bold tracking-wider transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Consultar por WhatsApp</span>
            </a>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          10. FINAL HIGH-CONVERTING CLOSING STRIKE
              (Logitech G: "Get Your Hands On HITS" Final Conversion)
         ───────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-b from-[#001041] to-[#04164b] text-white font-mono-tech relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          
          <div className="max-w-3xl mx-auto space-y-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-dashed border-[#009EBC] text-teal-ink text-xs font-mono-tech tracking-widest uppercase font-bold">
              TRANSFORME SU PRÁCTICA ENDOUROLÓGICA
            </span>
            <h2 className="font-heading font-light uppercase text-3xl sm:text-5xl text-white tracking-tight leading-tight">
              Lleve Urolase MAX a su Quirófano
            </h2>
            <p className="text-base sm:text-lg text-[#D2D3D5] leading-relaxed max-w-2xl mx-auto">
              Coordine una demostración quirúrgica in-situ sin costo en su centro hospitalario o solicite una cotización técnica formal con opciones de compra directa o financiamiento.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4 max-w-2xl mx-auto">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-4 px-8 rounded-sm bg-teal-ink hover:bg-[#007f97] text-white font-mono-tech text-sm sm:text-base uppercase tracking-wider font-bold transition-all shadow-lg shadow-[#009EBC]/20 flex items-center justify-center gap-3 cursor-pointer group flex-1 sm:flex-initial"
            >
              <MessageCircle className="w-4 h-4 text-white" />
              <span>Cotizar Inmediato por WhatsApp</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <a
 href={demoUrl}
 target="_blank"
 rel="noopener noreferrer"
              className="py-4 px-8 rounded-sm bg-white/10 hover:bg-white text-white hover:text-[#001041] border border-dashed border-white/30 font-mono-tech text-sm sm:text-base uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-3 cursor-pointer group flex-1 sm:flex-initial"
            >
              <Calendar className="w-4 h-4" />
              <span>Agendar Demo Quirúrgica</span>
            </a>
          </div>

          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-sm sm:text-base text-[#D2D3D5] opacity-90 border-t border-dashed border-white/10 max-w-2xl mx-auto">
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-ok-ink" />
              Instalación y Calibración en Quirófano
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-ok-ink" />
              Capacitación Médica Certificada
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-ok-ink" />
              Soporte técnico local en Perú
            </span>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          11. RELATED EQUIPMENT (Portfolio Cross-sell)
         ───────────────────────────────────────────────────────────── */}
      {relatedEquipos && relatedEquipos.length > 0 && (
        <section className="border-t border-dashed border-[#D2D3D5] bg-[#f8f9fa] py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex items-end justify-between border-b border-dashed border-[#D2D3D5] pb-4">
              <div>
                <span className="text-xs font-mono-tech text-[#334155] uppercase tracking-widest font-semibold">
                  PORTAFOLIO MEDNOVA
                </span>
                <h2 className="font-heading font-light uppercase text-2xl sm:text-3xl text-[#001041] mt-1 tracking-tight">
                  Más Soluciones Quirúrgicas
                </h2>
              </div>
              <Link
                href="/equipos"
                className="text-xs font-mono-tech text-[#001041] hover:text-teal-ink uppercase font-semibold flex items-center gap-1"
              >
                <span>Ver Portafolio</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-dashed border-[#D2D3D5] bg-white">
              {relatedEquipos.slice(0, 4).map((rel) => {
                const img =
                  rel.images && rel.images.length > 0
                    ? rel.images[0]
                    : 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80';

                return (
                  <article
                    key={rel.id}
                    className="group relative border-r border-b border-dashed border-[#D2D3D5] bg-white flex flex-col transition-colors hover:bg-[#fafafa]"
                  >
                    <Link
                      href={`/equipos/${rel.slug}`}
                      className="flex flex-col h-full text-inherit no-underline overflow-hidden"
                    >
                      <header className="flex items-start justify-between gap-2 p-3 min-h-[3.5rem] border-b border-dashed border-[#D2D3D5] bg-white group-hover:bg-[#f8f9fa] transition-colors">
                        <h3 className="m-0 text-sm font-mono-tech font-semibold uppercase text-[#001041] line-clamp-2 leading-tight tracking-tight flex-1">
                          {rel.name}
                        </h3>
                        <span className="text-xs font-mono text-[#334155] whitespace-nowrap shrink-0 pt-0.5">
                          {rel.model}
                        </span>
                      </header>

                      <div className="relative w-full aspect-square p-3 bg-white flex items-center justify-center overflow-hidden">
                        <img
                          src={img}
                          alt={rel.name}
                          loading="lazy"
                          className="w-full h-full object-contain p-2 rounded-sm transition-transform duration-500 ease-out group-hover:scale-105"
                        />
                      </div>

                      <div className="p-3 pt-2 border-t border-dashed border-[#D2D3D5] flex items-center justify-between text-sm font-mono-tech bg-[#fdfdfd] group-hover:bg-[#f5f6f7] transition-colors mt-auto">
                        <span className="text-xs text-[#334155] uppercase truncate max-w-[140px]">
                          {rel.specialty ? rel.specialty.split(' ')[0] : 'Urología'}
                        </span>
                        <span className="inline-flex items-center gap-1 text-sm font-bold text-[#001041] group-hover:text-teal-ink transition-colors">
                          <span>VER FICHA</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          13. FLOATING BOTTOM CONVERSION BAR FOR MOBILE
         ───────────────────────────────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#001041]/95 backdrop-blur-md border-t border-dashed border-white/20 p-3 sm:hidden">
        <div className="flex items-center gap-2">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2.5 px-3 rounded-full bg-teal-ink text-white text-xs font-mono-tech font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-lg"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Cotizar WhatsApp</span>
          </a>
          <a
 href={demoUrl}
 target="_blank"
 rel="noopener noreferrer"
            className="py-2.5 px-3 rounded-full bg-white/10 text-white text-sm font-mono-tech border border-dashed border-white/30 flex items-center justify-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Demo</span>
          </a>
          {product.brochure_url && (
            <a
              href={product.brochure_url}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 rounded-full bg-white/10 text-white text-sm font-mono-tech border border-dashed border-white/30 flex items-center justify-center"
              aria-label="Descargar PDF"
            >
              <FileDown className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

    </div>
  );
}
