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
    name: 'Láser Quirúrgico Holmium:YAG HolmiPulse 100W',
    slug: 'laser-holmium-holmipulse-100w',
    brand: 'Mednova Advanced Tech',
    model: 'MN-HP100',
    specialty: 'Litotricia Láser & Balística',
    category: 'equipo',
    short_description: 'Generador láser de holmio de alta potencia de 100W diseñado para enucleación prostática (HoLEP) y litotricia ultra rápida.',
    full_description: 'El HolmiPulse 100W es el equipo insignia para centros quirúrgicos urológicos. Con pulsos regulables de hasta 100W y una longitud de onda de 2100 nm, ofrece versatilidad total: pulverización fina tipo "dusting" de litiasis complejas y enucleación anatómica de próstata con excelente coagulación hemostática.',
    images: [
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80'
    ],
    brochure_url: '#',
    features: [
      'Potencia máxima de 100 Watts con pulso variable',
      'Modos optimizados: Dusting (pulverización), Fragmentación y Coagulación',
      'Pantalla táctil médica intuitiva de 12 pulgadas',
      'Pedal inalámbrico multifuncional de doble pedal',
      'Reconocimiento inteligente de diámetro de fibra óptica'
    ],
    specifications: {
      'Longitud de onda': '2100 nm (Holmium:YAG)',
      'Potencia de salida': 'Hasta 100W',
      'Energía de pulso': '0.2 a 5.0 Joules',
      'Frecuencia de repetición': '5 Hz a 80 Hz',
      'Luz guía': 'Verde diodo 532 nm (brillo regulable)',
      'Alimentación': '220-240 VAC, 50/60 Hz'
    },
    status: 'featured',
    whatsapp_message: 'Hola Mednova, deseo cotizar y coordinar una demostración del Láser Quirúrgico Holmium 100W (MN-HP100).',
    created_at: '2026-03-01T10:00:00Z'
  },
  {
    id: 'prod-2',
    name: 'Láser de Tulio Thulium Fiber Laser (TFL) UltraPulse 60W',
    slug: 'laser-tulio-tfl-ultrapulse-60w',
    brand: 'Mednova Advanced Tech',
    model: 'MN-TFL60',
    specialty: 'Litotricia Láser & Balística',
    category: 'equipo',
    short_description: 'Tecnología TFL de última generación para pulverización ultrafina y corte preciso de tejidos blandos.',
    full_description: 'El sistema Thulium Fiber Laser (TFL) opera a 1940 nm, una longitud de onda que coincide exactamente con el pico de absorción del agua en los tejidos. Esto produce una pulverización microscópica sin retropulsión de cálculos y un corte tisular milimétrico con carbonización mínima.',
    images: [
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80'
    ],
    brochure_url: '#',
    features: [
      'Frecuencia ultra alta de hasta 2000 Hz',
      'Cero efecto de retropulsión durante la litotricia',
      'Permite uso de microfibras de 150 µm para máxima deflexión en ureteroscopía flexible',
      'Bajo nivel sonoro y peso compacto para fácil traslado entre quirófanos'
    ],
    specifications: {
      'Longitud de onda': '1940 nm (Thulium Fiber)',
      'Potencia máxima': '60 Watts',
      'Frecuencia': 'Hasta 2000 Hz',
      'Energía': '0.025 a 3.0 J',
      'Refrigeración': 'Sistema de enfriamiento por aire silencioso'
    },
    status: 'featured',
    whatsapp_message: 'Hola Mednova, solicito cotización formal del Láser de Tulio TFL UltraPulse 60W.',
    created_at: '2026-03-05T10:00:00Z'
  },
  {
    id: 'prod-3',
    name: 'Torre de Endourología & Laparoscopía 4K UHD Mednova Vision',
    slug: 'torre-laparoscopia-endourologia-4k',
    brand: 'Mednova Vision Systems',
    model: 'MN-4K-VISION',
    specialty: 'Laparoscopía Urológica 4K',
    category: 'equipo',
    short_description: 'Sistema completo integrado de video endoscópico 4K con procesamiento de imagen cromático y fuente LED.',
    full_description: 'Diseñada específicamente para urología de alta exigencia diagnóstica e intervencionista. Brinda visualización de vasos sanguíneos diminutos y bordes tisulares con nitidez absoluta gracias a sus algoritmos de realce de contraste de hemoglobina.',
    images: [
      'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=80'
    ],
    brochure_url: '#',
    features: [
      'Resolución nativa 3840 x 2160 píxeles a 60 fps',
      'Fuente de luz fría LED de 300W con vida útil de más de 50,000 horas',
      'Insuflador de CO2 de alto flujo de 45 Litros con calentamiento integrado',
      'Grabación directa a USB y conectividad DICOM para quirófano inteligente'
    ],
    specifications: {
      'Sensor': '3-CMOS 4K Ultra HD',
      'Monitor': 'Monitor quirúrgico grado médico de 32" o 55"',
      'Salidas de video': '12G-SDI, HDMI 2.0, DisplayPort',
      'Insuflador': '45 L/min con reducción de hipotermia'
    },
    status: 'active',
    whatsapp_message: 'Hola Mednova, me interesa consultar el precio y condiciones de la Torre de Laparoscopía 4K.',
    created_at: '2026-03-10T10:00:00Z'
  },
  {
    id: 'prod-4',
    name: 'Ureterorrenoscopio Flexible Digital HD Mednova FlexScope',
    slug: 'ureteroscopio-flexible-digital-hd',
    brand: 'Mednova Endoscopy',
    model: 'MN-FLEX-HD',
    specialty: 'Endourología Avanzada',
    category: 'equipo',
    short_description: 'Endoscopio urológico flexible con sensor CMOS en punta distal y deflexión bidireccional de 275°.',
    full_description: 'Facilita el acceso a cálices inferiores renales de difícil acceso. Su diseño ergonómico y bajo peso reduce la fatiga del cirujano en procedimientos prolongados de litotricia intrarrenal retrógrada (RIRS).',
    images: [
      'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=1200&q=80'
    ],
    features: [
      'Sensor micro CMOS en la punta con iluminación dual LED integrada',
      'Ángulo de deflexión activo: 275° arriba / 275° abajo',
      'Canal de trabajo de 3.6 Fr para máxima irrigación y paso de canastillas',
      'Diámetro exterior de punta atraumática de 7.5 Fr'
    ],
    specifications: {
      'Diámetro del tubo': '7.5 Fr / 8.5 Fr',
      'Canal de trabajo': '3.6 Fr',
      'Longitud de trabajo': '670 mm',
      'Deflexión': '275° arriba / 275° abajo'
    },
    status: 'active',
    whatsapp_message: 'Buenas tardes Mednova, deseo asesoría técnica sobre el Ureteroscopio Flexible Digital.',
    created_at: '2026-03-15T10:00:00Z'
  },
  {
    id: 'prod-5',
    name: 'Sistema de Resección Bipolar de Flujo Continuo (RTU / BipoPulse)',
    slug: 'sistema-reseccion-bipolar-rtu',
    brand: 'Mednova Surgical',
    model: 'MN-BIPO400',
    specialty: 'Cirugía Prostática (RTU & Láser)',
    category: 'equipo',
    short_description: 'Generador electroquirúrgico bipolar para resección prostática y vesical en solución salina fisiológica.',
    full_description: 'Elimina el riesgo del síndrome de absorción líquida (síndrome RTU) al operar con solución salina normal. Ofrece cortes limpios con hemostasia instantánea sin estimulación del nervio obturador.',
    images: [
      'https://images.unsplash.com/photo-1583912267670-6575ad3726f8?auto=format&fit=crop&w=1200&q=80'
    ],
    features: [
      'Tecnología de plasma bipolar de inicio instantáneo',
      'Flujo continuo con camisas de irrigación y succión balanceada',
      'Vaporización prostática y corte en un solo instrumento',
      'Garantía extendida y servicio técnico certificado Mednova'
    ],
    specifications: {
      'Potencia de corte bipolar': '320W',
      'Potencia de coagulación': '200W',
      'Medio de trabajo': 'Solución salina (NaCl 0.9%)',
      'Camisas compatibles': '24 Fr / 26 Fr de flujo continuo'
    },
    status: 'active',
    whatsapp_message: 'Hola Mednova, deseo cotizar el Sistema de Resección Bipolar para RTU.',
    created_at: '2026-03-20T10:00:00Z'
  },
  // CONSUMABLES
  {
    id: 'prod-6',
    name: 'Fibras Ópticas Láser de Holmium y Tulio (200µm - 1000µm)',
    slug: 'fibras-opticas-laser-urologia',
    brand: 'Mednova OpticCare',
    model: 'MN-FIBER-SERIES',
    specialty: 'Consumibles & Desechables',
    category: 'consumible',
    short_description: 'Fibras de cuarzo de alta pureza con conector SMA-905 estándar, disponibles en versiones de un solo uso y reusables.',
    full_description: 'Diseñadas para soportar altas potencias de energía láser sin rotura en flexión extrema. Su pulido óptico garantiza una transmisión energética superior al 98% con protección térmica.',
    images: [
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1200&q=80'
    ],
    features: [
      'Diámetros de núcleo: 200 µm, 272 µm, 365 µm, 550 µm y 1000 µm',
      'Conector universal SMA-905 compatible con marcas líderes',
      'Excelente flexibilidad para maniobras en cálices inferiores',
      'Esterilizadas individualmente listas para uso en quirófano'
    ],
    specifications: {
      'Material': 'Sílice de alta pureza (Fused Silica)',
      'Longitud': '3.0 metros',
      'Esterilización': 'Óxido de etileno (EtO)',
      'Compatibilidad': 'Holmium:YAG (2.1µm) y Thulium Fiber (1.94µm)'
    },
    status: 'featured',
    whatsapp_message: 'Hola Mednova, solicito cotización por lote de Fibras Ópticas Láser.',
    created_at: '2026-03-22T10:00:00Z'
  },
  {
    id: 'prod-7',
    name: 'Catéteres Ureterales Doble J Hidrofílicos de Larga Permanencia',
    slug: 'cateter-ureteral-doble-j-hidrofilico',
    brand: 'Mednova UroCare',
    model: 'MN-DJ-LONG',
    specialty: 'Consumibles & Desechables',
    category: 'consumible',
    short_description: 'Stents ureterales de poliuretano biocompatible con recubrimiento hidrofílico para fácil inserción.',
    full_description: 'Diseñados para prevenir incrustaciones de sales urinarias y maximizar el confort del paciente durante períodos prolongados (hasta 12 meses de permanencia). Incluye guía y empujador de alta precisión.',
    images: [
      'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&w=1200&q=80'
    ],
    features: [
      'Recubrimiento hidrofílico de baja fricción al contacto con fluidos',
      'Excelente radiopacidad para verificación fluoroscópica clara',
      'Extremos con memoria de forma para fijación segura en cáliz y vejiga',
      'Marcas milimétricas precisas a lo largo del cuerpo'
    ],
    specifications: {
      'Calibres disponibles': '4.5 Fr, 6.0 Fr, 7.0 Fr',
      'Longitudes': '24 cm, 26 cm, 28 cm, 30 cm',
      'Tiempo de permanencia': 'Hasta 365 días',
      'Kit incluye': 'Stent Doble J + Guía PTFE + Empujador'
    },
    status: 'active',
    whatsapp_message: 'Hola Mednova, solicito catálogo y precios de Catéteres Doble J.',
    created_at: '2026-03-25T10:00:00Z'
  },
  {
    id: 'prod-8',
    name: 'Canastillas de Nitinol para Extracción de Cálculos (Tipless)',
    slug: 'canastillas-nitinol-tipless-urologia',
    brand: 'Mednova UroCare',
    model: 'MN-BASKET-NT',
    specialty: 'Consumibles & Desechables',
    category: 'consumible',
    short_description: 'Canastilla de nitinol sin punta frontal para atrapar cálculos directamente contra la mucosa calicial sin trauma.',
    full_description: 'La aleación de Nitinol con súper elasticidad asegura que la cesta vuelva a su forma original tras múltiples aperturas y cierres en el uréter o cálices renales.',
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80'
    ],
    features: [
      'Diseño sin punta (Tipless) para reducir traumatismos tisulares',
      'Vaina ultra delgada de 1.5 Fr a 2.2 Fr',
      'Excelente torque 1:1 para rotación controlada por el cirujano',
      'Mango ergonómico con mecanismo de liberación rápida'
    ],
    specifications: {
      'Calibre de vaina': '1.5 Fr / 1.9 Fr / 2.2 Fr',
      'Apertura de canastilla': '11 mm / 15 mm',
      'Configuración': '4 alambres de Nitinol',
      'Longitud de trabajo': '115 cm'
    },
    status: 'active',
    whatsapp_message: 'Hola Mednova, deseo cotizar Canastillas de Nitinol Tipless.',
    created_at: '2026-03-28T10:00:00Z'
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
