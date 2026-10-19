"use client";

import { useLayoutEffect, useRef } from "react";
import { site } from "@/lib/content";

/**
 * Бегущее имя первого экрана.
 *
 * Инверсия — по силуэту зайца: маска (head.webp) пересекается с полосой
 * строки, и буква темнеет ровно там, где проходит через контур.
 *
 * Слой .name-invert растянут на весь экран, иначе проценты в mask-position
 * считались бы от полосы (~160px), а координаты головы публикуются в
 * экранных процентах — маска уезжала вниз, и по контуру зверя оставались
 * чёрные штрихи снаружи и дырки внутри букв. Чтобы текст при этом остался
 * на своём месте, полоса внутри слоя опускается на --band-t / --band-h,
 * которые компонент измеряет у себя.
 */
export function NameMarquee() {
  const text = site.nameLatin.toUpperCase();
  const duration = { "--marquee-duration": "26s" } as React.CSSProperties;
  const band = useRef<HTMLDivElement>(null);

  /* Прямоугольник полосы в экранных пикселях: маска инверсии приходит
     тоже в пикселях, и CSS переводит её в доли полосы через calc. */
  useLayoutEffect(() => {
    const el = band.current;
    if (!el) return;
    const write = () => {
      const r = el.getBoundingClientRect();
      const root = document.documentElement;
      root.style.setProperty("--band-xpx", `${r.left}px`);
      root.style.setProperty("--band-tpx", `${r.top}px`);
      root.style.setProperty("--band-wpx", `${r.width}px`);
      root.style.setProperty("--band-hpx", `${r.height}px`);
    };
    write();
    const ro = new ResizeObserver(write);
    ro.observe(el);
    window.addEventListener("resize", write);
    // первый кадр: шрифт и высоты уже применились после лоадера
    const raf = requestAnimationFrame(write);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", write);
      cancelAnimationFrame(raf);
    };
  }, []);

  const strip = (key: string) => (
    <span key={key} className="flex shrink-0 items-stretch">
      {Array.from({ length: 6 }, (_, i) => (
        <span key={i} className="name-tile">
          {text}
        </span>
      ))}
    </span>
  );

  const track = (key: string) => (
    <div key={key} className="marquee-track" style={duration}>
      {strip(key + "a")}
      {strip(key + "b")}
    </div>
  );

  return (
    <div ref={band} className="name-marquee" aria-label={site.nameLatin}>
      <div className="name-base">{track("base")}</div>
    </div>
  );
}
