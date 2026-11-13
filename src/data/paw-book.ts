// Erinnerungsbuch in My Paw Space, aufgebaut nach dem Buch „Mein erstes Jahr mit dir“ / „My First Year with You“.
export * from "./paw-book-core";
import { bookUnitsDe } from "./paw-book-de";
import { bookUnitsEn } from "./paw-book-en";
import type { Unit } from "./paw-book-core";

export const bookUnitsFor = (lang: "de" | "en"): Unit[] => (lang === "en" ? bookUnitsEn : bookUnitsDe);
