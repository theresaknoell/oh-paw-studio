// Bilder der Website. Solange ein Eintrag `null` ist, zeigt die Seite einen ruhigen Platzhalter.
// Aktuell sind Illustrationen als Platzhalter eingetragen (Erzeugung: scripts/make-placeholders.py).
// So tauschst du sie gegen Fotos: Datei in `public/images/` legen (z. B. `public/images/hero.jpg`),
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
  hero: null, // bewusst: Logo bleibt als Hero-Platzhalter auf der Startseite
  story: {
    src: "/images/story.jpg",
    alt: { de: "Illustration: Eine Katze schläft neben einem aufgeschlagenen Buch und einer Tasse", en: "Illustration: a cat asleep beside an open book and a mug" },
  },
  aboutPortrait: {
    src: "/images/about.jpg",
    alt: { de: "Illustration: Eine Katze liegt auf einem Bücherstapel unter einem Bogen", en: "Illustration: a cat resting on a stack of books under an arch" },
  },
  worlds: {
    start: {
      src: "/images/worlds/start.jpg",
      alt: { de: "Illustration: Ein Kitten schaut aus einem Karton", en: "Illustration: a kitten peeking out of a box" },
    },
    care: {
      src: "/images/worlds/care.jpg",
      alt: { de: "Illustration: Ein Kalender mit Haken neben einer Katze", en: "Illustration: a calendar with check marks next to a cat" },
    },
    home: {
      src: "/images/worlds/home.jpg",
      alt: { de: "Illustration: Eine Katze liegt auf einem Regal in einem gemütlichen Zimmer", en: "Illustration: a cat lying on a shelf in a cosy room" },
    },
    memories: {
      src: "/images/worlds/memories.jpg",
      alt: { de: "Illustration: Polaroids mit Pfotenabdrücken und eine schlafende Katze", en: "Illustration: polaroids with paw prints and a sleeping cat" },
    },
  },
};
