import React from 'react';
import { ShieldCheck, Stethoscope, Clock, Zap, Cpu, Award } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/data';

export default function WhyUs() {
  const reasons = [
    {
      icon: Stethoscope,
      title: 'Acompañamiento Quirúrgico Real',
      description: 'Nuestros bioingenieros asisten presencialmente a sus cirugías para calibrar el equipo, asistir al personal y garantizar la máxima seguridad del paciente.',
      color: 'text-blue-600 bg-blue-50',
    },
    {
      icon: Clock,
      title: 'Soporte Técnico Local',
      description: 'Un equipo técnico en Lima para atender consultas y asistir la continuidad operativa de su centro quirúrgico.',
      color: 'text-emerald-600 bg-emerald-50',
    },
    {
      icon: Zap,
      title: 'Demostración In-Situ Sin Costo',
      description: 'Llevamos el láser o torre urológica a su quirófano para que sus especialistas operen con la máquina antes de tomar una decisión de adquisición.',
      color: 'text-amber-600 bg-amber-50',
    },
    {
      icon: Cpu,
      title: 'Tecnología Láser de Fibra de Tulio',
      description: 'Urolase MAX de VPG LaserOne: compacto, con refrigeración por aire, conexión eléctrica estándar y sin mantenimiento rutinario.',
      color: 'text-purple-600 bg-purple-50',
    },
    {
      icon: ShieldCheck,
      title: 'Fibras y Consumibles Originales',
      description: 'Fibras quirúrgicas VPG OnePush en 5 diámetros (150 a 940 µm), desechables y reutilizables.',
      color: 'text-cyan-600 bg-cyan-50',
    },
    {
      icon: Award,
      title: 'Planes a la Medida de su Institución',
      description: 'Opciones de compra directa, financiamiento institucional, leasing quirúrgico o programas de comodato por volumen de insumos.',
      color: 'text-rose-600 bg-rose-50',
    },
  ];

  return (
    <section id="por-que-nosotros" className="py-24 bg-[#001041] text-white relative overflow-hidden font-mono-tech">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#009EBC]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#009EBC]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-dashed border-[#D2D3D5]/40 text-[#D2D3D5] text-xs font-mono-tech tracking-widest uppercase">
            04 • Ventaja Competitiva Mednova
          </div>
          <h2 className="font-heading font-light uppercase text-3xl sm:text-5xl text-white tracking-tight">
            ¿Por Qué Apostar Por Nosotros?
          </h2>
          <p className="text-xs sm:text-sm text-[#D2D3D5] leading-relaxed max-w-2xl mx-auto font-mono-tech">
            La adquisición de un equipo quirúrgico de alta gama requiere un socio de confianza que no desaparezca tras la entrega. Esto es lo que nos distingue:
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((r, idx) => {
            const Icon = r.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-[#061c5c]/40 border border-[#D2D3D5]/20 hover:border-[#009EBC] hover:bg-[#061c5c]/80 transition-all duration-300 space-y-4 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#009EBC]/10 border border-[#009EBC]/30 text-[#009EBC] flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 group-hover:bg-[#009EBC] group-hover:text-white transition-all">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-[#009EBC] transition-colors">
                  {r.title}
                </h3>
                <p className="text-sm text-[#D2D3D5]/80 leading-relaxed">
                  {r.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Action Callout */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-[#061c5c] to-[#001041] border border-[#009EBC]/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-xl font-bold font-heading">¿Desea una propuesta técnica personalizada para su clínica?</h4>
            <p className="text-xs text-[#D2D3D5]">Nuestros ingenieros clínicos le enviarán un comparativo técnico y financiero a la brevedad.</p>
          </div>
          <a
            href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent('Hola Mednova, solicito propuesta técnica para el equipamiento urológico de nuestra clínica.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-[#009EBC] hover:bg-[#00819a] text-white font-semibold text-xs tracking-wide shadow-lg shadow-[#009EBC]/30 transition-all shrink-0 font-mono-tech"
          >
            Hablar con un Especialista
          </a>
        </div>

      </div>
    </section>
  );
}
