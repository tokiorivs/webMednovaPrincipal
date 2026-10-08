'use client';

import React, { useEffect, useRef, useState } from 'react';

const IMAGE_SRC = '/images/equpo medico urolase.webp';
const STEP_MS = 1500;

const diameters = [
  { um: 150, size: 'w-6 h-6' },
  { um: 200, size: 'w-8 h-8' },
  { um: 365, size: 'w-10 h-10' },
  { um: 550, size: 'w-12 h-12' },
  { um: 940, size: 'w-14 h-14' },
];

type Side = 'left' | 'right';

interface CalloutProps {
  index: number;
  step: number;
  total: number;
  side: Side;
  title: string;
  children: React.ReactNode;
  className?: string;
}

function Callout({ index, step, total, side, title, children, className = '' }: CalloutProps) {
  const visible = step > index;
  const active = step === index + 1 && step <= total;
  const hidden = side === 'left' ? '-translate-x-6' : 'translate-x-6';

  return (
    <div
      className={`relative rounded-3xl bg-white border p-6 transition-all duration-700 ease-out motion-reduce:transition-none ${
        visible ? 'opacity-100 translate-x-0' : `opacity-0 ${hidden}`
      } ${
        active
          ? 'border-[#009EBC] shadow-xl shadow-[#009EBC]/15'
          : 'border-[#D2D3D5] shadow-none'
      } ${className}`}
    >
      {/* Connector line toward the equipment (desktop only) */}
      <span
        aria-hidden="true"
        className={`hidden lg:flex absolute top-1/2 -translate-y-1/2 items-center transition-all duration-700 ${
          side === 'left' ? '-right-10 flex-row' : '-left-10 flex-row-reverse'
        } ${visible ? 'opacity-100' : 'opacity-0'}`}
      >
        <span className="block h-px w-9 bg-[#009EBC]" />
        <span
          className={`block w-2.5 h-2.5 rounded-full bg-[#009EBC] ${active ? 'animate-pulse' : ''}`}
        />
      </span>
      <h3 className="font-heading text-xl text-teal-ink leading-snug">{title}</h3>
      <div className="mt-3 text-base text-[#494f52] leading-relaxed space-y-3">{children}</div>
    </div>
  );
}

export default function UrolaseAnnotatedShowcase() {
  const total = 5;
  const [step, setStep] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let timer: ReturnType<typeof setInterval> | undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        observer.disconnect();
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          setStep(total + 1);
          return;
        }
        setStep(1);
        timer = setInterval(() => {
          setStep((s) => {
            if (s >= total + 1) {
              if (timer) clearInterval(timer);
              return s;
            }
            return s + 1;
          });
        }, STEP_MS);
      },
      { threshold: 0.3 },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      if (timer) clearInterval(timer);
    };
  }, []);

  const done = step > total;

  return (
    <section ref={sectionRef} className="bg-white py-16 sm:py-24 border-b border-[#D2D3D5] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl space-y-3">
          <h2 className="font-heading text-3xl sm:text-4xl text-[#001041]">Conozca el sistema Urolase MAX</h2>
          <p className="text-base sm:text-lg text-[#494f52] leading-relaxed">
            Cada componente está diseñado para ofrecer seguridad, potencia y rapidez en quirófano.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,20rem)_1fr] gap-6 lg:gap-16 items-center">
          {/* Imagen central: en móvil va primero */}
          <div className="relative order-first lg:order-none lg:col-start-2 lg:row-start-1 lg:row-span-1 mx-auto w-full max-w-xs lg:max-w-none">
            <div
              aria-hidden="true"
              className={`absolute inset-0 -z-0 rounded-full blur-3xl transition-opacity duration-1000 bg-[#009EBC]/15 ${
                step > 0 ? 'opacity-100' : 'opacity-0'
              }`}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={IMAGE_SRC}
              alt="Láser de fibra de tulio Urolase MAX de VPG LaserOne con pantalla táctil y conector OnePush"
              width={1024}
              height={1536}
              loading="lazy"
              className="relative w-full h-auto"
            />
          </div>

          {/* Columna izquierda */}
          <div className="lg:col-start-1 lg:row-start-1 flex flex-col gap-6 lg:gap-24">
            <Callout index={0} step={step} total={total} side="left" title="Tissue Sensor">
              <p>
                Sistema de reconocimiento de tejido diseñado para maximizar la seguridad durante la litotricia:{' '}
                <strong className="font-semibold text-teal-ink">
                  detiene automáticamente la emisión del láser al detectar tejido blando
                </strong>
                , evitando lesiones de la mucosa.
              </p>
            </Callout>
            <Callout index={1} step={step} total={total} side="left" title="Láser de fibra de tulio de última generación">
              <p>
                El sistema de láser de fibra de tulio más potente para urología, compatible con todo el espectro de
                procedimientos hospitalarios, desde cirugía de tejidos blandos hasta litotricia.
              </p>
            </Callout>
          </div>

          {/* Columna derecha */}
          <div className="lg:col-start-3 lg:row-start-1 flex flex-col gap-6 lg:gap-10">
            <Callout index={2} step={step} total={total} side="right" title="Fibra quirúrgica VPG OnePush">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-[#f4f5f6] border border-[#D2D3D5] px-3 py-1 text-sm text-[#494f52]">
                  Desechable (uso único)
                </span>
                <span className="rounded-full bg-[#f4f5f6] border border-[#D2D3D5] px-3 py-1 text-sm text-[#494f52]">
                  Reutilizable (uso múltiple)
                </span>
              </div>
            </Callout>
            <Callout index={3} step={step} total={total} side="right" title="Conector OnePush">
              <p>
                El conector de fibra OnePush, con obturador automático, está diseñado para prevenir la contaminación y
                permitir conexiones rápidas, seguras y sencillas.
              </p>
            </Callout>
            <Callout index={4} step={step} total={total} side="right" title="Diámetros disponibles, µm">
              <ul className="flex items-end gap-4 flex-wrap" aria-label="Diámetros de fibra disponibles en micras">
                {diameters.map((d) => (
                  <li key={d.um} className="flex flex-col items-center gap-1.5">
                    <span className={`block rounded-full bg-teal-ink ${d.size}`} />
                    <span className="text-sm text-[#494f52]">{d.um} µm</span>
                  </li>
                ))}
              </ul>
            </Callout>
          </div>
        </div>

        <p
          className={`mt-10 text-center text-sm text-[#494f52] transition-opacity duration-700 ${
            done ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden={!done}
        >
          Plataforma VPG LaserOne · Distribuidor exclusivo en Perú
        </p>
      </div>
    </section>
  );
}
