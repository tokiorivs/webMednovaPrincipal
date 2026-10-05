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
    <div className="min-h-screen bg-[#f2f2f2] flex flex-col font-mono selection:bg-blue-600 selection:text-white">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-32 sm:py-40 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-dashed border-[#71797a]/50 text-[#17181a] text-xs font-mono tracking-widest uppercase">
            05 • Atención Especializada B2B
          </div>
          <h1 className="font-heading font-light uppercase text-4xl sm:text-6xl text-[#17181a] tracking-tight">
            Contacto
          </h1>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
