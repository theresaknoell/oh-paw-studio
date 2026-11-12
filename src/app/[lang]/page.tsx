import Image from "next/image";
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
      <Image
        src="/logo.webp"
        alt="Oh Paw Studio"
        width={320}
        height={320}
        priority
       
      />
      <h1 className="text-5xl tracking-tight">{dict.home.title}</h1>
      <p className="max-w-md text-lg text-cocoa/80">{dict.home.intro}</p>
      <Link
        href={`/${otherLang}`}
        className="rounded-full bg-olive px-5 py-2 text-sm text-ivory transition-colors hover:bg-cocoa"
      >
        {dict.nav.switchLanguage}
      </Link>
    </main>
  );
}
