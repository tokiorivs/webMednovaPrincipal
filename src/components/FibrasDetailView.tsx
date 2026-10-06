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
  Compass,
  Radio,
  Package,
} from 'lucide-react';
import { Product } from '@/types/product';
import { COMPANY_INFO } from '@/lib/data';

interface FibrasDetailViewProps {
  product: Product;
  relatedEquipos?: Product[];
}

export default function FibrasDetailView({
  product,
  relatedEquipos = [],
}: FibrasDetailViewProps) {
  // Cinematic Full-Width Video Hero state
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const [heroVideoSrc] = useState<string>(
    product.video_url || '/videos/OnePuch_activation.webm'
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
  const [activeMediaTab, setActiveMediaTab] = useState<
    'video-onepush' | 'hero' | 'onepush' | 'hp' | 'radial' | 'conical'
  >('video-onepush');

  const [selectedImage, setSelectedImage] = useState<string>(
    product.images[0] || '/images/products/fibras-quirurgicas-vpg/vpg_fibers_hero.webp'
  );

  // Interactive Pillar Tabs
  const [activePillarTab, setActivePillarTab] = useState<
    'onepush-tech' | 'microfibra' | 'radial-360' | 'conica-procto' | 'hp-series'
  >('onepush-tech');

  // Interactive Optical Diameters Matrix state
  const [selectedDiameterIndex, setSelectedDiameterIndex] = useState<number>(0);

  // Clinical applications accordion/tabs
  const [activeClinicalTab, setActiveClinicalTab] = useState<number>(0);

  // Share button state
  const [copied, setCopied] = useState(false);

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Sample / Demo modal state
  const [sampleModalOpen, setSampleModalOpen] = useState(false);
  const [sampleForm, setSampleForm] = useState({
    doctorName: '',
    institution: '',
    city: 'Lima',
    fiberInterest: 'OnePush 150 µm / 200 µm (Urología TFL)',
    quantityEstimated: '10 - 20 unidades mensuales',
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
    `Hola Mednova Technologies, deseo solicitar asesoría técnica y cotización de las Fibras Quirúrgicas VPG LaserOne.`;
  const waUrl = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(waText)}`;

  const handleSampleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hola Mednova Technologies, deseo solicitar una cotización formal y muestra técnica de Fibras Quirúrgicas VPG:
- Especialista: ${sampleForm.doctorName || 'No especificado'}
- Clínica / Hospital: ${sampleForm.institution || 'No especificada'}
- Ciudad: ${sampleForm.city}
- Línea de Interés: ${sampleForm.fiberInterest}
- Consumo Estimado: ${sampleForm.quantityEstimated}
- Teléfono de contacto: ${sampleForm.phone || 'No especificado'}`;
    const url = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    setSampleModalOpen(false);
  };

  // Optical Diameters Data Matrix
  const diameterMatrix = [
    {
      core: '150 µm',
      outer: '315 ± 105 µm',
      connector: 'OnePush™ / SMA-905',
      uses: 'Desechable & Reutilizable (20x)',
      scope: 'Ureteroscopio flexible digital (canal 3.6 Fr / 1.2 mm)',
      bendRadius: '10 mm (Deflexión >275°)',
      bestFor: 'Cálculos en cáliz inferior difícil & micropunción (Microperc)',
      highlight: 'Máxima deflexión en flexible sin restricción de irrigación',
      color: '#009EBC',
    },
    {
      core: '200 µm',
      outer: '400 ± 90 µm',
      connector: 'OnePush™ / SMA-905',
      uses: 'Desechable & Reutilizable (20x)',
      scope: 'Ureteroscopio flexible y semirrígido',
      bendRadius: '15 mm (Deflexión >260°)',
      bestFor: 'Litotricia RIRS estándar, Dusting fino y fragmentación calicial',
      highlight: 'Equilibrio perfecto entre entrega energética y maniobrabilidad',
      color: '#001041',
    },
    {
      core: '365 µm',
      outer: '600 ± 150 µm',
      connector: 'OnePush™ / SMA-905 / Radial R365',
      uses: 'Desechable & Reutilizable (20x) / Radial monouso',
      scope: 'Ureteroscopio semirrígido 6-8 Fr, Nefroscopio, Catéter 16G (EVLT)',
      bendRadius: '25 mm',
      bestFor: 'Litotricia ureteral, litiasis de alta dureza y EVLT venoso',
      highlight: 'Alto impacto de ablación con excelente durabilidad mecánica',
      color: '#25b895',
    },
    {
      core: '550 µm',
      outer: '800 ± 150 µm',
      connector: 'OnePush™ / SMA-905 / Radial R550 / Cónica',
      uses: 'Desechable & Reutilizable (20x) / Proctología / EVLT',
      scope: 'Cistoscopio, Resectoscopio, Pieza de mano cónica, Catéter 14G',
      bendRadius: '40 mm',
      bestFor: 'Enucleación prostática (ThuFLEP/HoLEP), hemorroides y safena mayor',
      highlight: 'Máxima eficiencia de corte y coagulación en tejidos blandos',
      color: '#e65100',
    },
    {
      core: '940 µm',
      outer: '1500 ± 300 µm',
      connector: 'OnePush™ / SMA-905',
      uses: 'Desechable & Reutilizable (20x)',
      scope: 'Nefroscopio rígido, Cistoscopio rígido de gran calibre',
      bendRadius: '70 mm',
      bestFor: 'Litotricia vesical masiva y vaporización prostática de alto caudal',
      highlight: 'Máxima tasa de ablación volumétrica para litiasis gigante',
      color: '#7b1fa2',
    },
  ];

  // FAQs
  const faqs = [
    {
      q: '¿Cómo se esterilizan las fibras quirúrgicas reutilizables en autoclave?',
      a: 'Las fibras VPG en formato reutilizable están certificadas para hasta 20 ciclos de esterilización por calor húmedo en autoclave a 134 °C (273 °F) durante 5 minutos, o 121 °C durante 20 minutos. Cada fibra incluye una tarjeta de trazabilidad para registrar individualmente cada ciclo de reprocesamiento hospitalario.',
    },
    {
      q: '¿Son compatibles las fibras con equipos láser de otras marcas?',
      a: 'Sí. VPG LaserOne ofrece dos estándares de conexión: el conector OnePush™ patentado para la familia Urolase (Urolase+, Urolase+ Premium y Urolase MAX), y el conector universal SMA-905 de alta precisión, compatible con plataformas Holmium:YAG y Tulio de Lumenis, Quanta System, Dornier MedTech, Biolitec, JenaSurgical y fabricantes con puerto SMA-905 estándar.',
    },
    {
      q: '¿Qué ventaja clínica ofrece el calibre de 150 µm frente a una fibra de 200 o 272 µm?',
      a: 'La microfibra de 150 µm ofrece un diámetro externo total de solo 315 µm, permitiendo la deflexión activa completa (>275°) del ureteroscopio flexible digital en cálices renales inferiores de ángulo agudo. Además, ocupa menos del 10% de la luz del canal de trabajo de 3.6 Fr, permitiendo un flujo de irrigación salina significativamente mayor para mantener una visión quirúrgica cristalina y baja temperatura intrarrenal.',
    },
    {
      q: '¿Cómo protege el obturador antipolvo del conector OnePush™ la óptica del láser?',
      a: 'El conector OnePush™ cuenta con un mecanismo mecánico retráctil sellado que permanece cerrado cuando la fibra no está conectada. Al insertarse en el puerto láser, el obturador se abre de manera automática y perfectamente alineada, impidiendo que el polvo, pelusas o humedad ambiental entren al receptáculo óptico de la consola.',
    },
    {
      q: '¿Qué diferencia a las fibras radiales 360° en flebología (EVLT)?',
      a: 'A diferencia de las fibras de punta plana desnuda que emiten energía frontal con riesgo de perforar la pared de la vena safena, la punta radial VPG distribuye la energía en un anillo circunferencial continuo de 360°. Esto logra un sellado endotelial homogéneo a menor temperatura pico, reduciendo el dolor, la equimosis y el riesgo de recanalización venosa.',
    },
  ];

  return (
    <div className="w-full bg-[#f4f5f6] text-[#001041]">
      {/* ─────────────────────────────────────────────────────────────
          1. TOP NAVIGATION & STATUS BAR
         ───────────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-dashed border-[#D2D3D5] pb-4">
          <Link
            href="/consumibles"
            className="inline-flex items-center gap-2 text-xs font-mono-tech uppercase text-[#001041] hover:text-[#009EBC] transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Volver a Catálogo de Consumibles</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#25b895]/10 text-[#25b895] text-[10px] font-mono-tech uppercase tracking-wider font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#25b895] animate-pulse" />
              DISPOSITIVO MÉDICO CE • ISO 13485
            </span>
            <span className="text-[11px] font-mono-tech text-[#334155] uppercase hidden sm:inline">
              CONSUMIBLES / {product.model}
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
                  <Share2 className="w-3 h-3 text-[#334155]" />
                  <span>Compartir</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. CINEMATIC VIDEO HERO (Logitech G Style Full-Width)
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
              <span>VPG LASERONE • FIBRAS QUIRÚRGICAS DE ALTA PRECISIÓN (150 - 940 µM)</span>
            </div>

            {/* Headline */}
            <h1 className="font-heading font-light uppercase text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[0.98]">
              FIBRAS QUIRÚRGICAS VPG
              <span className="block text-xl sm:text-2xl lg:text-3xl text-[#009EBC] font-mono-tech mt-2.5 tracking-normal font-semibold normal-case sm:uppercase">
                Fibras de Cuarzo de Alta Pureza (OnePush™ &amp; SMA-905)
              </span>
            </h1>

            {/* Subheading / Value Proposition */}
            <p className="text-sm sm:text-base lg:text-lg font-mono-tech text-[#009EBC] uppercase font-semibold tracking-wide">
              Máxima Deflexión en Flexible. Mínimo Daño Térmico. Conexión OnePush™ Instantánea.
            </p>

            {/* Narrative Lead */}
            <p className="text-xs sm:text-sm text-[#D2D3D5] leading-relaxed font-mono-tech max-w-2xl">
              Diseñadas por VPG LaserOne (IPG Photonics): microfibras de 150 µm para RIRS y cálices inferiores, serie HP para litotricia de alta potencia, fibras radiales 360° para EVLT y fibras cónicas para proctología. Formatos monouso y reutilizables hasta 20 ciclos de autoclave.
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
                onClick={() => setSampleModalOpen(true)}
                className="py-3.5 px-6 rounded-sm bg-white/10 hover:bg-white text-white hover:text-[#001041] border border-dashed border-white/30 font-mono-tech text-xs uppercase tracking-widest font-semibold transition-all flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#009EBC]" />
                <span>Solicitar Muestra / Prueba Quirúrgica</span>
              </button>

              <a
                href="#exploracion-tecnica"
                className="py-3.5 px-5 rounded-sm bg-black/40 hover:bg-black/70 text-[#D2D3D5] hover:text-white border border-dashed border-white/20 font-mono-tech text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5"
              >
                <span>Ver Calibres &amp; Ficha</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </div>

        {/* Bottom Floating Control Bar */}
        <div className="absolute bottom-4 right-4 sm:right-8 z-20 flex items-center gap-2 pointer-events-auto">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isVideoPlaying ? 'Pausar video' : 'Reproducir video'}
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
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. HARDWARE SHOWCASE & EXPLORATION HUB
         ───────────────────────────────────────────────────────────── */}
      <section id="exploracion-tecnica" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Interactive Media Stage & Direct Downloads */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Media Selector Tabs */}
            <div className="flex flex-wrap items-center gap-2 pb-1">
              <button
                onClick={() => setActiveMediaTab('video-onepush')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono-tech uppercase tracking-wider transition-all cursor-pointer ${
                  activeMediaTab === 'video-onepush'
                    ? 'bg-[#009EBC] text-white font-semibold shadow-sm'
                    : 'bg-white text-[#334155] border border-dashed border-[#D2D3D5] hover:text-[#009EBC]'
                }`}
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Video: OnePush™ Clic</span>
              </button>

              <button
                onClick={() => {
                  setActiveMediaTab('hero');
                  setSelectedImage('/images/products/fibras-quirurgicas-vpg/vpg_fibers_hero.webp');
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-mono-tech uppercase tracking-wider transition-all cursor-pointer ${
                  activeMediaTab === 'hero'
                    ? 'bg-[#001041] text-white font-semibold shadow-sm'
                    : 'bg-white text-[#334155] border border-dashed border-[#D2D3D5] hover:text-[#001041]'
                }`}
              >
                Familia de Fibras
              </button>

              <button
                onClick={() => {
                  setActiveMediaTab('onepush');
                  setSelectedImage('/images/products/fibras-quirurgicas-vpg/onepush_fiber.webp');
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-mono-tech uppercase tracking-wider transition-all cursor-pointer ${
                  activeMediaTab === 'onepush'
                    ? 'bg-[#001041] text-white font-semibold shadow-sm'
                    : 'bg-white text-[#334155] border border-dashed border-[#D2D3D5] hover:text-[#001041]'
                }`}
              >
                Fibra OnePush
              </button>

              <button
                onClick={() => {
                  setActiveMediaTab('hp');
                  setSelectedImage('/images/products/fibras-quirurgicas-vpg/hp_fiber.webp');
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-mono-tech uppercase tracking-wider transition-all cursor-pointer ${
                  activeMediaTab === 'hp'
                    ? 'bg-[#001041] text-white font-semibold shadow-sm'
                    : 'bg-white text-[#334155] border border-dashed border-[#D2D3D5] hover:text-[#001041]'
                }`}
              >
                Fibra HP
              </button>

              <button
                onClick={() => {
                  setActiveMediaTab('radial');
                  setSelectedImage('/images/products/fibras-quirurgicas-vpg/radial_fiber.webp');
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-mono-tech uppercase tracking-wider transition-all cursor-pointer ${
                  activeMediaTab === 'radial'
                    ? 'bg-[#001041] text-white font-semibold shadow-sm'
                    : 'bg-white text-[#334155] border border-dashed border-[#D2D3D5] hover:text-[#001041]'
                }`}
              >
                Radial 360°
              </button>

              <button
                onClick={() => {
                  setActiveMediaTab('conical');
                  setSelectedImage('/images/products/fibras-quirurgicas-vpg/conical_fiber.webp');
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-mono-tech uppercase tracking-wider transition-all cursor-pointer ${
                  activeMediaTab === 'conical'
                    ? 'bg-[#001041] text-white font-semibold shadow-sm'
                    : 'bg-white text-[#334155] border border-dashed border-[#D2D3D5] hover:text-[#001041]'
                }`}
              >
                Cónica &amp; Mango
              </button>
            </div>

            {/* Main Stage Viewport */}
            <div className="border border-dashed border-[#D2D3D5] bg-white p-4 sm:p-6 rounded-sm relative overflow-hidden group shadow-sm">
              <div className="relative aspect-4/3 w-full bg-[#f8f9fa] rounded-xs overflow-hidden flex items-center justify-center">
                {activeMediaTab === 'video-onepush' ? (
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
                    alt={`Fibra quirúrgica VPG LaserOne (${product.name}) de alta precisión`}
                    className="w-full h-full object-contain p-2 transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                )}
              </div>

              {/* Technical calibration badge strip */}
              <div className="mt-4 pt-3 border-t border-dashed border-[#D2D3D5] flex flex-wrap items-center justify-between text-[11px] font-mono-tech text-[#334155] gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#25b895] animate-pulse" />
                  <span className="text-[#001041] font-semibold">CUARZO / CUARZO NA 0.22 • TEST 100% INDIVIDUAL</span>
                </div>
                <span>REF: VPG SURGICAL FIBERS • 3 METROS</span>
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {[
                { src: '/images/products/fibras-quirurgicas-vpg/vpg_fibers_hero.webp', tab: 'hero' as const, label: 'Familia' },
                { src: '/images/products/fibras-quirurgicas-vpg/onepush_fiber.webp', tab: 'onepush' as const, label: 'OnePush' },
                { src: '/images/products/fibras-quirurgicas-vpg/hp_fiber.webp', tab: 'hp' as const, label: 'HP Roja' },
                { src: '/images/products/fibras-quirurgicas-vpg/radial_fiber.webp', tab: 'radial' as const, label: 'Radial' },
                { src: '/images/products/fibras-quirurgicas-vpg/conical_fiber.webp', tab: 'conical' as const, label: 'Cónica' },
              ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedImage(item.src);
                    setActiveMediaTab(item.tab);
                  }}
                  className={`relative w-20 h-20 shrink-0 border rounded-xs overflow-hidden transition-all cursor-pointer bg-white ${
                    selectedImage === item.src && activeMediaTab !== 'video-onepush'
                      ? 'border-[#001041] ring-2 ring-[#001041]/20 scale-102'
                      : 'border-dashed border-[#D2D3D5] opacity-75 hover:opacity-100'
                  }`}
                >
                  <img
                    src={item.src}
                    alt={item.label}
                    className="w-full h-full object-contain p-1"
                  />
                </button>
              ))}
            </div>

            {/* Key Features Quick List */}
            {product.features && product.features.length > 0 && (
              <div className="border border-dashed border-[#D2D3D5] bg-white p-5 rounded-sm space-y-3 shadow-sm">
                <div className="flex items-center justify-between pb-2 border-b border-dashed border-[#D2D3D5]">
                  <h3 className="text-xs font-mono-tech font-bold uppercase tracking-wider text-[#001041]">
                    Ventajas Ópticas &amp; Quirúrgicas
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
                  CUARZO DE ALTA PUREZA • NA 0.22
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

              <div className="flex flex-wrap items-center gap-4 text-xs font-mono-tech text-[#334155] pt-1 border-b border-dashed border-[#D2D3D5] pb-3">
                <span>SERIE: <strong className="text-[#001041]">{product.model}</strong></span>
                <span>•</span>
                <span>FABRICANTE: <strong className="text-[#001041]">{product.brand} (IPG Photonics)</strong></span>
              </div>

              <p className="text-xs sm:text-sm text-[#494f52] leading-relaxed pt-1 font-mono-tech">
                {product.full_description || product.short_description}
              </p>
            </div>

            {/* Key Metrics Strip (5 Cards) */}
            {product.key_metrics && product.key_metrics.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
                {product.key_metrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-white border border-dashed border-[#D2D3D5] rounded-sm space-y-0.5 hover:border-[#009EBC] transition-colors shadow-2xs"
                  >
                    <span className="text-[10px] font-mono-tech text-[#334155] uppercase block truncate">
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
                      <span className="text-[10px] text-[#334155] block leading-tight font-mono-tech">
                        {metric.helper}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Primary Action Buttons */}
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

              <button
                type="button"
                onClick={() => setSampleModalOpen(true)}
                className="w-full py-3.5 px-6 rounded-sm bg-white hover:bg-[#f8f9fa] text-[#001041] border border-dashed border-[#001041] font-mono-tech text-xs uppercase tracking-widest font-bold transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-xs"
              >
                <Calendar className="w-4 h-4 text-[#009EBC]" />
                <span>Solicitar Muestra Hospitalaria o Prueba Quirúrgica</span>
              </button>
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
                      Descargar Dossier Oficial de Fibras Quirúrgicas (PDF)
                    </p>
                    <p className="text-[10px] text-[#D2D3D5]">
                      Parámetros completos VPG LaserOne, compatibilidades y calibres ópticos
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
              </a>
            )}

            {/* Quality & Hospital Assurance */}
            <div className="border border-dashed border-[#D2D3D5] bg-white p-4 rounded-sm flex items-start gap-3.5 shadow-2xs">
              <div className="w-9 h-9 rounded-sm bg-[#001041]/5 text-[#009EBC] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="text-xs font-mono-tech space-y-0.5">
                <p className="font-bold uppercase text-[#001041] tracking-wider text-[11px]">
                  Dispositivo Médico Homologado &amp; Soporte Mednova
                </p>
                <p className="text-[#494f52] leading-relaxed text-[11px]">
                  Todas las fibras cuentan con certificación CE, control de concentricidad individual, empaque estéril con doble barrera y stock permanente para reposición inmediata en clínicas y hospitales de Perú.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. INTERACTIVE TECHNOLOGY EXPLAINER: 5 PILLARS
             (Logitech G: "HITS, Explained" Tabbed Interactive Deep Dive)
         ───────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#001041] text-white relative overflow-hidden font-mono-tech">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#009EBC]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#25b895]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
          
          {/* Header */}
          <div className="max-w-3xl space-y-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-dashed border-[#D2D3D5]/30 text-[#009EBC] text-xs font-mono-tech tracking-widest uppercase font-bold">
              INGENIERÍA ÓPTICA DE PRECISIÓN VPG
            </span>
            <h2 className="font-heading font-light uppercase text-3xl sm:text-5xl text-white tracking-tight leading-tight">
              Familias &amp; Tecnologías de Fibra, Explicadas
            </h2>
            <p className="text-xs sm:text-sm text-[#D2D3D5] leading-relaxed">
              Explore los pilares tecnológicos desarrollados por VPG LaserOne que garantizan transmisión sin pérdidas térmicas, acoplamiento libre de polvo y máxima adaptabilidad quirúrgica.
            </p>
          </div>

          {/* Interactive Pillar Tabs Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 border-b border-dashed border-white/20 pb-4">
            <button
              onClick={() => setActivePillarTab('onepush-tech')}
              className={`p-3.5 rounded-sm border text-left transition-all cursor-pointer ${
                activePillarTab === 'onepush-tech'
                  ? 'bg-[#009EBC] text-white border-[#009EBC] shadow-md font-bold'
                  : 'bg-white/5 text-[#D2D3D5] border-white/10 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] uppercase tracking-wider mb-1 opacity-80">
                <span>01. ACOPLAMIENTO</span>
                <Radio className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs sm:text-sm font-heading font-bold block uppercase">
                Conector OnePush™
              </span>
            </button>

            <button
              onClick={() => setActivePillarTab('microfibra')}
              className={`p-3.5 rounded-sm border text-left transition-all cursor-pointer ${
                activePillarTab === 'microfibra'
                  ? 'bg-[#009EBC] text-white border-[#009EBC] shadow-md font-bold'
                  : 'bg-white/5 text-[#D2D3D5] border-white/10 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] uppercase tracking-wider mb-1 opacity-80">
                <span>02. RIRS FLEXIBLE</span>
                <Compass className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs sm:text-sm font-heading font-bold block uppercase">
                Microfibra 150 µm
              </span>
            </button>

            <button
              onClick={() => setActivePillarTab('radial-360')}
              className={`p-3.5 rounded-sm border text-left transition-all cursor-pointer ${
                activePillarTab === 'radial-360'
                  ? 'bg-[#009EBC] text-white border-[#009EBC] shadow-md font-bold'
                  : 'bg-white/5 text-[#D2D3D5] border-white/10 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] uppercase tracking-wider mb-1 opacity-80">
                <span>03. FLEBOLOGÍA</span>
                <Activity className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs sm:text-sm font-heading font-bold block uppercase">
                Punta Radial 360°
              </span>
            </button>

            <button
              onClick={() => setActivePillarTab('conica-procto')}
              className={`p-3.5 rounded-sm border text-left transition-all cursor-pointer ${
                activePillarTab === 'conica-procto'
                  ? 'bg-[#009EBC] text-white border-[#009EBC] shadow-md font-bold'
                  : 'bg-white/5 text-[#D2D3D5] border-white/10 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] uppercase tracking-wider mb-1 opacity-80">
                <span>04. PROCTOLOGÍA</span>
                <Sliders className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs sm:text-sm font-heading font-bold block uppercase">
                Punta Cónica &amp; Mango
              </span>
            </button>

            <button
              onClick={() => setActivePillarTab('hp-series')}
              className={`p-3.5 rounded-sm border text-left transition-all cursor-pointer ${
                activePillarTab === 'hp-series'
                  ? 'bg-[#009EBC] text-white border-[#009EBC] shadow-md font-bold'
                  : 'bg-white/5 text-[#D2D3D5] border-white/10 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] uppercase tracking-wider mb-1 opacity-80">
                <span>05. ALTA POTENCIA</span>
                <Zap className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs sm:text-sm font-heading font-bold block uppercase">
                VPG HP &amp; SMA-905
              </span>
            </button>
          </div>

          {/* Active Pillar Interactive Content Card */}
          <div className="p-6 sm:p-8 rounded-sm bg-white/5 border border-dashed border-white/20">
            {activePillarTab === 'onepush-tech' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#009EBC]/20 text-[#009EBC] text-xs font-bold uppercase">
                    PATENTE EXCLUSIVA VPG LASERONE
                  </div>
                  <h3 className="font-heading font-light text-2xl sm:text-3xl text-white uppercase tracking-tight">
                    Conector OnePush™ con Obturador Antipolvo Automático
                  </h3>
                  <p className="text-xs sm:text-sm text-[#D2D3D5] leading-relaxed">
                    Diseñado específicamente para los sistemas Urolase+, Urolase+ Premium y Urolase MAX. El conector OnePush™ resuelve el principal problema en quirófano: la contaminación por micropartículas en el puerto del láser óptico.
                  </p>
                  <ul className="space-y-2 text-xs text-[#D2D3D5]">
                    <li className="flex items-start gap-2">
                      <span className="text-[#009EBC] font-bold">✓</span>
                      <span><strong>Alineación instantánea en 1 clic:</strong> Acoplamiento sin roscado manual que elimina falsas inserciones y desgaste en el receptáculo.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#009EBC] font-bold">✓</span>
                      <span><strong>Obturador antipolvo hermético:</strong> Bloquea la entrada de agentes ambientales al retirar la fibra, protegiendo los lentes de enfoque internos.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#009EBC] font-bold">✓</span>
                      <span><strong>Doble presentación:</strong> Disponible en formato desechable monouso estéril y formato reutilizable (hasta 20 esterilizaciones en autoclave).</span>
                    </li>
                  </ul>
                </div>
                <div className="lg:col-span-5 border border-dashed border-white/20 rounded-sm p-4 bg-black/40 flex flex-col items-center justify-center">
                  <img
                    src="/images/products/fibras-quirurgicas-vpg/onepush_fiber.webp"
                    alt="Conector OnePush VPG"
                    className="w-full max-h-56 object-contain"
                  />
                  <span className="text-[10px] text-[#D2D3D5] mt-2 text-center uppercase tracking-wider">
                    Conector OnePush™ con código de calibre 150 µm y recubrimiento aislante
                  </span>
                </div>
              </div>
            )}

            {activePillarTab === 'microfibra' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#25b895]/20 text-[#25b895] text-xs font-bold uppercase">
                    ENDOUROLOGÍA AVANZADA (RIRS)
                  </div>
                  <h3 className="font-heading font-light text-2xl sm:text-3xl text-white uppercase tracking-tight">
                    Microfibra de 150 µm para Ureteroscopía Flexible &amp; Micropunción
                  </h3>
                  <p className="text-xs sm:text-sm text-[#D2D3D5] leading-relaxed">
                    Un hito de ingeniería óptica para endourología: núcleo de 150 µm con diámetro exterior de solo 315 µm. Permite al cirujano alcanzar el cáliz renal inferior más exigente sin perder deflexión ni flujo.
                  </p>
                  <ul className="space-y-2 text-xs text-[#D2D3D5]">
                    <li className="flex items-start gap-2">
                      <span className="text-[#25b895] font-bold">✓</span>
                      <span><strong>Deflexión intacta del endoscopio:</strong> Mantiene &gt;275° de ángulo de flexión sin resistencia mecánica ni riesgo de fractura de vaina.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#25b895] font-bold">✓</span>
                      <span><strong>Irrigación salina optimizada:</strong> Deja libre más del 90% del canal de trabajo, manteniendo visibilidad cristalina y baja presión piélica.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#25b895] font-bold">✓</span>
                      <span><strong>Punta ultra-fina para Dusting:</strong> Concentración de densidad de potencia ideal para pulverización ultrafina sin efecto de empuje (retropulsión nula).</span>
                    </li>
                  </ul>
                </div>
                <div className="lg:col-span-5 border border-dashed border-white/20 rounded-sm p-4 bg-black/40 flex flex-col items-center justify-center">
                  <img
                    src="/images/products/fibras-quirurgicas-vpg/fiber_diameters.webp"
                    alt="Comparación de diámetros de fibra VPG"
                    className="w-full max-h-56 object-contain"
                  />
                  <span className="text-[10px] text-[#D2D3D5] mt-2 text-center uppercase tracking-wider">
                    Gama de diámetros disponibles: 150, 200, 365, 550 y 940 µm
                  </span>
                </div>
              </div>
            )}

            {activePillarTab === 'radial-360' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#009EBC]/20 text-[#009EBC] text-xs font-bold uppercase">
                    FLEBOLOGÍA &amp; EVLT
                  </div>
                  <h3 className="font-heading font-light text-2xl sm:text-3xl text-white uppercase tracking-tight">
                    Fibras Radiales 360° para Ablación Endovenosa Homogénea
                  </h3>
                  <p className="text-xs sm:text-sm text-[#D2D3D5] leading-relaxed">
                    Diseñada primordialmente para el tratamiento endovenoso con láser (EVLT). Emite un haz cilíndrico uniforme de 360° directamente contra la pared venosa endotelial.
                  </p>
                  <ul className="space-y-2 text-xs text-[#D2D3D5]">
                    <li className="flex items-start gap-2">
                      <span className="text-[#009EBC] font-bold">✓</span>
                      <span><strong>Elimina el riesgo de perforación parietal:</strong> Distribuye la energía térmicamente sin puntos calientes frontales que causen hematomas severos.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#009EBC] font-bold">✓</span>
                      <span><strong>Modelo R365 (Catéter 16G):</strong> Núcleo 365 µm, cápsula de 1.2 mm para safena menor y venas perforantes.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#009EBC] font-bold">✓</span>
                      <span><strong>Modelo R550 (Catéter 14G):</strong> Núcleo 550 µm, cápsula de 1.4 mm para vena safena mayor troncular de alto calibre.</span>
                    </li>
                  </ul>
                </div>
                <div className="lg:col-span-5 border border-dashed border-white/20 rounded-sm p-4 bg-black/40 flex flex-col items-center justify-center">
                  <img
                    src="/images/products/fibras-quirurgicas-vpg/radial_catheter_diagram.webp"
                    alt="Diagrama de catéter para fibra radial VPG"
                    className="w-full max-h-56 object-contain"
                  />
                  <span className="text-[10px] text-[#D2D3D5] mt-2 text-center uppercase tracking-wider">
                    Compatibilidad estricta con introductores 16G (R365) y 14G (R550)
                  </span>
                </div>
              </div>
            )}

            {activePillarTab === 'conica-procto' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#e65100]/30 text-[#ff9800] text-xs font-bold uppercase">
                    PROCTOLOGÍA DE ALTA PRECISIÓN
                  </div>
                  <h3 className="font-heading font-light text-2xl sm:text-3xl text-white uppercase tracking-tight">
                    Fibras Cónicas &amp; Mango con Bloqueo para Hemorroides (Grados I–III)
                  </h3>
                  <p className="text-xs sm:text-sm text-[#D2D3D5] leading-relaxed">
                    Método mínimamente invasivo ambulatorio para desarterialización y fotocoagulación subdérmica de paquetes hemorroidales sin dolor ni resección quirúrgica dolorosa.
                  </p>
                  <ul className="space-y-2 text-xs text-[#D2D3D5]">
                    <li className="flex items-start gap-2">
                      <span className="text-[#ff9800] font-bold">✓</span>
                      <span><strong>Geometría cónica de penetración atraumática:</strong> Facilita una punción suave y controlada en el centro del nódulo hemorroidal.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#ff9800] font-bold">✓</span>
                      <span><strong>Mecanismo de fijación y bloqueo de fibra:</strong> Mango metálico quirúrgico que inmoviliza la posición exacta de la fibra durante el disparo.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#ff9800] font-bold">✓</span>
                      <span><strong>Protección del esfínter anal:</strong> Entrega láser confinada al tejido subdérmico vascular respetando la mucosa anal y continencia.</span>
                    </li>
                  </ul>
                </div>
                <div className="lg:col-span-5 border border-dashed border-white/20 rounded-sm p-4 bg-black/40 flex flex-col items-center justify-center">
                  <img
                    src="/images/products/fibras-quirurgicas-vpg/conical_handpiece.webp"
                    alt="Pieza de mano con mecanismo de bloqueo para fibra cónica"
                    className="w-full max-h-56 object-contain"
                  />
                  <span className="text-[10px] text-[#D2D3D5] mt-2 text-center uppercase tracking-wider">
                    Pieza de mano ergonómica con perilla de ajuste micrométrico
                  </span>
                </div>
              </div>
            )}

            {activePillarTab === 'hp-series' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#009EBC]/20 text-[#009EBC] text-xs font-bold uppercase">
                    ALTA POTENCIA &amp; SMA-905 UNIVERSAL
                  </div>
                  <h3 className="font-heading font-light text-2xl sm:text-3xl text-white uppercase tracking-tight">
                    Serie VPG HP: Resistencia Extrema a Picos de Potencia
                  </h3>
                  <p className="text-xs sm:text-sm text-[#D2D3D5] leading-relaxed">
                    Específicamente desarrollada para generadores de alta potencia como FiberLase S / SP / SP+ y consolas de terceros que operan con conectores universales SMA-905.
                  </p>
                  <ul className="space-y-2 text-xs text-[#D2D3D5]">
                    <li className="flex items-start gap-2">
                      <span className="text-[#009EBC] font-bold">✓</span>
                      <span><strong>Estructura Cuarzo / Cuarzo de máxima pureza:</strong> Revestimiento dopado con flúor de alta resistencia que soporta densidades de flujo extremas.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#009EBC] font-bold">✓</span>
                      <span><strong>Apertura numérica calibrada NA 0.22:</strong> Divergencia óptica estrictamente controlada para máxima entrega de energía en el cálculo.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#009EBC] font-bold">✓</span>
                      <span><strong>Compatibilidad hospitalaria universal:</strong> Conector SMA-905 de latón niquelado con pulido óptico interferométrico.</span>
                    </li>
                  </ul>
                </div>
                <div className="lg:col-span-5 border border-dashed border-white/20 rounded-sm p-4 bg-black/40 flex flex-col items-center justify-center">
                  <img
                    src="/images/products/fibras-quirurgicas-vpg/hp_fiber.webp"
                    alt="Fibra VPG HP de alta potencia"
                    className="w-full max-h-56 object-contain"
                  />
                  <span className="text-[10px] text-[#D2D3D5] mt-2 text-center uppercase tracking-wider">
                    VPG Surgical Fiber HP con mango protector rojo anodizado
                  </span>
                </div>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. INTERACTIVE OPTICAL DIAMETERS MATRIX / EXPLORER
         ───────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-8">
          <div className="max-w-3xl space-y-2">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-dashed border-[#D2D3D5] text-[#001041] bg-[#001041]/5 text-xs font-mono-tech tracking-widest uppercase">
              MATRIZ DE CALIBRES ÓPTICOS
            </span>
            <h2 className="font-heading font-light uppercase text-3xl sm:text-4xl text-[#001041] tracking-tight">
              Selector Interactivo de Diámetros &amp; Aplicaciones
            </h2>
            <p className="text-xs sm:text-sm text-[#494f52] leading-relaxed font-mono-tech">
              Seleccione un calibre de núcleo para evaluar el diámetro externo, radio de flexión mínimo, compatibilidad con endoscopios y procedimientos recomendados.
            </p>
          </div>

          {/* Caliber Chips */}
          <div className="flex flex-wrap items-center gap-2.5">
            {diameterMatrix.map((item, idx) => {
              const isSelected = selectedDiameterIndex === idx;
              return (
                <button
                  key={item.core}
                  onClick={() => setSelectedDiameterIndex(idx)}
                  className={`px-4 py-3 rounded-sm border font-mono-tech text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2.5 ${
                    isSelected
                      ? 'bg-[#001041] text-white border-[#001041] shadow-md font-bold'
                      : 'bg-white text-[#494f52] border-dashed border-[#D2D3D5] hover:border-[#001041]'
                  }`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span>Núcleo {item.core}</span>
                  {idx === 0 && (
                    <span className="px-1.5 py-0.2 rounded-xs bg-[#25b895]/20 text-[#25b895] text-[9px] font-bold">
                      MICRO
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Selected Caliber Details Card */}
          {(() => {
            const current = diameterMatrix[selectedDiameterIndex];
            return (
              <div className="border border-dashed border-[#D2D3D5] bg-white p-6 sm:p-8 rounded-sm shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-dashed border-[#D2D3D5] gap-4">
                  <div>
                    <span className="text-[11px] font-mono-tech uppercase font-bold text-[#009EBC]">
                      CALIBRE SELECCIONADO
                    </span>
                    <h3 className="font-heading font-light text-2xl sm:text-3xl text-[#001041] uppercase mt-0.5">
                      Fibra Quirúrgica con Núcleo de {current.core}
                    </h3>
                  </div>
                  <span className="px-3 py-1.5 rounded-full bg-[#f4f5f6] border border-[#e5e7eb] text-xs font-mono-tech font-bold text-[#001041]">
                    {current.highlight}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 rounded-xs bg-[#f8f9fa] border border-[#e5e7eb] space-y-1">
                    <span className="text-[10px] font-mono-tech uppercase text-[#334155] block">
                      Diámetro Externo Total
                    </span>
                    <p className="font-heading font-bold text-lg text-[#001041]">
                      {current.outer}
                    </p>
                    <span className="text-[10px] text-[#334155] font-mono-tech block">
                      Vaina polimérica biocompatible
                    </span>
                  </div>

                  <div className="p-4 rounded-xs bg-[#f8f9fa] border border-[#e5e7eb] space-y-1">
                    <span className="text-[10px] font-mono-tech uppercase text-[#334155] block">
                      Radio de Curvatura Mínimo
                    </span>
                    <p className="font-heading font-bold text-lg text-[#009EBC]">
                      {current.bendRadius}
                    </p>
                    <span className="text-[10px] text-[#334155] font-mono-tech block">
                      Flexión sin riesgo de fuga lumínica
                    </span>
                  </div>

                  <div className="p-4 rounded-xs bg-[#f8f9fa] border border-[#e5e7eb] space-y-1">
                    <span className="text-[10px] font-mono-tech uppercase text-[#334155] block">
                      Conectores Disponibles
                    </span>
                    <p className="font-heading font-bold text-base text-[#001041]">
                      {current.connector}
                    </p>
                    <span className="text-[10px] text-[#334155] font-mono-tech block">
                      OnePush clic y SMA-905 universal
                    </span>
                  </div>

                  <div className="p-4 rounded-xs bg-[#f8f9fa] border border-[#e5e7eb] space-y-1">
                    <span className="text-[10px] font-mono-tech uppercase text-[#334155] block">
                      Modalidad de Uso
                    </span>
                    <p className="font-heading font-bold text-base text-[#25b895]">
                      {current.uses}
                    </p>
                    <span className="text-[10px] text-[#334155] font-mono-tech block">
                      Validado para autoclave hospitalario
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-dashed border-[#D2D3D5]/60">
                  <div className="space-y-1 text-xs font-mono-tech">
                    <span className="text-[#334155] uppercase font-bold text-[10px] block">
                      Compatibilidad con Instrumental Quirúrgico:
                    </span>
                    <p className="text-[#001041] font-semibold">
                      {current.scope}
                    </p>
                  </div>
                  <div className="space-y-1 text-xs font-mono-tech">
                    <span className="text-[#334155] uppercase font-bold text-[10px] block">
                      Indicación Clínica de Máxima Eficiencia:
                    </span>
                    <p className="text-[#009EBC] font-semibold">
                      {current.bestFor}
                    </p>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. CLINICAL APPLICATIONS & FIBER LINES
         ───────────────────────────────────────────────────────────── */}
      <section className="bg-white border-y border-dashed border-[#D2D3D5] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="max-w-3xl space-y-2">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-dashed border-[#D2D3D5] text-[#001041] bg-[#001041]/5 text-xs font-mono-tech tracking-widest uppercase">
              COBERTURA MULTIESPECIALIDAD
            </span>
            <h2 className="font-heading font-light uppercase text-3xl sm:text-4xl text-[#001041] tracking-tight">
              Especialidades Clínicas &amp; Protocolos Quirúrgicos
            </h2>
            <p className="text-xs sm:text-sm text-[#494f52] leading-relaxed font-mono-tech">
              Soluciones ópticas validadas para urología de máxima energía, ablación venosa mínimamente invasiva, proctología y microcirugía multidisciplinaria.
            </p>
          </div>

          {/* Clinical Navigation Tabs */}
          {product.clinical_applications && product.clinical_applications.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-b border-dashed border-[#D2D3D5]">
                {product.clinical_applications.map((app, idx) => {
                  const isActive = activeClinicalTab === idx;
                  return (
                    <button
                      key={app.id}
                      onClick={() => setActiveClinicalTab(idx)}
                      className={`px-4 py-2.5 font-mono-tech text-xs uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap border-b-2 ${
                        isActive
                          ? 'border-[#009EBC] text-[#001041] font-bold bg-[#f4f5f6]'
                          : 'border-transparent text-[#334155] hover:text-[#001041]'
                      }`}
                    >
                      {app.title}
                    </button>
                  );
                })}
              </div>

              {/* Active Clinical Application Panel */}
              {(() => {
                const activeApp = product.clinical_applications[activeClinicalTab];
                if (!activeApp) return null;
                return (
                  <div className="border border-dashed border-[#D2D3D5] bg-[#f8f9fa] p-6 sm:p-8 rounded-sm space-y-6">
                    <div>
                      <span className="text-[11px] font-mono-tech uppercase font-bold text-[#009EBC]">
                        {activeApp.subtitle}
                      </span>
                      <h3 className="font-heading font-light text-2xl sm:text-3xl text-[#001041] uppercase mt-1">
                        {activeApp.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#494f52] font-mono-tech leading-relaxed mt-2 max-w-4xl">
                        {activeApp.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                      {activeApp.modes.map((mode, mIdx) => (
                        <div
                          key={mIdx}
                          className="bg-white border border-dashed border-[#D2D3D5] p-5 rounded-xs space-y-2 hover:border-[#009EBC] transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono-tech font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs bg-[#001041]/5 text-[#001041]">
                              MODO {mIdx + 1}
                            </span>
                            {mode.badge && (
                              <span className="text-[10px] font-mono-tech font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs bg-[#009EBC]/10 text-[#009EBC]">
                                {mode.badge}
                              </span>
                            )}
                          </div>
                          <h4 className="font-mono-tech font-bold text-sm text-[#001041] uppercase">
                            {mode.title}
                          </h4>
                          <p className="text-xs text-[#494f52] font-mono-tech leading-relaxed">
                            {mode.description}
                          </p>
                        </div>
                      ))}
                    </div>

                    {activeApp.scientific_note && (
                      <div className="p-3.5 bg-white border border-dashed border-[#D2D3D5] rounded-xs text-[11px] font-mono-tech text-[#334155]">
                        <strong className="text-[#001041]">Nota de compatibilidad:</strong> {activeApp.scientific_note}
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          )}

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. FULL TECHNICAL SPECIFICATIONS MATRIX TABLE
         ───────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-6">
          <div className="max-w-3xl space-y-2">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-dashed border-[#D2D3D5] text-[#001041] bg-[#001041]/5 text-xs font-mono-tech tracking-widest uppercase">
              FICHA TÉCNICA OFICIAL VPG
            </span>
            <h2 className="font-heading font-light uppercase text-3xl sm:text-4xl text-[#001041] tracking-tight">
              Tabla Comparativa de Fibras Quirúrgicas
            </h2>
            <p className="text-xs sm:text-sm text-[#494f52] leading-relaxed font-mono-tech">
              Especificaciones dimensionales, conectores ópticos y recomendaciones quirúrgicas extraídas del catálogo oficial de VPG LaserOne.
            </p>
          </div>

          <div className="border border-dashed border-[#D2D3D5] bg-white rounded-sm overflow-x-auto shadow-sm">
            <table className="w-full text-left border-collapse text-xs font-mono-tech">
              <thead>
                <tr className="bg-[#001041] text-white">
                  <th className="p-3.5 border-b border-[#001041] font-bold uppercase tracking-wider">Línea de Fibra</th>
                  <th className="p-3.5 border-b border-[#001041] font-bold uppercase tracking-wider">Diámetro Núcleo (µm)</th>
                  <th className="p-3.5 border-b border-[#001041] font-bold uppercase tracking-wider">Diámetro Exterior (µm)</th>
                  <th className="p-3.5 border-b border-[#001041] font-bold uppercase tracking-wider">Punta / Cápsula</th>
                  <th className="p-3.5 border-b border-[#001041] font-bold uppercase tracking-wider">Conector</th>
                  <th className="p-3.5 border-b border-[#001041] font-bold uppercase tracking-wider">Formato / Usos</th>
                  <th className="p-3.5 border-b border-[#001041] font-bold uppercase tracking-wider">Especialidad Principal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D2D3D5]/60 text-[#494f52]">
                <tr className="hover:bg-[#f8f9fa]">
                  <td className="p-3.5 font-bold text-[#001041]">OnePush Bare Fiber</td>
                  <td className="p-3.5 font-bold text-[#009EBC]">150, 200, 365, 550, 940</td>
                  <td className="p-3.5">315 ± 105 a 1500 ± 300</td>
                  <td className="p-3.5">Punta desnuda plana</td>
                  <td className="p-3.5 font-semibold text-[#001041]">OnePush™ (Urolase)</td>
                  <td className="p-3.5 text-[#25b895] font-semibold">Monouso o Autoclave (20x)</td>
                  <td className="p-3.5">Litotricia TFL &amp; Enucleación</td>
                </tr>
                <tr className="hover:bg-[#f8f9fa]">
                  <td className="p-3.5 font-bold text-[#001041]">VPG HP Bare Fiber</td>
                  <td className="p-3.5 font-bold text-[#009EBC]">150, 200, 365, 550, 940</td>
                  <td className="p-3.5">315 ± 105 a 1500 ± 300</td>
                  <td className="p-3.5">Punta desnuda plana</td>
                  <td className="p-3.5 font-semibold text-[#001041]">SMA-905 Universal</td>
                  <td className="p-3.5 text-[#25b895] font-semibold">Monouso o Reutilizable</td>
                  <td className="p-3.5">FiberLase &amp; Alta Potencia</td>
                </tr>
                <tr className="hover:bg-[#f8f9fa]">
                  <td className="p-3.5 font-bold text-[#001041]">VPG LP Bare Fiber</td>
                  <td className="p-3.5 font-bold text-[#009EBC]">200, 365, 550, 940</td>
                  <td className="p-3.5">500, 650, 800, 1650</td>
                  <td className="p-3.5">Punta desnuda plana</td>
                  <td className="p-3.5 font-semibold text-[#001041]">SMA-905 Universal</td>
                  <td className="p-3.5">Monouso estéril</td>
                  <td className="p-3.5">ORL, Ginecología, Cirugía General</td>
                </tr>
                <tr className="hover:bg-[#f8f9fa]">
                  <td className="p-3.5 font-bold text-[#001041]">VPG LP Radial R365</td>
                  <td className="p-3.5 font-bold text-[#009EBC]">365</td>
                  <td className="p-3.5">650 µm (Frasco 1.2 mm)</td>
                  <td className="p-3.5 font-semibold text-[#25b895]">Emisión Radial 360°</td>
                  <td className="p-3.5 font-semibold text-[#001041]">SMA-905</td>
                  <td className="p-3.5">Monouso (Catéter 16G)</td>
                  <td className="p-3.5">Flebología EVLT Safena Menor</td>
                </tr>
                <tr className="hover:bg-[#f8f9fa]">
                  <td className="p-3.5 font-bold text-[#001041]">VPG LP Radial R550</td>
                  <td className="p-3.5 font-bold text-[#009EBC]">550</td>
                  <td className="p-3.5">1200 µm (Frasco 1.4 mm)</td>
                  <td className="p-3.5 font-semibold text-[#25b895]">Emisión Radial 360°</td>
                  <td className="p-3.5 font-semibold text-[#001041]">SMA-905</td>
                  <td className="p-3.5">Monouso (Catéter 14G)</td>
                  <td className="p-3.5">Flebología EVLT Safena Mayor</td>
                </tr>
                <tr className="hover:bg-[#f8f9fa]">
                  <td className="p-3.5 font-bold text-[#001041]">VPG LP Punta Cónica</td>
                  <td className="p-3.5 font-bold text-[#009EBC]">550</td>
                  <td className="p-3.5">1200 µm (Frasco 1.4 mm)</td>
                  <td className="p-3.5 font-semibold text-[#e65100]">Geometría Cónica Puntiaguda</td>
                  <td className="p-3.5 font-semibold text-[#001041]">SMA-905</td>
                  <td className="p-3.5">Mango con mecanismo de bloqueo</td>
                  <td className="p-3.5">Proctología (Hemorroides I-III)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          8. MANUFACTURER HERITAGE & QUALITY ASSURANCE
         ───────────────────────────────────────────────────────────── */}
      <section className="bg-[#001041] text-white py-16 font-mono-tech border-t border-dashed border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-dashed border-[#D2D3D5]/30 text-[#009EBC] text-xs uppercase font-bold">
                PIONEROS EN LÁSER DE FIBRA DESDE 1991
              </span>
              <h2 className="font-heading font-light uppercase text-3xl sm:text-5xl text-white tracking-tight">
                VPG LaserOne • IPG Photonics Group
              </h2>
              <p className="text-xs sm:text-sm text-[#D2D3D5] leading-relaxed max-w-3xl">
                Fundada por el renombrado científico Valentin Pavlovich Gapontsev, pionero de la corporación mundial IPG Photonics. VPG LaserOne lidera el desarrollo de tecnologías láser médicas de ciclo completo: desde el cultivo de cristales de cuarzo hasta la fabricación y validación clínica con hospitales líderes a nivel internacional.
              </p>
            </div>

            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <div className="p-6 rounded-sm bg-white/5 border border-dashed border-white/20 text-center w-full max-w-xs space-y-2">
                <Award className="w-8 h-8 text-[#009EBC] mx-auto" />
                <span className="text-xs font-bold uppercase tracking-wider block text-white">
                  Garantía Oficial Mednova
                </span>
                <p className="text-[11px] text-[#D2D3D5]">
                  Distribuidor autorizado con stock local para clínicas de Lima y provincias.
                </p>
              </div>
            </div>
          </div>

          {/* Heritage Metrics (4 stats from PDF page 8) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-dashed border-white/20 pt-8">
            <div className="p-4 bg-white/5 rounded-xs border border-white/10 space-y-1">
              <span className="font-heading font-bold text-3xl sm:text-4xl text-[#009EBC]">1991</span>
              <p className="text-xs uppercase text-[#D2D3D5] font-semibold">Año de Fundación</p>
              <p className="text-[10px] text-white/60">Más de tres décadas de liderazgo científico</p>
            </div>

            <div className="p-4 bg-white/5 rounded-xs border border-white/10 space-y-1">
              <span className="font-heading font-bold text-3xl sm:text-4xl text-[#25b895]">&gt;1M</span>
              <p className="text-xs uppercase text-[#D2D3D5] font-semibold">Pacientes Tratados</p>
              <p className="text-[10px] text-white/60">Anualmente en centros hospitalarios globales</p>
            </div>

            <div className="p-4 bg-white/5 rounded-xs border border-white/10 space-y-1">
              <span className="font-heading font-bold text-3xl sm:text-4xl text-[#009EBC]">50+</span>
              <p className="text-xs uppercase text-[#D2D3D5] font-semibold">Patentes Médicas</p>
              <p className="text-[10px] text-white/60">Innovaciones propietarias registradas</p>
            </div>

            <div className="p-4 bg-white/5 rounded-xs border border-white/10 space-y-1">
              <span className="font-heading font-bold text-3xl sm:text-4xl text-[#25b895]">&gt;3000</span>
              <p className="text-xs uppercase text-[#D2D3D5] font-semibold">Sistemas Instalados</p>
              <p className="text-[10px] text-white/60">En quirófanos de más de 40 países</p>
            </div>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          9. FREQUENTLY ASKED QUESTIONS (FAQ ACCORDION)
         ───────────────────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-dashed border-[#D2D3D5] text-[#001041] bg-[#001041]/5 text-xs font-mono-tech tracking-widest uppercase">
              CONSULTAS FRECUENTES
            </span>
            <h2 className="font-heading font-light uppercase text-3xl sm:text-4xl text-[#001041] tracking-tight">
              Preguntas Frecuentes sobre Fibras Quirúrgicas
            </h2>
          </div>

          <div className="space-y-3 pt-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="border border-dashed border-[#D2D3D5] bg-white rounded-sm overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-mono-tech cursor-pointer hover:bg-[#f8f9fa] transition-colors"
                  >
                    <span className="text-xs sm:text-sm font-bold uppercase text-[#001041]">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#009EBC] shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 border-t border-dashed border-[#D2D3D5]/60 pt-3 text-xs font-mono-tech text-[#494f52] leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          10. RELATED EQUIPMENT: UROLASE MAX CROSS-LINK
         ───────────────────────────────────────────────────────────── */}
      {relatedEquipos && relatedEquipos.length > 0 && (
        <section className="bg-[#f0f2f4] border-t border-dashed border-[#D2D3D5] py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-[11px] font-mono-tech uppercase font-bold text-[#009EBC]">
                  PLATAFORMA COMPLEMENTARIA
                </span>
                <h2 className="font-heading font-light uppercase text-2xl sm:text-3xl text-[#001041] mt-1">
                  Equipo Quirúrgico Diseñado para Estas Fibras
                </h2>
              </div>
              <Link
                href="/equipos"
                className="text-xs font-mono-tech text-[#001041] hover:text-[#009EBC] font-bold uppercase flex items-center gap-1"
              >
                <span>Ver Todos los Equipos</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedEquipos.map((eq) => (
                <div
                  key={eq.id}
                  className="border border-dashed border-[#D2D3D5] bg-white p-5 rounded-sm flex flex-col justify-between space-y-4 hover:border-[#001041] transition-colors"
                >
                  <div className="space-y-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#001041]/5 text-[#001041] text-[10px] font-mono-tech font-bold uppercase">
                      {eq.brand} • {eq.model}
                    </span>
                    <h3 className="font-heading font-light uppercase text-xl text-[#001041]">
                      {eq.name}
                    </h3>
                    <p className="text-xs text-[#494f52] font-mono-tech line-clamp-3 leading-relaxed">
                      {eq.short_description}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-dashed border-[#D2D3D5] flex items-center justify-between">
                    <span className="text-[10px] text-[#334155] font-mono-tech uppercase">
                      Láser de Tulio TFL
                    </span>
                    <Link
                      href={`/equipos/${eq.slug}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#001041] hover:bg-[#009EBC] text-white text-xs font-mono-tech font-bold transition-colors"
                    >
                      <span>Ver Equipo</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          11. SAMPLE / DEMO MODAL
         ───────────────────────────────────────────────────────────── */}
      {sampleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs font-mono-tech animate-fadeIn">
          <div className="bg-white border border-[#D2D3D5] rounded-sm max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setSampleModalOpen(false)}
              className="absolute top-4 right-4 text-[#334155] hover:text-[#001041] p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-[10px] font-mono-tech font-bold uppercase text-[#009EBC] tracking-wider">
                COORDINACIÓN HOSPITALARIA
              </span>
              <h3 className="font-heading font-light uppercase text-2xl text-[#001041] mt-1">
                Solicitar Muestra / Cotización
              </h3>
              <p className="text-xs text-[#494f52] leading-relaxed mt-1">
                Complete el formulario para coordinar la entrega de muestras estériles o cotización por volumen para su centro médico.
              </p>
            </div>

            <form onSubmit={handleSampleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-[#334155] uppercase font-bold text-[10px] mb-1">
                  Nombre del Especialista / Cargo
                </label>
                <input
                  type="text"
                  required
                  placeholder="Dr. César Ramos / Jefe de Quirófano"
                  value={sampleForm.doctorName}
                  onChange={(e) => setSampleForm({ ...sampleForm, doctorName: e.target.value })}
                  className="w-full p-2.5 border border-[#D2D3D5] rounded-xs font-mono-tech text-xs outline-none focus:border-[#001041]"
                />
              </div>

              <div>
                <label className="block text-[#334155] uppercase font-bold text-[10px] mb-1">
                  Clínica / Hospital / Institución
                </label>
                <input
                  type="text"
                  required
                  placeholder="Clínica San Borja / Hospital Central"
                  value={sampleForm.institution}
                  onChange={(e) => setSampleForm({ ...sampleForm, institution: e.target.value })}
                  className="w-full p-2.5 border border-[#D2D3D5] rounded-xs font-mono-tech text-xs outline-none focus:border-[#001041]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#334155] uppercase font-bold text-[10px] mb-1">
                    Ciudad
                  </label>
                  <select
                    value={sampleForm.city}
                    onChange={(e) => setSampleForm({ ...sampleForm, city: e.target.value })}
                    className="w-full p-2.5 border border-[#D2D3D5] rounded-xs font-mono-tech text-xs outline-none focus:border-[#001041] bg-white"
                  >
                    <option value="Lima">Lima</option>
                    <option value="Arequipa">Arequipa</option>
                    <option value="Trujillo">Trujillo</option>
                    <option value="Cusco">Cusco</option>
                    <option value="Chiclayo">Chiclayo</option>
                    <option value="Otra provincia">Otra provincia</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#334155] uppercase font-bold text-[10px] mb-1">
                    Teléfono WhatsApp
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+51 987 654 321"
                    value={sampleForm.phone}
                    onChange={(e) => setSampleForm({ ...sampleForm, phone: e.target.value })}
                    className="w-full p-2.5 border border-[#D2D3D5] rounded-xs font-mono-tech text-xs outline-none focus:border-[#001041]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#334155] uppercase font-bold text-[10px] mb-1">
                  Línea de Fibra de Interés
                </label>
                <select
                  value={sampleForm.fiberInterest}
                  onChange={(e) => setSampleForm({ ...sampleForm, fiberInterest: e.target.value })}
                  className="w-full p-2.5 border border-[#D2D3D5] rounded-xs font-mono-tech text-xs outline-none focus:border-[#001041] bg-white"
                >
                  <option value="OnePush 150 µm / 200 µm (Urolase TFL)">OnePush 150 µm / 200 µm (Urolase TFL)</option>
                  <option value="VPG HP Alta Potencia (SMA-905)">VPG HP Alta Potencia (SMA-905)</option>
                  <option value="Punta Radial 360° R365 / R550 (EVLT)">Punta Radial 360° R365 / R550 (EVLT)</option>
                  <option value="Punta Cónica 550 µm con Mango (Proctología)">Punta Cónica 550 µm con Mango (Proctología)</option>
                  <option value="Línea LP Multidisciplinaria">Línea LP Multidisciplinaria (ORL / Gineco)</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSampleModalOpen(false)}
                  className="px-4 py-2 border border-[#D2D3D5] text-[#334155] hover:text-[#001041] rounded-xs uppercase tracking-wider font-semibold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#001041] hover:bg-[#009EBC] text-white rounded-xs uppercase tracking-wider font-bold transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-[#25b895]" />
                  <span>Enviar por WhatsApp</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
