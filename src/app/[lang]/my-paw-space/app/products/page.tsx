import { notFound } from "next/navigation";
import { pawApp } from "@/data/paw-app";
import { productsFor } from "@/data/products";
import { hasLocale } from "../../../dictionaries";

export default async function MyProducts({ params }: PageProps<"/[lang]/my-paw-space/app/products">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = pawApp[lang].products;
  return (
    <>
      <h1 className="text-5xl">{t.title}</h1>
      <p className="mt-4 text-cocoa/80">{t.intro}</p>
      <ul className="mt-8 divide-y divide-sand">
        {productsFor(lang).map((p) => (
          <li key={p.slug} className="flex items-center justify-between gap-4 py-4">
            <span className="text-lg">{p.title}</span>
            <a href={p.url} target="_blank" rel="noopener noreferrer" className="shrink-0 text-sm text-olive-deep underline underline-offset-4">
              {t.open}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
