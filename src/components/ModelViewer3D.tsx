'use client';

import React, { useEffect, useState } from 'react';

interface ModelViewer3DProps {
  src: string;
  alt: string;
}

export default function ModelViewer3D({ src, alt }: ModelViewer3DProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    import('@google/model-viewer').then(() => {
      if (!cancelled) setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse 70% 60% at 50% 42%, #14377f 0%, #0a1f5c 35%, #001041 65%, #00071f 100%)',
      }}
    >
      {/* Subtle technical grid, fading toward the edges */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(127,220,240,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(127,220,240,0.6) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
          maskImage: 'radial-gradient(ellipse 60% 55% at 50% 45%, black 0%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 55% at 50% 45%, black 0%, transparent 75%)',
        }}
      />
      {/* Teal glow on the floor under the console */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 bottom-[9%] w-[62%] h-[14%] -translate-x-1/2 rounded-[50%]"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0,158,188,0.55) 0%, rgba(0,158,188,0.15) 45%, transparent 72%)',
          filter: 'blur(10px)',
        }}
      />
      {ready ? (
        React.createElement('model-viewer', {
          src,
          alt,
          loading: 'eager',
          reveal: 'auto',
          'camera-controls': true,
          'auto-rotate': true,
          'auto-rotate-delay': 0,
          'rotation-per-second': '20deg',
          'shadow-intensity': 0.6,
          'shadow-softness': 1,
          exposure: 1.15,
          'environment-image': 'neutral',
          'interaction-prompt': 'none',
          'touch-action': 'pan-y',
          style: { position: 'relative', width: '100%', height: '100%', background: 'transparent' },
        })
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-sm text-[#c9ced3]">
          Cargando modelo 3D…
        </div>
      )}
      <p className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-[#c9ced3] bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-3 py-1">
        Arrastre para girar · Desplace para acercar
      </p>
    </div>
  );
}
