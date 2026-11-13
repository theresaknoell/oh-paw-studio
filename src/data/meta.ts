// Seitentitel und Beschreibungen für Suchmaschinen (jede Seite einzeln, je Sprache).
import type { Locale } from "@/app/[lang]/dictionaries";

export type PageKey = "home" | "products" | "bundles" | "blog" | "about" | "pawSpace" | "imprint" | "privacy";

export const pagePath: Record<PageKey, string> = {
  home: "",
  products: "/products",
  bundles: "/bundles",
  blog: "/blog",
  about: "/about",
  pawSpace: "/my-paw-space",
  imprint: "/impressum",
  privacy: "/datenschutz",
};

export const pageMeta: Record<PageKey, Record<Locale, { title: string; description: string }>> = {
  home: {
    de: { title: "Oh Paw Studio – digitale Begleiter für das Leben mit Katzen", description: "Durchdacht gestaltete Planer, Erinnerungsbücher und Vorlagen für Alltag, Pflege und Erinnerungen mit deiner Katze. Sofort-Download." },
    en: { title: "Oh Paw Studio – digital companions for life with cats", description: "Thoughtfully designed planners, memory books and templates for everyday life, care and memories with your cat. Instant download." },
  },
  products: {
    de: { title: "Shop", description: "Planer, Erinnerungsbücher und Vorlagen für Katzenmenschen: für den Start, Alltag und Pflege, Zuhause und Beschäftigung sowie Erinnerungen." },
    en: { title: "Shop", description: "Planners, memory books and templates for cat lovers: getting started, everyday care, home and enrichment, and memories." },
  },
  bundles: {
    de: { title: "Bundles", description: "Passende Produkte gemeinsam günstiger: Kitten-Jahr, Zuhause & Spiel, Senior-Begleitung und Mehrkatzen-Alltag." },
    en: { title: "Bundles", description: "Matching products together for less: Kitten Year, Home & Play, Senior Companion and Multi-Cat Everyday." },
  },
  blog: {
    de: { title: "Inspiration", description: "Ideen und Hilfe für das Leben mit Katzen: Einzug, Beschäftigung, Pflege, Zuhause und das Festhalten schöner Momente." },
    en: { title: "Inspiration", description: "Ideas and help for life with cats: moving in, enrichment, care, home and capturing beautiful moments." },
  },
  about: {
    de: { title: "Über uns", description: "Aus einer spontanen Idee für ein Erinnerungsbuch wurde Oh Paw Studio: durchdachte digitale Produkte für Katzenmenschen." },
    en: { title: "About", description: "A spontaneous idea for a memory book became Oh Paw Studio: thoughtful digital products for cat lovers." },
  },
  pawSpace: {
    de: { title: "My Paw Space", description: "Dein persönlicher digitaler Ort für das Leben mit deiner Katze: Erinnerungen, Fotos und Produkte an einem Ort." },
    en: { title: "My Paw Space", description: "Your personal digital place for life with your cat: memories, photos and products in one spot." },
  },
  imprint: {
    de: { title: "Impressum", description: "Impressum von Oh Paw Studio." },
    en: { title: "Legal Notice", description: "Legal notice of Oh Paw Studio." },
  },
  privacy: {
    de: { title: "Datenschutzerklärung", description: "Datenschutzerklärung von Oh Paw Studio." },
    en: { title: "Privacy Policy", description: "Privacy policy of Oh Paw Studio." },
  },
};
