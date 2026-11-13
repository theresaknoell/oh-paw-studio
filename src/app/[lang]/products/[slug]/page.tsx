import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import StickyBuyBar from "@/components/StickyBuyBar";
import { bundles, bundleView } from "@/data/bundles";
import { productDetails } from "@/data/product-details";
import { counterpartSlug, pairOf, productPairs } from "@/data/product-pairs";
import { products, productsFor } from "@/data/products";
import { siteUrl } from "@/lib/site";
import { getPost } from "@/lib/blog";
import { alternates } from "@/lib/meta";
import { getDictionary, hasLocale } from "../../dictionaries";

export function generateStaticParams() {
  return products.map((p) => ({ lang: p.lang, slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/products/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const p = productsFor(lang).find((x) => x.slug === slug);
  if (!p) return {};
  const d = productDetails[slug];
  const other = counterpartSlug(slug, lang);
  const own = `/products/${slug}`;
  return {
    title: p.title,
    description: d?.tagline,
    alternates: other
      ? alternates(lang, lang === "de" ? { de: own, en: `/products/${other}` } : { en: own, de: `/products/${other}` })
      : { canonical: `/${lang}${own}` },
    openGraph: { title: p.title, description: d?.tagline, images: p.image ? [{ url: p.image }] : undefined },
  };
}

export default async function ProductPage({
  params,
}: PageProps<"/[lang]/products/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const product = productsFor(lang).find((x) => x.slug === slug);
  if (!product) notFound();

  const dict = await getDictionary(lang);
  const t = dict.productPage;
  const d = productDetails[slug];
  const pair = pairOf(slug);
  const printOnly = pair?.id === "memory-book";
  const health = pair?.id !== "memory-book";
  const price = new Intl.NumberFormat(lang === "de" ? "de-DE" : "en-IE", { style: "currency", currency: "EUR" });
  const world = dict.home.worlds[product.world];
  const base = `/${lang}`;

  const otherSlug = counterpartSlug(slug, lang);
  const bundle = bundles
    .filter((b) => b.items[lang].includes(slug))
    .map((b) => bundleView(b, lang))
    .sort((a, b) => b.saving - a.saving)[0];
  const related = (pair?.related ?? [])
    .map((id) => productPairs.find((x) => x.id === id))
    .map((x) => (x ? productsFor(lang).find((p) => p.slug === x.slugs[lang]) : undefined))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const postDe = pair?.post;
  const post = postDe
    ? lang === "de"
      ? getPost("de", postDe)
      : getPost("en", getPost("de", postDe)?.pair ?? "")
    : undefined;

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 md:py-12">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.title,
            description: [d?.tagline, d?.intro[0]].filter(Boolean).join(". "),
            image: product.image ? [product.image] : undefined,
            category: world.title,
            inLanguage: lang,
            brand: { "@type": "Brand", name: "Oh Paw Studio" },
            url: `${siteUrl}/${lang}/products/${slug}`,
            offers: {
              "@type": "Offer",
              price: product.priceEur.toFixed(2),
              priceCurrency: "EUR",
              availability: "https://schema.org/InStock",
              url: `${siteUrl}/${lang}/products/${slug}`,
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: t.crumbShop, item: `${siteUrl}/${lang}/products` },
              { "@type": "ListItem", position: 2, name: world.title, item: `${siteUrl}/${lang}/products?world=${product.world}` },
              { "@type": "ListItem", position: 3, name: product.title },
            ],
          },
        ]}
      />
      <nav aria-label={t.breadcrumb} className="text-sm text-cocoa/75">
        <ol className="flex flex-wrap items-center gap-x-2">
          <li><Link href={`${base}/products`} className="hover:underline">{t.crumbShop}</Link></li>
          <li aria-hidden>›</li>
          <li><Link href={`${base}/products?world=${product.world}`} className="hover:underline">{world.title}</Link></li>
          <li aria-hidden>›</li>
          <li aria-current="page" className="text-cocoa">{product.title}</li>
        </ol>
      </nav>

      <div className="mt-6 grid gap-8 md:grid-cols-2 md:gap-12">
        <div className="relative aspect-square overflow-hidden rounded-[10px] bg-sand">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.title}
              fill
              priority
              sizes="(min-width: 768px) 480px, 100vw"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-sm text-cocoa/90">
              <Image src="/logo.webp" alt="" width={120} height={120} className="opacity-60" />
              {t.imageSoon}
            </div>
          )}
        </div>

        <div className="md:sticky md:top-24 md:self-start">
          <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-cocoa/75">{world.title}</p>
          <h1 className="mt-2 text-4xl md:text-5xl">{product.title}</h1>
          {d && <p className="mt-3 font-serif text-2xl leading-8 text-olive-deep">{d.tagline}</p>}
          <p className="mt-5 font-serif text-4xl">{price.format(product.priceEur)}</p>
          <a
            id="buy-main"
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex min-h-12 items-center rounded-full bg-olive-deep px-8 text-[15px] font-medium text-ivory transition-colors hover:bg-cocoa"
          >
            {t.buy}
          </a>
          <ul className="mt-5 space-y-1 text-[15px] text-cocoa/85">
            <li>✓ {t.trustInstant}</li>
            <li>✓ {printOnly ? t.trustPrint : t.trustBoth}</li>
            {d?.pages && <li>✓ {d.pages} {t.trustPages}</li>}
            <li>✓ {t.trustPay}</li>
          </ul>
          {otherSlug && (
            <p className="mt-4 text-sm">
              <Link
                href={`/${lang === "de" ? "en" : "de"}/products/${otherSlug}`}
                hrefLang={lang === "de" ? "en" : "de"}
                className="text-olive-deep underline underline-offset-4 hover:text-cocoa"
              >
                {t.alsoIn}
              </Link>
            </p>
          )}
        </div>
      </div>

      {d && (
        <div className="mt-14 grid gap-10 md:grid-cols-2 md:gap-12">
          <section>
            <h2 className="text-3xl">{t.about}</h2>
            {d.intro.map((p) => (
              <p key={p} className="mt-4 text-[17px] leading-7 text-cocoa/90">{p}</p>
            ))}
          </section>
          <section>
            <h2 className="text-3xl">{t.expect}</h2>
            <ul className="mt-4 space-y-3">
              {d.inside.map((it) => (
                <li key={it} className="border-l-2 border-sage pl-4 text-[17px] leading-7 text-cocoa/90">{it}</li>
              ))}
            </ul>
            <details className="mt-6 border-t border-sand pt-4">
              <summary className="cursor-pointer py-1 font-medium">{t.format}</summary>
              <p className="mt-3 text-cocoa/85">{printOnly ? t.formatTextPrintOnly : t.formatText}</p>
              <p className="mt-2 text-sm text-cocoa/75">{t.note}{health ? t.noteHealth : ""}</p>
            </details>
          </section>
        </div>
      )}

      {bundle && (
        <section className="mt-14 rounded-[10px] bg-sand/50 p-6 md:flex md:items-center md:justify-between md:gap-8">
          <div>
            <span className="inline-block rounded-full bg-sand px-3 py-0.5 text-sm">{t.inBundle}</span>
            <h2 className="mt-3 text-3xl">{bundle.title}</h2>
            <p className="mt-2 text-cocoa/85">
              {bundle.items.map((i) => i.title).join(" · ")}
            </p>
            <p className="mt-2">
              <span className="font-serif text-2xl">{price.format(bundle.price)}</span>{" "}
              <span className="text-cocoa/85 line-through">{price.format(bundle.total)}</span>{" "}
              <span className="ml-1 inline-block rounded-full bg-sage/35 px-3 py-0.5 text-sm">
                {dict.products.save} {price.format(bundle.saving)}
              </span>
            </p>
          </div>
          <Link
            href={`${base}/bundles`}
            className="mt-5 inline-flex min-h-11 items-center rounded-full border-[1.5px] border-olive-deep px-6 text-[15px] font-medium text-olive-deep transition-colors hover:bg-olive-deep hover:text-ivory md:mt-0 md:shrink-0"
          >
            {t.viewBundle}
          </Link>
        </section>
      )}

      {(related.length > 0 || post) && (
        <section className="mt-14">
          <h2 className="text-3xl">{t.together}</h2>
          <ul className="mt-6 grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={`${base}/products/${r.slug}`} className="group block">
                  <div className="relative aspect-square overflow-hidden rounded-[10px] bg-sand">
                    {r.image && (
                      <Image src={r.image} alt={r.title} fill sizes="(min-width: 768px) 300px, 50vw" className="object-cover transition-transform duration-300 group-hover:-translate-y-0.5" />
                    )}
                  </div>
                  <h3 className="mt-3 text-2xl group-hover:text-olive-deep">{r.title}</h3>
                  <p className="text-cocoa/75">{price.format(r.priceEur)}</p>
                </Link>
              </li>
            ))}
            {post && (
              <li>
                <Link href={`${base}/blog/${post.slug}`} className="group block rounded-[10px] bg-sand/50 p-5">
                  <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-cocoa/75">{t.help}</p>
                  <h3 className="mt-2 text-2xl group-hover:text-olive-deep">{post.title}</h3>
                  <p className="mt-2 text-sm text-cocoa/85">{post.excerpt}</p>
                  <span className="mt-3 inline-block text-sm text-olive-deep underline underline-offset-4">{t.readPost}</span>
                </Link>
              </li>
            )}
          </ul>
        </section>
      )}

      <StickyBuyBar
        targetId="buy-main"
        price={price.format(product.priceEur)}
        label={t.buyBar}
        href={product.url}
      />
    </main>
  );
}
