import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { productsFor } from "@/data/products";
import { getPosts } from "@/lib/blog";
import { getDictionary, hasLocale } from "./dictionaries";

const button =
  "rounded-full bg-olive px-6 py-3 text-sm text-ivory transition-colors hover:bg-cocoa";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const featured = productsFor(lang).slice(0, 3);
  const posts = getPosts(lang).slice(0, 2);
  const price = new Intl.NumberFormat(lang === "de" ? "de-DE" : "en-IE", {
    style: "currency",
    currency: "EUR",
  });

  return (
    <main className="flex flex-1 flex-col">
      <section className="flex flex-col items-center gap-6 px-6 py-16 text-center">
        <Image
          src="/logo.webp"
          alt="Oh Paw Studio"
          width={320}
          height={320}
          priority
        />
        <h1 className="text-5xl tracking-tight">{dict.home.title}</h1>
        <p className="max-w-md font-serif text-2xl text-olive">
          {dict.home.intro}
        </p>
        <Link href={`/${lang}/products`} className={button}>
          {dict.home.cta}
        </Link>
      </section>

      <section className="bg-sand/50 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-4xl">{dict.home.featured}</h2>
          <ul className="mt-8 grid gap-8 sm:grid-cols-3">
            {featured.map((p) => (
              <li key={p.slug} className="flex flex-col">
                <div className="relative aspect-square overflow-hidden rounded-lg bg-sand">
                  {p.image && (
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(min-width: 640px) 30vw, 100vw"
                      className="object-cover"
                    />
                  )}
                </div>
                <h3 className="mt-4 text-2xl">{p.title}</h3>
                <p className="mt-1 text-cocoa/70">{price.format(p.priceEur)}</p>
              </li>
            ))}
          </ul>
          <Link href={`/${lang}/products`} className={`${button} mt-10 inline-block`}>
            {dict.home.viewAll}
          </Link>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-4xl">{dict.home.aboutTitle}</h2>
          <p className="mt-4 max-w-2xl text-lg text-cocoa/80">
            {dict.home.aboutBody}
          </p>
          <Link
            href={`/${lang}/about`}
            className="mt-4 inline-block text-olive underline underline-offset-4"
          >
            {dict.home.aboutLink}
          </Link>
        </div>
      </section>

      {posts.length > 0 && (
        <section className="border-t border-sand px-6 py-16">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-4xl">{dict.home.latest}</h2>
            <ul className="mt-8 grid gap-8 sm:grid-cols-2">
              {posts.map((p) => (
                <li key={p.slug}>
                  <h3 className="text-2xl">
                    <Link
                      href={`/${lang}/blog/${p.slug}`}
                      className="hover:text-olive"
                    >
                      {p.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-cocoa/80">{p.excerpt}</p>
                  <Link
                    href={`/${lang}/blog/${p.slug}`}
                    className="mt-2 inline-block text-sm text-olive underline underline-offset-4"
                  >
                    {dict.home.readMore}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href={`/${lang}/blog`}
              className="mt-8 inline-block text-olive underline underline-offset-4"
            >
              {dict.home.allPosts}
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}
