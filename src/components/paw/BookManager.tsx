"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { bookChapters, bookKey, photoKey } from "@/data/paw-book";
import { downscaleImage } from "@/lib/image";
import { usePawStore } from "@/lib/paw-store";
import type { PawApp } from "@/data/paw-app";

const field = "mt-1 w-full rounded-lg border-[1.5px] border-taupe bg-ivory px-3 py-3 focus:border-cocoa focus:outline-2 focus:outline-offset-2 focus:outline-cocoa";
const ghost = "inline-flex min-h-11 items-center rounded-full border-[1.5px] border-olive-deep px-6 text-[15px] font-medium text-olive-deep transition-colors hover:bg-olive-deep hover:text-ivory disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-olive-deep";

// Textfeld mit verzögertem Speichern (nicht bei jedem Tastendruck), sichert beim Verlassen des Feldes.
function PromptField({ id, label, value, onSave }: { id: string; label: string; value: string; onSave: (v: string) => void }) {
  const [draft, setDraft] = useState(value);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const latest = useRef({ draft, value, onSave });
  useEffect(() => {
    latest.current = { draft, value, onSave };
  });
  useEffect(
    () => () => {
      // beim Wechsel des Kapitels oder der Katze ungespeicherte Eingabe sichern
      if (timer.current) clearTimeout(timer.current);
      const { draft: d, value: v, onSave: save } = latest.current;
      if (d !== v) save(d);
    },
    [],
  );
  return (
    <div>
      <label htmlFor={id} className="text-[17px] leading-6">{label}</label>
      <textarea
        id={id}
        rows={3}
        value={draft}
        className={field}
        onChange={(e) => {
          setDraft(e.target.value);
          if (timer.current) clearTimeout(timer.current);
          const v = e.target.value;
          timer.current = setTimeout(() => onSave(v), 700);
        }}
        onBlur={() => {
          if (timer.current) clearTimeout(timer.current);
          if (draft !== value) onSave(draft);
        }}
      />
    </div>
  );
}

export default function BookManager({
  lang,
  t,
  productHref,
  saveFailed,
}: {
  lang: "de" | "en";
  t: PawApp["book"];
  productHref: string;
  saveFailed: string;
}) {
  const { cats, book, bookPhotos, setBookText, setBookPhoto, saveFailed: failed } = usePawStore();
  const [catSel, setCatSel] = useState("");
  const [chapterIdx, setChapterIdx] = useState(0);
  const cat = cats.find((c) => c.id === catSel) ?? cats[0];

  if (!cat) return <p className="text-cocoa/75">{t.needCat}</p>;
  const chapter = bookChapters[chapterIdx];
  const started = (chapterId: string) =>
    bookChapters.find((c) => c.id === chapterId)!.prompts.some((p) => book[bookKey(cat.id, chapterId, p.id)]) ||
    Boolean(bookPhotos[photoKey(cat.id, chapterId)]);
  const startedCount = bookChapters.filter((c) => started(c.id)).length;
  const photo = bookPhotos[photoKey(cat.id, chapter.id)];

  const onPhoto = async (file: File | undefined) => {
    if (!file) return;
    try {
      setBookPhoto(photoKey(cat.id, chapter.id), await downscaleImage(file));
    } catch {
      /* Bild nicht lesbar: ignorieren */
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <label className="text-sm">{t.selectCat}
          <select
            className="mt-1 block min-h-12 rounded-lg border-[1.5px] border-taupe bg-ivory px-3"
            value={cat.id}
            onChange={(e) => setCatSel(e.target.value)}
          >
            {cats.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </label>
        <p className="text-sm text-cocoa/85" aria-live="polite">
          {startedCount} / {bookChapters.length} {t.progress}
        </p>
      </div>
      <p className="mt-2 text-sm text-cocoa/75">{t.hint}</p>

      <div className="mt-6 grid gap-8 md:grid-cols-[220px_1fr]">
        {/* Kapitelliste: Auswahlfeld mobil, Liste am Computer */}
        <div>
          <label className="md:hidden text-sm">{t.chapters}
            <select
              className="mt-1 block min-h-12 w-full rounded-lg border-[1.5px] border-taupe bg-ivory px-3"
              value={chapterIdx}
              onChange={(e) => setChapterIdx(Number(e.target.value))}
            >
              {bookChapters.map((c, i) => (
                <option key={c.id} value={i}>{started(c.id) ? "● " : "○ "}{c.title[lang]}</option>
              ))}
            </select>
          </label>
          <nav aria-label={t.chapters} className="hidden md:block">
            <ul className="space-y-1">
              {bookChapters.map((c, i) => (
                <li key={c.id}>
                  <button
                    type="button"
                    aria-current={i === chapterIdx ? "true" : undefined}
                    onClick={() => setChapterIdx(i)}
                    className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-[15px] transition-colors ${
                      i === chapterIdx ? "bg-sand" : "hover:bg-sand/60"
                    }`}
                  >
                    <span aria-hidden className={started(c.id) ? "text-olive-deep" : "text-taupe"}>{started(c.id) ? "●" : "○"}</span>
                    {c.title[lang]}
                    {started(c.id) && <span className="sr-only"> ({t.filled})</span>}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Kapitel: key sorgt dafür, dass beim Wechsel alle Felder frisch geladen werden */}
        <section key={`${cat.id}-${chapter.id}`} aria-labelledby="chapter-title">
          <h2 id="chapter-title" className="text-4xl">{chapter.title[lang]}</h2>
          <p className="mt-1 font-serif text-xl text-olive-deep">{chapter.intro[lang]}</p>

          <div className="mt-6 space-y-6">
            {chapter.prompts.map((p) => (
              <PromptField
                key={p.id}
                id={`p-${chapter.id}-${p.id}`}
                label={p.q[lang]}
                value={book[bookKey(cat.id, chapter.id, p.id)] ?? ""}
                onSave={(v) => setBookText(bookKey(cat.id, chapter.id, p.id), v)}
              />
            ))}

            <div>
              <label htmlFor="chapter-photo" className="text-[17px]">{t.photo}</label>
              <input
                id="chapter-photo"
                type="file"
                accept="image/*"
                className={`${field} file:mr-3 file:rounded-full file:border-0 file:bg-sand file:px-4 file:py-1.5`}
                onChange={(e) => onPhoto(e.target.files?.[0])}
              />
              {photo && (
                <div className="mt-3 flex items-end gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={photo} alt="" className="h-32 rounded-lg object-cover" />
                  <button type="button" className="text-sm text-olive-deep underline underline-offset-4" onClick={() => setBookPhoto(photoKey(cat.id, chapter.id), null)}>
                    {t.removePhoto}
                  </button>
                </div>
              )}
            </div>
          </div>

          {failed && <p role="alert" className="mt-4 text-sm text-[#7a3f33]">{saveFailed}</p>}
          <p className="mt-6 text-sm text-cocoa/75">{t.saved}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" className={ghost} disabled={chapterIdx === 0} onClick={() => setChapterIdx(chapterIdx - 1)}>← {t.prev}</button>
            <button type="button" className={ghost} disabled={chapterIdx === bookChapters.length - 1} onClick={() => setChapterIdx(chapterIdx + 1)}>{t.next} →</button>
          </div>
        </section>
      </div>

      <aside className="mt-14 rounded-[10px] bg-sand/50 p-6">
        <h2 className="text-2xl">{t.productTitle}</h2>
        <p className="mt-2 text-cocoa/90">{t.productText}</p>
        <Link href={productHref} className="mt-3 inline-block text-cocoa underline underline-offset-4 hover:text-olive-deep">{t.productCta} →</Link>
      </aside>
    </div>
  );
}
