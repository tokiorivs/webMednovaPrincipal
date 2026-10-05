'use client';

import React from 'react';
import { COMPANY_INFO } from '@/lib/data';

export default function Hero() {
  const tickerItems = [
    { text: 'LÁSER HOLMIUM 100W', sep: '×' },
    { text: 'TECNOLOGÍA TULIO TFL', sep: '→' },
    { text: 'ENUCLEACIÓN PROSTÁTICA HOLEP', sep: '→' },
    { text: 'ENDOUROLOGÍA 4K UHD', sep: '*' },
    { text: 'CONSUMIBLES QUIRÚRGICOS', sep: '×' },
    { text: 'SOPORTE BIOMÉDICO 24/7', sep: '→' },
    { text: 'CERTIFICACIÓN FDA & CE', sep: '*' },
    { text: 'CIRUGÍA MÍNIMAMENTE INVASIVA', sep: '×' },
  ];

  return (
    <section className="relative overflow-hidden h-[100dvh] min-h-[640px] flex items-center bg-[#17181a] text-[#f2f2f2]">

      {/* Background Video / Ambient Visual with Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover object-center opacity-65 scale-105 filter brightness-95 contrast-105"
        >
          {/* Video de producto urológico local */}
          <source
            src="/videos/OnePuch_activation.webm"
            type="video/webm"
          />
        </video>

        {/* Mednova Navy brand overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#001041] via-[#001041]/55 to-[#001041]/70" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full px-6 sm:px-12 md:px-20 lg:px-28 xl:px-36 flex flex-col justify-center gap-6 pt-16 pb-20">

        {/* Large Geometric Heading (Gertix style: font-light, uppercase, text-shadow) */}
        <h1
          className="font-heading font-light uppercase tracking-tight text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.08] text-[#f4f5f6] max-w-5xl"
          style={{ textShadow: '0 0 20px rgba(0, 158, 188, 0.35)' }}
        >
          PRECISION &amp; <br />
          UROLOGICAL TECH
        </h1>

        {/* Technical Description (Gertix style: IBM Plex Mono, ~40% width on desktop) */}
        <p className="font-mono-tech text-xs sm:text-sm md:text-base leading-relaxed text-[#D2D3D5] max-w-xl">
          Mednova Technologies es tu socio estratégico en equipamiento quirúrgico urológico de alta gama. Respaldamos a clínicas y especialistas con tecnología láser de vanguardia y consumibles quirúrgicos.
        </p>

        {/* Primary Action Button (Gertix Studio pill button with brand teal arrow) */}
        <div className="pt-2">
          <a
            href="#portafolio"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#f4f5f6] text-[#001041] font-mono-tech text-xs uppercase tracking-widest font-semibold hover:bg-[#001041] hover:text-white border border-[#f4f5f6] hover:border-[#009EBC] transition-all duration-200 group"
          >
            <span>NUESTRO PORTAFOLIO</span>
            <span className="w-5 h-5 rounded-full bg-[#009EBC] text-white group-hover:scale-110 flex items-center justify-center text-[11px] transition-transform">
              →
            </span>
          </a>
        </div>

      </div>

      {/* Bottom Ticker / Marquee (Infinite Track in Gertix Studio Style) */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 overflow-hidden border-t border-dashed border-[#D2D3D5]/30 bg-[#001041]/90 backdrop-blur-sm py-3"
        aria-hidden="true"
      >
        <div className="animate-ticker flex items-center font-mono-tech text-xs uppercase tracking-wider text-[#f4f5f6] whitespace-nowrap">
          {/* Repeat twice for continuous loop */}
          {[...tickerItems, ...tickerItems].map((item, idx) => (
            <React.Fragment key={idx}>
              <span className="px-3 hover:text-[#009EBC] transition-colors">
                {item.text}
              </span>
              <span className="text-[#009EBC] font-bold px-1 select-none">
                {item.sep}
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>

    </section>
  );
}
