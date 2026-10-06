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
    tagline: 'Nueva tecnología láser de alta precisión para urología',
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
      { label: 'Retropulsión', value: '< 3.0', unit: 'mm', helper: 'Modo MRP* vs 10 mm en Ho:YAG y Moses' },
      { label: 'Alimentación', value: '220', unit: 'VAC', helper: 'Conexión eléctrica estándar sin trifásica' },
      { label: 'Microfibras', value: '150 - 940', unit: 'µm', helper: '5 calibres disponibles (Desechable y Reutilizable)' }
    ],
    clinical_applications: [
      {
        id: 'litotricia',
        title: 'Litotricia & Cálculos Renales',
        subtitle: 'Pulsos modulados de alta eficiencia clínica y mínima retropulsión',
        description: 'Los ajustes de pulso modulado y las características de alta potencia del sistema láser Urolase MAX elevan la litotricia a un nivel de eficiencia clínica fundamentalmente nuevo, superando a los sistemas láser urológicos convencionales.',
        modes: [
          {
            title: 'Nuevo modo FinePulse',
            description: 'Permite realizar litotricia a alta velocidad, pulverizando eficazmente los cálculos urinarios hasta obtener polvo ultrafino sin necesidad de extracción mecánica.',
            badge: 'Polvo Ultrafino'
          },
          {
            title: 'Modo especializado UltraPulse',
            description: 'Proporciona energía de alto impacto, fragmentando de forma inmediata incluso los cálculos densos en fragmentos grandes para una extracción eficiente con canastilla.',
            badge: 'Alto Impacto'
          },
          {
            title: 'Modo MRP* (Mínima Retropulsión)',
            description: 'Minimiza la retropulsión del cálculo durante la litotricia (~3 mm) en comparación con láseres de holmio y pulsos Moses (9.5 - 10 mm), manteniendo el cálculo estable.',
            badge: 'Estabilidad de Campo'
          }
        ],
        scientific_note: 'Validación científica: Ventimiglia E., et al. (2020) Effect on Temporal Pulse Shape on Urinary Stone Phantom Retropulsion Rate and Ablation Efficiency Using Holmium:YAG and Superpulse Thulium Fiber Lasers. BJU Int. 2020 Jul; 126(1): 159-167.'
      },
      {
        id: 'tejidos-blandos',
        title: 'Tejidos Blandos & Próstata (BPH)',
        subtitle: 'Dos modos de enucleación de próstata en un solo sistema quirúrgico',
        description: 'Con dos modos de enucleación integrados, Urolase MAX ofrece mayor versatilidad para cirugías urológicas personalizadas y de alta precisión.',
        modes: [
          {
            title: 'Modo DissectPulse (Enucleación Modulada)',
            description: 'Proporciona hemostasia superior que supera significativamente a HoLEP, permite disección precisa del tejido adenomatoso similar a HoLEP y opera sin carbonización.',
            badge: 'Alternativa Superior a HoLEP'
          },
          {
            title: 'Técnica ThuFLEP (Enucleación Clásica TFL)',
            description: 'Alta precisión gracias a la mínima profundidad de penetración, excelente hemostasia con prácticamente ausencia de pérdida sanguínea y vaporización eficiente de tejido blando.',
            badge: 'Mínima Penetración (0.2 mm)'
          },
          {
            title: 'Modo BloodlessPulse (Coagulación de Zona Amplia)',
            description: 'Incorpora un modo de coagulación de zona amplia que garantiza hemostasia eficaz desde corta distancia, permitiendo tratamientos seguros en zonas de difícil acceso.',
            badge: 'Hemostasia Inmediata'
          },
          {
            title: 'Modo CleanPulse (Sin Carbonización)',
            description: 'Durante la vapoenucleación y vaporización, permite la eliminación de tejido blando sin carbonización y con daño térmico mínimo, preservando la visibilidad del endoscopio.',
            badge: 'Visibilidad Cristalina'
          }
        ]
      }
    ],
    safety_features: [
      {
        title: 'Tissue Sensor™',
        subtitle: 'Reconocimiento de cálculo vs tejido blando',
        description: 'Tecnología de seguridad de VPG LaserOne que diferencia tejido duro y blando en tiempo real. Durante la litotricia, detecta tejido blando y detiene automáticamente el láser, reduciendo el riesgo de lesiones o perforaciones.',
        badge: 'Innovación Exclusiva'
      },
      {
        title: "Surgeon's Assistant",
        subtitle: 'Asistente quirúrgico inteligente con pantalla táctil',
        description: 'El primer sistema láser con asistente quirúrgico inteligente, desarrollado a partir de años de análisis de protocolos mundiales. Ajusta automáticamente parámetros en tiempo real en Soft Tissue, Stone, Quick Start y Expert.',
        badge: 'Smart Interface'
      },
      {
        title: 'Conector OnePush',
        subtitle: 'Conector de fibra con obturador automático',
        description: 'El conector de fibra OnePush, con obturador automático, está diseñado para prevenir la contaminación y permitir conexiones rápidas, seguras y sencillas.',
        badge: 'Protección Óptica'
      }
    ],
    system_advantages: [
      {
        title: 'Hasta 3 veces más compacto y liviano que sistemas Ho:YAG',
        description: 'Consola ergonómica de solo 42 kg, fácil de trasladar entre quirófanos hospitalarios sin el volumen ni peso excesivo de consolas Holmium clásicas.'
      },
      {
        title: 'Instalación sencilla con conexión eléctrica estándar',
        description: 'Conexión directa a tomacorriente convencional de pared 220V sin necesidad de modificaciones eléctricas ni acometidas trifásicas.'
      },
      {
        title: 'Refrigeración por aire, no requiere unidad externa',
        description: 'Enfriamiento autónomo de alta eficiencia y silencioso (< 52 dB). No requiere unidad externa ni circuito hidráulico de agua.'
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
  },
  {
    id: 'prod-2',
    name: 'Fibras Quirúrgicas VPG • Fibras Láser de Cuarzo de Alta Precisión',
    slug: 'fibras-quirurgicas-vpg',
    brand: 'VPG LaserOne',
    model: 'OnePush / HP / LP Series',
    specialty: 'Litotricia Láser, Flebología & Cirugía de Tejidos Blandos',
    category: 'consumible',
    tagline: 'Fibras ópticas de cuarzo de alta pureza para Urolase MAX, FiberLase y plataformas quirúrgicas universales',
    short_description: 'Fibras láser quirúrgicas de cuarzo de alta pureza con tecnología OnePush™, puntas desnudas, radiales 360° y cónicas. Diseñadas para litotricia de máxima deflexión en flexible (desde 150 µm), ablación venosa EVLT y vaporización precisa.',
    full_description: 'Las fibras quirúrgicas VPG LaserOne (grupo IPG Photonics) representan el estándar de oro en entrega de energía láser médica. Fabricadas bajo estrictos controles con núcleos de cuarzo fundido de alta pureza (Silica/Silica) y apertura numérica NA 0.22, ofrecen una transmisión lumínica superior al 95%. La gama comprende la innovadora línea OnePush™ con alineación instantánea y obturador antipolvo en formatos desechables y reutilizables (hasta 20 ciclos de autoclave), la serie VPG HP para láseres de alta potencia con conector universal SMA-905, la línea multidisciplinaria VPG LP, fibras radiales 360° para flebología EVLT y proctología, y fibras cónicas para fotocoagulación hemorroidal.',
    images: [
      '/images/products/fibras-quirurgicas-vpg/vpg_fibers_hero.webp',
      '/images/products/fibras-quirurgicas-vpg/onepush_fiber.webp',
      '/images/products/fibras-quirurgicas-vpg/hp_fiber.webp',
      '/images/products/fibras-quirurgicas-vpg/radial_fiber.webp',
      '/images/products/fibras-quirurgicas-vpg/conical_fiber.webp'
    ],
    brochure_url: '/pdfs/Surgical Fibers_sp.pdf',
    video_url: '/videos/OnePuch_activation.webm',
    key_metrics: [
      { label: 'Diámetros de Núcleo', value: '150 - 940', unit: 'µm', helper: 'Microfibra 150 µm para máxima deflexión en RIRS' },
      { label: 'Alineación Óptica', value: 'OnePush™', helper: 'Conexión con 1 solo clic y obturador antipolvo' },
      { label: 'Esterilización', value: 'Hasta 20', unit: 'ciclos', helper: 'Formato reutilizable validado en autoclave' },
      { label: 'Apertura Numérica', value: '0.22', unit: 'NA', helper: 'Cuarzo/Cuarzo de alta pureza >95% transmisión' },
      { label: 'Emisión Radial', value: '360°', unit: 'circunferencial', helper: 'Ablación venosa homogénea para EVLT' }
    ],
    clinical_applications: [
      {
        id: 'urologia-litotricia',
        title: 'Endourología, RIRS & Litotricia Láser',
        subtitle: 'Fibras OnePush y HP de alta potencia para fragmentación y Dusting ultrafino',
        description: 'Las fibras de 150 µm y 200 µm proporcionan una deflexión superior al 98% en ureterorrenoscopios flexibles de última generación, manteniendo un flujo de irrigación óptimo en cálices inferiores difíciles sin degradar la punta de la fibra.',
        modes: [
          {
            title: 'Microfibra de 150 µm para RIRS Flexible',
            description: 'Flexibilidad insuperable y mínimo radio de curvatura para cálices renales inferiores, preservando la deflexión del endoscopio e irrigación continua.',
            badge: 'Máxima Deflexión'
          },
          {
            title: 'Litotricia de Alto Impacto (200 - 365 µm)',
            description: 'Transmisión sin pérdidas para pulsos de alta energía en litiasis coraliformes y cálculos ureterales y vesicales de máxima dureza.',
            badge: 'Alto Rendimiento'
          },
          {
            title: 'Enucleación & Vaporización (550 - 940 µm)',
            description: 'Corte hemostático continuo para cirugías de próstata (ThuFLEP, HoLEP) y vaporización de tumores uroteliales.',
            badge: 'Tejidos Blandos'
          }
        ],
        scientific_note: 'Homologación de compatibilidad con plataformas Tulio TFL (Urolase MAX, Urolase+, FiberLase) y generadores Holmium:YAG convencionales.'
      },
      {
        id: 'flebologia-evlt',
        title: 'Flebología & Tratamiento Endovenoso (EVLT)',
        subtitle: 'Fibra de emisión radial 360° para ablación homogénea',
        description: 'La fibra radial VPG LP proporciona una distribución circunferencial homogénea del haz láser en la pared de la vena safena, evitando la perforación del vaso y minimizando el dolor y hematomas postoperatorios.',
        modes: [
          {
            title: 'Fibra Radial R365 (Catéter 16G)',
            description: 'Diámetro externo de 650 µm y cápsula de frasco de 1.2 mm para venas safenas accesorias y tributarias.',
            badge: 'Catéter 16G'
          },
          {
            title: 'Fibra Radial R550 (Catéter 14G)',
            description: 'Diámetro externo de 1200 µm y cápsula de frasco de 1.4 mm para vena safena mayor y venas tronculares de gran calibre.',
            badge: 'Catéter 14G'
          }
        ]
      },
      {
        id: 'proctologia-conica',
        title: 'Proctología & Tratamiento Hemorroidal',
        subtitle: 'Fibra cónica con mango de bloqueo micrométrico',
        description: 'Método mínimamente invasivo ampliamente utilizado para el tratamiento de hemorroides grado I–III. La geometría cónica facilita una inserción suave en el nódulo hemorroidal con entrega láser dirigida y eficaz.',
        modes: [
          {
            title: 'Geometría Cónica de Inserción Suave',
            description: 'Núcleo de 550 µm con cápsula cónica de 1.4 mm que asegura una fotocoagulación subdérmica selectiva respetando el esfínter anal.',
            badge: 'Hemorroides I-III'
          },
          {
            title: 'Soporte y Mecanismo de Bloqueo',
            description: 'Pieza de mano metálica ergonómica que fija la fibra firmemente impidiendo desplazamientos involuntarios durante la vaporización.',
            badge: 'Control Ergonómico'
          }
        ]
      },
      {
        id: 'multidisciplinario-lp',
        title: 'Cirugía General, ORL, Ginecología & Neurocirugía',
        subtitle: 'Línea VPG LP de punta plana para procedimientos delicados',
        description: 'Instrumento versátil para disección precisa, vaporización y coagulación con daño térmico mínimo colateral en cirugías abiertas, laparoscópicas y endoscópicas.',
        modes: [
          {
            title: 'Otorrinolaringología (ORL)',
            description: 'Microcirugía de cuerdas vocales, estapedectomía y ablación de lesiones en fosas nasales con hemostasia inmediata.',
            badge: 'Microcirugía'
          },
          {
            title: 'Ginecología y Laparoscopía',
            description: 'Resección limpia de focos de endometriosis y adherencias pélvicas sin carbonización tisular.',
            badge: 'Bajo Daño Térmico'
          }
        ]
      }
    ],
    safety_features: [
      {
        title: 'Conector OnePush™ con Obturador Antipolvo',
        subtitle: 'Protección activa del puerto óptico del láser',
        description: 'Diseño patentado con obturador automático que aísla la óptica interna contra polvo, residuos y partículas, garantizando un acoplamiento estéril, rápido e impecable con un solo clic.',
        badge: 'Exclusivo VPG'
      },
      {
        title: 'Resistencia Térmica y Mecánica Validada',
        subtitle: 'Hasta 20 ciclos de esterilización en autoclave',
        description: 'La versión reutilizable soporta ciclos de calor húmedo manteniendo la integridad del núcleo de cuarzo y el recubrimiento polimérico sin pérdida de alineación.',
        badge: 'Reutilizable 20x'
      },
      {
        title: 'Control de Calidad y Calibración Individual 100%',
        subtitle: 'Inspección óptica de laboratorio',
        description: 'Cada fibra es sometida a prueba de transmisión lumínica individual con haz colimado para garantizar una concentricidad perfecta y apertura numérica NA 0.22 uniforme.',
        badge: 'Control 100%'
      }
    ],
    system_advantages: [
      {
        title: 'Conector OnePush™ & SMA-905 Universal',
        description: 'Disponibles tanto para consolas Urolase MAX como para equipos láser de alta o baja potencia con conector universal SMA-905.'
      },
      {
        title: 'Microcalibre 150 µm para RIRS Flexible',
        description: 'Permite un radio de curvatura extremadamente cerrado sin romperse, manteniendo irrigación constante en cálices inferiores difíciles.'
      },
      {
        title: 'Formatos Desechable y Reutilizable',
        description: 'Optimización de costes hospitalarios: elección entre máxima practicidad estéril monouso o versiones reutilizables de alta durabilidad.'
      },
      {
        title: 'Núcleo Cuarzo/Cuarzo de Alta Pureza',
        description: 'Transmisión superior al 95% con mínima dispersión térmica lateral y alta resistencia a picos de energía.'
      }
    ],
    manufacturer_info: {
      name: 'VPG LaserOne (IPG Photonics Group)',
      description: 'Líder pionero mundial en tecnologías de láser de fibra médica y amplificadores ópticos, fundado en 1991 por el Dr. Valentin Pavlovich Gapontsev.',
      founded: '1991',
      annual_patients: '> 1,000,000',
      patents: '50+',
      installed_units: '> 3,000'
    },
    features: [
      'Núcleos de cuarzo fundido de alta pureza (Cuarzo / Cuarzo) con NA 0.22',
      'Conector OnePush™ patentado con obturador antipolvo automático para Urolase MAX',
      'Conector universal SMA-905 compatible con plataformas láser médicas de terceros',
      'Microfibra de 150 µm ideal para ureterorrenoscopia flexible y micropunción',
      'Formatos desechables (uso único) y reutilizables (hasta 20 ciclos en autoclave)',
      'Fibras radiales 360° para ablación venosa homogénea en EVLT (R365 y R550)',
      'Fibras cónicas con pieza de mano y mecanismo de bloqueo para proctología',
      'Gama completa de calibres ópticos: 150, 200, 365, 550 y 940 µm',
      'Longitud estándar de 3 metros con vaina protectora biocompatible',
      'Certificación médica internacional CE y fabricación bajo norma ISO 13485'
    ],
    specifications: {
      'Diámetros de núcleo': '150 µm, 200 µm, 365 µm, 550 µm, 940 µm',
      'Diámetros externos': '315 ± 105 µm, 400 ± 90 µm, 600 ± 150 µm, 800 ± 150 µm, 1500 ± 300 µm',
      'Material óptico': 'Cuarzo / Cuarzo de alta pureza (Fused Silica)',
      'Apertura numérica (NA)': '0,22',
      'Longitud de fibra': '3.0 metros',
      'Tipos de conector': 'OnePush™ (Urolase MAX) y SMA-905 Universal',
      'Tipos de punta': 'Punta plana desnuda, Punta radial 360° (R365/R550), Punta cónica',
      'Número de usos': 'Uso único (desechable) o Reutilizable (hasta 20 ciclos en autoclave)',
      'Equipos compatibles': 'Urolase MAX, Urolase+, Urolase+ Premium, FiberLase S/SP/SP+, VTLase y consolas SMA-905',
      'Especialidades clínicas': 'Litotricia RIRS, Cirugía prostática, Flebología EVLT, Proctología, ORL, Ginecología',
      'Certificaciones': 'Marcado CE Dispositivo Médico, ISO 13485, Trazabilidad individual'
    },
    status: 'featured',
    whatsapp_message: 'Hola Mednova Technologies, deseo cotizar y solicitar información técnica de las Fibras Quirúrgicas VPG LaserOne.',
    created_at: '2026-03-02T10:00:00Z'
  },
  {
    id: 'prod-3',
    name: 'Catéter Ureteral Doble J Hidrofílico',
    slug: 'cateter-doble-j-hidrofilico',
    brand: 'Mednova Endourology',
    model: 'HydroGlide DJ',
    specialty: 'Endourología & Consumibles',
    category: 'consumible',
    tagline: 'Máxima biocompatibilidad y baja fricción para drenaje ureteral prolongado',
    short_description: 'Stent ureteral de poliuretano de grado médico con recubrimiento hidrofílico activo. Disponible en calibres de 4.8 Fr a 7 Fr y longitudes de 24 a 30 cm.',
    full_description: 'El catéter ureteral doble J HydroGlide está fabricado con poliuretano termoplástico de memoria elástica optimizada. Su revestimiento hidrofílico facilita una inserción atraumática reduciendo la irritación urotelial y la tasa de incrustación mineral durante permanencias de hasta 6 meses.',
    images: [
      'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&w=800&q=80'
    ],
    features: [
      'Revestimiento hidrofílico de baja fricción para inserción suave',
      'Excelente radiopacidad a lo largo de todo el stent',
      'Diseño multipéptido que minimiza el reflujo vesicoureteral',
      'Incluye guía hidrofílica de nitinol y empujador radiopaco'
    ],
    specifications: {
      'Calibres': '4.8 Fr, 6 Fr, 7 Fr',
      'Longitudes': '24 cm, 26 cm, 28 cm, 30 cm',
      'Material': 'Poliuretano radiopaco hidrofílico',
      'Tiempo de permanencia': 'Hasta 6 meses',
      'Esterilización': 'Óxido de Etileno (ETO)'
    },
    status: 'active',
    whatsapp_message: 'Hola Mednova Technologies, deseo cotizar Catéteres Doble J Hidrofílicos.',
    created_at: '2026-03-03T10:00:00Z'
  },
  {
    id: 'prod-4',
    name: 'Cesta de Litotricia Tipless en Nitinol',
    slug: 'canastilla-litotricia-nitinol',
    brand: 'Mednova Endourology',
    model: 'Nititip Pro',
    specialty: 'Litotricia Láser & Endourología',
    category: 'consumible',
    tagline: 'Captura segura y extracción atraumática de litiasis caliciales',
    short_description: 'Canastilla tipless sin punta en aleación Nitinol con memoria de forma. Calibre ultra-delgado de 1.5 Fr para extracción segura en cálices inferiores.',
    full_description: 'Diseñada específicamente para procedimientos de ureterorrenoscopia flexible (RIRS). La ausencia de punta distal (tipless) previene perforaciones en la mucosa calicial y permite atrapar fragmentos directamente sobre el fondo del cáliz renal.',
    images: [
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80'
    ],
    features: [
      'Diseño Tipless sin punta para trabajo seguro en cálices inferiores',
      'Aleación superelástica de Nitinol con máxima resistencia al colapso',
      'Calibre ultra-fino de 1.5 Fr y 1.9 Fr que preserva la deflexión del endoscopio',
      'Mango desmontable con trinquete de fijación táctil'
    ],
    specifications: {
      'Calibre de vaina': '1.5 Fr y 1.9 Fr',
      'Diámetro de canastilla': '10 mm, 12 mm, 15 mm',
      'Configuración de alambres': '4 alambres de Nitinol superelástico',
      'Longitud de trabajo': '115 cm y 120 cm',
      'Esterilización': 'ETO monouso'
    },
    status: 'active',
    whatsapp_message: 'Hola Mednova Technologies, deseo cotizar Canastillas de Litotricia Tipless en Nitinol.',
    created_at: '2026-03-04T10:00:00Z'
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
  workingHours: 'Lunes a Viernes: 8:00 AM - 6:30 PM'
};
