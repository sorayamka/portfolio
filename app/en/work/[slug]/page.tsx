import { notFound } from "next/navigation";
import { CaseStudyRoute } from "@/components/case-study";
import { bySlug, projects } from "@/lib/content";
import { localizeProject } from "@/lib/translations";
import { pageMetadata } from "@/lib/seo";
export const dynamicParams = false;
export function generateStaticParams() { return projects.map(project => ({ slug: project.slug })); }
export async function generateMetadata({ params }: { params: Promise<{slug: string}> }) {
  const { slug } = await params;
  const original = bySlug(slug);
  if (!original) notFound();
  const project = localizeProject(original, "en");
  return pageMetadata(`/work/${slug}`, `${project.title} — Ivan Sevrukov`, project.summary, "en");
}
export default async function Page({ params }: { params: Promise<{slug: string}> }) {
  const { slug } = await params;
  return <CaseStudyRoute slug={slug} />;
}
