'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, PhoneCall, ShieldCheck, ChevronRight, Lock } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/data';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Nosotros', href: '#nosotros' },
    { name: 'Soluciones por Especialidad', href: '#soluciones' },
    { name: 'Consumibles', href: '#consumibles' },
    { name: 'Por Qué Elegirnos', href: '#por-que-nosotros' },
    { name: 'Los Pilares', href: '#pilares' },
    { name: 'Eventos', href: '#eventos' },
    { name: 'Contacto', href: '#contacto' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-white py-5 shadow-sm'
    }`}>
      {/* Top Banner Bar for Medical Trust */}
      <div className="hidden lg:block bg-slate-900 text-slate-300 text-xs py-1.5 px-6 -mt-5 mb-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" /> Equipamiento Urológico Grado Quirúrgico & Certificado
            </span>
            <span>Soporte Clínico en Quirófano 24/7</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Atención Especialistas: {COMPANY_INFO.phone}</span>
            <Link href="/admin" className="text-slate-400 hover:text-white flex items-center gap-1 transition-colors">
              <Lock className="w-3 h-3" /> Panel Admin
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-slate-900 leading-none">MEDNOVA</span>
              <span className="text-[10px] tracking-widest text-blue-600 font-semibold uppercase mt-0.5">Urological Tech</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors relative py-1 hover:after:w-full after:w-0 after:h-0.5 after:bg-blue-600 after:absolute after:bottom-0 after:left-0 after:transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Button */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent('Hola Mednova, deseo información y cotización de equipos de urología.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm shadow-md shadow-emerald-600/20 transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Cotizar Asesoría</span>
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="xl:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Abrir menú"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 animate-fadeIn">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-slate-700 hover:bg-blue-50 hover:text-blue-600 font-medium text-base transition-colors"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
            ))}
            <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5 mt-2">
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent('Hola Mednova, deseo cotizar equipos de urología.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-emerald-600 text-white font-medium text-center shadow"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Contactar Asesor Urológico</span>
              </a>
              <Link
                href="/admin"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 text-xs text-slate-500 py-2 hover:text-blue-600"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Acceso a Panel Administrativo</span>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
