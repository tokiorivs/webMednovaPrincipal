import Link from 'next/link';
import { ExternalLink, LogOut } from 'lucide-react';
import { requireAdmin } from '@/lib/admin/session';
import { signOut } from '../actions/auth';
import AdminNav from '../_components/AdminNav';

// Todo lo que cuelga de este layout exige sesión + rol + 2FA verificado.
export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const admin = await requireAdmin();

  return (
    <>
      <header className="bg-[#001041] border-b border-[#D2D3D5]/20 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Link href="/admin" className="shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/Logo_claro_fondo_oscuro_horizontal.webp" alt="Mednova" className="h-8 w-auto" />
            </Link>
            <span className="text-xs text-[#D2D3D5] border-l border-[#D2D3D5]/30 pl-3 hidden md:inline">
              Panel administrativo
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <span className="hidden lg:inline text-xs text-slate-400 truncate max-w-56" title={admin.email}>
              {admin.email} · {admin.role === 'owner' ? 'Propietario' : 'Administrador'}
            </span>
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
            >
              <span className="hidden sm:inline">Ver web</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <form action={signOut}>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-700 hover:bg-rose-500/10 hover:text-rose-300 hover:border-rose-500/30 text-slate-300 text-xs font-medium transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Cerrar sesión</span>
              </button>
            </form>
          </div>
        </div>
        <AdminNav isOwner={admin.role === 'owner'} />
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
    </>
  );
}
