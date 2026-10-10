'use client';

import { useEffect, useRef, useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Check, Pencil, Plus, RefreshCw } from 'lucide-react';
import type { z } from 'zod';
import { saveProduct } from '../actions/products';
import {
  ALT_MAX,
  ALT_MIN,
  H1_MAX,
  H1_MIN,
  SEO_TITLE_MAX,
  SEO_TITLE_MIN,
  imageAltSchema,
  SHORT_DESC_MAX,
  SHORT_DESC_MIN,
  TAGLINE_MAX,
  TAGLINE_MIN,
  checkSlugSeo,
  productInputSchema,
  seoSlugify,
  slugify,
} from '@/lib/admin/validation';
import { validateMediaUrl, type MediaKind } from '@/lib/media';
import { Alert, Field, btnDanger, btnGhost, btnPrimary, inputCls } from './ui';
import ConfirmDeleteButton from './ConfirmDeleteButton';
import ImageUploadButton from './ImageUploadButton';
import PdfUploadButton from './PdfUploadButton';
import ProductJsonTools, { type ImportSource } from './ProductJsonTools';
import { MIN_FEATURES, MIN_METRICS, MIN_SPECS, type FormValues, type ImportResult } from '@/lib/admin/product-json';



export const EMPTY_PRODUCT: FormValues = {
  name: '',
  slug: '',
  seo_title: '',
  h1: '',
  brand: 'Mednova',
  model: '',
  specialty: '',
  category: 'equipo',
  tagline: '',
  short_description: '',
  full_description: '',
  images: [],
  image_alts: [],
  hero_media_url: '',
  brochure_url: '',
  hero_background_url: '',
  features: Array.from({ length: MIN_FEATURES }, () => ''),
  key_metrics: Array.from({ length: MIN_METRICS }, () => ({ label: '', value: '', unit: '', helper: '' })),
  info_blocks: [],
  specifications: Array.from({ length: MIN_SPECS }, () => ({ key: '', value: '' })),
  faqs: [],
  status: 'draft',
  whatsapp_message: '',
  ai_assisted: false,
  ai_review_accepted: false,
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

// Vista previa de una imagen del bucket, con aviso si no carga y botón para recargarla
// (por ejemplo, después de subir el archivo a Cloudflare).
function ImagePreview({ url }: { url: string }) {
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState<'loading' | 'ok' | 'error'>('loading');
  // El parámetro solo evita que el navegador reutilice una respuesta de error en caché.
  const src = attempt === 0 ? url : `${url}${url.includes('?') ? '&' : '?'}recarga=${attempt}`;

  // Se comprueba la carga con una imagen auxiliar: es fiable también cuando el navegador ya la tiene en caché.
  useEffect(() => {
    let alive = true;
    const probe = new window.Image();
    probe.onload = () => alive && setState('ok');
    probe.onerror = () => alive && setState('error');
    probe.src = src;
    return () => {
      alive = false;
      probe.onload = null;
      probe.onerror = null;
    };
  }, [src]);

  const reload = () => {
    setState('loading');
    setAttempt((n) => n + 1);
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-3">
        {state === 'error' ? (
          <div className="h-20 w-20 rounded-lg border border-dashed border-rose-500/50 bg-rose-500/5 flex items-center justify-center text-[10px] text-rose-300 text-center px-1">
            Sin imagen
          </div>
        ) : (
          <div className="h-20 w-20 rounded-lg bg-white border border-slate-700 p-1 flex items-center justify-center">
            {state === 'ok' && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={src} alt="Vista previa" className="max-h-full max-w-full object-contain" />
            )}
          </div>
        )}
        <button type="button" onClick={reload} className={btnGhost} title="Volver a cargar la imagen desde Cloudflare">
          <RefreshCw className={`w-4 h-4 ${state === 'loading' ? 'animate-spin' : ''}`} />
          Recargar
        </button>
      </div>
      {state === 'error' && (
        <p className="text-xs text-rose-300">
          No se encontró la imagen en Cloudflare. Comprueba que ya la subiste y que el nombre (y la carpeta) coinciden con la dirección de abajo; luego
          pulsa Recargar.
        </p>
      )}
      {state === 'ok' && <p className="text-xs text-emerald-300">La imagen carga correctamente.</p>}
    </div>
  );
}

// Una línea de enlace con validación en vivo y vista previa.
const isImageUrl = (url: string) => {
  try {
    return /\.(jpe?g|png|webp|avif|gif)$/i.test(new URL(url).pathname);
  } catch {
    return false;
  }
};

function MediaInput({
  value,
  onChange,
  kind,
  hosts,
  placeholder,
  onRemove,
  uploadFolder,
  pdfUploadFolder,
}: {
  value: string;
  onChange: (v: string) => void;
  kind: MediaKind;
  hosts: string[];
  placeholder: string;
  onRemove?: () => void;
  /** Si se indica, muestra "Subir imagen": la sube a Cloudflare en esa carpeta y rellena el campo. */
  uploadFolder?: string;
  /** Si se indica (campo de PDF), muestra "Subir PDF": lo sube a Cloudflare en esa carpeta. */
  pdfUploadFolder?: string;
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
        {onRemove && <ConfirmDeleteButton onConfirm={onRemove} question="¿Seguro que quieres borrar esta imagen?" />}
      </div>
      {uploadFolder && (
        <ImageUploadButton folder={uploadFolder} label="Subir imagen desde mi equipo" onUploaded={(r) => onChange(r[0].path)} />
      )}
      {pdfUploadFolder && <PdfUploadButton folder={pdfUploadFolder} onUploaded={onChange} />}
      {check && !check.ok && <p className="text-xs text-rose-300">{check.error}</p>}
      {check?.ok && isImageUrl(check.url) && <ImagePreview key={check.url} url={check.url} />}
      {check?.ok && !isImageUrl(check.url) && (
        <p className="text-xs text-emerald-300">
          Enlace válido.{' '}
          {kind === 'pdf' && (
            <a href={check.url} target="_blank" rel="noopener noreferrer" className="underline">
              Abrir el PDF para comprobarlo
            </a>
          )}
        </p>
      )}
      {check?.ok && check.url !== value.trim() && <p className="text-[11px] text-slate-500 break-all">{check.url}</p>}
    </div>
  );
}

function StringList({
  items,
  onChange,
  placeholder,
  addLabel,
  max,
  min = 0,
}: {
  items: string[];
  onChange: (v: string[]) => void;
  placeholder: string;
  addLabel: string;
  max: number;
  min?: number;
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
          {items.length > min && (
            <ConfirmDeleteButton
              onConfirm={() => onChange(items.filter((_, j) => j !== i))}
              question="¿Seguro que quieres borrar este punto?"
            />
          )}
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
            <div className="flex justify-end">
              <ConfirmDeleteButton
                onConfirm={() => onChange(rows.filter((_, j) => j !== i))}
                question="¿Seguro que quieres borrar este elemento?"
                className={btnDanger}
              />
            </div>
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
  // Las imágenes subidas se guardan en una carpeta con el enlace del producto.
  const uploadFolder = values.slug || seoSlugify(values.name) || 'general';

  // Punto de partida de una importación: formulario vacío, conservando estado y (si se edita) enlace.
  const importBase = (v: FormValues): FormValues => ({ ...EMPTY_PRODUCT, status: v.status, slug: productId ? v.slug : '' });

  // Rellena el formulario con lo importado desde JSON (no guarda nada).
  const applyImport = ({ patch, hasSlug }: ImportResult, _source: ImportSource) => {
    setValues((v) => {
      // Reemplaza todo el contenido: lo que el archivo no trae queda vacío. Se conserva el estado.
      // Todo contenido importado o generado exige que la persona declare haberlo revisado.
      const next = { ...importBase(v), ...patch, ai_assisted: true, ai_review_accepted: false } as FormValues;
      if (!hasSlug && !productId && patch.name) next.slug = seoSlugify(patch.name);
      return next;
    });
    if (hasSlug) setSlugTouched(true);
  };

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
    const filledFeatures = values.features.filter((f) => f.trim()).length;
    if (filledFeatures < MIN_FEATURES) {
      setError(`Completa al menos ${MIN_FEATURES} puntos en "Sobre este producto". Tienes ${filledFeatures}.`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (values.ai_assisted && !values.ai_review_accepted) {
      setError('Marca la declaración de revisión (al final del formulario) para poder guardar contenido importado o generado con IA.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const pairs = values.images
      .map((url, i) => ({ url: url.trim(), alt: (values.image_alts[i] ?? '').trim() }))
      .filter((p) => p.url);
    const badAlt = pairs.findIndex((p) => !imageAltSchema.safeParse(p.alt).success);
    if (badAlt >= 0) {
      setError(`Imagen ${badAlt + 1}: escribe un texto alternativo de ${ALT_MIN}-${ALT_MAX} caracteres que describa lo que se ve.`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    startTransition(async () => {
      const cleaned: FormValues = {
        ...values,
        images: pairs.map((p) => p.url),
        image_alts: pairs.map((p) => p.alt),
        features: values.features.map((s) => s.trim()).filter(Boolean),
        key_metrics: values.key_metrics.filter((m) => m.label.trim() || m.value.trim()),
        info_blocks: values.info_blocks.filter((b) => b.image.trim() || b.title.trim() || b.description.trim()),
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

      <ProductJsonTools values={values} base={importBase(values)} hosts={hosts} onImport={applyImport} />

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
          label="Título para Google (SEO)"
          hint={`Es el título de la pestaña y del resultado en Google, y se muestra tal cual. Entre ${SEO_TITLE_MIN} y ${SEO_TITLE_MAX} caracteres: palabra clave + marca al final (ej.: Torre laparoscópica 4K | Mednova Perú).`}
        >
          <input
            required
            value={values.seo_title}
            onChange={(e) => set('seo_title', e.target.value)}
            className={inputCls}
            minLength={SEO_TITLE_MIN}
            maxLength={SEO_TITLE_MAX}
            placeholder="Torre laparoscópica 4K | Mednova Perú"
          />
          <CharCounter value={values.seo_title} max={SEO_TITLE_MAX} schema={productInputSchema.shape.seo_title} />
        </Field>

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
            : `Escribe solo el nombre del archivo (o carpeta/archivo) que subiste a Cloudflare; se completa con https://${hosts[0]}/. También puedes pegar el enlace completo. Dominios permitidos: ${hosts.join(', ')}.`
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
            <div key={i} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-3">
              <MediaInput
                value={url}
                kind="image"
                hosts={hosts}
                uploadFolder={uploadFolder}
                placeholder="torre-laparoscopica-4k.webp"
                onChange={(v) => set('images', values.images.map((u, j) => (j === i ? v : u)))}
                onRemove={() =>
                  setValues((s) => ({
                    ...s,
                    images: s.images.filter((_, j) => j !== i),
                    image_alts: s.images.map((_, j) => s.image_alts[j] ?? '').filter((_, j) => j !== i),
                  }))
                }
              />
              <Field label="Texto alternativo (describe lo que se ve)" hint="Lo lee Google Imágenes y los lectores de pantalla. Ej.: Torre laparoscópica 4K con monitor de 32 pulgadas y carro móvil.">
                <input
                  value={values.image_alts[i] ?? ''}
                  onChange={(e) =>
                    set('image_alts', values.images.map((_, j) => (j === i ? e.target.value : values.image_alts[j] ?? '')))
                  }
                  className={inputCls}
                  maxLength={ALT_MAX}
                  placeholder="Torre laparoscópica 4K con monitor de 32 pulgadas"
                />
                <CharCounter value={values.image_alts[i] ?? ''} max={ALT_MAX} schema={imageAltSchema} />
              </Field>
            </div>
          ))}
          {values.images.length < 12 && (
            <button
              type="button"
              onClick={() =>
                setValues((s) => ({
                  ...s,
                  images: [...s.images, ''],
                  image_alts: [...s.images.map((_, j) => s.image_alts[j] ?? ''), ''],
                }))
              }
              className={btnGhost}
            >
              <Plus className="w-4 h-4" />
              Agregar imagen
            </button>
          )}
          {values.images.length < 12 && (
            <ImageUploadButton
              folder={uploadFolder}
              multiple
              label="Subir imágenes desde mi equipo (varias a la vez)"
              onUploaded={(uploaded) =>
                setValues((s) => {
                  const room = 12 - s.images.length;
                  const take = uploaded.slice(0, Math.max(room, 0));
                  return {
                    ...s,
                    images: [...s.images, ...take.map((u) => u.path)],
                    image_alts: [...s.images.map((_, j) => s.image_alts[j] ?? ''), ...take.map(() => '')],
                  };
                })
              }
            />
          )}
        </div>

        <Field
          label="Imagen o video promocional de la portada (opcional)"
          hint="Se muestra a la derecha del título, en formato 4:3. Solo uno: imagen o video. Imagen: 1200 × 900 px, .webp o .jpg, máx. 200 KB. Video: 1200 × 900 px, .mp4 (H.264) o .webm, 10–20 s en bucle, sin audio, máx. 5 MB; también acepta enlace de YouTube, Vimeo o Cloudflare Stream. Si lo dejas vacío se usa la primera imagen de la galería."
        >
          <MediaInput value={values.hero_media_url} kind="promo" hosts={hosts} uploadFolder={uploadFolder} placeholder="promo-torre-laparoscopica.webp" onChange={(v) => set('hero_media_url', v)} />
        </Field>

        <Field
          label="Fondo de la portada (opcional)"
          hint="Si lo dejas vacío se usa el fondo de fábrica. Imagen: 1920 × 1080 px (16:9), .webp o .jpg, máx. 300 KB. Video: 1920 × 1080 px, .mp4 (H.264) o .webm, 5–15 s en bucle, sin audio, máx. 5 MB. Un velo azul oscuro se superpone para que el texto siga legible."
        >
          <MediaInput value={values.hero_background_url} kind="hero" hosts={hosts} uploadFolder={uploadFolder} placeholder="fondo-portada.webp" onChange={(v) => set('hero_background_url', v)} />
        </Field>

        <Field label="Ficha técnica PDF (opcional)">
          <MediaInput value={values.brochure_url} kind="pdf" hosts={hosts} pdfUploadFolder={uploadFolder} placeholder="ficha-torre-laparoscopica.pdf" onChange={(v) => set('brochure_url', v)} />
        </Field>
      </Section>

      <Section title="Sobre este producto" hint="Mínimo 4. Cualidades del producto en viñetas, bajo la tabla de características. Escribe frases completas (ej.: Imagen 4K UHD con reproducción fiel del color).">
        <StringList items={values.features} onChange={(v) => set('features', v)} placeholder="Ej.: Imagen 4K UHD con reproducción fiel del color" addLabel="Agregar cualidad" max={30} min={MIN_FEATURES} />
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

      <Section
        title="Más información"
        hint="Hasta 6 bloques con imagen, título, subtítulo y texto, en columnas bajo la galería. Imagen sugerida: cuadrada, 800 × 800 px, .webp o .jpg, máx. 150 KB."
      >
        <div className="space-y-3">
          {values.info_blocks.map((block, i) => {
            const update = (patch: Partial<typeof block>) =>
              set('info_blocks', values.info_blocks.map((b, j) => (j === i ? { ...b, ...patch } : b)));
            return (
              <div key={i} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-3">
                <p className="text-xs font-semibold text-slate-300">Bloque {i + 1}</p>
                <Field label="Imagen">
                  <MediaInput
                    value={block.image}
                    kind="image"
                    hosts={hosts}
                    uploadFolder={uploadFolder}
                    placeholder="bloque-1.webp"
                    onChange={(v) => update({ image: v })}
                  />
                </Field>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Field label="Título">
                    <input value={block.title} onChange={(e) => update({ title: e.target.value })} className={inputCls} maxLength={80} placeholder="Diseño de 2 ranuras" />
                  </Field>
                  <Field label="Subtítulo (opcional)">
                    <input value={block.subtitle} onChange={(e) => update({ subtitle: e.target.value })} className={inputCls} maxLength={100} placeholder="Compacto y fácil de mover" />
                  </Field>
                </div>
                <Field label="Información">
                  <textarea value={block.description} onChange={(e) => update({ description: e.target.value })} className={`${inputCls} min-h-24`} maxLength={600} />
                </Field>
                <div className="flex justify-end">
                  <ConfirmDeleteButton
                    onConfirm={() => set('info_blocks', values.info_blocks.filter((_, j) => j !== i))}
                    question="¿Seguro que quieres borrar este bloque?"
                    className={btnDanger}
                  />
                </div>
              </div>
            );
          })}
          {values.info_blocks.length < 6 && (
            <button
              type="button"
              onClick={() => set('info_blocks', [...values.info_blocks, { image: '', title: '', subtitle: '', description: '' }])}
              className={btnGhost}
            >
              <Plus className="w-4 h-4" />
              Agregar bloque
            </button>
          )}
        </div>
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

      {values.ai_assisted && (
        <section className="rounded-3xl border border-amber-500/40 bg-amber-500/5 p-6 sm:p-8 space-y-3">
          <h2 className="font-heading text-lg text-amber-200">Declaración de revisión</h2>
          <p className="text-xs text-amber-100/80 leading-relaxed">
            Esta ficha se rellenó con contenido importado o generado con inteligencia artificial, que puede contener errores u omisiones, sobre todo
            en cifras, especificaciones y datos técnicos de equipos médicos.
          </p>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={values.ai_review_accepted}
              onChange={(e) => set('ai_review_accepted', e.target.checked)}
              className="mt-1 h-4 w-4 shrink-0 accent-[#009EBC]"
            />
            <span className="text-sm text-white leading-relaxed">
              Declaro que he revisado todo el contenido de esta ficha frente al documento original del fabricante y que es correcto y completo.
              Entiendo que la responsabilidad por la información que se publique recae en quien la revisó y la publica, y que Mednova Technologies no
              se hace responsable de los errores u omisiones del contenido generado por IA que no se hayan corregido en esta revisión.
            </span>
          </label>
          <p className="text-[11px] text-slate-500">Se registrará quién aceptó esta declaración y cuándo.</p>
        </section>
      )}

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
