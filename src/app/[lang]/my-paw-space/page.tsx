import type { Metadata } from "next";
import { pageMetadata } from "@/lib/meta";
import Link from "next/link";
import { notFound } from "next/navigation";
import NewsletterSignup from "@/components/NewsletterSignup";
import { newsletter } from "@/data/newsletter";
import { pawSpace } from "@/data/paw-space";
import { getDictionary, hasLocale } from "../dictionaries";

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
  const dict = await getDictionary(lang);

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-16">
      <p className="inline-block rounded-full bg-sage/30 px-3 py-1 text-sm text-cocoa">
        {page.status}
      </p>
      <h1 className="mt-4 text-6xl">{page.title}</h1>
      <p className="mt-6 max-w-2xl font-serif text-2xl leading-9 text-olive-deep">
        {page.lead}
      </p>

      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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

      {newsletter.enabled && (
        <section className="mt-14 rounded-[10px] bg-sand/50 p-6 md:p-8">
          <h2 className="text-3xl">{dict.newsletter.waitTitle}</h2>
          <p className="mt-2 mb-5 max-w-xl text-cocoa/90">{dict.newsletter.waitText}</p>
          <div className="relative max-w-xl">
            <NewsletterSignup lang={lang} action={newsletter.pawSpaceAction || newsletter.action} t={dict.newsletter} />
          </div>
        </section>
      )}
      <Link
        href={`/${lang}/my-paw-space/app`}
        className="mt-6 inline-block rounded-full bg-olive-deep px-6 py-3 text-sm text-ivory transition-colors hover:bg-cocoa"
      >
        {lang === "de" ? "Demo ausprobieren" : "Try the demo"}
      </Link>
    </main>
  );
}
