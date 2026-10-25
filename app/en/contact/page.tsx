import { ContactPage } from "@/components/contact-page";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("/contact", "Contact — Ivan Sevrukov", "Get in touch via Telegram, email or GitHub to discuss Telegram bots, AI integrations, automation and development.", "en");
export default function Page() { return <ContactPage />; }
