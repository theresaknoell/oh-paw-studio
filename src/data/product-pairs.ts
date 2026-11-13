// Zuordnung der deutschen und englischen Gumroad-Produkte, Empfehlungen und passende Beiträge.
// Neue Produkte hier ergänzen. Die Slugs entsprechen `slug` in products.ts.
import type { Locale } from "@/app/[lang]/dictionaries";

export type Phase = "kitten" | "adult" | "senior" | "multi";
export const phases: Phase[] = ["kitten", "adult", "senior", "multi"];

export type ProductPair = {
  id: string;
  // Nicht jedes Produkt gibt es in beiden Sprachen
  slugs: Partial<Record<Locale, string>>;
  // Lebensphasen, für die das Produkt passt ("all" = für jede Phase)
  phases: Phase[] | "all";
  // Empfehlungen („Dazu passt“), höchstens zwei, als `id` anderer Paare
  related: string[];
  // Passender Blogbeitrag (deutscher Slug; der englische wird über `pair` im Beitrag gefunden)
  post?: string;
};

export const productPairs: ProductPair[] = [
  { id: "memory-book", slugs: { de: "erstes-jahr-mit-dir", en: "first-year-with-you" }, phases: ["kitten"], related: ["kitten-care"], post: "idee-erinnerungsbuch" },
  { id: "care-journal", slugs: { de: "the-cat-care-journal-de", en: "the-cat-care-journal-en" }, phases: "all", related: ["vet-records", "care-planner"], post: "tierarztunterlagen-ordnen" },
  { id: "new-cat-parent", slugs: { de: "the-new-cat-parent-bundle-de", en: "the-new-cat-parent-bundle-en" }, phases: ["kitten"], related: ["home"], post: "einzug-checkliste-kitten" },
  { id: "home", slugs: { de: "the-cat-home-collection-de", en: "the-cat-home-colletion-en" }, phases: "all", related: ["enrichment"], post: "rueckzugsorte-fuer-katzen" },
  { id: "enrichment", slugs: { de: "the-cat-enrichment-collection-de", en: "the-cat-enrichment-collection-en" }, phases: "all", related: ["home", "diy-book"], post: "wohnungskatze-beschaeftigen" },
  { id: "kitten-care", slugs: { de: "the-kitten-care-edition-de", en: "the-kitten-care-edition-en" }, phases: ["kitten"], related: ["vet-records", "memory-book"], post: "kitten-entwicklung-festhalten" },
  { id: "senior-care", slugs: { de: "the-senior-cat-edition-de", en: "the-senior-cat-care-edtion-en" }, phases: ["senior"], related: ["vet-records", "care-journal"], post: "senior-katze-veraenderungen-bemerken" },
  { id: "multi-cat", slugs: { de: "the-multi-cat-household-pack-de", en: "the-multi-cat-household-pack-en" }, phases: ["multi"], related: ["care-journal"], post: "mehrkatzenhaushalt-organisieren" },
  { id: "vet-records", slugs: { de: "the-veterinary-records-pack-de", en: "the-veterinary-records-pack-en" }, phases: "all", related: ["care-journal"], post: "tierarztunterlagen-ordnen" },
  { id: "seasonal-enrichment", slugs: { de: "the-seasonal-enrichment-collection-de", en: "the-seasonal-enrichment-collection-en" }, phases: "all", related: ["enrichment", "diy-book"], post: "wohnungskatze-beschaeftigen" },
  { id: "thirty-days", slugs: { de: "30-days-of-cat-enrichment-de", en: "30-days-of-cat-enrichment-en" }, phases: "all", related: ["enrichment", "activity-planner"], post: "wohnungskatze-beschaeftigen" },
  { id: "activity-planner", slugs: { de: "th-indoor-cat-activity-planner-de", en: "the-indoor-cat-activity-planner-en" }, phases: "all", related: ["enrichment", "thirty-days"], post: "wohnungskatze-beschaeftigen" },
  { id: "diy-book", slugs: { de: "the-diy-enrichment-book-de", en: "the-diy-enrichment-book-en" }, phases: "all", related: ["enrichment", "seasonal-enrichment"], post: "wohnungskatze-beschaeftigen" },
  { id: "care-planner", slugs: { en: "the-printable-care-planner-en" }, phases: "all", related: ["care-journal", "vet-records"] },
];

export const pairOf = (slug: string) =>
  productPairs.find((p) => p.slugs.de === slug || p.slugs.en === slug);

export const counterpartSlug = (slug: string, lang: Locale) => {
  const pair = pairOf(slug);
  return pair ? pair.slugs[lang === "de" ? "en" : "de"] : undefined;
};

// Für den Sprachumschalter: Slug → Slug der anderen Sprache
export const productSlugMap: Record<string, string> = Object.fromEntries(
  productPairs.flatMap((p) =>
    p.slugs.de && p.slugs.en
      ? [
          [p.slugs.de, p.slugs.en],
          [p.slugs.en, p.slugs.de],
        ]
      : [],
  ),
);

export const phasesOf = (slug: string): Phase[] | "all" => pairOf(slug)?.phases ?? "all";
