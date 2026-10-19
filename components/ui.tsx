"use client";

import type { ReactNode } from "react";
import { Reveal } from "./reveal";

/** Заголовок раздела: индекс + название + пояснение справа. */
export function PageHeader({
  index,
  title,
  note,
}: {
  index: string;
  title: string;
  note?: string;
}) {
  return (
    <div className="mb-12 flex items-end justify-between gap-6 border-b border-bone/10 pb-5 sm:mb-16">
      <div className="flex items-baseline gap-4 sm:gap-6">
        <span className="label text-amber">{index}</span>
        <h1 className="display-lg">{title}</h1>
      </div>
      {note ? <span className="label shrink-0 text-right">{note}</span> : null}
    </div>
  );
}

/** Заглушка под пустой раздел — выглядит как задумано, а не как баг. */
export function Empty({ hint, children }: { hint?: string; children?: ReactNode }) {
  return (
    <Reveal className="border border-bone/12 bg-ink/50">
      <div className="flex items-center gap-2 border-b border-bone/10 px-4 py-3">
        <span className="size-2 rounded-full bg-bone/15" />
        <span className="size-2 rounded-full bg-bone/15" />
        <span className="size-2 rounded-full bg-amber/70" />
        <span className="label ml-auto">{hint ?? "index"}</span>
      </div>
      <div className="px-4 py-7 font-mono text-[0.78rem] leading-[1.9] text-smoke sm:px-6">
        <p>
          <span className="text-amber">$</span> <span className="text-bone/70">cat content</span>{" "}
          <span className="text-fog">{children ?? "— раздел в работе —"}</span>
        </p>
        <p className="text-fog/60">
          данные лежат в <span className="text-gold">lib/content.ts</span> — правишь запись, страница
          собирается сама.
        </p>
      </div>
    </Reveal>
  );
}

/** Плитка «прочитать дальше». */
export function NextHint({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      data-scroll-to={href}
      className="group inline-flex items-center gap-2 text-[0.9rem] text-bone/60 transition-colors duration-300 hover:text-amber"
    >
      {label}
      <span className="inline-block transition-transform duration-500 group-hover:translate-x-1" style={{ transitionTimingFunction: "var(--ease-out-expo)" }}>
        →
      </span>
    </a>
  );
}

export function Rule({ className = "" }: { className?: string }) {
  return <div className={`h-px w-full ${className}`} style={{ background: "color-mix(in oklab, var(--color-bone) 12%, transparent)" }} />;
}