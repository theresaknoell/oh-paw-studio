import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import PhotoSlot from "@/components/PhotoSlot";
import { about } from "@/data/about";
import { productPairs } from "@/data/product-pairs";
import { productsFor } from "@/data/products";
import { siteImages } from "@/data/site-images";
import { hasLocale } from "../dictionaries";

const wrap = "mx-auto w-full max-w-5xl px-4 sm:px-6";

export default async function About({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const page = about[lang];
  const story = page.sections.slice(0, -1);
  const values = page.sections[page.sections.length - 1];

  const pair = productPairs.find((p) => p.id === "memory-book");
  const product = pair ? productsFor(lang).find((p) => p.slug === pair.slugs[lang]) : undefined;

  return (
    <main className="flex flex-1 flex-col">
      {/* Einstieg */}
      <section className={`${wrap} grid items-center gap-8 py-10 md:grid-cols-[1.1fr_1fr] md:gap-14 md:py-16`}>
        <div className="order-2 md:order-1">
          <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-cocoa/75">{page.title}</p>
          <h1 className="mt-3 text-4xl leading-[1.05] md:text-6xl" style={{ hyphens: "manual" }}>{page.heroTitle}</h1>
          <p className="mt-5 font-serif text-2xl leading-9 text-olive-deep">{page.lead}</p>
        </div>
        <div className="order-1 md:order-2">
          <PhotoSlot image={siteImages.aboutPortrait} lang={lang} ratio="aspect-[4/5]" sizes="(min-width: 768px) 460px, 100vw" priority className="mx-auto max-w-md" />
        </div>
      </section>

      {/* Geschichte in Kapiteln */}
      <section className={`${wrap} pb-6`}>
        <div className="mx-auto max-w-[680px]">
          {story.map((s, i) => (
            <div key={s.heading} className={i === 0 ? "" : "mt-14"}>
              <p className="text-sm text-cocoa/75">{String(i + 1).padStart(2, "0")}</p>
              <h2 className="mt-1 text-3xl md:text-4xl">{s.heading}</h2>
              {s.paragraphs?.map((p) => (
                <p key={p} className="mt-4 text-lg leading-8 text-cocoa/90">{p}</p>
              ))}
              {s.items && (
                <ul className="mt-4 space-y-3">
                  {s.items.map((it) => (
                    <li key={it.text} className="border-l-2 border-sage pl-4 text-lg leading-8 text-cocoa/90">{it.text}</li>
                  ))}
                </ul>
              )}
              {s.closing && <p className="mt-4 text-lg leading-8 text-cocoa/90">{s.closing}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* Zitatband */}
      <section className="my-14 bg-sand/60 px-4 py-16 text-center sm:px-6">
        <p className="mx-auto max-w-2xl font-serif text-3xl leading-10 md:text-4xl md:leading-[1.25]">{page.quote}</p>
      </section>

      {/* Werte */}
      <section className={`${wrap} pb-16`}>
        <h2 className="text-3xl md:text-4xl">{values.heading}</h2>
        <ul className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {values.items?.map((it) => (
            <li key={it.title} className="border-t border-taupe/50 pt-4">
              <h3 className="text-2xl">{it.title}</h3>
              <p className="mt-2 text-[15px] leading-6 text-cocoa/85">{it.text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Abschluss */}
      {product && (
        <section className="bg-sand/50 py-16">
          <div className={`${wrap} grid items-center gap-8 md:grid-cols-2 md:gap-14`}>
            <div>
              <h2 className="text-4xl">{page.closing.title}</h2>
              <p className="mt-3 text-lg text-cocoa/90">{page.closing.text}</p>
              <Link
                href={`/${lang}/products/${product.slug}`}
                className="mt-6 inline-flex min-h-12 items-center rounded-full bg-olive-deep px-8 text-[15px] font-medium text-ivory transition-colors hover:bg-cocoa"
              >
                {page.closing.cta}
              </Link>
            </div>
            <Link href={`/${lang}/products/${product.slug}`} aria-label={product.title} className="relative mx-auto block aspect-square w-full max-w-sm overflow-hidden rounded-[10px] bg-sand">
              {product.image && <Image src={product.image} alt="" fill sizes="(min-width: 768px) 384px, 100vw" className="object-cover" />}
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}
