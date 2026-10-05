'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Plus, Search, Edit3, Trash2, Eye, LogOut, ExternalLink, 
  Database, ShieldCheck, CheckCircle2, AlertTriangle, Layers, 
  Package, Stethoscope, RefreshCw, Copy, Check
} from 'lucide-react';
import { Product } from '@/types/product';
import { fetchProducts, upsertProduct, deleteProduct, isSupabaseConfigured } from '@/lib/supabase';
import ProductFormModal from './components/ProductFormModal';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'equipo' | 'consumible' | 'guide'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedSql, setCopiedSql] = useState(false);
  const isCloud = isSupabaseConfigured();

  // Authentication check
  useEffect(() => {
    const isLogged = localStorage.getItem('mednova_admin_logged');
    if (!isLogged) {
      router.push('/admin/login');
    }
  }, [router]);

  const loadAllProducts = async () => {
    setLoading(true);
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      console.error('Error fetching products', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllProducts();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleLogout = () => {
    localStorage.removeItem('mednova_admin_logged');
    router.push('/admin/login');
  };

  const handleSaveProduct = async (productData: Partial<Product>) => {
    try {
      const saved = await upsertProduct(productData);
      showToast(productData.id ? '¡Equipo actualizado con éxito!' : '¡Nuevo equipo agregado con éxito!');
      await loadAllProducts();
    } catch (err) {
      console.error('Error saving product', err);
      alert('Error al guardar el producto');
    }
  };

  const handleDeleteProduct = async (id: string, name: string) => {
    if (!confirm(`¿Estás seguro de que deseas eliminar permanentemente el equipo "${name}"?`)) {
      return;
    }

    try {
      await deleteProduct(id);
      showToast(`Equipo "${name}" eliminado.`);
      await loadAllProducts();
    } catch (err) {
      console.error('Error deleting product', err);
      alert('Error al eliminar el producto');
    }
  };

  // Filter products by search and tab
  const filteredProducts = products.filter((prod) => {
    const matchesTab = activeTab === 'all' || prod.category === activeTab;
    const matchesQuery = 
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.brand.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesQuery;
  });

  const countEquipos = products.filter(p => p.category === 'equipo').length;
  const countConsumibles = products.filter(p => p.category === 'consumible').length;
  const countFeatured = products.filter(p => p.status === 'featured').length;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-semibold animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar */}
      <header className="bg-slate-950 border-b border-slate-800 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-600/30">
              M
            </div>
            <div>
              <span className="font-bold text-sm tracking-tight text-white">MEDNOVA</span>
              <span className="text-xs text-slate-400 ml-2 border-l border-slate-700 pl-2">Panel Administrativo</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Supabase status badge */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-[11px]">
              <span className={`w-2 h-2 rounded-full ${isCloud ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              <span className={isCloud ? 'text-emerald-300' : 'text-amber-300'}>
                {isCloud ? 'Supabase Conectado' : 'Modo Local / Demo'}
              </span>
            </div>

            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
            >
              <span>Ver Web</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-800 hover:bg-rose-500/10 hover:text-rose-400 hover:border-rose-500/30 text-slate-400 text-xs font-medium transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Page Title & Add Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Gestión de Catálogo Médico
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Agrega, edita y administra máquinas de urología, consumibles y fichas técnicas.
            </p>
          </div>

          <button
            onClick={() => {
              setEditingProduct(null);
              setIsModalOpen(true);
            }}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/25 transition-all hover:-translate-y-0.5"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo Equipo / Producto</span>
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Equipos Médicos</span>
              <Stethoscope className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl font-black text-white">{countEquipos}</div>
            <p className="text-[10px] text-slate-500">Láseres, torres y endoscopios</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Consumibles</span>
              <Package className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-white">{countConsumibles}</div>
            <p className="text-[10px] text-slate-500">Fibras, catéteres y stents</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Destacados en Portada</span>
              <Layers className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-black text-white">{countFeatured}</div>
            <p className="text-[10px] text-slate-500">Con etiqueta destacada</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Almacenamiento</span>
              <Database className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-sm font-bold text-white mt-1">
              {isCloud ? 'PostgreSQL Cloud' : 'Almacenamiento Local'}
            </div>
            <p className="text-[10px] text-slate-500">
              {isCloud ? 'Supabase activo' : 'Listo para conectar Supabase'}
            </p>
          </div>
        </div>

        {/* Navigation Tabs & Search Bar */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-4">
            
            {/* Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors shrink-0 ${
                  activeTab === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                Todos ({products.length})
              </button>
              <button
                onClick={() => setActiveTab('equipo')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors shrink-0 ${
                  activeTab === 'equipo'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                Equipos Médicos ({countEquipos})
              </button>
              <button
                onClick={() => setActiveTab('consumible')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors shrink-0 ${
                  activeTab === 'consumible'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                Consumibles ({countConsumibles})
              </button>
              <button
                onClick={() => setActiveTab('guide')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors shrink-0 ${
                  activeTab === 'guide'
                    ? 'bg-cyan-600 text-white'
                    : 'text-cyan-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                Guía Supabase Cloud
              </button>
            </div>

            {/* Search */}
            {activeTab !== 'guide' && (
              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar por nombre o modelo..."
                  className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
          </div>
        </div>

        {/* Tab Content: Guide vs Products Table */}
        {activeTab === 'guide' ? (
          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                <Database className="w-3.5 h-3.5" />
                Configuración en 3 Pasos
              </div>
              <h2 className="text-xl font-bold text-white mt-2">
                Cómo Conectar Tu Proyecto Gratuito de Supabase Cloud
              </h2>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                El sistema ya funciona perfectamente en tu navegador. Cuando desees que todos los cambios se sincronicen en la nube de Supabase para que cualquier persona en tu equipo los vea, sigue estos 3 pasos:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
                  1
                </div>
                <h4 className="text-sm font-bold text-white">Crea tu cuenta en Supabase</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Ingresa a <a href="https://supabase.com" target="_blank" rel="noreferrer" className="text-blue-400 underline">supabase.com</a> y crea un nuevo proyecto gratuito con el nombre "mednova".
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
                  2
                </div>
                <h4 className="text-sm font-bold text-white">Ejecuta el Script SQL</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  En el panel de Supabase ve a <strong>SQL Editor</strong>, abre el archivo <code className="text-cyan-300">supabase-schema.sql</code> que dejamos en tu proyecto y haz clic en <strong>RUN</strong>.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
                  3
                </div>
                <h4 className="text-sm font-bold text-white">Copia tus Claves en .env.local</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  En <strong>Project Settings → API</strong> copia la <strong>URL</strong> y la <strong>anon public key</strong> en tu archivo <code className="text-cyan-300">.env.local</code>. ¡Y listo!
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-blue-900/20 border border-blue-500/30 flex items-center justify-between">
              <span className="text-xs text-blue-300">
                Archivo SQL listo para copiar: <strong className="text-white">supabase-schema.sql</strong> en la raíz del proyecto.
              </span>
              <button
                onClick={() => {
                  setCopiedSql(true);
                  setTimeout(() => setCopiedSql(false), 2000);
                }}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                {copiedSql ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSql ? '¡Copiado!' : 'Copiar Ruta'}</span>
              </button>
            </div>
          </div>
        ) : (
          /* Products Table */
          <div className="bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900/80 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="py-4 px-6">Equipo / Insumo</th>
                    <th className="py-4 px-6">Especialidad</th>
                    <th className="py-4 px-6">Tipo</th>
                    <th className="py-4 px-6">Estado</th>
                    <th className="py-4 px-6 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-850">
                  {filteredProducts.map((prod) => (
                    <tr key={prod.id} className="hover:bg-slate-900/50 transition-colors">
                      {/* Image + Title */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 overflow-hidden shrink-0">
                            <img
                              src={prod.images[0] || 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=400&q=80'}
                              alt={prod.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="space-y-0.5">
                            <p className="font-bold text-white text-xs hover:text-blue-400 transition-colors">
                              {prod.name}
                            </p>
                            <p className="text-[11px] text-slate-400">
                              {prod.brand} • Mod: <span className="text-slate-300 font-mono">{prod.model}</span>
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Specialty */}
                      <td className="py-4 px-6 text-slate-300 font-medium">
                        {prod.specialty}
                      </td>

                      {/* Category */}
                      <td className="py-4 px-6">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          prod.category === 'equipo'
                            ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                            : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        }`}>
                          {prod.category === 'equipo' ? 'Equipo' : 'Consumible'}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-6">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          prod.status === 'featured'
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            : prod.status === 'active'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-slate-700 text-slate-400'
                        }`}>
                          {prod.status === 'featured' ? '★ Destacado' : prod.status === 'active' ? 'Activo' : 'Borrador'}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setEditingProduct(prod);
                              setIsModalOpen(true);
                            }}
                            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
                            title="Editar equipo"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(prod.id, prod.name)}
                            className="p-2 rounded-lg bg-slate-900 hover:bg-rose-500/10 text-slate-400 hover:text-rose-400 border border-slate-800 hover:border-rose-500/30 transition-colors"
                            title="Eliminar equipo"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredProducts.length === 0 && !loading && (
                <div className="text-center py-12 text-slate-500 text-xs">
                  No se encontraron productos con el filtro aplicado.
                </div>
              )}
            </div>
          </div>
        )}

      </main>

      {/* Modal Form for Creating / Editing Products */}
      <ProductFormModal
        isOpen={isModalOpen}
        product={editingProduct}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProduct(null);
        }}
        onSave={handleSaveProduct}
      />

    </div>
  );
}
