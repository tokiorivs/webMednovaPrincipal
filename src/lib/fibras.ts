// Datos de las fibras quirúrgicas VPG, transcritos del brochure oficial "Fibras quirúrgicas VPG"
// (public/pdfs/Surgical Fibers_sp.pdf). No agregar valores que no figuren en ese documento.
import type { FaqItem } from '@/lib/urolase-faq';

export interface FiberTable {
  /** Encabezados de columnas variables (por ejemplo, un diámetro por columna) */
  columns: string[];
  /** Filas con un valor por columna */
  rows: { label: string; values: string[] }[];
  /** Filas con un único valor común a todas las columnas */
  shared: { label: string; value: string }[];
}

export interface FiberLine {
  id: string;
  name: string;
  subtitle: string;
  image?: string;
  specialties: string[];
  description: string[];
  highlights: { title: string; text: string }[];
  table: FiberTable;
  group: 'urologia' | 'otras';
}

const BASE = '/images/products/fibras-quirurgicas-vpg';

export const FIBER_LINES: FiberLine[] = [
  {
    id: 'onepush',
    group: 'urologia',
    name: 'Fibra VPG OnePush',
    subtitle: 'Punta desnuda',
    image: `${BASE}/onepush_fiber.webp`,
    specialties: ['Litotricia', 'Cirugía de tejidos blandos'],
    description: [
      'La fibra quirúrgica VPG OnePush está diseñada para transmitir energía láser desde los sistemas Urolase+, Urolase+ Premium y Urolase MAX directamente al sitio quirúrgico.',
      'Está disponible en dos formatos: uso único y reutilizable (hasta 20 ciclos de esterilización).',
    ],
    highlights: [
      { title: 'Calidad excepcional', text: 'Fabricada bajo estrictos estándares de alta tecnología.' },
      { title: 'Conector OnePush', text: 'Conexión fibra-sistema instantánea y fiable.' },
      { title: 'Núcleo de 150 µm', text: 'Ideal para ureteroscopia flexible y procedimientos de micropunción.' },
    ],
    table: {
      columns: ['150 µm', '200 µm', '365 µm', '550 µm', '940 µm'],
      rows: [
        { label: 'Diámetro del núcleo, µm', values: ['150', '200', '365', '550', '940'] },
        { label: 'Diámetro externo, µm', values: ['315 ± 105', '400 ± 90', '600 ± 150', '800 ± 150', '1500 ± 300'] },
      ],
      shared: [
        { label: 'Número de usos', value: 'Uso único o reutilizable (hasta 20 veces)' },
        { label: 'Longitud de la fibra, m', value: '3' },
        { label: 'Tipo de conector', value: 'OnePush' },
      ],
    },
  },
  {
    id: 'hp',
    group: 'urologia',
    name: 'Fibra VPG HP',
    subtitle: 'Punta desnuda',
    image: `${BASE}/hp_fiber.webp`,
    specialties: ['Litotricia', 'Cirugía de tejidos blandos'],
    description: [
      'Esta fibra está específicamente diseñada para plataformas láser de alta potencia, incluidas las series FiberLase S / SP / SP+ de VPG LaserOne, y también es compatible con sistemas láser de terceros que utilizan conectores SMA-905.',
      'La fibra quirúrgica VPG HP es una fibra óptica de alto rendimiento diseñada para transmitir energía láser con precisión desde el sistema láser hasta el sitio quirúrgico. Está equipada con un conector universal SMA-905, lo que garantiza compatibilidad con la mayoría de los sistemas láser médicos.',
    ],
    highlights: [
      { title: 'Alta precisión de fabricación', text: 'Construida bajo estrictos estándares de producción de alta tecnología.' },
      { title: 'Uso clínico global', text: 'Reconocida y utilizada por profesionales de la salud en todo el mundo.' },
      { title: 'Opción de fibra de 150 µm', text: 'Ideal para ureteroscopia flexible y procedimientos de micropunción.' },
    ],
    table: {
      columns: ['150 µm', '200 µm', '365 µm', '550 µm', '940 µm'],
      rows: [
        { label: 'Diámetro del núcleo, µm', values: ['150', '200', '365', '550', '940'] },
        { label: 'Diámetro externo, µm', values: ['315 ± 105', '400 ± 90', '600 ± 150', '800 ± 150', '1500 ± 300'] },
      ],
      shared: [
        { label: 'Tipo de fibra óptica', value: 'Cuarzo / cuarzo' },
        { label: 'Longitud de la fibra, m', value: '3' },
        { label: 'Tipo de conector', value: 'SMA-905' },
        { label: 'Apertura numérica (NA)', value: '0,22' },
      ],
    },
  },
  {
    id: 'lp-desnuda',
    group: 'otras',
    name: 'Fibra VPG LP',
    subtitle: 'Punta desnuda',
    specialties: ['Odontología', 'Proctología', 'Ginecología', 'Neurocirugía', 'Cirugía general', 'Otorrinolaringología'],
    description: [
      'Basándose en décadas de experiencia en tecnología de láseres de fibra, VPG LaserOne ha desarrollado la fibra quirúrgica VPG LP de punta desnuda, un instrumento versátil diseñado para su uso con el sistema láser médico VTLase.',
      'Está destinada a la disección precisa de tejidos, vaporización y coagulación en cirugías abiertas, endoscópicas y laparoscópicas. Es especialmente adecuada para procedimientos delicados en los que son esenciales un daño térmico mínimo y un alto control.',
    ],
    highlights: [
      { title: 'Uso multiespecialidad', text: 'Diseñada para aplicaciones interdisciplinarias, mejora la precisión quirúrgica tanto en procedimientos de tejidos blandos como duros.' },
      { title: 'Adaptabilidad', text: 'Permite al cirujano seleccionar la configuración de fibra más adecuada según el tipo de tejido, el acceso quirúrgico y los objetivos clínicos.' },
      { title: 'Amplia gama de diámetros', text: 'Responde a diversas necesidades quirúrgicas con flexibilidad de la fibra y características de entrega del haz.' },
    ],
    table: {
      columns: ['LP 200 µm', 'LP 365 µm', 'LP 550 µm', 'LP 940 µm'],
      rows: [
        { label: 'Diámetro del núcleo, µm', values: ['200', '365', '550', '940'] },
        { label: 'Diámetro externo, µm', values: ['500', '650', '800', '1650'] },
      ],
      shared: [
        { label: 'Longitud de la fibra, m', value: '3' },
        { label: 'Tipo de conector', value: 'SMA-905' },
      ],
    },
  },
  {
    id: 'lp-radial',
    group: 'otras',
    name: 'Fibra VPG LP',
    subtitle: 'Punta radial',
    image: `${BASE}/radial_fiber.webp`,
    specialties: ['Flebología (EVLT)', 'Proctología'],
    description: [
      'Diseñada principalmente para EVLT, esta fibra proporciona una emisión radial del láser para una ablación uniforme de la pared del vaso, reduciendo el riesgo de perforación o daño colateral del tejido. También es adecuada para aplicaciones proctológicas seleccionadas.',
      'Fibra radial LP R550: diámetro del núcleo de 550 µm, compatible con catéter de 14 G. Fibra radial LP R365: diámetro del núcleo de 365 µm, compatible con catéter de 16 G.',
    ],
    highlights: [],
    table: {
      columns: ['Fibra R365', 'Fibra R550'],
      rows: [
        { label: 'Diámetro del núcleo de la fibra, µm', values: ['365', '550'] },
        { label: 'Diámetro externo de la fibra, µm', values: ['650', '1200'] },
        { label: 'Diámetro del frasco, mm', values: ['1,2', '1,4'] },
        { label: 'Catéter compatible', values: ['16 G', '14 G'] },
      ],
      shared: [
        { label: 'Longitud de la fibra, m', value: '3' },
        { label: 'Tipo de conector', value: 'SMA-905' },
      ],
    },
  },
  {
    id: 'lp-conica',
    group: 'otras',
    name: 'Fibra VPG LP',
    subtitle: 'Punta cónica',
    image: `${BASE}/conical_fiber.webp`,
    specialties: ['Proctología'],
    description: [
      'Método mínimamente invasivo ampliamente utilizado para el tratamiento de hemorroides grado I–III; la vaporización láser se vuelve más sencilla y precisa con la fibra de punta cónica.',
      'La geometría cónica facilita una inserción suave en el nódulo hemorroidal, asegurando una entrega láser eficaz y dirigida. Incluye un mecanismo de bloqueo de la fibra.',
    ],
    highlights: [],
    table: {
      columns: ['Valor'],
      rows: [
        { label: 'Diámetro del núcleo de la fibra, µm', values: ['550'] },
        { label: 'Diámetro externo de la fibra, µm', values: ['1200'] },
        { label: 'Diámetro del frasco, mm', values: ['1,4'] },
      ],
      shared: [
        { label: 'Longitud de la fibra, m', value: '3' },
        { label: 'Tipo de conector', value: 'SMA-905' },
      ],
    },
  },
];

export const FIBRAS_FAQS: FaqItem[] = [
  {
    question: '¿Con qué sistemas se usa la fibra OnePush?',
    answer:
      'La fibra quirúrgica VPG OnePush está diseñada para transmitir energía láser desde los sistemas Urolase+, Urolase+ Premium y Urolase MAX directamente al sitio quirúrgico, mediante el conector OnePush.',
  },
  {
    question: '¿Las fibras OnePush son reutilizables?',
    answer:
      'Hay dos formatos: uso único (desechable) y reutilizable. La fibra reutilizable admite hasta 20 ciclos de esterilización.',
  },
  {
    question: '¿Qué diámetros de núcleo están disponibles?',
    answer:
      'Las fibras OnePush y HP están disponibles con núcleo de 150, 200, 365, 550 y 940 µm. El núcleo de 150 µm es ideal para ureteroscopia flexible y procedimientos de micropunción.',
  },
  {
    question: '¿Las fibras HP funcionan con láseres de terceros?',
    answer:
      'Según el brochure de VPG LaserOne, la fibra HP está diseñada para plataformas láser de alta potencia, incluidas las series FiberLase S / SP / SP+, y es compatible con sistemas láser de terceros que utilizan conectores SMA-905. Consulte con nuestro equipo la compatibilidad con su equipo específico.',
  },
  {
    question: '¿Qué otras fibras ofrece VPG?',
    answer:
      'Además de OnePush y HP, VPG ofrece fibras LP de punta desnuda (multiespecialidad), de punta radial (flebología y proctología) y de punta cónica (proctología), todas con conector SMA-905 y 3 m de longitud.',
  },
  {
    question: '¿Cómo cotizo fibras quirúrgicas?',
    answer:
      'Escríbanos por WhatsApp indicando el sistema láser que usa y los diámetros que necesita, y le responde una persona del equipo de Mednova, distribuidor exclusivo de VPG LaserOne en Perú.',
  },
];
