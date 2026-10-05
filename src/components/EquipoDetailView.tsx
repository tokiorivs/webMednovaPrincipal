'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
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

  const switchHeroVideo = (src: string) => {
    setHeroVideoSrc(src);
    setIsVideoPlaying(true);
    if (heroVideoRef.current) {
      heroVideoRef.current.src = src;
      heroVideoRef.current.load();
      heroVideoRef.current.play().catch(() => {});
    }
  };

  // Media stage state
  const [selectedImage, setSelectedImage] = useState<string>(
    product.images && product.images.length > 0
      ? product.images[0]
      : 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80'
  );

  const [activeMediaTab, setActiveMediaTab] = useState<'image' | 'video-ergo' | 'video-onepush'>(
    'image'
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

  // Surgical Demo Booking Modal state
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [demoForm, setDemoForm] = useState({
    doctorName: '',
    institution: '',
    city: 'Lima',
    procedureType: 'Litotricia & Cálculos Renales (RIRS)',
    dateTentative: '',
    phone: '',
  });

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

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hola Mednova Technologies, deseo coordinar una demostración quirúrgica in-situ para el equipo ${product.name} (${product.model}):
- Especialista: ${demoForm.doctorName || 'No especificado'}
- Clínica / Hospital: ${demoForm.institution || 'No especificada'}
- Ciudad: ${demoForm.city}
- Procedimiento: ${demoForm.procedureType}
- Fecha tentativa: ${demoForm.dateTentative || 'A convenir'}
- Teléfono de contacto: ${demoForm.phone || 'No especificado'}`;
    const url = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    setDemoModalOpen(false);
  };

  return (
    <div className="w-full bg-[#f4f5f6] text-[#001041]">
      {/* ─────────────────────────────────────────────────────────────
          1. TOP NAVIGATION & STATUS BAR
         ───────────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-dashed border-[#D2D3D5] pb-4">
          <Link
            href="/equipos"
            className="inline-flex items-center gap-2 text-xs font-mono-tech uppercase text-[#001041] hover:text-[#009EBC] transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Volver a Portafolio Quirúrgico</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#25b895]/10 text-[#25b895] text-[10px] font-mono-tech uppercase tracking-wider font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#25b895] animate-pulse" />
              FLAGSHIP QUIRÚRGICO • HOMOLOGADO CE
            </span>
            <span className="text-[11px] font-mono-tech text-[#71797a] uppercase hidden sm:inline">
              EQUIPOS / {product.model}
            </span>
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-dashed border-[#D2D3D5] bg-white text-[11px] font-mono-tech text-[#001041] hover:border-[#001041] transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-3 h-3 text-[#25b895]" />
                  <span>Enlace copiado</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3 h-3 text-[#71797a]" />
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
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full border border-dashed border-[#009EBC]/50 bg-[#001041]/85 backdrop-blur-md text-[#009EBC] text-[11px] font-mono-tech uppercase font-bold tracking-widest shadow-lg">
              <span className="w-2 h-2 rounded-full bg-[#25b895] animate-pulse" />
              <span>VPG LASERONE • TECNOLOGÍA TFL SUPERPULSADA (1940 NM)</span>
            </div>

            {/* Giant Logitech G Style Headline (Single Unique H1 for Full SEO) */}
            <h1 className="font-heading font-light uppercase text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[0.98]">
              UROLASE MAX
              <span className="block text-xl sm:text-2xl lg:text-3xl text-[#009EBC] font-mono-tech mt-2.5 tracking-normal font-semibold normal-case sm:uppercase">
                Plataforma Láser de Tulio Superpulsado (TFL 1940 nm)
              </span>
            </h1>

            {/* Subheading / Value Proposition */}
            <p className="text-sm sm:text-base lg:text-lg font-mono-tech text-[#009EBC] uppercase font-semibold tracking-wide">
              Precisión Quirúrgica Absoluta. Mínima Retropulsión. Protección Tisular Inteligente.
            </p>

            {/* Narrative Lead */}
            <p className="text-xs sm:text-sm text-[#D2D3D5] leading-relaxed font-mono-tech max-w-2xl">
              La plataforma láser todo en uno para urología: litotricia de mínima retropulsión (&lt; 3.5 mm) y enucleación prostática anatómica sin carbonización con Tissue Sensor™ de detención automática en mucosa.
            </p>

            {/* CTA Buttons Cluster */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 px-6 rounded-sm bg-[#009EBC] hover:bg-[#007f97] text-white font-mono-tech text-xs uppercase tracking-widest font-bold transition-all shadow-lg shadow-[#009EBC]/25 flex items-center gap-2.5 cursor-pointer group"
              >
                <MessageCircle className="w-4 h-4 text-white" />
                <span>Solicitar Cotización Inmediata</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <button
                type="button"
                onClick={() => setDemoModalOpen(true)}
                className="py-3.5 px-6 rounded-sm bg-white/10 hover:bg-white text-white hover:text-[#001041] border border-dashed border-white/30 font-mono-tech text-xs uppercase tracking-widest font-semibold transition-all flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#009EBC]" />
                <span>Agendar Demostración Quirúrgica</span>
              </button>

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

        {/* Bottom Floating Control Bar (Switcher + Play/Pause/Mute like Logitech G) */}
        <div className="absolute bottom-4 left-4 right-4 sm:left-8 sm:right-8 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-auto">
          {/* Video track selector */}
          <div className="flex items-center gap-2 bg-black/70 backdrop-blur-md p-1 rounded-full border border-dashed border-white/20">
            <button
              type="button"
              onClick={() => switchHeroVideo('/videos/UMax - ergonomics.webm')}
              className={`px-3 py-1 rounded-full text-[10px] font-mono-tech uppercase tracking-wider transition-all cursor-pointer ${
                heroVideoSrc.includes('ergonomics')
                  ? 'bg-[#009EBC] text-white font-bold shadow-sm'
                  : 'text-[#D2D3D5] hover:text-white'
              }`}
            >
              ● 01. Ergonomía en Quirófano
            </button>
            <button
              type="button"
              onClick={() => switchHeroVideo('/videos/OnePuch_activation.webm')}
              className={`px-3 py-1 rounded-full text-[10px] font-mono-tech uppercase tracking-wider transition-all cursor-pointer ${
                heroVideoSrc.includes('OnePuch')
                  ? 'bg-[#009EBC] text-white font-bold shadow-sm'
                  : 'text-[#D2D3D5] hover:text-white'
              }`}
            >
              ● 02. Conector OnePush™
            </button>
          </div>

          {/* Play/Pause & Mute controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={togglePlay}
              aria-label={isVideoPlaying ? 'Pausar video de fondo' : 'Reproducir video de fondo'}
              className="w-9 h-9 rounded-full bg-black/70 hover:bg-[#009EBC] text-white backdrop-blur-md border border-dashed border-white/30 flex items-center justify-center transition-all cursor-pointer shadow-md"
            >
              {isVideoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            </button>
            <button
              type="button"
              onClick={toggleMute}
              aria-label={isMuted ? 'Activar audio' : 'Silenciar audio'}
              className="w-9 h-9 rounded-full bg-black/70 hover:bg-[#009EBC] text-white backdrop-blur-md border border-dashed border-white/30 flex items-center justify-center transition-all cursor-pointer shadow-md"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
          </div>
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
              <button
                onClick={() => setActiveMediaTab('image')}
                className={`px-3 py-1.5 rounded-full text-xs font-mono-tech uppercase tracking-wider transition-all cursor-pointer ${
                  activeMediaTab === 'image'
                    ? 'bg-[#001041] text-white font-semibold shadow-sm'
                    : 'bg-white text-[#71797a] border border-dashed border-[#D2D3D5] hover:text-[#001041]'
                }`}
              >
                Fotografías de Consola
              </button>
              <button
                onClick={() => setActiveMediaTab('video-ergo')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono-tech uppercase tracking-wider transition-all cursor-pointer ${
                  activeMediaTab === 'video-ergo'
                    ? 'bg-[#009EBC] text-white font-semibold shadow-sm'
                    : 'bg-white text-[#71797a] border border-dashed border-[#D2D3D5] hover:text-[#009EBC]'
                }`}
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Video: Ergonomía</span>
              </button>
              <button
                onClick={() => setActiveMediaTab('video-onepush')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono-tech uppercase tracking-wider transition-all cursor-pointer ${
                  activeMediaTab === 'video-onepush'
                    ? 'bg-[#009EBC] text-white font-semibold shadow-sm'
                    : 'bg-white text-[#71797a] border border-dashed border-[#D2D3D5] hover:text-[#009EBC]'
                }`}
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Video: Conector OnePush™</span>
              </button>
            </div>

            {/* Main Stage Viewport */}
            <div className="border border-dashed border-[#D2D3D5] bg-white p-4 sm:p-6 rounded-sm relative overflow-hidden group shadow-sm">
              <div className="relative aspect-4/3 w-full bg-[#f8f9fa] rounded-xs overflow-hidden flex items-center justify-center">
                {activeMediaTab === 'video-ergo' ? (
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
              <div className="mt-4 pt-3 border-t border-dashed border-[#D2D3D5] flex flex-wrap items-center justify-between text-[11px] font-mono-tech text-[#71797a] gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#25b895] animate-pulse" />
                  <span className="text-[#001041] font-semibold">HOMOLOGACIÓN CE &amp; PROTOCOLOS CLÍNICOS</span>
                </div>
                <span>REF: {product.model} • ESTADO SÓLIDO</span>
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
                  <h3 className="text-xs font-mono-tech font-bold uppercase tracking-wider text-[#001041]">
                    Capacidades Quirúrgicas Destacadas
                  </h3>
                  <span className="text-[10px] font-mono-tech text-[#009EBC] font-semibold uppercase">
                    ESTÁNDAR CLÍNICO
                  </span>
                </div>

                <ul className="space-y-2.5 text-xs font-mono-tech text-[#494f52]">
                  {product.features.slice(0, 6).map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-4 h-4 rounded-full bg-[#009EBC]/10 text-[#009EBC] flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
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
                <span className="px-3 py-1 rounded-full border border-dashed border-[#009EBC] bg-[#009EBC]/10 text-[11px] font-mono-tech text-[#009EBC] uppercase tracking-wider font-semibold">
                  {product.specialty}
                </span>
                <span className="px-3 py-1 rounded-full border border-dashed border-[#001041]/20 bg-white text-[11px] font-mono-tech text-[#001041] uppercase tracking-wider font-semibold">
                  TECNOLOGÍA TFL SUPERPULSADA • 1940 NM
                </span>
              </div>

              <h2 className="font-heading font-light uppercase text-3xl sm:text-4xl lg:text-5xl text-[#001041] leading-[1.08] tracking-tight">
                {product.name}
              </h2>

              {product.tagline && (
                <p className="text-sm font-semibold text-[#009EBC] font-mono-tech uppercase tracking-wide">
                  {product.tagline}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-4 text-xs font-mono-tech text-[#71797a] pt-1 border-b border-dashed border-[#D2D3D5] pb-3">
                <span>MODELO: <strong className="text-[#001041]">{product.model}</strong></span>
                <span>•</span>
                <span>FABRICANTE: <strong className="text-[#001041]">{product.brand} (IPG Photonics)</strong></span>
              </div>

              <p className="text-xs sm:text-sm text-[#494f52] leading-relaxed pt-1 font-mono-tech">
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
                    <span className="text-[10px] font-mono-tech text-[#71797a] uppercase block truncate">
                      {metric.label}
                    </span>
                    <div className="flex items-baseline gap-1 text-[#001041] font-heading font-bold text-lg sm:text-xl">
                      <span>{metric.value}</span>
                      {metric.unit && (
                        <span className="text-xs font-mono-tech text-[#009EBC] font-normal">
                          {metric.unit}
                        </span>
                      )}
                    </div>
                    {metric.helper && (
                      <span className="text-[10px] text-[#71797a] block leading-tight font-mono-tech">
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
                className="w-full py-4 px-6 rounded-sm bg-[#001041] hover:bg-[#009EBC] text-white font-mono-tech text-xs uppercase tracking-widest font-bold transition-all shadow-md shadow-[#001041]/20 flex items-center justify-center gap-3 cursor-pointer group"
              >
                <MessageCircle className="w-4 h-4 text-[#25b895]" />
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
                    <p className="text-xs font-bold tracking-wider uppercase text-white">
                      Descargar Dossier Técnico Oficial (PDF)
                    </p>
                    <p className="text-[10px] text-[#D2D3D5]">
                      Parámetros biomédicos completos de VPG LaserOne y protocolos clínicos
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
              </a>
            )}

            {/* Warranty & Hospital Support Assurance */}
            <div className="border border-dashed border-[#D2D3D5] bg-white p-4 rounded-sm flex items-start gap-3.5 shadow-2xs">
              <div className="w-9 h-9 rounded-sm bg-[#001041]/5 text-[#009EBC] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="text-xs font-mono-tech space-y-0.5">
                <p className="font-bold uppercase text-[#001041] tracking-wider text-[11px]">
                  Garantía &amp; Acompañamiento Quirúrgico Mednova
                </p>
                <p className="text-[#494f52] leading-relaxed text-[11px]">
                  Todos nuestros sistemas incluyen entrega e instalación en quirófano, capacitación certificada in-situ para urólogos y personal de enfermería, y soporte biomédico presencial 24/7 en Perú.
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
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-dashed border-[#D2D3D5]/30 text-[#009EBC] text-xs font-mono-tech tracking-widest uppercase font-bold">
              INGENIERÍA BIOMÉDICA PROPIETARIA
            </span>
            <h2 className="font-heading font-light uppercase text-3xl sm:text-5xl text-white tracking-tight leading-tight">
              Tecnología Urolase MAX, Explicada
            </h2>
            <p className="text-xs sm:text-sm text-[#D2D3D5] leading-relaxed">
              Explore los cuatro pilares tecnológicos desarrollados por VPG LaserOne que convierten a Urolase MAX en la plataforma quirúrgica más avanzada del quirófano urológico.
            </p>
          </div>

          {/* Interactive Pillar Tabs Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 border-b border-dashed border-white/20 pb-4">
            <button
              onClick={() => setActivePillarTab('tissue-sensor')}
              className={`p-3.5 rounded-sm border text-left transition-all cursor-pointer ${
                activePillarTab === 'tissue-sensor'
                  ? 'bg-[#009EBC] text-white border-[#009EBC] shadow-md font-bold'
                  : 'bg-white/5 text-[#D2D3D5] border-white/10 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] uppercase tracking-wider mb-1 opacity-80">
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
                  ? 'bg-[#009EBC] text-white border-[#009EBC] shadow-md font-bold'
                  : 'bg-white/5 text-[#D2D3D5] border-white/10 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] uppercase tracking-wider mb-1 opacity-80">
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
                  ? 'bg-[#009EBC] text-white border-[#009EBC] shadow-md font-bold'
                  : 'bg-white/5 text-[#D2D3D5] border-white/10 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] uppercase tracking-wider mb-1 opacity-80">
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
                  ? 'bg-[#009EBC] text-white border-[#009EBC] shadow-md font-bold'
                  : 'bg-white/5 text-[#D2D3D5] border-white/10 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] uppercase tracking-wider mb-1 opacity-80">
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
                    <span className="px-2.5 py-0.5 rounded-full bg-[#25b895] text-white text-[10px] font-bold uppercase tracking-wider">
                      INNOVACIÓN EXCLUSIVA DE VPG LASERONE
                    </span>
                    <span className="text-[11px] text-[#009EBC]">RESPUESTA EN TIEMPO REAL &lt; 1 MS</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-heading text-white uppercase font-light">
                    Tissue Sensor™: Protección Tisular Inteligente en Tiempo Real
                  </h3>

                  <p className="text-xs sm:text-sm text-[#D2D3D5] leading-relaxed">
                    A través de un sensor fotoespectral continuo integrado en el canal de emisión, Urolase MAX analiza la reflectancia óptica de la superficie objetivo. En el instante exacto en que la fibra toca o roza mucosa urotelial o pared vesical, <strong>el sistema suspende el haz láser en menos de 1 milisegundo</strong>.
                  </p>

                  <ul className="space-y-2 text-xs text-[#D2D3D5] pt-2">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#009EBC]" />
                      <span><strong>Cero perforaciones accidentales</strong> en uréteres estrechos o tortuosos.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#009EBC]" />
                      <span><strong>Confianza absoluta</strong> para el cirujano en cálices renales inferiores de difícil acceso.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#009EBC]" />
                      <span><strong>Reactivación automática</strong> inmediata tan pronto la fibra vuelve a apuntar a la litiasis.</span>
                    </li>
                  </ul>
                </div>

                {/* Interactive Simulator Widget */}
                <div className="lg:col-span-5 bg-[#001041] p-5 rounded-sm border border-dashed border-[#009EBC]/40 space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-dashed border-white/10">
                    <span className="text-[10px] uppercase text-[#71797a] tracking-wider font-mono-tech">
                      SIMULADOR INTERACTIVO TISSUE SENSOR™
                    </span>
                    <span className="text-[10px] text-[#009EBC] font-mono-tech">EN VIVO</span>
                  </div>

                  <p className="text-[11px] text-[#D2D3D5]">
                    Pruebe cómo reacciona el sistema cambiando el objetivo de la fibra óptica:
                  </p>

                  {/* Toggle buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setSensorSimulationTarget('stone')}
                      className={`py-2 px-3 rounded-xs text-xs font-mono-tech uppercase font-bold tracking-wider transition-all cursor-pointer ${
                        sensorSimulationTarget === 'stone'
                          ? 'bg-[#009EBC] text-white shadow-sm'
                          : 'bg-white/10 text-[#D2D3D5] hover:bg-white/20'
                      }`}
                    >
                      Objetivo: Cálculo
                    </button>
                    <button
                      onClick={() => setSensorSimulationTarget('tissue')}
                      className={`py-2 px-3 rounded-xs text-xs font-mono-tech uppercase font-bold tracking-wider transition-all cursor-pointer ${
                        sensorSimulationTarget === 'tissue'
                          ? 'bg-[#25b895] text-white shadow-sm'
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
                          <span className="text-xs font-bold text-[#009EBC] uppercase">
                            ● DISPARO ACTIVO (1940 NM)
                          </span>
                          <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded-full bg-[#009EBC]/20 text-[#009EBC]">
                            EMISIÓN PERMITIDA
                          </span>
                        </div>
                        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-[#009EBC] w-full animate-pulse" />
                        </div>
                        <p className="text-[11px] text-[#D2D3D5] leading-relaxed">
                          La señal óptica confirma densidad mineral. Pulverización Dusting activa a alta velocidad sin interrupción.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#25b895] uppercase">
                            🛡️ DETENCIÓN INSTANTÁNEA
                          </span>
                          <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded-full bg-[#25b895]/20 text-[#25b895]">
                            PROTECCIÓN ACTIVA (&lt; 1 ms)
                          </span>
                        </div>
                        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-[#25b895] w-2/12" />
                        </div>
                        <p className="text-[11px] text-[#D2D3D5] leading-relaxed">
                          ¡Contacto con mucosa detectado! El haz láser se apagó automáticamente a 0.0 W para evitar lesión en el tejido.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activePillarTab === 'finepulse' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#009EBC] text-white text-[10px] font-bold uppercase tracking-wider">
                      LITOTRICIA SUPERPULSADA
                    </span>
                    <span className="text-[11px] text-[#25b895]">RETROPULSIÓN &lt; 3.5 MM</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-heading text-white uppercase font-light">
                    FinePulse &amp; MRP: Pulverización a Polvo sin Desplazamiento
                  </h3>

                  <p className="text-xs sm:text-sm text-[#D2D3D5] leading-relaxed">
                    Con frecuencias de disparo de hasta 2,400 Hz y la longitud de onda de 1940 nm, Urolase MAX fragmenta los cálculos urinarios directamente a partículas microscópicas de menos de 0.1 mm, permitiendo su expulsión espontánea en la orina sin requerir extracción mecánica con canastillas.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <div className="p-3 bg-white/5 border border-white/10 rounded-sm">
                      <span className="text-xs font-bold text-[#009EBC] block">FinePulse (Dusting)</span>
                      <p className="text-[10px] text-[#D2D3D5] mt-1">Alta velocidad para pulverización continua sin pausas.</p>
                    </div>
                    <div className="p-3 bg-white/5 border border-white/10 rounded-sm">
                      <span className="text-xs font-bold text-[#25b895] block">UltraPulse (Impacto)</span>
                      <p className="text-[10px] text-[#D2D3D5] mt-1">Máxima energía de impacto en litiasis de extrema dureza.</p>
                    </div>
                    <div className="p-3 bg-white/5 border border-white/10 rounded-sm">
                      <span className="text-xs font-bold text-white block">Modo MRP</span>
                      <p className="text-[10px] text-[#D2D3D5] mt-1">Mínima retropulsión: el cálculo no migra durante el disparo.</p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-[#001041] p-5 rounded-sm border border-dashed border-[#009EBC]/40 space-y-3">
                  <div className="aspect-video w-full rounded-xs overflow-hidden bg-black flex items-center justify-center">
                    <img
                      src="/images/products/urolase-max/urolase_max_hero.webp"
                      alt="Modo FinePulse y pulverización Dusting de cálculos con láser de tulio Urolase MAX"
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                  <div className="text-[11px] text-[#D2D3D5] text-center">
                    Absorción en agua 4.5x mayor que Holmium (Ho:YAG) a 2100 nm, reduciendo el efecto de cavitación expansiva violenta.
                  </div>
                </div>
              </div>
            )}

            {activePillarTab === 'thuflep' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#009EBC] text-white text-[10px] font-bold uppercase tracking-wider">
                      CIRUGÍA PROSTÁTICA AVANZADA (BPH)
                    </span>
                    <span className="text-[11px] text-[#25b895]">SUPERIOR A HOLEP CLÁSICO</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-heading text-white uppercase font-light">
                    ThuFLEP &amp; DissectPulse: Enucleación Anatómica sin Carbonización
                  </h3>

                  <p className="text-xs sm:text-sm text-[#D2D3D5] leading-relaxed">
                    Urolase MAX ofrece una precisión milimétrica para adenomas prostáticos de cualquier volumen. El modo <strong>DissectPulse</strong> proporciona disección termomecánica sin quemar los tejidos circundantes, mientras que el modo <strong>BloodlessPulse</strong> sella vasos nutricios de manera instantánea, manteniendo el campo quirúrgico absolutamente transparente.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-3 bg-white/5 border border-white/10 rounded-sm">
                      <span className="text-xs font-bold text-[#009EBC] block">Modo DissectPulse</span>
                      <p className="text-[10px] text-[#D2D3D5] mt-1">Disección de adenomas con hemostasia superior y sin carbonización.</p>
                    </div>
                    <div className="p-3 bg-white/5 border border-white/10 rounded-sm">
                      <span className="text-xs font-bold text-[#25b895] block">Técnica ThuFLEP</span>
                      <p className="text-[10px] text-[#D2D3D5] mt-1">Corte anatómico con penetración tisular de apenas 0.2 mm.</p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-[#001041] p-5 rounded-sm border border-dashed border-[#009EBC]/40 space-y-3">
                  <div className="p-4 bg-[#061c5c] rounded-sm space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#25b895]">
                      <CheckCircle className="w-4 h-4" />
                      <span>BENEFICIOS CLÍNICOS EN PRÓSTATA</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-[#D2D3D5]">
                      <li>• Retiro de sonda vesical en menos de 24 horas.</li>
                      <li>• Campo quirúrgico 100% visible sin humo quirúrgico.</li>
                      <li>• Coagulación precisa sin lesión del esfínter urinario.</li>
                      <li>• Procedimiento reproducible con curva de aprendizaje corta.</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activePillarTab === 'onepush' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#009EBC] text-white text-[10px] font-bold uppercase tracking-wider">
                      CONECTIVIDAD &amp; PROTECCIÓN ÓPTICA
                    </span>
                    <span className="text-[11px] text-[#25b895]">OBTURADOR AUTOMÁTICO ANTIPOLVO</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-heading text-white uppercase font-light">
                    Conector OnePush™ &amp; Asistente Quirúrgico Táctil
                  </h3>

                  <p className="text-xs sm:text-sm text-[#D2D3D5] leading-relaxed">
                    El puerto óptico patentado <strong>OnePush™</strong> cuenta con un obturador hermético automático que permanece completamente cerrado cuando no hay fibra conectada. Al insertar la fibra, se abre de forma suave y sin esfuerzo con un solo clic, impidiendo que el polvo o los fluidos del quirófano contaminen los lentes internos del resonador.
                  </p>

                  <p className="text-xs sm:text-sm text-[#D2D3D5] leading-relaxed">
                    Además, el software táctil <strong>Surgeon&apos;s Assistant</strong> precarga los parámetros clínicos validados por líderes mundiales de la endourología, permitiendo al equipo quirúrgico iniciar o cambiar de modo en un solo toque en pantalla.
                  </p>
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
                  <div className="text-[11px] text-[#D2D3D5] text-center">
                    Activación suave con un solo clic • Esterilidad y durabilidad óptica garantizada.
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-dashed border-[#009EBC] bg-[#009EBC]/5 text-[#009EBC] text-[11px] font-mono-tech uppercase font-bold">
              <span>EL NUEVO ESTÁNDAR DE ORO EN QUIRÓFANO UROLÓGICO</span>
            </div>
            <h2 className="font-heading font-light uppercase text-2xl sm:text-4xl text-[#001041] tracking-tight leading-tight">
              El Cambio de Paradigma: De Ho:YAG Tradicional a Tulio Superpulsado (TFL)
            </h2>
            <p className="text-xs sm:text-sm text-[#494f52] leading-relaxed font-mono-tech">
              Donde el láser Holmium tradicional genera cavitaciones violentas, retropulsión descontrolada y sangrado continuo, Urolase MAX emite un pulso superpulsado continuo con <strong>4.5 veces mayor absorción en agua</strong>, garantizando visibilidad transparente, hemostasia inmediata y pulverización estable.
            </p>
          </div>

          {/* Endorsement Quote Card */}
          <div className="p-6 sm:p-8 rounded-sm bg-[#f8f9fa] border border-dashed border-[#D2D3D5] relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center gap-2 text-[#009EBC]">
                  <Stethoscope className="w-5 h-5" />
                  <span className="text-[11px] font-mono-tech uppercase font-bold tracking-widest text-[#009EBC]">
                    EVIDENCIA &amp; TESTIMONIO QUIRÚRGICO
                  </span>
                </div>

                <blockquote className="text-sm sm:text-base text-[#001041] font-mono-tech leading-relaxed italic border-l-2 border-[#009EBC] pl-4">
                  &ldquo;En urología de alta precisión, la predictibilidad del pulso lo es todo: Urolase MAX nos permite pulverizar cálculos con mínima retropulsión y enuclear próstatas con un campo quirúrgico completamente hemostático y cristalino. La detención automática con Tissue Sensor™ cambia por completo el estándar de seguridad para el paciente en anatomías estrechas.&rdquo;
                </blockquote>

                <div className="pt-2 font-mono-tech">
                  <p className="text-xs font-bold text-[#001041] uppercase tracking-wide">
                    Dr. Juan Carlos Ramos M.
                  </p>
                  <p className="text-[11px] text-[#71797a]">
                    Cirujano Urólogo &amp; Especialista en Endourología Láser • Miembro de la Sociedad Peruana de Urología (SPU)
                  </p>
                </div>
              </div>

              {/* 3 Proof Metric Badges */}
              <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3 font-mono-tech">
                <div className="p-3 bg-white border border-dashed border-[#D2D3D5] rounded-sm">
                  <span className="text-xs text-[#009EBC] font-bold block">10x MENOR RETROPULSIÓN</span>
                  <p className="text-[11px] text-[#494f52] mt-0.5">
                    El cálculo permanece estable frente a la fibra sin migrar a cálices superiores.
                  </p>
                </div>
                <div className="p-3 bg-white border border-dashed border-[#D2D3D5] rounded-sm">
                  <span className="text-xs text-[#25b895] font-bold block">0.2 MM PENETRACIÓN TÉRMICA</span>
                  <p className="text-[11px] text-[#494f52] mt-0.5">
                    Máxima hemostasia sin necrosis profunda ni daño a la cápsula prostática.
                  </p>
                </div>
                <div className="p-3 bg-white border border-dashed border-[#D2D3D5] rounded-sm">
                  <span className="text-xs text-[#001041] font-bold block">&lt; 1 MS RESPUESTA TISULAR</span>
                  <p className="text-[11px] text-[#494f52] mt-0.5">
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
            <span className="text-[11px] font-mono-tech text-[#009EBC] uppercase tracking-widest block font-bold">
              BENCHMARK TÉCNICO &amp; EVIDENCIA PUBLICADA
            </span>
            <h2 className="font-heading font-light uppercase text-2xl sm:text-4xl text-[#001041] tracking-tight">
              La Ciencia Detrás: Urolase MAX vs. Tecnologías Anteriores
            </h2>
            <p className="text-xs sm:text-sm text-[#494f52] leading-relaxed">
              Comparativa cuantitativa entre la plataforma de Tulio Superpulsado (TFL 1940 nm), el Láser Holmium convencional (Ho:YAG 2100 nm) y los sistemas con modulación de pulso Moses.
            </p>
          </div>

          {/* Benchmark Table Grid */}
          <div className="border border-dashed border-[#D2D3D5] rounded-sm overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-xs font-mono-tech border-collapse">
                <thead>
                  <tr className="bg-[#001041] text-white border-b border-[#001041]">
                    <th className="py-3.5 px-4 sm:px-6 text-left font-bold uppercase tracking-wider text-[11px]">
                      Parámetro Quirúrgico / Biomédico
                    </th>
                    <th className="py-3.5 px-4 sm:px-6 text-left font-bold uppercase tracking-wider text-[11px] bg-[#009EBC] text-white">
                      UROLASE MAX (TFL 1940 nm)
                    </th>
                    <th className="py-3.5 px-4 sm:px-6 text-left font-bold uppercase tracking-wider text-[11px] text-[#D2D3D5]">
                      Láser Holmium Clásico (Ho:YAG)
                    </th>
                    <th className="py-3.5 px-4 sm:px-6 text-left font-bold uppercase tracking-wider text-[11px] text-[#D2D3D5]">
                      Sistemas de Modulación Moses
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dashed divide-[#D2D3D5]">
                  <tr className="hover:bg-[#f8f9fa] transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-semibold text-[#001041]">
                      Absorción Óptica en Agua
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-[#009EBC] bg-[#009EBC]/5">
                      4.5x Superior (Pico exacto 1940 nm, Coef. ~125 cm⁻¹)
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-[#71797a]">
                      Absorción moderada a 2100 nm (Coef. ~28 cm⁻¹)
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-[#71797a]">
                      Igual absorción básica de 2100 nm modulada
                    </td>
                  </tr>

                  <tr className="hover:bg-[#f8f9fa] transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-semibold text-[#001041]">
                      Retropulsión del Cálculo
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-[#25b895] bg-[#009EBC]/5">
                      &lt; 3.5 mm (Cálculo estático durante disparo)
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-[#71797a]">
                      &gt; 25 mm (Desplazamiento violento y migración)
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-[#71797a]">
                      12 - 15 mm (Retropulsión parcial persistente)
                    </td>
                  </tr>

                  <tr className="hover:bg-[#f8f9fa] transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-semibold text-[#001041]">
                      Frecuencia Máxima de Pulso
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-[#009EBC] bg-[#009EBC]/5">
                      Hasta 2,400 Hz (Pulverización continua ultrafina)
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-[#71797a]">
                      Hasta 80 - 100 Hz (Disparos espaciados)
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-[#71797a]">
                      Hasta 80 - 120 Hz
                    </td>
                  </tr>

                  <tr className="hover:bg-[#f8f9fa] transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-semibold text-[#001041]">
                      Calibre Mínimo de Fibra Óptica
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-[#009EBC] bg-[#009EBC]/5">
                      150 µm (Máxima deflexión en flexible digital)
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-[#71797a]">
                      272 - 365 µm (Rigidez que limita curvatura)
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-[#71797a]">
                      200 - 365 µm
                    </td>
                  </tr>

                  <tr className="hover:bg-[#f8f9fa] transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-semibold text-[#001041]">
                      Sensor de Protección Tisular
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-[#25b895] bg-[#009EBC]/5">
                      Tissue Sensor™ Activo (&lt; 1 ms de corte)
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-[#71797a]">
                      No disponible (Riesgo en pared ureteral)
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-[#71797a]">
                      No disponible
                    </td>
                  </tr>

                  <tr className="hover:bg-[#f8f9fa] transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-semibold text-[#001041]">
                      Alimentación Eléctrica &amp; Refrigeración
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-[#009EBC] bg-[#009EBC]/5">
                      220V Estándar • Aire Silencioso (&lt; 52 dB)
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-[#71797a]">
                      380V Trifásica dedicada • Chiller de agua ruidoso
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-[#71797a]">
                      Requiere instalación eléctrica especial
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Peer-Reviewed Scientific Citation Banner */}
          <div className="p-4 rounded-sm bg-[#001041]/5 border border-dashed border-[#009EBC]/40 flex items-start gap-3">
            <Award className="w-5 h-5 text-[#009EBC] shrink-0 mt-0.5" />
            <div className="text-xs font-mono-tech space-y-1">
              <span className="font-bold text-[#001041] uppercase tracking-wider block">
                Evidencia Científica en Literatura Urológica Indexada
              </span>
              <p className="text-[#494f52] text-[11px] leading-relaxed italic">
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
            <span className="text-[11px] font-mono-tech text-[#009EBC] uppercase tracking-widest font-semibold block">
              DISEÑADO PARA LA DINÁMICA DEL QUIRÓFANO REAL
            </span>
            <h2 className="font-heading font-light uppercase text-2xl sm:text-4xl text-[#001041] tracking-tight">
              Ingeniería Biomédica Sin Complicaciones
            </h2>
            <p className="text-xs text-[#494f52]">
              Diseñado para reducir tiempos muertos, eliminar obras civiles de instalación y facilitar el traslado inmediato entre salas de operaciones.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 bg-white border border-dashed border-[#D2D3D5] rounded-sm space-y-3 hover:border-[#009EBC] transition-all">
              <div className="w-10 h-10 rounded-sm bg-[#001041]/5 text-[#009EBC] flex items-center justify-center font-bold text-sm">
                01
              </div>
              <h3 className="font-heading font-bold text-sm text-[#001041] uppercase">
                Hasta 3x Más Compacto (42 kg)
              </h3>
              <p className="text-xs text-[#494f52] leading-relaxed">
                Consola ergonómica con ruedas de grado médico antiestáticas y freno doble. Fácil de trasladar entre quirófanos sin esfuerzo ni grúas.
              </p>
            </div>

            <div className="p-5 bg-white border border-dashed border-[#D2D3D5] rounded-sm space-y-3 hover:border-[#009EBC] transition-all">
              <div className="w-10 h-10 rounded-sm bg-[#001041]/5 text-[#009EBC] flex items-center justify-center font-bold text-sm">
                02
              </div>
              <h3 className="font-heading font-bold text-sm text-[#001041] uppercase">
                Plug &amp; Play 220V Estándar
              </h3>
              <p className="text-xs text-[#494f52] leading-relaxed">
                Conéctelo a cualquier tomacorriente de pared convencional de 220 VAC. Cero adaptaciones de tomas trifásicas industriales de alto costo.
              </p>
            </div>

            <div className="p-5 bg-white border border-dashed border-[#D2D3D5] rounded-sm space-y-3 hover:border-[#009EBC] transition-all">
              <div className="w-10 h-10 rounded-sm bg-[#001041]/5 text-[#009EBC] flex items-center justify-center font-bold text-sm">
                03
              </div>
              <h3 className="font-heading font-bold text-sm text-[#001041] uppercase">
                Refrigeración por Aire Silenciosa
              </h3>
              <p className="text-xs text-[#494f52] leading-relaxed">
                Sistema autónomo libre de mangueras de agua hospitalarias, chillers ruidosos o líquidos contaminantes. Nivel de ruido menor a 52 dB.
              </p>
            </div>

            <div className="p-5 bg-white border border-dashed border-[#D2D3D5] rounded-sm space-y-3 hover:border-[#009EBC] transition-all">
              <div className="w-10 h-10 rounded-sm bg-[#001041]/5 text-[#009EBC] flex items-center justify-center font-bold text-sm">
                04
              </div>
              <h3 className="font-heading font-bold text-sm text-[#001041] uppercase">
                Fibra de Estado Sólido
              </h3>
              <p className="text-xs text-[#494f52] leading-relaxed">
                Sin espejos resonadores móviles que se descalibren con el transporte o vibraciones. Disponibilidad quirúrgica del 100%.
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
                <span className="text-[11px] font-mono-tech text-[#009EBC] uppercase tracking-widest block font-bold">
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
                        : 'text-[#494f52] hover:text-[#001041]'
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
                      <p className="text-xs sm:text-sm font-semibold text-[#009EBC] font-mono-tech">
                        {currentApp.subtitle}
                      </p>
                    )}
                    <p className="text-xs sm:text-sm text-[#494f52] leading-relaxed font-mono-tech">
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
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono-tech bg-[#001041]/5 text-[#001041] font-semibold uppercase tracking-wider border border-dashed border-[#D2D3D5]">
                              {mode.badge}
                            </span>
                          )}
                        </div>
                        <h4 className="font-heading font-semibold text-base text-[#001041] group-hover:text-[#009EBC] transition-colors uppercase">
                          {mode.title}
                        </h4>
                        <p className="text-xs text-[#494f52] leading-relaxed font-mono-tech">
                          {mode.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Peer-Reviewed Scientific Citation */}
                  {currentApp.scientific_note && (
                    <div className="p-4 rounded-sm bg-[#001041]/5 border border-dashed border-[#009EBC]/40 flex items-start gap-3">
                      <Award className="w-5 h-5 text-[#009EBC] shrink-0 mt-0.5" />
                      <div className="text-xs font-mono-tech space-y-1">
                        <span className="font-bold text-[#001041] uppercase tracking-wider block">
                          Evidencia Médica Publicada
                        </span>
                        <p className="text-[#494f52] text-[11px] leading-relaxed italic">
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
              <span className="text-[11px] font-mono-tech text-[#71797a] uppercase tracking-widest block">
                PARÁMETROS TÉCNICOS &amp; BIOMÉDICOS
              </span>
              <h2 className="font-heading font-light uppercase text-2xl sm:text-3xl text-[#001041] mt-1 tracking-tight">
                Ficha Técnica Integral
              </h2>
            </div>

            <div className="border border-dashed border-[#D2D3D5] rounded-sm overflow-hidden bg-white shadow-sm">
              <table className="w-full text-xs font-mono-tech border-collapse">
                <tbody>
                  {Object.entries(product.specifications).map(([key, val], idx) => (
                    <tr
                      key={key}
                      className={`border-b border-dashed border-[#D2D3D5]/60 hover:bg-[#009EBC]/5 transition-colors ${
                        idx % 2 === 0 ? 'bg-transparent' : 'bg-[#fafafa]'
                      }`}
                    >
                      <th className="text-left font-normal py-3 px-4 sm:px-6 text-[#71797a] uppercase text-[11px] w-2/5 sm:w-1/3 align-top border-r border-dashed border-[#D2D3D5]/40">
                        {key}
                      </th>
                      <td className="text-left font-semibold py-3 px-4 sm:px-6 text-[#001041] text-xs">
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
                <span className="text-[11px] font-mono-tech text-[#009EBC] uppercase tracking-widest block font-bold">
                  RESPALDO GLOBAL DEL FABRICANTE
                </span>
                <h2 className="font-heading font-light uppercase text-2xl sm:text-3xl text-[#001041] tracking-tight">
                  {product.manufacturer_info.name}
                </h2>
                <p className="text-xs sm:text-sm text-[#494f52] leading-relaxed">
                  {product.manufacturer_info.description}
                </p>
                <p className="text-xs text-[#71797a] leading-relaxed">
                  En el Perú y Latinoamérica, Mednova Technologies es el representante oficial de comercialización, entrenamiento y servicio técnico certificado para la plataforma Urolase MAX.
                </p>
              </div>

              <div className="lg:col-span-5 grid grid-cols-2 gap-3">
                {product.manufacturer_info.founded && (
                  <div className="p-4 bg-[#f8f9fa] border border-dashed border-[#D2D3D5] rounded-sm text-center">
                    <span className="text-2xl font-heading font-bold text-[#001041]">
                      {product.manufacturer_info.founded}
                    </span>
                    <span className="text-[10px] text-[#71797a] uppercase block mt-1">
                      Año de Fundación
                    </span>
                  </div>
                )}
                {product.manufacturer_info.annual_patients && (
                  <div className="p-4 bg-[#f8f9fa] border border-dashed border-[#D2D3D5] rounded-sm text-center">
                    <span className="text-2xl font-heading font-bold text-[#009EBC]">
                      {product.manufacturer_info.annual_patients}
                    </span>
                    <span className="text-[10px] text-[#71797a] uppercase block mt-1">
                      Pacientes / Año
                    </span>
                  </div>
                )}
                {product.manufacturer_info.patents && (
                  <div className="p-4 bg-[#f8f9fa] border border-dashed border-[#D2D3D5] rounded-sm text-center">
                    <span className="text-2xl font-heading font-bold text-[#001041]">
                      {product.manufacturer_info.patents}
                    </span>
                    <span className="text-[10px] text-[#71797a] uppercase block mt-1">
                      Patentes Láser
                    </span>
                  </div>
                )}
                {product.manufacturer_info.installed_units && (
                  <div className="p-4 bg-[#f8f9fa] border border-dashed border-[#D2D3D5] rounded-sm text-center">
                    <span className="text-2xl font-heading font-bold text-[#009EBC]">
                      {product.manufacturer_info.installed_units}
                    </span>
                    <span className="text-[10px] text-[#71797a] uppercase block mt-1">
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
            <span className="text-[11px] font-mono-tech text-[#009EBC] uppercase tracking-widest block font-bold">
              PLANES COMERCIALES B2B &bull; FLEXIBILIDAD HOSPITALARIA
            </span>
            <h2 className="font-heading font-light uppercase text-2xl sm:text-4xl text-[#001041] tracking-tight leading-tight">
              Modalidades de Adquisición para Clínicas y Hospitales
            </h2>
            <p className="text-xs sm:text-sm text-[#494f52] leading-relaxed">
              En Mednova Technologies adaptamos la incorporación de Urolase MAX a la estructura presupuestal de su institución médica, ya sea como inversión de capital (CAPEX) o como gasto operativo programado (OPEX).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Modalidad 1: Venta Directa */}
            <div className="p-6 bg-white border border-dashed border-[#D2D3D5] rounded-sm space-y-4 hover:border-[#009EBC] transition-all shadow-sm flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#001041]/5 text-[#001041] border border-dashed border-[#D2D3D5]">
                    MODELO CAPEX
                  </span>
                  <span className="text-xs text-[#009EBC] font-bold">01</span>
                </div>
                <h3 className="font-heading font-light uppercase text-xl text-[#001041]">
                  Venta Directa Integral
                </h3>
                <p className="text-xs text-[#494f52] leading-relaxed">
                  Adquisición definitiva del equipo como activo fijo institucional con condiciones preferenciales de importación y entrega inmediata.
                </p>
                <ul className="space-y-2 text-xs text-[#494f52] pt-2 border-t border-dashed border-[#D2D3D5]">
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#25b895] shrink-0 mt-0.5" />
                    <span>Garantía oficial completa de 24 meses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#25b895] shrink-0 mt-0.5" />
                    <span>Instalación y calibración técnica en quirófano</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#25b895] shrink-0 mt-0.5" />
                    <span>Kit de inicio de fibras ópticas de cuarzo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#25b895] shrink-0 mt-0.5" />
                    <span>Capacitación clínica certificada para el staff</span>
                  </li>
                </ul>
              </div>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xs bg-[#001041] hover:bg-[#009EBC] text-white text-xs uppercase font-bold tracking-wider text-center flex items-center justify-center gap-2 transition-colors cursor-pointer mt-4"
              >
                <span>Cotizar Venta Directa</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Modalidad 2: Leasing Financiero */}
            <div className="p-6 bg-white border border-dashed border-[#009EBC] rounded-sm space-y-4 shadow-md flex flex-col justify-between relative">
              <div className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-[#009EBC] text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
                MÁS SOLICITADO
              </div>
              <div className="space-y-3 pt-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#009EBC]/10 text-[#009EBC] border border-dashed border-[#009EBC]">
                    MODELO OPEX
                  </span>
                  <span className="text-xs text-[#009EBC] font-bold">02</span>
                </div>
                <h3 className="font-heading font-light uppercase text-xl text-[#001041]">
                  Leasing Hospitalario
                </h3>
                <p className="text-xs text-[#494f52] leading-relaxed">
                  Financiamiento en cuotas mensuales fijas, 100% deducible de impuestos corporativos y sin descapitalizar la clínica.
                </p>
                <ul className="space-y-2 text-xs text-[#494f52] pt-2 border-t border-dashed border-[#D2D3D5]">
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#25b895] shrink-0 mt-0.5" />
                    <span>Plazos flexibles de 12, 24 o 36 meses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#25b895] shrink-0 mt-0.5" />
                    <span>Mantenimiento preventivo anual incluido</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#25b895] shrink-0 mt-0.5" />
                    <span>Opción de renovación a nueva generación</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#25b895] shrink-0 mt-0.5" />
                    <span>Beneficio tributario como gasto operativo</span>
                  </li>
                </ul>
              </div>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xs bg-[#009EBC] hover:bg-[#007f97] text-white text-xs uppercase font-bold tracking-wider text-center flex items-center justify-center gap-2 transition-colors cursor-pointer mt-4"
              >
                <span>Evaluar Plan Leasing</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Modalidad 3: Comodato Quirúrgico */}
            <div className="p-6 bg-white border border-dashed border-[#D2D3D5] rounded-sm space-y-4 hover:border-[#009EBC] transition-all shadow-sm flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#001041]/5 text-[#001041] border border-dashed border-[#D2D3D5]">
                    PAGO POR CONSUMO
                  </span>
                  <span className="text-xs text-[#009EBC] font-bold">03</span>
                </div>
                <h3 className="font-heading font-light uppercase text-xl text-[#001041]">
                  Comodato / Pay-per-Use
                </h3>
                <p className="text-xs text-[#494f52] leading-relaxed">
                  Cero costo de inversión inicial. Instalamos la consola Urolase MAX en su sala quirúrgica sujeta a consumo acordado de insumos.
                </p>
                <ul className="space-y-2 text-xs text-[#494f52] pt-2 border-t border-dashed border-[#D2D3D5]">
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#25b895] shrink-0 mt-0.5" />
                    <span>Cero desembolso inicial de capital</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#25b895] shrink-0 mt-0.5" />
                    <span>Consola permanente en sala de operaciones</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#25b895] shrink-0 mt-0.5" />
                    <span>Suministro garantizado de fibras y consumibles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#25b895] shrink-0 mt-0.5" />
                    <span>Soporte biomédico y equipo de respaldo</span>
                  </li>
                </ul>
              </div>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xs bg-[#001041] hover:bg-[#009EBC] text-white text-xs uppercase font-bold tracking-wider text-center flex items-center justify-center gap-2 transition-colors cursor-pointer mt-4"
              >
                <span>Consultar Comodato</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
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
            <span className="text-[11px] font-mono-tech text-[#009EBC] uppercase tracking-widest block font-bold">
              RESOLUCIÓN DE DUDAS QUIRÚRGICAS &bull; EVIDENCIA &amp; OPERACIÓN
            </span>
            <h2 className="font-heading font-light uppercase text-2xl sm:text-4xl text-[#001041] tracking-tight">
              Preguntas Frecuentes sobre Urolase MAX
            </h2>
            <p className="text-xs sm:text-sm text-[#494f52] leading-relaxed">
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
                a: 'Mednova Technologies ofrece 3 modalidades para clínicas y hospitales: (1) Venta Directa con garantía oficial de 24 meses; (2) Leasing Financiero Hospitalario con cuotas mensuales 100% deducibles de impuestos; y (3) Comodato Quirúrgico / Pay-per-use sujeto a volumen programado de consumo de fibras y consumibles urológicos.',
                category: 'Modalidades de Compra',
              },
              {
                q: '¿Cómo se solicita una demostración quirúrgica in-situ en quirófano?',
                a: 'Coordinamos el traslado de la consola Urolase MAX con instrumental completo a su sala de operaciones para un procedimiento programado. Un especialista en aplicaciones clínicas y un ingeniero biomédico de Mednova acompañan al cirujano durante la intervención sin costo de traslado en Lima y principales ciudades del Perú.',
                category: 'Demostración In-Situ',
              },
              {
                q: '¿Qué garantía y soporte biomédico oficial se ofrece en Perú?',
                a: 'Garantía de fábrica con respaldo directo de VPG LaserOne (IPG Photonics). Disponemos de stock permanente de fibras, repuestos originales y servicio técnico certificado 24/7 en Perú, con tiempo de respuesta presencial menor a 4 horas en caso de eventualidad.',
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
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#009EBC] block">
                        {faq.category}
                      </span>
                      <h3 className="text-xs sm:text-sm font-heading font-semibold text-[#001041] leading-snug">
                        {faq.q}
                      </h3>
                    </div>
                    <div
                      className={`w-7 h-7 rounded-full border border-dashed flex items-center justify-center shrink-0 transition-transform ${
                        isOpen
                          ? 'border-[#009EBC] bg-[#009EBC] text-white rotate-180'
                          : 'border-[#D2D3D5] text-[#71797a]'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs text-[#494f52] leading-relaxed border-t border-dashed border-[#D2D3D5]/60 pt-3 animate-fadeIn">
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
              <div className="w-8 h-8 rounded-full bg-[#001041]/5 text-[#009EBC] flex items-center justify-center shrink-0">
                <HelpCircle className="w-4 h-4" />
              </div>
              <p className="text-xs text-[#001041]">
                ¿Tiene una consulta clínica, técnica o sobre compatibilidad de instrumental?
              </p>
            </div>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-4 rounded-xs bg-[#009EBC] hover:bg-[#007f97] text-white text-xs uppercase font-bold tracking-wider transition-colors shrink-0 flex items-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5" />
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
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-dashed border-[#009EBC] text-[#009EBC] text-xs font-mono-tech tracking-widest uppercase font-bold">
              TRANSFORME SU PRÁCTICA ENDOUROLÓGICA
            </span>
            <h2 className="font-heading font-light uppercase text-3xl sm:text-5xl text-white tracking-tight leading-tight">
              Lleve Urolase MAX a su Quirófano
            </h2>
            <p className="text-xs sm:text-sm text-[#D2D3D5] leading-relaxed max-w-2xl mx-auto">
              Coordine una demostración quirúrgica in-situ sin costo en su centro hospitalario o solicite una cotización técnica formal con opciones de compra directa o financiamiento.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4 max-w-2xl mx-auto">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-4 px-8 rounded-sm bg-[#009EBC] hover:bg-[#007f97] text-white font-mono-tech text-xs uppercase tracking-widest font-bold transition-all shadow-lg shadow-[#009EBC]/20 flex items-center justify-center gap-3 cursor-pointer group flex-1 sm:flex-initial"
            >
              <MessageCircle className="w-4 h-4 text-white" />
              <span>Cotizar Inmediato por WhatsApp</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <button
              type="button"
              onClick={() => setDemoModalOpen(true)}
              className="py-4 px-8 rounded-sm bg-white/10 hover:bg-white text-white hover:text-[#001041] border border-dashed border-white/30 font-mono-tech text-xs uppercase tracking-widest font-bold transition-all flex items-center justify-center gap-3 cursor-pointer group flex-1 sm:flex-initial"
            >
              <Calendar className="w-4 h-4" />
              <span>Agendar Demo Quirúrgica</span>
            </button>
          </div>

          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-[#D2D3D5] opacity-80 border-t border-dashed border-white/10 max-w-2xl mx-auto">
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#25b895]" />
              Instalación y Calibración en Quirófano
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#25b895]" />
              Capacitación Médica Certificada
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#25b895]" />
              Soporte Biomédico 24/7 en Perú
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
                <span className="text-[11px] font-mono-tech text-[#71797a] uppercase tracking-widest">
                  PORTAFOLIO MEDNOVA
                </span>
                <h2 className="font-heading font-light uppercase text-2xl sm:text-3xl text-[#001041] mt-1 tracking-tight">
                  Más Soluciones Quirúrgicas
                </h2>
              </div>
              <Link
                href="/equipos"
                className="text-xs font-mono-tech text-[#001041] hover:text-[#009EBC] uppercase font-semibold flex items-center gap-1"
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
                        <h3 className="m-0 text-xs font-mono-tech font-semibold uppercase text-[#001041] line-clamp-2 leading-tight tracking-tight flex-1">
                          {rel.name}
                        </h3>
                        <span className="text-[10px] font-mono text-[#71797a] whitespace-nowrap shrink-0 pt-0.5">
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

                      <div className="p-3 pt-2 border-t border-dashed border-[#D2D3D5] flex items-center justify-between text-xs font-mono-tech bg-[#fdfdfd] group-hover:bg-[#f5f6f7] transition-colors mt-auto">
                        <span className="text-[10px] text-[#71797a] uppercase truncate max-w-[140px]">
                          {rel.specialty ? rel.specialty.split(' ')[0] : 'Urología'}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#001041] group-hover:text-[#009EBC] transition-colors">
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
          12. SURGICAL DEMO IN-SITU BOOKING MODAL
         ───────────────────────────────────────────────────────────── */}
      {demoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border border-dashed border-[#001041] rounded-sm max-w-lg w-full p-6 shadow-2xl relative font-mono-tech space-y-4">
            
            <button
              onClick={() => setDemoModalOpen(false)}
              className="absolute top-4 right-4 text-[#71797a] hover:text-[#001041] transition-colors cursor-pointer"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-[#009EBC] tracking-widest block">
                COORDINACIÓN QUIRÚRGICA MEDNOVA
              </span>
              <h3 className="text-xl font-heading font-light uppercase text-[#001041]">
                Agendar Demostración In-Situ
              </h3>
              <p className="text-xs text-[#494f52]">
                Coordinamos el traslado del equipo {product.name} a su sala de operaciones para un procedimiento urológico programado.
              </p>
            </div>

            <form onSubmit={handleDemoSubmit} className="space-y-3 pt-2">
              <div>
                <label className="text-[11px] uppercase font-bold text-[#001041] block mb-1">
                  Nombre del Cirujano o Responsable
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Dr. Carlos Mendoza"
                  value={demoForm.doctorName}
                  onChange={(e) => setDemoForm({ ...demoForm, doctorName: e.target.value })}
                  className="w-full text-xs p-2.5 bg-[#f8f9fa] border border-dashed border-[#D2D3D5] rounded-xs focus:border-[#009EBC] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] uppercase font-bold text-[#001041] block mb-1">
                  Clínica u Hospital
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Clínica San Borja / Hosp. Almenara"
                  value={demoForm.institution}
                  onChange={(e) => setDemoForm({ ...demoForm, institution: e.target.value })}
                  className="w-full text-xs p-2.5 bg-[#f8f9fa] border border-dashed border-[#D2D3D5] rounded-xs focus:border-[#009EBC] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] uppercase font-bold text-[#001041] block mb-1">
                    Ciudad
                  </label>
                  <input
                    type="text"
                    required
                    value={demoForm.city}
                    onChange={(e) => setDemoForm({ ...demoForm, city: e.target.value })}
                    className="w-full text-xs p-2.5 bg-[#f8f9fa] border border-dashed border-[#D2D3D5] rounded-xs focus:border-[#009EBC] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase font-bold text-[#001041] block mb-1">
                    Teléfono / WhatsApp
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+51 999 999 999"
                    value={demoForm.phone}
                    onChange={(e) => setDemoForm({ ...demoForm, phone: e.target.value })}
                    className="w-full text-xs p-2.5 bg-[#f8f9fa] border border-dashed border-[#D2D3D5] rounded-xs focus:border-[#009EBC] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] uppercase font-bold text-[#001041] block mb-1">
                  Procedimiento Quirúrgico de Interés
                </label>
                <select
                  value={demoForm.procedureType}
                  onChange={(e) => setDemoForm({ ...demoForm, procedureType: e.target.value })}
                  className="w-full text-xs p-2.5 bg-[#f8f9fa] border border-dashed border-[#D2D3D5] rounded-xs focus:border-[#009EBC] focus:outline-none"
                >
                  <option value="Litotricia & Cálculos Renales (RIRS)">Litotricia & Cálculos Renales (RIRS / Dusting)</option>
                  <option value="Enucleación Prostática BPH (ThuFLEP / DissectPulse)">Enucleación Prostática BPH (ThuFLEP / DissectPulse)</option>
                  <option value="Tumores Vesicales / Tejidos Blandos">Tumores Vesicales / Tejidos Blandos</option>
                  <option value="Evaluación Integral Multipropósito">Evaluación Integral Multipropósito</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] uppercase font-bold text-[#001041] block mb-1">
                  Fecha Tentativa Deseada
                </label>
                <input
                  type="date"
                  value={demoForm.dateTentative}
                  onChange={(e) => setDemoForm({ ...demoForm, dateTentative: e.target.value })}
                  className="w-full text-xs p-2.5 bg-[#f8f9fa] border border-dashed border-[#D2D3D5] rounded-xs focus:border-[#009EBC] focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xs bg-[#001041] hover:bg-[#009EBC] text-white font-mono-tech text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Enviar Solicitud a Coordinación Quirúrgica</span>
                </button>
              </div>
            </form>

          </div>
        </div>
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
            className="flex-1 py-2.5 px-3 rounded-full bg-[#009EBC] text-white text-xs font-mono-tech font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-lg"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Cotizar WhatsApp</span>
          </a>
          <button
            type="button"
            onClick={() => setDemoModalOpen(true)}
            className="py-2.5 px-3 rounded-full bg-white/10 text-white text-xs font-mono-tech border border-dashed border-white/30 flex items-center justify-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Demo</span>
          </button>
          {product.brochure_url && (
            <a
              href={product.brochure_url}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 rounded-full bg-white/10 text-white text-xs font-mono-tech border border-dashed border-white/30 flex items-center justify-center"
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
