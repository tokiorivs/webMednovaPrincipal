import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { SITE_URL } from '@/lib/site';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const siteUrl = SITE_URL;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Láser de Tulio Urolase MAX en Perú • Mednova Technologies",
    template: "%s • Mednova Technologies",
  },
  description: "Distribuidor exclusivo de VPG LaserOne en Perú. Láser de fibra de tulio Urolase MAX para litotricia y enucleación prostática, con fibras OnePush. Solicite su cotización.",
  keywords: [
    "láser urológico perú",
    "láser de fibra de tulio",
    "urolase max",
    "litotricia láser lima",
    "equipos endourología",
    "enucleación prostática",
    "mednova technologies",
  ],
  // Verificación de Google Search Console (se define en .env: NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION).
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
    : {}),
  authors: [{ name: "Mednova Technologies" }],
  creator: "Mednova Technologies",
  publisher: "Mednova Technologies",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Mednova Technologies • Equipamiento Quirúrgico Urológico Perú",
    description: "Distribuidor exclusivo de VPG LaserOne en Perú: láser de fibra de tulio Urolase MAX y fibras quirúrgicas para urología.",
    url: siteUrl,
    siteName: "Mednova Technologies",
    locale: "es_PE",
    type: "website",
    images: [{ url: "/images/og-mednova.png", width: 1200, height: 630, alt: "Mednova Technologies: distribuidor exclusivo de VPG LaserOne en Perú" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/og-mednova.png"],
    title: "Mednova Technologies • Equipamiento Quirúrgico Urológico Perú",
    description: "Tecnología médica de vanguardia en urología, litotricia láser y consumibles quirúrgicos en Perú.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es-PE"
      className={`${inter.variable} ${montserrat.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#f2f2f2] text-[#17181a]">
        {children}
      </body>
    </html>
  );
}
