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
      title: 'Respuesta de Emergencia 24/7',
      description: 'Línea de soporte inmediata y equipos de reemplazo disponibles en menos de 24 horas para garantizar la continuidad operativa de su centro quirúrgico.',
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
      title: 'Tecnología Láser de Punta (TFL & Holmium)',
      description: 'Acceso a las marcas más prestigiosas del mundo con la mayor densidad de potencia, ergonomía superior y compatibilidad con microfibras.',
      color: 'text-purple-600 bg-purple-50',
    },
    {
      icon: ShieldCheck,
      title: 'Garantía Total y Repuestos Originales',
      description: 'Stock garantizado de consumibles, fibras ópticas, ópticas rígidas y piezas electrónicas críticas sin demoras aduaneras.',
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
    <section id="por-que-nosotros" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider">
            Ventaja Competitiva Mednova
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            ¿Por Qué Apostar Por Nosotros?
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
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
                className="p-8 rounded-3xl bg-slate-800/60 border border-slate-700/60 hover:border-blue-500/50 hover:bg-slate-800 transition-all duration-300 space-y-4 group"
              >
                <div className={`w-12 h-12 rounded-2xl ${r.color} flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                  {r.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {r.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Action Callout */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-blue-900/60 to-slate-800/80 border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-xl font-bold">¿Desea una propuesta técnica personalizada para su clínica?</h4>
            <p className="text-xs text-slate-300">Nuestros ingenieros clínicos le enviarán un comparativo técnico y financiero en menos de 24 horas.</p>
          </div>
          <a
            href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent('Hola Mednova, solicito propuesta técnica para el equipamiento urológico de nuestra clínica.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs tracking-wide shadow-lg shadow-blue-600/30 transition-all shrink-0"
          >
            Hablar con un Especialista
          </a>
        </div>

      </div>
    </section>
  );
}
