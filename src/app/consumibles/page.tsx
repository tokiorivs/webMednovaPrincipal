import React from 'react';
import Navbar from '@/components/Navbar';
import ConsumiblesView from '@/components/ConsumiblesView';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Consumibles & Fibras Quirúrgicas • Mednova Technologies',
  description: 'Catálogo de fibras ópticas de cuarzo de alta pureza (VPG LaserOne OnePush y SMA-905), catéteres doble J hidrofílicos, canastillas tipless de Nitinol y desechables urológicos.',
  keywords: [
    'fibras quirúrgicas perú',
    'fibras láser urología',
    'vpg laserone perú',
    'onepush bare fiber',
    'fibras láser tulio tfl',
    'catéter doble j lima',
    'canastilla nitinol tipless',
    'consumibles endourología mednova',
  ],
};

export default function ConsumiblesPage() {
  return (
    <div className="min-h-screen bg-[#f4f5f6] flex flex-col font-mono-tech selection:bg-[#009EBC] selection:text-white">
      <Navbar />

      <main className="flex-1 pt-16 sm:pt-20">
        <ConsumiblesView />
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
