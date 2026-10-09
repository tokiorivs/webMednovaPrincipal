'use client';

import { useRef, useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Check, Pencil, Plus, Trash2 } from 'lucide-react';
import type { z } from 'zod';
import { saveProduct } from '../actions/products';
import {
  H1_MAX,
  H1_MIN,
  SHORT_DESC_MAX,
  SHORT_DESC_MIN,
  TAGLINE_MAX,
  TAGLINE_MIN,
  checkSlugSeo,
  productInputSchema,
  seoSlugify,
  slugify,
  type ProductInput,
} from '@/lib/admin/validation';
import { validateMediaUrl, type MediaKind } from '@/lib/media';
import { Alert, Field, btnGhost, btnPrimary, inputCls } from './ui';

type FormValues = Required<ProductInput>;

const MIN_METRICS = 4;
const MIN_SPECS = 4;

export const EMPTY_PRODUCT: FormValues = {
  name: '',
  slug: '',
  h1: '',
  brand: 'Mednova',
  model: '',
  specialty: '',
  category: 'equipo',
  tagline: '',
  short_description: '',
  full_description: '',
  images: [],
  video_url: '',
  brochure_url: '',
  hero_background_url: '',
  features: [],
  key_metrics: Array.from({ length: MIN_METRICS }, () => ({ label: '', value: '', unit: '', helper: '' })),
  system_advantages: [],
  specifications: Array.from({ length: MIN_SPECS }, () => ({ key: '', value: '' })),
  faqs: [],
  status: 'draft',
  whatsapp_message: '',
};

const SPECIALTY_SUGGESTIONS = [
  'Litotricia Láser',
  'Cirugía de tejidos blandos',
  'Endourología',
  'Laparoscopía',
  'Diagnóstico',
  'Fibras láser',
  'Consumibles',
];

const sectionCls = 'bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5';

function Section({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <section className={sectionCls}>
      <div>
        <h2 className="font-heading text-lg text-white">{title}</h2>
        {hint && <p className="text-xs text-slate-400 mt-1">{hint}</p>}
      </div>
      {children}
    </section>
  );
}

// Contador de caracteres: verde cuando el texto cumple todas las reglas del esquema.
function CharCounter({ value, max, schema }: { value: string; max: number; schema: z.ZodType<string> }) {
  const length = value.trim().length;
  const check = schema.safeParse(value);
  return (
    <p className={`mt-1.5 text-xs font-semibold tabular-nums ${check.success ? 'text-emerald-400' : 'text-slate-400'}`} aria-live="polite">
      {length}/{max} caracteres
      {check.success ? ' · Cumple las reglas' : length === 0 ? '' : ` · ${check.error.issues[0].message}`}
    </p>
  );
}

// Una línea de enlace con validación en vivo y vista previa.
function MediaInput({
  value,
  onChange,
  kind,
  hosts,
  placeholder,
  onRemove,
}: {
  value: string;
  onChange: (v: string) => void;
  kind: MediaKind;
  hosts: string[];
  placeholder: string;
  onRemove?: () => void;
}) {
  const check = value.trim() ? validateMediaUrl(value, kind, hosts) : null;
  return (
    <div className="space-y-1.5">
      <div className="flex gap-2">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={inputCls}
          placeholder={placeholder}
          inputMode="url"
          spellCheck={false}
        />
        {onRemove && (
          <button type="button" onClick={onRemove} className={btnGhost} aria-label="Quitar">
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
      {check && !check.ok && <p className="text-xs text-rose-300">{check.error}</p>}
      {check?.ok && kind === 'image' && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={check.url} alt="Vista previa" className="h-20 w-20 object-contain rounded-lg bg-white border border-slate-700 p-1" />
      )}
      {check?.ok && kind !== 'image' && <p className="text-xs text-emerald-300">Enlace válido.</p>}
    </div>
  );
}

function StringList({
  items,
  onChange,
  placeholder,
  addLabel,
  max,
}: {
  items: string[];
  onChange: (v: string[]) => void;
  placeholder: string;
  addLabel: string;
  max: number;
}) {
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex gap-2">
          <input
            value={item}
            onChange={(e) => onChange(items.map((v, j) => (j === i ? e.target.value : v)))}
            className={inputCls}
            placeholder={placeholder}
          />
          <button type="button" onClick={() => onChange(items.filter((_, j) => j !== i))} className={btnGhost} aria-label="Quitar">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
      {items.length < max && (
        <button type="button" onClick={() => onChange([...items, ''])} className={btnGhost}>
          <Plus className="w-4 h-4" />
          {addLabel}
        </button>
      )}
    </div>
  );
}

interface RowField<T> {
  key: keyof T & string;
  label: string;
  placeholder?: string;
  textarea?: boolean;
  span?: 2;
}

function RowsEditor<T extends Record<string, string>>({
  rows,
  onChange,
  fields,
  empty,
  addLabel,
  max,
  min = 0,
}: {
  rows: T[];
  onChange: (rows: T[]) => void;
  fields: RowField<T>[];
  empty: T;
  addLabel: string;
  max: number;
  min?: number;
}) {
  return (
    <div className="space-y-3">
      {rows.map((row, i) => (
        <div key={i} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {fields.map((f) => (
              <div key={f.key} className={f.span === 2 ? 'sm:col-span-2' : ''}>
                <Field label={f.label}>
                  {f.textarea ? (
                    <textarea
                      value={row[f.key]}
                      onChange={(e) => onChange(rows.map((r, j) => (j === i ? { ...r, [f.key]: e.target.value } : r)))}
                      className={`${inputCls} min-h-24`}
                      placeholder={f.placeholder}
                    />
                  ) : (
                    <input
                      value={row[f.key]}
                      onChange={(e) => onChange(rows.map((r, j) => (j === i ? { ...r, [f.key]: e.target.value } : r)))}
                      className={inputCls}
                      placeholder={f.placeholder}
                    />
                  )}
                </Field>
              </div>
            ))}
          </div>
          {rows.length > min && (
            <button type="button" onClick={() => onChange(rows.filter((_, j) => j !== i))} className="text-xs text-rose-300 hover:text-rose-200 cursor-pointer">
              Quitar este elemento
            </button>
          )}
        </div>
      ))}
      {rows.length < max && (
        <button type="button" onClick={() => onChange([...rows, { ...empty }])} className={btnGhost}>
          <Plus className="w-4 h-4" />
          {addLabel}
        </button>
      )}
    </div>
  );
}

export default function ProductForm({
  productId,
  initial,
  hosts,
}: {
  productId: string | null;
  initial: FormValues;
  hosts: string[];
}) {
  const router = useRouter();
  const [values, setValues] = useState<FormValues>(initial);
  const [slugTouched, setSlugTouched] = useState(Boolean(productId));
  const [slugLocked, setSlugLocked] = useState(true);
  const slugRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [savedSlug, setSavedSlug] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const set = <K extends keyof FormValues>(key: K, value: FormValues[K]) =>
    setValues((v) => ({ ...v, [key]: value }));

  const onNameChange = (name: string) =>
    setValues((v) => ({ ...v, name, slug: slugTouched ? v.slug : seoSlugify(name) }));


  const slugRules = checkSlugSeo(values.slug);

  const publicBase = values.category === 'equipo' ? 'equipos' : 'consumibles';

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSavedSlug(null);
    const filledMetrics = values.key_metrics.filter((m) => m.label.trim() && m.value.trim()).length;
    if (filledMetrics < MIN_METRICS) {
      setError(`Completa al menos ${MIN_METRICS} cifras destacadas (valor y nombre). Tienes ${filledMetrics}.`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const filledSpecs = values.specifications.filter((s) => s.key.trim() && s.value.trim()).length;
    if (filledSpecs < MIN_SPECS) {
      setError(`Completa al menos ${MIN_SPECS} características en la tabla (nombre y valor). Tienes ${filledSpecs}.`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    startTransition(async () => {
      const cleaned: FormValues = {
        ...values,
        images: values.images.map((s) => s.trim()).filter(Boolean),
        features: values.features.map((s) => s.trim()).filter(Boolean),
        key_metrics: values.key_metrics.filter((m) => m.label.trim() || m.value.trim()),
        system_advantages: values.system_advantages.filter((a) => a.title.trim() || a.description.trim()),
        specifications: values.specifications.filter((s) => s.key.trim() || s.value.trim()),
        faqs: values.faqs.filter((f) => f.question.trim() || f.answer.trim()),
      };
      const res = await saveProduct(productId, cleaned);
      if (!res.ok) {
        setError(res.error);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      setSavedSlug(res.slug);
      if (!productId) {
        router.replace(`/admin/productos/${res.id}`);
      } else {
        router.refresh();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  };

  return (
    <form onSubmit={submit} className="space-y-6 max-w-4xl">
      {error && <Alert>{error}</Alert>}
      {savedSlug && (
        <Alert kind="ok">
          Guardado.{' '}
          {values.status !== 'draft' && (
            <Link href={`/${publicBase}/${savedSlug}`} target="_blank" className="underline">
              Ver ficha en la web
            </Link>
          )}
        </Alert>
      )}

      <Section title="Datos básicos">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Tipo de producto">
            <select value={values.category} onChange={(e) => set('category', e.target.value as FormValues['category'])} className={inputCls}>
              <option value="equipo">Equipo</option>
              <option value="consumible">Consumible</option>
            </select>
          </Field>
          <Field label="Estado" hint="Los borradores no se ven en la web.">
            <select value={values.status} onChange={(e) => set('status', e.target.value as FormValues['status'])} className={inputCls}>
              <option value="draft">Borrador (oculto)</option>
              <option value="active">Publicado</option>
              <option value="featured">Publicado y destacado</option>
            </select>
          </Field>
          <Field label="Nombre">
            <input required value={values.name} onChange={(e) => onNameChange(e.target.value)} className={inputCls} placeholder="Ej.: Torre laparoscópica 4K" />
          </Field>
          <Field label="Modelo">
            <input required value={values.model} onChange={(e) => set('model', e.target.value)} className={inputCls} placeholder="Ej.: MN-4K" />
          </Field>
          <Field label="Marca">
            <input required value={values.brand} onChange={(e) => set('brand', e.target.value)} className={inputCls} />
          </Field>
          <Field label="Especialidad">
            <input required list="specialties" value={values.specialty} onChange={(e) => set('specialty', e.target.value)} className={inputCls} />
            <datalist id="specialties">
              {SPECIALTY_SUGGESTIONS.map((s) => (
                <option key={s} value={s} />
              ))}
            </datalist>
          </Field>
        </div>

        <Field
          label="Título principal de la página (H1)"
          hint={`SEO: entre ${H1_MIN} y ${H1_MAX} caracteres, con la palabra clave principal al inicio (ej.: Torre laparoscópica 4K para cirugía mínimamente invasiva). Debe ser único, sin todo en mayúsculas ni punto final.`}
        >
          <input
            required
            value={values.h1}
            onChange={(e) => set('h1', e.target.value)}
            className={inputCls}
            minLength={H1_MIN}
            maxLength={H1_MAX}
            placeholder="Torre laparoscópica 4K para cirugía mínimamente invasiva"
          />
          <CharCounter value={values.h1} max={H1_MAX} schema={productInputSchema.shape.h1} />
        </Field>

        <Field label="Enlace de la página" hint={`Dirección: /${publicBase}/${values.slug || 'enlace-del-producto'}`}>
          <div className="flex gap-2">
            <input
              ref={slugRef}
              required
              readOnly={slugLocked}
              value={values.slug}
              onChange={(e) => {
                setSlugTouched(true);
                set('slug', slugify(e.target.value));
              }}
              className={`${inputCls} ${slugLocked ? 'opacity-70 cursor-not-allowed' : ''}`}
              placeholder="torre-laparoscopica-4k"
            />
            <button
              type="button"
              onClick={() => {
                if (slugLocked) {
                  setSlugLocked(false);
                  requestAnimationFrame(() => slugRef.current?.focus());
                } else {
                  setSlugLocked(true);
                }
              }}
              className={btnGhost}
              aria-label={slugLocked ? 'Editar enlace' : 'Bloquear enlace'}
              title={slugLocked ? 'Editar enlace' : 'Bloquear enlace'}
            >
              {slugLocked ? <Pencil className="w-4 h-4" /> : <Check className="w-4 h-4" />}
            </button>
          </div>
          <ul className="mt-2 space-y-0.5" aria-live="polite">
            {slugRules.map((r) => (
              <li key={r.label} className={`text-xs flex gap-1.5 ${r.ok ? 'text-emerald-400' : 'text-amber-300'}`}>
                <span aria-hidden="true">{r.ok ? '✓' : '✗'}</span>
                {r.label}
              </li>
            ))}
          </ul>
        </Field>
        {productId && !slugLocked && (
          <p className="text-xs text-amber-300">Si cambias el enlace, la dirección anterior dejará de funcionar.</p>
        )}

        <Field
          label="Frase destacada"
          hint={`Subtítulo bajo el H1: entre ${TAGLINE_MIN} y ${TAGLINE_MAX} caracteres. Resume el beneficio principal (ej.: Imagen 4K y control total en cada cirugía).`}
        >
          <input
            required
            value={values.tagline}
            onChange={(e) => set('tagline', e.target.value)}
            className={inputCls}
            maxLength={TAGLINE_MAX}
          />
          <CharCounter value={values.tagline} max={TAGLINE_MAX} schema={productInputSchema.shape.tagline} />
        </Field>
        <Field
          label="Descripción corta"
          hint={`SEO: es la descripción que Google muestra en los resultados y la de las tarjetas. Entre ${SHORT_DESC_MIN} y ${SHORT_DESC_MAX} caracteres, con la palabra clave y una invitación a actuar.`}
        >
          <textarea
            required
            value={values.short_description}
            onChange={(e) => set('short_description', e.target.value)}
            className={`${inputCls} min-h-20`}
            maxLength={SHORT_DESC_MAX}
          />
          <CharCounter value={values.short_description} max={SHORT_DESC_MAX} schema={productInputSchema.shape.short_description} />
        </Field>
        <Field label="Descripción completa" hint="Deja una línea en blanco para separar párrafos.">
          <textarea value={values.full_description} onChange={(e) => set('full_description', e.target.value)} className={`${inputCls} min-h-40`} maxLength={8000} />
        </Field>
        <Field label="Mensaje de WhatsApp para cotizar (opcional)">
          <input value={values.whatsapp_message} onChange={(e) => set('whatsapp_message', e.target.value)} className={inputCls} maxLength={300} placeholder={`Hola Mednova, deseo cotizar ${values.name || 'este producto'}.`} />
        </Field>
      </Section>

      <Section
        title="Imágenes, video y ficha PDF"
        hint={
          hosts.length === 0
            ? undefined
            : `Pega los enlaces de Cloudflare. Dominios permitidos: ${hosts.join(', ')}.`
        }
      >
        {hosts.length === 0 && (
          <Alert kind="info">
            Aún no registraste tu dominio de Cloudflare.{' '}
            <Link href="/admin/ajustes" className="underline">
              Configúralo en Ajustes → Medios
            </Link>{' '}
            para poder guardar imágenes y PDF (el propietario puede hacerlo).
          </Alert>
        )}

        <div className="space-y-3">
          <p className="text-xs font-semibold text-slate-300">Imágenes (la primera es la principal)</p>
          {values.images.map((url, i) => (
            <MediaInput
              key={i}
              value={url}
              kind="image"
              hosts={hosts}
              placeholder="https://cdn.tudominio.com/producto/foto-1.webp"
              onChange={(v) => set('images', values.images.map((u, j) => (j === i ? v : u)))}
              onRemove={() => set('images', values.images.filter((_, j) => j !== i))}
            />
          ))}
          {values.images.length < 12 && (
            <button type="button" onClick={() => set('images', [...values.images, ''])} className={btnGhost}>
              <Plus className="w-4 h-4" />
              Agregar imagen
            </button>
          )}
        </div>

        <Field label="Video (opcional)" hint="Archivo .mp4/.webm de tu Cloudflare, o enlace de YouTube, Vimeo o Cloudflare Stream.">
          <MediaInput value={values.video_url} kind="video" hosts={hosts} placeholder="https://www.youtube.com/watch?v=..." onChange={(v) => set('video_url', v)} />
        </Field>

        <Field
          label="Fondo de la portada (opcional)"
          hint="Si lo dejas vacío se usa el fondo de fábrica. Imagen: 1920 × 1080 px (16:9), .webp o .jpg, máx. 300 KB. Video: 1920 × 1080 px, .mp4 (H.264) o .webm, 5–15 s en bucle, sin audio, máx. 5 MB. Un velo azul oscuro se superpone para que el texto siga legible."
        >
          <MediaInput value={values.hero_background_url} kind="hero" hosts={hosts} placeholder="https://cdn.tudominio.com/portadas/fondo.webp" onChange={(v) => set('hero_background_url', v)} />
        </Field>

        <Field label="Ficha técnica PDF (opcional)">
          <MediaInput value={values.brochure_url} kind="pdf" hosts={hosts} placeholder="https://cdn.tudominio.com/fichas/producto.pdf" onChange={(v) => set('brochure_url', v)} />
        </Field>
      </Section>

      <Section title="Sobre este producto" hint="Puntos clave en viñetas, bajo la tabla de características. Escribe frases completas.">
        <StringList items={values.features} onChange={(v) => set('features', v)} placeholder="Ej.: Imagen 4K UHD" addLabel="Agregar característica" max={30} />
      </Section>

      <Section title="Cifras destacadas" hint="Mínimo 4 y hasta 8 datos grandes bajo la portada (ej.: 120 W · Potencia).">
        <RowsEditor
          min={MIN_METRICS}
          rows={values.key_metrics.map((m) => ({ label: m.label, value: m.value, unit: m.unit ?? '', helper: m.helper ?? '' }))}
          onChange={(rows) => set('key_metrics', rows)}
          fields={[
            { key: 'value', label: 'Valor', placeholder: '120' },
            { key: 'unit', label: 'Unidad (opcional)', placeholder: 'W' },
            { key: 'label', label: 'Nombre', placeholder: 'Potencia' },
            { key: 'helper', label: 'Texto de apoyo (opcional)', placeholder: 'Potencia láser máxima' },
          ]}
          empty={{ label: '', value: '', unit: '', helper: '' }}
          addLabel="Agregar cifra"
          max={8}
        />
      </Section>

      <Section title="Ventajas">
        <RowsEditor
          rows={values.system_advantages}
          onChange={(rows) => set('system_advantages', rows)}
          fields={[
            { key: 'title', label: 'Título', placeholder: 'Compacto y portátil', span: 2 },
            { key: 'description', label: 'Descripción', textarea: true, span: 2 },
          ]}
          empty={{ title: '', description: '' }}
          addLabel="Agregar ventaja"
          max={12}
        />
      </Section>

      <Section
        title="Características (tabla)"
        hint="Mínimo 4. Se muestran junto a la galería, bajo el nombre del producto: nombre en negrita y valor al lado (ej.: Marca · Asus)."
      >
        <RowsEditor
          min={MIN_SPECS}
          rows={values.specifications}
          onChange={(rows) => set('specifications', rows)}
          fields={[
            { key: 'key', label: 'Parámetro', placeholder: 'Longitud de onda' },
            { key: 'value', label: 'Valor', placeholder: '1940 nm' },
          ]}
          empty={{ key: '', value: '' }}
          addLabel="Agregar especificación"
          max={40}
        />
      </Section>

      <Section title="Preguntas frecuentes">
        <RowsEditor
          rows={values.faqs}
          onChange={(rows) => set('faqs', rows)}
          fields={[
            { key: 'question', label: 'Pregunta', span: 2 },
            { key: 'answer', label: 'Respuesta', textarea: true, span: 2 },
          ]}
          empty={{ question: '', answer: '' }}
          addLabel="Agregar pregunta"
          max={20}
        />
      </Section>

      <div className="flex items-center gap-3 sticky bottom-0 bg-slate-900/95 backdrop-blur py-4 border-t border-slate-800">
        <button type="submit" disabled={pending} className={btnPrimary}>
          {pending ? 'Guardando…' : productId ? 'Guardar cambios' : 'Crear producto'}
        </button>
        <Link href="/admin" className={btnGhost}>
          Volver al catálogo
        </Link>
      </div>
    </form>
  );
}
