import React from 'react';
import Navbar from '@/components/Navbar';
import ConsumiblesView from '@/components/ConsumiblesView';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: { canonical: '/consumibles' },
  title: 'Consumibles & Fibras Quirúrgicas • Mednova Technologies',
  description: 'Fibras quirúrgicas VPG LaserOne OnePush, HP y LP con núcleo de 150 a 940 µm. Distribuidor exclusivo en Perú.',
  keywords: [
    'fibras quirúrgicas perú',
    'fibras láser urología',
    'vpg laserone perú',
    'fibra onepush',
    'mednova technologies',
  ],
};

export default function ConsumiblesPage() {
  return (
    <div className="min-h-screen bg-[#f4f5f6] flex flex-col font-mono-tech selection:bg-teal-ink selection:text-white">
      <Navbar />

      <main className="flex-1 pt-16 sm:pt-20">
        <ConsumiblesView />
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
