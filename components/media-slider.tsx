"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { asset } from "@/lib/asset";
import { useLang, useText } from "./lang-provider";

type MediaItem = { src: string; alt: string; video: boolean; ratio?: number; poster?: string };
const videos: MediaItem[] = [1, 2, 3, 4].map(index => ({ src: asset(`/portfolio-motion-${index}.mp4`), poster: asset(`/portfolio-poster-${index}.webp`), alt: `Video / 0${index}`, video: true }));
const photos = ["Предметная съёмка — композиция 01", "Предметная съёмка — композиция 02", "Porsche 911 GT3 — визуальный коллаж", "UGC — продукт в кадре"]
  .map((alt, index) => ({ src: asset(`/portfolio-photo-${index + 1}.jpg`), alt, video: false }));
const extraPhotos: MediaItem[] = [
  { src: asset("/portfolio-extra-1.webp"), alt: "Football product card", video: false, ratio: 1792 / 2400 },
  { src: asset("/portfolio-extra-2.webp"), alt: "Product card design", video: false, ratio: 1792 / 2400 },
  { src: asset("/portfolio-extra-3.webp"), alt: "Influencer visual", video: false, ratio: 1376 / 1634 },
  { src: asset("/portfolio-extra-4.webp"), alt: "Interior concepts", video: false, ratio: 4096 / 2730 },
  { src: asset("/portfolio-extra-5.webp"), alt: "Sneaker visual", video: false, ratio: 4096 / 2730 },
];

function Slider({ title, items }: { title: string; items: MediaItem[] }) {
  const t = useText();
  const { lang } = useLang();
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const near = useInView(sectionRef, { margin: "300px 0px", once: true });
  const images = useRef(new Map<string, Promise<void>>());
  const request = useRef(0);
  const [pending, setPending] = useState(false);
  const [playing, setPlaying] = useState<Set<string>>(new Set());
  const responsive = (src: string) => /portfolio-(photo|extra)-\d+\./.test(src);
  const sourceSet = (src: string) => [640, 1200].map(width => `${src.replace(/\.(jpg|webp)$/, `-${width}.webp`)} ${width}w`).join(", ");
  const sizes = "(max-width: 700px) 80vw, 40vw";
  const prepare = (index: number) => {
    const item = items[index];
    if (item.video) return Promise.resolve();
    if (!images.current.has(item.src)) {
      const image = new Image();
      image.decoding = "async";
      if (responsive(item.src)) { image.sizes = sizes; image.srcset = sourceSet(item.src); }
      image.src = item.src;
      images.current.set(item.src, image.decode());
    }
    return images.current.get(item.src)!;
  };
  const select = async (index: number) => {
    const next = (index + items.length) % items.length;
    const id = ++request.current;
    setPending(true);
    try {
      await prepare(next);
      if (id === request.current) setActive(next);
    } catch {
      images.current.delete(items[next].src);
    } finally {
      if (id === request.current) setPending(false);
    }
  };
  const move = (step: number) => { void select(active + step); };
  useEffect(() => {
    if (!near) return;
    for (const index of [active, (active + 1) % items.length, (active - 1 + items.length) % items.length]) {
      void prepare(index).catch(() => { images.current.delete(items[index].src); });
    }
  // The gallery sources are fixed; only the selected slide changes.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, near]);
  return (
    <section ref={sectionRef} className="media-showcase" aria-label={t(title)} aria-roledescription={lang === "en" ? "carousel" : "карусель"}>
      <div className="media-heading">
        <div><span className="label">AI / UGC · VISUAL EXPLORATIONS</span><h2>{t(title)}</h2></div>
        <div className="media-controls" aria-busy={pending}><span className="label" aria-live="polite">{pending ? "…" : `0${active + 1}`} / 0{items.length}</span><button type="button" aria-label={`${lang === "en" ? "Previous" : "Предыдущий"} — ${t(title)}`} onClick={() => move(-1)}>↖</button><button type="button" aria-label={`${lang === "en" ? "Next" : "Следующий"} — ${t(title)}`} onClick={() => move(1)}>↘</button></div>
      </div>
      <div className={`diagonal-stage diagonal-stage--${items[0].video ? "video" : "photo"}`} tabIndex={0} onKeyDown={event => {
        if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); move(event.key === "ArrowRight" ? 1 : -1); }
      }}>
        {items.map((item, index) => {
          let offset = (index - active + items.length) % items.length;
          if (offset > items.length / 2) offset -= items.length;
          const visible = Math.abs(offset) <= 1;
          return <motion.div key={item.src} className="diagonal-card" aria-hidden={offset !== 0}
            initial={false}
            animate={{ x: `${offset * 74}%`, y: reduced ? 0 : offset * 64, rotate: reduced ? 0 : offset * 11, scale: offset === 0 ? 1 : .83, opacity: visible ? offset === 0 ? 1 : .45 : 0 }}
            transition={{ type: "spring", stiffness: 95, damping: 23, mass: 1.1 }}
            style={{ zIndex: offset === 0 ? 3 : visible ? 2 : 0, pointerEvents: offset === 0 ? "auto" : "none", ...(item.ratio ? { width: `min(88%, calc(var(--media-height) * ${item.ratio}))`, left: "50%", marginLeft: `max(-44%, calc(var(--media-height) * ${item.ratio} / -2))`, height: "auto", aspectRatio: item.ratio } : {}) }}
            drag={offset === 0 ? "x" : false} dragConstraints={{ left: 0, right: 0 }} dragElastic={.18}
            onDragEnd={(_, info) => { if (Math.abs(info.offset.x) > 45 || Math.abs(info.velocity.x) > 300) move(info.offset.x < 0 ? 1 : -1); }}>
            <div className="media-frame" style={item.ratio ? { aspectRatio: item.ratio, height: "auto" } : undefined}>{item.video
              ? <>
                {near && visible && <img src={item.poster} alt={t(item.alt)} width={360} height={640} decoding="async" draggable={false} />}
                {near && offset === 0 && playing.has(item.src) && <video className="gallery-playing-video" src={item.src} poster={item.poster} autoPlay muted loop playsInline preload="auto" aria-label={t(item.alt)} disablePictureInPicture disableRemotePlayback controlsList="nofullscreen nodownload noremoteplayback" />}
                {offset === 0 && !playing.has(item.src) && <button className="gallery-play" type="button" aria-label={lang === "en" ? "Play video" : "Воспроизвести видео"} onPointerDown={event => event.stopPropagation()} onClick={() => setPlaying(previous => new Set(previous).add(item.src))}>▶</button>}
              </>
              // eslint-disable-next-line @next/next/no-img-element
              : near && visible ? <img src={item.src} srcSet={responsive(item.src) ? sourceSet(item.src) : undefined} sizes={sizes} width={1200} height={Math.round(1200 / (item.ratio ?? (896 / 1200)))} alt={t(item.alt)} loading="eager" fetchPriority={offset === 0 ? "high" : "low"} decoding="async" draggable={false} /> : null}</div>
          </motion.div>;
        })}
      </div>
      <div className="diagonal-pagination">{items.map((item, index) => <button type="button" key={item.src} aria-label={`${t(title)} — ${index + 1}`} aria-pressed={index === active} onClick={() => { void select(index); }} />)}<span className="label">{t("ЛИСТАЙТЕ ИЛИ ПОТЯНИТЕ ↗")}</span></div>
    </section>
  );
}

export function MediaSliders() {
  return <div className="media-collection"><Slider title="Видео и UGC" items={videos} /><Slider title="Фото и визуал" items={[...photos, ...extraPhotos]} /></div>;
}

export function InterfaceSlider() {
  const items = [1, 2, 3].map(index => ({ src: `/projects/interface-${index}.webp`, alt: `Интерфейс / 0${index}`, video: false }));
  return <div className="interface-collection"><Slider title="Интерфейсы" items={items} /></div>;
}
