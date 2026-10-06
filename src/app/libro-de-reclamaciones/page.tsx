import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import LibroReclamacionesClient from '@/components/LibroReclamacionesClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Libro de Reclamaciones Virtual • Mednova Technologies',
  description: 'Libro de Reclamaciones Virtual de Mednova Technologies S.A.C. conforme a la Ley N° 29571 (Código de Protección y Defensa del Consumidor de INDECOPI). Registre su reclamo o queja en línea.',
};

export default function LibroReclamacionesPage() {
  return (
    <div className="min-h-screen bg-[#f4f5f6] flex flex-col font-mono-tech selection:bg-[#009EBC] selection:text-white">
      <Navbar />

      <main className="flex-1 pt-24 sm:pt-28 pb-16">
        <LibroReclamacionesClient />
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
