import { ContactPage } from "@/components/contact-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/contact", "Контакты — Иван Севрюков", "Связаться с Иваном Севрюковым: Telegram, электронная почта и GitHub. Обсуждение Telegram-ботов, AI-интеграций и разработки.");

export default function Page() {
  return <ContactPage />;
}
