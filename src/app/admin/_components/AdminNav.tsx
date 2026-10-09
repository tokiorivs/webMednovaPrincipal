'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminNav({ isOwner }: { isOwner: boolean }) {
  const pathname = usePathname();

  const items = [
    { href: '/admin', label: 'Productos', match: (p: string) => p === '/admin' || p.startsWith('/admin/productos') },
    ...(isOwner
      ? [
          { href: '/admin/usuarios', label: 'Usuarios', match: (p: string) => p.startsWith('/admin/usuarios') },
          { href: '/admin/ajustes', label: 'Ajustes', match: (p: string) => p.startsWith('/admin/ajustes') },
          { href: '/admin/actividad', label: 'Actividad', match: (p: string) => p.startsWith('/admin/actividad') },
        ]
      : []),
    { href: '/admin/cuenta', label: 'Mi cuenta', match: (p: string) => p.startsWith('/admin/cuenta') },
  ];

  return (
    <nav aria-label="Secciones del panel" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-1 overflow-x-auto">
      {items.map((item) => {
        const active = item.match(pathname);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? 'page' : undefined}
            className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
              active ? 'border-teal-ink text-white' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
