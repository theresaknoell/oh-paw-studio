import type { Locale } from "@/app/[lang]/dictionaries";

export type PawSpacePage = {
  title: string;
  lead: string;
  status: string;
  features: { title: string; text: string }[];
  roadmapTitle: string;
  roadmap: { title: string; text: string }[];
  waitlist: string;
};

export const pawSpace: Record<Locale, PawSpacePage> = {
  de: {
    title: "My Paw Space",
    lead: "Dein persönlicher digitaler Ort für das Leben mit deiner Katze: Produkte, Erinnerungen und Alltag an einer Stelle.",
    status: "In Planung",
    features: [
      {
        title: "Meine Katzen",
        text: "Ein Profil für jede Katze mit Foto, Geburtstag und der Geschichte eures Zusammenlebens.",
      },
      {
        title: "Erinnerungen",
        text: "Halte erste Male, Meilensteine und ganz gewöhnliche Tage mit Text und Fotos auf einer persönlichen Zeitachse fest.",
      },
      {
        title: "Meine Produkte",
        text: "Alle deine Oh-Paw-Studio-Produkte übersichtlich an einem Ort.",
      },
    ],
    roadmapTitle: "So könnte es wachsen",
    roadmap: [
      {
        title: "Zuerst",
        text: "Persönlicher Bereich mit Katzenprofilen, Erinnerungen und deinen Produkten.",
      },
      {
        title: "Danach",
        text: "Digital ausfüllbare Vorlagen und optionale Erinnerungen an Termine.",
      },
      {
        title: "Vielleicht später",
        text: "Ein Raum für Austausch und Inspiration unter Katzenmenschen.",
      },
    ],
    waitlist:
      "Du möchtest dabei sein? Bald kannst du dich hier auf die Warteliste setzen.",
  },
  en: {
    title: "My Paw Space",
    lead: "Your personal digital place for life with your cat: products, memories and everyday life in one spot.",
    status: "In planning",
    features: [
      {
        title: "My cats",
        text: "A profile for each cat with a photo, birthday and the story of your life together.",
      },
      {
        title: "Memories",
        text: "Capture firsts, milestones and perfectly ordinary days with text and photos on a personal timeline.",
      },
      {
        title: "My products",
        text: "All your Oh Paw Studio products neatly in one place.",
      },
    ],
    roadmapTitle: "How it could grow",
    roadmap: [
      {
        title: "First",
        text: "A personal area with cat profiles, memories and your products.",
      },
      {
        title: "Next",
        text: "Templates you can fill in digitally and optional reminders for appointments.",
      },
      {
        title: "Maybe later",
        text: "A space for exchange and inspiration among cat lovers.",
      },
    ],
    waitlist:
      "Want to be part of it? Soon you will be able to join the waitlist here.",
  },
};
