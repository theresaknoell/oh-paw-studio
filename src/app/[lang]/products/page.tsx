import Image from "next/image";
import { notFound } from "next/navigation";
import BundleCards from "@/components/BundleCards";
import { productDetails } from "@/data/product-details";
import { productsInWorld, worlds } from "@/data/products";
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
      <section id="bundles" className="mt-14 scroll-mt-8">
        <h2 className="text-4xl">{dict.products.bundlesTitle}</h2>
        <p className="mt-2 text-cocoa/80">{dict.products.bundlesIntro}</p>
        <div className="mt-6">
          <BundleCards lang={lang} t={dict.products} price={price} />
        </div>
      </section>

      {worlds.map((w) => (
        <section key={w} id={w} className="mt-14 scroll-mt-8">
          <h2 className="text-4xl">{dict.home.worlds[w].title}</h2>
          <p className="mt-2 text-cocoa/80">{dict.home.worlds[w].text}</p>
          <ul className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {productsInWorld(lang, w).map((p) => (
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
            <h3 className="mt-4 text-2xl">{p.title}</h3>
            <p className="mt-1 text-cocoa/75">{price.format(p.priceEur)}</p>
            {productDetails[p.slug] && (
              <>
                <p className="mt-2 text-cocoa/85">
                  {productDetails[p.slug].tagline}
                </p>
                <p className="mt-1 text-sm text-cocoa/75">
                  {dict.products.format}
                  {productDetails[p.slug].pages
                    ? ` · ${productDetails[p.slug].pages} ${dict.products.pages}`
                    : ""}
                </p>
                <details className="mt-3 text-sm text-cocoa/85">
                  <summary className="cursor-pointer text-olive-deep">
                    {dict.products.inside}
                  </summary>
                  <ul className="mt-2 list-disc space-y-1 pl-5">
                    {productDetails[p.slug].inside.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </details>
              </>
            )}
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 self-start rounded-full bg-olive-deep px-5 py-2 text-sm text-ivory transition-colors hover:bg-cocoa"
            >
              {dict.products.buy}
            </a>
          </li>
        ))}
      </ul>
        </section>
      ))}
    </main>
  );
}
