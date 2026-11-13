// Fotos der Website. Solange ein Eintrag `null` ist, zeigt die Seite einen ruhigen Platzhalter.
// So fügst du ein Foto ein: Datei in `public/images/` legen (z. B. `public/images/hero.jpg`),
// dann hier den Pfad und den Alternativtext eintragen. Siehe docs/bilder-einfuegen.md.
import type { Locale } from "@/app/[lang]/dictionaries";
import type { World } from "./products";

export type SiteImage = { src: string; alt: Record<Locale, string> };

export const siteImages: {
  hero: SiteImage | null; // Hochformat 4:5, mind. 1200 × 1500 px
  story: SiteImage | null; // 4:3, mind. 1200 × 900 px
  aboutPortrait: SiteImage | null; // Hochformat 4:5, mind. 1200 × 1500 px (Seite „Über uns“)
  worlds: Record<World, SiteImage | null>; // je 4:3, mind. 1200 × 900 px
} = {
  hero: null,
  story: null,
  aboutPortrait: null,
  worlds: { start: null, care: null, home: null, memories: null },
};
