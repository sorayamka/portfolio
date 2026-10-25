import type { Metadata } from "next";

export const origin = "https://sorayamka.github.io";
export const siteUrl = `${origin}/portfolio`;
export function pageMetadata(path: string, title: string, description: string, lang = "ru"): Metadata {
  const suffix = path === "/" ? "/" : `${path.replace(/\/$/, "")}/`;
  const ru = `${siteUrl}${suffix}`;
  const en = `${siteUrl}/en${suffix}`;
  const url = lang === "en" ? en : ru;
  return {
    title: { absolute: title }, description,
    alternates: { canonical: url, languages: { ru, en, "x-default": ru } },
    openGraph: { type: "website", title, description, url, siteName: "Ivan Sevrukov", locale: lang === "en" ? "en_US" : "ru_RU", alternateLocale: lang === "en" ? "ru_RU" : "en_US", images: [{ url: `${siteUrl}/social-preview.jpg`, width: 1200, height: 630, alt: "Ivan Sevrukov — Telegram & AI developer" }] },
    twitter: { card: "summary_large_image", title, description, images: [`${siteUrl}/social-preview.jpg`] },
  };
}
