"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { english } from "@/lib/translations";
import { usePathname, useRouter } from "next/navigation";

type Lang = "ru" | "en";

const dict = {
  ru: {
    topbar: "Иван Севрюков · 20 лет · Москва",
    navPersonal: "Личное",
    navWork: "Портфолио",
    codeComment: "// приятно познакомиться",
    headline: ["У кода", "нет", "возраста"],
    lede: "Python-разработчик. Делаю Telegram-ботов на Telethon и grammY, подключаю AI API и Supabase.",
    scroll: "скролл",
    projects: "Проекты",
    projectsNote: "список пока пуст",
    personal: "Личное",
    personalNote: "биография пока пуста",
    contacts: "Контакты",
    available: "доступен для проектов",
    version: "v1.0.0",
    empty: "— раздел в работе —",
    built: "собрано в коде",
    rights: "все права защищены",
    status: "статус",
  },
  en: {
    topbar: "Ivan Sevrukov · 20 y/o · Moscow",
    navPersonal: "Personal",
    navWork: "Portfolio",
    codeComment: "// nice to meet you",
    headline: ["Code has", "no", "age"],
    lede: "Python developer. I build Telegram bots with Telethon and grammY, and connect AI APIs and Supabase.",
    scroll: "scroll",
    projects: "Projects",
    projectsNote: "list is empty for now",
    personal: "Personal",
    personalNote: "bio is empty for now",
    contacts: "Contacts",
    available: "open for projects",
    version: "v1.0.0",
    empty: "— section in progress —",
    built: "built in code",
    rights: "all rights reserved",
    status: "status",
  },
} as const;

export type Copy = (typeof dict)[Lang];

const LangContext = createContext<{ lang: Lang; copy: Copy; setLang: (l: Lang) => void }>(
  { lang: "ru", copy: dict.ru, setLang: () => {} },
);

export function LangProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const lang: Lang = pathname === "/en" || pathname.startsWith("/en/") ? "en" : "ru";
  const setLang = (next: Lang) => {
    const path = pathname.replace(/^\/en(?=\/|$)/, "") || "/";
    router.push(next === "en" ? `/en${path}` : path, { scroll: false });
  };

  useEffect(() => {
    document.documentElement.lang = lang;
    window.localStorage.setItem("ivan-lang", lang);
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, copy: dict[lang], setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);

export function useText() {
  const { lang } = useLang();
  return (text: string) => lang === "en" ? english[text] ?? text : text;
}
