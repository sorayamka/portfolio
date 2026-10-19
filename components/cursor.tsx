"use client";

import { useEffect, useRef, useState } from "react";

type Mode = "idle" | "link" | "code" | "text" | "press" | "drag";

/** Подпись рядом с курсором: что произойдёт по клику. */
const LABEL: Partial<Record<Mode, string>> = {
  link: "open",
  code: "read",
  drag: "drag",
};

/**
 * Кастомный курсор: четыре угловые скобки + отстающая точка.
 * Нативный курсор скрывается классом .cursor-none на <html>.
 */
export function Cursor() {
  const cross = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const tag = useRef<HTMLSpanElement>(null);

  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<Mode>("idle");
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    setEnabled(true);
    root.classList.add("cursor-none");

    const target = { x: innerWidth / 2, y: innerHeight / 2 };
    const c = { ...target };
    const d = { ...target };
    let inside = false;
    let mode: Mode = "idle";
    let down = false;

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!inside) {
        inside = true;
        setShown(true);
      }

      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-cursor], a, button, summary, [role='button'], pre, code, input, textarea, [draggable='true']",
      );
      let next: Mode = "idle";
      if (el) {
        const tag = el.tagName;
        if (el.getAttribute("draggable") === "true") next = "drag";
        else if (el.dataset.cursor === "code" || tag === "PRE" || tag === "CODE") next = "code";
        else if (tag === "INPUT" || tag === "TEXTAREA") next = "text";
        else if (el instanceof HTMLElement && getComputedStyle(el).cursor === "grab") next = "drag";
        else next = "link";
      }
      if (down) next = "press";
      if (next !== mode) {
        mode = next;
        setMode(next);
      }
    };

    const onDown = () => {
      down = true;
      setMode("press");
    };
    const onUp = () => {
      down = false;
      if (mode === "press") setMode("idle");
    };
    const onLeave = () => {
      inside = false;
      setShown(false);
    };
    const onEnter = () => setShown(true);

    addEventListener("pointermove", onMove, { passive: true });
    addEventListener("pointerdown", onDown);
    addEventListener("pointerup", onUp);
    document.addEventListener("pointerenter", onEnter);
    document.addEventListener("pointerleave", onLeave);

    let frame = 0;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      c.x = lerp(c.x, target.x, 0.34);
      c.y = lerp(c.y, target.y, 0.34);
      d.x = lerp(d.x, target.x, 0.62);
      d.y = lerp(d.y, target.y, 0.62);

      if (cross.current) cross.current.style.translate = `${c.x}px ${c.y}px`;
      if (dot.current) dot.current.style.translate = `${d.x - 2}px ${d.y - 2}px`;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("pointermove", onMove);
      removeEventListener("pointerdown", onDown);
      removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerenter", onEnter);
      document.removeEventListener("pointerleave", onLeave);
      root.classList.remove("cursor-none");
    };
  }, []);

  if (!enabled) return null;

  const span = mode === "link" ? 34 : mode === "code" ? 26 : mode === "press" ? 10 : 18;
  const arm = mode === "link" ? 9 : mode === "code" ? 7 : mode === "press" ? 0 : 5;
  const label = LABEL[mode];

  return (
    <>
      {/* точка */}
      <div
        ref={dot}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-10000 size-1 rounded-full"
        style={{
          background: "#fff",
          mixBlendMode: "difference",
          transition: "opacity .18s ease, background .25s ease",
          opacity: shown && mode !== "press" ? 1 : 0,
        }}
      />

      {/* ретикл */}
      <div
        ref={cross}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-9999"
        style={{ opacity: shown ? 1 : 0, transition: "opacity .2s ease", mixBlendMode: "difference" }}
      >
        <div
          className="relative"
          style={{
            width: span,
            height: span,
            marginLeft: -span / 2,
            marginTop: -span / 2,
            transition:
              "width .34s var(--ease-spring), height .34s var(--ease-spring), rotate .5s var(--ease-out-expo)",
            rotate: mode === "link" ? "45deg" : mode === "code" ? "0deg" : "0deg",
          }}
        >
          {(["-top-px -left-px", "-top-px -right-px", "-bottom-px -left-px", "-bottom-px -right-px"] as const).map(
            (pos) => (
              <span
                key={pos}
                className={`absolute ${pos} border-current`}
                style={{
                  width: arm,
                  height: arm,
                   borderColor: "#fff",
                  transition: "width .3s var(--ease-spring), height .3s var(--ease-spring), border-color .25s ease",
                  borderWidth: 0,
                  ...(pos.includes("top") ? { borderTopWidth: 1.5 } : { borderBottomWidth: 1.5 }),
                  ...(pos.includes("left") ? { borderLeftWidth: 1.5 } : { borderRightWidth: 1.5 }),
                }}
              />
            ),
          )}

          {/* подпись */}
          <span
            ref={tag}
            className="label absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 whitespace-nowrap"
            style={{
              color: "#fff",
              opacity: label ? 1 : 0,
              transform: `translate(-50%, ${label ? "0" : "-5px"})`,
              transition: "opacity .22s ease, transform .32s var(--ease-out-expo)",
            }}
          >
            {label ?? ""}
          </span>
        </div>
      </div>
    </>
  );
}
