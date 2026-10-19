"use client";

import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/asset";

const services = [
  { title: "AI-персонажи, контент и UGC", description: "Виртуальные персонажи, AI-контент и UGC для соцсетей и рекламы: внешность, история, голос, фото и видео с узнаваемым персонажем в каждом кадре.", tools: ["UGC", "ComfyUI", "Seedream", "Kling", "Wan", "LoRA"] },
  { title: "AI-визуал", description: "Серии иллюстраций и коммерческой графики в едином стиле: арты для игровых кейсов, постеры, баннеры, обложки. Работа с промптами и постобработка, чтобы все материалы выглядели как один комплект.", tools: ["Seedream", "Nano Banana", "ComfyUI", "Постобработка"] },
  { title: "Telegram-боты и автоматизация", description: "Боты и юзерботы с AI-диалогами, аналитикой и админ-панелями. Интеграция моделей, базы данных и операторских инструментов в единую систему.", tools: ["Python", "Telethon", "grammY", "Supabase", "LLM API"] },
  { title: "Трафик и инфраструктура роста", description: "Автоматизация SMM-процессов. Скрипты и сервисы для планирования публикаций, сбора статистики и управления несколькими аккаунтами. Сетевая настройка, прокси, автоматизация браузера.", tools: ["SMM", "Планирование", "Аналитика", "Прокси", "Автоматизация браузера"] },
  { title: "Full-stack разработка", description: "Полный цикл: от идеи и архитектуры до готового продукта. Бэкенд, база данных, хостинг и интерфейс. Лендинги и веб-приложения на Next.js, TypeScript, PHP и Supabase, нативные macOS-приложения на Swift/SwiftUI.", tools: ["Next.js", "TypeScript", "PHP", "Supabase", "Swift", "SwiftUI"] },
];

export function Services() {
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const sectionRef = useRef<HTMLElement>(null);
  const selectSkill = (index: number) => {
    activeRef.current = index;
    setActive(index);
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let phase: "before" | "reading" | "after" = "before";
    let top = 0;
    let lastWheel = -Infinity;
    let lastDirection = 0;
    let frame = 0;
    let previousY = window.scrollY;
    const mobile = matchMedia("(max-width: 700px), (pointer: coarse)");
    const measure = () => { top = section.getBoundingClientRect().top + window.scrollY; };
    const updateEntrance = () => {
      frame = 0;
      const progress = Math.max(0, Math.min(1, (window.scrollY - top + innerHeight * 0.8) / (innerHeight * 0.8)));
      section.style.setProperty("--skeleton-enter", `${105 * Math.pow(1 - progress, 3)}vw`);
      section.style.setProperty("--text-visible", progress > 0.9 ? "1" : "0");
    };
    const onScroll = () => {
      const y = window.scrollY;
      if (mobile.matches) {
        phase = y < top ? "before" : "after";
        previousY = y;
        if (!frame) frame = requestAnimationFrame(updateEntrance);
        return;
      }
      if (phase === "before" && previousY < top && y >= top) {
        phase = "reading";
        activeRef.current = 0;
        setActive(0);
      } else if (phase === "after" && previousY > top && y <= top) {
        phase = "reading";
        activeRef.current = services.length - 1;
        setActive(services.length - 1);
      }
      if (phase === "reading" && Math.abs(y - top) > 1) window.scrollTo({ top, behavior: "instant" });
      previousY = phase === "reading" ? top : y;
      if (!frame) frame = requestAnimationFrame(updateEntrance);
    };
    const onResize = () => { measure(); onScroll(); };
    const show = (index: number) => {
      activeRef.current = index;
      setActive(index);
    };
    const onWheel = (event: WheelEvent) => {
      if (mobile.matches) return;
      if (event.ctrlKey || !event.deltaY || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      const direction = Math.sign(event.deltaY);
      const now = performance.now();
      const fresh = direction !== lastDirection || now - lastWheel > 140;
      lastWheel = now;
      lastDirection = direction;
      const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? innerHeight : 1);
      const y = window.scrollY;
      const crossingDown = direction > 0 && phase === "before" && y <= top + 2 && y + delta >= top;
      const crossingUp = direction < 0 && phase === "after" && y >= top - 2 && y + delta <= top;
      const atScene = Math.abs(y - top) <= 2;
      if (crossingDown || crossingUp || (atScene && phase !== "reading" && ((phase === "before" && direction > 0) || (phase === "after" && direction < 0)))) {
        event.preventDefault();
        phase = "reading";
        show(direction > 0 ? 0 : services.length - 1);
        window.scrollTo({ top, behavior: "instant" });
        onScroll();
        return;
      }
      if (phase !== "reading") return;
      if (!fresh) { event.preventDefault(); return; }
      const next = activeRef.current + direction;
      if (next < 0 || next >= services.length) {
        phase = direction > 0 ? "after" : "before";
        return;
      }
      event.preventDefault();
      show(next);
    };
    measure();
    if (window.scrollY > top + 2) phase = "after";
    updateEntrance();
    window.addEventListener("wheel", onWheel, { passive: false, capture: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("wheel", onWheel, true);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="services-section services-scroll relative" aria-labelledby="services-title">
      <div className="services-sticky">
        <div className="services-heading">
          <div><p className="label text-amber mb-5">01 / EXPERTISE & SERVICES</p><h2 id="services-title" className="display-lg">Навыки<span className="services-title-dot">.</span></h2></div>
          <p className="services-intro">От идеи до продукта.<br /><span>Пять направлений.</span></p>
        </div>
        <div className="services-stage">
          <div className="services-film" aria-label="Вращающийся скелетный заяц"><video src={asset("/skeleton-optimized.mp4")} autoPlay muted loop playsInline preload="auto" /></div>
          {services.map((service, index) => (
            <div key={service.title} className="service-detail-container" data-active={index === active} data-side={index % 2 === 0 ? "left" : "right"}>
              <div id={`skill-panel-${index}`} role="tabpanel" aria-labelledby={`skill-tab-${index}`} aria-hidden={index !== active} className={`service-detail${index === active ? " is-active" : ""}`}>
                <div className="service-detail-index"><span className="label text-amber">EXPERTISE / 0{index + 1}</span></div>
                <div className="service-detail-copy"><h3>{service.title}</h3><p>{service.description}</p></div>
                <div className="service-detail-tools"><ul>{service.tools.map(tool => <li key={tool}>{tool}</li>)}</ul></div>
              </div>
            </div>
          ))}
          <div className="services-scroll-progress" role="tablist" aria-label={`Навык ${active + 1} из 5`}>
            {services.map((service, index) => <button key={service.title} type="button" role="tab" id={`skill-tab-${index}`} aria-controls={`skill-panel-${index}`} aria-selected={index === active} aria-label={service.title} className="skill-tab" onClick={() => selectSkill(index)}><span>0{index + 1}</span></button>)}
            <span className="label">0{active + 1} / 05 — SCROLL TO EXPLORE</span>
          </div>
        </div>
      </div>
    </section>
  );
}
