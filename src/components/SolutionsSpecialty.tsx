'use client';

import React, { useState } from 'react';
import { Product } from '@/types/product';
import { INITIAL_SPECIALTIES, COMPANY_INFO } from '@/lib/data';
import { ArrowRight, Eye, MessageCircle, SlidersHorizontal, Search } from 'lucide-react';
import ProductModal from './ProductModal';

interface SolutionsSpecialtyProps {
  products: Product[];
}

export default function SolutionsSpecialty({ products }: SolutionsSpecialtyProps) {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Filter equipment (only equipments or all if selected)
  const filteredProducts = products.filter((prod) => {
    // Only show products from 'equipo' category in this section, or all if specialty specifically matches
    const matchesCategory = prod.category === 'equipo';
    const matchesSpecialty = selectedSpecialty === 'all' || prod.specialty === selectedSpecialty;
    const matchesSearch = 
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.short_description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSpecialty && matchesSearch;
  });

  return (
    <section id="soluciones" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold tracking-wider uppercase">
            Catálogo Quirúrgico Especializado
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Soluciones por Especialidad Urológica
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Tecnología médica diseñada para maximizar los resultados quirúrgicos, reducir los tiempos operatorios y asegurar la recuperación óptima del paciente.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="mt-12 space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Specialty Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 scrollbar-none">
              <button
                onClick={() => setSelectedSpecialty('all')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                  selectedSpecialty === 'all'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Todas las Especialidades ({products.filter(p => p.category === 'equipo').length})
              </button>

              {INITIAL_SPECIALTIES.filter(s => s.id !== 'consumibles').map((spec) => (
                <button
                  key={spec.id}
                  onClick={() => setSelectedSpecialty(spec.name)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                    selectedSpecialty === spec.name
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {spec.name}
                </button>
              ))}
            </div>

            {/* Quick Search */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar equipo por modelo..."
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const waText = product.whatsapp_message || `Hola Mednova, solicito cotización del equipo ${product.name}`;
            const waUrl = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(waText)}`;

            return (
              <div
                key={product.id}
                className="group bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col"
              >
                {/* Image Box */}
                <div 
                  onClick={() => setSelectedProduct(product)}
                  className="relative aspect-[4/3] bg-slate-100 overflow-hidden cursor-pointer"
                >
                  <img
                    src={product.images[0] || 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80'}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur text-slate-800 shadow-sm">
                      {product.model}
                    </span>
                    {product.status === 'featured' && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-600 text-white shadow-sm">
                        Destacado
                      </span>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-slate-900 text-xs font-semibold shadow-lg">
                      <Eye className="w-3.5 h-3.5 text-blue-600" />
                      Ver Ficha Técnica
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="text-[11px] font-semibold text-blue-600 uppercase tracking-wide">
                      {product.specialty}
                    </div>
                    <h3 
                      onClick={() => setSelectedProduct(product)}
                      className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors cursor-pointer line-clamp-1"
                    >
                      {product.name}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {product.short_description}
                    </p>
                  </div>

                  {/* Highlights */}
                  {product.features && product.features.length > 0 && (
                    <div className="pt-2 border-t border-slate-100 space-y-1">
                      <div className="text-[10px] uppercase font-bold text-slate-400">Características Clave</div>
                      <p className="text-[11px] text-slate-600 truncate">
                        • {product.features[0]}
                      </p>
                      {product.features[1] && (
                        <p className="text-[11px] text-slate-600 truncate">
                          • {product.features[1]}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="pt-4 border-t border-slate-100 flex items-center gap-2">
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="flex-1 py-2.5 px-3 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Detalles</span>
                    </button>
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-colors flex items-center justify-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Cotizar</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-slate-50 rounded-3xl border border-dashed border-slate-200 mt-8">
            <p className="text-sm font-semibold text-slate-700">No se encontraron equipos con los filtros seleccionados.</p>
            <p className="text-xs text-slate-500 mt-1">Prueba con otra especialidad o limpia tu búsqueda.</p>
            <button
              onClick={() => { setSelectedSpecialty('all'); setSearchQuery(''); }}
              className="mt-4 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold"
            >
              Restablecer Filtros
            </button>
          </div>
        )}

      </div>

      {/* Detail Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
}
