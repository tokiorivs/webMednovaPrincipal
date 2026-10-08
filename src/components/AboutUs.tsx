import React from 'react';
import { ShieldCheck, HeartHandshake } from 'lucide-react';
import HeroTechScene from '@/components/HeroTechScene';

export default function AboutUs() {
  return (
    <section id="nosotros" className="py-24 bg-[#001041] text-white relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#009EBC]/15 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#14377f]/40 blur-3xl" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual / Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto">
              <HeroTechScene
                logoSrc="/images/Logo_claro_fondo_oscuro_vertical.webp"
                logoAlt="Mednova Technologies"
                className="relative w-full aspect-square sm:aspect-[4/5]"
              />
            </div>
          </div>

          {/* Right Column: Text & Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/25 text-[#D2D3D5] bg-white/5 text-xs font-mono-tech tracking-widest uppercase">
              01 • Sobre Nosotros
            </div>

            <h2 className="font-heading font-light uppercase text-3xl sm:text-5xl text-white tracking-tight leading-tight">
              Tecnología láser para la urología moderna
            </h2>

            <p className="text-[#c9ced3] text-sm sm:text-base leading-relaxed">
              En <strong className="text-white">Mednova Technologies</strong> somos el distribuidor exclusivo de VPG LaserOne en Perú. Ponemos a disposición de clínicas, hospitales y urólogos el láser de fibra de tulio Urolase MAX y las fibras quirúrgicas VPG.
            </p>

            <p className="text-[#c9ced3] text-sm sm:text-base leading-relaxed">
              No solo distribuimos tecnología: te acompañamos en cada paso, con mentoría y servicio postventa personalizados, diseñados contigo.
            </p>

            {/* Core Values / Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/15 hover:border-[#33c3df]/50 transition-colors space-y-2">
                <div className="flex items-center gap-2 text-[#33c3df] font-bold text-sm">
                  <ShieldCheck className="w-5 h-5 text-[#33c3df]" />
                  <span className="text-white">Distribuidor Exclusivo VPG LaserOne</span>
                </div>
                <p className="text-sm text-[#c9ced3] leading-relaxed">
                  Representamos en Perú a VPG LaserOne, fabricante líder en láseres médicos y fibras quirúrgicas desde 1991.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/15 hover:border-[#33c3df]/50 transition-colors space-y-2">
                <div className="flex items-center gap-2 text-[#33c3df] font-bold text-sm">
                  <HeartHandshake className="w-5 h-5 text-[#33c3df]" />
                  <span className="text-white">Mentoría personalizada</span>
                </div>
                <p className="text-sm text-[#c9ced3] leading-relaxed">
                  Acompañamos a su equipo quirúrgico con una mentoría adaptada a su institución.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
