import type { Metadata } from "next";
import { WorkPage } from "@/components/work-page";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Портфолио",
  description:
    "Работы и интерфейсы Ивана Севрюкова: приложения, Telegram-боты, AI-контент и UGC.",
  alternates: { canonical: "/work" },
  openGraph: { title: "Портфолио · Иван Севрюков", url: "/work" },
};

export default function Page() {
  return (
    <>
      <WorkPage />
      <Footer />
    </>
  );
}
