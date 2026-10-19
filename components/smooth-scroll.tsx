"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { readScroll, view } from "@/lib/scroll";

export function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      const onScroll = () => readScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }

    const lenis = new Lenis({
      smoothWheel: false,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.7,
      lerp: 1,
    });

    lenis.on("scroll", ({ scroll }) => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const prev = readScroll.last;
      view.velocity = scroll - prev;
      readScroll.last = scroll;
      view.progress = max > 0 ? Math.min(1, Math.max(0, scroll / max)) : 0;
      view.hero = Math.min(1, Math.max(0, scroll / Math.max(1, window.innerHeight)));
    });

    const onPointer = (e: PointerEvent) => {
      view.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      /* Вверх — плюс: сцена правосторонняя, +Y вверх, а clientY растёт вниз.
         3D-код читает это значение как «вверх», поэтому инвертируем здесь,
         а не в каждом читателе. */
      view.pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };

    window.addEventListener("pointermove", onPointer, { passive: true });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointer);
      lenis.destroy();
    };
  }, []);

  return null;
}
