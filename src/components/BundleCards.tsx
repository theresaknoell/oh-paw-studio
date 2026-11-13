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
    <ul className="grid gap-6 sm:grid-cols-2">
      {bundles.map((b) => {
        const v = bundleView(b, lang);
        return (
          <li key={b.id} className="flex flex-col rounded-[10px] border border-sand bg-sand/40 p-6">
            <Heading className="text-3xl">{v.title}</Heading>
            <p className="mt-4 text-sm text-cocoa/75">{t.includes}</p>
            <ul className="mt-1 space-y-1 text-cocoa/85">
              {v.items.map((p) => (
                <li key={p.slug}>{p.title}</li>
              ))}
            </ul>
            <p className="mt-5 text-cocoa/75">
              <span className="font-serif text-3xl text-cocoa">{price.format(v.price)}</span>{" "}
              {t.instead} <span className="line-through">{price.format(v.total)}</span>
            </p>
            <p className="mt-2">
              <span className="inline-block rounded-full bg-sage/35 px-3 py-0.5 text-sm">
                {t.save} {price.format(v.saving)}
              </span>
            </p>
            {v.url ? (
              <a
                href={v.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex min-h-11 items-center self-start rounded-full bg-olive-deep px-6 text-[15px] font-medium text-ivory transition-colors hover:bg-cocoa"
              >
                {t.buy}
              </a>
            ) : (
              <p className="mt-5 text-sm text-cocoa/85">{t.soon}</p>
            )}
          </li>
        );
      })}
    </ul>
  );
}
