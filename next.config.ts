import type { NextConfig } from "next";

// Cabeceras de seguridad para todo el sitio.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
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
