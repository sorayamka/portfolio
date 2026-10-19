"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Элемент притягивается к курсору и слегка наклоняется. */
export function Magnetic({
  children,
  strength = 0.28,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const state = { x: 0, y: 0, tx: 0, ty: 0, rx: 0, ry: 0, trx: 0, try_: 0 };
    let frame = 0;
    let hovering = false;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      state.tx = (e.clientX - (r.left + r.width / 2)) * strength;
      state.ty = (e.clientY - (r.top + r.height / 2)) * strength;
      state.trx = -state.ty * 0.55;
      state.try_ = state.tx * 0.55;
    };
    const onEnter = () => (hovering = true);
    const onLeave = () => {
      hovering = false;
      state.tx = 0;
      state.ty = 0;
      state.trx = 0;
      state.try_ = 0;
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const tick = () => {
      state.x = lerp(state.x, state.tx, 0.16);
      state.y = lerp(state.y, state.ty, 0.16);
      state.rx = lerp(state.rx, hovering ? state.trx : 0, 0.12);
      state.ry = lerp(state.ry, hovering ? state.try_ : 0, 0.12);
      el.style.translate = `${state.x}px ${state.y}px`;
      el.style.rotate = `${state.ry * 0.12}deg`;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [strength]);

  return (
    <span
      ref={ref}
      className={`inline-block will-change-transform ${className}`}
      style={{ transform: "translateZ(0)" }}
    >
      {children}
    </span>
  );
}