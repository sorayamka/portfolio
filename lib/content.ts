/**
 * Единый реестр контента. Всё, что можно поменять, живёт здесь.
 * Пустые массивы — это не баг: страницы показывают заглушку и ждут данных.
 */

export const site = {
  name: "Иван Севрюков",
  /** Латиница для бегущей строки первого экрана. */
  nameLatin: "Ivan Sevrukov",
  short: "Иван",
  role: "Telegram & AI developer",
  age: 20,
  city: "Москва",
  timezone: "MSK · UTC+3",
  coords: "55.7558°n 37.6173°e",
  version: "v1.0.0",
  status: "доступен для проектов",
  email: "sorayama228333@gmail.com",
  telegram: "https://t.me/sorayyama",
  github: "https://github.com/sorayamka",
  cv: "/cv",
} as const;

/** Считается один раз на билде: Cache Components не любит new Date() в рендере. */
export const YEAR = 2026;

/** Куда смотрит персонаж: на этом маршруте он спит. */
export type RouteSlug = "/" | "/work" | "/about" | "/contact";

export const nav = [
  { href: "/", label: "Главная", en: "Home" },
  { href: "/work", label: "Портфолио", en: "Portfolio" },
  { href: "/contact", label: "Контакты", en: "Contact" },
] as const;

/* ---------------------------------------------------------------- проекты */

export type Project = {
  slug: string;
  title: string;
  year: string;
  role: string;
  summary: string;
  stack: string[];
  /** Зачем проект и что в нём было непростого. Одна-две фразы. */
  problem: string;
  outcome: string;
  status: "live" | "source" | "archive";
  links: { label: string; href: string }[];
  group: "shipped" | "side" | "freelance" | "failed";
  featured: boolean;
  image: string;
  category: string;
  decision: string;
  features: { title: string; description: string }[];
};

export const projectGroups = [
  { id: "01", group: "shipped", title: "Удавшиеся проекты", hint: "то, что живёт в проде" },
  { id: "02", group: "side", title: "Сайд-проекты", hint: "ночные, для себя" },
  { id: "03", group: "freelance", title: "Фриланс", hint: "за деньги, по ТЗ" },
  { id: "04", group: "failed", title: "Неудавшиеся проекты", hint: "0 — и это нормально" },
] as const satisfies ReadonlyArray<{
  id: string;
  group: Project["group"];
  title: string;
  hint: string;
}>;

export const projects: Project[] = [
  {
    slug: "shtora", title: "Штора", year: "", role: "Swift / SwiftUI developer",
    category: "Native macOS", image: "/projects/shtora.webp",
    summary: "Интерфейс, который живёт в пустоте. Вырез MacBook как портал: пять модулей, одна мембрана, ноль лишних окон.",
    problem: "Лиминальное пространство между оборудованием и намерением. Там, где аппаратный вырез в корпусе принято считать дефектом, Штора видит портал. Это не приложение в привычном смысле, а мембрана: пространство, которое существует ровно до тех пор, пока оно нужно, а затем схлопывается обратно в ничто. Интерфейс, который не занимает место, а одалживает его у пустоты.",
    decision: "Прикосновение курсора пробуждает органику: плавные, пружинящие трансформации разворачивают панель из чёрной капли, как будто сам экран выдыхает. Внутри неё живёт пять модулей, и каждый отвечает за свой слой цифрового быта.",
    outcome: "Нативный Swift и SwiftUI, никакой оболочки и никакого компромисса: каждая анимация прорисована ради ощущения, что интерфейс весит ровно столько, сколько должен.",
    stack: ["Swift", "SwiftUI", "macOS"],
    features: [
      { title: "Хранилище фото", description: "Визуальная память, всегда в одном жесте от тебя." },
      { title: "Буфер обмена", description: "Хроника скопированного, археология последних минут." },
      { title: "ИИ-ассистент", description: "Разум, вызываемый без разрыва контекста." },
      { title: "Медиаплеер", description: "Саундтрек, не требующий смены окна." },
      { title: "Системный монитор", description: "Пульс машины в реальном времени, её дыхание в цифрах." },
    ], status: "archive", links: [], group: "side", featured: true,
  },
  {
    slug: "sora", title: "Sora", year: "", role: "Telegram & AI developer",
    category: "Telegram / AI platform", image: "/projects/sora.webp",
    summary: "AI-платформа автоматизации коммуникаций и продаж в Telegram. LLM-агенты, контекстная память, платежи и веб-панель оператора.",
    problem: "Асинхронная платформа для ведения клиентских диалогов, сопровождения воронки продаж и персонализированного взаимодействия с пользователями. Объединяет LLM-агентов, контекстную память, платёжные интеграции и веб-панель оператора.",
    decision: "Управление клиентским взаимодействием через конечный автомат с сохранением состояния, серверной валидацией переходов и типизированными ответами модели. Контекст диалога, профиль клиента и текущий этап воронки объединяются в динамические инструкции агента.",
    outcome: "Единая система автоматизации диалогов и продаж с ручным вмешательством оператора, журналированием ошибок, аналитикой и автоматическим восстановлением после сбоев.",
    stack: ["Python", "asyncio", "FastAPI", "Telethon / MTProto", "SQLite", "aiosqlite", "Pydantic", "HTTPX", "Jinja2", "JavaScript", "pytest"],
    features: [
      { title: "Stateful sales orchestration", description: "Управление этапами клиентского взаимодействия через конечный автомат с сохранением состояния и серверной валидацией переходов." },
      { title: "Dynamic prompt composition", description: "Динамическая сборка инструкций из профиля агента, истории переписки, клиентского контекста и текущего этапа воронки." },
      { title: "Structured LLM outputs", description: "Типизированные ответы модели с валидацией схемы и контролируемым выполнением действий." },
      { title: "Persistent customer profiling", description: "Автоматическое извлечение и сохранение клиентских данных с приоритетом ручных корректировок оператора." },
      { title: "Sales workflow automation", description: "Последовательные предложения, обработка отказов, повторные продажи и сопровождение клиента после покупки." },
      { title: "Payment integration & reconciliation", description: "Интеграция платёжных каналов, сопоставление поступлений с заказами и защита от повторного учёта." },
      { title: "Context-aware follow-ups", description: "Фоновые сценарии повторного контакта с учётом истории взаимодействия, активности клиента и расписания." },
      { title: "Concurrency control", description: "Сериализация обработки диалогов, объединение входящих сообщений и перегенерация ответов при изменении контекста." },
      { title: "Human-in-the-loop operations", description: "Операторская панель, индивидуальные правила общения, ручное вмешательство и передача диалога человеку." },
      { title: "Operational resilience", description: "Журналирование ошибок, аналитика, супервизор процессов и автоматическое восстановление после сбоев." },
    ], status: "archive", links: [], group: "side", featured: true,
  },
  {
    slug: "generative-media", title: "Generative Media Creator", year: "", role: "Generative Media Creator",
    category: "AI / UGC / Visual production", image: "/projects/generative.webp",
    summary: "AI-контент и UGC: изображения, видео и рекламные креативы. LoRA, ComfyUI и автоматизация обработки на Python и ffmpeg.",
    problem: "Создание изображений и видео с помощью генеративных моделей: от визуальной идеи до обработки и сборки готового материала.",
    decision: "ComfyUI и RunningHub для сборки пайплайнов, обучение LoRA для настройки визуального языка, Python и ffmpeg для автоматизации обработки.",
    outcome: "Генеративный медиапайплайн, объединяющий создание изображений, видео, обучение LoRA и обработку материала.",
    stack: ["Seedream 4.5", "Nano Banana", "Kling 3.0 / 4", "Wan 2.2 / 3", "Seedance 2", "ComfyUI", "SeedVR2", "RunningHub", "LoRA", "Python", "ffmpeg"],
    features: [
      { title: "UGC-контент", description: "Короткие видео и рекламные креативы с AI-персонажами для соцсетей и брендов." },
      { title: "Изображения", description: "Seedream 4.5, Nano Banana и кастомные workflow в ComfyUI." },
      { title: "Видео", description: "Kling, Wan 2.2 / Wan 3 и Seedance 2." },
      { title: "Обучение LoRA", description: "Настройка моделей под нужный визуальный язык." },
      { title: "Автоматизация пайплайна", description: "Python, ffmpeg, RunningHub и SeedVR2." },
    ], status: "archive", links: [], group: "freelance", featured: true,
  },
];

/* ---------------------------------------------------------------- навыки */

/** Не «87%», а честная градация: что защищаешь на собеседовании. */
export const skills: { primary: string[]; working: string[]; learning: string[] } = {
  primary: ["TypeScript", "React", "Next.js"],
  working: ["Three.js / WebGL", "Tailwind", "Node.js"],
  learning: [],
};

/* ---------------------------------------------------------------- опыт */

export type Role = {
  org: string;
  role: string;
  period: string;
  /** Что изменилось, а не что делал. */
  impact: string;
};

export const experience: Role[] = [];

/* -------------------------------------------------------------- биография */

export type Commit = {
  hash: string;
  date: string;
  branch: "main" | "side" | "work";
  subject: string;
};

/** git log --graph по жизни. Пусто — терминал покажет заглушку. */
export const commits: Commit[] = [];

/* --------------------------------------------------------------- написание */

export type Post = { slug: string; title: string; date: string; readTime: string };
export const posts: Post[] = [];

/* ------------------------------------------------------------------- прочее */

export const ticker = [
  "interface",
  "motion",
  "3d",
  "shader",
  "typography",
  "systems",
  "performance",
  "type",
] as const;

export const hero = {
  comment: "// компилятор это игнорирует",
  lede: "Разработчик из Москвы. Собираю интерфейсы, которые не выглядят сгенерированными.",
} as const;

export function featured() {
  return projects.filter((p) => p.featured).slice(0, 3);
}

export function bySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function byGroup(group: Project["group"]) {
  return projects.filter((p) => p.group === group);
}
