'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, MessageCircle, FileDown, Shield, ChevronLeft, ChevronRight, Phone } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div 
        className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold uppercase bg-blue-100 text-blue-700">
              {product.category === 'equipo' ? 'Equipo Médico' : 'Consumible Quirúrgico'}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Especialidad: {product.specialty}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
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
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-inner group">
                <img
                  src={currentImage}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {product.images.length > 1 && (
                  <div className="absolute inset-0 flex items-center justify-between p-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : product.images.length - 1))}
                      className="p-1.5 rounded-full bg-white/80 backdrop-blur text-slate-800 pointer-events-auto hover:bg-white shadow"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setActiveImageIndex((prev) => (prev < product.images.length - 1 ? prev + 1 : 0))}
                      className="p-1.5 rounded-full bg-white/80 backdrop-blur text-slate-800 pointer-events-auto hover:bg-white shadow"
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
                        activeImageIndex === idx ? 'border-blue-600 ring-2 ring-blue-600/30' : 'border-slate-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Vista ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Trust Box */}
              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-2 text-xs text-slate-700">
                <div className="flex items-center gap-2 font-bold text-blue-900">
                  <Shield className="w-4 h-4 text-blue-600" />
                  Garantía & Respaldo Quirúrgico Mednova
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Todos nuestros equipos cuentan con servicio técnico certificado, repuestos originales y capacitación in situ para su equipo médico.
                </p>
              </div>
            </div>

            {/* Right: Info, Features & Specifications */}
            <div className="md:col-span-7 space-y-6">
              <div>
                <p className="text-xs uppercase tracking-wider font-semibold text-blue-600">{product.brand} • Modelo {product.model}</p>
                <h2 className="text-2xl font-bold text-slate-900 mt-1">{product.name}</h2>
                <p className="text-slate-600 text-sm mt-3 leading-relaxed">
                  {product.full_description || product.short_description}
                </p>
              </div>

              {/* Key Features */}
              {product.features && product.features.length > 0 && (
                <div className="space-y-2.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Ventajas Clínicas & Quirúrgicas</h4>
                  <ul className="space-y-2">
                    {product.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Technical Specifications Table */}
              {product.specifications && Object.keys(product.specifications).length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Ficha Técnica & Especificaciones</h4>
                  <div className="rounded-xl border border-slate-200 overflow-hidden divide-y divide-slate-100 text-xs">
                    {Object.entries(product.specifications).map(([key, val]) => (
                      <div key={key} className="grid grid-cols-2 p-2.5 bg-slate-50/40 hover:bg-slate-50">
                        <span className="font-semibold text-slate-700">{key}</span>
                        <span className="text-slate-600">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Modal Footer / Direct Conversion Action Bar */}
        <div className="p-4 sm:p-6 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 text-center sm:text-left">
            <span className="font-medium text-slate-700">Cotización formal B2B:</span> Incluye demostración, instalación y soporte técnico.
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-medium transition-colors"
            >
              Cerrar
            </button>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-md shadow-emerald-600/20 transition-all hover:shadow-lg"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Cotizar por WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
