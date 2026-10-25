import { WorkPage } from "@/components/work-page";
import { Footer } from "@/components/footer";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/work", "Портфолио — Иван Севрюков", "Приложения, Telegram-боты, AI-контент и UGC: Штора, Sora и Generative Media Creator. Описание проектов, стек и примеры работ.");

export default function Page() {
  return (
    <>
      <WorkPage />
      <Footer />
    </>
  );
}
