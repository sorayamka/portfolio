"use client";

import { useEffect, useRef } from "react";
import { view } from "@/lib/scroll";

export function ScrollRail() {
  const fill = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const tick = () => {
      if (fill.current) fill.current.style.transform = `scaleY(${view.progress})`;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-y-0 right-0 z-40 w-0.5 bg-bone/8">
      <div
        ref={fill}
        className="h-full w-full origin-top bg-amber"
        style={{ transform: "scaleY(0)" }}
      />
    </div>
  );
}