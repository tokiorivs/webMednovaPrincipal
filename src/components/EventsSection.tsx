import React from 'react';
import { Calendar, MapPin, ExternalLink, ArrowRight } from 'lucide-react';
import { INITIAL_EVENTS, COMPANY_INFO } from '@/lib/data';

export default function EventsSection() {
  return (
    <section id="eventos" className="py-24 bg-slate-50 relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-dashed border-[#71797a]/30">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-dashed border-[#71797a]/50 text-[#17181a] text-xs font-mono-tech tracking-widest uppercase">
              <Calendar className="w-3.5 h-3.5" />
              06 • Presencia Médica &amp; Actualización
            </div>
            <h2 className="font-heading font-light uppercase text-3xl sm:text-5xl text-[#17181a] tracking-tight">
              Eventos, Congresos &amp; Workshops
            </h2>
            <p className="text-xs sm:text-sm text-[#494f52] leading-relaxed font-mono-tech">
              Participamos activamente en los principales congresos nacionales e internacionales de urología, organizando cursos prácticos de enucleación con láser y jornadas quirúrgicas.
            </p>
          </div>

          <a
            href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent('Hola Mednova, deseo información sobre los próximos workshops y congresos de urología.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#17181a] hover:bg-[#494f52] text-[#f2f2f2] text-xs font-mono-tech uppercase tracking-wider font-semibold shadow-sm transition-all shrink-0"
          >
            <span>Consultar Próximos Cursos</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Events Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {INITIAL_EVENTS.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Event Image */}
              <div className="relative aspect-video overflow-hidden bg-slate-900">
                <img
                  src={event.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80'}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-600 text-white shadow">
                    {event.type}
                  </span>
                </div>
              </div>

              {/* Event Details */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{event.date}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {event.title}
                  </h3>

                  <div className="flex items-start gap-2 text-xs text-slate-500">
                    <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 text-slate-400" />
                    <span className="line-clamp-1">{event.location}</span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {event.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-slate-400">Cupos y Asistencia</span>
                  <a
                    href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(`Hola Mednova, deseo inscribirme o saber más sobre el evento: ${event.title}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 group-hover:underline"
                  >
                    <span>Más Información</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
