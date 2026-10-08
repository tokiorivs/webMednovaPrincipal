'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ShieldCheck, GraduationCap, Wrench, MessageCircle, Cpu, Package } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/data';

export default function WhyUs() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = gridRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const reasons = [
    {
      icon: GraduationCap,
      title: 'Mentoría personalizada',
      description: 'Acompañamos a su equipo quirúrgico con una mentoría pensada para su experiencia y para su institución.',
      color: 'text-blue-600 bg-blue-50',
    },
    {
      icon: Wrench,
      title: 'Servicio postventa',
      description: 'Un servicio postventa personalizado. Cada institución es distinta y cada caso se atiende como tal.',
      color: 'text-emerald-600 bg-emerald-50',
    },
    {
      icon: MessageCircle,
      title: 'Comunicación directa',
      description: 'Hablamos con usted por WhatsApp, sin formularios ni intermediarios.',
      color: 'text-amber-600 bg-amber-50',
    },
    {
      icon: Cpu,
      title: 'Láser de fibra de tulio',
      description: 'Urolase MAX de VPG LaserOne: hasta 3 veces más compacto y liviano que los sistemas Ho:YAG, con refrigeración por aire, conexión eléctrica estándar y sin mantenimiento rutinario.',
      color: 'text-purple-600 bg-purple-50',
    },
    {
      icon: Package,
      title: 'Fibras VPG OnePush',
      description: 'Fibras quirúrgicas VPG OnePush en 5 diámetros (150 a 940 µm), desechables y reutilizables.',
      color: 'text-cyan-600 bg-cyan-50',
    },
    {
      icon: ShieldCheck,
      title: 'Distribución exclusiva',
      description: 'Somos el distribuidor exclusivo de VPG LaserOne en Perú: un solo interlocutor para su equipo y sus fibras.',
      color: 'text-rose-600 bg-rose-50',
    },
  ];

  return (
    <section id="por-que-nosotros" className="py-24 bg-[#f4f5f6] text-[#001041] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#009EBC]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#009EBC]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#D2D3D5] text-[#001041] bg-[#001041]/5 text-xs font-mono-tech tracking-widest uppercase">
            Ventaja Competitiva Mednova
          </div>
          <h2 className="font-heading font-light uppercase text-3xl sm:text-5xl text-[#001041] tracking-tight">
            Lo que nos distingue
          </h2>
          <p className="text-base text-[#494f52] leading-relaxed max-w-2xl mx-auto">
            La adquisición de un equipo quirúrgico de alta gama requiere un socio de confianza que no desaparezca tras la entrega.
          </p>
        </div>

        {/* Reasons Grid */}
        <div ref={gridRef} className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((r, idx) => {
            const Icon = r.icon;
            return (
              <div
                key={idx}
                style={{ transitionDelay: visible ? `${idx * 90}ms` : '0ms' }}
                className={`relative overflow-hidden p-8 rounded-3xl border space-y-4 group motion-safe:transition-all motion-safe:duration-700 motion-safe:ease-out hover:-translate-y-2 hover:shadow-xl hover:shadow-[#009EBC]/20 ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 motion-safe:translate-y-6'
                } bg-gradient-to-br from-[#061c5c] to-[#001041] border-[#009EBC]/40 hover:border-[#33c3df]`}
              >
                <span className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#33c3df] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-md bg-[#33c3df]/15 text-[#33c3df] shadow-[#33c3df]/10 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-[#33c3df] group-hover:text-[#001041] transition-all"
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">
                  {r.title}
                </h3>
                <p className="text-sm sm:text-base text-[#D2D3D5] leading-relaxed">
                  {r.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Action Callout */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-[#061c5c] to-[#001041] border border-[#009EBC]/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-xl font-bold font-heading text-white">¿Desea una propuesta técnica personalizada para su clínica?</h4>
            <p className="text-sm text-[#D2D3D5]">Escríbanos y le responderemos con una propuesta adaptada a su institución.</p>
          </div>
          <a
            href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent('Hola Mednova, solicito propuesta técnica para el equipamiento urológico de nuestra clínica.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full bg-teal-ink hover:bg-[#00819a] text-white font-semibold text-xs tracking-wide shadow-lg shadow-[#009EBC]/30 transition-all shrink-0 font-mono-tech"
          >
            Hablar con un Especialista
          </a>
        </div>

      </div>
    </section>
  );
}
