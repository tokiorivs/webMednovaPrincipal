// Preguntas frecuentes de Urolase MAX.
// Cada respuesta se basa solo en los brochures oficiales de VPG LaserOne.
// Se usa tanto en el FAQ visible de la ficha como en el JSON-LD (FAQPage).
export interface FaqItem {
  question: string;
  answer: string;
}

export const UROLASE_FAQS: FaqItem[] = [
  {
    question: '¿Qué es Urolase MAX?',
    answer:
      'Urolase MAX es una plataforma láser todo en uno para urología de VPG LaserOne. Es un sistema láser de fibra de tulio compatible con todo el espectro de procedimientos hospitalarios, desde la cirugía de tejidos blandos hasta la litotricia.',
  },
  {
    question: '¿Cómo funciona el Tissue Sensor?',
    answer:
      'Tissue Sensor es una tecnología de seguridad desarrollada por VPG LaserOne. Opera bajo el principio de diferenciación tisular en tiempo real: detecta si frente a la punta de la fibra hay tejido duro (cálculo) o blando. Durante la litotricia, detiene automáticamente la emisión del láser al detectar tejido blando, reduciendo significativamente el riesgo de lesión o perforación.',
  },
  {
    question: '¿Qué modos de litotricia ofrece?',
    answer:
      'Tres modos. FinePulse permite litotricia a alta velocidad, pulverizando los cálculos hasta obtener polvo ultrafino. UltraPulse entrega energía de alto impacto y fragmenta de inmediato incluso los cálculos densos en fragmentos grandes para una extracción eficiente. MRP minimiza la retropulsión del cálculo en comparación con láseres de holmio y modos de pulso estándar de la serie de láseres de fibra de tulio Urolase.',
  },
  {
    question: '¿Qué opciones ofrece para enucleación de próstata y cirugía de tejidos blandos?',
    answer:
      'Dos modos de enucleación en un solo sistema: DissectPulse (enucleación modulada, con hemostasia superior y sin carbonización) y ThuFLEP (enucleación clásica con láser de fibra de tulio). Además incluye BloodlessPulse, un modo de coagulación de zona amplia, y CleanPulse, para vapoenucleación y vaporización sin carbonización.',
  },
  {
    question: '¿Qué fibras utiliza Urolase MAX?',
    answer:
      'Utiliza fibras quirúrgicas VPG OnePush, con un conector con obturador automático diseñado para prevenir la contaminación y permitir conexiones rápidas, seguras y sencillas. Están disponibles en cinco diámetros (150, 200, 365, 550 y 940 µm) y en formato desechable (uso único) y reutilizable (uso múltiple).',
  },
  {
    question: '¿Qué requisitos de instalación y mantenimiento tiene?',
    answer:
      'Según VPG LaserOne, Urolase MAX se instala con una conexión eléctrica estándar, se refrigera por aire (no requiere unidad externa) y no requiere mantenimiento rutinario. Para los parámetros eléctricos y técnicos exactos, solicite la ficha técnica completa a Mednova.',
  },
  {
    question: '¿Cómo solicito una cotización o más información?',
    answer:
      'Escríbanos por WhatsApp y le responde una persona del equipo de Mednova. Somos el distribuidor exclusivo de VPG LaserOne en Perú, y contamos con servicio postventa y mentoría personalizados.',
  },
];
