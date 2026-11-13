import { notFound } from "next/navigation";
import BookManager from "@/components/paw/BookManager";
import { pawApp } from "@/data/paw-app";
import { productPairs } from "@/data/product-pairs";
import { hasLocale } from "../../../dictionaries";

export default async function Book({ params }: PageProps<"/[lang]/my-paw-space/app/book">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = pawApp[lang];
  const slug = productPairs.find((p) => p.id === "memory-book")?.slugs[lang];
  return (
    <>
      <h1 className="text-5xl">{t.book.title}</h1>
      <p className="mt-4 mb-6 text-cocoa/80">{t.book.intro}</p>
      <BookManager lang={lang} t={t.book} productHref={`/${lang}/products/${slug}`} saveFailed={t.cats.saveFailed} />
    </>
  );
}
