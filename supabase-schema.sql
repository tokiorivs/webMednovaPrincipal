-- ============================================================
-- MEDNOVA TECHNOLOGIES - ESQUEMA PARA SUPABASE (POSTGRESQL)
-- ============================================================
-- Pega este contenido completo en Supabase -> SQL Editor y pulsa RUN.
-- Es seguro ejecutarlo más de una vez.
--
-- MODELO DE SEGURIDAD
--   * El público (clave anon) solo puede LEER productos publicados.
--   * Nadie puede escribir desde el navegador: todas las escrituras las hace
--     el servidor de la web con la clave service_role, después de verificar
--     sesión + 2FA + rol. Por eso NO hay políticas de INSERT/UPDATE/DELETE.
-- ============================================================

-- 1. PRODUCTOS (equipos y consumibles creados desde el panel) ----------------
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE CHECK (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
    brand TEXT NOT NULL DEFAULT 'Mednova',
    model TEXT NOT NULL,
    specialty TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('equipo', 'consumible')),
    tagline TEXT,
    short_description TEXT NOT NULL,
    full_description TEXT NOT NULL DEFAULT '',
    images TEXT[] NOT NULL DEFAULT '{}',
    video_url TEXT,
    brochure_url TEXT,
    features TEXT[] NOT NULL DEFAULT '{}',
    key_metrics JSONB NOT NULL DEFAULT '[]'::jsonb,
    system_advantages JSONB NOT NULL DEFAULT '[]'::jsonb,
    specifications JSONB NOT NULL DEFAULT '{}'::jsonb,
    faqs JSONB NOT NULL DEFAULT '[]'::jsonb,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'featured')),
    whatsapp_message TEXT,
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Si la tabla ya existía de una versión anterior, añade las columnas nuevas.
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS tagline TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS video_url TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS key_metrics JSONB NOT NULL DEFAULT '[]'::jsonb;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS system_advantages JSONB NOT NULL DEFAULT '[]'::jsonb;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS faqs JSONB NOT NULL DEFAULT '[]'::jsonb;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS hero_background_url TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS h1 TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS hero_media_url TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS info_blocks JSONB NOT NULL DEFAULT '[]'::jsonb;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS seo_title TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS image_alts TEXT[] NOT NULL DEFAULT '{}';
-- Contenido generado/importado con IA: quién declaró haberlo revisado y cuándo.
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS ai_assisted BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS ai_review_accepted_at TIMESTAMPTZ;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS ai_review_accepted_by UUID REFERENCES auth.users(id) ON DELETE SET NULL;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS products_category_status_idx ON public.products (category, status);

CREATE OR REPLACE FUNCTION public.set_updated_at() RETURNS trigger
LANGUAGE plpgsql AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS products_set_updated_at ON public.products;
CREATE TRIGGER products_set_updated_at
    BEFORE UPDATE ON public.products
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 2. ADMINISTRADORES DEL PANEL ------------------------------------------------
-- Solo quien esté aquí (y activo) puede entrar al panel, aunque tenga cuenta.
CREATE TABLE IF NOT EXISTS public.admins (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('owner', 'admin')),
    active BOOLEAN NOT NULL DEFAULT true,
    must_change_password BOOLEAN NOT NULL DEFAULT false,
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. CÓDIGOS DE RECUPERACIÓN DEL 2FA (se guardan solo como hash) --------------
CREATE TABLE IF NOT EXISTS public.recovery_codes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    code_hash TEXT NOT NULL,
    used_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS recovery_codes_user_idx ON public.recovery_codes (user_id);

-- 4. REGISTRO DE AUDITORÍA ------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.audit_log (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID,
    email TEXT,
    action TEXT NOT NULL,
    entity TEXT,
    entity_id TEXT,
    detail JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS audit_log_created_idx ON public.audit_log (created_at DESC);

-- 5. AJUSTES DEL SITIO (p. ej. dominios de Cloudflare permitidos) ---------------
CREATE TABLE IF NOT EXISTS public.site_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- 6. SEGURIDAD A NIVEL DE FILA (RLS) ---------------------------------------------
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recovery_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Limpia políticas de versiones anteriores del esquema.
DROP POLICY IF EXISTS "Permitir lectura publica de productos" ON public.products;
DROP POLICY IF EXISTS "Admin productos completo" ON public.products;
DROP POLICY IF EXISTS "Lectura publica de productos publicados" ON public.products;

-- Único acceso público: leer productos publicados.
CREATE POLICY "Lectura publica de productos publicados"
ON public.products FOR SELECT
TO anon, authenticated
USING (status IN ('active', 'featured'));

-- admins, recovery_codes, audit_log y site_settings: sin políticas = nadie
-- (salvo service_role, que ignora RLS) puede leer ni escribir.
REVOKE ALL ON public.admins FROM anon, authenticated;
REVOKE ALL ON public.recovery_codes FROM anon, authenticated;
REVOKE ALL ON public.audit_log FROM anon, authenticated;
REVOKE ALL ON public.site_settings FROM anon, authenticated;
REVOKE INSERT, UPDATE, DELETE ON public.products FROM anon, authenticated;

-- Si en el proyecto se desmarcó "Automatically expose new tables", hay que
-- conceder explícitamente la lectura de productos a la API pública
-- (la política RLS de arriba sigue limitando a productos publicados).
GRANT USAGE ON SCHEMA public TO anon, authenticated;
-- Solo por columnas: created_by y ai_review_accepted_* (IDs de administradores) no son públicas.
REVOKE SELECT ON public.products FROM anon, authenticated;
GRANT SELECT (
    id, name, slug, seo_title, image_alts, h1, brand, model, specialty, category,
    short_description, full_description, images, brochure_url, video_url,
    hero_media_url, hero_background_url, tagline, key_metrics, info_blocks,
    system_advantages, faqs, features, specifications, status, whatsapp_message,
    created_at, updated_at
) ON public.products TO anon, authenticated;

-- Con esa opción desmarcada, tampoco se concede acceso a service_role (el
-- servidor de la web). Se le da acceso completo a las tablas del panel.
GRANT USAGE ON SCHEMA public TO service_role;
GRANT ALL ON public.products, public.admins, public.recovery_codes,
             public.audit_log, public.site_settings TO service_role;
GRANT USAGE, SELECT ON SEQUENCE public.audit_log_id_seq TO service_role;

-- 7. PROPIETARIO INICIAL -------------------------------------------------------------
-- Antes: Authentication -> Users -> "Add user" en Supabase, con el correo
-- cesaroumeres@gmail.com (marca "Auto Confirm User"). Luego ejecuta esto:
INSERT INTO public.admins (user_id, email, role, active, must_change_password)
SELECT id, email, 'owner', true, false
FROM auth.users
WHERE email = 'cesaroumeres@gmail.com'
ON CONFLICT (user_id) DO UPDATE SET role = 'owner', active = true;

-- 8. LÍMITES DE INTENTOS Y CUOTAS (compartidos y atómicos) -----------------------------
-- Los usa el servidor (service_role) para el login, el 2FA, la IA y las subidas.
CREATE TABLE IF NOT EXISTS public.rate_limits (
    key TEXT PRIMARY KEY,
    count INTEGER NOT NULL DEFAULT 0,
    reset_at TIMESTAMPTZ NOT NULL
);
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.rate_limits FROM anon, authenticated;
GRANT ALL ON public.rate_limits TO service_role;

-- Segundos de espera si la clave alcanzó el máximo; 0 si puede continuar.
CREATE OR REPLACE FUNCTION public.rl_wait(p_key TEXT, p_max INTEGER) RETURNS INTEGER
LANGUAGE sql STABLE AS $$
    SELECT COALESCE(
        (SELECT CEIL(EXTRACT(EPOCH FROM (reset_at - now())))::INTEGER
           FROM public.rate_limits
          WHERE key = p_key AND reset_at > now() AND count >= p_max),
        0);
$$;

-- Registra un fallo (abre la ventana si no existe o ya venció).
CREATE OR REPLACE FUNCTION public.rl_fail(p_key TEXT, p_window_secs INTEGER) RETURNS VOID
LANGUAGE plpgsql AS $$
BEGIN
    INSERT INTO public.rate_limits AS r (key, count, reset_at)
    VALUES (p_key, 1, now() + make_interval(secs => p_window_secs))
    ON CONFLICT (key) DO UPDATE SET
        count = CASE WHEN r.reset_at <= now() THEN 1 ELSE r.count + 1 END,
        reset_at = CASE WHEN r.reset_at <= now() THEN now() + make_interval(secs => p_window_secs) ELSE r.reset_at END;
    -- Limpieza ocasional de ventanas vencidas.
    IF random() < 0.02 THEN
        DELETE FROM public.rate_limits WHERE reset_at < now() - interval '1 day';
    END IF;
END;
$$;

CREATE OR REPLACE FUNCTION public.rl_clear(p_key TEXT) RETURNS VOID
LANGUAGE sql AS $$
    DELETE FROM public.rate_limits WHERE key = p_key;
$$;

-- Reserva atómica de un cupo: 0 = reservado; >0 = segundos de espera (cuota agotada).
CREATE OR REPLACE FUNCTION public.rl_reserve(p_key TEXT, p_max INTEGER, p_window_secs INTEGER) RETURNS INTEGER
LANGUAGE plpgsql AS $$
DECLARE
    v_count INTEGER;
    v_wait INTEGER;
BEGIN
    INSERT INTO public.rate_limits AS r (key, count, reset_at)
    VALUES (p_key, 1, now() + make_interval(secs => p_window_secs))
    ON CONFLICT (key) DO UPDATE SET
        count = CASE WHEN r.reset_at <= now() THEN 1 ELSE r.count + 1 END,
        reset_at = CASE WHEN r.reset_at <= now() THEN now() + make_interval(secs => p_window_secs) ELSE r.reset_at END
    WHERE r.reset_at <= now() OR r.count < p_max
    RETURNING r.count INTO v_count;

    IF v_count IS NOT NULL THEN
        RETURN 0;
    END IF;

    SELECT GREATEST(1, CEIL(EXTRACT(EPOCH FROM (reset_at - now())))::INTEGER) INTO v_wait
      FROM public.rate_limits WHERE key = p_key;
    RETURN COALESCE(v_wait, 1);
END;
$$;

-- Solo el servidor (service_role) puede llamarlas.
REVOKE EXECUTE ON FUNCTION public.rl_wait(TEXT, INTEGER), public.rl_fail(TEXT, INTEGER),
    public.rl_clear(TEXT), public.rl_reserve(TEXT, INTEGER, INTEGER) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.rl_wait(TEXT, INTEGER), public.rl_fail(TEXT, INTEGER),
    public.rl_clear(TEXT), public.rl_reserve(TEXT, INTEGER, INTEGER) TO service_role;
