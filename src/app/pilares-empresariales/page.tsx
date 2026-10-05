import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Pillars from '@/components/Pillars';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pilares Empresariales • Mednova Technologies',
  description: 'Los pilares y fundamentos que guían la excelencia de Mednova Technologies.',
};

export default function PilaresEmpresarialesPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-mono-tech selection:bg-[#009EBC] selection:text-white">
      <Navbar />

      <main className="flex-1 pt-16 sm:pt-20">
        <Pillars />
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
