"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const videos = [1, 2, 3].map(index => ({ src: `/portfolio-motion-${index}.mp4`, alt: `Видео / 0${index}`, video: true }));
const photos = ["Предметная съёмка — композиция 01", "Предметная съёмка — композиция 02", "Porsche 911 GT3 — визуальный коллаж", "UGC — продукт в кадре"]
  .map((alt, index) => ({ src: `/portfolio-photo-${index + 1}.webp`, alt, video: false }));

function Slider({ title, items }: { title: string; items: typeof videos }) {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const move = (step: number) => setActive(value => (value + step + items.length) % items.length);
  return (
    <section className="media-showcase" aria-label={title} aria-roledescription="карусель">
      <div className="media-heading">
        <div><span className="label">AI / UGC · VISUAL EXPLORATIONS</span><h2>{title}</h2></div>
        <div className="media-controls"><span className="label" aria-live="polite">0{active + 1} / 0{items.length}</span><button type="button" aria-label={`Предыдущий — ${title}`} onClick={() => move(-1)}>↖</button><button type="button" aria-label={`Следующий — ${title}`} onClick={() => move(1)}>↘</button></div>
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
            style={{ zIndex: offset === 0 ? 3 : visible ? 2 : 0, pointerEvents: offset === 0 ? "auto" : "none" }}
            drag={offset === 0 ? "x" : false} dragConstraints={{ left: 0, right: 0 }} dragElastic={.18}
            onDragEnd={(_, info) => { if (Math.abs(info.offset.x) > 45 || Math.abs(info.velocity.x) > 300) move(info.offset.x < 0 ? 1 : -1); }}>
            <div className="media-frame">{item.video
              ? <video src={offset === 0 ? item.src : undefined} autoPlay muted loop playsInline preload="metadata" aria-label={item.alt} disablePictureInPicture />
              // eslint-disable-next-line @next/next/no-img-element
              : <img src={item.src} alt={item.alt} loading="lazy" draggable={false} />}</div>
          </motion.div>;
        })}
      </div>
      <div className="diagonal-pagination">{items.map((item, index) => <button type="button" key={item.src} aria-label={`${title} — ${index + 1}`} aria-pressed={index === active} onClick={() => setActive(index)} />)}<span className="label">ЛИСТАЙТЕ ИЛИ ПОТЯНИТЕ ↗</span></div>
    </section>
  );
}

export function MediaSliders() {
  return <div className="media-collection"><Slider title="Видео и UGC" items={videos} /><Slider title="Фото и визуал" items={photos} /></div>;
}

export function InterfaceSlider() {
  const items = [1, 2, 3].map(index => ({ src: `/projects/interface-${index}.webp`, alt: `Интерфейс / 0${index}`, video: false }));
  return <div className="interface-collection"><Slider title="Интерфейсы" items={items} /></div>;
}
