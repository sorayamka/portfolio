import type { Project } from "./content";

export const english: Record<string, string> = {
  "Навыки": "Skills", "От идеи до продукта.": "From idea to product.", "Пять направлений.": "Five areas of expertise.",
  "AI-персонажи, контент и UGC": "AI characters, content & UGC",
  "Виртуальные персонажи, AI-контент и UGC для соцсетей и рекламы: внешность, история, голос, фото и видео с узнаваемым персонажем в каждом кадре.": "Virtual characters, AI content and UGC for social media and advertising: appearance, story, voice, photos and videos with a consistent character in every frame.",
  "AI-визуал": "AI visuals",
  "Серии иллюстраций и коммерческой графики в едином стиле: арты для игровых кейсов, постеры, баннеры, обложки. Работа с промптами и постобработка, чтобы все материалы выглядели как один комплект.": "Illustrations and commercial graphics with a consistent style: game artwork, posters, banners and covers. Prompt development and post-production to make every asset feel part of the same collection.",
  "Telegram-боты и автоматизация": "Telegram bots & automation",
  "Боты и юзерботы с AI-диалогами, аналитикой и админ-панелями. Интеграция моделей, базы данных и операторских инструментов в единую систему.": "Bots and userbots with AI conversations, analytics and admin dashboards. Models, databases and operator tools connected in one system.",
  "Трафик и инфраструктура роста": "Traffic & growth infrastructure",
  "Автоматизация SMM-процессов. Скрипты и сервисы для планирования публикаций, сбора статистики и управления несколькими аккаунтами. Сетевая настройка, прокси, автоматизация браузера.": "Social media workflow automation. Scripts and services for scheduling posts, collecting analytics and managing multiple accounts. Network configuration, proxies and browser automation.",
  "Full-stack разработка": "Full-stack development",
  "Полный цикл: от идеи и архитектуры до готового продукта. Бэкенд, база данных, хостинг и интерфейс. Лендинги и веб-приложения на Next.js, TypeScript, PHP и Supabase, нативные macOS-приложения на Swift/SwiftUI.": "From concept and architecture to a finished product: backend, database, hosting and interface. Landing pages and web apps with Next.js, TypeScript, PHP and Supabase; native macOS apps with Swift and SwiftUI.",
  "Постобработка": "Post-production", "Планирование": "Scheduling", "Аналитика": "Analytics", "Прокси": "Proxies", "Автоматизация браузера": "Browser automation",
  "Портфолио": "Portfolio", "работы · интерфейсы · AI / UGC": "projects · interfaces · AI / UGC",
  "Приложения, интерфейсы": "Apps, interfaces", "и визуальные проекты.": "and visual projects.", "СМОТРЕТЬ ПРОЕКТ ↗": "VIEW PROJECT ↗",
  "СЛЕДУЮЩИЙ ПРОЕКТ": "NEXT PROJECT", "Здесь может быть": "Your project", "ваша работа.": "could be here.", "Обсудить проект": "Discuss a project",
  "Архив": "Selected", "избранного.": "works.", "Избранные работы, доведённые до конечного результата.": "Selected projects, taken all the way to the finished result.",
  "ЕСТЬ ИДЕЯ?": "HAVE AN IDEA?", "МОСКВА / РАБОТАЮ ОТОВСЮДУ": "MOSCOW / WORKING WORLDWIDE", "Давайте": "Let’s", "сделаем ": "make ", "это.": "it happen.", "Все контакты ↗": "All contacts ↗",
  "Разделы": "Explore", "Главная": "Home", "Контакты": "Contact", "Иван Севрюков": "Ivan Sevrukov",
  "самый быстрый канал": "the fastest way to reach me", "для длинных задач": "for detailed briefs", "код и репозитории": "code and repositories",
  "Где я": "Location", "Москва": "Moscow", "Статус": "Status", "открыт к проектам": "open for projects", "Ещё": "Explore", "портфолио →": "portfolio →",
  "← портфолио": "← portfolio", "Возможности проекта": "Project features", "ВНУТРИ ПРОЕКТА": "INSIDE THE PROJECT", "Ключевые возможности": "Key features", "← ко всем проектам": "← all projects",
  "Идея": "Concept", "контекст проекта": "project context", "Моя роль": "My role", "что было моё": "my contribution", "Стек": "Stack", "чем собрано": "tools and technologies", "Решение": "Approach", "почему так, а не иначе": "the reasoning behind it", "Итог": "Outcome", "что изменилось": "what changed", "— пусто —": "— empty —",
  "Видео и UGC": "Video & UGC", "Фото и визуал": "Photography & visuals", "ЛИСТАЙТЕ ИЛИ ПОТЯНИТЕ ↗": "BROWSE OR DRAG ↗",
  "Предметная съёмка — композиция 01": "Product photography — composition 01", "Предметная съёмка — композиция 02": "Product photography — composition 02", "Porsche 911 GT3 — визуальный коллаж": "Porsche 911 GT3 — visual collage", "UGC — продукт в кадре": "UGC — product in focus",
};

type ProjectCopy = Pick<Project, "title" | "summary" | "problem" | "decision" | "outcome" | "features">;
export const projectsEn: Record<string, ProjectCopy> = {
  shtora: {
    title: "Shtora",
    summary: "An interface in the space you already have. The MacBook notch becomes a portal: five modules, one fluid panel, no extra windows.",
    problem: "The space between hardware and intent. Where the MacBook notch is usually seen as a limitation, Shtora sees a portal. A panel that exists only while you need it, then folds back into the screen without taking up your workspace.",
    decision: "Move the cursor to the notch and a compact panel opens with smooth, spring-like transitions. Five modules bring everyday tools together, without switching apps or breaking your flow.",
    outcome: "Built natively in Swift and SwiftUI, with carefully tuned animations that make the interface feel like part of the system.",
    features: [
      { title: "Photo storage", description: "Your visual library, always one gesture away." },
      { title: "Clipboard", description: "A searchable history of what you copied recently." },
      { title: "AI assistant", description: "Quick answers without leaving your current task." },
      { title: "Media player", description: "Control your soundtrack without switching windows." },
      { title: "System monitor", description: "Your Mac’s performance, live and at a glance." },
    ],
  },
  sora: {
    title: "Sora",
    summary: "An AI platform for Telegram conversations and sales automation. LLM agents, contextual memory, payments and an operator dashboard.",
    problem: "An asynchronous platform for customer conversations, sales workflows and personalised interactions. It combines LLM agents, contextual memory, payment integrations and a web dashboard for operators.",
    decision: "A persistent state machine manages customer interactions with server-side transition validation and typed model outputs. Conversation context, customer profiles and the current sales stage are assembled into dynamic agent instructions.",
    outcome: "One system for automated conversations and sales, with operator intervention, error logging, analytics and automatic recovery.",
    features: [
      { title: "Stateful sales orchestration", description: "Customer interaction stages managed by a persistent state machine with server-side transition validation." },
      { title: "Dynamic prompt composition", description: "Agent instructions assembled from the agent profile, conversation history, customer context and current sales stage." },
      { title: "Structured LLM outputs", description: "Typed model responses with schema validation and controlled action execution." },
      { title: "Persistent customer profiling", description: "Automatic extraction and storage of customer information, with operator corrections taking priority." },
      { title: "Sales workflow automation", description: "Sequential offers, objection handling, repeat sales and post-purchase support." },
      { title: "Payment integration & reconciliation", description: "Payment integrations, transaction-to-order matching and protection against duplicate processing." },
      { title: "Context-aware follow-ups", description: "Background follow-up workflows informed by conversation history, customer activity and schedules." },
      { title: "Concurrency control", description: "Serialised dialogue processing, incoming message batching and response regeneration when context changes." },
      { title: "Human-in-the-loop operations", description: "Operator dashboard, per-customer rules, manual intervention and handover to a human." },
      { title: "Operational resilience", description: "Error logging, analytics, process supervision and automatic recovery after failures." },
    ],
  },
  "generative-media": {
    title: "Generative Media Creator",
    summary: "AI content and UGC: images, video and ad creatives. LoRA, ComfyUI and automated processing with Python and ffmpeg.",
    problem: "Creating images and video with generative models, from the first visual concept to processing and assembling the final assets.",
    decision: "ComfyUI and RunningHub for production workflows, LoRA training for a consistent visual style, and Python and ffmpeg for automated processing.",
    outcome: "A production pipeline covering image and video generation, LoRA training and media processing.",
    features: [
      { title: "UGC content", description: "Short videos and ad creatives featuring AI characters for social media and brands." },
      { title: "Images", description: "Seedream 4.5, Nano Banana and custom ComfyUI workflows." },
      { title: "Video", description: "Kling, Wan 2.2 / Wan 3 and Seedance 2." },
      { title: "LoRA training", description: "Models adapted to the desired visual style." },
      { title: "Pipeline automation", description: "Python, ffmpeg, RunningHub and SeedVR2." },
    ],
  },
};

export function localizeProject(project: Project, lang: string): Project {
  return lang === "en" ? { ...project, ...projectsEn[project.slug] } : project;
}
