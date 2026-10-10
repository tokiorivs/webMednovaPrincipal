import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, FileText, Stethoscope, Package, ArrowRight } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/data';

const waLink = (text: string) =>
  `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(text)}`;

const topics = [
  {
    icon: MessageCircle,
    title: 'Cotización de Urolase MAX',
    description: 'Reciba una propuesta con las condiciones de adquisición para su institución.',
    message: 'Hola Mednova Technologies, deseo una cotización del láser Urolase MAX.',
  },
  {
    icon: Stethoscope,
    title: 'Demostración en quirófano',
    description: 'Coordine una demostración del sistema en su centro quirúrgico.',
    message: 'Hola Mednova Technologies, deseo coordinar una demostración de Urolase MAX en nuestro quirófano.',
  },
  {
    icon: Package,
    title: 'Fibras OnePush y consumibles',
    description: 'Fibras VPG de 150 a 940 µm, desechables y reutilizables.',
    message: 'Hola Mednova Technologies, deseo cotizar fibras quirúrgicas VPG OnePush.',
  },
  {
    icon: FileText,
    title: 'Ficha técnica y consultas',
    description: 'Resuelva dudas técnicas o solicite documentación del producto.',
    message: 'Hola Mednova Technologies, deseo la ficha técnica y resolver algunas consultas sobre Urolase MAX.',
  },
];

export default function ContactSection() {
  return (
    <section id="contacto" className="py-8 sm:py-14 relative scroll-mt-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="font-heading text-3xl sm:text-5xl text-[#001041]">
            Hablemos por WhatsApp
          </h2>
          <p className="text-base sm:text-lg text-[#334155] leading-relaxed">
            Elija el tema y se abrirá una conversación directa con nuestro equipo, con el mensaje ya redactado. Sin formularios.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Topics */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 content-start">
            {topics.map((topic) => {
              const Icon = topic.icon;
              return (
                <a
                  key={topic.title}
                  href={waLink(topic.message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-6 rounded-2xl bg-white border border-[#D2D3D5] hover:border-[#009EBC] hover:shadow-lg hover:shadow-[#009EBC]/10 transition-all flex flex-col gap-3"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#009EBC]/10 text-teal-ink flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h2 className="font-heading text-lg text-[#001041]">{topic.title}</h2>
                  <p className="text-sm text-[#494f52] leading-relaxed flex-1">{topic.description}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#007f97] group-hover:gap-2.5 transition-all">
                    Escribir por WhatsApp
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </a>
              );
            })}
          </div>

          {/* Direct info */}
          <div className="lg:col-span-5">
            <div className="p-8 rounded-3xl bg-[#001041] text-white space-y-6 shadow-xl">
              <div>
                <span className="text-sm font-semibold text-[#7fdcf0]">Contacto directo</span>
                <h2 className="font-heading text-2xl mt-1">{COMPANY_INFO.name}</h2>
                <p className="text-base text-[#D2D3D5] mt-2 leading-relaxed">
                  Distribuidor exclusivo de VPG LaserOne en Perú.
                </p>
              </div>

              <ul className="space-y-4 pt-4 border-t border-white/15 text-[#D2D3D5]">
                <li className="flex items-center gap-3 text-lg font-semibold text-white">
                  <Phone className="w-5 h-5 text-[#33c3df] shrink-0" />
                  <a href={`tel:${COMPANY_INFO.phone.replace(/\s+/g, '')}`} className="hover:text-[#33c3df] transition-colors">
                    {COMPANY_INFO.phone}
                  </a>
                </li>
                <li className="flex items-center gap-3 text-lg font-semibold text-white">
                  <Mail className="w-5 h-5 text-[#33c3df] shrink-0" />
                  <a href={`mailto:${COMPANY_INFO.salesEmail}`} className="hover:text-[#33c3df] transition-colors break-all">
                    {COMPANY_INFO.salesEmail}
                  </a>
                </li>
                <li className="flex items-start gap-3 text-base">
                  <MapPin className="w-5 h-5 text-[#33c3df] shrink-0 mt-0.5" />
                  <span>{COMPANY_INFO.address}</span>
                </li>
                <li className="flex items-start gap-3 text-base">
                  <Clock className="w-5 h-5 text-[#33c3df] shrink-0 mt-0.5" />
                  <span>{COMPANY_INFO.workingHours}</span>
                </li>
              </ul>

              <a
                href={waLink('Hola Mednova Technologies, deseo hablar con un asesor.')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-teal-ink hover:bg-[#00b3d4] text-white text-base font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Chat directo por WhatsApp</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
