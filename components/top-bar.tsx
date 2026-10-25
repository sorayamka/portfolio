"use client";

import Link from "./localized-link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useLang } from "./lang-provider";
import { Magnetic } from "./magnetic";
import { nav } from "@/lib/content";
import { view } from "@/lib/scroll";

export function TopBar() {
  const { lang, setLang, copy } = useLang();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const pct = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const tick = () => {
      if (pct.current) {
        pct.current.textContent = String(Math.round(view.progress * 100)).padStart(3, "0");
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const currentPath = pathname.replace(/^\/en(?=\/|$)/, "") || "/";
  const active = (href: string) => (href === "/" ? currentPath === "/" : currentPath.startsWith(href));

  /* Панель всегда на тёмной теме: первый экран чёрный, и светлый герой
     здесь неуместен. Один набор токенов на весь сайт. */
  const muted = (a: number) => `color-mix(in oklab, var(--color-bone) ${a}%, transparent)`;

  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 z-40 h-20"
        style={{
          opacity: scrolled ? 1 : 0,
          background: `linear-gradient(180deg, var(--color-void) 0%, color-mix(in oklab, var(--color-void) 82%, transparent) 55%, transparent 100%)`,
          transition: "opacity .5s ease",
          backdropFilter: scrolled ? "blur(10px)" : "none",
          maskImage: "linear-gradient(#000 65%, transparent)",
        }}
      />

      <header className="fixed inset-x-0 top-0 z-50 px-5 pt-5 sm:px-8 sm:pt-7">
        <div
          className="flex items-center justify-between gap-6 border-b pb-3"
          style={{
            borderColor: scrolled ? "color-mix(in oklab, var(--color-bone) 14%, transparent)" : "transparent",
            transition: "border-color .5s ease",
          }}
        >
          <Link
            href="/"
            className="label min-w-0 truncate text-[0.6rem] tracking-[0.1em] transition-colors duration-300 hover:text-amber sm:text-[0.6875rem] sm:tracking-[0.14em]"
            style={{ color: muted(85) }}
          >
            {copy.topbar}
          </Link>

          <div className="flex shrink-0 items-center gap-5 sm:gap-8">
            <nav className="flex items-center gap-4 sm:gap-6">
              {nav.map((item) => {
                const isActive = active(item.href);
                return (
                  <Magnetic key={item.href} strength={0.4}>
                    <Link
                      href={item.href}
                      className="label relative py-1 transition-colors duration-300"
                      style={{ color: isActive ? "var(--color-amber)" : muted(70) }}
                    >
                      {lang === "ru" ? item.label : item.en}
                      <span
                        aria-hidden
                        className="absolute -bottom-0.5 left-0 h-px w-full origin-left bg-amber"
                        style={{ scale: isActive ? "1 1" : "0 1", transition: "scale .4s var(--ease-out-expo)" }}
                      />
                    </Link>
                  </Magnetic>
                );
              })}
            </nav>

            <span className="label hidden tabular-nums md:inline" style={{ color: muted(42) }}>
              <span ref={pct}>000</span>%
            </span>

            <div
              className="flex items-center gap-1 rounded-full border p-0.5"
              role="group"
              aria-label="language"
              style={{ borderColor: muted(18) }}
            >
              {(["ru", "en"] as const).map((code) => (
                <button
                  key={code}
                  onClick={() => setLang(code)}
                  aria-pressed={lang === code}
                  className="rounded-full px-2.5 py-1 font-mono text-[0.625rem] tracking-[0.16em] uppercase transition-all duration-300"
                  style={{
                    background: lang === code ? "var(--color-amber)" : "transparent",
                    color: lang === code ? "var(--color-void)" : muted(45),
                  }}
                >
                  {code}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
