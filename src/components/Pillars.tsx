import React from 'react';
import Link from 'next/link';
import { ArrowRight, GraduationCap, MessageCircle, ShieldCheck, Wrench } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/data';
import ModelViewer3D from '@/components/ModelViewer3D';
import HeroTechScene from '@/components/HeroTechScene';

const waLink = (text: string) =>
  `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(text)}`;

const vpgStats = [
  { value: '1991', label: 'Año de fundación' },
  { value: '> 1 M', label: 'Pacientes tratados anualmente' },
  { value: '+ 50', label: 'Patentes en tecnologías láser médicas' },
  { value: '> 3000', label: 'Sistemas láser médicos instalados en el mundo desde 2017' },
];

const pillars = [
  {
    icon: ShieldCheck,
    title: 'Distribución exclusiva',
    description:
      'Somos el distribuidor exclusivo de VPG LaserOne en Perú: un solo interlocutor para su equipo láser y sus fibras quirúrgicas.',
  },
  {
    icon: GraduationCap,
    title: 'Mentoría personalizada',
    description:
      'Acompañamos a su equipo quirúrgico con una mentoría pensada para su experiencia y para su institución.',
  },
  {
    icon: Wrench,
    title: 'Servicio postventa',
    description:
      'Un servicio postventa personalizado. Cada institución es distinta y cada caso se atiende como tal.',
  },
  {
    icon: MessageCircle,
    title: 'Comunicación directa',
    description:
      'Hablamos con usted por WhatsApp, sin formularios ni intermediarios. Siempre con una persona real al otro lado.',
  },
];

const steps = [
  {
    number: '1',
    title: 'Conversemos',
    description: 'Cuéntenos por WhatsApp qué necesita su servicio de urología.',
  },
  {
    number: '2',
    title: 'Propuesta a su medida',
    description: 'Le enviamos una cotización adaptada a su institución.',
  },
  {
    number: '3',
    title: 'Acompañamiento',
    description: 'Mentoría y servicio postventa personalizados, antes y después de la compra.',
  },
];

const urolasePoints = [
  'Tissue Sensor: detiene el láser al detectar tejido blando',
  'Hasta 3 veces más compacto y liviano que los sistemas Ho:YAG',
  'Conexión eléctrica estándar, refrigeración por aire y sin mantenimiento rutinario',
  'Fibras OnePush en 5 diámetros, de 150 a 940 µm',
];

export default function Pillars() {
  return (
    <>
      {/* Intro */}
      <section className="relative overflow-hidden bg-[#001041] text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 80% at 80% 20%, rgba(0,158,188,0.28) 0%, transparent 60%)',
          }}
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 max-w-3xl space-y-6">
            <p className="inline-flex items-center gap-2 text-sm font-medium text-[#7fdcf0]">
              <span className="w-8 h-px bg-[#009EBC]" aria-hidden="true" />
              Nuestros pilares
            </p>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl leading-[1.1]">
              Una empresa nueva, respaldada por un fabricante líder
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-[#e4e6e8] max-w-2xl">
              Mednova Technologies es el distribuidor exclusivo de VPG LaserOne en Perú. Unimos tecnología láser de clase mundial con un acompañamiento cercano y personalizado.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={waLink('Hola Mednova Technologies, deseo conocer más sobre su servicio y sobre Urolase MAX.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-teal-ink hover:bg-[#00819a] text-white text-base font-semibold transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                Hablar por WhatsApp
              </a>
              <Link
                href="/equipos/urolase-max"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-white/40 hover:border-white hover:bg-white/10 text-white text-base font-medium transition-colors"
              >
                Ver Urolase MAX
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          <div className="hidden lg:block lg:col-span-5">
            <HeroTechScene
              logoSrc="/images/Logo_claro_fondo_oscuro_vertical.webp"
              logoAlt="Mednova Technologies"
              className="relative h-[420px]"
            />
          </div>
        </div>
      </section>

      {/* VPG LaserOne backing */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5">
              <div className="rounded-3xl bg-[#001041] p-10 sm:p-14 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/vpg-laserone-logo-blanco.png"
                  alt="VPG LaserOne"
                  width={855}
                  height={280}
                  className="w-full max-w-xs h-auto"
                />
              </div>
            </div>
            <div className="lg:col-span-7 space-y-4">
              <h2 className="font-heading text-3xl sm:text-4xl text-[#001041]">
                El respaldo de VPG LaserOne
              </h2>
              <p className="text-base sm:text-lg text-[#494f52] leading-relaxed">
                VPG LaserOne es una empresa verticalmente integrada, fundada por el científico Valentin Pavlovich Gapontsev. Diseña y suministra dispositivos láser médicos y fibras quirúrgicas, desde la ingeniería y la investigación de laboratorio hasta los protocolos y ensayos clínicos junto a instituciones médicas de referencia.
              </p>
            </div>
          </div>

          <dl className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {vpgStats.map((stat) => (
              <div key={stat.value} className="rounded-2xl bg-[#f4f5f6] border border-[#D2D3D5] p-6">
                <dt className="font-heading text-3xl sm:text-4xl text-teal-ink">{stat.value}</dt>
                <dd className="mt-2 text-sm sm:text-base text-[#494f52] leading-snug">{stat.label}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-sm text-[#494f52]">Fuente: brochure oficial de VPG LaserOne.</p>
        </div>
      </section>

      {/* Pillars */}
      <section className="bg-[#f4f5f6] py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-3">
            <h2 className="font-heading text-3xl sm:text-4xl text-[#001041]">Lo que nos comprometemos a darle</h2>
            <p className="text-base sm:text-lg text-[#494f52] leading-relaxed">
              Cuatro pilares que guían cómo trabajamos con cada especialista e institución.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="group relative overflow-hidden rounded-3xl bg-white border border-[#D2D3D5] p-8 sm:p-9 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#009EBC]/50 hover:shadow-[0_24px_50px_-20px_rgba(0,16,65,0.35)]"
                >
                  {/* Línea de acento superior */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-linear-to-r from-[#009EBC] to-[#33c3df] transition-transform duration-500 group-hover:scale-x-100"
                  />
                  {/* Resplandor al pasar el mouse */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full bg-[#009EBC]/0 blur-3xl transition-colors duration-500 group-hover:bg-[#009EBC]/15"
                  />
                  {/* Número grande de fondo */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-6 right-4 select-none font-heading text-[8rem] leading-none text-[#001041]/[0.04] transition-colors duration-300 group-hover:text-[#009EBC]/10"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <div className="relative flex flex-col gap-5">
                    <div className="flex items-center justify-between">
                      <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-[#001041] to-[#0a2a6e] text-[#33c3df] flex items-center justify-center shadow-lg shadow-[#001041]/25 ring-1 ring-[#33c3df]/20 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                        <Icon className="w-7 h-7" />
                      </div>
                      <span className="text-xs font-mono-tech tracking-[0.2em] text-[#009EBC]">
                        PILAR {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-heading text-2xl text-[#001041]">{pillar.title}</h3>
                      <p className="text-base text-[#494f52] leading-relaxed">{pillar.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Urolase MAX */}
      <section className="bg-[#001041] text-white py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10">
            <ModelViewer3D
              src="/modelos_3d/urolase_max_mejorado.glb"
              alt="Modelo 3D interactivo del láser Urolase MAX"
            />
          </div>
          <div className="space-y-5">
            <p className="text-sm font-medium text-[#7fdcf0]">La tecnología que respaldamos</p>
            <h2 className="font-heading text-3xl sm:text-4xl">Urolase MAX</h2>
            <p className="text-base sm:text-lg text-[#e4e6e8] leading-relaxed">
              Un solo sistema láser de fibra de tulio para litotricia y cirugía de tejidos blandos.
            </p>
            <ul className="space-y-3 text-base text-[#e4e6e8]">
              {urolasePoints.map((point) => (
                <li key={point} className="flex gap-3">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#33c3df] shrink-0" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
            <Link
              href="/equipos/urolase-max"
              className="inline-flex items-center gap-2 text-base font-semibold text-[#7fdcf0] hover:text-white transition-colors pt-2"
            >
              Conocer Urolase MAX
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl sm:text-4xl text-[#001041] max-w-2xl">Cómo trabajamos con usted</h2>
          <ol className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step) => (
              <li key={step.number} className="rounded-3xl border border-[#D2D3D5] p-8 space-y-3">
                <span className="w-10 h-10 rounded-full bg-teal-ink text-white font-heading text-lg flex items-center justify-center">
                  {step.number}
                </span>
                <h3 className="font-heading text-xl text-[#001041]">{step.title}</h3>
                <p className="text-base text-[#494f52] leading-relaxed">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-[#f4f5f6] pb-16 sm:pb-24 pt-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-[#061c5c] to-[#001041] p-8 sm:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <h2 className="font-heading text-2xl sm:text-3xl text-white">¿Conversamos sobre lo que necesita su servicio?</h2>
              <p className="text-base text-[#e4e6e8]">Escríbanos y le responde una persona del equipo de Mednova.</p>
            </div>
            <a
              href={waLink('Hola Mednova Technologies, me gustaría conversar sobre las necesidades de nuestro servicio de urología.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-teal-ink hover:bg-[#00819a] text-white text-base font-semibold transition-colors shrink-0"
            >
              <MessageCircle className="w-5 h-5" />
              Escribir por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
