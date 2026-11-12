import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "./dictionaries";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-16 text-center">
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
        href={`/${lang}/products`}
        className="rounded-full bg-olive px-6 py-3 text-sm text-ivory transition-colors hover:bg-cocoa"
      >
        {dict.home.cta}
      </Link>
    </main>
  );
}
