"use client";

import { useRef, useState } from "react";
import { usePawStore } from "@/lib/paw-store";
import type { PawApp } from "@/data/paw-app";

export default function SettingsPanel({ t }: { t: PawApp["settings"] }) {
  const { exportJson, clearAll, importJson, storageKb } = usePawStore();
  const fileRef = useRef<HTMLInputElement>(null);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const button = "inline-flex min-h-11 items-center rounded-full border-[1.5px] border-olive-deep px-6 text-[15px] font-medium text-olive-deep transition-colors hover:bg-olive-deep hover:text-ivory";
  const kb = storageKb;

  return (
    <div>
      <div className="flex flex-wrap gap-4">
        <button
          className={button}
          onClick={() => {
            const url = URL.createObjectURL(new Blob([exportJson()], { type: "application/json" }));
            const a = document.createElement("a");
            a.href = url; a.download = "my-paw-space.json"; a.click();
            URL.revokeObjectURL(url);
          }}
        >{t.export}</button>
        <button className={button} onClick={() => fileRef.current?.click()}>{t.import}</button>
        <input
          ref={fileRef}
          type="file"
          accept="application/json"
          className="hidden"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            e.target.value = "";
            if (!file) return;
            const ok = importJson(await file.text());
            setMsg({ ok, text: ok ? t.importOk : t.importError });
          }}
        />
        <button className={button} onClick={() => { if (confirm(t.confirmClear)) clearAll(); }}>{t.clear}</button>
      </div>
      {msg && <p role="status" className={`mt-4 text-sm ${msg.ok ? "text-cocoa/85" : "text-[#7a3f33]"}`}>{msg.text}</p>}
      <p className="mt-6 text-sm text-cocoa/75">{t.storage}: {kb} KB (von ca. 5000 KB)</p>
      {kb > 3500 && <p role="alert" className="mt-1 text-sm text-[#7a3f33]">{t.storageFull}</p>}
    </div>
  );
}
