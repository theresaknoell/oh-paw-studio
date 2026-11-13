"use client";

import Image from "next/image";
import { useState } from "react";
import { answerKey, bookUnitsFor, parseRows, type Field, type Page, type Unit } from "@/data/paw-book";
import { fieldFilled, pageFilled } from "@/lib/book";
import { usePawStore } from "@/lib/paw-store";
import type { PawApp } from "@/data/paw-app";

const sheet = "dsheet relative mx-auto flex w-full max-w-[210mm] flex-col bg-ivory px-[18mm] py-[20mm] shadow-[0_2px_24px_rgba(68,60,53,0.12)] min-h-[297mm] print:shadow-none";
const label = "text-[12px] uppercase tracking-[0.2em] text-cocoa/75";

// Druckansicht im Markendesign (A4-Seiten). "Drucken / als PDF speichern" nutzt immer dieses Layout.
export default function DesignedBook({ lang, t, print, catLabels }: { lang: "de" | "en"; t: PawApp["designed"]; print: PawApp["print"]; catLabels: PawApp["memories"] }) {
  const bookUnits = bookUnitsFor(lang);
  const { cats, memories, book, bookPhotos } = usePawStore();
  const [selected, setSelected] = useState("");
  const [mode, setMode] = useState<"book" | "timeline">("book");
  const cat = cats.find((c) => c.id === selected) ?? cats[0];
  if (!cat) return <p className="text-cocoa/75">{print.noCats}</p>;

  const store = { book, bookPhotos };
  const list = memories.filter((m) => m.catId === cat.id).sort((a, b) => a.date.localeCompare(b.date));
  const filledPages = bookUnits.flatMap((u) => u.pages.filter((p) => pageFilled(store, cat.id, u, p)).map((p, i) => ({ u, p, first: i === 0 })));
  const chunks: (typeof list)[] = [];
  for (let i = 0; i < list.length; i += 4) chunks.push(list.slice(i, i + 4));

  const select = "mt-1 block min-h-12 rounded-lg border-[1.5px] border-taupe bg-ivory px-3";
  const footer = <p className="mt-auto pt-10 text-center text-[12px] tracking-wide text-cocoa/60">Oh Paw Studio · {cat.name}</p>;
  const empty = mode === "book" ? filledPages.length === 0 : list.length === 0;

  const renderField = (u: Unit, p: Page, f: Field, idx: number) => {
    const key = (sub?: number) => answerKey(cat.id, u.id, p.id, f.id, sub);
    if (f.kind === "heading") {
      // Überschrift nur, wenn danach (bis zur nächsten Überschrift) etwas ausgefüllt ist
      const rest = p.fields.slice(idx + 1);
      const next = rest.findIndex((x) => x.kind === "heading");
      const block = next === -1 ? rest : rest.slice(0, next);
      return block.some((x) => fieldFilled(store, cat.id, u, p, x)) ? <h4 key={f.id} className="mt-3 font-serif text-[26px] leading-tight">{f.q}</h4> : null;
    }
    if (!fieldFilled(store, cat.id, u, p, f)) return null;
    switch (f.kind) {
      case "long":
        return (
          <div key={f.id} className="print-entry">
            <p className="text-[13px] text-cocoa/75">{f.q}</p>
            <p className="mt-1 whitespace-pre-line font-serif text-[20px] leading-[1.45]">{book[key()]}</p>
          </div>
        );
      case "short":
        return (
          <p key={f.id} className="print-entry text-[13px] text-cocoa/75">{f.q} <span className="font-serif text-[20px] text-cocoa">{book[key()]}</span></p>
        );
      case "list":
        return (
          <div key={f.id} className="print-entry">
            <p className="text-[13px] text-cocoa/75">{f.q}</p>
            <ol className="mt-1 list-decimal pl-6 font-serif text-[20px] leading-[1.45]">
              {Array.from({ length: f.count }, (_, i) => book[key(i + 1)]).filter(Boolean).map((v, i) => <li key={i}>{v}</li>)}
            </ol>
          </div>
        );
      case "table": {
        const rows = parseRows(book[key()], f.columns.length, f.rows).filter((r) => r.some((c) => c.trim()));
        return (
          <table key={f.id} className="print-entry w-full border-collapse text-left">
            <thead>
              <tr>{f.columns.map((c) => <th key={c} className="border-b border-sage pb-1 pr-3 text-[12px] font-medium uppercase tracking-[0.08em] text-cocoa/75">{c}</th>)}</tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i}>{r.map((c, j) => <td key={j} className="border-b border-sand py-1.5 pr-3 align-top font-serif text-[18px]">{c}</td>)}</tr>
              ))}
            </tbody>
          </table>
        );
      }
      case "photo":
        return (
          <figure key={f.id} className="print-entry">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={bookPhotos[key()]} alt="" className="max-h-[85mm] w-full rounded-[10px] object-cover" />
            <figcaption className="mt-1 text-[12px] text-cocoa/70">{f.q}</figcaption>
          </figure>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="no-print flex flex-wrap items-end gap-4">
        <label className="text-sm">{print.selectCat}
          <select className={select} value={cat.id} onChange={(e) => setSelected(e.target.value)}>
            {cats.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </label>
        <label className="text-sm">{print.mode}
          <select className={select} value={mode} onChange={(e) => setMode(e.target.value as "book" | "timeline")}>
            <option value="book">{print.guided}</option>
            <option value="timeline">{print.timeline}</option>
          </select>
        </label>
        <button onClick={() => window.print()} className="inline-flex min-h-12 items-center rounded-full bg-olive-deep px-6 text-[15px] font-medium text-ivory transition-colors hover:bg-cocoa">
          {print.button}
        </button>
      </div>
      <p className="no-print mt-3 text-sm text-cocoa/80">{t.hint}</p>
      {empty && <p className="no-print mt-6 text-cocoa/75">{mode === "book" ? print.guidedEmpty : print.empty}</p>}

      <div className="dbook mt-8 space-y-8 print:mt-0 print:space-y-0">
        {/* Titelblatt */}
        <section className={`${sheet} items-center justify-between text-center`}>
          <Image src="/logo.webp" alt="Oh Paw Studio" width={110} height={110} className="mix-blend-multiply" priority />
          <div>
            <p className={label}>{t.cover}</p>
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
        </section>

        {mode === "book"
          ? filledPages.map(({ u, p, first }) => (
              <section key={`${u.id}-${p.id}`} className={sheet}>
                {first ? (
                  <>
                    <p className={label}>{u.no ?? u.group}</p>
                    <h3 className="mt-2 font-serif text-[44px] leading-tight">{u.title}</h3>
                    {u.subtitle && <p className="font-serif text-xl italic text-olive-deep">{u.subtitle}</p>}
                  </>
                ) : (
                  <p className={label}>{u.title}</p>
                )}
                {p.title && p.title !== u.title && <h4 className="mt-4 font-serif text-[28px] leading-tight">{p.title}</h4>}
                <div className="mt-2 h-px w-16 bg-sage" />
                <div className="mt-8 space-y-6">{p.fields.map((f, i) => renderField(u, p, f, i))}</div>
                {footer}
              </section>
            ))
          : chunks.map((chunk, ci) => (
              <section key={ci} className={sheet}>
                <p className={label}>{print.timeline}</p>
                <div className="mt-2 h-px w-16 bg-sage" />
                <ol className="mt-8 space-y-8">
                  {chunk.map((m) => (
                    <li key={m.id} className="print-entry">
                      <p className="text-[13px] text-cocoa/75">{m.date} · {catLabels.categories[m.category]}</p>
                      <p className="mt-1 whitespace-pre-line font-serif text-[20px] leading-[1.45]">{m.text}</p>
                      {m.photo && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={m.photo} alt="" className="mt-3 max-h-[55mm] rounded-[10px] object-cover" />
                      )}
                    </li>
                  ))}
                </ol>
                {footer}
              </section>
            ))}
      </div>
    </div>
  );
}
