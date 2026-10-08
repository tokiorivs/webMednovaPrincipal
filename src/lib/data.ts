import { Product, MedicalSpecialty, MedicalEvent } from '@/types/product';

export const INITIAL_SPECIALTIES: MedicalSpecialty[] = [
  {
    id: 'litotricia',
    name: 'Litotricia Láser',
    icon: 'Zap',
    description: 'Modos FinePulse, UltraPulse y MRP del láser de fibra de tulio Urolase MAX.',
  },
  {
    id: 'cirugia-tejidos-blandos',
    name: 'Cirugía de Tejidos Blandos',
    icon: 'Activity',
    description: 'Enucleación de próstata con DissectPulse y ThuFLEP, además de coagulación y vaporización.',
  },
  {
    id: 'consumibles',
    name: 'Fibras Quirúrgicas',
    icon: 'Package',
    description: 'Fibras VPG OnePush, HP y LP en diámetros de núcleo de 150 a 940 µm.',
  },
];

// Todo el contenido de producto proviene de los brochures oficiales de VPG LaserOne
// (Urolase MAX y Fibras quirúrgicas VPG) y del brochure de Mednova (Oct 2026).
export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Urolase MAX • Plataforma Láser de Fibra de Tulio',
    slug: 'urolase-max',
    brand: 'VPG LaserOne',
    model: 'Urolase MAX',
    specialty: 'Litotricia & Cirugía de Tejidos Blandos',
    category: 'equipo',
    tagline: 'Nueva tecnología láser de alta precisión para urología',
    short_description: 'Tecnología láser todo en uno para urología. Un sistema de láser de fibra de tulio compatible con todo el espectro de procedimientos hospitalarios, de la cirugía de tejidos blandos a la litotricia, con Tissue Sensor y asistente quirúrgico inteligente.',
    full_description: 'Urolase MAX es un sistema láser de fibra de tulio de última generación de VPG LaserOne, compatible con todo el espectro de procedimientos hospitalarios, desde la cirugía de tejidos blandos hasta la litotricia. Incorpora Tissue Sensor, que detiene automáticamente la emisión del láser al detectar tejido blando; modos de litotricia (MRP, FinePulse y UltraPulse); modos de cirugía de tejidos blandos (DissectPulse, ThuFLEP, BloodlessPulse y CleanPulse); y Surgeon\'s Assistant, el primer sistema láser con un asistente quirúrgico inteligente.',
    images: [
      '/images/products/urolase-max/urolase_max_console.webp',
      '/images/products/urolase-max/urolase_max_hero.webp',
      '/images/products/urolase-max/onepush_connector.webp'
    ],
    brochure_url: '/pdfs/Urolase MAX_sp.pdf',
    video_url: '/videos/UMax - ergonomics.webm',
    key_metrics: [
      { label: 'Seguridad', value: 'Tissue Sensor', helper: 'Detiene el láser al detectar tejido blando' },
      { label: 'Litotricia', value: '3 modos', helper: 'MRP, FinePulse y UltraPulse' },
      { label: 'Tejidos blandos', value: '4 modos', helper: 'DissectPulse, ThuFLEP, BloodlessPulse y CleanPulse' },
      { label: 'Tamaño', value: 'Hasta 3×', helper: 'Más compacto y liviano que sistemas Ho:YAG' },
      { label: 'Fibras OnePush', value: '150 – 940', unit: 'µm', helper: '5 diámetros, desechables y reutilizables' }
    ],
    clinical_applications: [
      {
        id: 'litotricia',
        title: 'Litotricia',
        subtitle: 'Pulsos modulados',
        description: 'Los ajustes de pulso modulado y las características de alta potencia del sistema láser Urolase MAX elevan la litotricia a un nivel de eficiencia clínica fundamentalmente nuevo, superando a los sistemas láser urológicos convencionales.',
        modes: [
          {
            title: 'Nuevo modo FinePulse',
            description: 'Permite realizar litotricia a alta velocidad, pulverizando eficazmente los cálculos urinarios hasta obtener polvo ultrafino.',
            badge: 'Polvo ultrafino'
          },
          {
            title: 'Modo especializado UltraPulse',
            description: 'Proporciona energía de alto impacto, fragmentando de forma inmediata incluso los cálculos densos en fragmentos grandes para una extracción eficiente.',
            badge: 'Fragmentos grandes'
          },
          {
            title: 'Modo MRP* (mínima retropulsión)',
            description: 'Minimiza la retropulsión del cálculo durante la litotricia en comparación con láseres de holmio y modos de pulso estándar de la serie de láseres de fibra de tulio Urolase.',
            badge: 'Mínima retropulsión'
          }
        ],
        scientific_note: 'Referencia citada por VPG LaserOne: Ventimiglia E., et al. (2020) Effect of Temporal Pulse Shape on Urinary Stone Phantom Retropulsion Rate and Ablation Efficiency Using Holmium:YAG and Superpulse Thulium Fiber Lasers. BJU Int. 2020 Jul; 126(1): 159-167.'
      },
      {
        id: 'tejidos-blandos',
        title: 'Cirugía de tejidos blandos',
        subtitle: 'Dos modos de enucleación de próstata en un solo sistema',
        description: 'Con dos modos de enucleación integrados, Urolase MAX ofrece mayor versatilidad para cirugías urológicas personalizadas y de alta precisión.',
        modes: [
          {
            title: 'Modo DissectPulse: enucleación modulada',
            description: 'Proporciona hemostasia superior, superando significativamente a HoLEP. Permite una disección precisa del tejido adenomatoso, similar a HoLEP, y opera sin carbonización.',
            badge: 'Enucleación'
          },
          {
            title: 'ThuFLEP: enucleación clásica con láser de fibra de tulio',
            description: 'Alta precisión gracias a la mínima profundidad de penetración, excelente hemostasia con prácticamente ausencia de pérdida sanguínea y vaporización eficiente de tejido blando.',
            badge: 'Enucleación'
          },
          {
            title: 'Modo de coagulación BloodlessPulse',
            description: 'Incorpora un modo de coagulación de zona amplia que garantiza hemostasia eficaz desde corta distancia, permitiendo tratamientos seguros incluso en zonas de difícil acceso.',
            badge: 'Coagulación'
          },
          {
            title: 'Modo CleanPulse sin carbonización',
            description: 'Durante la vapoenucleación y vaporización, permite la eliminación de tejido blando sin carbonización y con daño térmico mínimo, ofreciendo una eficiencia comparable a los láseres de onda continua y preservando la visibilidad.',
            badge: 'Vaporización'
          }
        ]
      }
    ],
    safety_features: [
      {
        title: 'Tissue Sensor',
        subtitle: 'Reconocimiento de cálculo vs tejido',
        description: 'Tecnología de seguridad innovadora desarrollada por VPG LaserOne. Detecta automáticamente tejido blando durante la litotricia y detiene instantáneamente la emisión del láser, minimizando el riesgo de daño no intencional.',
        badge: 'Seguridad'
      },
      {
        title: "Surgeon's Assistant",
        subtitle: 'Asistente quirúrgico inteligente',
        description: 'El primer sistema láser con un asistente quirúrgico inteligente, desarrollado a partir de años de análisis de protocolos quirúrgicos por expertos líderes a nivel mundial. Ajusta automáticamente los parámetros del láser en tiempo real para garantizar seguridad, precisión y un rendimiento óptimo en diversos procedimientos.',
        badge: 'Asistente'
      },
      {
        title: 'Conector OnePush',
        subtitle: 'Fibra con obturador automático',
        description: 'El conector de fibra OnePush, con obturador automático, está diseñado para prevenir la contaminación y permitir conexiones rápidas, seguras y sencillas.',
        badge: 'Conexión'
      }
    ],
    system_advantages: [
      {
        title: 'Hasta 3 veces más compacto y liviano que sistemas Ho:YAG',
        description: 'Una plataforma de menor tamaño y peso que los sistemas láser de holmio convencionales.'
      },
      {
        title: 'Instalación sencilla con conexión eléctrica estándar',
        description: 'Se conecta a la red eléctrica estándar.'
      },
      {
        title: 'Refrigeración por aire, no requiere unidad externa',
        description: 'El enfriamiento por aire evita depender de una unidad de refrigeración externa.'
      },
      {
        title: 'Sin mantenimiento rutinario',
        description: 'El sistema no requiere mantenimiento rutinario.'
      }
    ],
    manufacturer_info: {
      name: 'VPG LaserOne',
      description: 'VPG LaserOne es una empresa verticalmente integrada, fundada por el científico Valentin Pavlovich Gapontsev, fundador de IPG Photonics. Diseña y suministra dispositivos láser médicos y fibras quirúrgicas.',
      founded: '1991',
      annual_patients: '> 1 millón',
      patents: '50+',
      installed_units: '> 3000'
    },
    features: [
      'Tissue Sensor: detiene automáticamente el láser al detectar tejido blando',
      'Litotricia con tres modos: FinePulse, UltraPulse y MRP (mínima retropulsión)',
      'Dos modos de enucleación de próstata: DissectPulse y ThuFLEP',
      'Coagulación de zona amplia BloodlessPulse y vapoenucleación CleanPulse',
      "Surgeon's Assistant: asistente quirúrgico inteligente",
      'Conector OnePush con obturador automático',
      'Fibras OnePush desechables y reutilizables, de 150 a 940 µm',
      'Hasta 3 veces más compacto y liviano que sistemas Ho:YAG',
      'Conexión eléctrica estándar, refrigeración por aire y sin mantenimiento rutinario'
    ],
    specifications: {
      'Tipo de láser': 'Láser de fibra de tulio',
      'Procedimientos': 'Litotricia y cirugía de tejidos blandos',
      'Modos de litotricia': 'MRP, FinePulse, UltraPulse',
      'Modos de tejidos blandos': 'DissectPulse, ThuFLEP, BloodlessPulse, CleanPulse',
      'Seguridad': 'Tissue Sensor',
      'Asistente quirúrgico': "Surgeon's Assistant (Soft Tissue y Stone; Quick Start, Assistant y Expert)",
      'Conector de fibra': 'OnePush con obturador automático',
      'Diámetros de fibra': '150, 200, 365, 550 y 940 µm',
      'Formatos de fibra': 'Desechable (uso único) y reutilizable (uso múltiple)',
      'Refrigeración': 'Por aire; no requiere unidad externa',
      'Instalación': 'Conexión eléctrica estándar',
      'Mantenimiento': 'Sin mantenimiento rutinario',
      'Tamaño y peso': 'Hasta 3 veces más compacto y liviano que sistemas Ho:YAG'
    },
    status: 'featured',
    whatsapp_message: 'Hola Mednova Technologies, deseo una cotización del láser Urolase MAX.',
    created_at: '2026-03-01T10:00:00Z'
  },
  {
    id: 'prod-2',
    name: 'Fibras Quirúrgicas VPG • OnePush, HP y LP',
    slug: 'fibras-quirurgicas-vpg',
    brand: 'VPG LaserOne',
    model: 'OnePush / HP / LP Series',
    specialty: 'Litotricia & Cirugía de Tejidos Blandos',
    category: 'consumible',
    tagline: 'Fibras láser quirúrgicas de VPG LaserOne',
    short_description: 'Fibras láser quirúrgicas VPG: OnePush para Urolase+, Urolase+ Premium y Urolase MAX, HP para litotricia y cirugía de tejidos blandos, y líneas LP para otras especialidades. Diámetros de núcleo de 150 a 940 µm.',
    full_description: 'Las fibras quirúrgicas VPG LaserOne están diseñadas para transmitir energía láser con precisión desde el sistema láser hasta el sitio quirúrgico. La fibra OnePush se usa con los sistemas Urolase+, Urolase+ Premium y Urolase MAX, y está disponible en formato de uso único y reutilizable (hasta 20 ciclos de esterilización). La fibra HP está pensada para plataformas láser de alta potencia, incluidas las series FiberLase S / SP / SP+, y es compatible con sistemas láser de terceros que usan conectores SMA-905. Las fibras LP cubren otras especialidades, como proctología y flebología.',
    images: [
      '/images/products/fibras-quirurgicas-vpg/vpg_fibers_hero.webp',
      '/images/products/fibras-quirurgicas-vpg/onepush_fiber.webp',
      '/images/products/fibras-quirurgicas-vpg/hp_fiber.webp',
      '/images/products/fibras-quirurgicas-vpg/radial_fiber.webp',
      '/images/products/fibras-quirurgicas-vpg/conical_fiber.webp'
    ],
    brochure_url: '/pdfs/Surgical Fibers_sp.pdf',
    video_url: '/videos/UMax - ergonomics.webm',
    key_metrics: [
      { label: 'Diámetros de núcleo', value: '150 – 940', unit: 'µm', helper: '150, 200, 365, 550 y 940 µm' },
      { label: 'Conector OnePush', value: 'Urolase', helper: 'Para Urolase+, Urolase+ Premium y Urolase MAX' },
      { label: 'Reutilizable', value: 'Hasta 20', unit: 'ciclos', helper: 'Ciclos de esterilización (fibra OnePush)' },
      { label: 'Apertura numérica', value: '0,22', unit: 'NA', helper: 'Fibra HP, cuarzo / cuarzo' },
      { label: 'Longitud', value: '3', unit: 'm', helper: 'Longitud de la fibra' }
    ],
    features: [
      'Fibra OnePush de punta desnuda para Urolase+, Urolase+ Premium y Urolase MAX',
      'Formatos de uso único y reutilizable (hasta 20 ciclos de esterilización)',
      'Fibra HP de punta desnuda con conector SMA-905, compatible con sistemas de terceros',
      'Núcleo de 150 µm, ideal para ureteroscopia flexible y procedimientos de micropunción',
      'Cinco diámetros de núcleo: 150, 200, 365, 550 y 940 µm',
      'Fibras LP de punta desnuda, radial y cónica para otras especialidades',
      'Longitud de fibra de 3 m'
    ],
    specifications: {
      'Diámetros de núcleo (OnePush y HP)': '150, 200, 365, 550 y 940 µm',
      'Diámetros externos (OnePush y HP)': '315 ± 105, 400 ± 90, 600 ± 150, 800 ± 150 y 1500 ± 300 µm',
      'Tipo de fibra óptica (HP)': 'Cuarzo / cuarzo',
      'Apertura numérica (HP)': '0,22',
      'Longitud de la fibra': '3 m',
      'Conector OnePush': 'Fibra OnePush: Urolase+, Urolase+ Premium y Urolase MAX',
      'Conector SMA-905': 'Fibras HP y LP',
      'Número de usos (OnePush)': 'Uso único o reutilizable (hasta 20 veces)'
    },
    status: 'featured',
    whatsapp_message: 'Hola Mednova Technologies, deseo cotizar fibras quirúrgicas VPG OnePush.',
    created_at: '2026-03-02T10:00:00Z'
  }
];

export const INITIAL_EVENTS: MedicalEvent[] = [
  {
    id: 'ev-1',
    title: 'Congreso Internacional de Urología y Endourología 2026',
    date: '15 - 18 de Noviembre, 2026',
    location: 'Centro de Convenciones Metropolitano - Stand #42',
    type: 'Congreso',
    description: 'Estaremos presentando en vivo la nueva generación de Láseres Thulium Fiber y demostraciones prácticas en simuladores de enucleación prostática.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
    link: '#',
    status: 'upcoming'
  },
  {
    id: 'ev-2',
    title: 'Workshop Quirúrgico: Enucleación Prostática con Holmium (HoLEP)',
    date: '08 de Diciembre, 2026',
    location: 'Hospital Quirúrgico Especializado / Modalidad Híbrida',
    type: 'Workshop',
    description: 'Capacitación teórico-práctica con cirugías transmitidas en directo 4K, dictada por destacados profesores urólogos.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80',
    link: '#',
    status: 'upcoming'
  },
  {
    id: 'ev-3',
    title: 'Jornada de Actualización en Cirugía Retrógrada Intrarrenal (RIRS)',
    date: '20 de Enero, 2027',
    location: 'Auditorio Médico Central',
    type: 'Jornada Quirúrgica',
    description: 'Entrenamiento intensivo en el uso de ureteroscopios flexibles de última generación y control de retropulsión con láser TFL.',
    image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=1200&q=80',
    link: '#',
    status: 'upcoming'
  }
];

export const COMPANY_INFO = {
  name: 'Mednova Technologies',
  tagline: 'Tecnología Quirúrgica Avanzada en Urología',
  description: 'Somos especialistas en distribución, soporte clínico y servicio técnico de equipos médicos de alta gama y consumibles para urología y cirugía mínimamente invasiva.',
  phone: '+51 913 698 837',
  whatsapp: '51913698837', // phone without symbols for wa.me link
  email: 'contacto@mednovaperu.com',
  salesEmail: 'contacto@mednovaperu.com',
  address: 'Av. Javier Prado Este 4500, San Borja, Lima - Perú',
  workingHours: 'Lunes a Viernes: 8:00 AM - 6:30 PM',
  // Completar con las URLs oficiales; el footer solo muestra los iconos que tengan URL.
  socials: {
    facebook: 'https://www.facebook.com/share/1EU52Ly6EC/',
    instagram: 'https://www.instagram.com/mednovaperu/'
  }
};
