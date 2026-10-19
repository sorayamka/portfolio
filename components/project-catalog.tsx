"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/lib/content";

export function ProjectCatalog({ items }: { items: Project[] }) {
  const [selected, setSelected] = useState(0);
  const reduced = useReducedMotion();
  const project = items[selected];
  if (!project) return null;
  const number = (value: number) => String(value + 1).padStart(2, "0");
  const select = (direction: number) => setSelected((value) => (value + direction + items.length) % items.length);

  return (
    <div className="project-catalog">
      <div className="catalog-topline">
        <span className="label">SEVRUKOV / SELECTED FILES</span>
        <span className="label text-amber">{number(selected)} — {String(items.length).padStart(2, "0")}</span>
      </div>
      <div className="catalog-tabs" role="tablist" aria-label="Проекты">
        {items.map((item, index) => (
          <button key={item.slug} id={`tab-${item.slug}`} role="tab" aria-selected={selected === index}
            aria-controls="project-file" onClick={() => setSelected(index)}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
                event.preventDefault();
                const next = (index + (event.key === "ArrowRight" ? 1 : -1) + items.length) % items.length;
                setSelected(next);
                document.getElementById(`tab-${items[next].slug}`)?.focus();
              }
            }} tabIndex={selected === index ? 0 : -1}>
            <span>{number(index)}</span>{item.title}<span className="catalog-tab-dot" />
          </button>
        ))}
      </div>
      <div id="project-file" role="tabpanel" aria-labelledby={`tab-${project.slug}`}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={project.slug} className={`catalog-file catalog-file--${project.slug}`}
            initial={{ opacity: 0, y: reduced ? 0 : 14 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduced ? 0 : -10 }} transition={{ duration: reduced ? 0 : 0.25 }}>
            <div className="catalog-copy">
              <span className="label text-amber">{project.category}</span>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <Link href={`/work/${project.slug}`} className="catalog-open">Открыть дело <span>↗</span></Link>
            </div>
            <Link href={`/work/${project.slug}`} className="catalog-art" aria-label={`Подробнее: ${project.title}`}>
              <span className="catalog-orbit" aria-hidden />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={project.image} alt={project.title} draggable={false} />
              <span className="catalog-art-caption">{project.category} / {number(selected)}</span>
            </Link>
            <div className="catalog-meta">
              <span className="catalog-number" aria-hidden>{number(selected)}</span>
              <span className="label">Инструменты / стек</span>
              <ul>{project.stack.slice(0, 6).map((tool) => <li key={tool}>{tool}</li>)}</ul>
              {project.stack.length > 6 && <span className="label text-amber">+ {project.stack.length - 6} в проекте</span>}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="catalog-bottomline">
        <span className="label">DESIGN × CODE × INTELLIGENCE</span>
        <div className="catalog-controls">
          <button onClick={() => select(-1)} aria-label="Предыдущий проект">←</button>
          <button onClick={() => select(1)} aria-label="Следующий проект">→</button>
        </div>
      </div>
    </div>
  );
}
