import type { Metadata } from "next";
import { Inter_Tight, JetBrains_Mono } from "next/font/google";
import { Shell } from "@/components/shell";
import { site } from "@/lib/content";
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sorayamka.github.io/portfolio/"),
  title: {
    default: `${site.name} — ${site.role}, ${site.city}`,
    template: `%s · ${site.short} ${site.name.split(" ")[1]}`,
  },
  description:
    "Иван Севрюков — Python-разработчик. Telegram-боты, интеграции с AI API и Supabase, AI-контент и UGC.",
  keywords: [
    "Иван Севрюков",
    "разработчик Москва",
    "frontend developer",
    "React Next.js",
    "Three.js",
    "портфолио разработчика",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: site.name,
    title: `${site.name} — ${site.role}, ${site.city}`,
    description: "Портфолио разработчика из Москвы. Интерфейсы, 3D, эксперименты.",
    url: "https://sorayamka.github.io/portfolio/",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
} satisfies import("next").Viewport;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className={`${interTight.variable} ${jetbrains.variable} antialiased`}>
      <body className="grain">
        <Shell>{children}</Shell>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": [{ "@type": "Person", "@id": "https://sorayamka.github.io/portfolio/#person", name: "Ivan Sevrukov", alternateName: site.name, url: "https://sorayamka.github.io/portfolio/", jobTitle: "Python, Telegram & AI developer", sameAs: [site.github, site.telegram] }, { "@type": "WebSite", "@id": "https://sorayamka.github.io/portfolio/#website", url: "https://sorayamka.github.io/portfolio/", name: "Ivan Sevrukov — Portfolio", inLanguage: ["ru", "en"], author: { "@id": "https://sorayamka.github.io/portfolio/#person" } }] }) }} />
      </body>
    </html>
  );
}
