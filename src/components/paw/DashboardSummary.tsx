"use client";

import Link from "next/link";
import { usePawStore } from "@/lib/paw-store";
import type { PawApp } from "@/data/paw-app";

export default function DashboardSummary({ lang, t }: { lang: string; t: PawApp["dashboard"] }) {
  const { cats, memories } = usePawStore();
  const tile = "rounded-lg border border-sand bg-sand/30 p-6 transition-colors hover:bg-sand/60";
  return (
    <ul className="mt-8 grid gap-4 sm:grid-cols-2">
      <li><Link className={`${tile} block`} href={`/${lang}/my-paw-space/app/cats`}>
        <span className="text-4xl font-serif">{cats.length}</span>
        <span className="mt-1 block text-cocoa/80">{t.cats}</span></Link></li>
      <li><Link className={`${tile} block`} href={`/${lang}/my-paw-space/app/memories`}>
        <span className="text-4xl font-serif">{memories.length}</span>
        <span className="mt-1 block text-cocoa/80">{t.memories}</span></Link></li>
    </ul>
  );
}
