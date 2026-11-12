import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "./dictionaries";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const otherLang = lang === "de" ? "en" : "de";

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 p-8 text-center">
      <h1 className="text-4xl font-semibold tracking-tight">
        {dict.home.title}
      </h1>
      <p className="max-w-md text-lg text-zinc-600">{dict.home.intro}</p>
      <Link href={`/${otherLang}`} className="underline">
        {dict.nav.switchLanguage}
      </Link>
    </main>
  );
}
