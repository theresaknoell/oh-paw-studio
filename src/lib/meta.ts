import type { Metadata } from "next";
import type { Locale } from "@/app/[lang]/dictionaries";
import { pageMeta, pagePath, type PageKey } from "@/data/meta";

// Verweise auf die Sprachversionen (hreflang) und die eigene Adresse (canonical).
export function alternates(lang: Locale, paths?: Partial<Record<Locale, string>>): Metadata["alternates"] {
  const p = paths ?? {};
  const de = p.de ?? "";
  const en = p.en ?? "";
  return {
    canonical: `/${lang}${lang === "de" ? de : en}`,
    languages: { de: `/de${de}`, en: `/en${en}` },
  };
}

export function pageMetadata(lang: Locale, key: PageKey): Metadata {
  const m = pageMeta[key][lang];
  const path = pagePath[key];
  return {
    // Die Startseite hat bereits einen vollständigen Titel
    title: key === "home" ? { absolute: m.title } : m.title,
    description: m.description,
    alternates: alternates(lang, { de: path, en: path }),
    openGraph: { title: m.title, description: m.description },
  };
}
