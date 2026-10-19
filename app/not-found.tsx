import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative z-10 flex min-h-svh flex-col justify-center px-5 pt-32 pb-24 sm:px-8">
      <p className="font-mono text-[0.8rem] text-amber">$</p>
      <h1 className="display-xl mt-4">404</h1>
      <p className="mt-6 max-w-[30rem] text-[0.98rem] leading-[1.6] text-fog">
        Такой страницы нет. Возможно, проект ещё не опубликован — или ссылка устарела.
      </p>
      <ul className="mt-10 flex flex-col gap-2">
        {[
          { href: "/", label: "главная" },
          { href: "/work", label: "работа" },
          { href: "/contact", label: "контакты" },
        ].map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="font-mono text-[0.85rem] text-fog transition-colors duration-300 hover:text-amber"
            >
              → {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
