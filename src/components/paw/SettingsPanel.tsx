"use client";

import { usePawStore } from "@/lib/paw-store";
import type { PawApp } from "@/data/paw-app";

export default function SettingsPanel({ t }: { t: PawApp["settings"] }) {
  const { exportJson, clearAll } = usePawStore();
  const button = "rounded-full border border-olive px-5 py-2 text-sm text-olive transition-colors hover:bg-olive hover:text-ivory";
  return (
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
      <button className={button} onClick={() => { if (confirm(t.confirmClear)) clearAll(); }}>{t.clear}</button>
    </div>
  );
}
