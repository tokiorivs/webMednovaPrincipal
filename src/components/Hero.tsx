'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, FileText } from 'lucide-react';

const keyFacts = [
  { value: '1940 nm', label: 'Láser de fibra de tulio' },
  { value: '≈ 3.5 mm', label: 'Retropulsión en modo MRP*' },
  { value: 'Tissue Sensor', label: 'Se detiene al detectar tejido blando' },
  { value: '150 – 940 µm', label: 'Fibras OnePush, 5 diámetros' },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[100dvh] flex flex-col bg-[#001041] text-white">

      {/* Background video with brand overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          className="w-full h-full object-cover object-center opacity-50"
        >
          <source src="/videos/OnePuch_activation.webm" type="video/webm" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-[#001041] via-[#001041]/85 to-[#001041]/40" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#001041] to-transparent" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-center px-6 sm:px-12 md:px-20 lg:px-28 xl:px-36 pt-28 pb-12">
        <div className="max-w-3xl space-y-7">

          <p className="inline-flex items-center gap-2 text-sm font-medium text-[#7fdcf0]">
            <span className="w-8 h-px bg-[#009EBC]" aria-hidden="true" />
            Distribuidor exclusivo de VPG LaserOne en Perú
          </p>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl leading-[1.1] text-white">
            Láser de tulio <span className="text-[#33c3df]">Urolase MAX</span> para litotricia y enucleación prostática
          </h1>

          <p className="text-base sm:text-lg leading-relaxed text-[#e4e6e8] max-w-2xl">
            Un solo sistema para cirugía de tejidos blandos y litotricia, con Tissue Sensor que detiene el láser al detectar tejido blando. Compacto, con conexión eléctrica estándar y sin mantenimiento rutinario.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-teal-ink hover:bg-[#00b3d4] text-white text-base font-semibold transition-colors"
            >
              Solicitar cotización
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/equipos/urolase-max"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-white/40 hover:border-white hover:bg-white/10 text-white text-base font-medium transition-colors"
            >
              <FileText className="w-4 h-4" />
              Ver ficha técnica
            </Link>
          </div>
        </div>
      </div>

      {/* Static key facts */}
      <div className="relative z-10 border-t border-white/15 bg-[#001041]/90 backdrop-blur-sm">
        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-5 px-6 sm:px-12 md:px-20 lg:px-28 xl:px-36 py-6">
          {keyFacts.map((fact) => (
            <div key={fact.value}>
              <dt className="font-heading text-xl sm:text-2xl text-white">{fact.value}</dt>
              <dd className="text-sm text-[#c9ced3] mt-0.5">{fact.label}</dd>
            </div>
          ))}
        </dl>
        <p className="px-6 sm:px-12 md:px-20 lg:px-28 xl:px-36 pb-4 text-sm text-[#9aa3ad]">
          * MRP: modo de mínima retropulsión. Datos según brochure oficial de VPG LaserOne.
        </p>
      </div>

    </section>
  );
}
