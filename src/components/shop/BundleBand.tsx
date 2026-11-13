import Link from "next/link";
import { bundles, bundleView } from "@/data/bundles";

export default function BundleBand({
  lang,
  title,
  cta,
  save,
  price,
}: {
  lang: "de" | "en";
  title: string;
  cta: string;
  save: string;
  price: Intl.NumberFormat;
}) {
  return (
    <section className="my-14 rounded-[10px] bg-sand/50 p-6 md:p-8">
      <h2 className="text-3xl md:text-4xl">{title}</h2>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {bundles.map((b) => {
          const v = bundleView(b, lang);
          return (
            <li key={b.id}>
              <Link href={`/${lang}/bundles`} className="block h-full rounded-[10px] bg-ivory/70 p-4 transition-colors hover:bg-ivory">
                <h3 className="text-2xl">{v.title}</h3>
                <p className="mt-2 font-serif text-2xl">{price.format(v.price)}</p>
                <p className="mt-1 text-sm text-cocoa/85">{save} {price.format(v.saving)}</p>
              </Link>
            </li>
          );
        })}
      </ul>
      <Link href={`/${lang}/bundles`} className="mt-6 inline-block text-olive-deep underline underline-offset-4 hover:text-cocoa">
        {cta} →
      </Link>
    </section>
  );
}
