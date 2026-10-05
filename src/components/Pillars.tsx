import React from 'react';
import { Target, Wrench, GraduationCap, ShieldCheck } from 'lucide-react';

export default function Pillars() {
  const pillars = [
    {
      number: '01',
      title: 'Precisión & Innovación Quirúrgica',
      description: 'Seleccionamos únicamente equipos que aporten un salto cualitativo evidente: mejor tasa de resolución de cálculos (SFR), menor retropulsión y cortes hemostáticos limpios.',
      icon: Target,
      tag: 'Eficacia Clínica',
    },
    {
      number: '02',
      title: 'Servicio Técnico Certificado de Fábrica',
      description: 'Nuestro departamento de ingeniería biomédica se capacita directamente con las casas matrices en Alemania, EE.UU. y Asia. Calibraciones certificadas y mantenimiento preventivo riguroso.',
      icon: Wrench,
      tag: 'Cero Downtime',
    },
    {
      number: '03',
      title: 'Educación Médica & Entrenamiento Continuo',
      description: 'No entregamos una máquina sin capacitar a su personal. Organizamos workshops con simuladores biológicos y transmisiones quirúrgicas en vivo para acelerar la curva de aprendizaje.',
      icon: GraduationCap,
      tag: 'Formación Continua',
    },
    {
      number: '04',
      title: 'Seguridad del Paciente & Trazabilidad',
      description: 'Cada fibra láser, catéter y dispositivo cuenta con registro sanitario al día, empaque sellado estéril y lote rastreable, garantizando intervenciones con riesgo cero de contaminación.',
      icon: ShieldCheck,
      tag: 'Calidad Asistencial',
    },
  ];

  return (
    <section id="pilares" className="py-24 bg-white relative scroll-mt-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-dashed border-[#71797a]/50 text-[#17181a] text-xs font-mono-tech tracking-widest uppercase">
            05 • Nuestros Fundamentos
          </div>
          <h2 className="font-heading font-light uppercase text-3xl sm:text-5xl text-[#17181a] tracking-tight">
            Los Pilares de Mednova
          </h2>
          <p className="text-xs sm:text-sm text-[#494f52] leading-relaxed max-w-2xl mx-auto font-mono-tech">
            Nuestra cultura corporativa se rige por principios inquebrantables de excelencia técnica, compromiso con la salud del paciente y respaldo incondicional a la comunidad urológica.
          </p>
        </div>

        {/* Pillars Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50/70 rounded-3xl p-8 border border-slate-200/80 hover:bg-white hover:border-blue-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Background Number */}
                <div className="text-6xl font-black text-slate-200/60 absolute top-4 right-4 pointer-events-none group-hover:text-blue-100 transition-colors">
                  {p.number}
                </div>

                <div className="space-y-4 relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-600/20 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600">
                      {p.tag}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mt-1">
                      {p.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {p.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-400 font-medium">
                  <span>Pilar Institucional</span>
                  <span className="font-mono text-slate-500 font-bold">{p.number}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
