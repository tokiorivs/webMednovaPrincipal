'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Search, ArrowUpRight, Sparkles, Shield, Zap } from 'lucide-react';
import { Product } from '@/types/product';
import { INITIAL_PRODUCTS } from '@/lib/data';
import { fetchProducts } from '@/lib/supabase';

export default function ConsumiblesView() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    async function loadData() {
      try {
        const loaded = await fetchProducts();
        if (loaded && loaded.length > 0) {
          setProducts(loaded);
        }
      } catch (err) {
        console.warn('Error loading products from Supabase, using initial data', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Filter only consumable products (category === 'consumible')
  const consumableProducts = useMemo(() => {
    return products.filter((p) => p.category === 'consumible');
  }, [products]);

  // Distinct category filters
  const categories = useMemo(() => [
    { id: 'all', label: 'TODOS' },
    { id: 'fibras', label: 'FIBRAS LÁSER' },
    { id: 'endourologia', label: 'ENDOUROLOGÍA' },
    { id: 'stents', label: 'STENTS & ACCESO' },
  ], []);

  // Filtered consumables
  const filteredConsumibles = useMemo(() => {
    return consumableProducts.filter((item) => {
      let matchesCat = true;
      if (selectedCategory === 'fibras') {
        matchesCat = item.slug.includes('fibra') || item.specialty.toLowerCase().includes('litotricia') || item.name.toLowerCase().includes('fibra');
      } else if (selectedCategory === 'endourologia') {
        matchesCat = item.specialty.toLowerCase().includes('endourología') || item.name.toLowerCase().includes('canastilla') || item.name.toLowerCase().includes('catéter');
      } else if (selectedCategory === 'stents') {
        matchesCat = item.name.toLowerCase().includes('catéter') || item.slug.includes('doble-j') || item.name.toLowerCase().includes('vaina');
      }

      const q = searchTerm.trim().toLowerCase();
      const matchesSearch =
        q === '' ||
        item.name.toLowerCase().includes(q) ||
        item.model.toLowerCase().includes(q) ||
        item.brand.toLowerCase().includes(q) ||
        item.specialty.toLowerCase().includes(q) ||
        item.short_description.toLowerCase().includes(q);

      return matchesCat && matchesSearch;
    });
  }, [consumableProducts, selectedCategory, searchTerm]);

  return (
    <div className="w-full">
      {/* Page Title & Context Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-dashed border-[#D2D3D5] text-[#001041] bg-[#001041]/5 text-xs font-mono-tech tracking-widest uppercase">
            <span className="opacity-60">02.2</span>
            <span>•</span>
            <span>Insumos &amp; Desechables Quirúrgicos</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="font-heading font-light uppercase text-3xl sm:text-5xl lg:text-6xl text-[#001041] tracking-tight">
                Consumibles Quirúrgicos
              </h1>
              <p className="text-xs sm:text-sm text-[#494f52] leading-relaxed max-w-2xl mt-2 font-mono-tech">
                Fibras ópticas de cuarzo de alta pureza para láser Tulio TFL y Holmium, stents ureterales Doble J, canastillas tipless de Nitinol y vainas de acceso con certificación médica internacional.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="px-3.5 py-1.5 rounded-full border border-dashed border-[#D2D3D5] bg-white text-[11px] font-mono-tech text-[#494f52]">
                <span className="font-bold text-[#001041]">{filteredConsumibles.length}</span>
                <span className="opacity-60 ml-1.5">/ {consumableProducts.length} {consumableProducts.length === 1 ? 'PRODUCTO' : 'PRODUCTOS'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Controls (.post-filter__controls style) */}
        <div className="mt-10 pt-6 border-t border-dashed border-[#D2D3D5] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Input Box */}
          <div className="flex items-center border border-dashed border-[#D2D3D5] bg-white px-3.5 py-2 rounded-sm w-full md:w-80 transition-colors focus-within:border-[#001041] focus-within:ring-1 focus-within:ring-[#001041]/10">
            <Search className="w-3.5 h-3.5 text-[#71797a] mr-2 shrink-0" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="BUSCAR CONSUMIBLE O FIBRA..."
              className="w-full bg-transparent border-none outline-none font-mono-tech text-xs uppercase text-[#001041] placeholder:text-[#9bacae]"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="text-[10px] text-[#71797a] hover:text-[#001041] px-1 font-mono"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Selector Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 text-[11px] font-mono-tech uppercase tracking-wider rounded-sm transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[#001041] text-white font-semibold shadow-sm'
                      : 'bg-white text-[#494f52] border border-dashed border-[#D2D3D5] hover:border-[#001041] hover:text-[#001041]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grid: 4-Column Technical Product Showcase */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {filteredConsumibles.length === 0 ? (
          <div className="border border-dashed border-[#D2D3D5] bg-white p-12 text-center rounded-sm space-y-3">
            <p className="text-xs uppercase font-mono-tech text-[#71797a]">
              No se encontraron consumibles para el criterio seleccionado.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchTerm('');
              }}
              className="text-xs text-[#009EBC] hover:underline font-semibold uppercase font-mono-tech"
            >
              Restablecer filtros →
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-dashed border-[#D2D3D5] bg-white">
            {filteredConsumibles.map((consumible) => {
              const imageSrc =
                consumible.images && consumible.images.length > 0
                  ? consumible.images[0]
                  : 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80';

              const isFlagship = consumible.slug === 'fibras-quirurgicas-vpg';

              const displayDate = consumible.created_at
                ? consumible.created_at.slice(0, 10)
                : '2026-03-01';

              return (
                <article
                  key={consumible.id}
                  className={`group relative border-r border-b border-dashed border-[#D2D3D5] bg-white flex flex-col transition-colors duration-200 hover:bg-[#fafafa] ${
                    isFlagship ? 'sm:col-span-2 lg:col-span-2 bg-[#fcfdfe]' : ''
                  }`}
                >
                  {/* Link wrapper navigating to dedicated consumable page */}
                  <Link
                    href={`/consumibles/${consumible.slug}`}
                    className="flex flex-col h-full text-inherit no-underline overflow-hidden"
                  >
                    {/* Card Meta Header */}
                    <header className="flex items-start justify-between gap-2 p-3 min-h-[3.75rem] border-b border-dashed border-[#D2D3D5] bg-white group-hover:bg-[#f8f9fa] transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="text-[10px] font-mono-tech uppercase font-bold text-[#009EBC]">
                            {consumible.brand}
                          </span>
                          {isFlagship && (
                            <span className="px-1.5 py-0.2 rounded-xs bg-[#25b895]/15 text-[#1b8c71] text-[9px] font-mono-tech uppercase font-bold">
                              NUEVO LANZAMIENTO
                            </span>
                          )}
                        </div>
                        <h2 className="m-0 text-xs font-mono-tech font-semibold uppercase text-[#001041] line-clamp-2 leading-tight tracking-tight">
                          {consumible.name}
                        </h2>
                      </div>
                      <span className="text-[10px] font-mono text-[#71797a] whitespace-nowrap shrink-0 pt-0.5">
                        {consumible.model}
                      </span>
                    </header>

                    {/* Thumbnail Image Container */}
                    <div className={`relative w-full ${isFlagship ? 'aspect-[16/9]' : 'aspect-square'} p-3 bg-white flex items-center justify-center overflow-hidden`}>
                      <img
                        src={imageSrc}
                        alt={consumible.name}
                        loading="lazy"
                        className="w-full h-full object-contain p-2 rounded-sm transition-transform duration-500 ease-out group-hover:scale-105"
                      />

                      {/* Floating specialty badge on image */}
                      <div className="absolute top-4 left-4 flex flex-col gap-1">
                        <span className="px-2 py-0.5 text-[9px] font-mono-tech font-bold uppercase tracking-wider bg-[#001041]/85 backdrop-blur-xs text-white rounded-xs border border-white/20">
                          {isFlagship ? 'Cuarzo NA 0.22' : consumible.specialty.split(' ')[0]}
                        </span>
                        {isFlagship && (
                          <span className="px-2 py-0.5 text-[9px] font-mono-tech font-bold uppercase tracking-wider bg-[#009EBC]/90 backdrop-blur-xs text-white rounded-xs">
                            OnePush™ • 150 - 940 µm
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Excerpt and Read More Action Footer */}
                    <div className="p-3 pt-2.5 border-t border-dashed border-[#D2D3D5] flex flex-col justify-between gap-3 bg-[#fdfdfd] group-hover:bg-[#f5f6f7] transition-colors flex-1">
                      <p className="text-[11px] text-[#494f52] line-clamp-2 leading-relaxed font-mono-tech m-0">
                        {consumible.short_description}
                      </p>

                      {isFlagship && consumible.key_metrics && (
                        <div className="grid grid-cols-3 gap-2 py-2 border-t border-dashed border-[#D2D3D5]/60">
                          <div className="text-center p-1.5 rounded-xs bg-[#f4f5f6] border border-[#e5e7eb]">
                            <div className="text-[11px] font-bold text-[#001041] font-mono-tech">150 - 940 µm</div>
                            <div className="text-[9px] text-[#71797a] font-mono-tech uppercase">Núcleos Ópticos</div>
                          </div>
                          <div className="text-center p-1.5 rounded-xs bg-[#f4f5f6] border border-[#e5e7eb]">
                            <div className="text-[11px] font-bold text-[#009EBC] font-mono-tech">OnePush™</div>
                            <div className="text-[9px] text-[#71797a] font-mono-tech uppercase">Alineación Clic</div>
                          </div>
                          <div className="text-center p-1.5 rounded-xs bg-[#f4f5f6] border border-[#e5e7eb]">
                            <div className="text-[11px] font-bold text-[#25b895] font-mono-tech">20 Ciclos</div>
                            <div className="text-[9px] text-[#71797a] font-mono-tech uppercase">Autoclave Reusable</div>
                          </div>
                        </div>
                      )}

                      <div className="pt-2 border-t border-dashed border-[#D2D3D5]/60 flex items-center justify-between text-xs font-mono-tech">
                        <span className="text-[10px] text-[#71797a] uppercase tracking-wider">
                          {displayDate}
                        </span>
                        
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#001041] group-hover:text-[#009EBC] transition-colors">
                          <span className="relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-current after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:origin-left">
                            VER FICHA TÉCNICA
                          </span>
                          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
