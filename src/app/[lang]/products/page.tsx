import { Suspense } from "react";
import { notFound } from "next/navigation";
import BundleBand from "@/components/shop/BundleBand";
import { ShopBrowser, ShopStatic, type ShopItem } from "@/components/shop/ShopBrowser";
import { productDetails } from "@/data/product-details";
import { phases, phasesOf } from "@/data/product-pairs";
import { productsFor, worlds } from "@/data/products";
import { getDictionary, hasLocale } from "../dictionaries";

export default async function Products({ params }: PageProps<"/[lang]/products">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const price = new Intl.NumberFormat(lang === "de" ? "de-DE" : "en-IE", { style: "currency", currency: "EUR" });

  const items: ShopItem[] = productsFor(lang).map((p) => ({
    slug: p.slug,
    title: p.title,
    world: p.world,
    tagline: productDetails[p.slug]?.tagline ?? "",
    price: price.format(p.priceEur),
    image: p.image,
    phases: phasesOf(p.slug),
    href: `/${lang}/products/${p.slug}`,
  }));
  const props = {
    items,
    worlds: worlds.map((w) => ({ id: w, ...dict.home.worlds[w] })),
    phases: phases.map((p) => ({ id: p, label: dict.shop.phases[p] })),
    t: dict.shop,
    bundleBand: (
      <BundleBand
        lang={lang}
        title={dict.shop.bundleTitle}
        cta={dict.shop.bundleAll}
        save={dict.products.save}
        price={price}
      />
    ),
  };

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 md:py-16">
      <h1 className="text-4xl md:text-5xl">{dict.shop.title}</h1>
      <p className="mt-4 font-serif text-2xl leading-9 text-olive-deep">{dict.shop.lead}</p>
      <div className="mt-10">
        <Suspense fallback={<ShopStatic {...props} />}>
          <ShopBrowser {...props} />
        </Suspense>
      </div>
    </main>
  );
}
