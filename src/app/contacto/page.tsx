import React from 'react';
import Navbar from '@/components/Navbar';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: { canonical: '/contacto' },
  title: 'Contacto y cotización por WhatsApp',
  description: 'Cotice Urolase MAX y fibras VPG OnePush por WhatsApp con el distribuidor exclusivo de VPG LaserOne en Perú.',
};

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-[#f4f5f6] flex flex-col font-mono-tech selection:bg-teal-ink selection:text-white">
      <Navbar />

      <main className="flex-1 pb-8">
        {/* Hero */}
        <section className="relative overflow-hidden bg-[#001041] text-white">
          <div className="absolute inset-0 z-0" aria-hidden="true">
            <div className="absolute inset-0 bg-gradient-to-br from-[#001041] via-[#001041] to-[#00294f]" />
            <div className="absolute -top-24 -right-24 w-[28rem] h-[28rem] rounded-full bg-[#009EBC]/25 blur-3xl" />
            <div className="absolute -bottom-32 -left-16 w-[24rem] h-[24rem] rounded-full bg-[#33c3df]/10 blur-3xl" />
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                backgroundSize: '48px 48px',
              }}
            />
          </div>

          <div className="relative z-10 flex flex-col items-center text-center px-6 pt-36 pb-20 sm:pt-44 sm:pb-28">
            <p className="inline-flex items-center gap-2 text-sm font-medium text-[#7fdcf0] mb-5">
              <span className="w-8 h-px bg-[#009EBC]" aria-hidden="true" />
              Contacto
              <span className="w-8 h-px bg-[#009EBC]" aria-hidden="true" />
            </p>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl leading-[1.1] text-white">
              Estamos para <span className="text-[#33c3df]">ayudarte</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-[#e4e6e8]">
              Información sobre nuestros principales canales de contacto
            </p>
          </div>
        </section>

        <ContactSection />
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
