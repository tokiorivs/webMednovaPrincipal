'use client';

import React, { useRef, useState } from 'react';
import { Product } from '@/types/product';
import ProductModal from './ProductModal';

interface InteractiveGalleryCarouselProps {
  products: Product[];
}

export default function InteractiveGalleryCarousel({ products }: InteractiveGalleryCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 420;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // Curated items with media (combining equipment and videos)
  const galleryItems = [
    {
      id: 'gallery-1',
      date: '2026-08-24',
      code: 'MN-HP100',
      title: 'Láser Holmium 100W • HoLEP',
      category: 'Litotricia & Próstata',
      summary: 'Fragmentación ultrarrápida de litiasis complejas y enucleación prostática con hemostasia superior en solución fisiológica.',
      video: '/videos/OnePuch_activation.webm',
      image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
      productMatch: products.find(p => p.id === 'prod-1') || products[0],
    },
    {
      id: 'gallery-2',
      date: '2026-08-18',
      code: 'MN-TFL60',
      title: 'Láser de Tulio TFL 60W',
      category: 'Pulverización Fina',
      summary: 'Tecnología Thulium Fiber a 1940 nm. Cero retropulsión en cálices renales inferiores con microfibras de 150 µm.',
      video: '/videos/UMax - ergonomics.webm',
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
      productMatch: products.find(p => p.id === 'prod-2') || products[1],
    },
    {
      id: 'gallery-3',
      date: '2026-08-12',
      code: 'MN-4K-VISION',
      title: 'Torre Quirúrgica 4K UHD',
      category: 'Imagen Endoscópica',
      summary: 'Sensor 3-CMOS 4K con realce cromático de bordes tisulares y visualización de microvasculatura en endourología.',
      image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80',
      productMatch: products.find(p => p.id === 'prod-3') || products[2],
    },
    {
      id: 'gallery-4',
      date: '2026-08-05',
      code: 'MN-FLEX-HD',
      title: 'Ureteroscopio Digital HD',
      category: 'RIRS Flexible',
      summary: 'Deflexión activa bidireccional de 275° con chip digital distal CMOS para procedimientos intrarrenales mínimamente invasivos.',
      image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=800&q=80',
      productMatch: products.find(p => p.id === 'prod-4') || products[3],
    },
    {
      id: 'gallery-5',
      date: '2026-07-28',
      code: 'MN-FIBER',
      title: 'Fibras Láser de Cuarzo',
      category: 'Consumibles',
      summary: 'Fibras de sílice de alta pureza con conector universal SMA-905, aptas para alta energía sin fractura en máxima flexión.',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
      productMatch: products.find(p => p.id === 'prod-6') || products[4],
    },
    {
      id: 'gallery-6',
      date: '2026-07-20',
      code: 'MN-DJ-LONG',
      title: 'Catéteres Doble J Hidrofílicos',
      category: 'Stents Ureterales',
      summary: 'Recubrimiento hidrofílico de baja fricción y máxima biocompatibilidad para permanencia de hasta 12 meses sin calcificación.',
      image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&w=800&q=80',
      productMatch: products.find(p => p.id === 'prod-7') || products[5],
    },
  ];

  return (
    <section className="py-20 bg-[#f4f5f6] text-[#001041] border-b border-dashed border-[#D2D3D5] overflow-hidden font-mono-tech">
      
      {/* Top Header of Section with Controls */}
      <div className="w-full px-6 sm:px-12 md:px-16 lg:px-20 mb-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-dashed border-[#D2D3D5] text-xs font-mono-tech tracking-widest uppercase mb-3 text-[#009EBC] bg-[#001041]/5">
            01 • Galería Destacada
          </div>
          <h2 className="font-heading font-light uppercase text-3xl sm:text-5xl tracking-tight text-[#001041]">
            Tecnología en Quirófano
          </h2>
          <p className="text-xs text-[#494f52] mt-1 font-mono-tech">
            Pasa el cursor sobre cada equipo para revelar especificaciones y detalles clínicos.
          </p>
        </div>

        {/* Carousel Arrow Controls (Gertix Studio style) */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => scroll('left')}
            className="w-10 h-10 rounded-full border border-dashed border-[#D2D3D5] hover:border-[#009EBC] hover:bg-[#001041] hover:text-[#009EBC] transition-all flex items-center justify-center text-sm font-bold"
            aria-label="Anterior"
          >
            ←
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-10 h-10 rounded-full border border-dashed border-[#D2D3D5] hover:border-[#009EBC] hover:bg-[#001041] hover:text-[#009EBC] transition-all flex items-center justify-center text-sm font-bold"
            aria-label="Siguiente"
          >
            →
          </button>
        </div>
      </div>

      {/* Carousel Track Container (Identical to gertix.studio .cb-block--post-gallery) */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto scrollbar-none scroll-smooth px-6 sm:px-12 md:px-16 lg:px-20 pb-4"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        <div className="flex">
          {galleryItems.map((item, index) => (
            <article
              key={item.id}
              onClick={() => setSelectedProduct(item.productMatch)}
              style={{ scrollSnapAlign: 'start' }}
              className={`group relative flex flex-col justify-between cursor-pointer w-[320px] sm:w-[380px] lg:w-[400px] h-[580px] sm:h-[640px] shrink-0 border border-dashed border-[#D2D3D5] bg-white hover:border-[#009EBC] transition-colors duration-300 ${
                index !== galleryItems.length - 1 ? 'border-r-0' : ''
              }`}
            >
              {/* Card Header (Gertix Studio: header with title and date/code) */}
              <header className="flex items-center justify-between gap-2 p-3 text-[11px] uppercase tracking-wider text-[#001041] border-b border-dashed border-[#D2D3D5] bg-[#eaebec]/60">
                <span className="font-semibold truncate max-w-[200px]">{item.title}</span>
                <span className="text-[#8c9096] font-mono text-[10px] shrink-0">{item.code}</span>
              </header>

              {/* Card Media (Shrinks smoothly on hover like in Gertix) */}
              <div className="relative flex-1 min-h-0 overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:flex-[0_0_58%] p-2">
                <div className="w-full h-full overflow-hidden rounded-[2px] bg-[#001041] relative">
                  {item.video ? (
                    <video
                      src={item.video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90"
                    />
                  ) : (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-95"
                    />
                  )}
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#001041]/85 backdrop-blur text-[10px] uppercase text-[#009EBC] font-mono border border-[#009EBC]/30">
                    {item.category}
                  </div>
                </div>
              </div>

              {/* Card Excerpt (Hidden by default, EXPANDS smoothly on hover like Gertix) */}
              <div className="flex-[0_0_0px] group-hover:flex-[0_0_185px] overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] px-4 flex flex-col justify-between pb-3 bg-white">
                <div className="pt-2">
                  <p className="text-xs text-[#494f52] leading-relaxed line-clamp-3 font-mono-tech">
                    {item.summary}
                  </p>
                </div>

                {/* Read More link with Gertix arrow */}
                <div className="pt-2 border-t border-dashed border-[#D2D3D5] flex items-center justify-between text-xs text-[#001041] group-hover:text-[#009EBC] transition-colors">
                  <span className="font-bold tracking-wider uppercase text-[11px] group-hover:underline">
                    Ficha Técnica & Cotización
                  </span>
                  <svg
                    width="14"
                    height="8"
                    viewBox="0 0 14 8"
                    fill="none"
                    className="transform group-hover:translate-x-1.5 transition-transform"
                  >
                    <path
                      d="M9.65 0C9.65 2.16 11.6 3.91 14 3.91M9.65 8C9.65 5.84 11.6 4.09 14 4.09M14 4H0"
                      stroke="currentColor"
                      strokeWidth="1.2"
                    />
                  </svg>
                </div>
              </div>

            </article>
          ))}
        </div>
      </div>

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

    </section>
  );
}
