import type { Locale } from "@/app/[lang]/dictionaries";

export type AboutPage = {
  title: string;
  lead: string;
  sections: {
    heading: string;
    paragraphs?: string[];
    items?: { title?: string; text: string }[];
    closing?: string;
  }[];
};

export const about: Record<Locale, AboutPage> = {
  de: {
    title: "Über uns",
    lead: "Durchdachte Kreationen für die alltäglichen Momente, besonderen Meilensteine und wertvollen Erinnerungen, die das Leben mit Katzen so besonders machen.",
    sections: [
      {
        heading: "Die Geschichte hinter Oh Paw Studio",
        paragraphs: [
          "Oh Paw Studio entstand aus einer spontanen Idee: ein Erinnerungsbuch für das erste Jahr mit einem Kitten zu gestalten.",
          "Der Auslöser war eine persönliche Erfahrung. Beim Ausfüllen eines gesponserten Kitten-Erinnerungsbuchs fiel mir auf, dass einige der Fragen nicht zu unseren Erlebnissen passten und nicht zu der Art, wie ich das Leben mit meiner Katze festhalten wollte.",
          "Für mich ist das erste Jahr mit einer Katze etwas ganz Besonderes: eine intensive Zeit voller erster Erlebnisse, Veränderungen, kleiner Entdeckungen und emotionaler Momente. Daraus entstand der Wunsch nach einem Erinnerungsbuch, das persönlicher, durchdachter und wirklich auf das Leben mit Katzen abgestimmt ist.",
          "Da ich bereits zuvor verschiedene digitale Produkte rund um Katzen erstellt hatte, wuchs die Idee nach und nach weiter. So entstand die Vision von Oh Paw Studio: eine kreative Marke für durchdachte digitale Produkte für Katzenmenschen.",
        ],
      },
      {
        heading: "Wofür wir stehen",
        paragraphs: [
          "Wir verbinden sinnvolle Inhalte, praktische Funktionalität und eine liebevolle, persönliche Atmosphäre. Jedes Produkt soll einen klaren Zweck erfüllen und im Alltag wirklich hilfreich sein, nicht nur schön aussehen.",
          "Unsere Produkte sind in erster Linie dafür gemacht, digital ausgefüllt zu werden. Du kannst sie aber jederzeit auch zu Hause ausdrucken.",
        ],
      },
      {
        heading: "Die Bedeutung von Erinnerungen",
        paragraphs: [
          "Nicht nur die großen Meilensteine machen das Leben mit einer Katze besonders, sondern auch die vielen kleinen Momente:",
        ],
        items: [
          { text: "Vertraute Routinen und gemeinsame Gewohnheiten" },
          { text: "Lustige Eigenheiten und individuelle Charakterzüge" },
          { text: "Erste Erlebnisse und neue Entdeckungen" },
          { text: "Kleine Entwicklungsschritte" },
          { text: "Besondere Anlässe und gemeinsame Abenteuer" },
          {
            text: "Ganz gewöhnliche Tage, die rückblickend zu wertvollen Erinnerungen werden",
          },
        ],
        closing:
          "Wir möchten dazu inspirieren, diese Momente bewusster wahrzunehmen, festzuhalten und Jahre später wieder aufleben zu lassen.",
      },
      {
        heading: "Für alle Katzenmenschen",
        paragraphs: [
          "Oh Paw Studio begleitet dich durch alle Phasen mit deiner Katze: von den ersten Tagen im neuen Zuhause über Alltag, Beschäftigung und Pflege bis zu besonderen Meilensteinen. Ob du gerade dein erstes Kitten willkommen heißt oder schon seit Jahrzehnten mit Katzen lebst: Es soll für dich etwas Passendes geben.",
        ],
      },
      {
        heading: "Was uns wichtig ist",
        items: [
          {
            title: "Liebevoll und herzlich",
            text: "Eine warme Marke, die die besondere Beziehung zwischen Mensch und Katze wertschätzt.",
          },
          {
            title: "Durchdacht und praktisch",
            text: "Sorgfältig entwickelte Inhalte mit klarem Zweck und echtem Mehrwert.",
          },
          {
            title: "Persönlich und emotional",
            text: "Produkte, die an eigene Erlebnisse anknüpfen und Raum für persönliche Erinnerungen schaffen.",
          },
          {
            title: "Hochwertig und stilvoll",
            text: "Ein bewusst gestalteter Auftritt mit ausgewählter Typografie und Liebe zum Detail.",
          },
          {
            title: "Kreativ und inspirierend",
            text: "Ideen, die dazu anregen, das Leben mit Katzen auf neue Weise zu entdecken.",
          },
          {
            title: "Zeitlos und natürlich",
            text: "Eine ruhige Ästhetik, die nicht von kurzlebigen Trends abhängt.",
          },
        ],
      },
    ],
  },
  en: {
    title: "About",
    lead: "Thoughtfully made for the everyday moments, special milestones and treasured memories that make life with cats so special.",
    sections: [
      {
        heading: "The story behind Oh Paw Studio",
        paragraphs: [
          "Oh Paw Studio began with a spontaneous idea: to design a memory book for the first year with a kitten.",
          "It was sparked by a personal experience. While filling in a sponsored kitten memory book, I noticed that some of the questions didn't fit our experiences, or the way I wanted to capture life with my cat.",
          "To me, the first year with a cat is something truly special: an intense time full of firsts, changes, small discoveries and emotional moments. That led to the wish for a memory book that is more personal, more thoughtful and truly made for life with cats.",
          "Since I had already created several digital products about cats, the idea kept growing. That is how the vision of Oh Paw Studio came about: a creative brand for thoughtful digital products for cat lovers.",
        ],
      },
      {
        heading: "What we stand for",
        paragraphs: [
          "We combine meaningful content, practical function and a loving, personal atmosphere. Every product should have a clear purpose and be genuinely helpful in everyday life, not just look good.",
          "Our products are designed first and foremost to be filled in digitally. You can also print them at home at any time.",
        ],
      },
      {
        heading: "The meaning of memories",
        paragraphs: [
          "It isn't only the big milestones that make life with a cat special, but also the many small moments:",
        ],
        items: [
          { text: "Familiar routines and shared habits" },
          { text: "Funny quirks and individual character" },
          { text: "First experiences and new discoveries" },
          { text: "Small steps of development" },
          { text: "Special occasions and shared adventures" },
          { text: "Ordinary days that become treasured memories in hindsight" },
        ],
        closing:
          "We want to inspire you to notice these moments more consciously, to capture them, and to bring them back to life years later.",
      },
      {
        heading: "For all cat lovers",
        paragraphs: [
          "Oh Paw Studio accompanies you through every phase with your cat: from the first days in a new home through everyday life, enrichment and care to special milestones. Whether you are welcoming your first kitten or have lived with cats for decades, there should be something that fits you.",
        ],
      },
      {
        heading: "What matters to us",
        items: [
          {
            title: "Loving and warm",
            text: "A warm brand that values the special bond between people and cats.",
          },
          {
            title: "Thoughtful and practical",
            text: "Carefully developed content with a clear purpose and real value.",
          },
          {
            title: "Personal and emotional",
            text: "Products that connect to your own experiences and leave room for personal memories.",
          },
          {
            title: "High quality and stylish",
            text: "A deliberately designed look with chosen typography and attention to detail.",
          },
          {
            title: "Creative and inspiring",
            text: "Ideas that encourage you to discover life with cats in new ways.",
          },
          {
            title: "Timeless and natural",
            text: "A calm aesthetic that doesn't depend on short-lived trends.",
          },
        ],
      },
    ],
  },
};
