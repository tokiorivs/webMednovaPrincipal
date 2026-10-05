'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, Mail, Key, ShieldCheck, ArrowLeft, AlertCircle, CheckCircle2 } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const isCloud = isSupabaseConfigured();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isCloud && supabase) {
        // Authenticate with live Supabase
        const { data, error: authError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (authError) {
          setError(authError.message || 'Credenciales inválidas. Verifica tu correo y contraseña.');
          setLoading(false);
          return;
        }

        if (data.session) {
          localStorage.setItem('mednova_admin_logged', 'true');
          router.push('/admin');
          return;
        }
      } else {
        // Demo / Local Mode (when Supabase credentials are not yet configured in .env.local)
        // Default demo credentials: admin@mednova.com / admin123 (or any valid credentials)
        if (password.length >= 4) {
          localStorage.setItem('mednova_admin_logged', 'true');
          localStorage.setItem('mednova_admin_email', email || 'admin@mednova.com');
          router.push('/admin');
          return;
        } else {
          setError('La contraseña debe tener al menos 4 caracteres.');
          setLoading(false);
          return;
        }
      }
    } catch (err: any) {
      setError(err?.message || 'Error al conectar con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden font-mono-tech">
      {/* Background Decor */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver al sitio web principal</span>
        </Link>

        {/* Logo and title */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white mx-auto shadow-lg shadow-blue-500/25">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="font-heading font-light uppercase text-2xl text-white tracking-tight">
            Panel de Administración
          </h2>
          <p className="text-xs text-slate-400">
            Mednova Technologies • Gestión de Catálogo y Equipos
          </p>
        </div>

        {/* Login Card */}
        <div className="mt-8 bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative">
          
          {/* Status Indicator */}
          <div className="mb-6 p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center gap-2.5 text-xs">
            {isCloud ? (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-300 font-medium">Supabase Cloud Conectado</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="text-amber-300 font-medium">Modo Demo / Local Activo (Ingreso libre de prueba)</span>
              </>
            )}
          </div>

          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Correo Electrónico / Usuario</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@mednova.com"
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Contraseña</label>
              <div className="relative">
                <Key className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{loading ? 'Accediendo...' : 'Iniciar Sesión'}</span>
            </button>
          </form>

          {/* Quick Demo Help */}
          {!isCloud && (
            <div className="mt-6 pt-6 border-t border-slate-800 text-center">
              <p className="text-[11px] text-slate-400">
                Tip: En modo de prueba puedes ingresar cualquier correo (ej: <code className="text-blue-400">admin@mednova.com</code>) y contraseña de al menos 4 caracteres.
              </p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
