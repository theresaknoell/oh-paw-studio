import { notFound } from "next/navigation";
import DashboardSummary from "@/components/paw/DashboardSummary";
import { pawApp } from "@/data/paw-app";
import { hasLocale } from "../../dictionaries";

export default async function Dashboard({ params }: PageProps<"/[lang]/my-paw-space/app">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = pawApp[lang].dashboard;
  return (
    <>
      <h1 className="text-5xl">{t.title}</h1>
      <p className="mt-4 text-lg text-cocoa/80">{t.intro}</p>
      <DashboardSummary lang={lang} t={t} />
    </>
  );
}
