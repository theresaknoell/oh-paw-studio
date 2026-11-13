import type { Metadata } from "next";
import { pageMetadata } from "@/lib/meta";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pawSpace } from "@/data/paw-space";
import { hasLocale } from "../dictionaries";

export async function generateMetadata({ params }: PageProps<"/[lang]/my-paw-space">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return pageMetadata(lang, "pawSpace");
}

export default async function PawSpace({
  params,
}: PageProps<"/[lang]/my-paw-space">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const page = pawSpace[lang];

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-16">
      <p className="inline-block rounded-full bg-sage/30 px-3 py-1 text-sm text-cocoa">
        {page.status}
      </p>
      <h1 className="mt-4 text-6xl">{page.title}</h1>
      <p className="mt-6 max-w-2xl font-serif text-2xl leading-9 text-olive-deep">
        {page.lead}
      </p>

      <ul className="mt-12 grid gap-6 sm:grid-cols-3">
        {page.features.map((f) => (
          <li key={f.title} className="rounded-lg border border-sand bg-sand/30 p-6">
            <h2 className="text-2xl">{f.title}</h2>
            <p className="mt-2 text-cocoa/80">{f.text}</p>
          </li>
        ))}
      </ul>

      <h2 className="mt-16 text-4xl">{page.roadmapTitle}</h2>
      <ol className="mt-6 space-y-4">
        {page.roadmap.map((r) => (
          <li key={r.title} className="border-l-2 border-sage pl-4 text-lg">
            <strong className="font-medium">{r.title}: </strong>
            <span className="text-cocoa/85">{r.text}</span>
          </li>
        ))}
      </ol>

      <p className="mt-12 text-lg text-cocoa/80">{page.waitlist}</p>
      <Link
        href={`/${lang}/my-paw-space/app`}
        className="mt-6 inline-block rounded-full bg-olive-deep px-6 py-3 text-sm text-ivory transition-colors hover:bg-cocoa"
      >
        {lang === "de" ? "Demo ausprobieren" : "Try the demo"}
      </Link>
    </main>
  );
}
