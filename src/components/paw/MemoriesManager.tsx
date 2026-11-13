"use client";

import { useState } from "react";
import { downscaleImage } from "@/lib/image";
import { usePawStore, type MemoryCategory } from "@/lib/paw-store";
import type { PawApp } from "@/data/paw-app";

const input = "mt-1 w-full rounded-lg border-[1.5px] border-taupe bg-ivory px-3 py-3 min-h-12 focus:border-cocoa focus:outline-2 focus:outline-offset-2 focus:outline-cocoa";
const button = "inline-flex min-h-11 items-center rounded-full bg-olive-deep px-6 text-[15px] font-medium text-ivory transition-colors hover:bg-cocoa";

export default function MemoriesManager({ t, savedFailed }: { t: PawApp["memories"]; savedFailed: string }) {
  const { cats, memories, addMemory, removeMemory, saveFailed } = usePawStore();
  const [form, setForm] = useState<{ catId: string; date: string; category: MemoryCategory; text: string; photo: string }>({
    catId: "", date: "", category: "everyday", text: "", photo: "",
  });
  const catId = form.catId || cats[0]?.id || "";
  const sorted = [...memories].sort((a, b) => b.date.localeCompare(a.date));

  if (cats.length === 0) return <p className="text-cocoa/75">{t.needCat}</p>;

  const onPhoto = async (file: File | undefined) => {
    if (!file) return;
    try {
      const photo = await downscaleImage(file);
      setForm((f) => ({ ...f, photo }));
    } catch {
      /* Bild nicht lesbar: ignorieren */
    }
  };

  return (
    <div>
      <form
        className="grid gap-4 sm:grid-cols-3"
        onSubmit={(e) => {
          e.preventDefault();
          if (!form.text.trim() || !form.date) return;
          addMemory({ catId, date: form.date, category: form.category, text: form.text.trim(), photo: form.photo || undefined });
          setForm({ ...form, text: "", photo: "" });
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
        <label className="text-sm sm:col-span-3">{t.photo}
          <input type="file" accept="image/*" className={`${input} file:mr-3 file:rounded-full file:border-0 file:bg-sand file:px-4 file:py-1.5`} onChange={(e) => onPhoto(e.target.files?.[0])} />
        </label>
        {form.photo && (
          <div className="flex items-end gap-3 sm:col-span-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={form.photo} alt="" className="h-24 w-24 rounded-lg object-cover" />
            <button type="button" className="text-sm text-olive-deep underline underline-offset-4" onClick={() => setForm({ ...form, photo: "" })}>{t.removePhoto}</button>
          </div>
        )}
        <div className="sm:col-span-3"><button className={button}>{t.add}</button></div>
      </form>
      {saveFailed && <p role="alert" className="mt-4 text-sm text-[#7a3f33]">{savedFailed}</p>}

      {sorted.length === 0 ? (
        <p className="mt-8 text-cocoa/75">{t.empty}</p>
      ) : (
        <ol className="mt-8 space-y-6 border-l-2 border-sage pl-5">
          {sorted.map((m) => (
            <li key={m.id}>
              <p className="text-sm text-cocoa/75">
                {m.date} · {cats.find((c) => c.id === m.catId)?.name} · {t.categories[m.category]}
              </p>
              <p className="mt-1 whitespace-pre-line text-lg text-cocoa/90">{m.text}</p>
              {m.photo && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={m.photo} alt="" className="mt-3 max-h-64 rounded-lg" />
              )}
              <button className="mt-2 text-sm text-olive-deep underline underline-offset-4" onClick={() => removeMemory(m.id)}>{t.remove}</button>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
