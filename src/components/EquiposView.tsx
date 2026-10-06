'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Search, ArrowUpRight, SlidersHorizontal, Sparkles } from 'lucide-react';
import { Product } from '@/types/product';
import { INITIAL_PRODUCTS, INITIAL_SPECIALTIES } from '@/lib/data';
import { fetchProducts } from '@/lib/supabase';

export default function EquiposView() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [loading, setLoading] = useState(true);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
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

  // Filter only equipment products (category === 'equipo')
  const equipmentProducts = useMemo(() => {
    return products.filter((p) => p.category === 'equipo');
  }, [products]);

  // Extract distinct specialties available in equipment
  const specialties = useMemo(() => {
    const set = new Set<string>();
    equipmentProducts.forEach((p) => {
      if (p.specialty) set.add(p.specialty);
    });
    return Array.from(set);
  }, [equipmentProducts]);

  // Apply specialty and search filters
  const filteredEquipos = useMemo(() => {
    return equipmentProducts.filter((item) => {
      const matchesSpecialty =
        selectedSpecialty === 'all' || item.specialty === selectedSpecialty;

      const q = searchTerm.trim().toLowerCase();
      const matchesSearch =
        q === '' ||
        item.name.toLowerCase().includes(q) ||
        item.model.toLowerCase().includes(q) ||
        item.brand.toLowerCase().includes(q) ||
        item.specialty.toLowerCase().includes(q) ||
        item.short_description.toLowerCase().includes(q);

      return matchesSpecialty && matchesSearch;
    });
  }, [equipmentProducts, selectedSpecialty, searchTerm]);

  return (
    <div className="w-full">
      {/* Dark Technical Header & Controls Banner */}
      <div className="w-full bg-[#001041] text-white relative overflow-hidden border-b border-dashed border-[#D2D3D5]/20">
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#009EBC]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#25b895]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Page Title & Context Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-8 sm:pb-10 relative z-10">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-dashed border-[#009EBC]/40 text-teal-ink bg-[#009EBC]/10 text-xs font-mono-tech tracking-widest uppercase">
              <span className="opacity-70">02.1</span>
              <span>•</span>
              <span>Equipamiento Quirúrgico Urológico</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h1 className="font-heading font-light uppercase text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight">
                  Equipos &amp; Tecnología
                </h1>
                <p className="text-sm sm:text-sm text-[#D2D3D5] leading-relaxed max-w-2xl mt-2 font-mono-tech">
                  Generadores láser Holmium y Tulio TFL, torres laparoscópicas 4K UHD, endoscopía flexible y sistemas de resección bipolar con respaldo biomédico certificado en quirófano.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="px-3.5 py-1.5 rounded-full border border-dashed border-white/20 bg-white/5 text-sm font-mono-tech text-[#D2D3D5]">
                  <span className="font-bold text-teal-ink">{filteredEquipos.length}</span>
                  <span className="opacity-60 ml-1.5">/ {equipmentProducts.length} {equipmentProducts.length === 1 ? 'EQUIPO' : 'EQUIPOS'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Gertix Studio Controls (.post-filter__controls style) */}
          <div className="mt-8 pt-6 border-t border-dashed border-white/15 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input Box */}
            <div className="flex items-center border border-dashed border-white/20 bg-white/5 px-3.5 py-2 rounded-sm w-full md:w-80 transition-colors focus-within:border-[#009EBC] focus-within:bg-white/10">
              <Search className="w-3.5 h-3.5 text-teal-ink mr-2 shrink-0" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="BUSCAR EQUIPO O MODELO..."
                className="w-full bg-transparent border-none outline-none font-mono-tech text-xs uppercase text-white placeholder:text-[#8c9096]"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="text-xs text-white/50 hover:text-white px-1 font-mono cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Specialty Selector Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              <button
                onClick={() => setSelectedSpecialty('all')}
                className={`px-3 py-1.5 text-xs font-mono-tech uppercase tracking-wider rounded-sm transition-all whitespace-nowrap cursor-pointer ${
                  selectedSpecialty === 'all'
                    ? 'bg-teal-ink text-white font-semibold shadow-sm'
                    : 'bg-white/5 text-[#D2D3D5] border border-dashed border-white/20 hover:border-[#009EBC] hover:text-white hover:bg-white/10'
                }`}
              >
                TODOS
              </button>

              {specialties.map((spec) => {
                const isActive = selectedSpecialty === spec;
                return (
                  <button
                    key={spec}
                    onClick={() => setSelectedSpecialty(spec)}
                    className={`px-3 py-1.5 text-xs font-mono-tech uppercase tracking-wider rounded-sm transition-all whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'bg-teal-ink text-white font-semibold shadow-sm'
                        : 'bg-white/5 text-[#D2D3D5] border border-dashed border-white/20 hover:border-[#009EBC] hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {spec}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Gertix Studio 4-Column Grid (#post-filter__grid style) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 pb-20">
        {filteredEquipos.length === 0 ? (
          <div className="border border-dashed border-[#D2D3D5] bg-white p-12 text-center rounded-sm space-y-3">
            <p className="text-xs uppercase font-mono-tech text-[#334155]">
              No se encontraron equipos para el criterio seleccionado.
            </p>
            <button
              onClick={() => {
                setSelectedSpecialty('all');
                setSearchTerm('');
              }}
              className="text-xs text-teal-ink hover:underline font-semibold uppercase font-mono-tech"
            >
              Restablecer filtros →
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-dashed border-[#D2D3D5] bg-white">
            {filteredEquipos.map((equipo) => {
              const imageSrc =
                equipo.images && equipo.images.length > 0
                  ? equipo.images[0]
                  : 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80';

              const displayDate = equipo.created_at
                ? equipo.created_at.slice(0, 10)
                : '2026-03-01';

              return (
                <article
                  key={equipo.id}
                  className="group relative border-r border-b border-dashed border-[#D2D3D5] bg-white flex flex-col transition-colors duration-200 hover:bg-[#fafafa]"
                >
                  {/* Link wrapper navigating to personalized equipment page */}
                  <Link
                    href={`/equipos/${equipo.slug}`}
                    className="flex flex-col h-full text-inherit no-underline overflow-hidden"
                  >
                    {/* Card Meta Header (Gertix Studio .meta style) */}
                    <header className="flex items-start justify-between gap-2 p-3 min-h-[3.75rem] border-b border-dashed border-[#D2D3D5] bg-white group-hover:bg-[#f8f9fa] transition-colors">
                      <h2 className="m-0 text-xs font-mono-tech font-semibold uppercase text-[#001041] line-clamp-2 leading-tight tracking-tight flex-1">
                        {equipo.name}
                      </h2>
                      <span className="text-xs font-mono text-[#334155] whitespace-nowrap shrink-0 pt-0.5">
                        {equipo.model}
                      </span>
                    </header>

                    {/* Thumbnail Image Container */}
                    <div className="relative w-full aspect-square p-3 bg-white flex items-center justify-center overflow-hidden">
                      <img
                        src={imageSrc}
                        alt={equipo.name}
                        loading="lazy"
                        className="w-full h-full object-contain p-2 rounded-sm transition-transform duration-500 ease-out group-hover:scale-105"
                      />

                      {/* Floating specialty badge on image */}
                      <div className="absolute top-4 left-4">
                        <span className="px-2 py-0.5 text-xs font-mono-tech font-bold uppercase tracking-wider bg-[#001041]/85 backdrop-blur-xs text-white rounded-xs border border-white/20">
                          {equipo.specialty.split(' ')[0]}
                        </span>
                      </div>
                    </div>

                    {/* Excerpt and Read More Action Footer */}
                    <div className="p-3 pt-2.5 border-t border-dashed border-[#D2D3D5] flex flex-col justify-between gap-3 bg-[#fdfdfd] group-hover:bg-[#f5f6f7] transition-colors flex-1">
                      <p className="text-sm text-[#334155] line-clamp-2 leading-relaxed font-mono-tech m-0">
                        {equipo.short_description}
                      </p>

                      <div className="pt-2 border-t border-dashed border-[#D2D3D5]/60 flex items-center justify-between text-sm font-mono-tech">
                        <span className="text-xs text-[#334155] uppercase tracking-wider">
                          {displayDate}
                        </span>
                        
                        <span className="inline-flex items-center gap-1 text-sm font-bold text-[#001041] group-hover:text-teal-ink transition-colors">
                          <span className="relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-current after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:origin-left">
                            VER EQUIPO
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
