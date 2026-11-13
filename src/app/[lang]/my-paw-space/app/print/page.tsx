import { notFound } from "next/navigation";
import DesignedBook from "@/components/paw/DesignedBook";
import { pawApp } from "@/data/paw-app";
import { hasLocale } from "../../../dictionaries";

export default async function Print({ params }: PageProps<"/[lang]/my-paw-space/app/print">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = pawApp[lang];
  return (
    <>
      <h1 className="no-print text-5xl">{t.print.title}</h1>
      <p className="no-print mt-4 mb-6 text-cocoa/80">{t.print.intro}</p>
      <DesignedBook lang={lang} t={t.designed} print={t.print} catLabels={t.memories} />
    </>
  );
}
