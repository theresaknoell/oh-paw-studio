import { notFound } from "next/navigation";
import CareManager from "@/components/paw/CareManager";
import { pawApp } from "@/data/paw-app";
import { productPairs } from "@/data/product-pairs";
import { hasLocale } from "../../../dictionaries";

export default async function Care({ params }: PageProps<"/[lang]/my-paw-space/app/care">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = pawApp[lang].care;
  const slug = productPairs.find((p) => p.id === "care-journal")?.slugs[lang];
  return (
    <>
      <h1 className="no-print text-5xl">{t.title}</h1>
      <p className="no-print mt-4 mb-6 text-cocoa/80">{t.intro}</p>
      <CareManager t={t} productHref={`/${lang}/products/${slug}`} />
    </>
  );
}
