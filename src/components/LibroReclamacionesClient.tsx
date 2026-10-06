'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { COMPANY_INFO } from '@/lib/data';

interface FormData {
  hojaNumero: string;
  fecha: string;
  // Consumidor
  nombre: string;
  tipoDoc: string;
  numDoc: string;
  telefono: string;
  email: string;
  domicilio: string;
  departamento: string;
  provincia: string;
  distrito: string;
  esMenor: boolean;
  apoderadoNombre: string;
  apoderadoTipoDoc: string;
  apoderadoNumDoc: string;
  // Bien contratado
  tipoBien: 'Producto' | 'Servicio';
  monto: string;
  descripcionBien: string;
  // Reclamacion
  tipoReclamo: 'Reclamo' | 'Queja';
  detalle: string;
  pedido: string;
  // Consentimiento
  aceptaNotificacion: boolean;
  honeypot: string;
}

export default function LibroReclamacionesClient() {
  const [hojaCorrelativo, setHojaCorrelativo] = useState('');
  const [fechaActual, setFechaActual] = useState('');
  const [enviado, setEnviado] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState<FormData>({
    hojaNumero: '',
    fecha: '',
    nombre: '',
    tipoDoc: 'DNI',
    numDoc: '',
    telefono: '',
    email: '',
    domicilio: '',
    departamento: 'Lima',
    provincia: 'Lima',
    distrito: 'San Borja',
    esMenor: false,
    apoderadoNombre: '',
    apoderadoTipoDoc: 'DNI',
    apoderadoNumDoc: '',
    tipoBien: 'Producto',
    monto: '',
    descripcionBien: '',
    tipoReclamo: 'Reclamo',
    detalle: '',
    pedido: '',
    aceptaNotificacion: true,
    honeypot: '',
  });

  useEffect(() => {
    // Generar correlativo formal MED-2026-XXXX
    const now = new Date();
    const year = now.getFullYear();
    const randomSeq = Math.floor(1000 + Math.random() * 9000);
    const corr = `MED-${year}-${randomSeq}`;
    const dateFormatted = now.toLocaleDateString('es-PE', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
    setHojaCorrelativo(corr);
    setFechaActual(dateFormatted);
    setForm((prev) => ({
      ...prev,
      hojaNumero: corr,
      fecha: dateFormatted,
    }));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.honeypot) return; // Anti-spam bot trap
    if (!form.aceptaNotificacion) {
      alert('Debe aceptar la notificación al correo electrónico conforme a ley.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setEnviado(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 600);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppBackup = () => {
    const text = encodeURIComponent(
      `Hola Mednova Technologies, he registrado la Hoja de Reclamación Digital N° ${form.hojaNumero} a nombre de ${form.nombre} (${form.tipoDoc} ${form.numDoc}). Tipo: ${form.tipoReclamo}. Solicito constancia de recepción.`
    );
    window.open(`https://wa.me/${COMPANY_INFO.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <>
      {/* Print-specific style */}
      <style jsx global>{`
        @media print {
          nav,
          header.site-header,
          footer,
          .no-print,
          #whatsapp-floating-btn {
            display: none !important;
          }
          body {
            background-color: #ffffff !important;
            color: #000000 !important;
            padding: 0 !important;
            font-size: 11pt !important;
          }
          .printable-sheet {
            border: 2px solid #001041 !important;
            box-shadow: none !important;
            padding: 24px !important;
            margin: 0 !important;
            max-width: 100% !important;
          }
        }
      `}</style>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation (Hidden when printing) */}
        <nav className="mb-6 flex items-center gap-2 text-xs text-[#8c9096] uppercase tracking-wider no-print" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-teal-ink transition-colors">
            Inicio
          </Link>
          <span>/</span>
          <span className="text-[#001041] font-semibold">Libro de Reclamaciones</span>
        </nav>

        {/* Header Section */}
        <header className="mb-8 pb-6 border-b border-dashed border-[#D2D3D5] no-print">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <img
                src="/images/libro_reclamaciones.webp"
                alt="Libro de Reclamaciones Oficial INDECOPI"
                className="h-16 w-auto object-contain shrink-0 rounded bg-white p-1 border border-[#D2D3D5] shadow-sm"
              />
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-[#001041] text-teal-ink text-xs font-mono tracking-widest uppercase mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#009EBC]" />
                  Ley N° 29571 &amp; D.S. N° 011-2011-PCM • INDECOPI
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-light text-[#001041] tracking-tight">
                  LIBRO DE RECLAMACIONES VIRTUAL
                </h1>
                <p className="text-xs sm:text-sm text-[#494f52] font-mono mt-1">
                  Hoja de Reclamación Digital N° <strong className="text-teal-ink">{hojaCorrelativo}</strong>
                </p>
              </div>
            </div>

            {/* Technical Provider Box */}
            <div className="bg-white border border-[#D2D3D5] p-3.5 text-xs text-[#494f52] space-y-1 font-mono shrink-0 md:max-w-xs shadow-sm">
              <p className="font-bold text-[#001041] uppercase tracking-wider text-xs pb-1 border-b border-dashed border-[#D2D3D5]">
                MEDNOVA TECHNOLOGIES S.A.C.
              </p>
              <p><strong>RUC:</strong> 20601234567</p>
              <p><strong>Dirección:</strong> {COMPANY_INFO.address}</p>
              <p><strong>Correo:</strong> <span className="text-teal-ink">{COMPANY_INFO.email}</span></p>
            </div>
          </div>
        </header>

        {/* Notice Box: Difference between Reclamo vs Queja */}
        <section className="mb-8 p-4 sm:p-5 bg-white border-l-4 border-[#009EBC] border-[#D2D3D5] border text-sm sm:text-sm text-[#494f52] space-y-2 shadow-sm no-print">
          <p className="font-bold text-xs uppercase tracking-wider text-[#001041]">
            Diferencia Legal Importante (D.S. N° 011-2011-PCM modificado por D.S. N° 101-2022-PCM):
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-2.5 bg-[#f8fafc] border border-dashed border-[#D2D3D5]">
              <strong className="text-[#001041] block mb-1">✓ RECLAMO:</strong>
              Disconformidad relacionada directamente con los equipos biomédicos, consumibles o servicios quirúrgicos adquiridos.
            </div>
            <div className="p-2.5 bg-[#f8fafc] border border-dashed border-[#D2D3D5]">
              <strong className="text-[#001041] block mb-1">✓ QUEJA:</strong>
              Disconformidad no relacionada a los productos o servicios; malestar o descontento respecto a la atención técnica o administrativa.
            </div>
          </div>
          <p className="text-sm text-[#8c9096] pt-1">
            * Conforme a la normativa vigente, la respuesta formal a su reclamo o queja será remitida en un plazo máximo de <strong>15 días hábiles</strong> improrrogables a su correo electrónico.
          </p>
        </section>

        {/* CONDICIONAL: Éxito vs Formulario */}
        {enviado ? (
          /* VISTA DE CONSTANCIA FORMAL IMPRIMIBLE */
          <div className="bg-white border-2 border-[#001041] p-6 sm:p-10 shadow-md printable-sheet space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b-2 border-[#001041] gap-4">
              <div>
                <p className="text-xs font-mono font-bold tracking-widest text-teal-ink uppercase">
                  MEDNOVA TECHNOLOGIES S.A.C.
                </p>
                <h2 className="text-xl sm:text-2xl font-light text-[#001041]">
                  CONSTANCIA DE HOJA DE RECLAMACIÓN DIGITAL
                </h2>
                <p className="text-xs font-mono text-[#8c9096] mt-0.5">
                  Fecha de registro: {form.fecha}
                </p>
              </div>
              <div className="text-left sm:text-right font-mono text-xs">
                <span className="inline-block px-3 py-1 bg-[#001041] text-white font-bold text-sm">
                  {form.hojaNumero}
                </span>
                <p className="text-emerald-700 font-semibold mt-1">✓ REGISTRADA CON ÉXITO</p>
              </div>
            </div>

            {/* Datos del Consumidor */}
            <div className="space-y-4 text-sm sm:text-sm">
              <h3 className="font-bold text-[#001041] uppercase tracking-wider text-xs pb-1 border-b border-dashed border-[#D2D3D5]">
                1. Datos del Consumidor Reclamante
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 bg-[#f8fafc] p-4 border border-[#D2D3D5]">
                <div>
                  <span className="text-[#8c9096] block text-sm">Nombre / Razón Social:</span>
                  <span className="font-semibold text-[#001041]">{form.nombre}</span>
                </div>
                <div>
                  <span className="text-[#8c9096] block text-sm">Documento de Identidad:</span>
                  <span className="font-semibold text-[#001041]">{form.tipoDoc} - {form.numDoc}</span>
                </div>
                <div>
                  <span className="text-[#8c9096] block text-sm">Teléfono de Contacto:</span>
                  <span className="font-semibold text-[#001041]">{form.telefono}</span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-[#8c9096] block text-sm">Correo Electrónico (Notificación):</span>
                  <span className="font-semibold text-[#001041]">{form.email}</span>
                </div>
                <div>
                  <span className="text-[#8c9096] block text-sm">Ubicación:</span>
                  <span className="font-semibold text-[#001041]">{form.distrito}, {form.provincia} - {form.departamento}</span>
                </div>
                <div className="sm:col-span-3">
                  <span className="text-[#8c9096] block text-sm">Domicilio Legal:</span>
                  <span className="font-semibold text-[#001041]">{form.domicilio}</span>
                </div>
                {form.esMenor && (
                  <div className="sm:col-span-3 pt-2 border-t border-dashed border-[#D2D3D5]">
                    <span className="text-[#8c9096] block text-sm">Padre, Madre o Apoderado:</span>
                    <span className="font-semibold text-[#001041]">
                      {form.apoderadoNombre} ({form.apoderadoTipoDoc} {form.apoderadoNumDoc})
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Datos del Bien Contratado */}
            <div className="space-y-4 text-sm sm:text-sm">
              <h3 className="font-bold text-[#001041] uppercase tracking-wider text-xs pb-1 border-b border-dashed border-[#D2D3D5]">
                2. Identificación del Bien o Servicio Contratado
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#f8fafc] p-4 border border-[#D2D3D5]">
                <div>
                  <span className="text-[#8c9096] block text-sm">Tipo de Contratación:</span>
                  <span className="font-semibold text-[#001041]">{form.tipoBien}</span>
                </div>
                <div>
                  <span className="text-[#8c9096] block text-sm">Monto Reclamado:</span>
                  <span className="font-semibold text-[#001041]">{form.monto ? `S/ ${form.monto}` : 'No consignado'}</span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-[#8c9096] block text-sm">Detalle del Equipo / Servicio:</span>
                  <span className="font-semibold text-[#001041]">{form.descripcionBien}</span>
                </div>
              </div>
            </div>

            {/* Detalle de Reclamación */}
            <div className="space-y-4 text-sm sm:text-sm">
              <h3 className="font-bold text-[#001041] uppercase tracking-wider text-xs pb-1 border-b border-dashed border-[#D2D3D5]">
                3. Detalle de la Reclamación ({form.tipoReclamo})
              </h3>
              <div className="space-y-3 bg-[#f8fafc] p-4 border border-[#D2D3D5]">
                <div>
                  <span className="text-[#8c9096] block text-xs mb-1 font-semibold uppercase">
                    Detalle del Reclamo o Queja:
                  </span>
                  <p className="text-[#001041] whitespace-pre-wrap leading-relaxed">{form.detalle}</p>
                </div>
                <div className="pt-3 border-t border-dashed border-[#D2D3D5]">
                  <span className="text-[#8c9096] block text-xs mb-1 font-semibold uppercase">
                    Pedido Concreto del Reclamante:
                  </span>
                  <p className="text-[#001041] whitespace-pre-wrap leading-relaxed">{form.pedido}</p>
                </div>
              </div>
            </div>

            {/* Acciones de la constancia (No print) */}
            <div className="pt-6 border-t-2 border-[#001041] flex flex-wrap items-center justify-between gap-4 no-print">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-5 py-2.5 bg-[#001041] text-white hover:bg-teal-ink transition-colors font-mono text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm"
                >
                  🖨️ Imprimir / Guardar en PDF
                </button>
                <button
                  type="button"
                  onClick={handleWhatsAppBackup}
                  className="px-4 py-2.5 border border-[#009EBC] text-teal-ink hover:bg-teal-ink hover:text-white transition-colors font-mono text-xs uppercase tracking-wider flex items-center gap-2"
                >
                  💬 Enviar a WhatsApp
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  setEnviado(false);
                  window.location.reload();
                }}
                className="text-xs text-[#8c9096] hover:text-[#001041] underline font-mono"
              >
                ← Registrar otra reclamación
              </button>
            </div>
          </div>
        ) : (
          /* FORMULARIO OFICIAL */
          <form onSubmit={handleSubmit} className="bg-white border border-[#D2D3D5] p-6 sm:p-10 shadow-sm space-y-8 text-sm sm:text-sm">
            
            {/* Honeypot Bot Trap */}
            <input
              type="text"
              name="honeypot"
              value={form.honeypot}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />

            {/* SECCIÓN 1: DATOS DEL CONSUMIDOR */}
            <section className="space-y-4">
              <h2 className="text-base font-semibold text-[#001041] uppercase tracking-wider pb-2 border-b border-[#009EBC] flex items-center gap-2">
                <span className="w-2 h-2 bg-[#009EBC]" />
                1. Identificación del Consumidor Reclamante
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#494f52] mb-1">
                    Nombres y Apellidos / Razón Social *
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    required
                    placeholder="Ej. Dr. Carlos Mendoza / Clínica Central"
                    className="w-full px-3 py-2 bg-[#f8fafc] border border-[#D2D3D5] focus:border-[#009EBC] focus:outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#494f52] mb-1">
                      Tipo Doc. *
                    </label>
                    <select
                      name="tipoDoc"
                      value={form.tipoDoc}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 bg-[#f8fafc] border border-[#D2D3D5] focus:border-[#009EBC] focus:outline-none transition-colors"
                    >
                      <option value="DNI">DNI</option>
                      <option value="RUC">RUC</option>
                      <option value="Carnet Ext.">Carnet de Extranjería</option>
                      <option value="Pasaporte">Pasaporte</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#494f52] mb-1">
                      N° Documento *
                    </label>
                    <input
                      type="text"
                      name="numDoc"
                      value={form.numDoc}
                      onChange={handleChange}
                      required
                      placeholder="Número"
                      className="w-full px-3 py-2 bg-[#f8fafc] border border-[#D2D3D5] focus:border-[#009EBC] focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#494f52] mb-1">
                    Teléfono / WhatsApp de Contacto *
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    value={form.telefono}
                    onChange={handleChange}
                    required
                    placeholder="+51 987 654 321"
                    className="w-full px-3 py-2 bg-[#f8fafc] border border-[#D2D3D5] focus:border-[#009EBC] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-[#494f52] mb-1">
                    Correo Electrónico (Notificación Formal) *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="correo@ejemplo.com"
                    className="w-full px-3 py-2 bg-[#f8fafc] border border-[#D2D3D5] focus:border-[#009EBC] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#494f52] mb-1">
                  Domicilio Completo (Av./Calle, N°, Urb., Dpto.) *
                </label>
                <input
                  type="text"
                  name="domicilio"
                  value={form.domicilio}
                  onChange={handleChange}
                  required
                  placeholder="Ej. Av. Javier Prado Este 1234, Dpto. 401"
                  className="w-full px-3 py-2 bg-[#f8fafc] border border-[#D2D3D5] focus:border-[#009EBC] focus:outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#494f52] mb-1">Departamento *</label>
                  <input
                    type="text"
                    name="departamento"
                    value={form.departamento}
                    onChange={handleChange}
                    required
                    placeholder="Lima"
                    className="w-full px-3 py-2 bg-[#f8fafc] border border-[#D2D3D5] focus:border-[#009EBC] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-[#494f52] mb-1">Provincia *</label>
                  <input
                    type="text"
                    name="provincia"
                    value={form.provincia}
                    onChange={handleChange}
                    required
                    placeholder="Lima"
                    className="w-full px-3 py-2 bg-[#f8fafc] border border-[#D2D3D5] focus:border-[#009EBC] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-[#494f52] mb-1">Distrito *</label>
                  <input
                    type="text"
                    name="distrito"
                    value={form.distrito}
                    onChange={handleChange}
                    required
                    placeholder="San Borja"
                    className="w-full px-3 py-2 bg-[#f8fafc] border border-[#D2D3D5] focus:border-[#009EBC] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Casilla Menor de edad conforme D.S. N° 101-2022-PCM */}
              <div className="pt-2">
                <label className="inline-flex items-center gap-2 cursor-pointer font-mono text-xs text-[#001041]">
                  <input
                    type="checkbox"
                    name="esMenor"
                    checked={form.esMenor}
                    onChange={handleChange}
                    className="rounded border-[#D2D3D5] text-teal-ink focus:ring-0"
                  />
                  <span>El consumidor reclamante es menor de edad</span>
                </label>
                {form.esMenor && (
                  <div className="mt-3 p-4 bg-[#f8fafc] border border-dashed border-[#D2D3D5] space-y-3">
                    <p className="text-xs text-[#8c9096] font-mono">
                      * Ingrese los datos del padre, madre o apoderado legal conforme a ley:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-mono text-[#494f52] mb-1">Nombre del Apoderado *</label>
                        <input
                          type="text"
                          name="apoderadoNombre"
                          value={form.apoderadoNombre}
                          onChange={handleChange}
                          required={form.esMenor}
                          placeholder="Nombre completo"
                          className="w-full px-3 py-2 bg-white border border-[#D2D3D5] text-sm focus:border-[#009EBC] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-[#494f52] mb-1">Doc. Apoderado *</label>
                        <input
                          type="text"
                          name="apoderadoNumDoc"
                          value={form.apoderadoNumDoc}
                          onChange={handleChange}
                          required={form.esMenor}
                          placeholder="DNI / Carnet"
                          className="w-full px-3 py-2 bg-white border border-[#D2D3D5] text-sm focus:border-[#009EBC] focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* SECCIÓN 2: BIEN CONTRATADO */}
            <section className="space-y-4 pt-4 border-t border-dashed border-[#D2D3D5]">
              <h2 className="text-base font-semibold text-[#001041] uppercase tracking-wider pb-2 border-b border-[#009EBC] flex items-center gap-2">
                <span className="w-2 h-2 bg-[#009EBC]" />
                2. Identificación del Bien o Servicio Contratado
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#494f52] mb-1">
                    Tipo de Contratación *
                  </label>
                  <div className="flex items-center gap-6 py-2">
                    <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-mono">
                      <input
                        type="radio"
                        name="tipoBien"
                        value="Producto"
                        checked={form.tipoBien === 'Producto'}
                        onChange={handleChange}
                        className="text-teal-ink"
                      />
                      <span>Producto (Equipo / Consumibles)</span>
                    </label>
                    <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-mono">
                      <input
                        type="radio"
                        name="tipoBien"
                        value="Servicio"
                        checked={form.tipoBien === 'Servicio'}
                        onChange={handleChange}
                        className="text-teal-ink"
                      />
                      <span>Servicio (Demostración / Soporte)</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#494f52] mb-1">
                    Monto Reclamado en S/ (Opcional)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="monto"
                    value={form.monto}
                    onChange={handleChange}
                    placeholder="0.00"
                    className="w-full px-3 py-2 bg-[#f8fafc] border border-[#D2D3D5] focus:border-[#009EBC] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#494f52] mb-1">
                  Descripción o Detalle del Equipo / Servicio Adquirido *
                </label>
                <input
                  type="text"
                  name="descripcionBien"
                  value={form.descripcionBien}
                  onChange={handleChange}
                  required
                  placeholder="Ej. Láser Tulio Urolase MAX / Fibras de cuarzo 272µm / Demo quirúrgica de litotricia"
                  className="w-full px-3 py-2 bg-[#f8fafc] border border-[#D2D3D5] focus:border-[#009EBC] focus:outline-none transition-colors"
                />
              </div>
            </section>

            {/* SECCIÓN 3: RECLAMACIÓN */}
            <section className="space-y-4 pt-4 border-t border-dashed border-[#D2D3D5]">
              <h2 className="text-base font-semibold text-[#001041] uppercase tracking-wider pb-2 border-b border-[#009EBC] flex items-center gap-2">
                <span className="w-2 h-2 bg-[#009EBC]" />
                3. Detalle de la Reclamación
              </h2>

              <div>
                <label className="block text-xs font-mono uppercase text-[#494f52] mb-1">
                  Tipo de Reclamación *
                </label>
                <div className="flex items-center gap-6 py-1">
                  <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-mono">
                    <input
                      type="radio"
                      name="tipoReclamo"
                      value="Reclamo"
                      checked={form.tipoReclamo === 'Reclamo'}
                      onChange={handleChange}
                      className="text-teal-ink"
                    />
                    <span className="font-semibold text-[#001041]">RECLAMO</span>
                    <span className="text-sm text-[#8c9096]">(Disconformidad con producto/servicio)</span>
                  </label>
                  <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-mono">
                    <input
                      type="radio"
                      name="tipoReclamo"
                      value="Queja"
                      checked={form.tipoReclamo === 'Queja'}
                      onChange={handleChange}
                      className="text-teal-ink"
                    />
                    <span className="font-semibold text-[#001041]">QUEJA</span>
                    <span className="text-sm text-[#8c9096]">(Malestar con la atención recibida)</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#494f52] mb-1">
                  Detalle del Reclamo o Queja (Hechos sucedidos) *
                </label>
                <textarea
                  name="detalle"
                  value={form.detalle}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Describa con la mayor claridad y detalle posible los motivos de su disconformidad..."
                  className="w-full px-3 py-2 bg-[#f8fafc] border border-[#D2D3D5] focus:border-[#009EBC] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#494f52] mb-1">
                  Pedido Concreto (¿Qué solución solicita a Mednova Technologies?) *
                </label>
                <textarea
                  name="pedido"
                  value={form.pedido}
                  onChange={handleChange}
                  required
                  rows={3}
                  placeholder="Detalle su pretensión o solución solicitada..."
                  className="w-full px-3 py-2 bg-[#f8fafc] border border-[#D2D3D5] focus:border-[#009EBC] focus:outline-none transition-colors"
                />
              </div>
            </section>

            {/* SECCIÓN 4: DECLARACIÓN LEGAL & ENVÍO */}
            <section className="space-y-4 pt-4 border-t border-dashed border-[#D2D3D5]">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="aceptaNotificacion"
                  checked={form.aceptaNotificacion}
                  onChange={handleChange}
                  required
                  className="mt-1 rounded border-[#D2D3D5] text-teal-ink focus:ring-0"
                />
                <span className="text-sm text-[#494f52] leading-relaxed">
                  Autorizo expresamente a <strong>MEDNOVA TECHNOLOGIES S.A.C.</strong> a remitir la respuesta formal a mi reclamación a la dirección de correo electrónico consignada en el presente formulario, dentro del plazo legal de <strong>15 días hábiles</strong> establecido por el D.S. N° 011-2011-PCM modificado por el D.S. N° 101-2022-PCM. Declaro bajo juramento que los datos aportados son verídicos.
                </span>
              </label>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-[#8c9096] font-mono">
                  * Campos obligatorios marcados con asterisco.
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3 bg-[#001041] hover:bg-teal-ink text-white transition-colors font-mono text-xs uppercase tracking-wider font-semibold shadow-sm flex items-center justify-center gap-2"
                >
                  {isSubmitting ? 'Registrando Hoja...' : 'Registrar Reclamación Formal →'}
                </button>
              </div>
            </section>

          </form>
        )}

      </div>
    </>
  );
}
