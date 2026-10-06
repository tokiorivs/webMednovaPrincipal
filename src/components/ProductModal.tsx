'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { X, CheckCircle2, MessageCircle, FileDown, Shield, ChevronLeft, ChevronRight, Phone, ArrowUpRight } from 'lucide-react';
import { Product } from '@/types/product';
import { COMPANY_INFO } from '@/lib/data';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!product) return null;

  const currentImage = product.images[activeImageIndex] || product.images[0] || 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80';

  const waMessage = product.whatsapp_message || `Hola Mednova Technologies, deseo solicitar una cotización formal y asesoría técnica para el equipo: ${product.name} (${product.model}).`;
  const waUrl = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(waMessage)}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#001041]/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn font-mono-tech">
      <div 
        className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden border border-[#D2D3D5] flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#D2D3D5] bg-[#f4f5f6]">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold uppercase bg-[#001041] text-white border border-[#009EBC]/30">
              {product.category === 'equipo' ? 'Equipo Médico' : 'Consumible Quirúrgico'}
            </span>
            <span className="text-sm text-[#8c9096] font-medium">
              Especialidad: {product.specialty}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#D2D3D5]/40 text-[#001041] transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Scrollable */}
        <div className="overflow-y-auto p-6 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Left: Images */}
            <div className="md:col-span-5 space-y-3">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#001041] border border-[#D2D3D5] shadow-inner group">
                <img
                  src={currentImage}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-95"
                />
                {product.images.length > 1 && (
                  <div className="absolute inset-0 flex items-center justify-between p-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : product.images.length - 1))}
                      className="p-1.5 rounded-full bg-white/80 backdrop-blur text-[#001041] pointer-events-auto hover:bg-white shadow"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setActiveImageIndex((prev) => (prev < product.images.length - 1 ? prev + 1 : 0))}
                      className="p-1.5 rounded-full bg-white/80 backdrop-blur text-[#001041] pointer-events-auto hover:bg-white shadow"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                        activeImageIndex === idx ? 'border-[#009EBC] ring-2 ring-[#009EBC]/30' : 'border-[#D2D3D5] opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Vista ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Trust Box */}
              <div className="p-4 rounded-2xl bg-[#f4f5f6] border border-[#D2D3D5] space-y-2 text-sm text-[#494f52]">
                <div className="flex items-center gap-2 font-bold text-[#001041]">
                  <Shield className="w-4 h-4 text-teal-ink" />
                  Garantía & Respaldo Quirúrgico Mednova
                </div>
                <p className="text-sm text-[#494f52] leading-relaxed">
                  Todos nuestros equipos cuentan con servicio técnico certificado, repuestos originales y capacitación in situ para su equipo médico.
                </p>
              </div>
            </div>

            {/* Right: Info, Features & Specifications */}
            <div className="md:col-span-7 space-y-6">
              <div>
                <p className="text-xs uppercase tracking-wider font-mono-tech text-teal-ink">{product.brand} • Modelo {product.model}</p>
                <h2 className="font-heading font-light uppercase text-2xl sm:text-3xl text-[#001041] mt-1">{product.name}</h2>
                <p className="text-[#494f52] text-sm mt-3 leading-relaxed">
                  {product.full_description || product.short_description}
                </p>
              </div>

              {/* Key Features */}
              {product.features && product.features.length > 0 && (
                <div className="space-y-2.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#001041]">Ventajas Clínicas & Quirúrgicas</h4>
                  <ul className="space-y-2">
                    {product.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-[#494f52]">
                        <CheckCircle2 className="w-4 h-4 text-teal-ink shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Technical Specifications Table */}
              {product.specifications && Object.keys(product.specifications).length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#001041]">Ficha Técnica & Especificaciones</h4>
                  <div className="rounded-xl border border-[#D2D3D5] overflow-hidden divide-y divide-[#D2D3D5]/60 text-sm">
                    {Object.entries(product.specifications).map(([key, val]) => (
                      <div key={key} className="grid grid-cols-2 p-2.5 bg-[#f4f5f6]/50 hover:bg-[#f4f5f6]">
                        <span className="font-semibold text-[#001041]">{key}</span>
                        <span className="text-[#494f52]">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Modal Footer / Direct Conversion Action Bar */}
        <div className="p-4 sm:p-6 border-t border-[#D2D3D5] bg-[#f4f5f6] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-sm text-[#8c9096] text-center sm:text-left">
            <span className="font-medium text-[#001041]">Cotización formal B2B:</span> Incluye demostración, instalación y soporte técnico.
          </div>
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto flex-wrap sm:flex-nowrap">
            <button
              onClick={onClose}
              className="px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl border border-[#D2D3D5] text-[#001041] hover:bg-[#eaebec] text-sm font-medium transition-colors cursor-pointer"
            >
              Cerrar
            </button>
            <Link
              href={product.category === 'equipo' ? `/equipos/${product.slug}` : `/consumibles/${product.slug}`}
              onClick={onClose}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 sm:py-2.5 rounded-xl bg-[#001041] hover:bg-teal-ink text-white text-sm font-semibold transition-colors"
            >
              <span>Ver Ficha Completa</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2 sm:py-2.5 rounded-xl bg-teal-ink hover:bg-[#00819a] text-white font-semibold text-sm shadow-md shadow-[#009EBC]/25 transition-all hover:shadow-lg"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Cotizar WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
