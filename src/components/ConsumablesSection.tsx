'use client';

import React, { useState } from 'react';
import { Product } from '@/types/product';
import { Package, CheckCircle2, MessageCircle, FileText, ArrowUpRight } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/data';
import ProductModal from './ProductModal';

interface ConsumablesSectionProps {
  products: Product[];
}

export default function ConsumablesSection({ products }: ConsumablesSectionProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Filter only consumables
  const consumables = products.filter((p) => p.category === 'consumible');

  return (
    <section id="consumibles" className="py-24 bg-slate-50 relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-slate-200">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              <Package className="w-3.5 h-3.5" />
              Insumos & Desechables Quirúrgicos
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Consumibles de Alta Precisión para Urología
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Material estéril y biocompatible diseñado para optimizar el rendimiento de sus equipos láser y endourológicos. Disponibilidad continua y entrega prioritaria a clínicas y hospitales.
            </p>
          </div>

          <a
            href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent('Hola Mednova, solicito cotización para compra de lote de consumibles urológicos.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-md transition-colors shrink-0"
          >
            <span>Cotizar Lote Hospitalario</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Consumables List */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {consumables.map((item) => {
            const waText = item.whatsapp_message || `Hola Mednova, solicito cotizar consumibles: ${item.name}`;
            const waUrl = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(waText)}`;

            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div 
                    onClick={() => setSelectedProduct(item)}
                    className="relative aspect-video rounded-2xl bg-slate-100 overflow-hidden cursor-pointer"
                  >
                    <img
                      src={item.images[0] || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80'}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-600 text-white shadow">
                      Stock Permanente
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{item.brand} • {item.model}</span>
                    <h3 
                      onClick={() => setSelectedProduct(item)}
                      className="text-base font-bold text-slate-900 mt-0.5 group-hover:text-blue-600 transition-colors cursor-pointer line-clamp-1"
                    >
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                      {item.short_description}
                    </p>
                  </div>

                  {item.features && item.features.length > 0 && (
                    <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-600">
                      {item.features.slice(0, 2).map((feat, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="truncate text-[11px]">{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-5 border-t border-slate-100 mt-4 flex items-center gap-2">
                  <button
                    onClick={() => setSelectedProduct(item)}
                    className="flex-1 py-2 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
                  >
                    Ficha Técnica
                  </button>
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Cotizar</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
}
