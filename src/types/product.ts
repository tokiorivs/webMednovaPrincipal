export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  model: string;
  specialty: string; // e.g. "Litotricia Láser", "Endourología", "Laparoscopía", "Diagnóstico", "Consumibles"
  category: 'equipo' | 'consumible';
  short_description: string;
  full_description: string;
  images: string[];
  brochure_url?: string;
  video_url?: string;
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
  features: string[]; // key clinical features
  specifications: Record<string, string>; // e.g. { "Potencia": "60W", "Longitud de onda": "2100 nm" }
  status: 'active' | 'draft' | 'featured';
  whatsapp_message?: string;
  created_at: string;
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
