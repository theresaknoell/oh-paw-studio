import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import NewsletterSignup from "@/components/NewsletterSignup";
import PhotoSlot from "@/components/PhotoSlot";
import ProductCard from "@/components/ProductCard";
import { bundles, bundleView } from "@/data/bundles";
import { productDetails } from "@/data/product-details";
import { productPairs } from "@/data/product-pairs";
import { productsFor, worlds } from "@/data/products";
import { newsletter } from "@/data/newsletter";
import { siteImages } from "@/data/site-images";
import { getPosts } from "@/lib/blog";
import { getDictionary, hasLocale } from "./dictionaries";

const primary =
  "inline-flex min-h-12 items-center rounded-full bg-olive-deep px-8 text-[15px] font-medium text-ivory transition-colors hover:bg-cocoa";
const secondary =
  "inline-flex min-h-12 items-center rounded-full border-[1.5px] border-olive-deep px-8 text-[15px] font-medium text-olive-deep transition-colors hover:bg-olive-deep hover:text-ivory";
const wrap = "mx-auto w-full max-w-5xl px-4 sm:px-6";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const h = dict.home;
  const base = `/${lang}`;
  const price = new Intl.NumberFormat(lang === "de" ? "de-DE" : "en-IE", { style: "currency", currency: "EUR" });

  const popular = ["memory-book", "care-journal", "kitten-care"]
    .map((id) => productPairs.find((p) => p.id === id))
    .map((pair) => (pair ? productsFor(lang).find((p) => p.slug === pair.slugs[lang]) : undefined))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const bundle = bundleView(bundles[0], lang);
  const posts = getPosts(lang).slice(0, 3);
  const fmt = new Intl.DateTimeFormat(lang === "de" ? "de-DE" : "en-GB", { dateStyle: "long" });

  return (
    <main className="flex flex-1 flex-col">
      {/* 1 Hero */}
      <section className={`${wrap} grid items-center gap-8 py-10 md:grid-cols-[1.1fr_1fr] md:gap-14 md:py-16`}>
        <div className="order-2 md:order-1">
          <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-cocoa/75">{h.label}</p>
          <h1 className="mt-3 text-4xl leading-[1.05] md:text-6xl" style={{ hyphens: "manual" }}>{h.intro}</h1>
          <p className="mt-5 font-serif text-2xl leading-8 text-olive-deep">{h.lead}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={`${base}/products`} className={primary}>{h.ctaShop}</Link>
            <Link href={`${base}/about`} className={secondary}>{h.ctaStory}</Link>
          </div>
        </div>
        <div className="order-1 md:order-2">
          <PhotoSlot image={siteImages.hero} lang={lang} ratio="aspect-[4/5]" sizes="(min-width: 768px) 460px, 100vw" priority className="mx-auto max-w-md" />
        </div>
      </section>

      {/* 2 Markenbotschaft */}
      <section className="border-y border-sand px-4 py-14 text-center sm:px-6">
        <p className="mx-auto max-w-2xl font-serif text-3xl leading-10">{h.statement}</p>
      </section>

      {/* 3 Produktwelten */}
      <section className={`${wrap} py-16`}>
        <h2 className="text-4xl">{h.worldsTitle}</h2>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {worlds.map((w) => (
            <li key={w}>
              <Link href={`${base}/products?world=${w}`} className="group block">
                <PhotoSlot image={siteImages.worlds[w]} lang={lang} ratio="aspect-[4/3]" sizes="(min-width: 1024px) 240px, (min-width: 640px) 45vw, 100vw" className="transition-transform duration-300 group-hover:-translate-y-0.5" />
                <h3 className="mt-3 text-2xl group-hover:text-olive-deep">{h.worlds[w].title}</h3>
                <p className="mt-1 text-[15px] text-cocoa/85">{h.worlds[w].text}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* 4 Beliebt */}
      <section className={`${wrap} pb-16`}>
        <h2 className="text-4xl">{h.popular}</h2>
        <ul className="mt-8 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {popular.map((p) => (
            <ProductCard
              key={p.slug}
              item={{
                slug: p.slug,
                title: p.title,
                tagline: productDetails[p.slug]?.tagline ?? "",
                price: price.format(p.priceEur),
                image: p.image,
                href: `${base}/products/${p.slug}`,
              }}
              label={h.worlds[p.world].title}
            />
          ))}
        </ul>
        <Link href={`${base}/products`} className="mt-10 inline-block text-olive-deep underline underline-offset-4 hover:text-cocoa">
          {h.viewAll} →
        </Link>
      </section>

      {/* 5 Bundle-Teaser */}
      <section className="bg-sand/60 py-16">
        <div className={`${wrap} grid items-center gap-10 md:grid-cols-2`}>
          <div>
            <span className="inline-block rounded-full bg-sand px-3 py-0.5 text-sm">{h.bundleLabel}</span>
            <h2 className="mt-3 text-4xl md:text-5xl">{bundle.title}</h2>
            <p className="mt-3 text-lg text-cocoa/90">{bundle.text}</p>
            <p className="mt-4">
              <span className="font-serif text-4xl">{price.format(bundle.price)}</span>{" "}
              <span className="text-cocoa/85 line-through">{price.format(bundle.total)}</span>{" "}
              <span className="ml-1 inline-block rounded-full bg-sage/35 px-3 py-0.5 text-sm">
                {dict.products.save} {price.format(bundle.saving)}
              </span>
            </p>
            <Link href={`${base}/bundles`} className={`${primary} mt-6`}>{h.viewBundle}</Link>
          </div>
          <ul className="grid grid-cols-3 gap-3">
            {bundle.items.map((p) => (
              <li key={p.slug}>
                <Link href={`${base}/products/${p.slug}`} aria-label={p.title} className="relative block aspect-square overflow-hidden rounded-[10px] bg-sand">
                  {p.image && <Image src={p.image} alt="" fill sizes="(min-width: 768px) 160px, 30vw" className="object-cover" />}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6 Geschichte */}
      <section className={`${wrap} grid items-center gap-8 py-16 md:grid-cols-2 md:gap-14`}>
        <PhotoSlot image={siteImages.story} lang={lang} ratio="aspect-[4/3]" sizes="(min-width: 768px) 480px, 100vw" />
        <div>
          <h2 className="text-4xl">{h.aboutTitle}</h2>
          <p className="mt-4 text-lg leading-7 text-cocoa/90">{h.aboutBody}</p>
          <Link href={`${base}/about`} className={`${secondary} mt-6`}>{h.aboutLink}</Link>
        </div>
      </section>

      {/* 7 Inspiration */}
      {posts.length > 0 && (
        <section className="border-t border-sand py-16">
          <div className={wrap}>
            <h2 className="text-4xl">{h.inspirationTitle}</h2>
            <ul className="mt-8 grid gap-8 md:grid-cols-3">
              {posts.map((p) => (
                <li key={p.slug}>
                  <Link href={`${base}/blog/${p.slug}`} className="group block">
                    <PhotoSlot
                      image={p.image ? { src: p.image, alt: { de: "", en: "" } } : null}
                      lang={lang}
                      ratio="aspect-[3/2]"
                      sizes="(min-width: 768px) 320px, 100vw"
                      className="transition-transform duration-300 group-hover:-translate-y-0.5"
                    />
                    <p className="mt-4 text-sm text-cocoa/75">{fmt.format(new Date(p.date))}</p>
                    <h3 className="mt-1 text-2xl group-hover:text-olive-deep">{p.title}</h3>
                    <p className="mt-2 text-[15px] text-cocoa/85">{p.excerpt}</p>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href={`${base}/blog`} className="mt-10 inline-block text-olive-deep underline underline-offset-4 hover:text-cocoa">
              {h.allPosts} →
            </Link>
          </div>
        </section>
      )}

      {/* 8 Newsletter */}
      {newsletter.enabled && (
        <section className="bg-sand/60 py-16">
          <div className={`${wrap} grid items-center gap-8 md:grid-cols-2 md:gap-14`}>
            <div>
              <h2 className="text-4xl">{dict.newsletter.title}</h2>
              <p className="mt-3 text-lg leading-7 text-cocoa/90">{dict.newsletter.text}</p>
            </div>
            <div className="relative">
              <NewsletterSignup lang={lang} action={newsletter.action} t={dict.newsletter} />
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
