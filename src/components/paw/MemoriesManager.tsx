"use client";

import { useState } from "react";
import { usePawStore, type MemoryCategory } from "@/lib/paw-store";
import type { PawApp } from "@/data/paw-app";

const input = "mt-1 w-full rounded-md border border-sand bg-ivory px-3 py-2";
const button = "rounded-full bg-olive px-5 py-2 text-sm text-ivory transition-colors hover:bg-cocoa";

export default function MemoriesManager({ t }: { t: PawApp["memories"] }) {
  const { cats, memories, addMemory, removeMemory } = usePawStore();
  const [form, setForm] = useState<{ catId: string; date: string; category: MemoryCategory; text: string }>({
    catId: "", date: "", category: "everyday", text: "",
  });
  const catId = form.catId || cats[0]?.id || "";
  const sorted = [...memories].sort((a, b) => b.date.localeCompare(a.date));

  if (cats.length === 0) return <p className="text-cocoa/70">{t.needCat}</p>;

  return (
    <div>
      <form
        className="grid gap-4 sm:grid-cols-3"
        onSubmit={(e) => {
          e.preventDefault();
          if (!form.text.trim() || !form.date) return;
          addMemory({ ...form, catId, text: form.text.trim() });
          setForm({ ...form, text: "" });
        }}
      >
        <label className="text-sm">{t.cat}
          <select className={input} value={catId} onChange={(e) => setForm({ ...form, catId: e.target.value })}>
            {cats.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </label>
        <label className="text-sm">{t.date}
          <input required type="date" className={input} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
        </label>
        <label className="text-sm">{t.category}
          <select className={input} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as MemoryCategory })}>
            {(Object.keys(t.categories) as MemoryCategory[]).map((k) => <option key={k} value={k}>{t.categories[k]}</option>)}
          </select>
        </label>
        <label className="text-sm sm:col-span-3">{t.text}
          <textarea required rows={3} className={input} value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} />
        </label>
        <div className="sm:col-span-3"><button className={button}>{t.add}</button></div>
      </form>

      {sorted.length === 0 ? (
        <p className="mt-8 text-cocoa/70">{t.empty}</p>
      ) : (
        <ol className="mt-8 space-y-5 border-l-2 border-sage pl-5">
          {sorted.map((m) => (
            <li key={m.id}>
              <p className="text-sm text-cocoa/60">
                {m.date} · {cats.find((c) => c.id === m.catId)?.name} · {t.categories[m.category]}
              </p>
              <p className="mt-1 whitespace-pre-line text-lg text-cocoa/90">{m.text}</p>
              <button className="mt-1 text-sm text-olive underline underline-offset-4" onClick={() => removeMemory(m.id)}>{t.remove}</button>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
