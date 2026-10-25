import { Home } from "@/components/home";
import { Footer } from "@/components/footer";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("/", "Иван Севрюков — Telegram-боты и AI-разработка", "Python-разработчик из Москвы: Telegram-боты, AI API, Supabase, автоматизация и генеративный контент. Проекты и контакты.");

export default function Page() {
  return (
    <>
      <Home />
      <Footer />
    </>
  );
}
