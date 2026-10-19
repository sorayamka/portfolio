"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Scene = dynamic(() => import("./scene"), { ssr: false });

export function SceneCanvas({ ready }: { ready: boolean }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div
      aria-hidden
      /* z-0: персонаж под бегущей строкой. Инверсия сделана на
         mix-blend-difference — буква берёт цвет того, что под ней, поэтому
         строка обязана рисоваться ПОВЕРХ канваса, иначе смешивать не с чем.
         Фон непрозрачный, но он на body — секция его не перекрывает. */
      className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-1000"
      style={{
        opacity: ready ? 1 : 0,
      }}
    >
      {mounted ? <Scene /> : null}
    </div>
  );
}