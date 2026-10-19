import type { Metadata } from "next";
import { ContactPage } from "@/components/contact-page";

export const metadata: Metadata = {
  title: "Контакты",
  description:
    "Telegram, почта и GitHub Ивана Севрюкова. Открыт к проектам, Москва, MSK (UTC+3).",
  alternates: { canonical: "/contact" },
  openGraph: { title: "Контакты · Иван Севрюков", url: "/contact" },
};

export default function Page() {
  return <ContactPage />;
}
