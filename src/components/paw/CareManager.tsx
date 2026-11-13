"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePawStore, type CareProfile, type HealthKind } from "@/lib/paw-store";
import type { PawApp } from "@/data/paw-app";
import WeightChart from "./WeightChart";

const input = "mt-1 w-full rounded-lg border-[1.5px] border-taupe bg-ivory px-3 py-3 min-h-12 focus:border-cocoa focus:outline-2 focus:outline-offset-2 focus:outline-cocoa";
const button = "inline-flex min-h-11 items-center rounded-full bg-olive-deep px-6 text-[15px] font-medium text-ivory transition-colors hover:bg-cocoa";
const link = "text-sm text-olive-deep underline underline-offset-4 hover:text-cocoa";
const h2 = "text-3xl";

const profileFields = ["chip", "vetName", "vetPhone", "emergency", "food", "notes"] as const;

// Profilfeld mit Speichern beim Verlassen des Feldes
function ProfileField({ label, value, onSave }: { label: string; value: string; onSave: (v: string) => void }) {
  const [draft, setDraft] = useState(value);
  const latest = useRef({ draft, value, onSave });
  useEffect(() => {
    latest.current = { draft, value, onSave };
  });
  useEffect(
    () => () => {
      const { draft: d, value: v, onSave: save } = latest.current;
      if (d !== v) save(d);
    },
    [],
  );
  return (
    <label className="text-sm">{label}
      <input className={input} value={draft} onChange={(e) => setDraft(e.target.value)} onBlur={() => draft !== value && onSave(draft)} />
    </label>
  );
}

export default function CareManager({ t, productHref }: { t: PawApp["care"]; productHref: string }) {
  const { cats, care, setCareProfile, addWeight, removeWeight, addHealth, removeHealth, addMed, removeMed } = usePawStore();
  const [catSel, setCatSel] = useState("");
  const [w, setW] = useState({ date: "", kg: "" });
  const [wErr, setWErr] = useState(false);
  const [h, setH] = useState<{ date: string; kind: HealthKind; text: string }>({ date: "", kind: "checkup", text: "" });
  const [m, setM] = useState({ name: "", dose: "", start: "", end: "", notes: "" });
  const cat = cats.find((c) => c.id === catSel) ?? cats[0];
  if (!cat) return <p className="text-cocoa/75">{t.needCat}</p>;

  const profile = care.profiles[cat.id];
  const weights = care.weights.filter((x) => x.catId === cat.id).sort((a, b) => a.date.localeCompare(b.date));
  const health = care.health.filter((x) => x.catId === cat.id).sort((a, b) => b.date.localeCompare(a.date));
  const meds = care.meds.filter((x) => x.catId === cat.id).sort((a, b) => b.start.localeCompare(a.start));
  const pf = t.profile;
  const labels: Record<(typeof profileFields)[number], string> = {
    chip: pf.chip, vetName: pf.vetName, vetPhone: pf.vetPhone, emergency: pf.emergency, food: pf.food, notes: pf.notes,
  };

  return (
    <div>
      <div className="no-print flex flex-wrap items-end gap-4">
        <label className="text-sm">{t.selectCat}
          <select className="mt-1 block min-h-12 rounded-lg border-[1.5px] border-taupe bg-ivory px-3" value={cat.id} onChange={(e) => setCatSel(e.target.value)}>
            {cats.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </label>
        <button onClick={() => window.print()} className={button}>{t.print}</button>
      </div>
      <p className="mt-3 text-sm text-cocoa/80">{t.disclaimer}</p>
      <h2 className="print-only mt-6 hidden font-serif text-4xl print:block">{cat.name}</h2>

      {/* Profil */}
      <section className="mt-10" aria-labelledby="care-profile">
        <h2 id="care-profile" className={h2}>{pf.title}</h2>
        <div key={cat.id} className="mt-4 grid gap-4 sm:grid-cols-2">
          {profileFields.map((k) => (
            <ProfileField key={k} label={labels[k]} value={profile?.[k] ?? ""} onSave={(v) => setCareProfile(cat.id, { [k]: v } as Partial<CareProfile>)} />
          ))}
        </div>
        <p className="no-print mt-3 text-sm text-cocoa/75">{t.saved}</p>
      </section>

      {/* Gewicht */}
      <section className="print-entry mt-12" aria-labelledby="care-weight">
        <h2 id="care-weight" className={h2}>{t.weight.title}</h2>
        <form
          className="no-print mt-4 flex flex-wrap items-end gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            const kg = Number(w.kg.replace(",", "."));
            if (!w.date || !Number.isFinite(kg) || kg <= 0 || kg > 30) {
              setWErr(true);
              return;
            }
            setWErr(false);
            addWeight({ catId: cat.id, date: w.date, kg: Math.round(kg * 100) / 100 });
            setW({ date: w.date, kg: "" });
          }}
        >
          <label className="text-sm">{t.weight.date}<input type="date" required className={input} value={w.date} onChange={(e) => setW({ ...w, date: e.target.value })} /></label>
          <label className="text-sm">{t.weight.kg}<input inputMode="decimal" required className={input} value={w.kg} onChange={(e) => setW({ ...w, kg: e.target.value })} /></label>
          <button className={button}>{t.weight.add}</button>
        </form>
        {wErr && <p role="alert" className="mt-2 text-sm text-[#7a3f33]">{t.weight.invalid}</p>}
        {weights.length === 0 ? (
          <p className="mt-4 text-cocoa/75">{t.weight.empty}</p>
        ) : (
          <>
            <div className="mt-6 max-w-2xl"><WeightChart points={weights} label={t.weight.chart} /></div>
            <ul className="mt-4 divide-y divide-sand">
              {[...weights].reverse().map((x) => (
                <li key={x.id} className="flex items-center justify-between py-2">
                  <span>{x.date} · {x.kg} kg</span>
                  <button className={`no-print ${link}`} onClick={() => removeWeight(x.id)}>{t.weight.remove}</button>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>

      {/* Tierarzt und Gesundheit */}
      <section className="mt-12" aria-labelledby="care-health">
        <h2 id="care-health" className={h2}>{t.health.title}</h2>
        <form
          className="no-print mt-4 grid gap-4 sm:grid-cols-3"
          onSubmit={(e) => {
            e.preventDefault();
            if (!h.date || !h.text.trim()) return;
            addHealth({ catId: cat.id, date: h.date, kind: h.kind, text: h.text.trim() });
            setH({ ...h, text: "" });
          }}
        >
          <label className="text-sm">{t.health.date}<input type="date" required className={input} value={h.date} onChange={(e) => setH({ ...h, date: e.target.value })} /></label>
          <label className="text-sm">{t.health.kind}
            <select className={input} value={h.kind} onChange={(e) => setH({ ...h, kind: e.target.value as HealthKind })}>
              {(Object.keys(t.health.kinds) as HealthKind[]).map((k) => <option key={k} value={k}>{t.health.kinds[k]}</option>)}
            </select>
          </label>
          <label className="text-sm sm:col-span-3">{t.health.text}<textarea required rows={2} className={input} value={h.text} onChange={(e) => setH({ ...h, text: e.target.value })} /></label>
          <div className="sm:col-span-3"><button className={button}>{t.health.add}</button></div>
        </form>
        {health.length === 0 ? (
          <p className="mt-4 text-cocoa/75">{t.health.empty}</p>
        ) : (
          <ul className="mt-4 divide-y divide-sand">
            {health.map((x) => (
              <li key={x.id} className="print-entry py-3">
                <p className="text-sm text-cocoa/75">{x.date} · {t.health.kinds[x.kind]}</p>
                <p className="mt-1 whitespace-pre-line text-lg">{x.text}</p>
                <button className={`no-print mt-1 ${link}`} onClick={() => removeHealth(x.id)}>{t.health.remove}</button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Medikamente */}
      <section className="mt-12" aria-labelledby="care-meds">
        <h2 id="care-meds" className={h2}>{t.meds.title}</h2>
        <form
          className="no-print mt-4 grid gap-4 sm:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (!m.name.trim()) return;
            addMed({ catId: cat.id, name: m.name.trim(), dose: m.dose.trim(), start: m.start, end: m.end, notes: m.notes.trim() });
            setM({ name: "", dose: "", start: "", end: "", notes: "" });
          }}
        >
          <label className="text-sm">{t.meds.name}<input required className={input} value={m.name} onChange={(e) => setM({ ...m, name: e.target.value })} /></label>
          <label className="text-sm">{t.meds.dose}<input className={input} value={m.dose} onChange={(e) => setM({ ...m, dose: e.target.value })} /></label>
          <label className="text-sm">{t.meds.start}<input type="date" className={input} value={m.start} onChange={(e) => setM({ ...m, start: e.target.value })} /></label>
          <label className="text-sm">{t.meds.end}<input type="date" className={input} value={m.end} onChange={(e) => setM({ ...m, end: e.target.value })} /></label>
          <label className="text-sm sm:col-span-2">{t.meds.notes}<input className={input} value={m.notes} onChange={(e) => setM({ ...m, notes: e.target.value })} /></label>
          <div className="sm:col-span-2"><button className={button}>{t.meds.add}</button></div>
        </form>
        {meds.length === 0 ? (
          <p className="mt-4 text-cocoa/75">{t.meds.empty}</p>
        ) : (
          <ul className="mt-4 divide-y divide-sand">
            {meds.map((x) => (
              <li key={x.id} className="print-entry py-3">
                <p className="text-lg">{x.name}{x.dose ? ` · ${x.dose}` : ""}</p>
                <p className="text-sm text-cocoa/75">
                  {[x.start && `${t.meds.from} ${x.start}`, x.end && `${t.meds.until} ${x.end}`].filter(Boolean).join(" ")}
                </p>
                {x.notes && <p className="mt-1 text-cocoa/85">{x.notes}</p>}
                <button className={`no-print mt-1 ${link}`} onClick={() => removeMed(x.id)}>{t.meds.remove}</button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <aside className="no-print mt-14 rounded-[10px] bg-sand/50 p-6">
        <h2 className="text-2xl">{t.productTitle}</h2>
        <p className="mt-2 text-cocoa/90">{t.productText}</p>
        <Link href={productHref} className="mt-3 inline-block text-cocoa underline underline-offset-4 hover:text-olive-deep">{t.productCta} →</Link>
      </aside>
    </div>
  );
}
