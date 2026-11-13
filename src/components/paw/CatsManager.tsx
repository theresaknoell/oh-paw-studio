"use client";

import { useState } from "react";
import { usePawStore } from "@/lib/paw-store";
import type { PawApp } from "@/data/paw-app";

const input = "mt-1 w-full rounded-md border border-sand bg-ivory px-3 py-2";
const button = "rounded-full bg-olive-deep px-5 py-2 text-sm text-ivory transition-colors hover:bg-cocoa";

export default function CatsManager({ t }: { t: PawApp["cats"] }) {
  const { cats, addCat, removeCat } = usePawStore();
  const [form, setForm] = useState({ name: "", birthday: "", since: "", notes: "" });

  return (
    <div>
      <form
        className="grid gap-4 sm:grid-cols-2"
        onSubmit={(e) => {
          e.preventDefault();
          if (!form.name.trim()) return;
          addCat({ ...form, name: form.name.trim() });
          setForm({ name: "", birthday: "", since: "", notes: "" });
        }}
      >
        <label className="text-sm">{t.name}
          <input required className={input} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </label>
        <label className="text-sm">{t.birthday}
          <input type="date" className={input} value={form.birthday} onChange={(e) => setForm({ ...form, birthday: e.target.value })} />
        </label>
        <label className="text-sm">{t.since}
          <input type="date" className={input} value={form.since} onChange={(e) => setForm({ ...form, since: e.target.value })} />
        </label>
        <label className="text-sm">{t.notes}
          <input className={input} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
        </label>
        <div className="sm:col-span-2"><button className={button}>{t.add}</button></div>
      </form>

      {cats.length === 0 ? (
        <p className="mt-8 text-cocoa/75">{t.empty}</p>
      ) : (
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {cats.map((c) => (
            <li key={c.id} className="rounded-lg border border-sand bg-sand/30 p-5">
              <h3 className="text-2xl">{c.name}</h3>
              <p className="mt-1 text-sm text-cocoa/75">
                {[c.birthday && `${t.birthday}: ${c.birthday}`, c.since && `${t.since}: ${c.since}`].filter(Boolean).join(" · ")}
              </p>
              {c.notes && <p className="mt-2 text-cocoa/85">{c.notes}</p>}
              <button
                className="mt-3 text-sm text-olive-deep underline underline-offset-4"
                onClick={() => { if (confirm(t.confirmRemove)) removeCat(c.id); }}
              >{t.remove}</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
