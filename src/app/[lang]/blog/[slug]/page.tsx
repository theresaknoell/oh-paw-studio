import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import JsonLd from "@/components/JsonLd";
import NewsletterSignup from "@/components/NewsletterSignup";
import PhotoSlot from "@/components/PhotoSlot";
import PostCard from "@/components/PostCard";
import { newsletter } from "@/data/newsletter";
import { productDetails } from "@/data/product-details";
import { productPairs } from "@/data/product-pairs";
import { productsFor } from "@/data/products";
import { getPost, getPosts } from "@/lib/blog";
import { alternates } from "@/lib/meta";
import { siteUrl } from "@/lib/site";
import { getDictionary, hasLocale, locales } from "../../dictionaries";

export function generateStaticParams() {
  return locales.flatMap((lang) => getPosts(lang).map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/blog/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const post = getPost(lang, slug);
  if (!post) return {};
  const own = `/blog/${slug}`;
  const other = post.pair ? `/blog/${post.pair}` : undefined;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: other
      ? alternates(lang, lang === "de" ? { de: own, en: other } : { en: own, de: other })
      : { canonical: `/${lang}${own}` },
  };
}

const prose =
  "space-y-5 text-lg leading-8 text-cocoa/90 [&_a]:text-olive-deep [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-cocoa [&_em]:text-cocoa/75 [&_h2]:mt-12 [&_h2]:font-serif [&_h2]:text-3xl [&_h2]:leading-tight [&_li]:pl-1 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6";

export default async function Post({ params }: PageProps<"/[lang]/blog/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const post = getPost(lang, slug);
  if (!post) notFound();
  const dict = await getDictionary(lang);
  const b = dict.blog;
  const base = `/${lang}`;
  const fmt = new Intl.DateTimeFormat(lang === "de" ? "de-DE" : "en-GB", { dateStyle: "long" });
  const price = new Intl.NumberFormat(lang === "de" ? "de-DE" : "en-IE", { style: "currency", currency: "EUR" });

  // Passendes Produkt: das Paar, dessen `post` dem deutschen Slug dieses Beitrags entspricht
  const deSlug = lang === "de" ? slug : getPosts("de").find((p) => p.pair === slug)?.slug;
  const pair = productPairs.find((p) => p.post === deSlug);
  const product = pair ? productsFor(lang).find((p) => p.slug === pair.slugs[lang]) : undefined;

  // Beitragstext in zwei Teile teilen und den Produktkasten in die Mitte setzen
  const parts = post.content.split(/\n(?=## )/);
  const cut = parts.length >= 3 ? Math.ceil(parts.length / 2) : parts.length;
  const first = parts.slice(0, cut).join("\n");
  const second = parts.slice(cut).join("\n");

  const related = [...getPosts(lang)]
    .filter((p) => p.slug !== slug)
    .sort((a, b2) => Number(b2.topic === post.topic) - Number(a.topic === post.topic))
    .slice(0, 2);

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 md:py-14">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.date,
          inLanguage: lang,
          image: post.image ? [`${siteUrl}${post.image}`] : undefined,
          mainEntityOfPage: `${siteUrl}/${lang}/blog/${slug}`,
          author: { "@type": "Organization", name: "Oh Paw Studio" },
          publisher: { "@type": "Organization", name: "Oh Paw Studio", logo: { "@type": "ImageObject", url: `${siteUrl}/logo.webp` } },
        }}
      />
      <article>
        <div className="mx-auto max-w-[720px]">
          <Link href={`${base}/blog`} className="text-sm text-olive-deep hover:underline">← {b.title}</Link>
          <p className="mt-6 text-[13px] font-medium uppercase tracking-[0.08em] text-cocoa/75">
            {b.topics[post.topic]} · {fmt.format(new Date(post.date))} · {post.readingMinutes} {b.readingTime}
          </p>
          <h1 className="mt-3 text-4xl leading-[1.08] md:text-5xl">{post.title}</h1>
          <p className="mt-5 font-serif text-2xl leading-9 text-olive-deep">{post.excerpt}</p>
        </div>

        <PhotoSlot
          image={post.image ? { src: post.image, alt: { de: post.title, en: post.title } } : null}
          lang={lang}
          ratio="aspect-[3/2]"
          sizes="(min-width: 1024px) 960px, 100vw"
          priority
          className="mx-auto mt-10"
        />

        <div className="mx-auto mt-10 max-w-[680px]">
          <div className={prose}><Markdown>{first}</Markdown></div>

          {product && (
            <aside className="my-12 rounded-[10px] bg-sand/50 p-5 sm:flex sm:items-center sm:gap-6">
              <Link href={`${base}/products/${product.slug}`} aria-label={product.title} className="relative block aspect-square w-28 shrink-0 overflow-hidden rounded-lg bg-sand">
                {product.image && <Image src={product.image} alt="" fill sizes="112px" className="object-cover" />}
              </Link>
              <div className="mt-4 sm:mt-0">
                <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-cocoa/75">{dict.productPage.help}</p>
                <h2 className="mt-1 font-serif text-2xl leading-tight">{product.title}</h2>
                <p className="mt-1 text-[15px] text-cocoa/85">{productDetails[product.slug]?.tagline}</p>
                <p className="mt-3">
                  <Link
                    href={`${base}/products/${product.slug}`}
                    className="inline-flex min-h-11 items-center rounded-full border-[1.5px] border-olive-deep px-6 text-[15px] font-medium text-olive-deep transition-colors hover:bg-olive-deep hover:text-ivory"
                  >
                    {b.toProduct} · {price.format(product.priceEur)}
                  </Link>
                </p>
              </div>
            </aside>
          )}

          {second && <div className={prose}><Markdown>{second}</Markdown></div>}
        </div>
      </article>

      {newsletter.enabled && (
        <section className="mx-auto mt-16 max-w-[680px] rounded-[10px] bg-sand/50 p-6 md:p-8">
          <h2 className="text-3xl">{dict.newsletter.title}</h2>
          <p className="mt-2 mb-5 text-cocoa/90">{dict.newsletter.text}</p>
          <div className="relative">
            <NewsletterSignup lang={lang} action={newsletter.action} t={dict.newsletter} />
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="mt-20 border-t border-sand pt-12">
          <h2 className="text-3xl md:text-4xl">{b.related}</h2>
          <ul className="mt-8 grid gap-x-8 gap-y-10 sm:grid-cols-2">
            {related.map((p) => (
              <PostCard
                key={p.slug}
                lang={lang}
                post={{
                  slug: p.slug,
                  title: p.title,
                  excerpt: p.excerpt,
                  date: fmt.format(new Date(p.date)),
                  topicLabel: b.topics[p.topic],
                  readingTime: `${p.readingMinutes} ${b.readingTime}`,
                  image: p.image,
                  href: `${base}/blog/${p.slug}`,
                }}
              />
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
