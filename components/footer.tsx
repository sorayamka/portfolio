"use client";

import Link from "next/link";
import { useLang } from "./lang-provider";
import { Magnetic } from "./magnetic";
import { Reveal } from "./reveal";
import { nav, site, YEAR } from "@/lib/content";

export function Footer() {
  const { copy } = useLang();

  return (
    <footer className="relative z-10 border-t border-bone/10 px-5 pt-14 pb-8 sm:px-8 sm:pt-20">
      <div className="grid gap-10 sm:grid-cols-12">
        <Reveal className="sm:col-span-4">
          <span className="label">{copy.contacts}</span>
          <ul className="mt-6 flex flex-col">
            {[
              { label: "Telegram", href: site.telegram },
              { label: "GitHub", href: site.github },
              { label: "Email", href: `mailto:${site.email}` },
            ].map((s, i) => (
              <Reveal as="li" key={s.href} delay={i * 70}>
                <Magnetic strength={0.14} className="w-full">
                  <a
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel={s.href.startsWith("http") ? "noreferrer noopener" : undefined}
                    className="group flex items-baseline justify-between gap-6 border-b border-bone/10 py-4 transition-colors duration-500 hover:border-amber"
                  >
                    <span
                      className="text-[clamp(1.4rem,6vw,3.5rem)] leading-[1] font-extrabold tracking-[-0.04em] text-bone/85 transition-transform duration-700 group-hover:translate-x-4"
                      style={{ transitionTimingFunction: "var(--ease-out-expo)" }}
                    >
                      {s.label}
                    </span>
                    <span className="label text-smoke transition-colors duration-500 group-hover:text-amber">
                      ↗
                    </span>
                  </a>
                </Magnetic>
              </Reveal>
            ))}
          </ul>
        </Reveal>

        <div className="sm:col-span-3 sm:col-start-6">
          <span className="label">Разделы</span>
          <ul className="mt-6 flex flex-col gap-2.5">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-fog transition-colors duration-300 hover:text-amber">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

      </div>

      <div className="mt-14 flex flex-wrap items-end justify-between gap-6 border-t border-bone/10 pt-6">
        <div className="flex items-center gap-2.5">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-amber opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-amber" />
          </span>
          <span className="label text-fog">
            {copy.status}: {copy.available}
          </span>
        </div>
        <span className="label">
          © {YEAR} {site.name} · {copy.rights}
        </span>
      </div>
    </footer>
  );
}
