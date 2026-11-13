"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LanguageSwitch({
  lang,
  label,
}: {
  lang: "de" | "en";
  label: string;
}) {
  const pathname = usePathname();
  const other = lang === "de" ? "en" : "de";
  const href = pathname.replace(/^\/(de|en)(?=\/|$)/, `/${other}`);
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
