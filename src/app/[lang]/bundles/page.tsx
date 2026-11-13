import Link from "next/link";
import { notFound } from "next/navigation";
import BundleCards from "@/components/BundleCards";
import { getDictionary, hasLocale } from "../dictionaries";

export default async function Bundles({ params }: PageProps<"/[lang]/bundles">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const price = new Intl.NumberFormat(lang === "de" ? "de-DE" : "en-IE", {
    style: "currency",
    currency: "EUR",
  });

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 md:py-16">
      <h1 className="text-4xl md:text-5xl">{dict.bundlesPage.lead}</h1>
      <p className="mt-4 max-w-2xl font-serif text-2xl leading-9 text-olive-deep">
        {dict.bundlesPage.intro}
      </p>
      <div className="mt-10">
        <BundleCards lang={lang} t={dict.products} price={price} headingLevel="h2" />
      </div>
      <Link
        href={`/${lang}/products`}
        className="mt-10 inline-block text-olive-deep underline underline-offset-4 hover:text-cocoa"
      >
        {dict.bundlesPage.back}
      </Link>
    </main>
  );
}
