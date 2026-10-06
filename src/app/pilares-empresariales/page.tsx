import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Pillars from '@/components/Pillars';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: { canonical: '/pilares-empresariales' },
  title: 'Nuestros pilares: respaldo, mentoría y postventa',
  description: 'Mednova Technologies, distribuidor exclusivo de VPG LaserOne en Perú: respaldo de un fabricante líder, mentoría personalizada y servicio postventa.',
};

export default function PilaresEmpresarialesPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-mono-tech selection:bg-teal-ink selection:text-white">
      <Navbar />

      <main className="flex-1 pt-16 sm:pt-20">
        <Pillars />
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
