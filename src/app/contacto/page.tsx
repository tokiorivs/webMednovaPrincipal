import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contacto • Mednova Technologies',
  description: 'Canales de atención y contacto corporativo B2B de Mednova Technologies.',
};

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-[#f4f5f6] flex flex-col font-mono-tech selection:bg-[#009EBC] selection:text-white">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-32 sm:py-40 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-dashed border-[#D2D3D5] text-[#001041] bg-[#001041]/5 text-xs font-mono-tech tracking-widest uppercase">
            05 • Atención Especializada B2B
          </div>
          <h1 className="font-heading font-light uppercase text-4xl sm:text-6xl text-[#001041] tracking-tight">
            Contacto
          </h1>
          <p className="text-xs text-[#494f52] max-w-lg mx-auto">
            Atención personalizada por bioingenieros y asesores clínicos para clínicas y hospitales en todo el país.
          </p>
          <div className="pt-4">
            <a
              href="/#contacto"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#001041] hover:bg-[#009EBC] text-white text-xs font-semibold transition-colors"
            >
              <span>Ir al Formulario de Cotización</span>
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
