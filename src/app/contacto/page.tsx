import React from 'react';
import Navbar from '@/components/Navbar';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contacto & Cotización • Mednova Technologies',
  description: 'Canales de atención directa, solicitud de cotización formal y asesoría quirúrgica urológica B2B de Mednova Technologies.',
};

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-[#f4f5f6] flex flex-col font-mono-tech selection:bg-[#009EBC] selection:text-white">
      <Navbar />

      <main className="flex-1 pt-20 sm:pt-24 pb-8">
        <ContactSection />
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
