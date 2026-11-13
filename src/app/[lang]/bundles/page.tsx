import Link from "next/link";
import { notFound } from "next/navigation";
import BundleCards from "@/components/BundleCards";
import { bundles, bundleView } from "@/data/bundles";
import { getDictionary, hasLocale } from "../dictionaries";

export default async function Bundles({ params }: PageProps<"/[lang]/bundles">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const t = dict.bundlesPage;
  const price = new Intl.NumberFormat(lang === "de" ? "de-DE" : "en-IE", {
    style: "currency",
    currency: "EUR",
  });
  const rows = bundles.map((b) => bundleView(b, lang));

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 md:py-16">
      <h1 className="text-4xl md:text-5xl">{t.lead}</h1>
      <p className="mt-4 max-w-2xl font-serif text-2xl leading-9 text-olive-deep">{t.intro}</p>

      <div className="mt-10">
        <BundleCards lang={lang} t={dict.products} price={price} headingLevel="h2" />
      </div>

      <section className="mt-16">
        <h2 className="text-3xl md:text-4xl">{t.compareTitle}</h2>
        <p className="mt-2 text-cocoa/85">{t.compareIntro}</p>
        <div role="region" aria-label={t.compareTitle} tabIndex={0} className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[30rem] border-collapse text-left text-[15px]">
            <thead>
              <tr className="border-b border-taupe/60 text-sm text-cocoa/75">
                <th scope="col" className="py-3 pr-4 font-medium">{t.colBundle}</th>
                <th scope="col" className="py-3 pr-4 text-right font-medium">{t.colSingle}</th>
                <th scope="col" className="py-3 pr-4 text-right font-medium">{t.colPrice}</th>
                <th scope="col" className="py-3 text-right font-medium">{t.colSave}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.title} className="border-b border-sand">
                  <th scope="row" className="py-3 pr-4 font-serif text-xl font-medium">{r.title}</th>
                  <td className="py-3 pr-4 text-right text-cocoa/85 line-through">{price.format(r.total)}</td>
                  <td className="py-3 pr-4 text-right font-medium">{price.format(r.price)}</td>
                  <td className="py-3 text-right">{price.format(r.saving)} ({r.percent} %)</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-16 max-w-3xl">
        <h2 className="text-3xl md:text-4xl">{t.faqTitle}</h2>
        <div className="mt-4">
          {t.faq.map((f) => (
            <details key={f.q} className="border-t border-sand py-4 last:border-b">
              <summary className="cursor-pointer py-1 text-lg font-medium">{f.q}</summary>
              <p className="mt-2 text-cocoa/85">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <Link
        href={`/${lang}/products`}
        className="mt-12 inline-block text-olive-deep underline underline-offset-4 hover:text-cocoa"
      >
        {t.back}
      </Link>
    </main>
  );
}
