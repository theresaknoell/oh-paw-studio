"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { answerKey, bookUnitsFor, parseRows, type Field, type Page, type Unit } from "@/data/paw-book";
import { downscaleImage } from "@/lib/image";
import { unitFilled } from "@/lib/book";
import { usePawStore } from "@/lib/paw-store";
import type { PawApp } from "@/data/paw-app";

const field = "mt-1 w-full rounded-lg border-[1.5px] border-taupe bg-ivory px-3 py-3 focus:border-cocoa focus:outline-2 focus:outline-offset-2 focus:outline-cocoa";
const ghost = "inline-flex min-h-11 items-center rounded-full border-[1.5px] border-olive-deep px-6 text-[15px] font-medium text-olive-deep transition-colors hover:bg-olive-deep hover:text-ivory disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-olive-deep";

// Eingabefeld mit verzögertem Speichern (nicht bei jedem Tastendruck), sichert beim Verlassen des Feldes.
function TextField({ id, label, sub, value, rows, onSave }: { id: string; label: string; sub?: string; value: string; rows?: number; onSave: (v: string) => void }) {
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
  const change = (v: string) => {
    setDraft(v);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => onSave(v), 700);
  };
  const blur = () => {
    if (timer.current) clearTimeout(timer.current);
    if (draft !== value) onSave(draft);
  };
  return (
    <div>
      <label htmlFor={id} className="text-[17px] leading-6">{label}</label>
      {sub && <p id={`${id}-sub`} className="text-sm text-cocoa/75">{sub}</p>}
      {rows ? (
        <textarea id={id} rows={rows} value={draft} className={field} aria-describedby={sub ? `${id}-sub` : undefined} onChange={(e) => change(e.target.value)} onBlur={blur} />
      ) : (
        <input id={id} type="text" value={draft} className={field} aria-describedby={sub ? `${id}-sub` : undefined} onChange={(e) => change(e.target.value)} onBlur={blur} />
      )}
    </div>
  );
}

function TableField({ id, f, value, onSave }: { id: string; f: Extract<Field, { kind: "table" }>; value: string; onSave: (v: string) => void }) {
  const [rows, setRows] = useState(() => parseRows(value, f.columns.length, f.rows));
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const latest = useRef({ rows, value });
  const save = (r: string[][]) => onSave(r.some((x) => x.some((c) => c.trim())) ? JSON.stringify(r) : "");
  const saveRef = useRef(save);
  useEffect(() => {
    latest.current = { rows, value };
    saveRef.current = save;
  });
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
      const { rows: r, value: v } = latest.current;
      const json = r.some((x) => x.some((c) => c.trim())) ? JSON.stringify(r) : "";
      if (json !== v) saveRef.current(r);
    },
    [],
  );
  const set = (ri: number, ci: number, v: string) => {
    const next = rows.map((r, i) => (i === ri ? r.map((c, j) => (j === ci ? v : c)) : r));
    setRows(next);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => save(next), 700);
  };
  const cols = f.columns.length;
  return (
    <div role="group" aria-label={f.q ?? f.columns.join(", ")}>
      {f.q && <p className="text-[17px]">{f.q}</p>}
      <div className="mt-2 hidden gap-2 text-sm font-medium text-cocoa/85 md:grid" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))` }} aria-hidden>
        {f.columns.map((c) => <span key={c}>{c}</span>)}
      </div>
      <ul className="mt-2 space-y-3 md:space-y-2">
        {rows.map((r, ri) => (
          <li key={ri} className="grid gap-2 rounded-lg bg-sand/40 p-3 md:bg-transparent md:p-0" style={{ ["--cols" as string]: cols }}>
            <div className="grid gap-2 md:[grid-template-columns:repeat(var(--cols),minmax(0,1fr))]">
              {f.columns.map((c, ci) => (
                <label key={c} className="text-sm md:text-base">
                  <span className="md:sr-only">{c} ({ri + 1})</span>
                  <input
                    id={`${id}-${ri}-${ci}`}
                    type="text"
                    value={r[ci]}
                    aria-label={`${c} ${ri + 1}`}
                    className={`${field} mt-0.5 md:mt-0 py-2`}
                    onChange={(e) => set(ri, ci, e.target.value)}
                    onBlur={() => {
                      if (timer.current) clearTimeout(timer.current);
                      save(rows);
                    }}
                  />
                </label>
              ))}
            </div>
          </li>
        ))}
      </ul>
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
  const bookUnits = bookUnitsFor(lang);
  const store = usePawStore();
  const { cats, book, bookPhotos, setBookText, setBookPhoto, saveFailed: failed } = store;
  const [catSel, setCatSel] = useState("");
  const [unitIdx, setUnitIdx] = useState(0);
  const cat = cats.find((c) => c.id === catSel) ?? cats[0];

  if (!cat) return <p className="text-cocoa/75">{t.needCat}</p>;
  const unit: Unit = bookUnits[unitIdx];
  const started = (u: Unit) => unitFilled({ book, bookPhotos }, cat.id, u);
  const startedCount = bookUnits.filter(started).length;
  const label = (u: Unit) => (u.no ? `${u.no} · ${u.title}` : u.title);

  const onPhoto = async (key: string, file: File | undefined) => {
    if (!file) return;
    try {
      setBookPhoto(key, await downscaleImage(file));
    } catch {
      /* Bild nicht lesbar: ignorieren */
    }
  };

  const renderField = (page: Page, f: Field) => {
    const key = (sub?: number) => answerKey(cat.id, unit.id, page.id, f.id, sub);
    const id = `f-${unit.id}-${page.id}-${f.id}`;
    switch (f.kind) {
      case "heading":
        return <h3 key={f.id} className="mt-4 font-serif text-3xl">{f.q}</h3>;
      case "note":
        return <p key={f.id} className="rounded-lg bg-sand/50 p-4 text-sm text-cocoa/85">{f.q}</p>;
      case "long":
        return <TextField key={f.id} id={id} label={f.q} sub={f.sub} rows={f.rows ?? 3} value={book[key()] ?? ""} onSave={(v) => setBookText(key(), v)} />;
      case "short":
        return <TextField key={f.id} id={id} label={f.q} value={book[key()] ?? ""} onSave={(v) => setBookText(key(), v)} />;
      case "list":
        return (
          <fieldset key={f.id}>
            <legend className="text-[17px] leading-6">{f.q}</legend>
            <div className="mt-1 grid gap-2 sm:grid-cols-3">
              {Array.from({ length: f.count }, (_, i) => (
                <TextField key={i} id={`${id}-${i + 1}`} label={`${i + 1}.`} value={book[key(i + 1)] ?? ""} onSave={(v) => setBookText(key(i + 1), v)} />
              ))}
            </div>
          </fieldset>
        );
      case "table":
        return <TableField key={f.id} id={id} f={f} value={book[key()] ?? ""} onSave={(v) => setBookText(key(), v)} />;
      case "photo": {
        const photo = bookPhotos[key()];
        return (
          <div key={f.id}>
            <label htmlFor={id} className="text-[17px] leading-6">{f.q}</label>
            {f.sub && <p className="text-sm text-cocoa/75">{f.sub}</p>}
            <input id={id} type="file" accept="image/*" className={`${field} file:mr-3 file:rounded-full file:border-0 file:bg-sand file:px-4 file:py-1.5`} onChange={(e) => onPhoto(key(), e.target.files?.[0])} />
            {photo && (
              <div className="mt-3 flex items-end gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo} alt="" className="h-32 rounded-lg object-cover" />
                <button type="button" className="text-sm text-olive-deep underline underline-offset-4" onClick={() => setBookPhoto(key(), null)}>{t.removePhoto}</button>
              </div>
            )}
          </div>
        );
      }
    }
  };

  const groups = Array.from(new Set(bookUnits.map((u) => u.group)));

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <label className="text-sm">{t.selectCat}
          <select className="mt-1 block min-h-12 rounded-lg border-[1.5px] border-taupe bg-ivory px-3" value={cat.id} onChange={(e) => setCatSel(e.target.value)}>
            {cats.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </label>
        <p className="text-sm text-cocoa/85" aria-live="polite">{startedCount} / {bookUnits.length} {t.progress}</p>
      </div>
      <p className="mt-2 text-sm text-cocoa/75">{t.hint}</p>

      <div className="mt-6 grid gap-8 md:grid-cols-[260px_1fr]">
        <div>
          <label className="md:hidden text-sm">{t.chapters}
            <select className="mt-1 block min-h-12 w-full rounded-lg border-[1.5px] border-taupe bg-ivory px-3" value={unitIdx} onChange={(e) => setUnitIdx(Number(e.target.value))}>
              {groups.map((g) => (
                <optgroup key={g} label={g}>
                  {bookUnits.map((u, i) => u.group === g && <option key={u.id} value={i}>{started(u) ? "● " : "○ "}{label(u)}</option>)}
                </optgroup>
              ))}
            </select>
          </label>
          <nav aria-label={t.chapters} className="hidden md:block md:max-h-[75vh] md:overflow-y-auto md:pr-1">
            <ul className="space-y-1">
              {bookUnits.map((u, i) => (
                <li key={u.id}>
                  <button
                    type="button"
                    aria-current={i === unitIdx ? "true" : undefined}
                    onClick={() => setUnitIdx(i)}
                    className={`flex w-full items-center gap-2 rounded-lg py-2 pr-3 text-left text-[15px] transition-colors ${u.id.startsWith("m") ? "pl-7" : "pl-3"} ${i === unitIdx ? "bg-sand" : "hover:bg-sand/60"}`}
                  >
                    <span aria-hidden className={started(u) ? "text-olive-deep" : "text-taupe"}>{started(u) ? "●" : "○"}</span>
                    {label(u)}
                    {started(u) && <span className="sr-only"> ({t.filled})</span>}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* key sorgt dafür, dass beim Wechsel alle Felder frisch geladen werden */}
        <section key={`${cat.id}-${unit.id}`} aria-labelledby="chapter-title">
          {unit.no && <p className="text-[13px] uppercase tracking-[0.08em] text-cocoa/75">{unit.no}</p>}
          <h2 id="chapter-title" className="text-4xl">{unit.title}</h2>
          {unit.subtitle && <p className="mt-1 font-serif text-xl text-olive-deep">{unit.subtitle}</p>}
          {unit.intro && (
            <details className="mt-4 rounded-lg bg-sand/40 p-4" open={unit.pages.every((p) => p.fields.length === 0)}>
              <summary className="cursor-pointer text-[15px] font-medium">{t.introLabel}</summary>
              <p className="mt-3 whitespace-pre-line leading-7">{unit.intro}</p>
            </details>
          )}
          {unit.impulse && (
            <div className="mt-4 rounded-lg border-[1.5px] border-sage p-4">
              <p className="text-[13px] uppercase tracking-[0.08em] text-cocoa/75">{t.impulse}</p>
              <p className="mt-1 whitespace-pre-line font-serif text-xl">{unit.impulse}</p>
            </div>
          )}

          <div className="mt-8 space-y-12">
            {unit.pages.map((page) => (
              <div key={page.id} className="space-y-6">
                {(page.title || page.subtitle || page.intro) && (
                  <div>
                    {page.title && page.title !== unit.title && <h3 className="font-serif text-3xl">{page.title}</h3>}
                    {page.subtitle && <p className="font-serif text-xl italic text-olive-deep">{page.subtitle}</p>}
                    {page.intro && <p className="mt-2 whitespace-pre-line leading-7 text-cocoa/90">{page.intro}</p>}
                  </div>
                )}
                {page.fields.map((f) => renderField(page, f))}
              </div>
            ))}
          </div>

          {failed && <p role="alert" className="mt-4 text-sm text-[#7a3f33]">{saveFailed}</p>}
          <p className="mt-6 text-sm text-cocoa/75">{t.saved}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" className={ghost} disabled={unitIdx === 0} onClick={() => setUnitIdx(unitIdx - 1)}>← {t.prev}</button>
            <button type="button" className={ghost} disabled={unitIdx === bookUnits.length - 1} onClick={() => setUnitIdx(unitIdx + 1)}>{t.next} →</button>
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
