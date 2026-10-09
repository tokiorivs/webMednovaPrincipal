import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const inputCls =
  'w-full rounded-xl bg-slate-950 border border-slate-700 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#009EBC]/40 focus:border-[#009EBC] disabled:opacity-60';

export const btnPrimary =
  'inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-teal-ink hover:bg-[#00819a] text-white font-bold text-sm shadow-lg shadow-[#009EBC]/20 transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer';

export const btnGhost =
  'inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-200 text-sm font-medium transition-colors disabled:opacity-60 cursor-pointer';

export const btnDanger =
  'inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-rose-500/40 text-rose-300 hover:bg-rose-500/10 text-sm font-medium transition-colors disabled:opacity-60 cursor-pointer';

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-semibold text-slate-300">{label}</span>
      {children}
      {hint && <span className="block text-xs text-slate-500">{hint}</span>}
    </label>
  );
}

export function Alert({ kind = 'error', children }: { kind?: 'error' | 'ok' | 'info'; children: React.ReactNode }) {
  const styles = {
    error: 'border-rose-500/40 bg-rose-500/10 text-rose-200',
    ok: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200',
    info: 'border-[#009EBC]/40 bg-[#009EBC]/10 text-[#bfeaf3]',
  }[kind];
  return (
    <div role={kind === 'error' ? 'alert' : 'status'} className={`rounded-xl border px-4 py-3 text-sm ${styles}`}>
      {children}
    </div>
  );
}

// Contenedor de las pantallas de acceso (login, 2FA, cambio de clave).
export function AuthShell({
  title,
  subtitle,
  children,
  showBack = false,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  showBack?: boolean;
}) {
  return (
    <div className="min-h-screen bg-[#001041] flex flex-col justify-center py-12 px-4 relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#009EBC]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#009EBC]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md mx-auto">
        {showBack && (
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-[#D2D3D5] hover:text-white mb-6">
            <ArrowLeft className="w-3.5 h-3.5" />
            Volver al sitio web
          </Link>
        )}
        <div className="text-center space-y-3 mb-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/Logo_claro_fondo_oscuro_horizontal.webp"
            alt="Mednova Technologies"
            className="h-10 w-auto mx-auto"
          />
          <h1 className="font-heading font-light uppercase text-2xl text-white tracking-tight">{title}</h1>
          {subtitle && <p className="text-xs text-[#D2D3D5] leading-relaxed">{subtitle}</p>}
        </div>
        <div className="bg-slate-950/80 backdrop-blur border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
          {children}
        </div>
      </div>
    </div>
  );
}
