import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Link from 'next/link';
import type { Metadata } from 'next';
import { COMPANY_INFO } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Políticas de Privacidad • Mednova Technologies',
  description: 'Política de Privacidad y Tratamiento de Datos Personales de Mednova Technologies S.A.C. conforme a la Ley N° 29733 de la República del Perú. Garantía de confidencialidad y derechos ARCO.',
};

export default function PoliticasPrivacidadPage() {
  return (
    <div className="min-h-screen bg-[#f4f5f6] flex flex-col font-mono-tech selection:bg-[#009EBC] selection:text-white">
      <Navbar />

      <main className="flex-1 pt-24 sm:pt-28 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb Navigation */}
          <nav className="mb-6 flex items-center gap-2 text-xs text-[#8c9096] uppercase tracking-wider" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#009EBC] transition-colors">
              Inicio
            </Link>
            <span>/</span>
            <span className="text-[#001041] font-semibold">Políticas de Privacidad</span>
          </nav>

          {/* Hero Header */}
          <header className="mb-10 pb-6 border-b border-dashed border-[#D2D3D5]">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#001041] text-[#009EBC] text-[11px] font-mono tracking-widest uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#009EBC]" />
              Cumplimiento Ley N° 29733 &amp; D.S. N° 003-2013-JUS • Perú
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-[#001041] tracking-tight mb-3">
              POLÍTICA DE PRIVACIDAD Y PROTECCIÓN DE DATOS
            </h1>
            <p className="text-xs sm:text-sm text-[#494f52] max-w-3xl leading-relaxed">
              Tratamiento lícito, confidencialidad de datos clínicos y garantía de derechos ARCO de Mednova Technologies S.A.C. para especialistas médicos, clínicas e instituciones hospitalarias.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Sticky Table of Contents (Left side) */}
            <aside className="lg:col-span-4 sticky top-28 hidden lg:block">
              <div className="bg-white border border-[#D2D3D5] p-5 shadow-sm">
                <p className="text-xs font-mono uppercase tracking-widest text-[#8c9096] mb-3 pb-2 border-b border-dashed border-[#D2D3D5]">
                  [ ÍNDICE DE PRIVACIDAD ]
                </p>
                <nav className="flex flex-col gap-2 text-xs">
                  <a href="#titular" className="text-[#001041] hover:text-[#009EBC] transition-colors py-1">
                    01. Responsable del Tratamiento
                  </a>
                  <a href="#datos-recopilados" className="text-[#001041] hover:text-[#009EBC] transition-colors py-1">
                    02. Datos Recopilados y Conservación
                  </a>
                  <a href="#finalidades" className="text-[#001041] hover:text-[#009EBC] transition-colors py-1">
                    03. Finalidades del Tratamiento
                  </a>
                  <a href="#confidencialidad" className="text-[#001041] hover:text-[#009EBC] transition-colors py-1">
                    04. Confidencialidad y Datos en Quirófano
                  </a>
                  <a href="#seguridad" className="text-[#001041] hover:text-[#009EBC] transition-colors py-1">
                    05. Medidas de Seguridad &amp; Canales
                  </a>
                  <a href="#derechos-arco" className="text-[#001041] hover:text-[#009EBC] transition-colors py-1">
                    06. Ejercicio de Derechos ARCO
                  </a>
                  <a href="#cookies" className="text-[#001041] hover:text-[#009EBC] transition-colors py-1">
                    07. Tecnologías Web &amp; Cookies
                  </a>
                  <a href="#vigencia" className="text-[#001041] hover:text-[#009EBC] transition-colors py-1">
                    08. Modificaciones y Vigencia
                  </a>
                </nav>

                <div className="mt-6 pt-4 border-t border-dashed border-[#D2D3D5] text-[11px] text-[#494f52]">
                  <p className="font-semibold text-[#001041] mb-1">Oficial de Protección de Datos:</p>
                  <p className="mb-2">Escríbenos para solicitudes de derechos ARCO:</p>
                  <a href={`mailto:${COMPANY_INFO.email}`} className="text-[#009EBC] hover:underline font-mono">
                    {COMPANY_INFO.email}
                  </a>
                </div>
              </div>
            </aside>

            {/* Main Content Area (Right side) */}
            <div className="lg:col-span-8 bg-white border border-[#D2D3D5] p-6 sm:p-10 shadow-sm space-y-10 text-sm leading-relaxed text-[#17181a]">
              
              {/* Callout Box */}
              <section className="p-5 border-l-4 border-[#009EBC] bg-[#009EBC]/5 space-y-2">
                <p className="font-bold text-xs uppercase tracking-wider text-[#001041]">
                  PRINCIPIO DE TRANSPARENCIA Y ÉTICA CLÍNICA
                </p>
                <p className="text-xs sm:text-sm text-[#001041]">
                  En <strong>MEDNOVA TECHNOLOGIES S.A.C.</strong> no comercializamos, no alquilamos ni transferimos bases de datos a terceros con fines publicitarios. La recopilación de información se limita estrictamente a la emisión de cotizaciones formales, coordinación de demostraciones de tecnología láser en quirófano y cumplimiento normativo sanitario.
                </p>
              </section>

              {/* 01. Responsable */}
              <section id="titular" className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-[#009EBC] font-mono font-bold text-xs">01 //</span>
                  <h2 className="text-xl font-normal text-[#001041] tracking-tight">
                    Responsable del Tratamiento y Banco de Datos Personales
                  </h2>
                </div>
                <p>
                  En cumplimiento de la <strong>Ley N° 29733 (Ley de Protección de Datos Personales del Perú)</strong> y su Reglamento aprobado por <strong>D.S. N° 003-2013-JUS</strong>, le informamos sobre la titularidad del banco de datos:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-[#494f52]">
                  <li><strong>Razón Social:</strong> MEDNOVA TECHNOLOGIES S.A.C.</li>
                  <li><strong>Nombre Comercial:</strong> Mednova Technologies</li>
                  <li><strong>Domicilio Fiscal:</strong> {COMPANY_INFO.address}</li>
                  <li><strong>Actividad:</strong> Comercialización, distribución y soporte técnico especializado de equipamiento biomédico e instrumental urológico quirúrgico.</li>
                  <li><strong>Banco de Datos:</strong> Los datos personales recopilados a través del portal y canales digitales se incorporan al banco de datos denominado <strong>&quot;Clientes, Médicos y Contactos Comerciales&quot;</strong>, titularidad de Mednova Technologies S.A.C.</li>
                  <li><strong>Contacto Oficial de Privacidad:</strong> <a href={`mailto:${COMPANY_INFO.email}`} className="text-[#009EBC] hover:underline font-mono">{COMPANY_INFO.email}</a></li>
                </ul>
              </section>

              {/* 02. Datos Recopilados */}
              <section id="datos-recopilados" className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-[#009EBC] font-mono font-bold text-xs">02 //</span>
                  <h2 className="text-xl font-normal text-[#001041] tracking-tight">
                    Datos Personales Recopilados y Conservación
                  </h2>
                </div>
                <p>
                  A través de nuestros formularios de contacto, solicitud de cotización y suscripción al boletín técnico <em>Community Echo</em>, recopilamos únicamente los datos necesarios para brindar una atención profesional:
                </p>
                <div className="bg-[#f8fafc] p-4 border border-[#D2D3D5] space-y-2 text-xs sm:text-sm text-[#494f52]">
                  <p>• <strong>Datos de identificación y contacto profesional:</strong> Nombres, apellidos, número de teléfono/WhatsApp, correo electrónico institucional o personal.</p>
                  <p>• <strong>Datos institucionales:</strong> Clínica, hospital o centro de salud de adscripción, ciudad o departamento de atención médica.</p>
                  <p>• <strong>Interés técnico y asistencial:</strong> Tipo de tecnología requerida (Láser de Tulio TFL Urolase MAX, Láser Holmium, Torres 4K, consumibles o solicitud de demo en quirófano).</p>
                </div>
                <p className="text-xs sm:text-sm text-[#494f52]">
                  <strong>Plazo de Conservación:</strong> Los datos se conservarán durante el período necesario para atender la relación comercial y responder a las obligaciones legales o tributarias aplicables ante SUNAT y DIGEMID (hasta un máximo de 5 años conforme al Código Civil peruano).
                </p>
              </section>

              {/* 03. Finalidades */}
              <section id="finalidades" className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-[#009EBC] font-mono font-bold text-xs">03 //</span>
                  <h2 className="text-xl font-normal text-[#001041] tracking-tight">
                    Finalidades del Tratamiento de Datos
                  </h2>
                </div>
                <p>
                  El tratamiento de sus datos se rige por las siguientes finalidades explícitas y legítimas:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-[#494f52]">
                  <li>
                    <strong>Gestión Técnico-Comercial:</strong> Emisión de cotizaciones personalizadas de venta o arrendamiento de equipamiento biomédico e insumos quirúrgicos.
                  </li>
                  <li>
                    <strong>Coordinación Logística y Quirúrgica:</strong> Planificación del traslado, calibración biomédica e ingreso de nuestros especialistas de producto a centros quirúrgicos autorizados.
                  </li>
                  <li>
                    <strong>Actualizaciones Científicas (Community Echo):</strong> Remisión de boletines técnicos sobre avances en litotricia láser (Holmium &amp; Tulio TFL) y protocolos quirúrgicos mínimamente invasivos, únicamente cuando medie consentimiento previo y expreso del usuario.
                  </li>
                  <li>
                    <strong>Soporte Post-Venta y Garantía:</strong> Mantenimiento preventivo, calibración de microfibras ópticas y soporte de emergencia 24/7.
                  </li>
                </ul>
              </section>

              {/* 04. Confidencialidad en Quirófano */}
              <section id="confidencialidad" className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-[#009EBC] font-mono font-bold text-xs">04 //</span>
                  <h2 className="text-xl font-normal text-[#001041] tracking-tight">
                    Confidencialidad Médica y Delimitación en Sala de Operaciones
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-[#494f52]">
                  En consonancia con el artículo 15° de la <strong>Ley General de Salud (Ley N° 26842)</strong> y las directrices de <strong>SUSALUD</strong>:
                </p>
                <p className="text-xs sm:text-sm text-[#494f52]">
                  <strong>Mednova Technologies no recopila, no procesa ni almacena datos sensibles de pacientes ni historias clínicas.</strong> Durante el acompañamiento técnico en quirófano, nuestro personal mantiene estricto secreto profesional respecto a cualquier dato o circunstancia observada incidentalmente, centrándose exclusivamente en el correcto funcionamiento y calibración de la consola biomédica.
                </p>
              </section>

              {/* 05. Seguridad */}
              <section id="seguridad" className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-[#009EBC] font-mono font-bold text-xs">05 //</span>
                  <h2 className="text-xl font-normal text-[#001041] tracking-tight">
                    Medidas de Seguridad de la Información
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-[#494f52]">
                  Mednova ha adoptado las medidas técnicas, organizativas y legales requeridas por el D.S. N° 003-2013-JUS para evitar la pérdida, mal uso, alteración, acceso no autorizado o sustracción de los datos personales facilitados. Nuestra infraestructura web cuenta con certificados de seguridad <strong>SSL/TLS (HTTPS)</strong> con cifrado robusto de extremo a extremo.
                </p>
              </section>

              {/* 06. Derechos ARCO */}
              <section id="derechos-arco" className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-[#009EBC] font-mono font-bold text-xs">06 //</span>
                  <h2 className="text-xl font-normal text-[#001041] tracking-tight">
                    Ejercicio de los Derechos ARCO
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-[#494f52]">
                  Usted tiene derecho a ejercer en cualquier momento sus derechos de <strong>Acceso, Rectificación, Cancelación y Oposición (ARCO)</strong> respecto a sus datos personales:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-[#494f52]">
                  <li><strong>Acceso:</strong> Conocer qué datos personales suyos obran en nuestros registros.</li>
                  <li><strong>Rectificación:</strong> Solicitar la corrección de datos inexactos, erróneos o incompletos.</li>
                  <li><strong>Cancelación:</strong> Solicitar la supresión de sus datos cuando ya no sean pertinentes.</li>
                  <li><strong>Oposición:</strong> Oponerse al tratamiento de sus datos para finalidades específicas como comunicaciones informativas.</li>
                </ul>
                <div className="bg-[#f8fafc] p-4 border border-[#D2D3D5] text-xs sm:text-sm text-[#494f52]">
                  <p className="font-semibold text-[#001041] mb-1">Procedimiento de Solicitud:</p>
                  <p>
                    Remita una solicitud formal al correo <a href={`mailto:${COMPANY_INFO.email}`} className="text-[#009EBC] font-mono hover:underline">{COMPANY_INFO.email}</a> indicando en el asunto &quot;EJERCICIO DE DERECHOS ARCO&quot;, detallando su nombre completo, documento de identidad (adjuntando copia en PDF/imagen) y la pretensión concreta. La solicitud será atendida dentro de los plazos establecidos por el Reglamento de la Ley N° 29733.
                  </p>
                </div>
              </section>

              {/* 07. Cookies */}
              <section id="cookies" className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-[#009EBC] font-mono font-bold text-xs">07 //</span>
                  <h2 className="text-xl font-normal text-[#001041] tracking-tight">
                    Tecnologías Web y Ausencia de Cookies Invasivas
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-[#494f52]">
                  Este sitio web emplea únicamente almacenamiento local y cookies técnicas estrictamente necesarias para la navegación, seguridad de sesión y rendimiento del entorno gráfico. No implementamos herramientas de rastreo publicitario invasivo ni vendemos información de comportamiento digital a terceros.
                </p>
              </section>

              {/* 08. Vigencia */}
              <section id="vigencia" className="space-y-4 pt-4 border-t border-dashed border-[#D2D3D5]">
                <div className="flex items-center gap-2">
                  <span className="text-[#009EBC] font-mono font-bold text-xs">08 //</span>
                  <h2 className="text-xl font-normal text-[#001041] tracking-tight">
                    Modificaciones y Vigencia de la Política
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-[#494f52]">
                  Mednova Technologies se reserva el derecho de actualizar la presente Política de Privacidad para adecuarla a futuras modificaciones legislativas o jurisprudenciales emitidas por la Autoridad Nacional de Protección de Datos Personales (ANPDP). Toda actualización será publicada en esta misma sección indicando la fecha de vigencia correspondiente.
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
