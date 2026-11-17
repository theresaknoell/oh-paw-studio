"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { pawApp } from "@/data/paw-app";

// Leerzustand: erklärt, dass zuerst eine Katze nötig ist, und führt direkt dorthin.
export default function NeedCat({ text }: { text: string }) {
  const pathname = usePathname();
  const lang = pathname.startsWith("/en") ? "en" : "de";
  return (
    <div className="rounded-lg bg-sand/40 p-6">
      <p className="text-cocoa/85">{text}</p>
      <Link
        href={`/${lang}/my-paw-space/app/cats`}
        className="mt-4 inline-flex min-h-11 items-center rounded-full bg-olive-deep px-6 text-[15px] font-medium text-ivory transition-colors hover:bg-cocoa"
      >
        {pawApp[lang].cats.add}
      </Link>
    </div>
  );
}
