"use client";

import Link from "./localized-link";
import { PageHeader } from "./ui";
import { Magnetic } from "./magnetic";
import { Reveal } from "./reveal";
import { site } from "@/lib/content";
import { useText } from "./lang-provider";

const CHANNELS = [
  { label: "Telegram", href: site.telegram, note: "самый быстрый канал", external: true },
  { label: "Email", href: `mailto:${site.email}`, note: "для длинных задач", external: false },
  { label: "GitHub", href: site.github, note: "код и репозитории", external: true },
] as const;

export function ContactPage() {
  const t = useText();
  return (
    <main className="relative z-10 px-5 pt-32 pb-24 sm:px-8 sm:pt-40 sm:pb-32">
      <PageHeader index="03" title={t("Контакты")} note={site.timezone} />

      <ul className="flex flex-col">
        {CHANNELS.map((c, i) => (
          <Reveal as="li" key={c.href} delay={i * 80} className="border-b border-bone/10">
            <Magnetic strength={0.14} className="w-full">
              <a
                href={c.href}
                target={c.external ? "_blank" : undefined}
                rel={c.external ? "noreferrer noopener" : undefined}
                className="group flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 py-7 transition-colors duration-500 hover:border-amber"
              >
                <span className="flex flex-col gap-2">
                  <span
                    className="text-[clamp(1.75rem,7vw,4.5rem)] leading-[0.95] font-extrabold tracking-[-0.045em] text-bone/85 transition-transform duration-700 group-hover:translate-x-4"
                    style={{ transitionTimingFunction: "var(--ease-out-expo)" }}
                  >
                    {c.label}
                  </span>
                  <span className="label">{t(c.note)}</span>
                </span>
                <span className="label text-smoke transition-colors duration-500 group-hover:text-amber">
                  ↗
                </span>
              </a>
            </Magnetic>
          </Reveal>
        ))}
      </ul>

      <Reveal className="mt-16 grid gap-8 border-t border-bone/10 pt-8 sm:grid-cols-12">
        <div className="sm:col-span-4">
          <span className="label">{t("Где я")}</span>
          <p className="mt-3 font-mono text-[0.8rem] text-fog">{site.coords}</p>
          <p className="mt-1 font-mono text-[0.8rem] text-smoke">{t(site.city)}, {site.timezone}</p>
        </div>
        <div className="sm:col-span-4">
          <span className="label">{t("Статус")}</span>
          <div className="mt-3 flex items-center gap-2.5">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-amber opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-amber" />
            </span>
            <span className="font-mono text-[0.8rem] text-fog">{t("открыт к проектам")}</span>
          </div>
        </div>
        <div className="sm:col-span-4">
          <span className="label">{t("Ещё")}</span>
          <ul className="mt-3 flex flex-col gap-1.5">
            <li>
              <Link href="/work" className="text-sm text-fog transition-colors duration-300 hover:text-amber">
                 {t("портфолио →")}
              </Link>
            </li>
          </ul>
        </div>
      </Reveal>
    </main>
  );
}
