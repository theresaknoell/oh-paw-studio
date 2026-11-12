import Image from "next/image";
import { notFound } from "next/navigation";
import { productsFor } from "@/data/products";
import { getDictionary, hasLocale } from "../dictionaries";

export default async function Products({
  params,
}: PageProps<"/[lang]/products">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const price = new Intl.NumberFormat(lang === "de" ? "de-DE" : "en-IE", {
    style: "currency",
    currency: "EUR",
  });

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-16">
      <h1 className="text-5xl">{dict.products.title}</h1>
      <p className="mt-4 text-lg text-cocoa/80">{dict.products.intro}</p>
      <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {productsFor(lang).map((p) => (
          <li key={p.slug} className="flex flex-col">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-sand">
              {p.image && (
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 100vw"
                  className="object-cover"
                />
              )}
            </div>
            <h2 className="mt-4 text-2xl">{p.title}</h2>
            <p className="mt-1 text-cocoa/70">{price.format(p.priceEur)}</p>
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 self-start rounded-full bg-olive px-5 py-2 text-sm text-ivory transition-colors hover:bg-cocoa"
            >
              {dict.products.buy}
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
