"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "./lang-provider";

const GLYPHS = ["|", "/", "-", "\\", "#", "+", "=", "*", ".", " "];
const BOOT = [
  "init kernel .................. ok",
  "mount /dev/memory ............ ok",
  "load design tokens .......... ok",
  "compile shaders ............. ok",
  "spawn renderer .............. ok",
];

export function Loader({ onDone }: { onDone?: () => void }) {
  const { lang } = useLang();
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lines, setLines] = useState<string[]>([]);
  const [ascii, setAscii] = useState("");
  const barRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const total = reduced ? 700 : 2200;
    const start = performance.now();
    let frame = 0;
    let visible = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / total);
      const eased = 1 - Math.pow(1 - t, 3);
      const value = Math.round(eased * 100);

      if (value !== visible) {
        visible = value;
        setProgress(value);
        setLines(BOOT.filter((_, i) => value > (i / BOOT.length) * 88));
      }

      const filled = Math.round((value / 100) * 28);
      const tail = GLYPHS[(value * 7) % GLYPHS.length];
      setAscii("█".repeat(filled) + (value < 100 ? tail : "█"));

      if (barRef.current) {
        barRef.current.style.scale = `${Math.max(0.02, value / 100)} 1`;
      }

      if (t < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setLeaving(true);
        window.setTimeout(() => {
          setHidden(true);
          document.body.classList.remove("is-locked");
          doneRef.current?.();
        }, reduced ? 60 : 780);
      }
    };

    document.body.classList.add("is-locked");
    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, []);

  if (hidden) return null;

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-9999 flex flex-col justify-between bg-void px-5 py-6 sm:px-8 sm:py-8"
      style={{
        opacity: leaving ? 0 : 1,
        filter: leaving ? "blur(14px)" : "blur(0px)",
        transform: leaving ? "scale(1.04)" : "scale(1)",
        transition:
          "opacity .78s var(--ease-in-out-quint), filter .78s var(--ease-in-out-quint), transform .78s var(--ease-in-out-quint)",
      }}
    >
      <div className="flex items-start justify-between gap-6">
        <span className="label text-amber">ivan@dev:~</span>
        <span className="label">boot sequence / v1.0.0</span>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex items-end gap-4 sm:gap-6">
          <span
            className="font-mono font-medium tabular-nums leading-[0.8] text-bone"
            style={{ fontSize: "clamp(3.5rem, 16vw, 11rem)", letterSpacing: "-0.06em" }}
          >
            {String(progress).padStart(3, "0")}
          </span>
          <span className="label mb-[1.2vw]">%</span>
        </div>

        <div className="h-px w-full bg-bone/15">
          <div
            ref={barRef}
            className="h-px w-full origin-left bg-amber"
            style={{ scale: "0 1", transition: "scale .12s linear" }}
          />
        </div>

        <pre
          className="scanlines h-[9.5rem] overflow-hidden whitespace-pre font-mono text-[0.6875rem] leading-[1.55] tracking-[0.04em] text-smoke"
          aria-hidden
        >
          {lines.map((line, i) => (
            <span key={i} className="block">
              <span className="text-amber">$ </span>
              {line.replace(/\.\.+/, (dots) => " ".repeat(Math.max(0, 22 - dots.length)) + dots)}
              {" "}
              <span className="text-gold">{i === lines.length - 1 ? "" : "✓"}</span>
            </span>
          ))}
        </pre>

        <div className="overflow-hidden font-mono text-[0.8125rem] leading-none tracking-[0.02em] text-amber">
          <span className="whitespace-pre">{ascii}</span>
        </div>
      </div>

      <div className="flex items-end justify-between gap-6">
        <span className="label max-w-[16rem] leading-[1.5]">
          {lang === "en" ? "moscow" : "москва"} · 55.7558°n 37.6173°e
        </span>
        <span className="caret label text-amber" />
      </div>
    </div>
  );
}
