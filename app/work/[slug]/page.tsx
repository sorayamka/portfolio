import { Suspense } from "react";
import type { Metadata } from "next";
import { CaseStudyRoute } from "@/components/case-study";
import { bySlug, projects } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

type Params = { slug: string };
export const dynamicParams = false;

/**
 * Cache Components требует непустой generateStaticParams. Пока projects пуст,
 * отдаём служебный slug — он сразу уходит в notFound() и на сборку не влияет.
 * Как только появится первый проект, здесь будут его настоящие адреса.
 */
export function generateStaticParams() {
  return projects.length > 0 ? projects.map((p) => ({ slug: p.slug })) : [{ slug: "_" }];
}
async function Case({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  return <CaseStudyRoute slug={slug} />;
}

function CaseSkeleton() {
  return (
    <main className="relative z-10 px-5 pt-32 pb-24 sm:px-8 sm:pt-40 sm:pb-32">
      <span className="label">загрузка кейса…</span>
      <div className="mt-8 h-[clamp(2rem,7.5vw,6.5rem)] w-2/3 bg-bone/5" />
      <div className="mt-16 flex flex-col gap-6">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-px w-full bg-bone/8" />
        ))}
      </div>
    </main>
  );
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = bySlug(slug);
  if (!project) return { title: "Проект не найден" };

  return pageMetadata(`/work/${project.slug}`, `${project.title} — Иван Севрюков`, project.summary);
}

export default function Page({ params }: { params: Promise<Params> }) {
  return (
    <Suspense fallback={<CaseSkeleton />}>
      <Case params={params} />
    </Suspense>
  );
}
