import React from 'react';
import Navbar from '@/components/Navbar';
import EquiposView from '@/components/EquiposView';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Equipos Quirúrgicos Urológicos • Mednova Technologies',
  description: 'Catálogo de generadores láser Holmium y Tulio TFL, torres laparoscópicas 4K UHD y endoscopía urológica avanzada.',
};

export default function EquiposPage() {
  return (
    <div className="min-h-screen bg-[#f4f5f6] flex flex-col font-mono-tech selection:bg-[#009EBC] selection:text-white">
      <Navbar />

      <main className="flex-1 pt-16 sm:pt-20">
        <EquiposView />
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
