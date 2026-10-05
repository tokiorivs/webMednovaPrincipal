import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Productos • Mednova Technologies',
  description: 'Catálogo de soluciones y equipamiento médico urológico de Mednova Technologies.',
};

export default function ProductosPage() {
  return (
    <div className="min-h-screen bg-[#f4f5f6] flex flex-col font-mono-tech selection:bg-[#009EBC] selection:text-white">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-32 sm:py-40 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-dashed border-[#D2D3D5] text-[#001041] bg-[#001041]/5 text-xs font-mono-tech tracking-widest uppercase">
            02 • Catálogo General
          </div>
          <h1 className="font-heading font-light uppercase text-4xl sm:text-6xl text-[#001041] tracking-tight">
            Productos
          </h1>
          <p className="text-xs text-[#494f52] max-w-lg mx-auto">
            Portafolio integral de tecnologías láser, endoscopía quirúrgica y material de consumo de alta precisión.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <a
              href="/#equipos"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#001041] hover:bg-[#009EBC] text-white text-xs font-semibold transition-colors"
            >
              <span>Equipos Quirúrgicos</span>
              <span>→</span>
            </a>
            <a
              href="/#consumibles"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-[#eaebec] text-[#001041] border border-[#D2D3D5] text-xs font-semibold transition-colors"
            >
              <span>Consumibles</span>
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
