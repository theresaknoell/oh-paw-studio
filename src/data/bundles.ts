// Bundles: Sobald ein Bundle bei Gumroad angelegt ist, den Link bei `url` eintragen.
import type { Locale } from "@/app/[lang]/dictionaries";
import { products } from "./products";

export type Bundle = {
  id: string;
  title: Record<Locale, string>;
  // Produkt-Slugs je Sprache
  items: Record<Locale, string[]>;
  priceEur: number;
  url: Record<Locale, string | null>;
};

export const bundles: Bundle[] = [
  {
    id: "kitten-year",
    title: { de: "Kitten-Jahr", en: "Kitten Year" },
    items: {
      de: ["the-kitten-care-edition-de", "the-veterinary-records-pack-de", "erstes-jahr-mit-dir"],
      en: ["the-kitten-care-edition-en", "the-veterinary-records-pack-en", "first-year-with-you"],
    },
    priceEur: 29.9,
    url: { de: null, en: null },
  },
  {
    id: "home-play",
    title: { de: "Zuhause & Spiel", en: "Home & Play" },
    items: {
      de: ["the-cat-home-collection-de", "the-cat-enrichment-collection-de"],
      en: ["the-cat-home-colletion-en", "the-cat-enrichment-collection-en"],
    },
    priceEur: 31.9,
    url: { de: null, en: null },
  },
  {
    id: "senior-companion",
    title: { de: "Senior-Begleitung", en: "Senior Companion" },
    items: {
      de: ["the-senior-cat-edition-de", "the-veterinary-records-pack-de", "the-cat-care-journal-de"],
      en: ["the-senior-cat-care-edtion-en", "the-veterinary-records-pack-en", "the-cat-care-journal-en"],
    },
    priceEur: 29.9,
    url: { de: null, en: null },
  },
  {
    id: "multi-cat-everyday",
    title: { de: "Mehrkatzen-Alltag", en: "Multi-Cat Everyday" },
    items: {
      de: ["the-multi-cat-household-pack-de", "the-cat-care-journal-de"],
      en: ["the-multi-cat-household-pack-en", "the-cat-care-journal-en"],
    },
    priceEur: 21.9,
    url: { de: null, en: null },
  },
];

export function bundleView(bundle: Bundle, lang: Locale) {
  const items = bundle.items[lang]
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const total = items.reduce((sum, p) => sum + p.priceEur, 0);
  return {
    title: bundle.title[lang],
    items,
    total,
    price: bundle.priceEur,
    saving: total - bundle.priceEur,
    url: bundle.url[lang],
  };
}
