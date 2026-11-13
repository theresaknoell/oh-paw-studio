"use client";

import Link from "next/link";
import { useState } from "react";
import { bookChapters, bookKey, photoKey } from "@/data/paw-book";
import { usePawStore } from "@/lib/paw-store";
import type { PawApp } from "@/data/paw-app";

// Druckansicht: "Drucken" öffnet den Druckdialog des Browsers, dort lässt sich auch "Als PDF speichern" wählen.
export default function PrintBook({ lang, t, cat: catLabels, designedLink }: { lang: "de" | "en"; t: PawApp["print"]; cat: PawApp["memories"]; designedLink: string }) {
  const { cats, memories, book, bookPhotos } = usePawStore();
  const [selected, setSelected] = useState("");
  const [mode, setMode] = useState<"book" | "timeline">("book");
  const cat = cats.find((c) => c.id === selected) ?? cats[0];
  if (!cat) return <p className="text-cocoa/75">{t.noCats}</p>;
  const list = memories.filter((m) => m.catId === cat.id).sort((a, b) => a.date.localeCompare(b.date));
  const chapters = bookChapters
    .map((c) => ({
      c,
      answers: c.prompts.map((p) => ({ p, text: book[bookKey(cat.id, c.id, p.id)] })).filter((a) => a.text),
      photo: bookPhotos[photoKey(cat.id, c.id)],
    }))
    .filter((x) => x.answers.length > 0 || x.photo);

  const select = "mt-1 block min-h-12 rounded-lg border-[1.5px] border-taupe bg-ivory px-3";

  return (
    <div>
      <div className="no-print flex flex-wrap items-end gap-4">
        <label className="text-sm">{t.selectCat}
          <select className={select} value={cat.id} onChange={(e) => setSelected(e.target.value)}>
            {cats.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </label>
        <label className="text-sm">{t.mode}
          <select className={select} value={mode} onChange={(e) => setMode(e.target.value as "book" | "timeline")}>
            <option value="book">{t.guided}</option>
            <option value="timeline">{t.timeline}</option>
          </select>
        </label>
        <button
          onClick={() => window.print()}
          className="inline-flex min-h-12 items-center rounded-full bg-olive-deep px-6 text-[15px] font-medium text-ivory transition-colors hover:bg-cocoa"
        >
          {t.button}
        </button>
      </div>

      <p className="no-print mt-4 text-sm"><Link href={`/${lang}/my-paw-space/app/book-pdf`} className="text-olive-deep underline underline-offset-4 hover:text-cocoa">{designedLink}</Link></p>

      <article className="print-book mt-10">
        <header className="text-center">
          <p className="text-[13px] uppercase tracking-[0.08em] text-cocoa/75">{t.book}</p>
          <h2 className="mt-2 font-serif text-5xl">{cat.name}</h2>
          {cat.photo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={cat.photo} alt="" className="mx-auto mt-6 h-56 w-56 rounded-full object-cover" />
          )}
          <p className="mt-4 text-cocoa/80">
            {[cat.birthday && `${t.born} ${cat.birthday}`, cat.since && `${t.since} ${cat.since}`].filter(Boolean).join(" · ")}
          </p>
          {cat.notes && <p className="mt-2 text-cocoa/80">{cat.notes}</p>}
        </header>

        {mode === "book" ? (
          chapters.length === 0 ? (
            <p className="no-print mt-10 text-center text-cocoa/75">{t.guidedEmpty}</p>
          ) : (
            <div className="mt-12 space-y-12">
              {chapters.map(({ c, answers, photo }) => (
                <section key={c.id} className="print-entry border-t border-taupe/50 pt-6">
                  <h3 className="font-serif text-3xl">{c.title[lang]}</h3>
                  <p className="mt-1 text-cocoa/75">{c.intro[lang]}</p>
                  {answers.map(({ p, text }) => (
                    <div key={p.id} className="mt-5">
                      <p className="text-sm text-cocoa/75">{p.q[lang]}</p>
                      <p className="mt-1 whitespace-pre-line text-lg leading-8">{text}</p>
                    </div>
                  ))}
                  {photo && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={photo} alt="" className="mt-5 max-h-80 rounded-lg" />
                  )}
                </section>
              ))}
            </div>
          )
        ) : list.length === 0 ? (
          <p className="no-print mt-10 text-center text-cocoa/75">{t.empty}</p>
        ) : (
          <ol className="mt-12 space-y-8">
            {list.map((m) => (
              <li key={m.id} className="print-entry border-t border-taupe/50 pt-4">
                <p className="text-sm text-cocoa/75">{m.date} · {catLabels.categories[m.category]}</p>
                <p className="mt-1 whitespace-pre-line text-lg leading-8">{m.text}</p>
                {m.photo && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={m.photo} alt="" className="mt-3 max-h-80 rounded-lg" />
                )}
              </li>
            ))}
          </ol>
        )}
      </article>
    </div>
  );
}
