export interface Product {
  id: string;
  name: string;
  slug: string;
  seo_title?: string | null; // <title> de la página (30-60 caracteres)
  image_alts?: string[]; // texto alternativo de cada imagen de `images` (mismo orden)
  h1?: string | null; // título SEO de la ficha; si falta se usa `name`
  brand: string;
  model: string;
  specialty: string; // e.g. "Litotricia Láser", "Endourología", "Laparoscopía", "Diagnóstico", "Consumibles"
  category: 'equipo' | 'consumible';
  short_description: string;
  full_description: string;
  images: string[];
  brochure_url?: string;
  video_url?: string | null; // antiguo: ahora se usa hero_media_url
  hero_media_url?: string | null; // imagen o video promocional de la portada
  hero_background_url?: string | null; // imagen o video (.mp4/.webm); vacío = fondo de fábrica
  tagline?: string;
  key_metrics?: Array<{ label: string; value: string; unit?: string; helper?: string }>;
  clinical_applications?: Array<{
    id: string;
    title: string;
    subtitle?: string;
    description: string;
    modes: Array<{
      title: string;
      description: string;
      badge?: string;
    }>;
    scientific_note?: string;
  }>;
  safety_features?: Array<{
    title: string;
    subtitle?: string;
    description: string;
    badge?: string;
  }>;
  // Bloques de "Más información" (máx. 6): imagen, título, subtítulo y texto.
  info_blocks?: Array<{ image: string; title: string; subtitle?: string; description: string }>;
  system_advantages?: Array<{
    title: string;
    description: string;
    icon?: string;
  }>;
  manufacturer_info?: {
    name: string;
    description: string;
    founded?: string;
    annual_patients?: string;
    patents?: string;
    installed_units?: string;
  };
  faqs?: Array<{ question: string; answer: string }>;
  features: string[]; // key clinical features
  specifications: Record<string, string>; // e.g. { "Potencia": "60W", "Longitud de onda": "2100 nm" }
  status: 'active' | 'draft' | 'featured';
  whatsapp_message?: string;
  created_at: string;
  updated_at?: string;
}

export interface MedicalSpecialty {
  id: string;
  name: string;
  icon: string;
  description: string;
  equipment_count?: number;
}

export interface MedicalEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  type: 'Congreso' | 'Workshop' | 'Jornada Quirúrgica' | 'Webinar';
  description: string;
  image?: string;
  link?: string;
  status: 'upcoming' | 'past';
}
