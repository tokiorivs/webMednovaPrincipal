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
              <div className="p-4 border border-dashed border-[#25b895] bg-[#25b895]/10 text-[#25b895] text-xs uppercase tracking-wider">
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
                    He leído y acepto la{' '}
                    <a href="#contacto" className="hover:text-white transition-colors">
                      Política de Privacidad
                    </a>{' '}
                    y consentimiento de datos clínicos.
                  </span>
                </label>
              </form>
            )}
          </div>
        </div>

        {/* Contact & Identity Column (Gertix Studio technical block) */}
        <div className="cb-site-footer__contact">
          {/* Gertix Style Technical Emblem / Mednova Monogram */}
          <div className="w-10 h-16 flex items-center justify-center text-[#e8ebeb]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="66"
              viewBox="0 0 36 66"
              fill="none"
              aria-hidden="true"
            >
              {/* Geometric Medical Tech Monogram */}
              <path
                d="M18 0L35 10V28L18 38L1 28V10L18 0Z"
                stroke="#E8EBEB"
                strokeWidth="1.5"
                strokeDasharray="2 2"
                fill="none"
              />
              <path
                d="M18 7L30 14V24L18 31L6 24V14L18 7Z"
                fill="#E8EBEB"
                fillOpacity="0.15"
              />
              {/* Precision Laser Core / Pulse Cross */}
              <line x1="18" y1="12" x2="18" y2="26" stroke="#25b895" strokeWidth="2" strokeLinecap="round" />
              <line x1="11" y1="19" x2="25" y2="19" stroke="#25b895" strokeWidth="2" strokeLinecap="round" />
              {/* Stylized lower calibration marks */}
              <line x1="18" y1="42" x2="18" y2="64" stroke="#E8EBEB" strokeWidth="1.5" />
              <line x1="10" y1="49" x2="26" y2="49" stroke="#E8EBEB" strokeWidth="1" strokeDasharray="1 2" />
              <line x1="13" y1="56" x2="23" y2="56" stroke="#E8EBEB" strokeWidth="1.5" />
              <line x1="16" y1="63" x2="20" y2="63" stroke="#25b895" strokeWidth="2" />
            </svg>
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
              className="cb-site-footer__contact-link text-[#25b895] hover:text-white"
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
        {/* Navigation Links */}
        <nav className="cb-site-footer__nav" aria-label="Navegación de pie de página">
          <a href="#top">01 HOME</a>
          <a href="#equipos">02 EQUIPOS</a>
          <a href="#consumibles">03 CONSUMIBLES</a>
          <a href="#pilares">04 PILARES</a>
          <a href="#eventos">05 EVENTOS</a>
          <a href="#contacto">06 CONTACTO</a>
          <Link href="/admin">07 ADMIN</Link>
        </nav>

        {/* Technical Copyright Badge */}
        <p className="cb-site-footer__copyright">
          [C] MEDNOVA/TECH {new Date().getFullYear()}
        </p>

        {/* Legal & Back-to-Top Links */}
        <nav className="cb-site-footer__legal" aria-label="Enlaces Legales">
          <a href="#contacto">TÉRMINOS</a>
          <a href="#contacto">PRIVACIDAD</a>
          <a href="#contacto">RECLAMACIONES</a>
          <a href="#top" className="text-[#25b895]">
            VOLVER ARRIBA ↑
          </a>
        </nav>
      </div>
    </footer>
  );
}
