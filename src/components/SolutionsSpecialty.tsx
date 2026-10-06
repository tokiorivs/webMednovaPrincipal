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
    <section id="equipos" className="py-24 bg-white relative scroll-mt-14 font-mono-tech">
      <div id="soluciones" className="absolute -top-14" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-dashed border-[#D2D3D5] text-[#001041] bg-[#001041]/5 text-xs font-mono-tech tracking-widest uppercase">
            02 • Catálogo Quirúrgico Especializado
          </div>
          <h2 className="font-heading font-light uppercase text-3xl sm:text-5xl text-[#001041] tracking-tight">
            Soluciones por Especialidad Urológica
          </h2>
          <p className="text-sm sm:text-sm text-[#494f52] leading-relaxed max-w-2xl mx-auto font-mono-tech">
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
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 font-mono-tech ${
                  selectedSpecialty === 'all'
                    ? 'bg-[#001041] text-white shadow-md shadow-[#001041]/25 border border-[#009EBC]/50'
                    : 'bg-[#f4f5f6] text-[#001041] border border-[#D2D3D5] hover:bg-[#eaebec]'
                }`}
              >
                Todas las Especialidades ({products.filter(p => p.category === 'equipo').length})
              </button>

              {INITIAL_SPECIALTIES.filter(s => s.id !== 'consumibles').map((spec) => (
                <button
                  key={spec.id}
                  onClick={() => setSelectedSpecialty(spec.name)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 font-mono-tech ${
                    selectedSpecialty === spec.name
                      ? 'bg-[#001041] text-white shadow-md shadow-[#001041]/25 border border-[#009EBC]/50'
                      : 'bg-[#f4f5f6] text-[#001041] border border-[#D2D3D5] hover:bg-[#eaebec]'
                  }`}
                >
                  {spec.name}
                </button>
              ))}
            </div>

            {/* Quick Search */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-[#8c9096] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar equipo por modelo..."
                className="w-full pl-9 pr-4 py-2 bg-[#f4f5f6] border border-[#D2D3D5] rounded-xl text-sm text-[#001041] placeholder-[#8c9096] focus:outline-none focus:ring-2 focus:ring-[#009EBC]/20 focus:border-[#009EBC]"
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
                className="group bg-white rounded-3xl border border-[#D2D3D5] overflow-hidden shadow-sm hover:shadow-xl hover:border-[#009EBC] transition-all duration-300 flex flex-col"
              >
                {/* Image Box */}
                <div 
                  onClick={() => setSelectedProduct(product)}
                  className="relative aspect-[4/3] bg-[#001041] overflow-hidden cursor-pointer"
                >
                  <img
                    src={product.images[0] || 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80'}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#001041]/90 backdrop-blur text-white shadow-sm font-mono-tech border border-white/20">
                      {product.model}
                    </span>
                    {product.status === 'featured' && (
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-ink text-white shadow-sm font-mono-tech">
                        Destacado
                      </span>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-[#001041]/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-[#001041] text-sm font-semibold shadow-lg">
                      <Eye className="w-3.5 h-3.5 text-teal-ink" />
                      Ver Ficha Técnica
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-teal-ink uppercase tracking-wide font-mono-tech">
                      {product.specialty}
                    </div>
                    <h3 
                      onClick={() => setSelectedProduct(product)}
                      className="text-lg font-bold text-[#001041] group-hover:text-teal-ink transition-colors cursor-pointer line-clamp-1"
                    >
                      {product.name}
                    </h3>
                    <p className="text-sm text-[#494f52] line-clamp-2 leading-relaxed">
                      {product.short_description}
                    </p>
                  </div>

                  {/* Highlights */}
                  {product.features && product.features.length > 0 && (
                    <div className="pt-2 border-t border-[#D2D3D5]/60 space-y-1">
                      <div className="text-xs uppercase font-bold text-[#8c9096]">Características Clave</div>
                      <p className="text-sm text-[#494f52] truncate">
                        • {product.features[0]}
                      </p>
                      {product.features[1] && (
                        <p className="text-sm text-[#494f52] truncate">
                          • {product.features[1]}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="pt-4 border-t border-[#D2D3D5]/60 flex items-center gap-2">
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="flex-1 py-2.5 px-3 rounded-xl border border-[#D2D3D5] hover:border-[#001041] bg-[#f4f5f6] hover:bg-[#eaebec] text-[#001041] text-sm font-semibold transition-colors flex items-center justify-center gap-1.5 font-mono-tech"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#001041]" />
                      <span>Detalles</span>
                    </button>
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 px-3 rounded-xl bg-teal-ink hover:bg-[#00819a] text-white text-sm font-semibold shadow-md shadow-[#009EBC]/25 transition-colors flex items-center justify-center gap-1.5 font-mono-tech"
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
          <div className="text-center py-16 bg-[#f4f5f6] rounded-3xl border border-dashed border-[#D2D3D5] mt-8">
            <p className="text-sm font-semibold text-[#001041]">No se encontraron equipos con los filtros seleccionados.</p>
            <p className="text-sm text-[#8c9096] mt-1">Prueba con otra especialidad o limpia tu búsqueda.</p>
            <button
              onClick={() => { setSelectedSpecialty('all'); setSearchQuery(''); }}
              className="mt-4 px-4 py-2 rounded-xl bg-[#001041] hover:bg-teal-ink text-white text-sm font-semibold transition-colors"
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
