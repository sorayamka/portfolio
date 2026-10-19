"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { view } from "@/lib/scroll";
import { asset } from "@/lib/asset";

export function Mascot() {
  const pathname = usePathname();
  const wrapRef = useRef<HTMLButtonElement>(null);
  const gazeRef = useRef<HTMLDivElement>(null);
  const leftEyeRef = useRef<HTMLSpanElement>(null);
  const rightEyeRef = useRef<HTMLSpanElement>(null);
  const winkRef = useRef<SVGSVGElement>(null);
  const winkAt = useRef(-10000);

  useEffect(() => {
    if (pathname !== "/") return;
    const wrap = wrapRef.current;
    const gaze = gazeRef.current;
    const left = leftEyeRef.current;
    const right = rightEyeRef.current;
    const winkArc = winkRef.current;
    if (!wrap || !gaze || !left || !right || !winkArc) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    let nextBlink = performance.now() + 3500;
    let blinkAt = -10000;
    let gazeX = 0;
    let gazeY = 0;
    let previous = performance.now();
    let previousX: number | null = null;
    let previousY: number | null = null;
    let motionBlur = 0;
    const skills = document.getElementById("skills");
    let destination = window.innerHeight;
    const measure = () => {
      destination = skills ? skills.getBoundingClientRect().top + window.scrollY : window.innerHeight;
    };
    measure();
    window.addEventListener("resize", measure);
    const observer = new ResizeObserver(measure);
    if (skills) observer.observe(skills);

    const openness = (elapsed: number, duration: number) => {
      if (elapsed < 0 || elapsed >= duration) return 1;
      const phase = elapsed / duration;
      // Быстрое закрытие, короткая пауза и мягкое раскрытие века.
      if (phase < 0.3) return Math.max(0.04, 1 - Math.pow(phase / 0.3, 2));
      if (phase < 0.43) return 0.04;
      const opening = (phase - 0.43) / 0.57;
      return 0.04 + 0.96 * (1 - Math.pow(1 - opening, 3));
    };

    const tick = (now: number) => {
      if (window.scrollY >= destination || document.hidden) {
        wrap.style.visibility = "hidden";
        previous = now;
        previousX = null;
        previousY = null;
        raf = requestAnimationFrame(tick);
        return;
      }
      const t = now / 1000;
      const dt = Math.min(0.05, (now - previous) / 1000);
      previous = now;
      if (now >= nextBlink && now - winkAt.current > 600) {
        blinkAt = now;
        nextBlink = now + 3500 + Math.random() * 4000;
      }
      const blink = openness(now - blinkAt, 240);
      const elapsed = now - winkAt.current;
      const wink = elapsed >= 0 && elapsed < 650
        ? elapsed < 150 ? 1 - elapsed / 150 : elapsed < 430 ? 0 : (elapsed - 430) / 220
        : 1;
      left.style.transform = `scaleY(${blink})`;
      right.style.transform = `scaleY(${Math.max(0.05, Math.min(blink, wink))})`;
      right.style.opacity = String(wink);
      winkArc.style.opacity = String(1 - wink);

      const px = reducedMotion.matches ? 0 : view.pointer.x;
      const py = reducedMotion.matches ? 0 : view.pointer.y;
      const response = 1 - Math.exp(-24 * dt);
      gazeX += (px * 18 - gazeX) * response;
      gazeY += (-py * 12 - gazeY) * response;
      const progress = Math.min(1, Math.max(0, window.scrollY / Math.max(1, destination)));
      wrap.style.clipPath = "none";
      wrap.style.visibility = progress >= 1 ? "hidden" : "visible";
      wrap.style.opacity = "1";
      const angle = progress * Math.PI * 0.5;
      const arcX = Math.sin(angle) * (window.innerWidth * 0.5 + wrap.offsetWidth * 0.6);
      const arcY = (1 - Math.cos(angle)) * window.innerHeight * 0.32;
      const float = reducedMotion.matches ? 0 : Math.sin(t * 0.72) * 4;
      const x = arcX + px * 9 * (1 - progress);
      const y = arcY + (-py * 7 - float) * (1 - progress);
      const speed = previousX === null || previousY === null
        ? 0
        : Math.hypot(x - previousX, y - previousY) / Math.max(dt, 0.001);
      previousX = x;
      previousY = y;
      const targetBlur = reducedMotion.matches ? 0 : Math.min(5, Math.max(0, speed - 65) * 0.006);
      motionBlur += (targetBlur - motionBlur) * (1 - Math.exp(-16 * dt));
      wrap.style.filter = motionBlur > 0.03 ? `blur(${motionBlur.toFixed(2)}px)` : "none";
      wrap.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      gaze.style.transform = `translate(calc(-50% + ${gazeX}px), calc(-50% + ${gazeY}px))`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
      observer.disconnect();
    };
  }, [pathname]);

  if (pathname !== "/") return null;

  return (
    <button
      ref={wrapRef}
      type="button"
      className="mascot"
      aria-label="Подмигнуть зайцу"
      onClick={() => { winkAt.current = performance.now(); }}
    >
      <div className="mascot-head" style={{ aspectRatio: "1217 / 1328" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset("/mascot/rabbit-new.webp")} alt="" className="mascot-img" draggable={false} />
        <div ref={gazeRef} className="mascot-gaze" aria-hidden>
          <span ref={leftEyeRef} className="mascot-eye" />
          <span ref={rightEyeRef} className="mascot-eye" />
          <svg ref={winkRef} className="mascot-wink" viewBox="0 0 60 60" fill="none">
            <path d="M 7 34 Q 30 12 53 34" stroke="currentColor" strokeWidth="9" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </button>
  );
}
