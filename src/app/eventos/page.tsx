import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: 'Eventos • Mednova Technologies',
  description: 'Eventos, congresos médicos y workshops especializados de Mednova Technologies.',
};

export default function EventosPage() {
  return (
    <div className="min-h-screen bg-[#f4f5f6] flex flex-col font-mono-tech selection:bg-[#009EBC] selection:text-white">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-32 sm:py-40 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-dashed border-[#D2D3D5] text-[#001041] bg-[#001041]/5 text-xs font-mono-tech tracking-widest uppercase">
            04 • Presencia Médica &amp; Actualización
          </div>
          <h1 className="font-heading font-light uppercase text-4xl sm:text-6xl text-[#001041] tracking-tight">
            Eventos
          </h1>
          <p className="text-xs text-[#494f52] max-w-lg mx-auto">
            Workshops prácticos, transmisiones quirúrgicas en vivo y conferencias en congresos de urología.
          </p>
          <div className="pt-4">
            <a
              href="/#eventos"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#001041] hover:bg-[#009EBC] text-white text-xs font-semibold transition-colors"
            >
              <span>Ver Calendario de Eventos</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
