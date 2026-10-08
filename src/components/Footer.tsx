"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { COMPANY_INFO } from "@/lib/data";

const FacebookIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5"
    aria-hidden="true"
  >
    <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.9v3h2.6V21h3z" />
  </svg>
);

const InstagramIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="w-5 h-5"
    aria-hidden="true"
  >
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5"
    aria-hidden="true"
  >
    <path d="M12 2.5a9.4 9.4 0 0 0-8 14.3L2.7 21.5l4.8-1.3A9.4 9.4 0 1 0 12 2.5zm0 17.2c-1.5 0-2.9-.4-4.1-1.2l-.3-.2-2.8.8.8-2.7-.2-.3a7.7 7.7 0 1 1 6.6 3.6zm4.2-5.8c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1-1.3-.6-2.1-1.2-2.9-2.6-.2-.4.2-.4.6-1.2.1-.1 0-.3 0-.4l-.7-1.6c-.2-.4-.3-.4-.5-.4h-.4c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.3c.1.2 1.6 2.5 3.9 3.4 1.4.6 2 .6 2.7.5.4-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1-.1-.1-.2-.2-.5-.3z" />
  </svg>
);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!footerRef.current) return;
    const rect = footerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    footerRef.current.style.setProperty("--mouse-x", `${x}%`);
    footerRef.current.style.setProperty("--mouse-y", `${y}%`);
  };

  const handleMouseLeave = () => {
    if (!footerRef.current) return;
    footerRef.current.style.setProperty("--mouse-x", "50%");
    footerRef.current.style.setProperty("--mouse-y", "50%");
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
        {/* Left Column: WhatsApp CTA + VPG seal */}
        <div className="cb-site-footer__left">
          {/* Direct WhatsApp Column */}
          <div className="cb-site-footer__newsletter">
            <div className="cb-site-footer__newsletter-intro">
              <p className="cb-site-footer__newsletter-heading">
                Hable con un especialista
              </p>
              <p className="cb-site-footer__newsletter-text">
                Cotizaciones, fichas técnicas y demostraciones de Urolase MAX,
                directo por WhatsApp.
              </p>
            </div>

            <div className="cb-site-footer__newsletter-form">
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent("Hola Mednova Technologies, deseo información y cotización de Urolase MAX.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="self-start inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-teal-ink hover:bg-[#00b3d4] text-white text-sm font-semibold transition-colors"
              >
                Escribir por WhatsApp
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          <div className="cb-site-footer__seal">
            <img
              src="/images/vpg-laserone-logo-blanco.png"
              alt="VPG LaserOne"
              className="h-8 w-auto object-contain"
            />
            <p>Distribuidor exclusivo en Perú</p>
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

          <div className="cb-site-footer__contact-divider" />

          <div className="cb-site-footer__contact-links">
            <a
              className="cb-site-footer__contact-link"
              href={`tel:${COMPANY_INFO.phone.replace(/\s+/g, "")}`}
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
              className="cb-site-footer__contact-link text-teal-ink hover:text-white"
              href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent("Hola Mednova, solicito una demostración en quirófano.")}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Demostraciones en Quirófano →
            </a>
          </div>

          <div className="cb-site-footer__socials" aria-label="Redes sociales">
            {COMPANY_INFO.socials.facebook && (
              <a
                href={COMPANY_INFO.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook de Mednova"
              >
                <FacebookIcon />
              </a>
            )}
            {COMPANY_INFO.socials.instagram && (
              <a
                href={COMPANY_INFO.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de Mednova"
              >
                <InstagramIcon />
              </a>
            )}
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp de Mednova"
            >
              <WhatsAppIcon />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar (Gertix Studio Bar with dashed top & bottom borders) */}
      <div className="cb-site-footer__bar">
        {/* Legal Links (Left side) */}
        <nav className="cb-site-footer__legal" aria-label="Enlaces Legales">
          <Link href="/terminos-y-condiciones">TÉRMINOS Y CONDICIONES</Link>
          <Link href="/politicas-de-privacidad">POLÍTICAS DE PRIVACIDAD</Link>
          <Link
            href="/libro-de-reclamaciones"
            className="inline-flex items-center gap-2.5 group hover:text-white transition-colors"
          >
            <img
              src="/images/libro_reclamaciones.webp"
              alt="Libro de Reclamaciones - Mednova Technologies"
              className="h-7 w-auto object-contain shrink-0 rounded-[2px] transition-transform group-hover:scale-105 shadow-sm"
            />
            <span>LIBRO DE RECLAMACIONES</span>
          </Link>
        </nav>

        {/* Technical Copyright Badge & Back-to-Top (Right side) */}
        <div className="flex items-center gap-6 flex-wrap">
          <a
            href="#top"
            className="text-teal-ink hover:text-white transition-colors text-[0.8rem] tracking-[0.05em] uppercase font-mono"
          >
            VOLVER ARRIBA ↑
          </a>
          <p className="cb-site-footer__copyright">
            [C] MEDNOVA/TECH {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
