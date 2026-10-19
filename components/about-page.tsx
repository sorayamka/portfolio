"use client";

import Link from "next/link";
import { PageHeader, Empty } from "./ui";
import { Reveal } from "./reveal";
import { experience, skills } from "@/lib/content";

function SkillGroup({ title, note, items }: { title: string; note: string; items: string[] }) {
  return (
    <Reveal className="border-t border-bone/10 pt-5">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-[1.15rem] font-bold tracking-[-0.02em] text-bone/90">{title}</h3>
        <span className="label">{note}</span>
      </div>
      <ul className="mt-4 flex flex-wrap gap-2">
        {items.length === 0 ? (
          <li className="font-mono text-[0.78rem] text-smoke">— пусто —</li>
        ) : (
          items.map((s) => (
            <li
              key={s}
              className="border border-bone/15 px-3 py-1.5 font-mono text-[0.75rem] text-fog transition-colors duration-300 hover:border-amber hover:text-amber"
            >
              {s}
            </li>
          ))
        )}
      </ul>
    </Reveal>
  );
}

export function AboutPage() {
  return (
    <main className="relative z-10 px-5 pt-32 pb-24 sm:px-8 sm:pt-40 sm:pb-32">
      <PageHeader index="02" title="Личное" note="биография · навыки · опыт" />

      <div className="grid gap-16 sm:gap-24">
        <section>
          <Reveal className="grid gap-6 sm:grid-cols-12">
            <h2 className="label sm:col-span-3">История</h2>
            <div className="flex flex-col gap-5 sm:col-span-9">
              <p className="max-w-[42rem] text-pretty text-[clamp(1.1rem,2.3vw,1.5rem)] leading-[1.32] font-semibold tracking-[-0.02em] text-bone/90">
                Начал не с «хочу стать разработчиком», а с одной сломанной страницы, которую
                пришлось чинить самому.
              </p>
              <p className="max-w-[42rem] text-[0.98rem] leading-[1.65] text-fog">
                Дальше — только любопытство к тому, почему интерфейс ощущается именно так. Эта
                страница пока пустая: текст появится здесь, когда будет что сказать, а не когда
                заполнять графу.
              </p>
            </div>
          </Reveal>
        </section>

        <section>
          <Reveal className="mb-8 flex items-baseline gap-6">
            <h2 className="label">Навыки</h2>
            <span className="label">без процентов — только что готов защищать</span>
          </Reveal>
          <div className="flex flex-col gap-8">
            <SkillGroup title="Основное" note="защищаю на собеседовании" items={skills.primary} />
            <SkillGroup title="Рабочий набор" note="использую каждый день" items={skills.working} />
            <SkillGroup title="Учусь" note="сейчас" items={skills.learning} />
          </div>
        </section>

        <section>
          <Reveal className="mb-8 flex items-baseline gap-6">
            <h2 className="label">Опыт</h2>
            <span className="label">только то, что можно защитить</span>
          </Reveal>
          {experience.length === 0 ? (
            <Empty hint="experience[]">— без стажа и «начинающий разработчик» в резюме —</Empty>
          ) : (
            <ul className="flex flex-col">
              {experience.map((r, i) => (
                <Reveal as="li" key={i} className="border-b border-bone/10 py-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <span className="text-[1.15rem] font-bold tracking-[-0.02em] text-bone/90">{r.org}</span>
                    <span className="label">{r.period}</span>
                  </div>
                  <p className="mt-1 text-sm text-amber">{r.role}</p>
                  <p className="mt-2 max-w-[42rem] text-[0.95rem] leading-relaxed text-fog">{r.impact}</p>
                </Reveal>
              ))}
            </ul>
          )}
        </section>

        <section>
          <Reveal className="flex items-center justify-between gap-6 border-t border-bone/10 pt-8">
            <Link href="/contact" className="label text-bone/60 transition-colors duration-300 hover:text-amber">
              контакты →
            </Link>
            <Link href="/work" className="label text-bone/60 transition-colors duration-300 hover:text-amber">
              ← работа
            </Link>
          </Reveal>
        </section>
      </div>
    </main>
  );
}