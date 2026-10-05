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
          className="w-full h-full object-cover object-center opacity-45 scale-105 filter brightness-90 contrast-110"
        >
          {/* High-quality cinematic tech video matching Gertix aesthetic */}
          <source
            src="https://gertix.studio/wp-content/uploads/2026/06/Saelis_httpss.mj_.runDOtrnOcqL84_a_futuristic_cube_slowly_floa_6e35c185-9608-4af5-b9fe-42c4c049f61a_2.mp4"
            type="video/mp4"
          />
        </video>
        
        {/* Gertix style dark overlay */}
        <div className="absolute inset-0 bg-[#17181a]/55 backdrop-brightness-75" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full px-6 sm:px-12 md:px-20 lg:px-28 xl:px-36 flex flex-col justify-center gap-6 pt-16 pb-20">
        
        {/* Large Geometric Heading (Gertix style: font-light, uppercase, text-shadow) */}
        <h1 
          className="font-heading font-light uppercase tracking-tight text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.08] text-[#f2f2f2] max-w-5xl"
          style={{ textShadow: '0 0 20px rgba(242, 242, 242, 0.4)' }}
        >
          PRECISION &amp; <br />
          UROLOGICAL TECH
        </h1>

        {/* Technical Description (Gertix style: IBM Plex Mono, ~40% width on desktop) */}
        <p className="font-mono-tech text-xs sm:text-sm md:text-base leading-relaxed text-[#e8ebeb]/90 max-w-xl">
          Mednova Technologies es tu socio estratégico en equipamiento quirúrgico urológico de alta gama. Respaldamos a clínicas y especialistas con láseres Holmium y Tulio TFL, torres 4K, consumibles y soporte biomédico continuo en quirófano.
        </p>

        {/* Primary Action Button (Gertix Studio pill button with title & arrow) */}
        <div className="pt-2">
          <a
            href="#soluciones"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#f2f2f2] text-[#17181a] font-mono-tech text-xs uppercase tracking-widest font-semibold hover:bg-[#17181a] hover:text-[#f2f2f2] border border-[#f2f2f2] transition-all duration-200 group"
          >
            <span>NUESTRO PORTAFOLIO</span>
            <span className="w-5 h-5 rounded-full bg-[#17181a] text-[#f2f2f2] group-hover:bg-[#f2f2f2] group-hover:text-[#17181a] flex items-center justify-center text-[11px] transition-colors">
              →
            </span>
          </a>
        </div>

      </div>

      {/* Bottom Ticker / Marquee (Infinite Track in Gertix Studio Style) */}
      <div 
        className="absolute bottom-0 left-0 right-0 z-20 overflow-hidden border-t border-dashed border-[#71797a]/40 bg-[#17181a]/80 backdrop-blur-sm py-3"
        aria-hidden="true"
      >
        <div className="animate-ticker flex items-center font-mono-tech text-xs uppercase tracking-wider text-[#f2f2f2]/90 whitespace-nowrap">
          {/* Repeat twice for continuous loop */}
          {[...tickerItems, ...tickerItems].map((item, idx) => (
            <React.Fragment key={idx}>
              <span className="px-3 hover:text-emerald-400 transition-colors">
                {item.text}
              </span>
              <span className="text-[#71797a] font-bold px-1 select-none">
                {item.sep}
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>

    </section>
  );
}
