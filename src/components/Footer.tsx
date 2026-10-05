import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Phone, Mail, MapPin, Lock, ArrowUp } from 'lucide-react';
import { COMPANY_INFO, INITIAL_SPECIALTIES } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <span className="text-lg font-bold text-white tracking-tight">MEDNOVA TECHNOLOGIES</span>
            </div>
            
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Especialistas en equipamiento urológico de alta precisión, láseres quirúrgicos, torres de laparoscopía y consumibles clínicos. Soporte técnico certificado y educación médica continua.
            </p>

            <div className="pt-2 flex items-center gap-2 text-emerald-400 text-[11px] font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>Garantía y respaldo biomédico en cada equipo</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">Navegación</h4>
            <ul className="space-y-2">
              <li><a href="#nosotros" className="hover:text-white transition-colors">Nosotros</a></li>
              <li><a href="#soluciones" className="hover:text-white transition-colors">Soluciones por Especialidad</a></li>
              <li><a href="#consumibles" className="hover:text-white transition-colors">Consumibles Quirúrgicos</a></li>
              <li><a href="#por-que-nosotros" className="hover:text-white transition-colors">Por Qué Apostar por Nosotros</a></li>
              <li><a href="#pilares" className="hover:text-white transition-colors">Los Pilares</a></li>
              <li><a href="#eventos" className="hover:text-white transition-colors">Eventos & Congresos</a></li>
              <li><a href="#contacto" className="hover:text-white transition-colors">Contacto & Cotización</a></li>
            </ul>
          </div>

          {/* Specialties */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">Especialidades</h4>
            <ul className="space-y-2">
              {INITIAL_SPECIALTIES.map((spec) => (
                <li key={spec.id}>
                  <a href="#soluciones" className="hover:text-white transition-colors line-clamp-1">
                    {spec.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Admin & Security */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">Gestión</h4>
            <div className="space-y-2">
              <p className="text-slate-400 text-[11px]">Panel reservado para administración y catálogo:</p>
              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors text-xs"
              >
                <Lock className="w-3.5 h-3.5 text-blue-400" />
                <span>Panel Administrativo</span>
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} {COMPANY_INFO.name}. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-6">
            <span>Urología & Cirugía de Mínima Invasión</span>
            <a href="#top" className="hover:text-white flex items-center gap-1">
              <span>Volver arriba</span>
              <ArrowUp className="w-3 h-3" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
