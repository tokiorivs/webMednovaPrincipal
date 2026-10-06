'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { COMPANY_INFO } from '@/lib/data';

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [subscribed, setSubscribed] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', consent: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!footerRef.current) return;
    const rect = footerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    footerRef.current.style.setProperty('--mouse-x', `${x}%`);
    footerRef.current.style.setProperty('--mouse-y', `${y}%`);
  };

  const handleMouseLeave = () => {
    if (!footerRef.current) return;
    footerRef.current.style.setProperty('--mouse-x', '50%');
    footerRef.current.style.setProperty('--mouse-y', '50%');
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.consent) return;
    setSubscribed(true);
  };

  return (
    <footer
      ref={footerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="cb-site-footer font-mono-tech"
      role="contentinfo"
    >
      {/* Top Section */}
      <div className="cb-site-footer__top">
        
        {/* Newsletter Column (Gertix Studio Community Echo style) */}
        <div className="cb-site-footer__newsletter">
          <div className="cb-site-footer__newsletter-intro">
            <p className="cb-site-footer__newsletter-heading">Community Echo</p>
            <p className="cb-site-footer__newsletter-text">
              Actualizaciones clínicas, avances en litotricia láser (Holmium &amp; Tulio TFL) y protocolos quirúrgicos de mínima invasión.
            </p>
          </div>

          <div className="cb-site-footer__newsletter-form">
            {subscribed ? (
              <div className="p-4 border border-dashed border-[#009EBC] bg-[#009EBC]/10 text-[#009EBC] text-xs uppercase tracking-wider">
                ✓ Suscripción confirmada. Recibirás las novedades urológicas de Mednova.
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="Nombre"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                
                <div className="cb-site-footer__newsletter-email-row">
                  <input
                    type="email"
                    placeholder="E-Mail"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                  <button
                    type="submit"
                    aria-label="Suscribirse al boletín"
                    className="cb-site-footer__newsletter-submit font-mono"
                  >
                    →
                  </button>
                </div>

                <label className="cb-site-footer__newsletter-consent">
                  <input
                    type="checkbox"
                    checked={formData.consent}
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    required
                  />
                  <span>
                    He leído y acepto las{' '}
                    <Link href="/contacto" className="hover:text-white transition-colors underline">
                      Políticas de Privacidad
                    </Link>{' '}
                    y{' '}
                    <Link href="/contacto" className="hover:text-white transition-colors underline">
                      Términos y Condiciones
                    </Link>.
                  </span>
                </label>
              </form>
            )}
          </div>
        </div>

        {/* Contact & Identity Column (Gertix Studio technical block) */}
        <div className="cb-site-footer__contact">
          {/* Official Mednova Logo for Dark Background */}
          <div className="flex items-center">
            <img
              src="/images/Logo_claro_fondo_oscuro_horizontal.webp"
              alt="Mednova Technologies"
              className="h-10 w-auto object-contain opacity-95 hover:opacity-100 transition-opacity"
            />
          </div>

          <address className="cb-site-footer__address">
            MEDNOVA TECHNOLOGIES S.A.C.<br />
            <br />
            AV. JAVIER PRADO ESTE 4500<br />
            SAN BORJA, LIMA — PERÚ
          </address>

          <div className="cb-site-footer__contact-divider" />

          <div className="cb-site-footer__contact-links">
            <a
              className="cb-site-footer__contact-link"
              href={`tel:${COMPANY_INFO.phone.replace(/\s+/g, '')}`}
            >
              {COMPANY_INFO.phone}
            </a>
            <a
              className="cb-site-footer__contact-link"
              href={`mailto:${COMPANY_INFO.email}`}
            >
              {COMPANY_INFO.email}
            </a>
            <a
              className="cb-site-footer__contact-link text-[#009EBC] hover:text-white"
              href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent('Hola Mednova, solicito una demostración quirúrgica en quirófano.')}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Soporte Quirúrgico 24/7 &amp; Demos →
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Bar (Gertix Studio Bar with dashed top & bottom borders) */}
      <div className="cb-site-footer__bar">

        {/* Technical Copyright Badge */}
        <p className="cb-site-footer__copyright">
          [C] MEDNOVA/TECH {new Date().getFullYear()}
        </p>

        {/* Legal & Back-to-Top Links */}
        <nav className="cb-site-footer__legal" aria-label="Enlaces Legales">
          <Link href="/contacto">TÉRMINOS Y CONDICIONES</Link>
          <Link href="/contacto">POLÍTICAS DE PRIVACIDAD</Link>
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2.5 group hover:text-white transition-colors"
          >
            <img
              src="/images/libro_reclamaciones.webp"
              alt="Libro de Reclamaciones - Mednova Technologies"
              className="h-7 w-auto object-contain shrink-0 rounded-[2px] transition-transform group-hover:scale-105 shadow-sm"
            />
            <span>LIBRO DE RECLAMACIONES</span>
          </Link>
          <a href="#top" className="text-[#009EBC]">
            VOLVER ARRIBA ↑
          </a>
        </nav>
      </div>
    </footer>
  );
}
