// Validación de enlaces de medios (imágenes, video, PDF). Código puro: se usa
// tanto en el servidor (validación definitiva) como en el navegador (vista previa).

// 'hero' = fondo de portada: imagen o archivo de video directo (sin YouTube/Vimeo).
// 'promo' = medio de la portada: imagen, o video (archivo o YouTube/Vimeo/Cloudflare Stream).
export type MediaKind = 'image' | 'video' | 'pdf' | 'hero' | 'promo';

const HERO_VIDEO_RE = /\.(mp4|webm)$/i;

export function isHeroVideo(url: string): boolean {
  try {
    return HERO_VIDEO_RE.test(new URL(url).pathname);
  } catch {
    return false;
  }
}

export type MediaCheck = { ok: true; url: string } | { ok: false; error: string };

// Plataformas de video que se aceptan siempre (no hace falta registrarlas).
const VIDEO_PLATFORM_HOSTS = [
  'youtube.com',
  'youtu.be',
  'vimeo.com',
  'player.vimeo.com',
  'cloudflarestream.com',
  'videodelivery.net',
];

const VIDEO_FILE_RE = /\.(mp4|webm|mov)$/i;
const IMAGE_FILE_RE = /\.(jpe?g|png|webp|avif|gif)$/i;

// Acepta "https://cdn.midominio.com/ruta" o "cdn.midominio.com" y devuelve el host.
export function normalizeHost(input: string): string | null {
  const value = input.trim().toLowerCase();
  if (!value) return null;
  try {
    const url = new URL(value.includes('://') ? value : `https://${value}`);
    if (url.protocol !== 'https:') return null;
    if (!/^[a-z0-9.-]+\.[a-z]{2,}$/.test(url.hostname)) return null;
    return url.hostname;
  } catch {
    return null;
  }
}

export function hostMatches(host: string, allowed: string): boolean {
  return host === allowed || host.endsWith(`.${allowed}`);
}

// Convierte "archivo.webp" o "carpeta/archivo.webp" en una URL completa usando el primer
// dominio registrado en Ajustes → Medios. Si ya es una URL (https://...) se devuelve igual.
export function resolveMediaUrl(raw: string, allowedHosts: string[]): MediaCheck {
  const value = raw.trim();
  if (!value) return { ok: false, error: 'El enlace está vacío.' };
  if (/^[a-z][a-z0-9+.-]*:/i.test(value) || value.startsWith('//')) return { ok: true, url: value };

  if (allowedHosts.length === 0) {
    return { ok: false, error: 'Primero registra tu dominio de Cloudflare en Ajustes → Medios.' };
  }
  if (/[?#\\]/.test(value)) {
    return { ok: false, error: 'Escribe solo el nombre del archivo (o carpeta/archivo), sin ? # ni \\.' };
  }
  const segments = value.replace(/^\/+/, '').split('/');
  if (segments.some((s) => !s.trim() || s === '.' || s === '..')) {
    return { ok: false, error: 'La ruta del archivo no es válida.' };
  }
  const encoded = segments
    .map((s) => {
      try {
        return encodeURIComponent(decodeURIComponent(s.trim()));
      } catch {
        return null;
      }
    })
    .filter((s): s is string => s !== null);
  if (encoded.length !== segments.length) return { ok: false, error: 'La ruta del archivo no es válida.' };
  return { ok: true, url: `https://${allowedHosts[0]}/${encoded.join('/')}` };
}

export function validateMediaUrl(raw: string, kind: MediaKind, allowedHosts: string[]): MediaCheck {
  const resolved = resolveMediaUrl(raw, allowedHosts);
  if (!resolved.ok) return resolved;
  const value = resolved.url;

  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return { ok: false, error: 'No es un enlace válido.' };
  }
  if (url.protocol !== 'https:') return { ok: false, error: 'El enlace debe empezar con https://' };
  if (url.username || url.password) {
    return { ok: false, error: 'El enlace no puede incluir usuario ni contraseña.' };
  }

  const host = url.hostname.toLowerCase();
  const isPlatformVideo = (kind === 'video' || kind === 'promo') && VIDEO_PLATFORM_HOSTS.some((h) => hostMatches(host, h));
  const inAllowlist = allowedHosts.some((h) => hostMatches(host, h));

  if (!isPlatformVideo && !inAllowlist) {
    return {
      ok: false,
      error:
        allowedHosts.length === 0
          ? 'Primero registra tu dominio de Cloudflare en Ajustes → Medios.'
          : `El dominio ${host} no está permitido. Agrégalo en Ajustes → Medios.`,
    };
  }

  const path = url.pathname;
  if (kind === 'image' && !IMAGE_FILE_RE.test(path)) {
    return { ok: false, error: 'La imagen debe terminar en .jpg, .png, .webp, .avif o .gif.' };
  }
  if (kind === 'promo' && !isPlatformVideo && !IMAGE_FILE_RE.test(path) && !VIDEO_FILE_RE.test(path)) {
    return { ok: false, error: 'Usa una imagen (.jpg, .png, .webp, .avif), un video .mp4/.webm o un enlace de YouTube, Vimeo o Cloudflare Stream.' };
  }
  if (kind === 'hero' && !IMAGE_FILE_RE.test(path) && !HERO_VIDEO_RE.test(path)) {
    return { ok: false, error: 'El fondo debe ser una imagen (.jpg, .png, .webp, .avif) o un video .mp4/.webm.' };
  }
  if (kind === 'pdf' &&!/\.pdf$/i.test(path)) {
    return { ok: false, error: 'El archivo debe terminar en .pdf.' };
  }
  if (kind === 'video' && !isPlatformVideo && !VIDEO_FILE_RE.test(path)) {
    return {
      ok: false,
      error: 'El video debe ser .mp4/.webm o un enlace de YouTube, Vimeo o Cloudflare Stream.',
    };
  }

  return { ok: true, url: url.toString() };
}

export type VideoSource = { type: 'iframe'; src: string } | { type: 'file'; src: string };

// Convierte un enlace de video ya validado en algo reproducible en la página.
export function getVideoSource(rawUrl: string): VideoSource | null {
  let url: URL;
  try {
    url = new URL(rawUrl);
  } catch {
    return null;
  }
  const host = url.hostname.toLowerCase();

  if (hostMatches(host, 'youtu.be')) {
    const id = url.pathname.slice(1);
    return id ? { type: 'iframe', src: `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}` } : null;
  }
  if (hostMatches(host, 'youtube.com')) {
    if (url.pathname.startsWith('/embed/')) {
      return { type: 'iframe', src: `https://www.youtube-nocookie.com${url.pathname}` };
    }
    const id = url.searchParams.get('v');
    return id ? { type: 'iframe', src: `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}` } : null;
  }
  if (hostMatches(host, 'vimeo.com')) {
    const id = url.pathname.split('/').filter(Boolean).pop();
    return id && /^\d+$/.test(id) ? { type: 'iframe', src: `https://player.vimeo.com/video/${id}` } : null;
  }
  if (hostMatches(host, 'cloudflarestream.com') || hostMatches(host, 'videodelivery.net')) {
    return { type: 'iframe', src: url.toString() };
  }
  if (VIDEO_FILE_RE.test(url.pathname)) return { type: 'file', src: url.toString() };
  return null;
}
