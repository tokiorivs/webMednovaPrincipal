import React from 'react';
import { ShieldCheck, HeartHandshake, Award, Users } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/data';

export default function AboutUs() {
  return (
    <section id="nosotros" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual / Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto rounded-3xl overflow-hidden shadow-2xl border border-slate-100 bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=80"
                alt="Quirófano Urológico Mednova"
                className="w-full h-full object-cover aspect-[4/5] opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <div className="inline-block px-3 py-1 rounded-full bg-blue-600/90 text-xs font-bold uppercase tracking-wider">
                  Compromiso Clínico
                </div>
                <h4 className="text-xl font-bold">Impulsando la Urología Moderna</h4>
                <p className="text-xs text-slate-300">
                  Equipamos centros quirúrgicos públicos y privados con la tecnología más avanzada del mercado mundial.
                </p>
              </div>
            </div>

            {/* Float Card */}
            <div className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 hidden sm:flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-extrabold text-slate-900">+500 Quirófanos</p>
                <p className="text-xs text-slate-500">Equipados con éxito</p>
              </div>
            </div>
          </div>

          {/* Right Column: Text & Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider">
              Sobre Nosotros
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Líderes en Innovación Urológica y Soluciones Quirúrgicas
            </h2>

            <p className="text-slate-600 text-base leading-relaxed">
              En <strong className="text-slate-900">Mednova Technologies</strong> nos dedicamos a transformar la práctica de la urología a través de equipamiento médico de última generación. Proveemos a clínicas, hospitales y urólogos especialistas herramientas de máxima fiabilidad, precisión y seguridad.
            </p>

            <p className="text-slate-600 text-base leading-relaxed">
              No solo distribuimos equipos: somos aliados estratégicos en el quirófano. Nuestro equipo de bioingenieros y especialistas clínicos acompaña cada procedimiento con capacitación técnica in situ, soporte de emergencia y garantía de piezas originales.
            </p>

            {/* Core Values / Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
                  <ShieldCheck className="w-5 h-5" />
                  Homologación Internacional
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Todos los equipos y consumibles cuentan con certificaciones FDA y marcado CE europeo.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                  <HeartHandshake className="w-5 h-5" />
                  Alianza con Urólogos
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Programas de entrenamiento continuo, workshops y respaldo en cirugías complejas.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
