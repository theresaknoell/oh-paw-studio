"use client";

import { useState } from "react";
import { usePawStore } from "@/lib/paw-store";
import type { PawApp } from "@/data/paw-app";

// Druckansicht: "Drucken" öffnet den Druckdialog des Browsers, dort lässt sich auch "Als PDF speichern" wählen.
export default function PrintBook({ t, cat: catLabels }: { t: PawApp["print"]; cat: PawApp["memories"] }) {
  const { cats, memories } = usePawStore();
  const [selected, setSelected] = useState("");
  const cat = cats.find((c) => c.id === selected) ?? cats[0];
  if (!cat) return <p className="text-cocoa/75">{t.noCats}</p>;
  const list = memories.filter((m) => m.catId === cat.id).sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div>
      <div className="no-print flex flex-wrap items-end gap-4">
        <label className="text-sm">{t.selectCat}
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

        {list.length === 0 ? (
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
