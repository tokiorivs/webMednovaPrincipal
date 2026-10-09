'use client';

import { useMemo, useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Edit3, ExternalLink, Eye, EyeOff, Lock, Search, Trash2 } from 'lucide-react';
import { deleteProduct, setProductStatus } from '../actions/products';
import { Alert } from './ui';

export interface AdminProductRow {
  id: string;
  name: string;
  slug: string;
  brand: string;
  model: string;
  specialty: string;
  category: 'equipo' | 'consumible';
  status: 'draft' | 'active' | 'featured';
  image: string | null;
  locked: boolean;
}

type Tab = 'all' | 'equipo' | 'consumible';

const STATUS_LABEL = { draft: 'Borrador', active: 'Publicado', featured: '★ Destacado' } as const;
const STATUS_CLS = {
  draft: 'bg-slate-700 text-slate-300',
  active: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  featured: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
} as const;

export default function ProductsTable({ rows }: { rows: AdminProductRow[] }) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>('all');
  const [query, setQuery] = useState('');
  const [message, setMessage] = useState<{ kind: 'ok' | 'error'; text: string } | null>(null);
  const [pending, startTransition] = useTransition();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter(
      (r) =>
        (tab === 'all' || r.category === tab) &&
        (q === '' || [r.name, r.model, r.brand, r.specialty].some((v) => v.toLowerCase().includes(q)))
    );
  }, [rows, tab, query]);

  const count = (c: Tab) => (c === 'all' ? rows.length : rows.filter((r) => r.category === c).length);

  const run = (task: () => Promise<{ ok: boolean; error?: string }>, okText: string) => {
    setMessage(null);
    startTransition(async () => {
      const res = await task();
      if (res.ok) {
        setMessage({ kind: 'ok', text: okText });
        router.refresh();
      } else {
        setMessage({ kind: 'error', text: res.error ?? 'No se pudo completar la acción.' });
      }
    });
  };

  const toggle = (r: AdminProductRow) =>
    run(
      () => setProductStatus(r.id, r.status === 'draft' ? 'active' : 'draft'),
      r.status === 'draft' ? 'Producto publicado.' : 'Producto pasado a borrador.'
    );

  const remove = (r: AdminProductRow) => {
    if (!confirm(`¿Eliminar definitivamente "${r.name}"? Esta acción no se puede deshacer.`)) return;
    run(() => deleteProduct(r.id), `"${r.name}" eliminado.`);
  };

  const publicPath = (r: AdminProductRow) => `/${r.category === 'equipo' ? 'equipos' : 'consumibles'}/${r.slug}`;

  return (
    <div className="space-y-4">
      {message && <Alert kind={message.kind}>{message.text}</Alert>}

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
          {(['all', 'equipo', 'consumible'] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors shrink-0 cursor-pointer ${
                tab === t ? 'bg-teal-ink text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {t === 'all' ? 'Todos' : t === 'equipo' ? 'Equipos' : 'Consumibles'} ({count(t)})
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nombre o modelo…"
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#009EBC]/30 focus:border-[#009EBC]"
          />
        </div>
      </div>

      <div className="bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-4 px-6">Producto</th>
                <th className="py-4 px-6">Especialidad</th>
                <th className="py-4 px-6">Tipo</th>
                <th className="py-4 px-6">Estado</th>
                <th className="py-4 px-6 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-slate-900/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-white border border-slate-800 overflow-hidden shrink-0">
                        {r.image && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={r.image} alt="" className="w-full h-full object-contain p-1" />
                        )}
                      </div>
                      <div className="space-y-0.5 min-w-0">
                        <p className="font-bold text-white truncate">{r.name}</p>
                        <p className="text-slate-400 truncate">
                          {r.brand} · {r.model}
                        </p>
                        <p className="text-slate-500 truncate">{publicPath(r)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-slate-300">{r.specialty}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${
                        r.category === 'equipo'
                          ? 'bg-[#009EBC]/15 text-teal-ink border border-[#009EBC]/30'
                          : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      }`}
                    >
                      {r.category === 'equipo' ? 'Equipo' : 'Consumible'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${STATUS_CLS[r.status]}`}>
                      {STATUS_LABEL[r.status]}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-2">
                      {r.locked ? (
                        <span
                          title="Ficha a medida: se modifica en el código, no desde el panel"
                          className="inline-flex items-center gap-1 text-slate-500 pr-1"
                        >
                          <Lock className="w-3.5 h-3.5" /> A medida
                        </span>
                      ) : (
                        <>
                          <button
                            onClick={() => toggle(r)}
                            disabled={pending}
                            title={r.status === 'draft' ? 'Publicar' : 'Pasar a borrador'}
                            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 disabled:opacity-60 cursor-pointer"
                          >
                            {r.status === 'draft' ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                          </button>
                          <Link
                            href={`/admin/productos/${r.id}`}
                            title="Editar"
                            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            onClick={() => remove(r)}
                            disabled={pending}
                            title="Eliminar"
                            className="p-2 rounded-lg bg-slate-900 hover:bg-rose-500/10 text-slate-400 hover:text-rose-300 border border-slate-800 hover:border-rose-500/30 disabled:opacity-60 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </>
                      )}
                      {r.status !== 'draft' && (
                        <Link
                          href={publicPath(r)}
                          target="_blank"
                          title="Ver en la web"
                          className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-slate-500 text-xs">No hay productos con ese filtro.</div>
          )}
        </div>
      </div>
    </div>
  );
}
