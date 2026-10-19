"use client";

import { PageHeader } from "./ui";
import Link from "next/link";
import { projects, site } from "@/lib/content";

export function WorkPage() {
  return (
    <main className="relative z-10 px-5 pt-32 pb-24 sm:px-8 sm:pt-40 sm:pb-32">
      <PageHeader index="01" title="Портфолио" note="работы · интерфейсы · AI / UGC" />
      <div className="portfolio-intro"><p>Приложения, интерфейсы<br />и визуальные проекты.</p><span className="label">SELECTED PROJECTS / {String(projects.length).padStart(2, "0")}</span></div>
      <div className="portfolio-grid">
        {projects.map((project, index) => (
          <Link key={project.slug} href={`/work/${project.slug}`} className={`portfolio-tile portfolio-tile--${project.slug}`}>
            <div className="portfolio-preview">
              <div className="portfolio-tile-top"><span>0{index + 1}</span><span>{project.category}</span></div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={project.image} alt={project.title} loading={index === 0 ? "eager" : "lazy"} />
              <span className="portfolio-open" aria-hidden>↗</span>
            </div>
            <div className="portfolio-caption"><h2>{project.title}</h2><span className="label">СМОТРЕТЬ ПРОЕКТ ↗</span></div>
            <p className="portfolio-summary">{project.summary}</p>
            <ul className="portfolio-tags">{project.stack.slice(0, 4).map(tool => <li key={tool}>{tool}</li>)}</ul>
          </Link>
        ))}
        <a href={site.telegram} target="_blank" rel="noreferrer noopener" className="portfolio-invite"><span className="label">СЛЕДУЮЩИЙ ПРОЕКТ</span><h2>Здесь может быть<br />ваша работа.</h2><span className="portfolio-invite-link">Обсудить проект <span>↗</span></span></a>
      </div>
    </main>
  );
}
