'use client';

import React, { useEffect, useRef } from 'react';

interface HeroTechSceneProps {
  logoSrc: string;
  logoAlt: string;
  className?: string;
}

type Vec = [number, number, number];

const NODE_COUNT = 130;
const LINK_DISTANCE = 0.55; // en radios de esfera
const TEAL = '0, 190, 220';
const MAX_TILT = 14; // grados del logo

// Esfera de puntos distribuidos uniformemente (espiral de Fibonacci)
function buildNodes(): Vec[] {
  const golden = Math.PI * (3 - Math.sqrt(5));
  return Array.from({ length: NODE_COUNT }, (_, i) => {
    const y = 1 - (i / (NODE_COUNT - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const a = golden * i;
    return [Math.cos(a) * r, y, Math.sin(a) * r];
  });
}

function buildLinks(nodes: Vec[]): Array<[number, number]> {
  const links: Array<[number, number]> = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i][0] - nodes[j][0];
      const dy = nodes[i][1] - nodes[j][1];
      const dz = nodes[i][2] - nodes[j][2];
      if (Math.hypot(dx, dy, dz) < LINK_DISTANCE) links.push([i, j]);
    }
  }
  return links;
}

// Inclina un anillo en el espacio (rotación sobre X y luego Z)
function rotateRing(v: Vec, a: number, b: number): Vec {
  const ca = Math.cos(a);
  const sa = Math.sin(a);
  const y1 = v[1] * ca - v[2] * sa;
  const z1 = v[1] * sa + v[2] * ca;
  const cb = Math.cos(b);
  const sb = Math.sin(b);
  return [v[0] * cb - y1 * sb, v[0] * sb + y1 * cb, z1];
}

export default function HeroTechScene({ logoSrc, logoAlt, className }: HeroTechSceneProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const logo = logoRef.current;
    const ctx = canvas?.getContext('2d');
    if (!wrap || !canvas || !logo || !ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const nodes = buildNodes();
    const links = buildLinks(nodes);

    // Pulsos de luz láser que viajan por las conexiones
    const pulses = Array.from({ length: 14 }, () => ({
      link: Math.floor(Math.random() * links.length),
      t: Math.random(),
      speed: (0.004 + Math.random() * 0.006) * 0.4,
    }));

    let w = 0;
    let h = 0;
    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    // Puntero normalizado (-1..1)
    let targetX = 0;
    let targetY = 0;
    let px = 0;
    let py = 0;
    const onMove = (e: PointerEvent) => {
      targetX = (e.clientX / window.innerWidth) * 2 - 1;
      targetY = (e.clientY / window.innerHeight) * 2 - 1;
    };
    if (!reduceMotion) window.addEventListener('pointermove', onMove, { passive: true });

    const project = (v: Vec, rotY: number, rotX: number, radius: number) => {
      const cy = Math.cos(rotY);
      const sy = Math.sin(rotY);
      const x1 = v[0] * cy + v[2] * sy;
      const z1 = -v[0] * sy + v[2] * cy;
      const cx = Math.cos(rotX);
      const sx = Math.sin(rotX);
      const y2 = v[1] * cx - z1 * sx;
      const z2 = v[1] * sx + z1 * cx;
      const persp = 1 / (1 - z2 * 0.28);
      return {
        x: w / 2 + x1 * radius * persp,
        y: h / 2 + y2 * radius * persp,
        z: z2,
        s: persp,
      };
    };

    const rings: Array<[number, number, number, number]> = [
      [1.18, 1.1, 0.4, 1],
      [1.32, -0.7, 1.0, -0.7],
      [1.05, 0.2, -0.9, 1.4],
    ];

    let raf = 0;
    let visible = true;
    let last = performance.now();
    let angle = 0;

    const draw = (now: number) => {
      const dt = Math.min(now - last, 50);
      last = now;
      if (!reduceMotion) angle += dt * 0.000072;

      px += (targetX - px) * 0.05;
      py += (targetY - py) * 0.05;

      const radius = Math.min(w, h) * 0.44;
      const rotY = angle + px * 0.5;
      const rotX = 0.35 + py * 0.3;

      ctx.clearRect(0, 0, w, h);

      // Resplandor de fondo
      const glow = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, radius * 1.25);
      glow.addColorStop(0, `rgba(${TEAL}, 0.22)`);
      glow.addColorStop(0.6, 'rgba(0, 90, 160, 0.10)');
      glow.addColorStop(1, 'rgba(0, 16, 65, 0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      const pts = nodes.map((n) => project(n, rotY, rotX, radius));

      // Conexiones (más tenues al fondo de la esfera)
      ctx.lineWidth = 1;
      for (const [a, b] of links) {
        const depth = (pts[a].z + pts[b].z) / 2;
        const alpha = 0.06 + ((depth + 1) / 2) * 0.28;
        ctx.strokeStyle = `rgba(${TEAL}, ${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(pts[a].x, pts[a].y);
        ctx.lineTo(pts[b].x, pts[b].y);
        ctx.stroke();
      }

      // Nodos
      for (const p of pts) {
        const alpha = 0.25 + ((p.z + 1) / 2) * 0.75;
        ctx.fillStyle = `rgba(190, 245, 255, ${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.1 + p.s * 0.9, 0, Math.PI * 2);
        ctx.fill();
      }

      // Pulsos láser
      for (const pulse of pulses) {
        if (!reduceMotion) pulse.t += pulse.speed * (dt / 16);
        if (pulse.t >= 1) {
          pulse.t = 0;
          pulse.link = Math.floor(Math.random() * links.length);
        }
        const [a, b] = links[pulse.link];
        const x = pts[a].x + (pts[b].x - pts[a].x) * pulse.t;
        const y = pts[a].y + (pts[b].y - pts[a].y) * pulse.t;
        const g = ctx.createRadialGradient(x, y, 0, x, y, 9);
        g.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
        g.addColorStop(0.3, `rgba(${TEAL}, 0.6)`);
        g.addColorStop(1, `rgba(${TEAL}, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, 9, 0, Math.PI * 2);
        ctx.fill();
      }

      // Anillos orbitales con un satélite luminoso
      rings.forEach(([rScale, tiltA, tiltB, speed], idx) => {
        const steps = 90;
        ctx.beginPath();
        for (let i = 0; i <= steps; i++) {
          const t = (i / steps) * Math.PI * 2;
          const v: Vec = [Math.cos(t) * rScale, 0, Math.sin(t) * rScale];
          const p = project(rotateRing(v, tiltA, tiltB), rotY * 0.4, rotX * 0.6, radius);
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = `rgba(${TEAL}, ${idx === 1 ? 0.22 : 0.14})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        const t = angle * 14 * speed + idx * 2;
        const v: Vec = [Math.cos(t) * rScale, 0, Math.sin(t) * rScale];
        const sat = project(rotateRing(v, tiltA, tiltB), rotY * 0.4, rotX * 0.6, radius);
        const sg = ctx.createRadialGradient(sat.x, sat.y, 0, sat.x, sat.y, 12);
        sg.addColorStop(0, 'rgba(255, 255, 255, 1)');
        sg.addColorStop(0.35, `rgba(${TEAL}, 0.75)`);
        sg.addColorStop(1, `rgba(${TEAL}, 0)`);
        ctx.fillStyle = sg;
        ctx.beginPath();
        ctx.arc(sat.x, sat.y, 12, 0, Math.PI * 2);
        ctx.fill();
      });

      // Logo con inclinación 3D y flotación suave
      const floatY = reduceMotion ? 0 : Math.sin(now / 1400) * 6;
      logo.style.transform = `translateY(${floatY.toFixed(2)}px) rotateY(${(px * MAX_TILT).toFixed(2)}deg) rotateX(${(-py * MAX_TILT).toFixed(2)}deg)`;
    };

    const loop = (now: number) => {
      if (visible) draw(now);
      raf = requestAnimationFrame(loop);
    };

    if (reduceMotion) {
      draw(performance.now());
    } else {
      raf = requestAnimationFrame(loop);
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(wrap);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <div ref={wrapRef} className={className} style={{ perspective: '900px' }}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />
      <div
        ref={logoRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoSrc}
          alt={logoAlt}
          width={1464}
          height={651}
          className="w-[62%] h-auto drop-shadow-[0_0_30px_rgba(0,190,220,0.45)]"
          style={{ transform: 'translateZ(60px)' }}
        />
      </div>
    </div>
  );
}
