import React from 'react';

const vpgStats = [
  { value: '1991', label: 'Año de fundación' },
  { value: '> 1 M', label: 'Pacientes tratados anualmente' },
  { value: '+ 50', label: 'Patentes en tecnologías láser médicas' },
  { value: '> 3000', label: 'Sistemas láser médicos instalados en el mundo desde 2017' },
];

interface VpgBackingProps {
  className?: string;
}

export default function VpgBacking({ className = 'bg-white' }: VpgBackingProps) {
  return (
    <section className={`${className} py-16 sm:py-24`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-[#001041] p-10 sm:p-14 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/vpg-laserone-logo-blanco.png"
                alt="VPG LaserOne"
                width={855}
                height={280}
                className="w-full max-w-xs h-auto"
              />
            </div>
          </div>
          <div className="lg:col-span-7 space-y-4">
            <h2 className="font-heading text-3xl sm:text-4xl text-[#001041]">El respaldo de VPG LaserOne</h2>
            <p className="text-base sm:text-lg text-[#494f52] leading-relaxed">
              VPG LaserOne es una empresa verticalmente integrada, fundada por el científico Valentin Pavlovich Gapontsev, fundador de IPG Photonics. Diseña y suministra dispositivos láser médicos y fibras quirúrgicas, desde la ingeniería y la investigación de laboratorio hasta los protocolos y ensayos clínicos junto a centros clínicos líderes.
            </p>
          </div>
        </div>

        <dl className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {vpgStats.map((stat) => (
            <div key={stat.value} className="rounded-2xl bg-[#f4f5f6] border border-[#D2D3D5] p-6">
              <dt className="font-heading text-3xl sm:text-4xl text-teal-ink">{stat.value}</dt>
              <dd className="mt-2 text-sm sm:text-base text-[#494f52] leading-snug">{stat.label}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-sm text-[#494f52]">Fuente: brochure oficial de VPG LaserOne.</p>
      </div>
    </section>
  );
}
