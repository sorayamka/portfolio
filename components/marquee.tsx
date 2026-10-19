"use client";

import { ticker } from "@/lib/content";

export function Marquee() {
  const row = [...ticker, ...ticker];

  return (
    <div className="marquee relative z-10 border-y border-bone/10 py-4 select-none">
      <div className="marquee-track" style={{ "--marquee-duration": "38s" } as React.CSSProperties}>
        {row.map((word, i) => (
          <span key={i} className="label flex items-center gap-6 px-6">
            <span className="text-bone/45">{word}</span>
            <span className="text-amber">✳</span>
          </span>
        ))}
      </div>
    </div>
  );
}