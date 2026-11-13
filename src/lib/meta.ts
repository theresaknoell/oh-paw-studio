import type { Metadata } from "next";
import type { Locale } from "@/app/[lang]/dictionaries";
import { pageMeta, pagePath, type PageKey } from "@/data/meta";

// Verweise auf die Sprachversionen (hreflang) und die eigene Adresse (canonical).
// Vorschaubild für geteilte Links. Muss in jedem openGraph-Objekt stehen, sonst überschreibt die Seite das Bild aus dem Layout.
export const ogImages = [{ url: "/og-image.png", width: 1200, height: 630 }];

export function alternates(lang: Locale, paths?: Partial<Record<Locale, string>>): Metadata["alternates"] {
  const p = paths ?? {};
  const de = p.de ?? "";
  const en = p.en ?? "";
  return {
    canonical: `/${lang}${lang === "de" ? de : en}`,
    languages: { de: `/de${de}`, en: `/en${en}`, "x-default": `/de${de}` },
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
    openGraph: { title: m.title, description: m.description, siteName: "Oh Paw Studio", type: "website", locale: lang === "de" ? "de_DE" : "en_US", images: ogImages },
    twitter: { card: "summary_large_image" },
  };
}
