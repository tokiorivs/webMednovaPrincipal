'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { COMPANY_INFO } from '@/lib/data';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  const navLinks = [
    { num: '01', name: 'NOSOTROS', href: '#nosotros' },
    { num: '02', name: 'SOLUCIONES', href: '#soluciones' },
    { num: '03', name: 'CONSUMIBLES', href: '#consumibles' },
    { num: '04', name: 'POR QUÉ NOSOTROS', href: '#por-que-nosotros' },
    { num: '05', name: 'LOS PILARES', href: '#pilares' },
    { num: '06', name: 'EVENTOS', href: '#eventos' },
    { num: '07', name: 'CONTACTO', href: '#contacto' },
  ];

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

          {/* Desktop Navigation - Numbered items in Gertix Studio style */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-[11px] xl:text-xs tracking-wider px-2.5 py-1 rounded-full border border-dashed border-transparent transition-all duration-150 ${
                  scrolled
                    ? 'text-[#17181a] hover:border-[#17181a] hover:text-[#17181a]'
                    : 'text-[#f2f2f2]/90 hover:border-[#f2f2f2] hover:text-white'
                }`}
              >
                <span className="opacity-50 mr-1">{link.num}</span>
                {link.name}
              </a>
            ))}
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
              className="p-2 rounded-lg text-inherit hover:opacity-75 transition-opacity"
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
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 py-2 text-sm tracking-widest text-[#f2f2f2]/80 hover:text-white border-b border-dashed border-[#494f52]/40"
              >
                <span className="text-xs text-emerald-400 font-bold">{link.num}</span>
                <span>{link.name}</span>
              </a>
            ))}

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
