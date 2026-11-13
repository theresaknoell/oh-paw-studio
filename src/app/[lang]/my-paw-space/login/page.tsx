import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pawApp } from "@/data/paw-app";
import { hasLocale } from "../../dictionaries";

export const metadata: Metadata = { robots: { index: false, follow: false } };

// Vorbereitete Anmeldeseite. Beim Livegang wird das Formular mit Supabase verbunden (siehe docs/my-paw-space-livegang.md).
export default async function Login({ params }: PageProps<"/[lang]/my-paw-space/login">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = pawApp[lang].login;
  return (
    <main className="mx-auto w-full max-w-md px-4 py-14 sm:px-6">
      <h1 className="text-5xl">{t.title}</h1>
      <p className="mt-4 text-lg text-cocoa/85">{t.intro}</p>
      <form className="mt-8" aria-describedby="login-note">
        <label htmlFor="email" className="text-sm">{t.email}</label>
        <input
          id="email"
          type="email"
          disabled
          className="mt-1 w-full min-h-12 rounded-lg border-[1.5px] border-taupe bg-sand/40 px-3"
        />
        <button
          type="button"
          disabled
          className="mt-4 inline-flex min-h-12 items-center rounded-full bg-sand px-8 text-[15px] font-medium text-cocoa/70"
        >
          {t.submit}
        </button>
        <p id="login-note" className="mt-3 text-sm text-cocoa/80">{t.note}</p>
      </form>
      <p className="mt-10 flex flex-wrap gap-6">
        <Link href={`/${lang}/my-paw-space/app`} className="text-olive-deep underline underline-offset-4 hover:text-cocoa">{t.demo}</Link>
        <Link href={`/${lang}/my-paw-space`} className="text-olive-deep underline underline-offset-4 hover:text-cocoa">{t.back}</Link>
      </p>
    </main>
  );
}
