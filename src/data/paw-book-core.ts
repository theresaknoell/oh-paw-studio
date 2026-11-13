// Erinnerungsbuch in My Paw Space, aufgebaut nach dem Buch „Mein erstes Jahr mit dir“ (Oh Paw Studio).
// Kapitel → Seiten → Felder. Neue Texte hier ändern oder ergänzen.
// Achtung: Die Antworten werden pro Feld gespeichert (Einheit-ID, Seiten-ID und Nummer des Feldes). Wer Felder
// umsortiert oder löscht, verschiebt damit bereits gespeicherte Antworten. Am Ende anhängen ist unproblematisch.
//
// Texte: paw-book-de.ts und paw-book-en.ts (gleicher Aufbau, gleiche Reihenfolge der Felder!).

export type RawField =
  | { kind: "long"; q: string; sub?: string; rows?: number }
  | { kind: "short"; q: string }
  | { kind: "list"; q: string; count: number }
  | { kind: "photo"; q: string; sub?: string }
  | { kind: "heading"; q: string }
  | { kind: "note"; q: string }
  | { kind: "table"; q?: string; columns: string[]; rows: number };

export type Field = RawField & { id: string };
export type Page = { id: string; title?: string; subtitle?: string; intro?: string; fields: Field[] };
export type Unit = {
  id: string;
  group: string; // Überschrift in der Kapitelliste
  no?: string; // z. B. „Kapitel 01“ oder „Monat 03“
  title: string;
  subtitle?: string;
  intro?: string;
  impulse?: string; // „Mein Erinnerungsimpuls“
  pages: Page[];
};

// ---- Bausteine ----
export const long = (q: string, o: { sub?: string; rows?: number } = {}): RawField => ({ kind: "long", q, ...o });
export const short = (q: string): RawField => ({ kind: "short", q });
export const photo = (q: string, sub?: string): RawField => ({ kind: "photo", q, sub });
export const head = (q: string): RawField => ({ kind: "heading", q });
export const note = (q: string): RawField => ({ kind: "note", q });
export const list = (q: string, count = 3): RawField => ({ kind: "list", q, count });
export const table = (columns: string[], rows: number, q?: string): RawField => ({ kind: "table", q, columns, rows });

export type RawPage = { title?: string; subtitle?: string; intro?: string; fields: RawField[] };
export type RawUnit = Omit<Unit, "pages"> & { pages: RawPage[] };

export const finalize = (u: RawUnit): Unit => ({
  ...u,
  pages: u.pages.map((p, pi) => ({
    ...p,
    id: `p${pi + 1}`,
    fields: p.fields.map((f, fi) => ({ ...f, id: `f${fi + 1}` }) as Field),
  })),
});

export type Month = {
  n: number;
  title: string;
  subtitle: string;
  intro: string;
  impulse: string;
  q: { subtitle?: string; intro: string; fields: RawField[] };
  photo: { subtitle?: string; intro: string; fields: RawField[] };
};

export const makeMonth = (group: string, noLabel: string) => (m: Month): RawUnit => ({
  id: `m${m.n}`,
  group,
  no: `${noLabel} ${String(m.n).padStart(2, "0")}`,
  title: m.title,
  subtitle: m.subtitle,
  intro: m.intro,
  impulse: m.impulse,
  pages: [
    { title: m.title, subtitle: m.q.subtitle, intro: m.q.intro, fields: m.q.fields },
    { title: m.title, subtitle: m.photo.subtitle, intro: m.photo.intro, fields: m.photo.fields },
  ],
});

// ---- Schlüssel für gespeicherte Antworten und Fotos ----
// text: `${katze}|${einheit}|${seite}.${feld}` ; list: …`.${nr}`; table: JSON-Text mit Zeilen
export const answerKey = (catId: string, unitId: string, pageId: string, fieldId: string, sub?: number) =>
  `${catId}|${unitId}|${pageId}.${fieldId}${sub ? `.${sub}` : ""}`;

export const unitPrefix = (catId: string, unitId: string) => `${catId}|${unitId}|`;

export type TableRows = string[][];
export const parseRows = (raw: string | undefined, columns: number, rows: number): TableRows => {
  let data: unknown = [];
  try {
    data = raw ? JSON.parse(raw) : [];
  } catch {
    data = [];
  }
  const out = Array.isArray(data) ? (data as unknown[]).map((r) => (Array.isArray(r) ? r.map(String) : [])) : [];
  while (out.length < rows) out.push([]);
  return out.map((r) => Array.from({ length: columns }, (_, i) => r[i] ?? ""));
};

