import { Home } from "@/components/home";
import { Footer } from "@/components/footer";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("/", "Ivan Sevrukov — Telegram bots & AI development", "Python developer building Telegram bots, AI integrations, Supabase services and generative media. Explore projects and get in touch.", "en");
export default function Page() { return <><Home /><Footer /></>; }
