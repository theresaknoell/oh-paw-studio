import Image from "next/image";
import Link from "next/link";
import { bundles, bundleView } from "@/data/bundles";

type Strings = {
  includes: string;
  instead: string;
  save: string;
  soon: string;
  buy: string;
};

export default function BundleCards({
  lang,
  t,
  price,
  headingLevel = "h3",
}: {
  lang: "de" | "en";
  t: Strings;
  price: Intl.NumberFormat;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  return (
    <ul className="grid gap-6 md:grid-cols-2">
      {bundles.map((b) => {
        const v = bundleView(b, lang);
        return (
          <li key={b.id} className="flex flex-col rounded-[10px] bg-sand/50 p-6">
            <span className="self-start rounded-full bg-sand px-3 py-0.5 text-sm">{v.audience}</span>
            <Heading className="mt-3 text-3xl md:text-4xl">{v.title}</Heading>
            <p className="mt-2 text-cocoa/85">{v.text}</p>

            <p className="mt-5 text-sm text-cocoa/75">{t.includes}</p>
            <ul className="mt-2 space-y-2">
              {v.items.map((p) => (
                <li key={p.slug}>
                  <Link href={`/${lang}/products/${p.slug}`} className="group flex items-center gap-3">
                    <span className="relative block h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-sand">
                      {p.image && <Image src={p.image} alt="" fill sizes="56px" className="object-cover" />}
                    </span>
                    <span className="text-[15px] leading-5 group-hover:text-olive-deep group-hover:underline underline-offset-4">{p.title}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 border-t border-taupe/40 pt-5">
              <p className="text-cocoa/75">
                <span className="font-serif text-4xl text-cocoa">{price.format(v.price)}</span>{" "}
                {t.instead} <span className="line-through">{price.format(v.total)}</span>
              </p>
              <p className="mt-2">
                <span className="inline-block rounded-full bg-sage/35 px-3 py-0.5 text-sm">
                  {t.save} {price.format(v.saving)} ({v.percent} %)
                </span>
              </p>
              {v.url ? (
                <a
                  href={v.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex min-h-12 items-center rounded-full bg-olive-deep px-8 text-[15px] font-medium text-ivory transition-colors hover:bg-cocoa"
                >
                  {t.buy}
                </a>
              ) : (
                <p className="mt-5 text-sm text-cocoa/85">{t.soon}</p>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
