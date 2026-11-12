import "server-only";

const dictionaries = {
  de: () => import("./dictionaries/de.json").then((m) => m.default),
  en: () => import("./dictionaries/en.json").then((m) => m.default),
};

export type Locale = keyof typeof dictionaries;

export const locales = Object.keys(dictionaries) as Locale[];

export const hasLocale = (value: string): value is Locale =>
  value in dictionaries;

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
