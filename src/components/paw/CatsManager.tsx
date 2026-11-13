"use client";

import { useState } from "react";
import { downscaleImage } from "@/lib/image";
import { usePawStore } from "@/lib/paw-store";
import type { PawApp } from "@/data/paw-app";

const input = "mt-1 w-full rounded-lg border-[1.5px] border-taupe bg-ivory px-3 py-3 min-h-12 focus:border-cocoa focus:outline-2 focus:outline-offset-2 focus:outline-cocoa";
const button = "inline-flex min-h-11 items-center rounded-full bg-olive-deep px-6 text-[15px] font-medium text-ivory transition-colors hover:bg-cocoa";
const ghost = "inline-flex min-h-11 items-center rounded-full border-[1.5px] border-olive-deep px-6 text-[15px] font-medium text-olive-deep transition-colors hover:bg-olive-deep hover:text-ivory";
const empty = { name: "", birthday: "", since: "", notes: "", photo: "" };

export default function CatsManager({ t }: { t: PawApp["cats"] }) {
  const { cats, addCat, updateCat, removeCat, saveFailed } = usePawStore();
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState<string | null>(null);

  const onPhoto = async (file: File | undefined) => {
    if (!file) return;
    try {
      setForm((f) => ({ ...f, photo: "" }));
      const photo = await downscaleImage(file);
      setForm((f) => ({ ...f, photo }));
    } catch {
      /* Bild nicht lesbar: ignorieren */
    }
  };

  const startEdit = (id: string) => {
    const c = cats.find((x) => x.id === id);
    if (!c) return;
    setEditing(id);
    setForm({ name: c.name, birthday: c.birthday, since: c.since, notes: c.notes, photo: c.photo ?? "" });
  };
  const reset = () => { setEditing(null); setForm(empty); };

  return (
    <div>
      <form
        className="grid gap-4 sm:grid-cols-2"
        onSubmit={(e) => {
          e.preventDefault();
          if (!form.name.trim()) return;
          const data = { ...form, name: form.name.trim(), photo: form.photo || undefined };
          if (editing) updateCat(editing, data);
          else addCat(data);
          reset();
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
        <label className="text-sm sm:col-span-2">{t.photo}
          <input type="file" accept="image/*" className={`${input} file:mr-3 file:rounded-full file:border-0 file:bg-sand file:px-4 file:py-1.5`} onChange={(e) => onPhoto(e.target.files?.[0])} />
        </label>
        {form.photo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={form.photo} alt="" className="h-24 w-24 rounded-lg object-cover" />
        )}
        <div className="flex flex-wrap gap-3 sm:col-span-2">
          <button className={button}>{editing ? t.save : t.add}</button>
          {editing && <button type="button" className={ghost} onClick={reset}>{t.cancel}</button>}
        </div>
      </form>
      {saveFailed && <p role="alert" className="mt-4 text-sm text-[#7a3f33]">{t.saveFailed}</p>}

      {cats.length === 0 ? (
        <p className="mt-8 text-cocoa/75">{t.empty}</p>
      ) : (
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {cats.map((c) => (
            <li key={c.id} className="flex gap-4 rounded-[10px] bg-sand/40 p-5">
              {c.photo && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={c.photo} alt="" className="h-20 w-20 shrink-0 rounded-lg object-cover" />
              )}
              <div>
                <h2 className="text-2xl">{c.name}</h2>
                <p className="mt-1 text-sm text-cocoa/75">
                  {[c.birthday && `${t.birthday}: ${c.birthday}`, c.since && `${t.since}: ${c.since}`].filter(Boolean).join(" · ")}
                </p>
                {c.notes && <p className="mt-2 text-cocoa/85">{c.notes}</p>}
                <p className="mt-3 flex gap-4 text-sm">
                  <button className="text-olive-deep underline underline-offset-4" onClick={() => startEdit(c.id)}>{t.edit}</button>
                  <button className="text-olive-deep underline underline-offset-4" onClick={() => { if (confirm(t.confirmRemove)) removeCat(c.id); }}>{t.remove}</button>
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
