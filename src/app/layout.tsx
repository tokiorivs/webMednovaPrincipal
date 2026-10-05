import type { Metadata } from "next";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mednovatechnologies.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Mednova Technologies • Equipamiento Quirúrgico Urológico Perú",
    template: "%s • Mednova Technologies",
  },
  description: "Tecnología médica de vanguardia en urología, litotricia láser (Tulio TFL y Holmium), endourología avanzada y consumibles quirúrgicos en Perú.",
  keywords: [
    "láser urológico perú",
    "láser de tulio tfl",
    "urolase max",
    "litotricia láser lima",
    "equipos endourología",
    "enucleación prostática",
    "mednova technologies",
  ],
  authors: [{ name: "Mednova Technologies" }],
  creator: "Mednova Technologies",
  publisher: "Mednova Technologies",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Mednova Technologies • Equipamiento Quirúrgico Urológico Perú",
    description: "Tecnología médica de vanguardia en urología, litotricia láser (Tulio TFL y Holmium) y consumibles quirúrgicos.",
    url: siteUrl,
    siteName: "Mednova Technologies",
    locale: "es_PE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
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
      lang="es"
      className={`${ibmPlexMono.variable} ${spaceGrotesk.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-mono bg-[#f2f2f2] text-[#17181a]">
        {children}
      </body>
    </html>
  );
}
