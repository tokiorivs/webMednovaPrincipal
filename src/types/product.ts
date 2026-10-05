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
