'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/data';

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close desktop dropdown on outside click or escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProductsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setProductsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Header should be solid with dark text on all subpages, or when scrolled on home
  const isSolid = !isHome || scrolled;

  const isProductsActive =
    pathname === '/productos' ||
    pathname.startsWith('/productos/') ||
    pathname === '/equipos' ||
    pathname === '/consumibles';

  const isPilaresActive =
    pathname === '/pilares-empresariales' || pathname === '/pilares';

  const isEventosActive = pathname === '/eventos';
  const isContactoActive = pathname === '/contacto';
  const isHomeActive = pathname === '/';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 font-mono-tech ${
        isSolid
          ? 'bg-[#f4f5f6]/95 backdrop-blur-md text-[#001041] border-b border-dashed border-[#D2D3D5] shadow-sm'
          : 'bg-transparent text-[#f2f2f2] border-b border-dashed border-white/15'
      }`}
    >
      <div className="w-full px-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-14 md:h-16">
          
          {/* Dynamic Logo based on solid/transparent state */}
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src={
                isSolid
                  ? '/images/Logo_color_fondo_blanco_horizontal 2.webp'
                  : '/images/Logo_claro_fondo_oscuro_horizontal.webp'
              }
              alt="Mednova Technologies"
              className="h-8 sm:h-9 w-auto object-contain transition-opacity duration-200 group-hover:opacity-90"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {/* 01 HOME */}
            <Link
              href="/"
              className={`text-[11px] xl:text-xs tracking-wider px-2.5 py-1 rounded-full border border-dashed transition-all duration-150 ${
                isHomeActive
                  ? isSolid
                    ? 'border-[#17181a] text-[#17181a] bg-black/5 font-semibold'
                    : 'border-white text-white bg-white/10 font-semibold'
                  : isSolid
                  ? 'border-transparent text-[#17181a]/90 hover:border-[#17181a] hover:text-[#17181a]'
                  : 'text-[#f2f2f2]/90 hover:border-[#f2f2f2] hover:text-white border-transparent'
              }`}
            >
              <span className="opacity-50 mr-1">01</span>
              HOME
            </Link>

            {/* 02 PRODUCTOS (Dropdown + Dedicated Page Link) */}
            <div
              className="relative"
              ref={dropdownRef}
              onMouseEnter={() => setProductsOpen(true)}
              onMouseLeave={() => setProductsOpen(false)}
            >
              <div
                className={`inline-flex items-center rounded-full border border-dashed transition-all duration-150 ${
                  isProductsActive || productsOpen
                    ? isSolid
                      ? 'border-[#17181a] text-[#17181a] bg-black/5'
                      : 'border-white text-white bg-white/10'
                    : isSolid
                    ? 'border-transparent text-[#17181a]/90 hover:border-[#17181a] hover:text-[#17181a]'
                    : 'border-transparent text-[#f2f2f2]/90 hover:border-[#f2f2f2] hover:text-white'
                }`}
              >
                {/* Main link directly to /productos */}
                <Link
                  href="/productos"
                  onClick={() => setProductsOpen(false)}
                  className="text-[11px] xl:text-xs tracking-wider pl-2.5 pr-1 py-1"
                >
                  <span className="opacity-50 mr-1">02</span>
                  PRODUCTOS
                </Link>

                {/* Dropdown toggle chevron */}
                <button
                  type="button"
                  onClick={() => setProductsOpen((prev) => !prev)}
                  className="pr-2 pl-0.5 py-1 text-inherit cursor-pointer hover:opacity-70 transition-opacity"
                  aria-expanded={productsOpen}
                  aria-label="Abrir submenú de productos"
                >
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      productsOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </div>

              {/* Dropdown Menu */}
              {productsOpen && (
                <div
                  className={`absolute top-full left-0 mt-1 w-64 rounded-xl border border-dashed p-1.5 shadow-2xl animate-in fade-in slide-in-from-top-1 duration-150 z-50 backdrop-blur-md ${
                    isSolid
                      ? 'bg-[#f2f2f2]/98 border-[#71797a]/40 text-[#17181a]'
                      : 'bg-[#17181a]/95 border-[#71797a]/50 text-[#f2f2f2]'
                  }`}
                >
                  {/* Item 0: Ver todos los productos */}
                  <Link
                    href="/productos"
                    onClick={() => setProductsOpen(false)}
                    className={`group flex items-center justify-between p-2 rounded-lg text-xs font-semibold tracking-wider uppercase transition-colors ${
                      isSolid
                        ? 'hover:bg-black/5 text-[#17181a]'
                        : 'hover:bg-white/10 text-[#f2f2f2]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] opacity-60 font-mono">02.0</span>
                      <span>TODOS LOS PRODUCTOS</span>
                    </div>
                    <span className="text-[11px] opacity-0 group-hover:opacity-100 transition-opacity">
                      →
                    </span>
                  </Link>

                  <div
                    className={`my-1 border-t border-dashed ${
                      isSolid ? 'border-[#71797a]/20' : 'border-[#71797a]/30'
                    }`}
                  />

                  {/* Item 1: Equipos */}
                  <Link
                    href="/equipos"
                    onClick={() => setProductsOpen(false)}
                    className={`group flex items-start gap-2.5 p-2 rounded-lg transition-colors ${
                      pathname === '/equipos'
                        ? isSolid
                          ? 'bg-black/10 text-[#17181a]'
                          : 'bg-white/15 text-white'
                        : isSolid
                        ? 'hover:bg-black/5 text-[#17181a]'
                        : 'hover:bg-white/10 text-[#f2f2f2]'
                    }`}
                  >
                    <span className="text-[10px] opacity-60 font-mono mt-0.5">02.1</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold tracking-wider uppercase">
                          EQUIPOS
                        </span>
                        <span className="text-[11px] opacity-0 group-hover:opacity-100 transition-opacity">
                          →
                        </span>
                      </div>
                      <p className="text-[10px] opacity-70 mt-0.5 leading-snug">
                        Láseres HoLEP/ThuLEP, torres 4K e instrumental
                      </p>
                    </div>
                  </Link>

                  <div
                    className={`my-1 border-t border-dashed ${
                      isSolid ? 'border-[#71797a]/20' : 'border-[#71797a]/30'
                    }`}
                  />

                  {/* Item 2: Consumibles */}
                  <Link
                    href="/consumibles"
                    onClick={() => setProductsOpen(false)}
                    className={`group flex items-start gap-2.5 p-2 rounded-lg transition-colors ${
                      pathname === '/consumibles'
                        ? isSolid
                          ? 'bg-black/10 text-[#17181a]'
                          : 'bg-white/15 text-white'
                        : isSolid
                        ? 'hover:bg-black/5 text-[#17181a]'
                        : 'hover:bg-white/10 text-[#f2f2f2]'
                    }`}
                  >
                    <span className="text-[10px] opacity-60 font-mono mt-0.5">02.2</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold tracking-wider uppercase">
                          CONSUMIBLES
                        </span>
                        <span className="text-[11px] opacity-0 group-hover:opacity-100 transition-opacity">
                          →
                        </span>
                      </div>
                      <p className="text-[10px] opacity-70 mt-0.5 leading-snug">
                        Fibras ópticas, catéteres y desechables estériles
                      </p>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* 03 PILARES EMPRESARIALES */}
            <Link
              href="/pilares-empresariales"
              className={`text-[11px] xl:text-xs tracking-wider px-2.5 py-1 rounded-full border border-dashed transition-all duration-150 ${
                isPilaresActive
                  ? isSolid
                    ? 'border-[#17181a] text-[#17181a] bg-black/5 font-semibold'
                    : 'border-white text-white bg-white/10 font-semibold'
                  : isSolid
                  ? 'border-transparent text-[#17181a]/90 hover:border-[#17181a] hover:text-[#17181a]'
                  : 'text-[#f2f2f2]/90 hover:border-[#f2f2f2] hover:text-white border-transparent'
              }`}
            >
              <span className="opacity-50 mr-1">03</span>
              PILARES EMPRESARIALES
            </Link>

            {/* 04 EVENTOS */}
            <Link
              href="/eventos"
              className={`text-[11px] xl:text-xs tracking-wider px-2.5 py-1 rounded-full border border-dashed transition-all duration-150 ${
                isEventosActive
                  ? isSolid
                    ? 'border-[#17181a] text-[#17181a] bg-black/5 font-semibold'
                    : 'border-white text-white bg-white/10 font-semibold'
                  : isSolid
                  ? 'border-transparent text-[#17181a]/90 hover:border-[#17181a] hover:text-[#17181a]'
                  : 'text-[#f2f2f2]/90 hover:border-[#f2f2f2] hover:text-white border-transparent'
              }`}
            >
              <span className="opacity-50 mr-1">04</span>
              EVENTOS
            </Link>

            {/* 05 CONTACTO */}
            <Link
              href="/contacto"
              className={`text-[11px] xl:text-xs tracking-wider px-2.5 py-1 rounded-full border border-dashed transition-all duration-150 ${
                isContactoActive
                  ? isSolid
                    ? 'border-[#17181a] text-[#17181a] bg-black/5 font-semibold'
                    : 'border-white text-white bg-white/10 font-semibold'
                  : isSolid
                  ? 'border-transparent text-[#17181a]/90 hover:border-[#17181a] hover:text-[#17181a]'
                  : 'text-[#f2f2f2]/90 hover:border-[#f2f2f2] hover:text-white border-transparent'
              }`}
            >
              <span className="opacity-50 mr-1">05</span>
              CONTACTO
            </Link>
          </nav>

          {/* Right Action: Minimalist CTA Pill */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent('Hola Mednova, solicito asesoría urológica.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-[11px] uppercase tracking-wider font-semibold px-4 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                isSolid
                  ? 'bg-[#001041] text-white hover:bg-[#009EBC] shadow-sm shadow-[#001041]/20'
                  : 'bg-[#009EBC] text-white hover:bg-[#00819a] hover:scale-105 shadow-md shadow-[#009EBC]/30'
              }`}
            >
              <span>COTIZAR</span>
              <span className="text-[10px]">→</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-inherit hover:opacity-75 transition-opacity cursor-pointer"
              aria-label="Toggle navigation"
            >
              {isOpen ? (
                <div className="w-6 h-6 flex items-center justify-center font-mono text-lg font-bold">
                  ✕
                </div>
              ) : (
                <svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="14" cy="14" r="2.5" fill="currentColor"/>
                  <circle cx="26" cy="14" r="2.5" fill="currentColor"/>
                  <circle cx="14" cy="26" r="2.5" fill="currentColor"/>
                  <circle cx="26" cy="26" r="2.5" fill="currentColor"/>
                </svg>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden bg-[#17181a] text-[#f2f2f2] border-b border-dashed border-[#71797a]/40 px-6 py-8 animate-fadeIn font-mono-tech">
          <nav className="flex flex-col gap-3">
            {/* 01 Home */}
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 py-2 text-sm tracking-widest text-[#f2f2f2]/80 hover:text-white border-b border-dashed border-[#494f52]/40"
            >
              <span className="text-xs text-emerald-400 font-bold">01</span>
              <span>HOME</span>
            </Link>

            {/* 02 Productos with accordion for Equipos & Consumibles */}
            <div className="border-b border-dashed border-[#494f52]/40">
              <div className="w-full flex items-center justify-between py-2 text-sm tracking-widest text-[#f2f2f2]/80 hover:text-white">
                <Link
                  href="/productos"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 flex-1"
                >
                  <span className="text-xs text-emerald-400 font-bold">02</span>
                  <span>PRODUCTOS</span>
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileProductsOpen((prev) => !prev)}
                  className="p-1 cursor-pointer hover:text-white"
                  aria-label="Expandir submenú"
                >
                  <ChevronDown
                    className={`w-4 h-4 text-[#f2f2f2]/60 transition-transform duration-200 ${
                      mobileProductsOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </div>

              {mobileProductsOpen && (
                <div className="pl-6 pb-2 pt-1 flex flex-col gap-2">
                  <Link
                    href="/productos"
                    onClick={() => {
                      setMobileProductsOpen(false);
                      setIsOpen(false);
                    }}
                    className="flex items-center justify-between py-1.5 text-xs tracking-wider text-[#f2f2f2]/70 hover:text-white"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-emerald-400/80">02.0</span>
                      <span>TODOS LOS PRODUCTOS</span>
                    </div>
                    <span className="text-[10px] text-slate-400">→</span>
                  </Link>
                  <Link
                    href="/equipos"
                    onClick={() => {
                      setMobileProductsOpen(false);
                      setIsOpen(false);
                    }}
                    className="flex items-center justify-between py-1.5 text-xs tracking-wider text-[#f2f2f2]/70 hover:text-white"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-emerald-400/80">02.1</span>
                      <span>EQUIPOS</span>
                    </div>
                    <span className="text-[10px] text-slate-400">→</span>
                  </Link>
                  <Link
                    href="/consumibles"
                    onClick={() => {
                      setMobileProductsOpen(false);
                      setIsOpen(false);
                    }}
                    className="flex items-center justify-between py-1.5 text-xs tracking-wider text-[#f2f2f2]/70 hover:text-white"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-emerald-400/80">02.2</span>
                      <span>CONSUMIBLES</span>
                    </div>
                    <span className="text-[10px] text-slate-400">→</span>
                  </Link>
                </div>
              )}
            </div>

            {/* 03 Pilares empresariales */}
            <Link
              href="/pilares-empresariales"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 py-2 text-sm tracking-widest text-[#f2f2f2]/80 hover:text-white border-b border-dashed border-[#494f52]/40"
            >
              <span className="text-xs text-emerald-400 font-bold">03</span>
              <span>PILARES EMPRESARIALES</span>
            </Link>

            {/* 04 Eventos */}
            <Link
              href="/eventos"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 py-2 text-sm tracking-widest text-[#f2f2f2]/80 hover:text-white border-b border-dashed border-[#494f52]/40"
            >
              <span className="text-xs text-emerald-400 font-bold">04</span>
              <span>EVENTOS</span>
            </Link>

            {/* 05 Contacto */}
            <Link
              href="/contacto"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 py-2 text-sm tracking-widest text-[#f2f2f2]/80 hover:text-white border-b border-dashed border-[#494f52]/40"
            >
              <span className="text-xs text-emerald-400 font-bold">05</span>
              <span>CONTACTO</span>
            </Link>

            <div className="pt-4 flex flex-col gap-3">
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent('Hola Mednova, solicito cotización de equipos.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-3 rounded-full bg-[#f2f2f2] text-[#17181a] font-bold text-xs uppercase tracking-wider"
              >
                COTIZAR CON ASESOR →
              </a>
              <Link
                href="/admin"
                onClick={() => setIsOpen(false)}
                className="text-center text-[11px] text-slate-400 hover:text-white py-1"
              >
                [ Acceso Administrativo ]
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
