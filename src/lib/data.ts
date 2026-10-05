import { Product, MedicalSpecialty, MedicalEvent } from '@/types/product';

export const INITIAL_SPECIALTIES: MedicalSpecialty[] = [
  {
    id: 'litotricia',
    name: 'Litotricia Láser & Balística',
    icon: 'Zap',
    description: 'Equipos de alta precisión para fragmentación y pulverización de cálculos renales y ureterales.',
  },
  {
    id: 'endourologia',
    name: 'Endourología Avanzada',
    icon: 'Eye',
    description: 'Ureteroscopios digitales flexibles, nefroscopios y sistemas de visualización de alta resolución.',
  },
  {
    id: 'cirugia-prostatica',
    name: 'Cirugía Prostática (RTU & Láser)',
    icon: 'Activity',
    description: 'Tecnología de vanguardia para enucleación HoLEP/ThuLEP y resección bipolar con hemostasia superior.',
  },
  {
    id: 'laparoscopia',
    name: 'Laparoscopía Urológica 4K',
    icon: 'Monitor',
    description: 'Torres integradas de imagen ultra HD 4K, insufladores y ópticas para procedimientos mínimamente invasivos.',
  },
  {
    id: 'consumibles',
    name: 'Consumibles & Desechables',
    icon: 'Package',
    description: 'Fibras láser, catéteres doble J, canastillas de nitinol y guías de máxima biocompatibilidad.',
  },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Urolase MAX • Plataforma Láser de Tulio (TFL)',
    slug: 'urolase-max',
    brand: 'VPG LaserOne',
    model: 'Urolase MAX',
    specialty: 'Litotricia Láser & Cirugía Prostática',
    category: 'equipo',
    tagline: 'Plataforma láser todo en uno para urología',
    short_description: 'El sistema de láser de fibra de tulio más potente y seguro para urología, con Tissue Sensor de detención automática en tejido blando, asistente quirúrgico inteligente y conector OnePush.',
    full_description: 'Urolase MAX es la plataforma láser de fibra de tulio (TFL) de última generación desarrollada por VPG LaserOne (grupo IPG Photonics). Diseñada para cubrir todo el espectro de procedimientos urológicos hospitalarios, desde litotricia de alta velocidad con mínima retropulsión (Dusting y fragmentación) hasta enucleación prostática anatómica sin carbonización (DissectPulse y ThuFLEP), brindando una seguridad insuperable gracias a su exclusivo sensor tisular en tiempo real.',
    images: [
      '/images/products/urolase-max/urolase_max_console.webp',
      '/images/products/urolase-max/urolase_max_hero.webp',
      '/images/products/urolase-max/onepush_connector.webp'
    ],
    brochure_url: '/pdfs/Urolase MAX_sp.pdf',
    video_url: '/videos/UMax - ergonomics.webm',
    key_metrics: [
      { label: 'Longitud de Onda', value: '1940', unit: 'nm', helper: 'Pico de absorción tisular en agua' },
      { label: 'Seguridad Mucosa', value: 'Tissue Sensor™', helper: 'Detención instantánea ante tejido blando' },
      { label: 'Retropulsión', value: '< 3.5', unit: 'mm', helper: 'Muy inferior a Ho:YAG y tecnología Moses' },
      { label: 'Alimentación', value: '220', unit: 'VAC', helper: 'Enchufe convencional sin trifásica' },
      { label: 'Microfibras', value: '150 - 940', unit: 'µm', helper: 'Máxima deflexión en flexible' }
    ],
    clinical_applications: [
      {
        id: 'litotricia',
        title: 'Litotricia & Cálculos Renales',
        subtitle: 'Pulsos modulados de alta eficiencia clínica y mínima retropulsión',
        description: 'Los ajustes de pulso modulado y la alta potencia de Urolase MAX elevan la litotricia a un estándar clínico superior, pulverizando cálculos rápidamente con estabilidad milimétrica.',
        modes: [
          {
            title: 'Modo FinePulse (Dusting)',
            description: 'Permite litotricia a alta velocidad, pulverizando eficazmente los cálculos urinarios hasta obtener polvo ultrafino sin necesidad de extracción mecánica.',
            badge: 'Pulverización Ultrafina'
          },
          {
            title: 'Modo UltraPulse (Fragmentación)',
            description: 'Proporciona energía de alto impacto inmediato incluso en litiasis de máxima dureza, produciendo fragmentos definidos para extracción segura con canastilla.',
            badge: 'Alto Impacto'
          },
          {
            title: 'Modo MRP (Mínima Retropulsión)',
            description: 'Minimiza la retropulsión del cálculo durante la litotricia en comparación con láseres de holmio convencionales y pulsos Moses, manteniendo el cálculo estable frente a la fibra.',
            badge: 'Estabilidad de Campo'
          }
        ],
        scientific_note: 'Validación científica: Ventimiglia E., et al. (2020) Effect on Temporal Pulse Shape on Urinary Stone Phantom Retropulsion Rate and Ablation Efficiency Using Holmium:YAG and Superpulse Thulium Fiber Lasers. BJU Int. 2020 Jul; 126(1): 159-167.'
      },
      {
        id: 'tejidos-blandos',
        title: 'Cirugía de Tejidos Blandos & Próstata (BPH)',
        subtitle: 'Dos modos de enucleación avanzados en un solo sistema quirúrgico',
        description: 'Urolase MAX integra dos modalidades de enucleación prostática que garantizan versatilidad, hemostasia impecable y visualización cristalina continua.',
        modes: [
          {
            title: 'Modo DissectPulse (Enucleación Modulada)',
            description: 'Disección termomecánica para enucleación precisa de adenomas. Proporciona hemostasia superior que supera significativamente a HoLEP tradicional, sin carbonización.',
            badge: 'Alternativa a HoLEP'
          },
          {
            title: 'Técnica ThuFLEP (Enucleación Clásica TFL)',
            description: 'Enucleación con láser de fibra de tulio con mínima profundidad de penetración tisular y hemostasia sobresaliente con virtualmente nula pérdida sanguínea.',
            badge: 'Mínima Penetración'
          },
          {
            title: 'Modo BloodlessPulse (Coagulación Amplia)',
            description: 'Coagulación de zona amplia que asegura hemostasia eficaz desde corta distancia en vasos sangrantes y áreas de difícil acceso anatómico.',
            badge: 'Coagulación Inmediata'
          },
          {
            title: 'Modo CleanPulse (Sin Carbonización)',
            description: 'Vapoenucleación y corte sin carbonización y con mínimo daño térmico colateral, preservando la visibilidad del endoscopio libre de humo.',
            badge: 'Visibilidad Cristalina'
          }
        ]
      }
    ],
    safety_features: [
      {
        title: 'Tissue Sensor™',
        subtitle: 'Reconocimiento de cálculo vs tejido blando',
        description: 'Tecnología exclusiva de VPG LaserOne que opera bajo diferenciación tisular en tiempo real. Detiene automáticamente e instantáneamente la emisión del láser si la fibra toca mucosa, eliminando el riesgo de perforación accidental.',
        badge: 'Innovación Exclusiva'
      },
      {
        title: "Surgeon's Assistant",
        subtitle: 'Asistente quirúrgico inteligente con pantalla táctil',
        description: 'Software intuitivo desarrollado tras años de protocolos quirúrgicos de urólogos líderes mundiales. Ajusta parámetros óptimos en tiempo real entre modos Soft Tissue, Stone, Quick Start y Expert.',
        badge: 'Smart Interface'
      },
      {
        title: 'Conector OnePush',
        subtitle: 'Obturador automático antipolvo',
        description: 'Diseñado para prevenir contaminación cruzada y partículas en el puerto óptico. Permite conexiones rápidas, sencillas y estériles con un solo clic.',
        badge: 'Protección Óptica'
      }
    ],
    system_advantages: [
      {
        title: 'Hasta 3x más compacto y liviano',
        description: 'Consola ergonómica fácil de transportar entre quirófanos hospitalarios sin el volumen ni peso excesivo de consolas Holmium clásicas.'
      },
      {
        title: 'Conexión eléctrica estándar 220V',
        description: 'Instalación inmediata en cualquier toma convencional de pared sin necesidad de modificaciones eléctricas ni acometidas trifásicas.'
      },
      {
        title: 'Refrigeración por aire integrada',
        description: 'Enfriamiento autónomo de alta eficiencia silencioso. No requiere unidad externa ni circuito hidráulico de agua.'
      },
      {
        title: 'Sin mantenimiento rutinario',
        description: 'Tecnología de estado sólido en fibra óptica libre de desalineaciones o espejos de cavidad, maximizando la disponibilidad quirúrgica.'
      }
    ],
    manufacturer_info: {
      name: 'VPG LaserOne (IPG Photonics Group)',
      description: 'Líder mundial pionero en amplificadores y tecnologías de láser de fibra médica, fundado en 1991 por el Dr. Valentín Pavlovich Gapontsev.',
      founded: '1991',
      annual_patients: '> 1,000,000',
      patents: '50+',
      installed_units: '> 3,000'
    },
    features: [
      'Tecnología Superpulsed Thulium Fiber Laser (TFL) a 1940 nm',
      'Tissue Sensor™ exclusivo para detención automática ante tejido blando',
      'Modos de litotricia avanzada: FinePulse (Dusting ultrafino), UltraPulse (Fragmentación) y MRP (Mínima retropulsión)',
      'Dos técnicas de enucleación prostática: DissectPulse (superior a HoLEP) y ThuFLEP',
      'Coagulación de zona amplia BloodlessPulse y vapoenucleación limpia CleanPulse',
      'Asistente quirúrgico inteligente Surgeon\'s Assistant con pantalla táctil',
      'Conector OnePush patentado con obturador antipolvo automático',
      'Compatibilidad con microfibras desde 150 µm para máxima deflexión en flexible',
      'Hasta 3 veces más compacto y ligero que consolas Ho:YAG convencionales',
      'Alimentación eléctrica 220V estándar y enfriamiento silencioso por aire'
    ],
    specifications: {
      'Longitud de onda': '1940 nm (Thulium Fiber / Tulio Superpulsado)',
      'Tipo de medio activo': 'Fibra óptica dopada con Tulio de estado sólido',
      'Procedimientos': 'Litotricia urinaria completa y cirugía de tejidos blandos (BPH)',
      'Modos litotricia': 'FinePulse (Dusting), UltraPulse (Impacto), MRP (Mínima retropulsión)',
      'Modos tejidos blandos': 'DissectPulse, ThuFLEP, BloodlessPulse, CleanPulse',
      'Sistema de seguridad': 'Tissue Sensor™ (Diferenciación cálculo vs. mucosa en tiempo real)',
      'Asistente quirúrgico': 'Surgeon\'s Assistant (Presets: Soft Tissue, Stone, Quick Start, Expert)',
      'Conector de fibra': 'OnePush con obturador automático antipolvo',
      'Calibres de fibra': '150 µm, 200 µm, 365 µm, 550 µm y 940 µm',
      'Refrigeración': 'Por aire integrada (libre de circuito externo de agua)',
      'Alimentación': '220 - 240 VAC, 50/60 Hz (Enchufe convencional de pared)',
      'Mantenimiento': 'Sin mantenimiento rutinario programado',
      'Certificaciones': 'Marcado CE, Homologaciones Internacionales, Garantía Oficial'
    },
    status: 'featured',
    whatsapp_message: 'Hola Mednova Technologies, deseo cotizar y agendar una demostración en quirófano de la plataforma láser Urolase MAX.',
    created_at: '2026-03-01T10:00:00Z'
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
  phone: '+51 987 654 321',
  whatsapp: '51987654321', // phone without symbols for wa.me link
  email: 'contacto@mednova.com',
  salesEmail: 'ventas@mednova.com',
  address: 'Av. Javier Prado Este 4500, San Borja, Lima - Perú',
  workingHours: 'Lunes a Viernes: 8:00 AM - 6:30 PM (Soporte de Emergencia en Quirófano 24/7)'
};
