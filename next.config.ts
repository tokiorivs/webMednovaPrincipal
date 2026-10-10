import type { NextConfig } from "next";

// Content-Security-Policy. Las imágenes y videos vienen de dominios de Cloudflare registrados en el
// panel (dinámicos), por eso img-src/media-src admiten cualquier https. 'unsafe-inline' en script-src
// lo exige Next sin nonces (scripts de arranque y JSON-LD); 'unsafe-eval' solo en desarrollo.
// Fase de pruebas: ver ALLOW_INDEXING en src/lib/site.ts.
const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";
const isDev = process.env.NODE_ENV !== "production";
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "media-src 'self' blob: https:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "frame-src https://www.youtube-nocookie.com https://player.vimeo.com https://*.cloudflarestream.com https://iframe.videodelivery.net https://*.videodelivery.net",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
].join("; ");

// Cabeceras de seguridad para todo el sitio.
const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
  ...(allowIndexing ? [] : [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive, nosnippet" }]),
];

const nextConfig: NextConfig = {
  // El panel administrativo necesita servidor (sesiones, 2FA, Server Actions),
  // por eso ya no se exporta como sitio estático. `standalone` genera una
  // carpeta autosuficiente para subir al hosting con Node.js.
  output: "standalone",
  images: {
    unoptimized: true,
  },
  devIndicators: false,
  // pdf.js se ejecuta en el servidor para inspeccionar PDF: Node debe cargarlo desde node_modules (si se empaqueta, no encuentra su worker).
  serverExternalPackages: ["pdfjs-dist"],
  experimental: {
    // El panel acepta PDF de hasta 20 MB para generar fichas con IA (por defecto el límite es 1 MB).
    // allowedOrigins: orígenes extra aceptados por la comprobación Origin/Host (CSRF) de las acciones.
    serverActions: { bodySizeLimit: "22mb", allowedOrigins: ["www.mednovaperu.com", "mednovaperu.com"] },
    // El proxy (src/proxy.ts) también lee el cuerpo de la petición: su límite por defecto (10 MB) cortaba los PDF grandes.
    proxyClientMaxBodySize: "22mb",
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        // El panel nunca debe guardarse en cachés ni indexarse.
        source: "/admin/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store" },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
    ];
  },
};

export default nextConfig;
