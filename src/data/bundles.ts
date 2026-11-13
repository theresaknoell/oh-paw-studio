// Bundles: Sobald ein Bundle bei Gumroad angelegt ist, den Link bei `url` eintragen.
import type { Locale } from "@/app/[lang]/dictionaries";
import { products } from "./products";

export type Bundle = {
  id: string;
  title: Record<Locale, string>;
  audience: Record<Locale, string>;
  text: Record<Locale, string>;
  // Produkt-Slugs je Sprache
  items: Record<Locale, string[]>;
  priceEur: number;
  url: Record<Locale, string | null>;
};

export const bundles: Bundle[] = [
  {
    id: "kitten-year",
    title: { de: "Kitten-Jahr", en: "Kitten Year" },
    audience: { de: "Für Kitten-Eltern", en: "For new kitten parents" },
    text: { de: "Von den ersten Tagen über Tierarztunterlagen bis zu den schönsten ersten Malen.", en: "From the first days through vet records to the most precious firsts." },
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
    audience: { de: "Für ein schönes Zuhause", en: "For a cosy home" },
    text: { de: "Ein Zuhause, in dem ihr euch beide wohlfühlt, plus Ideen für mehr Abwechslung.", en: "A home where you both feel at ease, plus ideas for more variety." },
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
    audience: { de: "Für Senior-Katzen", en: "For senior cats" },
    text: { de: "Beobachtungen festhalten, Tierarztbesuche vorbereiten und den Alltag ruhig begleiten.", en: "Note observations, prepare vet visits and support everyday life calmly." },
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
    audience: { de: "Für Mehrkatzen-Haushalte", en: "For multi-cat homes" },
    text: { de: "Ein Überblick für alle Katzen unter einem Dach und feste Routinen für den Alltag.", en: "One overview for every cat under one roof and steady routines for everyday life." },
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
    percent: Math.round(((total - bundle.priceEur) / total) * 100),
    audience: bundle.audience[lang],
    text: bundle.text[lang],
    url: bundle.url[lang],
  };
}
