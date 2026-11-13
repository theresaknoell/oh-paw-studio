"use client";

import Image from "next/image";
import { useState } from "react";
import { bookChapters, bookKey, photoKey } from "@/data/paw-book";
import { usePawStore } from "@/lib/paw-store";
import type { PawApp } from "@/data/paw-app";

// Prototyp: Erinnerungsbuch im Markendesign als A4-Seiten. Gespeichert wird über den Druckdialog ("Als PDF speichern").
export default function DesignedBook({
  lang,
  t,
  print,
}: {
  lang: "de" | "en";
  t: PawApp["designed"];
  print: PawApp["print"];
}) {
  const { cats, book, bookPhotos } = usePawStore();
  const [selected, setSelected] = useState("");
  const cat = cats.find((c) => c.id === selected) ?? cats[0];
  if (!cat) return <p className="text-cocoa/75">{print.noCats}</p>;

  const chapters = bookChapters
    .map((c) => ({
      c,
      answers: c.prompts.map((p) => ({ p, text: book[bookKey(cat.id, c.id, p.id)] })).filter((a) => a.text),
      photo: bookPhotos[photoKey(cat.id, c.id)],
    }))
    .filter((x) => x.answers.length > 0 || x.photo);

  return (
    <div>
      <div className="no-print flex flex-wrap items-end gap-4">
        <label className="text-sm">{print.selectCat}
          <select
            className="mt-1 block min-h-12 rounded-lg border-[1.5px] border-taupe bg-ivory px-3"
            value={cat.id}
            onChange={(e) => setSelected(e.target.value)}
          >
            {cats.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </label>
        <button
          onClick={() => window.print()}
          className="inline-flex min-h-12 items-center rounded-full bg-olive-deep px-6 text-[15px] font-medium text-ivory transition-colors hover:bg-cocoa"
        >
          {t.button}
        </button>
      </div>
      <p className="no-print mt-3 text-sm text-cocoa/80">{t.hint}</p>

      <div className="dbook mt-8 space-y-8 print:mt-0 print:space-y-0">
        {/* Titelblatt */}
        <section className="dsheet relative mx-auto flex w-full max-w-[210mm] flex-col items-center justify-between bg-ivory px-[18mm] py-[22mm] text-center shadow-[0_2px_24px_rgba(68,60,53,0.12)] min-h-[297mm] print:min-h-[297mm] print:shadow-none">
          <Image src="/logo.webp" alt="Oh Paw Studio" width={110} height={110} className="mix-blend-multiply" priority />
          <div>
            <p className="text-[12px] uppercase tracking-[0.2em] text-cocoa/75">{t.cover}</p>
            <h2 className="mt-3 font-serif text-[64px] leading-none">{cat.name}</h2>
            {cat.photo && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={cat.photo} alt="" className="mx-auto mt-10 h-[70mm] w-[70mm] rounded-full object-cover" />
            )}
            <div className="mx-auto mt-10 h-px w-16 bg-sage" />
            <p className="mt-6 text-cocoa/80">
              {[cat.birthday && `${print.born} ${cat.birthday}`, cat.since && `${print.since} ${cat.since}`].filter(Boolean).join(" · ")}
            </p>
            {cat.notes && <p className="mt-1 font-serif text-xl text-olive-deep">{cat.notes}</p>}
          </div>
          <p className="font-serif text-lg text-cocoa/80">Thoughtfully made for life with cats.</p>
          <span className="no-print absolute right-4 top-4 rounded-full bg-sand px-3 py-0.5 text-xs">{t.preview}</span>
        </section>

        {/* Kapitelseiten */}
        {chapters.map(({ c, answers, photo }, i) => (
          <section
            key={c.id}
            className="dsheet mx-auto w-full max-w-[210mm] bg-ivory px-[18mm] py-[20mm] shadow-[0_2px_24px_rgba(68,60,53,0.12)] min-h-[297mm] print:shadow-none"
          >
            <p className="text-[12px] uppercase tracking-[0.2em] text-cocoa/75">
              {t.chapter} {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-2 font-serif text-[44px] leading-tight">{c.title[lang]}</h3>
            <p className="font-serif text-xl italic text-olive-deep">{c.intro[lang]}</p>
            <div className="mt-2 h-px w-16 bg-sage" />
            <div className="mt-8 space-y-7">
              {answers.map(({ p, text }) => (
                <div key={p.id} className="print-entry">
                  <p className="text-[13px] text-cocoa/75">{p.q[lang]}</p>
                  <p className="mt-1 whitespace-pre-line font-serif text-[21px] leading-[1.45]">{text}</p>
                </div>
              ))}
            </div>
            {photo && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={photo} alt="" className="print-entry mt-8 max-h-[95mm] w-full rounded-[10px] object-cover" />
            )}
            <p className="mt-10 text-center text-[12px] tracking-wide text-cocoa/60">Oh Paw Studio · {cat.name}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
