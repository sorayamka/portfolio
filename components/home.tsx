"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useLang } from "./lang-provider";
import { Magnetic } from "./magnetic";
import { Reveal } from "./reveal";
import { NameMarquee } from "./name-marquee";
import { Mascot } from "./mascot";
import { ProjectCatalog } from "./project-catalog";
import { Services } from "./services";
import { ArchiveGallery, ContactFinale } from "./archive-gallery";
import { featured, site } from "@/lib/content";
import { view } from "@/lib/scroll";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Роль в правом нижнем углу — как в референсе: моно-строка + крупная строка. */
function Role() {
  return (
    <div className="text-right">
      <p className="label text-bone/45">// Telegram · AI · automation</p>
      <p className="mt-1 max-w-[35rem] text-[clamp(1.6rem,3.5vw,3.2rem)] leading-[0.95] font-extrabold tracking-[-0.04em] text-bone/85">
        {site.role}
      </p>
    </div>
  );
}

function CodeBlock() {
  const { copy } = useLang();
  const reduced = useReducedMotion();
  const [typed, setTyped] = useState(0);
  const tokens = [
    { text: `${copy.codeComment}\n`, className: "text-smoke" },
    { text: "const", className: "text-amber" },
    { text: " ivan", className: "text-bone" },
    { text: " = ", className: "text-smoke" },
    { text: "Developer", className: "text-bone" },
    { text: "({\n  location: ", className: "text-fog" },
    { text: "'Moscow'", className: "text-gold" },
    { text: ",\n  status: ", className: "text-fog" },
    { text: "'open'", className: "text-gold" },
    { text: ",\n});", className: "text-smoke" },
  ];
  const length = tokens.reduce((sum, token) => sum + token.text.length, 0);
  useEffect(() => {
    setTyped(0);
    let frame = 0;
    let start: number | null = null;
    const tick = (now: number) => {
      if (!view.ready) {
        frame = requestAnimationFrame(tick);
        return;
      }
      if (start === null) start = now + 200;
      const count = reduced ? length : Math.min(length, Math.max(0, Math.floor((now - start) / 25)));
      setTyped(count);
      if (count < length) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [copy.codeComment, length, reduced]);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, reduced ? 0 : -80]);
  const fade = useTransform(scrollY, [0, 320], [1, reduced ? 1 : 0]);

  return (
    <motion.div style={{ y, opacity: fade }} className="grid grid-cols-12">
      <motion.pre
        data-cursor="code"
        initial={reduced ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.15, ease: EASE }}
        className="col-span-12 overflow-x-auto font-mono text-[0.78rem] leading-[1.75] text-fog sm:col-span-8 sm:text-sm"
      >
        {tokens.map((token, index) => {
          const offset = tokens.slice(0, index).reduce((sum, item) => sum + item.text.length, 0);
          return <span key={index} className={token.className}>{token.text.slice(0, Math.max(0, typed - offset))}</span>;
        })}
        <span className="caret inline-block align-baseline" />
      </motion.pre>
    </motion.div>
  );
}

function Featured() {
  const { copy } = useLang();
  const items = featured();

  return (
    <section className="relative z-10 px-5 py-24 sm:px-8 sm:py-32">
      <div className="mb-12 flex items-end justify-between gap-6 border-b border-bone/10 pb-5">
        <h2 className="display-lg">{copy.projects}</h2>
        <Link href="/work" className="label text-bone/60 transition-colors duration-300 hover:text-amber">
          все →
        </Link>
      </div>

      <ProjectCatalog items={items} />
    </section>
  );
}

function AboutTeaser() {
  return (
    <section className="relative z-10 px-5 py-24 sm:px-8 sm:py-32">
      <Reveal className="grid gap-8 border-t border-bone/10 pt-10 sm:grid-cols-12">
        <span className="label sm:col-span-3">О себе</span>
        <div className="sm:col-span-9">
          <p className="max-w-[46rem] text-pretty text-[clamp(1.15rem,2.6vw,1.85rem)] leading-[1.28] font-semibold tracking-[-0.025em] text-bone/90">
            Двадцать лет, Москва. Пишу интерфейсы, которые держат удар:{" "}
            <span className="text-amber">анимация, 3D и типографика</span> — не украшение, а часть
            интерфейса.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
            <Link href="/about" className="label text-bone/60 transition-colors duration-300 hover:text-amber">
              читать дальше →
            </Link>
            <span className="label text-smoke">{site.coords}</span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function Home() {
  const { copy } = useLang();
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const fade = useTransform(scrollY, [0, 320], [1, reduced ? 1 : 0]);

  /* Светлый первый экран → персонаж рисуется инверсным (тёмный корпус,
     светлый экран, чёрные глаза), иначе тёмный робот тонет в кости. */
  useEffect(() => {
    view.invert = 1;
    return () => {
      view.invert = 0;
    };
  }, []);

  return (
    <main className="archive-home relative">
      <Mascot />
      {/* Без z-index: он создал бы stacking context и разорвал бы
          mix-blend-difference у бегущей строки — инверсия пропала бы.
          Порядок и так верный: канвас fixed z-0, фон на body, контент в потоке. */}
      <section
        id="top"
        className="archive-hero relative flex min-h-svh flex-col px-5 pt-24 pb-6 text-bone sm:px-8"
      >
        <div className="archive-code absolute top-24 left-5 z-10 min-h-40 sm:top-28 sm:left-8">
          <CodeBlock />
        </div>
        {/* Строка центрируется по экрану: персонаж стоит в этой точке, и она
            должна проходить через него. Обёртка — обычный div, не motion.div
            с opacity: значение меньше 1 создаёт stacking context и рвёт
            mix-blend-difference, то есть инверсию. */}
        <div className="flex flex-1 items-center">
          <div className="-mx-5 w-[calc(100%+2.5rem)] sm:-mx-8 sm:w-[calc(100%+4rem)]">
            <NameMarquee />
          </div>
        </div>

        <motion.div
          style={{ opacity: fade }}
          className="flex flex-col items-start gap-8 sm:flex-row sm:items-end sm:justify-between sm:gap-10"
        >
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: EASE }}
            className="flex flex-col items-start gap-5"
          >
            <p className="max-w-[26rem] text-pretty text-[0.95rem] leading-[1.55] text-fog">
              {copy.lede}
            </p>
            <Magnetic>
              <Link
                href="/work"
                className="label flex shrink-0 items-center gap-2 text-bone/70 transition-colors duration-300 hover:text-amber"
              >
                {copy.navWork}
                <span aria-hidden>→</span>
              </Link>
            </Magnetic>
          </motion.div>

          <Role />
        </motion.div>
      </section>

      {/* Код и тикер ушли ниже: на странице остаётся ровно одна бегущая
          строка — имя, ради неё первый экран и собран. */}

      <Services />
      <ArchiveGallery />
      <ContactFinale />
    </main>
  );
}
