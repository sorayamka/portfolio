import type { MetadataRoute } from "next";
import { projects } from "@/lib/content";
import { siteUrl } from "@/lib/seo";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/work/", "/contact/", ...projects.map(project => `/work/${project.slug}/`)].flatMap(path => ["", "/en"].map(prefix => ({ url: `${siteUrl}${prefix}${path}`, alternates: { languages: { ru: `${siteUrl}${path}`, en: `${siteUrl}/en${path}` } } })));
}
