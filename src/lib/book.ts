import { answerKey, parseRows, type Field, type Page, type Unit } from "@/data/paw-book";

type Store = { book: Record<string, string>; bookPhotos: Record<string, string> };

// Hat die Katze in diesem Feld etwas eingetragen?
export function fieldFilled(s: Store, catId: string, unit: Unit, page: Page, f: Field): boolean {
  const key = (sub?: number) => answerKey(catId, unit.id, page.id, f.id, sub);
  switch (f.kind) {
    case "photo":
      return Boolean(s.bookPhotos[key()]);
    case "list":
      return Array.from({ length: f.count }, (_, i) => s.book[key(i + 1)]).some(Boolean);
    case "table":
      return parseRows(s.book[key()], f.columns.length, f.rows).some((r) => r.some((c) => c.trim()));
    case "long":
    case "short":
      return Boolean(s.book[key()]);
    default:
      return false; // Überschriften und Hinweise zählen nicht als Inhalt
  }
}

export const pageFilled = (s: Store, catId: string, unit: Unit, page: Page) => page.fields.some((f) => fieldFilled(s, catId, unit, page, f));
export const unitFilled = (s: Store, catId: string, unit: Unit) => unit.pages.some((p) => pageFilled(s, catId, unit, p));
