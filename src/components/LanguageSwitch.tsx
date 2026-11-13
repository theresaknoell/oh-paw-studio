"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Zielseite in der anderen Sprache. Produkte und Beiträge haben je Sprache eigene Adressen;
// fehlt ein Gegenstück, führt der Umschalter zur Übersicht statt in eine Fehlerseite.
export default function LanguageSwitch({
  lang,
  label,
  slugMap,
}: {
  lang: "de" | "en";
  label: string;
  slugMap: { products: Record<string, string>; posts: Record<string, string> };
}) {
  const pathname = usePathname();
  const other = lang === "de" ? "en" : "de";
  const swap = (p: string) => p.replace(/^\/(de|en)(?=\/|$)/, `/${other}`);

  let href = swap(pathname);
  const m = pathname.match(/^\/(?:de|en)\/(products|blog)\/([^/]+)$/);
  if (m) {
    const kind = m[1] === "products" ? "products" : "posts";
    const target = slugMap[kind][m[2]];
    href = target ? `/${other}/${m[1]}/${target}` : `/${other}/${m[1]}`;
  }

  return (
    <Link
      href={href}
      hrefLang={other}
      className="text-sm text-olive-deep underline-offset-4 hover:underline"
    >
      {label}
    </Link>
  );
}
