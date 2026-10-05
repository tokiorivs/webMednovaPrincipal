'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/data';

export default function Navbar() {
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

  // Close desktop dropdown when clicking outside or pressing Escape
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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 font-mono-tech ${
        scrolled
          ? 'bg-[#f2f2f2]/95 backdrop-blur-md text-[#17181a] border-b border-dashed border-[#71797a]/40 shadow-sm'
          : 'bg-transparent text-[#f2f2f2] border-b border-dashed border-white/15'
      }`}
    >
      <div className="w-full px-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-14 md:h-16">
          
          {/* Logo - Minimalist Technical Typographic Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <span className="font-heading font-light tracking-[0.2em] text-lg sm:text-xl uppercase transition-opacity group-hover:opacity-80">
              MEDNOVA<span className="font-mono-tech text-xs tracking-normal opacity-70 ml-1">/tech</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {/* 01 Home */}
            <a
              href="#top"
              className={`text-[11px] xl:text-xs tracking-wider px-2.5 py-1 rounded-full border border-dashed border-transparent transition-all duration-150 ${
                scrolled
                  ? 'text-[#17181a] hover:border-[#17181a] hover:text-[#17181a]'
                  : 'text-[#f2f2f2]/90 hover:border-[#f2f2f2] hover:text-white'
              }`}
            >
              <span className="opacity-50 mr-1">01</span>
              HOME
            </a>

            {/* 02 Productos (Dropdown interactivo) */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setProductsOpen((prev) => !prev)}
                className={`flex items-center gap-1 text-[11px] xl:text-xs tracking-wider px-2.5 py-1 rounded-full border border-dashed transition-all duration-150 cursor-pointer ${
                  productsOpen
                    ? scrolled
                      ? 'border-[#17181a] text-[#17181a] bg-black/5'
                      : 'border-[#f2f2f2] text-white bg-white/10'
                    : scrolled
                    ? 'border-transparent text-[#17181a] hover:border-[#17181a] hover:text-[#17181a]'
                    : 'border-transparent text-[#f2f2f2]/90 hover:border-[#f2f2f2] hover:text-white'
                }`}
                aria-expanded={productsOpen}
                aria-haspopup="true"
              >
                <span className="opacity-50 mr-1">02</span>
                <span>PRODUCTOS</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 ml-0.5 transition-transform duration-200 ${
                    productsOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Submenú desplegable de Productos */}
              {productsOpen && (
                <div
                  className={`absolute top-full left-0 mt-2 w-64 rounded-xl border border-dashed p-1.5 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-150 z-50 backdrop-blur-md ${
                    scrolled
                      ? 'bg-[#f2f2f2]/98 border-[#71797a]/40 text-[#17181a]'
                      : 'bg-[#17181a]/95 border-[#71797a]/50 text-[#f2f2f2]'
                  }`}
                >
                  {/* Item 1: Equipos */}
                  <a
                    href="#equipos"
                    onClick={() => setProductsOpen(false)}
                    className={`group flex items-start gap-2.5 p-2.5 rounded-lg transition-colors ${
                      scrolled
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
                  </a>

                  <div
                    className={`my-1 border-t border-dashed ${
                      scrolled ? 'border-[#71797a]/20' : 'border-[#71797a]/30'
                    }`}
                  />

                  {/* Item 2: Consumibles */}
                  <a
                    href="#consumibles"
                    onClick={() => setProductsOpen(false)}
                    className={`group flex items-start gap-2.5 p-2.5 rounded-lg transition-colors ${
                      scrolled
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
                  </a>
                </div>
              )}
            </div>

            {/* 03 Pilares empresariales */}
            <a
              href="#pilares"
              className={`text-[11px] xl:text-xs tracking-wider px-2.5 py-1 rounded-full border border-dashed border-transparent transition-all duration-150 ${
                scrolled
                  ? 'text-[#17181a] hover:border-[#17181a] hover:text-[#17181a]'
                  : 'text-[#f2f2f2]/90 hover:border-[#f2f2f2] hover:text-white'
              }`}
            >
              <span className="opacity-50 mr-1">03</span>
              PILARES EMPRESARIALES
            </a>

            {/* 04 Eventos */}
            <a
              href="#eventos"
              className={`text-[11px] xl:text-xs tracking-wider px-2.5 py-1 rounded-full border border-dashed border-transparent transition-all duration-150 ${
                scrolled
                  ? 'text-[#17181a] hover:border-[#17181a] hover:text-[#17181a]'
                  : 'text-[#f2f2f2]/90 hover:border-[#f2f2f2] hover:text-white'
              }`}
            >
              <span className="opacity-50 mr-1">04</span>
              EVENTOS
            </a>

            {/* 05 Contacto */}
            <a
              href="#contacto"
              className={`text-[11px] xl:text-xs tracking-wider px-2.5 py-1 rounded-full border border-dashed border-transparent transition-all duration-150 ${
                scrolled
                  ? 'text-[#17181a] hover:border-[#17181a] hover:text-[#17181a]'
                  : 'text-[#f2f2f2]/90 hover:border-[#f2f2f2] hover:text-white'
              }`}
            >
              <span className="opacity-50 mr-1">05</span>
              CONTACTO
            </a>
          </nav>

          {/* Right Action: Minimalist CTA Pill */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent('Hola Mednova, solicito asesoría urológica.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-[11px] uppercase tracking-wider font-semibold px-4 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                scrolled
                  ? 'bg-[#17181a] text-[#f2f2f2] hover:bg-[#494f52]'
                  : 'bg-[#f2f2f2] text-[#17181a] hover:bg-white hover:scale-105'
              }`}
            >
              <span>COTIZAR</span>
              <span className="text-[10px]">→</span>
            </a>
          </div>

          {/* Mobile Menu Button - Gertix Studio 4-dot Grid Trigger */}
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

      {/* Mobile Drawer Menu in Gertix Studio aesthetic */}
      {isOpen && (
        <div className="lg:hidden bg-[#17181a] text-[#f2f2f2] border-b border-dashed border-[#71797a]/40 px-6 py-8 animate-fadeIn font-mono-tech">
          <nav className="flex flex-col gap-3">
            {/* 01 Home */}
            <a
              href="#top"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 py-2 text-sm tracking-widest text-[#f2f2f2]/80 hover:text-white border-b border-dashed border-[#494f52]/40"
            >
              <span className="text-xs text-emerald-400 font-bold">01</span>
              <span>HOME</span>
            </a>

            {/* 02 Productos with accordion for Equipos & Consumibles */}
            <div className="border-b border-dashed border-[#494f52]/40">
              <button
                type="button"
                onClick={() => setMobileProductsOpen((prev) => !prev)}
                className="w-full flex items-center justify-between py-2 text-sm tracking-widest text-[#f2f2f2]/80 hover:text-white cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs text-emerald-400 font-bold">02</span>
                  <span>PRODUCTOS</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-[#f2f2f2]/60 transition-transform duration-200 ${
                    mobileProductsOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {mobileProductsOpen && (
                <div className="pl-6 pb-2 pt-1 flex flex-col gap-2">
                  <a
                    href="#equipos"
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
                  </a>
                  <a
                    href="#consumibles"
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
                  </a>
                </div>
              )}
            </div>

            {/* 03 Pilares empresariales */}
            <a
              href="#pilares"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 py-2 text-sm tracking-widest text-[#f2f2f2]/80 hover:text-white border-b border-dashed border-[#494f52]/40"
            >
              <span className="text-xs text-emerald-400 font-bold">03</span>
              <span>PILARES EMPRESARIALES</span>
            </a>

            {/* 04 Eventos */}
            <a
              href="#eventos"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 py-2 text-sm tracking-widest text-[#f2f2f2]/80 hover:text-white border-b border-dashed border-[#494f52]/40"
            >
              <span className="text-xs text-emerald-400 font-bold">04</span>
              <span>EVENTOS</span>
            </a>

            {/* 05 Contacto */}
            <a
              href="#contacto"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 py-2 text-sm tracking-widest text-[#f2f2f2]/80 hover:text-white border-b border-dashed border-[#494f52]/40"
            >
              <span className="text-xs text-emerald-400 font-bold">05</span>
              <span>CONTACTO</span>
            </a>

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
