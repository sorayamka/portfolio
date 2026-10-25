"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";
export default function LocalizedLink(props: ComponentProps<typeof Link>) {
  const path = usePathname();
  const en = path === "/en" || path.startsWith("/en/");
  const href = typeof props.href === "string" && props.href.startsWith("/") && !props.href.startsWith("/en") && en ? `/en${props.href}` : props.href;
  return <Link {...props} href={href} />;
}
