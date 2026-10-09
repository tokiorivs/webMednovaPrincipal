import { z } from 'zod';

export const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;

export function slugify(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

// Contraseñas de administradores: mínimo 12 caracteres con mayúscula, minúscula y número.
export const passwordSchema = z
  .string()
  .min(12, 'La contraseña debe tener al menos 12 caracteres.')
  .max(128, 'La contraseña es demasiado larga.')
  .regex(/[a-z]/, 'Incluye al menos una minúscula.')
  .regex(/[A-Z]/, 'Incluye al menos una mayúscula.')
  .regex(/[0-9]/, 'Incluye al menos un número.');

export const emailSchema = z.string().trim().toLowerCase().email('Correo no válido.').max(254);

const optionalText = (max: number) => z.string().trim().max(max).default('');

// Reglas SEO del enlace (slug): corto, con palabras clave y sin relleno.
export const SLUG_MIN_WORDS = 2;
export const SLUG_MAX_WORDS = 6;
export const SLUG_MAX_LENGTH = 60;

const SLUG_STOPWORDS = new Set([
  'a', 'al', 'con', 'de', 'del', 'el', 'en', 'la', 'las', 'lo', 'los', 'para', 'por', 'un', 'una', 'y', 'o', 'e', 'u',
]);

export interface SlugRule {
  label: string;
  ok: boolean;
}

export function checkSlugSeo(slug: string): SlugRule[] {
  const words = slug.split('-').filter(Boolean);
  const fillers = words.filter((w) => SLUG_STOPWORDS.has(w));
  const singles = words.filter((w) => w.length === 1);
  return [
    { label: `Máximo ${SLUG_MAX_LENGTH} caracteres.`, ok: slug.length <= SLUG_MAX_LENGTH },
    {
      label: `Entre ${SLUG_MIN_WORDS} y ${SLUG_MAX_WORDS} palabras.`,
      ok: words.length >= SLUG_MIN_WORDS && words.length <= SLUG_MAX_WORDS,
    },
    {
      label: `Sin palabras de relleno${fillers.length ? ` (quita: ${[...new Set(fillers)].join(', ')})` : ' (de, para, el, la…)'}.`,
      ok: fillers.length === 0,
    },
    {
      label: `Sin letras o números sueltos${singles.length ? ` (quita: ${[...new Set(singles)].join(', ')})` : ''}.`,
      ok: singles.length === 0,
    },
    { label: 'Sin palabras repetidas.', ok: new Set(words).size === words.length },
    { label: 'Debe incluir al menos una palabra con letras.', ok: words.some((w) => /[a-z]/.test(w)) },
  ];
}

// Como slugify, pero omite palabras de relleno y corta en límite de palabra (para generar el enlace desde el nombre).
export function seoSlugify(input: string): string {
  const words = slugify(input)
    .split('-')
    .filter((w) => w && !SLUG_STOPWORDS.has(w));
  let out = '';
  for (const w of words.slice(0, SLUG_MAX_WORDS)) {
    const next = out ? `${out}-${w}` : w;
    if (next.length > SLUG_MAX_LENGTH) break;
    out = next;
  }
  return out;
}

// Reglas SEO del H1: único por página, descriptivo, con la palabra clave principal.
export const H1_MIN = 20;
export const H1_MAX = 70;

// La descripción corta es la meta description (Google muestra ~155-160 caracteres).
export const SHORT_DESC_MIN = 120;
export const SHORT_DESC_MAX = 155;
// La frase destacada es el subtítulo bajo el H1.
export const TAGLINE_MIN = 30;
export const TAGLINE_MAX = 100;

export const productInputSchema = z.object({
  name: z.string().trim().min(2, 'El nombre es obligatorio.').max(120),
  h1: z
    .string()
    .trim()
    .min(H1_MIN, `El título H1 debe tener al menos ${H1_MIN} caracteres.`)
    .max(H1_MAX, `El título H1 admite como máximo ${H1_MAX} caracteres.`)
    .refine((v) => !/[<>]/.test(v), 'El título H1 no puede contener etiquetas HTML.')
    .refine((v) => v !== v.toUpperCase() || v === v.toLowerCase(), 'El título H1 no puede estar todo en mayúsculas.')
    .refine((v) => !/[.]$/.test(v), 'El título H1 no debe terminar en punto.'),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .min(2, 'El enlace es obligatorio.')
    .max(80)
    .regex(SLUG_RE, 'El enlace solo admite letras minúsculas, números y guiones.')
    .superRefine((v, ctx) => {
      const failed = checkSlugSeo(v).find((r) => !r.ok);
      if (failed) ctx.addIssue({ code: 'custom', message: `Enlace no apto para SEO: ${failed.label}` });
    }),
  brand: z.string().trim().min(1, 'La marca es obligatoria.').max(80),
  model: z.string().trim().min(1, 'El modelo es obligatorio.').max(80),
  specialty: z.string().trim().min(2, 'La especialidad es obligatoria.').max(80),
  category: z.enum(['equipo', 'consumible']),
  tagline: z
    .string()
    .trim()
    .min(TAGLINE_MIN, `La frase destacada debe tener al menos ${TAGLINE_MIN} caracteres.`)
    .max(TAGLINE_MAX, `La frase destacada admite como máximo ${TAGLINE_MAX} caracteres.`),
  short_description: z
    .string()
    .trim()
    .min(SHORT_DESC_MIN, `La descripción corta debe tener al menos ${SHORT_DESC_MIN} caracteres.`)
    .max(SHORT_DESC_MAX, `La descripción corta admite como máximo ${SHORT_DESC_MAX} caracteres.`),
  full_description: optionalText(8000),
  images: z.array(z.string().trim().min(1)).max(12, 'Máximo 12 imágenes.'),
  video_url: optionalText(500),
  brochure_url: optionalText(500),
  hero_background_url: optionalText(500),
  features: z.array(z.string().trim().min(1).max(200)).max(30),
  key_metrics: z
    .array(
      z.object({
        label: z.string().trim().min(1).max(60),
        value: z.string().trim().min(1).max(40),
        unit: optionalText(20),
        helper: optionalText(120),
      })
    )
    .min(4, 'Agrega al menos 4 cifras destacadas.')
    .max(8, 'Máximo 8 métricas.'),
  system_advantages: z
    .array(z.object({ title: z.string().trim().min(1).max(100), description: z.string().trim().min(1).max(400) }))
    .max(12),
  specifications: z
    .array(z.object({ key: z.string().trim().min(1).max(80), value: z.string().trim().min(1).max(300) }))
    .min(4, 'Agrega al menos 4 características en la tabla (ej.: Marca · Asus).')
    .max(40),
  faqs: z
    .array(z.object({ question: z.string().trim().min(1).max(200), answer: z.string().trim().min(1).max(2000) }))
    .max(20),
  status: z.enum(['draft', 'active', 'featured']),
  whatsapp_message: optionalText(300),
});

export type ProductInput = z.input<typeof productInputSchema>;
export type ProductParsed = z.output<typeof productInputSchema>;
