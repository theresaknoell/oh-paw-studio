// Geführtes Erinnerungsbuch in My Paw Space: Kapitel mit Fragen als Anregung.
// Neue Kapitel oder Fragen hier ergänzen; gespeicherte Antworten bleiben erhalten, solange die `id`s gleich bleiben.
import type { Locale } from "@/app/[lang]/dictionaries";

type L = Record<Locale, string>;
export type BookPrompt = { id: string; q: L };
export type BookChapter = { id: string; title: L; intro: L; prompts: BookPrompt[] };

const month = (n: number, extra?: BookPrompt): BookChapter => ({
  id: `m${n}`,
  title: { de: `Monat ${n}`, en: `Month ${n}` },
  intro: { de: "Was dieser Monat gebracht hat.", en: "What this month brought." },
  prompts: [
    ...(extra ? [extra] : []),
    { id: "new", q: { de: "Was war in diesem Monat neu für euch?", en: "What was new for you this month?" } },
    { id: "smile", q: { de: "Was hat dich zum Lächeln gebracht?", en: "What made you smile?" } },
    { id: "keep", q: { de: "Woran möchtest du dich später erinnern?", en: "What do you want to remember later?" } },
  ],
});

export const bookChapters: BookChapter[] = [
  {
    id: "arrival",
    title: { de: "Ankunft", en: "Arrival" },
    intro: { de: "Wie alles begann.", en: "How it all began." },
    prompts: [
      { id: "before", q: { de: "Was hast du erwartet, bevor ihr euch kennengelernt habt?", en: "What did you expect before you met?" } },
      { id: "first", q: { de: "Wie war der erste Moment, in dem ihr euch gesehen habt?", en: "What was the first moment you saw each other like?" } },
      { id: "home", q: { de: "Wie hat sie ihr neues Zuhause entdeckt?", en: "How did she discover her new home?" } },
      { id: "name", q: { de: "Wie ist ihr Name entstanden?", en: "How did her name come about?" } },
    ],
  },
  month(1, { id: "settle", q: { de: "Wie hat sie sich in den ersten Wochen eingelebt?", en: "How did she settle in during the first weeks?" } }),
  month(2),
  month(3),
  month(4),
  month(5),
  month(6, { id: "half", q: { de: "Was hat sich seit dem ersten Tag verändert?", en: "What has changed since the first day?" } }),
  month(7),
  month(8),
  month(9),
  month(10),
  month(11),
  month(12, { id: "year", q: { de: "Wie fühlt sich ein Jahr zusammen an?", en: "How does a year together feel?" } }),
  {
    id: "quirks",
    title: { de: "Eigenheiten", en: "Quirks" },
    intro: { de: "Das, was sie unverwechselbar macht.", en: "What makes her one of a kind." },
    prompts: [
      { id: "spot", q: { de: "Was ist ihr Lieblingsplatz, und wann liegt sie dort?", en: "What is her favourite spot, and when does she lie there?" } },
      { id: "sound", q: { de: "Welche Geräusche macht sie, wenn sie etwas möchte?", en: "What sounds does she make when she wants something?" } },
      { id: "ritual", q: { de: "Welche kleinen Rituale habt ihr?", en: "What little rituals do you have?" } },
      { id: "game", q: { de: "Was ist ihr liebstes Spiel?", en: "What is her favourite game?" } },
    ],
  },
  {
    id: "milestones",
    title: { de: "Meilensteine", en: "Milestones" },
    intro: { de: "Die Momente, die bleiben.", en: "The moments that stay." },
    prompts: [
      { id: "firsts", q: { de: "Welche ersten Male möchtest du festhalten?", en: "Which firsts do you want to capture?" } },
      { id: "adventure", q: { de: "Welches gemeinsame Abenteuer ist dir geblieben?", en: "Which shared adventure has stayed with you?" } },
      { id: "surprise", q: { de: "Was hat dich an ihr überrascht?", en: "What surprised you about her?" } },
    ],
  },
  {
    id: "closing",
    title: { de: "Zum Abschluss", en: "To close" },
    intro: { de: "Ein Blick zurück und nach vorn.", en: "A look back and ahead." },
    prompts: [
      { id: "letter", q: { de: "Ein paar Zeilen an deine Katze.", en: "A few lines to your cat." } },
      { id: "future", q: { de: "Was wünschst du euch für die nächsten Jahre?", en: "What do you wish for the coming years?" } },
    ],
  },
];

export const bookKey = (catId: string, chapterId: string, promptId: string) => `${catId}|${chapterId}|${promptId}`;
export const photoKey = (catId: string, chapterId: string) => `${catId}|${chapterId}`;
