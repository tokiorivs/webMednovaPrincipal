import React from 'react';
import { ArrowRight, ShieldCheck, Award, Stethoscope, ChevronDown } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/data';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-slate-50">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Messaging */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-800 text-xs font-semibold tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              Tecnología Quirúrgica de Alta Precisión
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              Equipamiento Urológico Avanzado para <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">Quirófanos de Alta Exigencia</span>
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Soluciones integrales en litotricia láser (Holmium & Tulio TFL), endourología flexible, laparoscopía 4K y consumibles quirúrgicos de alta fidelidad. Acompañamiento clínico y soporte técnico especializado.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#soluciones"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base shadow-lg shadow-blue-600/25 transition-all hover:-translate-y-0.5"
              >
                <span>Explorar Equipos & Soluciones</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent('Hola Mednova, deseo agendar una asesoría técnica y cotización de equipos.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-base border border-slate-200 shadow-sm transition-all hover:border-slate-300"
              >
                <span>Solicitar Asesoría Personalizada</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="pt-8 border-t border-slate-200/80 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">+15</span>
                <span className="text-xs text-slate-500 font-medium">Años de Liderazgo Clínico</span>
              </div>
              <div className="flex flex-col border-x border-slate-200 px-4">
                <span className="text-2xl sm:text-3xl font-extrabold text-blue-600">24/7</span>
                <span className="text-xs text-slate-500 font-medium">Soporte en Quirófano</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600">FDA/CE</span>
                <span className="text-xs text-slate-500 font-medium">Equipos Certificados</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Visual Box */}
              <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-2xl bg-white p-3 relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden relative bg-slate-900">
                  <img
                    src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80"
                    alt="Láser Quirúrgico de Urología Mednova"
                    className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="inline-block px-2.5 py-0.5 rounded bg-blue-500/80 text-[11px] font-medium tracking-wide uppercase mb-1">
                      Tecnología Destacada
                    </span>
                    <h3 className="text-lg font-bold">Láser Quirúrgico Holmium 100W</h3>
                    <p className="text-xs text-slate-300">Enucleación prostática HoLEP & Litotricia de alto rendimiento</p>
                  </div>
                </div>

                {/* Sub Features Banner inside card */}
                <div className="p-4 grid grid-cols-2 gap-3 mt-1">
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                      <Stethoscope className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-bold text-slate-800">Demo In-Situ</p>
                      <p className="text-[10px] text-slate-500">Pruebas en quirófano</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                      <Award className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-bold text-slate-800">Garantía Total</p>
                      <p className="text-[10px] text-slate-500">Servicio técnico local</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white p-3.5 rounded-2xl shadow-xl border border-slate-100 hidden sm:flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold">
                  ✓
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Asesoría Consultiva B2B</p>
                  <p className="text-[11px] text-slate-500">Cotizaciones directas con ingenieros clínicos</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
