"use client";

import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/asset";
import { useText } from "./lang-provider";

const services = [
  { title: "AI-персонажи, контент и UGC", description: "Виртуальные персонажи, AI-контент и UGC для соцсетей и рекламы: внешность, история, голос, фото и видео с узнаваемым персонажем в каждом кадре.", tools: ["UGC", "ComfyUI", "Seedream", "Kling", "Wan", "LoRA"] },
  { title: "AI-визуал", description: "Серии иллюстраций и коммерческой графики в едином стиле: арты для игровых кейсов, постеры, баннеры, обложки. Работа с промптами и постобработка, чтобы все материалы выглядели как один комплект.", tools: ["Seedream", "Nano Banana", "ComfyUI", "Постобработка"] },
  { title: "Telegram-боты и автоматизация", description: "Боты и юзерботы с AI-диалогами, аналитикой и админ-панелями. Интеграция моделей, базы данных и операторских инструментов в единую систему.", tools: ["Python", "Telethon", "grammY", "Supabase", "LLM API"] },
  { title: "Трафик и инфраструктура роста", description: "Автоматизация SMM-процессов. Скрипты и сервисы для планирования публикаций, сбора статистики и управления несколькими аккаунтами. Сетевая настройка, прокси, автоматизация браузера.", tools: ["SMM", "Планирование", "Аналитика", "Прокси", "Автоматизация браузера"] },
  { title: "Full-stack разработка", description: "Полный цикл: от идеи и архитектуры до готового продукта. Бэкенд, база данных, хостинг и интерфейс. Лендинги и веб-приложения на Next.js, TypeScript, PHP и Supabase, нативные macOS-приложения на Swift/SwiftUI.", tools: ["Next.js", "TypeScript", "PHP", "Supabase", "Swift", "SwiftUI"] },
];

export function Services() {
  const t = useText();
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const selectSkill = (index: number) => {
    setActive(index);
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let top = 0;
    let frame = 0;
    const measure = () => { top = section.getBoundingClientRect().top + window.scrollY; };
    const updateEntrance = () => {
      frame = 0;
      const progress = Math.max(0, Math.min(1, (window.scrollY - top + innerHeight * 0.8) / (innerHeight * 0.8)));
      section.style.setProperty("--skeleton-enter", `${105 * Math.pow(1 - progress, 3)}vw`);
      section.style.setProperty("--text-visible", progress > 0.9 ? "1" : "0");
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(updateEntrance);
    };
    const onResize = () => { measure(); onScroll(); };
    measure();
    updateEntrance();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="services-section services-scroll relative" aria-labelledby="services-title">
      <div className="services-sticky">
        <div className="services-heading">
          <div><p className="label text-amber mb-5">01 / EXPERTISE & SERVICES</p><h2 id="services-title" className="display-lg">{t("Навыки")}<span className="services-title-dot">.</span></h2></div>
          <p className="services-intro">{t("От идеи до продукта.")}<br /><span>{t("Пять направлений.")}</span></p>
        </div>
        <div className="services-stage">
          <div className="services-film" aria-label="Вращающийся скелетный заяц"><video src={asset("/skeleton-optimized.mp4")} autoPlay muted loop playsInline preload="auto" /></div>
          {services.map((service, index) => (
            <div key={service.title} className="service-detail-container" data-active={index === active} data-side={index % 2 === 0 ? "left" : "right"}>
              <div id={`skill-panel-${index}`} role="tabpanel" aria-labelledby={`skill-tab-${index}`} aria-hidden={index !== active} className={`service-detail${index === active ? " is-active" : ""}`}>
                <div className="service-detail-index"><span className="label text-amber">EXPERTISE / 0{index + 1}</span></div>
                <div className="service-detail-copy"><h3>{t(service.title)}</h3><p>{t(service.description)}</p></div>
                <div className="service-detail-tools"><ul>{service.tools.map(tool => <li key={tool}>{t(tool)}</li>)}</ul></div>
              </div>
            </div>
          ))}
          <div className="services-scroll-progress" role="tablist" aria-label={`Навык ${active + 1} из 5`}>
            {services.map((service, index) => <button key={service.title} type="button" role="tab" id={`skill-tab-${index}`} aria-controls={`skill-panel-${index}`} aria-selected={index === active} aria-label={t(service.title)} className="skill-tab" onClick={() => selectSkill(index)}><span>0{index + 1}</span></button>)}
            <span className="label">0{active + 1} / 05 — SELECT A SKILL</span>
          </div>
        </div>
      </div>
    </section>
  );
}
