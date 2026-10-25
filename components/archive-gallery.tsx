"use client";

import Link from "./localized-link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { projects, site, type Project } from "@/lib/content";
import { useLang, useText } from "./lang-provider";
import { localizeProject } from "@/lib/translations";

function ArchiveCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.25, 0.78, 1], reduced ? [1, 1, 1, 1] : [0.72, 1, 1, 0.82]);
  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [55, -45]);
  return (
    <motion.article ref={ref} style={{ scale, y }} className={`archive-card archive-card--${index}`}>
      <Link href={`/work/${project.slug}`} className="archive-card-link">
        <div className={`archive-image archive-image--${project.slug}`}>
          <span className="archive-file-no">FILE / 0{index + 1}</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={project.image} alt={project.title} loading="lazy" decoding="async" />
          <span className="archive-image-arrow" aria-hidden>↗</span>
        </div>
        <div className="archive-card-caption"><h3>{project.title}</h3><span>{project.category}</span></div>
        <p>{project.summary}</p>
      </Link>
    </motion.article>
  );
}

export function ArchiveGallery() {
  const { lang } = useLang();
  const t = useText();
  return (
    <section id="projects" className="archive-gallery" aria-labelledby="archive-title">
      <div className="archive-heading"><span className="label">SELECTED WORK / 01—03</span><h2 id="archive-title">{t("Архив")}<br /><span>{t("избранного.")}</span></h2><p>{t("Избранные работы, доведённые до конечного результата.")}</p></div>
      <div className="archive-grid">{projects.map((project, index) => <ArchiveCard key={project.slug} project={localizeProject(project, lang)} index={index} />)}</div>
      <Link href="/work" className="archive-all">{t("Портфолио")} <span>↗</span></Link>
    </section>
  );
}

export function ContactFinale() {
  const t = useText();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start start"] });
  const background = useTransform(scrollYProgress, [0, 0.75], ["#080808", "#f1f1ed"]);
  const color = useTransform(scrollYProgress, [0, 0.75], ["#f1f1ed", "#111111"]);
  return (
    <motion.section ref={ref} style={{ backgroundColor: background, color }} className="contact-finale">
      <div className="finale-top"><span>{t("ЕСТЬ ИДЕЯ?")}</span><span>{t("МОСКВА / РАБОТАЮ ОТОВСЮДУ")}</span></div>
      <h2>{t("Давайте")}<br />{t("сделаем ")}<em>{t("это.")}</em></h2>
      <a href={site.telegram} target="_blank" rel="noreferrer noopener" className="finale-cta">{t("Обсудить проект")} <span>↗</span></a>
      <div className="finale-bottom"><span>IVAN SEVRUKOV © 2026</span><a href={`mailto:${site.email}`}>{site.email}</a><Link href="/contact">{t("Все контакты ↗")}</Link></div>
    </motion.section>
  );
}
