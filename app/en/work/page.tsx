import { WorkPage } from "@/components/work-page";
import { Footer } from "@/components/footer";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("/work", "Portfolio — Ivan Sevrukov", "Native apps, Telegram automation, AI content and UGC. Explore Shtora, Sora and Generative Media Creator: approach, tools and examples.", "en");
export default function Page() { return <><WorkPage /><Footer /></>; }
