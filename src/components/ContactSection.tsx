'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, CheckCircle, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO, INITIAL_SPECIALTIES } from '@/lib/data';
import { supabase } from '@/lib/supabase';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    institution: '',
    email: '',
    phone: '',
    product_interest: 'Láser Quirúrgico Holmium 100W',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (supabase) {
        await supabase.from('leads').insert([formData]);
      }
    } catch (err) {
      console.warn('Error saving lead to Supabase', err);
    }

    // Direct WhatsApp fallback / notification option
    const waText = `Hola Mednova, soy ${formData.name} de ${formData.institution || 'particular'}. Deseo cotización para: ${formData.product_interest}. Mensaje: ${formData.message || 'Sin mensaje adicional'}. Mi teléfono de contacto es: ${formData.phone}`;
    const waUrl = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(waText)}`;

    setLoading(false);
    setSubmitted(true);

    // Optional redirect to WhatsApp after 1.5 seconds
    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 1200);
  };

  return (
    <section id="contacto" className="py-8 sm:py-14 bg-transparent relative scroll-mt-14 font-mono-tech">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-dashed border-[#D2D3D5] text-[#001041] bg-[#001041]/5 text-xs font-mono-tech tracking-widest uppercase">
            05 • Atención Especializada B2B
          </div>
          <h1 className="font-heading font-light uppercase text-3xl sm:text-5xl text-[#001041] tracking-tight">
            Contacto &amp; Solicitud de Cotización
          </h1>
          <p className="text-xs sm:text-sm text-[#494f52] leading-relaxed max-w-2xl mx-auto font-mono-tech">
            Póngase en contacto con nuestro equipo de ingeniería biomédica y especialistas clínicos. Le responderemos en menos de 24 horas con una propuesta técnico-económica formal.
          </p>
        </div>

        {/* Contact Layout */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-3xl bg-[#001041] text-white space-y-6 relative overflow-hidden shadow-xl border border-[#D2D3D5]/20">
              <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-[#009EBC]/15 rounded-full blur-2xl pointer-events-none" />

              <div>
                <span className="text-[11px] font-bold text-[#009EBC] uppercase tracking-widest font-mono-tech">Sede Central</span>
                <h3 className="text-2xl font-bold mt-1 font-heading">{COMPANY_INFO.name}</h3>
                <p className="text-xs text-[#D2D3D5] mt-2 leading-relaxed">
                  {COMPANY_INFO.description}
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-[#D2D3D5]/20 text-xs text-[#D2D3D5]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#009EBC] shrink-0 mt-0.5" />
                  <span>{COMPANY_INFO.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#009EBC] shrink-0" />
                  <span>{COMPANY_INFO.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#009EBC] shrink-0" />
                  <span>{COMPANY_INFO.salesEmail}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#009EBC] shrink-0 mt-0.5" />
                  <span>{COMPANY_INFO.workingHours}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#D2D3D5]/20">
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent('Hola Mednova, deseo atención inmediata de un asesor clínico.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-[#009EBC] hover:bg-[#00819a] text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#009EBC]/30 font-mono-tech"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat Directo por WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Quality badge */}
            <div className="p-6 rounded-3xl bg-[#f4f5f6] border border-[#D2D3D5] flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#001041]/5 text-[#009EBC] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="text-xs">
                <p className="font-bold text-[#001041]">Privacidad & Confidencialidad</p>
                <p className="text-[#494f52] leading-relaxed mt-0.5">
                  Toda la información institucional y solicitudes de cotización son tratadas con estricta confidencialidad médica.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Quote Request Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl border border-[#D2D3D5] bg-white shadow-xl shadow-slate-200/50">
              
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#009EBC]/15 text-[#009EBC] flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#001041] font-heading">¡Solicitud Recibida con Éxito!</h3>
                  <p className="text-[#494f52] text-sm max-w-md mx-auto leading-relaxed">
                    Hemos registrado tu solicitud. Te estamos redirigiendo a nuestro canal de WhatsApp para una atención prioritaria con un ingeniero clínico.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded-xl bg-[#f4f5f6] hover:bg-[#eaebec] text-[#001041] border border-[#D2D3D5] text-xs font-semibold"
                  >
                    Enviar otra consulta
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-[#001041] font-heading">Solicitar Cotización y Demostración</h3>
                    <p className="text-xs text-[#8c9096] mt-1">Complete los datos de su institución de salud.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#001041]">Nombre Completo *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Dr. / Lic. / Ing."
                        className="w-full px-4 py-2.5 bg-[#f4f5f6] border border-[#D2D3D5] rounded-xl text-xs text-[#001041] focus:outline-none focus:ring-2 focus:ring-[#009EBC]/20 focus:border-[#009EBC]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#001041]">Clínica / Hospital / Institución</label>
                      <input
                        type="text"
                        value={formData.institution}
                        onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                        placeholder="Nombre de la institución"
                        className="w-full px-4 py-2.5 bg-[#f4f5f6] border border-[#D2D3D5] rounded-xl text-xs text-[#001041] focus:outline-none focus:ring-2 focus:ring-[#009EBC]/20 focus:border-[#009EBC]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#001041]">Correo Electrónico Institucional *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="ejemplo@clinica.com"
                        className="w-full px-4 py-2.5 bg-[#f4f5f6] border border-[#D2D3D5] rounded-xl text-xs text-[#001041] focus:outline-none focus:ring-2 focus:ring-[#009EBC]/20 focus:border-[#009EBC]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#001041]">Teléfono / Celular *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+51 999 999 999"
                        className="w-full px-4 py-2.5 bg-[#f4f5f6] border border-[#D2D3D5] rounded-xl text-xs text-[#001041] focus:outline-none focus:ring-2 focus:ring-[#009EBC]/20 focus:border-[#009EBC]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#001041]">Equipo o Solución de Interés *</label>
                    <select
                      value={formData.product_interest}
                      onChange={(e) => setFormData({ ...formData, product_interest: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#f4f5f6] border border-[#D2D3D5] rounded-xl text-xs text-[#001041] focus:outline-none focus:ring-2 focus:ring-[#009EBC]/20 focus:border-[#009EBC]"
                    >
                      <option value="Láser Quirúrgico Holmium 100W">Láser Quirúrgico Holmium 100W (HoLEP & Litotricia)</option>
                      <option value="Láser de Tulio TFL UltraPulse 60W">Láser de Tulio TFL UltraPulse 60W (Pulverización fina)</option>
                      <option value="Torre de Laparoscopía 4K UHD">Torre Quirúrgica de Endourología & Laparoscopía 4K</option>
                      <option value="Ureteroscopio Flexible Digital HD">Ureteroscopio Flexible Digital HD (RIRS)</option>
                      <option value="Sistema de Resección Bipolar RTU">Sistema de Resección Bipolar RTU Próstata</option>
                      <option value="Lote de Consumibles Urológicos">Lote de Consumibles (Fibras Láser, Stents Doble J)</option>
                      <option value="Equipamiento Integral de Quirófano">Asesoría Integral para Nuevo Quirófano</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#001041]">Requerimientos Específicos o Preguntas</label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Indique si requiere financiamiento, comodato, demostración in situ o fecha estimada..."
                      className="w-full px-4 py-2.5 bg-[#f4f5f6] border border-[#D2D3D5] rounded-xl text-xs text-[#001041] focus:outline-none focus:ring-2 focus:ring-[#009EBC]/20 focus:border-[#009EBC] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 px-6 rounded-xl bg-[#001041] hover:bg-[#009EBC] text-white font-bold text-xs uppercase tracking-wider border border-[#001041] hover:border-[#009EBC] shadow-lg shadow-[#001041]/25 transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5 cursor-pointer font-mono-tech"
                  >
                    <Send className="w-4 h-4 text-[#009EBC] group-hover:text-white" />
                    <span>{loading ? 'Procesando...' : 'Enviar Solicitud de Cotización'}</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
