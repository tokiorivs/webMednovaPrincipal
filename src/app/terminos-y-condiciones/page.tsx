import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Link from 'next/link';
import type { Metadata } from 'next';
import { COMPANY_INFO } from '@/lib/data';

export const metadata: Metadata = {
  alternates: { canonical: '/terminos-y-condiciones' },
  title: 'Términos y Condiciones',
  description: 'Términos y condiciones de provisión de tecnología biomédica urológica, soporte quirúrgico en quirófano y delimitación de responsabilidad B2B de Mednova Technologies S.A.C.',
};

export default function TerminosYCondicionesPage() {
  return (
    <div className="min-h-screen bg-[#f4f5f6] flex flex-col font-mono-tech selection:bg-teal-ink selection:text-white">
      <Navbar />

      <main className="flex-1 pt-24 sm:pt-28 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb Navigation */}
          <nav className="mb-6 flex items-center gap-2 text-xs text-[#8c9096] uppercase tracking-wider" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-teal-ink transition-colors">
              Inicio
            </Link>
            <span>/</span>
            <span className="text-[#001041] font-semibold">Términos y Condiciones</span>
          </nav>

          {/* Hero Header */}
          <header className="mb-10 pb-6 border-b border-dashed border-[#D2D3D5]">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#001041] text-teal-ink text-xs font-mono tracking-widest uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#009EBC]" />
              Marco Regulatorio B2B • Quirófano &amp; Tecnología Médica
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-[#001041] tracking-tight mb-3">
              TÉRMINOS Y CONDICIONES DE SERVICIO
            </h1>
            <p className="text-sm sm:text-sm text-[#494f52] max-w-3xl leading-relaxed">
              Vigencia 2026 • Plataforma de provisión, distribución biomédica y soporte quirúrgico especializado en urología para Lima y a nivel nacional en la República del Perú.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Sticky Table of Contents (Left side) */}
            <aside className="lg:col-span-4 sticky top-28 hidden lg:block">
              <div className="bg-white border border-[#D2D3D5] p-5 shadow-sm">
                <p className="text-xs font-mono uppercase tracking-widest text-[#8c9096] mb-3 pb-2 border-b border-dashed border-[#D2D3D5]">
                  [ ÍNDICE DE CLÁUSULAS ]
                </p>
                <nav className="flex flex-col gap-2 text-sm">
                  <a href="#aviso-primordial" className="text-[#001041] hover:text-teal-ink transition-colors py-1">
                    00. Aviso Legal y Clínico Primordial
                  </a>
                  <a href="#marco-b2b" className="text-[#001041] hover:text-teal-ink transition-colors py-1">
                    01. Identificación y Alcance de Servicios
                  </a>
                  <a href="#deslinde" className="text-[#001041] hover:text-teal-ink transition-colors py-1">
                    02. Deslinde de Responsabilidad Médica
                  </a>
                  <a href="#demostraciones" className="text-[#001041] hover:text-teal-ink transition-colors py-1">
                    03. Protocolo de Demostraciones en Quirófano
                  </a>
                  <a href="#seguridad-laser" className="text-[#001041] hover:text-teal-ink transition-colors py-1">
                    04. Seguridad láser &amp; Tissue Sensor
                  </a>
                  <a href="#cotizaciones" className="text-[#001041] hover:text-teal-ink transition-colors py-1">
                    05. Cotizaciones, Facturación &amp; Logística
                  </a>
                  <a href="#propiedad-intelectual" className="text-[#001041] hover:text-teal-ink transition-colors py-1">
                    06. Propiedad Intelectual &amp; Patentes
                  </a>
                  <a href="#jurisdiccion" className="text-[#001041] hover:text-teal-ink transition-colors py-1">
                    07. Ley Aplicable &amp; Jurisdicción
                  </a>
                </nav>

                <div className="mt-6 pt-4 border-t border-dashed border-[#D2D3D5] text-sm text-[#494f52]">
                  <p className="font-semibold text-[#001041] mb-1">¿Dudas contractuales?</p>
                  <p className="mb-2">Contáctanos directamente con nuestro equipo legal y comercial:</p>
                  <a href={`mailto:${COMPANY_INFO.email}`} className="text-teal-ink hover:underline font-mono">
                    {COMPANY_INFO.email}
                  </a>
                </div>
              </div>
            </aside>

            {/* Main Content Area (Right side) */}
            <div className="lg:col-span-8 bg-white border border-[#D2D3D5] p-6 sm:p-10 shadow-sm space-y-10 text-sm leading-relaxed text-[#17181a]">
              
              {/* Box: Aviso Legal Primordial */}
              <section id="aviso-primordial" className="p-5 border-l-4 border-[#009EBC] bg-[#009EBC]/5 space-y-2">
                <p className="font-bold text-xs uppercase tracking-wider text-[#001041]">
                  AVISO LEGAL Y CLÍNICO PRIMORDIAL
                </p>
                <p className="text-sm sm:text-sm text-[#001041]">
                  <strong>MEDNOVA TECHNOLOGIES S.A.C.</strong> es una empresa proveedora de equipamiento biomédico, consumibles y asistencia técnica quirúrgica en sala. <strong>Mednova no es una clínica, no es un centro de salud ni arrienda salas de operaciones.</strong> El traslado y puesta en marcha de nuestros equipos se efectúa exclusivamente a instituciones hospitalarias o centros quirúrgicos debidamente autorizados por <strong>SUSALUD</strong>, donde el cirujano solicitante cuente con programación quirúrgica formal aprobada.
                </p>
              </section>

              {/* 01. Naturaleza y Alcance */}
              <section id="marco-b2b" className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-teal-ink font-mono font-bold text-xs">01 //</span>
                  <h2 className="text-xl font-normal text-[#001041] tracking-tight">
                    Naturaleza y Alcance de los Servicios Prestados
                  </h2>
                </div>
                <p>
                  Bienvenido al portal institucional de <strong>MEDNOVA TECHNOLOGIES S.A.C.</strong> (en adelante, &quot;Mednova&quot;), con domicilio fiscal en {COMPANY_INFO.address}. La navegación por este sitio web y la solicitud de cotizaciones, demostraciones en quirófano o suministros biomédicos se rigen por las presentes cláusulas contractuales.
                </p>
                <p>
                  Mednova ofrece soluciones integrales de tecnología médica especializada para procedimientos urológicos y mínimamente invasivos (litotricia láser y cirugía de tejidos blandos, incluida la enucleación de próstata), incluyendo:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-sm sm:text-sm text-[#494f52]">
                  <li>
                    <strong>Suministro y distribución autorizada</strong> en Perú de productos de VPG LaserOne: el sistema láser de fibra de tulio Urolase MAX y las fibras quirúrgicas VPG.
                  </li>
                  <li>
                    <strong>Mentoría y servicio postventa:</strong> Servicios personalizados, definidos con cada institución.
                  </li>
                  <li>
                    <strong>Consumibles quirúrgicos:</strong> Fibras quirúrgicas VPG OnePush, HP y LP.
                  </li>
                  <li>
                    <strong>Demostraciones clínicas programadas (Demos):</strong> Despliegue de equipos a centros quirúrgicos para validación práctica in situ por parte de cirujanos urólogos.
                  </li>
                </ul>
              </section>

              {/* 02. Deslinde de Responsabilidad */}
              <section id="deslinde" className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-teal-ink font-mono font-bold text-xs">02 //</span>
                  <h2 className="text-xl font-normal text-[#001041] tracking-tight">
                    Deslinde de Responsabilidad Médica y Quirúrgica
                  </h2>
                </div>
                <p>
                  Para todos los efectos legales, civiles y deontológicos aplicables en el territorio de la República del Perú:
                </p>
                <div className="space-y-3 bg-[#f8fafc] p-4 border border-[#D2D3D5] text-sm sm:text-sm text-[#494f52]">
                  <p>
                    <strong className="text-[#001041]">a) Titularidad Exclusiva del Acto Médico:</strong> La indicación terapéutica, el diagnóstico del paciente, la elección de la técnica quirúrgica, la obtención y custodia del <strong>Consentimiento Informado</strong> y la ejecución del procedimiento recaen de forma <strong>exclusiva y excluyente en el Cirujano Principal tratante</strong> y en la institución médica receptora.
                  </p>
                  <p>
                    <strong className="text-[#001041]">b) Límites de la Asistencia Técnica:</strong> El personal especialista de producto o ingenieros biomédicos de Mednova actúa exclusivamente bajo el marco de soporte operativo y verificación de parámetros del fabricante. Bajo ninguna circunstancia toman decisiones clínicas, modifican prescripciones médicas ni intervienen directamente en el campo quirúrgico estéril del paciente.
                  </p>
                  <p>
                    <strong className="text-[#001041]">c) Resultados Clínicos:</strong> Mednova distribuye equipos y consumibles conforme a las especificaciones técnicas del fabricante, pero no garantiza ni asume responsabilidad por la evolución biológica o complicaciones inherentes al estado clínico previo del paciente intervenido.
                  </p>
                </div>
              </section>

              {/* 03. Protocolo de Demostraciones */}
              <section id="demostraciones" className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-teal-ink font-mono font-bold text-xs">03 //</span>
                  <h2 className="text-xl font-normal text-[#001041] tracking-tight">
                    Protocolo de Demostraciones y Demos en Quirófano
                  </h2>
                </div>
                <p>
                  Para la realización de demostraciones clínicas con el láser Urolase MAX o consolas endourológicas:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-sm sm:text-sm text-[#494f52]">
                  <li>
                    La solicitud debe coordinarse con un mínimo de <strong>48 a 72 horas de anticipación</strong> a través de nuestros canales oficiales (vía web, correo o WhatsApp oficial de atención).
                  </li>
                  <li>
                    La institución clínica o el cirujano solicitante debe garantizar que la sala de operaciones cuenta con el suministro eléctrico adecuado, según las indicaciones del fabricante.
                  </li>
                  <li>
                    Todo el instrumental debe manipularse de acuerdo con los protocolos de bioseguridad y esterilización hospitalaria aprobados por el Ministerio de Salud (MINSA).
                  </li>
                </ul>
              </section>

              {/* 04. Seguridad Láser Clase 4 */}
              <section id="seguridad-laser" className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-teal-ink font-mono font-bold text-xs">04 //</span>
                  <h2 className="text-xl font-normal text-[#001041] tracking-tight">
                    Seguridad láser y Tissue Sensor
                  </h2>
                </div>
                <p>
                  Los equipos láser médicos deben operarse con las medidas de seguridad láser indicadas por el fabricante:
                </p>
                <p className="text-sm sm:text-sm text-[#494f52]">
                  Es de cumplimiento obligatorio que todo el personal presente en quirófano (cirujanos, anestesiólogos, instrumentistas y personal de apoyo) porte <strong>gafas protectoras certificadas para la longitud de onda específica del equipo</strong>, según las indicaciones del fabricante, verificadas previo a la emisión del haz óptico.
                </p>
                <p className="text-sm sm:text-sm text-[#494f52]">
                  La plataforma Urolase MAX incorpora la tecnología de seguridad activa <strong>Tissue Sensor™</strong>, diseñada para detener la emisión del láser al detectar tejido blando durante la litotricia. Dicho mecanismo es una salvaguarda técnica y no reemplaza la prudencia y pericia del operador quirúrgico.
                </p>
              </section>

              {/* 05. Cotizaciones & Facturación */}
              <section id="cotizaciones" className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-teal-ink font-mono font-bold text-xs">05 //</span>
                  <h2 className="text-xl font-normal text-[#001041] tracking-tight">
                    Condiciones Económicas, Cotizaciones y Logística
                  </h2>
                </div>
                <ul className="list-disc pl-5 space-y-2 text-sm sm:text-sm text-[#494f52]">
                  <li>
                    <strong>Vigencia de Cotizaciones:</strong> Las cotizaciones formales emitidas a clínicas y médicos tienen una vigencia estándar de 15 a 30 días calendario, salvo estipulación expresa en la propuesta técnico-económica.
                  </li>
                  <li>
                    <strong>Moneda e Impuestos:</strong> Los precios son expresados en Dólares Americanos (USD) o Soles (PEN), detallando de forma transparente el Impuesto General a las Ventas (I.G.V. 18%) conforme a la legislación tributaria peruana.
                  </li>
                  <li>
                    <strong>Entrega y Trazabilidad:</strong> La documentación regulatoria y de trazabilidad aplicable a cada producto se detalla en la cotización correspondiente.
                  </li>
                </ul>
              </section>

              {/* 06. Propiedad Intelectual */}
              <section id="propiedad-intelectual" className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-teal-ink font-mono font-bold text-xs">06 //</span>
                  <h2 className="text-xl font-normal text-[#001041] tracking-tight">
                    Propiedad Intelectual y Derechos Reservados
                  </h2>
                </div>
                <p className="text-sm sm:text-sm text-[#494f52]">
                  Todos los contenidos de esta plataforma, incluyendo textos, gráficos, logotipos, diagramas técnicos, fichas clínicas, renders, marcas comerciales registradas y códigos de software, son propiedad exclusiva de <strong>MEDNOVA TECHNOLOGIES S.A.C.</strong> o de sus respectivos fabricantes y licenciantes internacionales. Queda terminantemente prohibida su reproducción, ingeniería inversa o distribución comercial no autorizada sin consentimiento escrito.
                </p>
              </section>

              {/* 07. Ley y Jurisdicción */}
              <section id="jurisdiccion" className="space-y-4 pt-4 border-t border-dashed border-[#D2D3D5]">
                <div className="flex items-center gap-2">
                  <span className="text-teal-ink font-mono font-bold text-xs">07 //</span>
                  <h2 className="text-xl font-normal text-[#001041] tracking-tight">
                    Ley Aplicable y Solución de Controversias
                  </h2>
                </div>
                <p className="text-sm sm:text-sm text-[#494f52]">
                  Los presentes Términos y Condiciones se interpretan y rigen íntegramente bajo las leyes de la <strong>República del Perú</strong>. Ante cualquier discrepancia, controversia o reclamo derivado de la interpretación de este marco, las partes se someten expresamente a la competencia de los jueces y tribunales del distrito judicial de <strong>Lima Cercado, Perú</strong>, renunciando al fuero de sus domicilios.
                </p>
              </section>

            </div>

          </div>

        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
