'use client';

import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { Product } from '@/types/product';
import ProductModal from './ProductModal';

interface InteractiveGalleryCarouselProps {
  products: Product[];
}

export default function InteractiveGalleryCarousel({ products }: InteractiveGalleryCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Animation & gesture state refs (direct DOM manipulation for butter-smooth 60/120fps)
  const translateRef = useRef<number>(0);
  const isPausedRef = useRef<boolean>(false);
  const isDraggingRef = useRef<boolean>(false);
  const isAnimatingRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const startTranslateRef = useRef<number>(0);
  const dragMovedRef = useRef<boolean>(false);
  const oneSetWidthRef = useRef<number>(0);

  // Curated items with media (combining equipment and videos)
  const galleryItems = useMemo(
    () => [
      {
        id: 'gallery-1',
        date: '2026-08-24',
        code: 'MN-HP100',
        title: 'Láser Holmium 100W • HoLEP',
        category: 'Litotricia & Próstata',
        summary:
          'Fragmentación ultrarrápida de litiasis complejas y enucleación prostática con hemostasia superior en solución fisiológica.',
        video: '/videos/OnePuch_activation.webm',
        image:
          'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
        productMatch: products.find((p) => p.id === 'prod-1') || products[0],
      },
      {
        id: 'gallery-2',
        date: '2026-08-18',
        code: 'MN-TFL60',
        title: 'Láser de Tulio TFL 60W',
        category: 'Pulverización Fina',
        summary:
          'Tecnología Thulium Fiber a 1940 nm. Cero retropulsión en cálices renales inferiores con microfibras de 150 µm.',
        video: '/videos/UMax - ergonomics.webm',
        image:
          'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
        productMatch: products.find((p) => p.id === 'prod-2') || products[1],
      },
      {
        id: 'gallery-3',
        date: '2026-08-12',
        code: 'MN-4K-VISION',
        title: 'Torre Quirúrgica 4K UHD',
        category: 'Imagen Endoscópica',
        summary:
          'Sensor 3-CMOS 4K con realce cromático de bordes tisulares y visualización de microvasculatura en endourología.',
        image:
          'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80',
        productMatch: products.find((p) => p.id === 'prod-3') || products[2],
      },
      {
        id: 'gallery-4',
        date: '2026-08-05',
        code: 'MN-FLEX-HD',
        title: 'Ureteroscopio Digital HD',
        category: 'RIRS Flexible',
        summary:
          'Deflexión activa bidireccional de 275° con chip digital distal CMOS para procedimientos intrarrenales mínimamente invasivos.',
        image:
          'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=800&q=80',
        productMatch: products.find((p) => p.id === 'prod-4') || products[3],
      },
      {
        id: 'gallery-5',
        date: '2026-07-28',
        code: 'MN-FIBER',
        title: 'Fibras Láser de Cuarzo',
        category: 'Consumibles',
        summary:
          'Fibras de sílice de alta pureza con conector universal SMA-905, aptas para alta energía sin fractura en máxima flexión.',
        image:
          'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
        productMatch: products.find((p) => p.id === 'prod-6') || products[4],
      },
      {
        id: 'gallery-6',
        date: '2026-07-20',
        code: 'MN-DJ-LONG',
        title: 'Catéteres Doble J Hidrofílicos',
        category: 'Stents Ureterales',
        summary:
          'Recubrimiento hidrofílico de baja fricción y máxima biocompatibilidad para permanencia de hasta 12 meses sin calcificación.',
        image:
          'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&w=800&q=80',
        productMatch: products.find((p) => p.id === 'prod-7') || products[5],
      },
    ],
    [products]
  );

  // Render 3 sets of items to guarantee a seamless buffer on any screen width
  const loopedItems = useMemo(
    () => [...galleryItems, ...galleryItems, ...galleryItems],
    [galleryItems]
  );

  // Exact measurement of 1 set of items (offsetLeft of first clone)
  const updateSetWidth = useCallback(() => {
    if (trackRef.current && trackRef.current.children.length > galleryItems.length) {
      const firstClone = trackRef.current.children[galleryItems.length] as HTMLElement;
      if (firstClone) {
        oneSetWidthRef.current = firstClone.offsetLeft;
      }
    }
  }, [galleryItems.length]);

  // Keep track of width changes via ResizeObserver & window resize
  useEffect(() => {
    updateSetWidth();
    window.addEventListener('resize', updateSetWidth);

    let ro: ResizeObserver | null = null;
    if (trackRef.current && typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => {
        updateSetWidth();
      });
      ro.observe(trackRef.current);
    }

    return () => {
      window.removeEventListener('resize', updateSetWidth);
      ro?.disconnect();
    };
  }, [updateSetWidth]);

  // Infinite smooth continuous auto-scroll loop (Identical to gertix.studio requestAnimationFrame)
  useEffect(() => {
    let animationFrameId: number;
    let lastTimestamp: number | null = null;
    const pixelsPerSecond = 40; // Gertix Studio speed: 40px/s

    const autoScroll = (timestamp: number) => {
      if (lastTimestamp === null) {
        lastTimestamp = timestamp;
      }
      const elapsed = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      const oneSetWidth = oneSetWidthRef.current;

      if (
        oneSetWidth > 0 &&
        !isPausedRef.current &&
        !isDraggingRef.current &&
        !isAnimatingRef.current
      ) {
        // Continuous translation to the left
        translateRef.current -= (pixelsPerSecond * elapsed) / 1000;

        // Gertix Studio infinite wrap modulo formula
        translateRef.current %= oneSetWidth;
        if (translateRef.current > 0) {
          translateRef.current -= oneSetWidth;
        }

        if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(${translateRef.current}px, 0, 0)`;
        }
      }

      animationFrameId = requestAnimationFrame(autoScroll);
    };

    animationFrameId = requestAnimationFrame(autoScroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Drag interaction (Mouse & Touch gestures)
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    isDraggingRef.current = true;
    isPausedRef.current = true;
    startXRef.current = e.clientX;
    startTranslateRef.current = translateRef.current;
    dragMovedRef.current = false;
  };

  useEffect(() => {
    const handleGlobalPointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current) return;
      const delta = e.clientX - startXRef.current;
      if (Math.abs(delta) > 5) {
        dragMovedRef.current = true;
      }

      let current = startTranslateRef.current + delta;
      const oneSetWidth = oneSetWidthRef.current;
      if (oneSetWidth > 0) {
        current %= oneSetWidth;
        if (current > 0) {
          current -= oneSetWidth;
        }
      }
      translateRef.current = current;

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${current}px, 0, 0)`;
      }
    };

    const handleGlobalPointerUp = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        setTimeout(() => {
          dragMovedRef.current = false;
        }, 80);
      }
    };

    window.addEventListener('pointermove', handleGlobalPointerMove);
    window.addEventListener('pointerup', handleGlobalPointerUp);
    window.addEventListener('pointercancel', handleGlobalPointerUp);

    return () => {
      window.removeEventListener('pointermove', handleGlobalPointerMove);
      window.removeEventListener('pointerup', handleGlobalPointerUp);
      window.removeEventListener('pointercancel', handleGlobalPointerUp);
    };
  }, []);

  // Trackpad horizontal wheel support
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      const delta = e.deltaX !== 0 ? e.deltaX : e.shiftKey ? e.deltaY : 0;
      if (Math.abs(delta) > 2) {
        e.preventDefault();
        let current = translateRef.current - delta * 0.85;
        const oneSetWidth = oneSetWidthRef.current;
        if (oneSetWidth > 0) {
          current %= oneSetWidth;
          if (current > 0) {
            current -= oneSetWidth;
          }
        }
        translateRef.current = current;

        if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(${current}px, 0, 0)`;
        }
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, []);

  // Manual Arrow controls (smooth cubic ease-out animation by 1 card step)
  const scroll = (direction: 'left' | 'right') => {
    if (!trackRef.current || isAnimatingRef.current) return;

    const firstChild = trackRef.current.children[0] as HTMLElement | undefined;
    const cardWidth = firstChild ? firstChild.offsetWidth : 380;
    const shift = direction === 'left' ? cardWidth : -cardWidth;

    const startTranslate = translateRef.current;
    const startTime = performance.now();
    const duration = 450; // ms

    isAnimatingRef.current = true;

    const stepAnimation = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Smooth easeOutCubic
      const ease = 1 - Math.pow(1 - progress, 3);

      let current = startTranslate + shift * ease;
      const oneSetWidth = oneSetWidthRef.current;
      if (oneSetWidth > 0) {
        current %= oneSetWidth;
        if (current > 0) {
          current -= oneSetWidth;
        }
      }
      translateRef.current = current;

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${current}px, 0, 0)`;
      }

      if (progress < 1) {
        requestAnimationFrame(stepAnimation);
      } else {
        isAnimatingRef.current = false;
      }
    };

    requestAnimationFrame(stepAnimation);
  };

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
            className="w-10 h-10 rounded-full border border-dashed border-[#D2D3D5] hover:border-[#009EBC] hover:bg-[#001041] hover:text-[#009EBC] transition-all flex items-center justify-center text-sm font-bold cursor-pointer active:scale-95"
            aria-label="Anterior"
          >
            ←
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-10 h-10 rounded-full border border-dashed border-[#D2D3D5] hover:border-[#009EBC] hover:bg-[#001041] hover:text-[#009EBC] transition-all flex items-center justify-center text-sm font-bold cursor-pointer active:scale-95"
            aria-label="Siguiente"
          >
            →
          </button>
        </div>
      </div>

      {/* Carousel Track Container (Identical to gertix.studio infinite rotating track) */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onMouseEnter={() => {
          isPausedRef.current = true;
        }}
        onMouseLeave={() => {
          if (!isDraggingRef.current) {
            isPausedRef.current = false;
          }
        }}
        className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing select-none pb-4"
      >
        <div ref={trackRef} className="flex will-change-transform">
          {loopedItems.map((item, index) => (
            <article
              key={`${item.id}-loop-${index}`}
              onClick={() => {
                if (dragMovedRef.current) return;
                setSelectedProduct(item.productMatch);
              }}
              className="cb-gallery-card group relative cursor-pointer w-[320px] sm:w-[380px] lg:w-[400px] h-[580px] sm:h-[640px] shrink-0 border border-dashed border-[#D2D3D5] border-r-0 hover:border-[#009EBC]"
            >
              {/* Card Header (Gertix Studio: header with title and date/code) */}
              <header className="flex items-center justify-between gap-2 p-3 text-[11px] uppercase tracking-wider text-[#001041] border-b border-dashed border-[#D2D3D5] bg-[#eaebec]/60">
                <span className="font-semibold truncate max-w-[200px]">{item.title}</span>
                <span className="text-[#8c9096] font-mono text-[10px] shrink-0">{item.code}</span>
              </header>

              {/* Card Media (Gertix Studio: thumbnail with clip-path transition and natural optical zoom-out) */}
              <div className="cb-gallery-thumbnail">
                <div className="cb-gallery-media-wrapper">
                  {item.video ? (
                    <video
                      src={item.video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="cb-gallery-media opacity-90"
                    />
                  ) : (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="cb-gallery-media opacity-95"
                    />
                  )}
                  <div className="cb-gallery-badge px-2 py-0.5 rounded-full bg-[#001041]/85 backdrop-blur text-[10px] uppercase text-[#009EBC] font-mono border border-[#009EBC]/30 shadow-xs select-none">
                    {item.category}
                  </div>
                </div>
              </div>

              {/* Card Excerpt (Gertix Studio: expands smoothly from 0 to 11.5rem on hover) */}
              <div className="cb-gallery-excerpt">
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
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </section>
  );
}
