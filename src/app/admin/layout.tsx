import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Panel administrativo',
  robots: { index: false, follow: false },
};

// Nada de /admin debe cachearse ni prerenderizarse: depende de la sesión.
export const dynamic = 'force-dynamic';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-slate-900 text-slate-100 font-mono-tech">{children}</div>;
}
