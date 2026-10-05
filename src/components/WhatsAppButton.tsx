'use client';

import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/data';

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(true);

  const defaultMsg = 'Hola Mednova Technologies, deseo información y cotización de equipos de urología.';
  const waUrl = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(defaultMsg)}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-end flex-col gap-2">
      {/* Interactive Tooltip Callout */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-white text-[#001041] text-xs py-2 px-3 rounded-2xl shadow-xl border border-[#D2D3D5] font-mono-tech animate-bounce">
          <span className="font-semibold">¿Necesitas cotización inmediata?</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-[#8c9096] hover:text-[#001041] p-0.5 rounded-full"
            aria-label="Cerrar aviso"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-[#009EBC] hover:bg-[#00819a] text-white shadow-xl shadow-[#009EBC]/35 flex items-center justify-center transition-all hover:scale-110 active:scale-95 group"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="w-7 h-7 group-hover:rotate-12 transition-transform" />
      </a>
    </div>
  );
}
