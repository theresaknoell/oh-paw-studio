// Zuordnung der deutschen und englischen Gumroad-Produkte, Empfehlungen und passende Beiträge.
// Neue Produkte hier ergänzen. Die Slugs entsprechen `slug` in products.ts.
import type { Locale } from "@/app/[lang]/dictionaries";

export type Phase = "kitten" | "adult" | "senior" | "multi";
export const phases: Phase[] = ["kitten", "adult", "senior", "multi"];

export type ProductPair = {
  id: string;
  slugs: Record<Locale, string>;
  // Lebensphasen, für die das Produkt passt ("all" = für jede Phase)
  phases: Phase[] | "all";
  // Empfehlungen („Dazu passt“), höchstens zwei, als `id` anderer Paare
  related: string[];
  // Passender Blogbeitrag (deutscher Slug; der englische wird über `pair` im Beitrag gefunden)
  post?: string;
};

export const productPairs: ProductPair[] = [
  { id: "memory-book", slugs: { de: "erstes-jahr-mit-dir", en: "first-year-with-you" }, phases: ["kitten"], related: ["kitten-care"], post: "idee-erinnerungsbuch" },
  { id: "care-journal", slugs: { de: "the-cat-care-journal-de", en: "the-cat-care-journal-en" }, phases: "all", related: ["vet-records"], post: "tierarztunterlagen-ordnen" },
  { id: "new-cat-parent", slugs: { de: "the-new-cat-parent-bundle-de", en: "the-new-cat-parent-bundle-en" }, phases: ["kitten"], related: ["home"], post: "einzug-checkliste-kitten" },
  { id: "home", slugs: { de: "the-cat-home-collection-de", en: "the-cat-home-colletion-en" }, phases: "all", related: ["enrichment"], post: "rueckzugsorte-fuer-katzen" },
  { id: "enrichment", slugs: { de: "the-cat-enrichment-collection-de", en: "the-cat-enrichment-collection-en" }, phases: "all", related: ["home"], post: "wohnungskatze-beschaeftigen" },
  { id: "kitten-care", slugs: { de: "the-kitten-care-edition-de", en: "the-kitten-care-edition-en" }, phases: ["kitten"], related: ["vet-records", "memory-book"], post: "einzug-checkliste-kitten" },
  { id: "senior-care", slugs: { de: "the-senior-cat-edition-de", en: "the-senior-cat-care-edtion-en" }, phases: ["senior"], related: ["vet-records", "care-journal"], post: "tierarztunterlagen-ordnen" },
  { id: "multi-cat", slugs: { de: "the-multi-cat-household-pack-de", en: "the-multi-cat-household-pack-en" }, phases: ["multi"], related: ["care-journal"], post: "mehrkatzenhaushalt-organisieren" },
  { id: "vet-records", slugs: { de: "the-veterinary-records-pack-de", en: "the-veterinary-records-pack-en" }, phases: "all", related: ["care-journal"], post: "tierarztunterlagen-ordnen" },
];

export const pairOf = (slug: string) =>
  productPairs.find((p) => p.slugs.de === slug || p.slugs.en === slug);

export const counterpartSlug = (slug: string, lang: Locale) => {
  const pair = pairOf(slug);
  return pair ? pair.slugs[lang === "de" ? "en" : "de"] : undefined;
};

// Für den Sprachumschalter: Slug → Slug der anderen Sprache
export const productSlugMap: Record<string, string> = Object.fromEntries(
  productPairs.flatMap((p) => [
    [p.slugs.de, p.slugs.en],
    [p.slugs.en, p.slugs.de],
  ]),
);

export const phasesOf = (slug: string): Phase[] | "all" => pairOf(slug)?.phases ?? "all";
