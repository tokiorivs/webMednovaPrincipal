-- ============================================================
-- MEDNOVA TECHNOLOGIES - SCHEMA PARA SUPABASE (POSTGRESQL)
-- ============================================================
-- Copia y pega este contenido en el 'SQL Editor' de tu proyecto en Supabase
-- para crear las tablas, índices, almacenamiento y políticas de seguridad.

-- 1. EXTENSIÓN PARA GENERAR UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. TABLA DE PRODUCTOS (MÁQUINAS DE UROLOGÍA Y CONSUMIBLES)
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    brand TEXT NOT NULL DEFAULT 'Mednova',
    model TEXT NOT NULL,
    specialty TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('equipo', 'consumible')),
    short_description TEXT NOT NULL,
    full_description TEXT NOT NULL,
    images TEXT[] NOT NULL DEFAULT '{}',
    brochure_url TEXT,
    features TEXT[] NOT NULL DEFAULT '{}',
    specifications JSONB NOT NULL DEFAULT '{}'::jsonb,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'featured', 'draft')),
    whatsapp_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. TABLA DE EVENTOS Y CONGRESOS MÉDICOS
CREATE TABLE IF NOT EXISTS public.events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    date TEXT NOT NULL,
    location TEXT NOT NULL,
    type TEXT NOT NULL DEFAULT 'Congreso',
    description TEXT NOT NULL,
    image TEXT,
    link TEXT,
    status TEXT NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'past')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. TABLA DE SOLICITUDES DE COTIZACIÓN / LEADS
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    institution TEXT, -- Clínica / Hospital / Consultorio
    product_interest TEXT,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. CREACIÓN DE BUCKET DE ALMACENAMIENTO PARA IMÁGENES
-- Se crea el bucket 'product-images' con acceso público de lectura
INSERT INTO storage.buckets (id, name, public) 
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- 6. POLÍTICAS DE SEGURIDAD (RLS - Row Level Security)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Lectura pública para cualquier visitante de la web
CREATE POLICY "Permitir lectura publica de productos" 
ON public.products FOR SELECT USING (true);

CREATE POLICY "Permitir lectura publica de eventos" 
ON public.events FOR SELECT USING (true);

-- Permitir a los visitantes enviar formularios de cotización
CREATE POLICY "Permitir insercion publica de cotizaciones" 
ON public.leads FOR INSERT WITH CHECK (true);

-- Operaciones completas solo para usuarios autenticados (Panel de administración)
CREATE POLICY "Admin productos completo" 
ON public.products FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admin eventos completo" 
ON public.events FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admin leads completo" 
ON public.leads FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Políticas para el Storage (Bucket 'product-images')
CREATE POLICY "Imagenes publicas para lectura"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

CREATE POLICY "Subida de imagenes para autenticados"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Eliminacion de imagenes para autenticados"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'product-images');
