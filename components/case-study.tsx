"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { Empty } from "./ui";
import { Magnetic } from "./magnetic";
import { Reveal } from "./reveal";
import { bySlug, type Project } from "@/lib/content";
import { useState } from "react";
import { MediaSliders } from "./media-slider";
import { SoraChat } from "./sora-chat";

/** Порядок секций кейса: каждая отвечает на следующий вопрос читателя. */
const SECTIONS = [
  { key: "problem", title: "Идея", q: "контекст проекта" },
  { key: "role", title: "Моя роль", q: "что было моё" },
  { key: "stack", title: "Стек", q: "чем собрано" },
  { key: "decision", title: "Решение", q: "почему так, а не иначе" },
  { key: "outcome", title: "Итог", q: "что изменилось" },
] as const;

function CaseStudy({ project }: { project: Project }) {
  const [selectedFeature, setSelectedFeature] = useState(0);
  return (
    <main className="case-page relative z-10 px-5 pt-32 pb-24 sm:px-8 sm:pt-40 sm:pb-32">
      <Reveal className="mb-10 flex items-center gap-3">
        <Link href="/work" className="label text-smoke transition-colors duration-300 hover:text-amber">
          ← портфолио
        </Link>
        <span className="label text-bone/25">/</span>
        <span className="label">{project.slug}</span>
      </Reveal>

      <div className="case-intro-grid">
      <Reveal className="case-intro-copy">
        <p className="label text-amber mb-6">PROJECT FILE / {project.category}</p>
        <h1 className="display-lg">{project.title}</h1>
        <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3">
          <span className="label">{project.year}</span>
          <span className="label">{project.role}</span>
          <span className="label text-amber">{project.category}</span>
        </div>
        <p className="mt-6 max-w-[44rem] text-pretty text-[1.05rem] leading-[1.6] text-fog">
          {project.summary}
        </p>
      </Reveal>

      {project.slug === "sora" ? <SoraChat /> : <div className={`case-art case-art--${project.slug}`}>
        <span className="case-art-coordinate">OBJECT / {project.slug.toUpperCase()}</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={project.image} alt={project.title} />
        <span className="case-art-coordinate case-art-coordinate--bottom">DESIGN × ENGINEERING</span>
      </div>}
      </div>

      {project.slug === "generative-media" && <MediaSliders />}

      <section className="case-modules" aria-label="Возможности проекта">
        <div className="case-module-nav">
          {project.features.map((feature, index) => <button key={feature.title} onClick={() => setSelectedFeature(index)} aria-pressed={index === selectedFeature}><span>0{index + 1}</span>{feature.title}<span>↗</span></button>)}
        </div>
        <div className="case-module-detail" key={selectedFeature}>
          <span className="label text-amber">ВНУТРИ ПРОЕКТА / {String(selectedFeature + 1).padStart(2, "0")}</span>
          <h2>{project.features[selectedFeature].title}</h2>
          <p>{project.features[selectedFeature].description}</p>
        </div>
      </section>

      <div className="grid gap-12 sm:gap-16">
        {SECTIONS.map((s, i) => (
          <Reveal key={s.key} delay={i * 60} className="grid gap-4 border-t border-bone/10 pt-6 sm:grid-cols-12">
            <div className="sm:col-span-3">
              <h2 className="label">{s.title}</h2>
              <p className="label mt-1.5 text-bone/25">{s.q}</p>
            </div>
            <div className="sm:col-span-9">
              {s.key === "stack" ? (
                <ul className="flex flex-wrap gap-2">
                  {project.stack.length === 0 ? (
                    <li className="font-mono text-[0.8rem] text-smoke">— пусто —</li>
                  ) : (
                    project.stack.map((t) => (
                      <li
                        key={t}
                        className="border border-bone/15 px-3 py-1.5 font-mono text-[0.75rem] text-fog transition-colors duration-300 hover:border-amber hover:text-amber"
                      >
                        {t}
                      </li>
                    ))
                  )}
                </ul>
              ) : s.key === "role" ? (
                <p className="max-w-[42rem] text-[0.98rem] leading-[1.65] text-fog">{project.role}</p>
              ) : (
                <p className="max-w-[42rem] text-[0.98rem] leading-[1.65] text-fog">
                  {project[s.key as "problem" | "decision" | "outcome"]}
                </p>
              )}
            </div>
          </Reveal>
        ))}
      </div>

      <section className="mt-20 border-t border-bone/10 pt-8">
        <h2 className="label mb-8 text-amber">Ключевые возможности</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {project.features.map((feature, index) => (
            <article key={feature.title} className="border-t border-bone/10 py-6">
              <span className="label text-amber">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 text-xl font-semibold">{feature.title}</h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-fog">{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      {project.links.length > 0 && (
        <Reveal className="mt-16 flex flex-col gap-px border-t border-bone/10 pt-8">
          {project.links.map((l) => (
            <Magnetic key={l.href} strength={0.14} className="w-full">
              <a
                href={l.href}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex items-baseline justify-between gap-6 border-b border-bone/10 py-4 transition-colors duration-500 hover:border-amber"
              >
                <span className="text-[1.5rem] font-bold tracking-[-0.03em] text-bone/85 transition-transform duration-700 group-hover:translate-x-4">
                  {l.label}
                </span>
                <span className="label text-smoke group-hover:text-amber">↗</span>
              </a>
            </Magnetic>
          ))}
        </Reveal>
      )}
    </main>
  );
}

export function CaseStudyRoute({ slug }: { slug: string }) {
  const project = bySlug(slug);
  if (!project) notFound();

  return (
    <>
      <CaseStudy project={project} />
      <div className="relative z-10 px-5 pb-24 sm:px-8">
        <Link href="/work" className="label text-bone/60 transition-colors duration-300 hover:text-amber">
          ← ко всем проектам
        </Link>
      </div>
    </>
  );
}

export { Empty };
