"use client";

import Link from "next/link";
import { usePawStore } from "@/lib/paw-store";
import type { PawApp } from "@/data/paw-app";

const primary = "inline-flex min-h-11 items-center rounded-full bg-olive-deep px-6 text-[15px] font-medium text-ivory transition-colors hover:bg-cocoa";
const tile = "block h-full rounded-lg border border-sand bg-sand/30 p-6 transition-colors hover:bg-sand/60";

export default function DashboardSummary({ lang, t }: { lang: string; t: PawApp["dashboard"] }) {
  const { cats, memories } = usePawStore();
  const base = `/${lang}/my-paw-space/app`;
  const shortcuts = [
    { href: `${base}/memories`, label: t.shortcuts.memories },
    { href: `${base}/book`, label: t.shortcuts.book },
    { href: `${base}/care`, label: t.shortcuts.care },
  ];
  return (
    <>
      {cats.length === 0 && (
        <section className="mt-8 rounded-lg bg-sand/50 p-6 md:p-8">
          <h2 className="text-3xl">{t.firstTitle}</h2>
          <p className="mt-2 max-w-xl text-cocoa/85">{t.firstText}</p>
          <Link href={`${base}/cats`} className={`${primary} mt-5`}>{t.firstCta}</Link>
        </section>
      )}
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        <li><Link className={tile} href={`${base}/cats`}>
          <span className="text-4xl font-serif">{cats.length}</span>
          <span className="mt-1 block text-cocoa/80">{t.cats}</span></Link></li>
        <li><Link className={tile} href={`${base}/memories`}>
          <span className="text-4xl font-serif">{memories.length}</span>
          <span className="mt-1 block text-cocoa/80">{t.memories}</span></Link></li>
      </ul>
      {cats.length > 0 && (
        <>
          <h2 className="mt-10 text-3xl">{t.nextTitle}</h2>
          <ul className="mt-4 flex flex-wrap gap-3">
            {shortcuts.map((s) => (
              <li key={s.href}>
                <Link href={s.href} className="inline-flex min-h-11 items-center rounded-full border-[1.5px] border-olive-deep px-6 text-[15px] font-medium text-olive-deep transition-colors hover:bg-olive-deep hover:text-ivory">
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
