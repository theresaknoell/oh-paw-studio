import { notFound } from "next/navigation";
import SettingsPanel from "@/components/paw/SettingsPanel";
import { pawApp } from "@/data/paw-app";
import { hasLocale } from "../../../dictionaries";

export default async function Settings({ params }: PageProps<"/[lang]/my-paw-space/app/settings">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = pawApp[lang].settings;
  return (
    <>
      <h1 className="text-5xl">{t.title}</h1>
      <p className="mt-4 mb-6 text-cocoa/80">{t.intro}</p>
      <SettingsPanel t={t} />
      <h2 className="mt-12 text-3xl">{t.futureTitle}</h2>
      <p className="mt-2 text-cocoa/80">{t.futureText}</p>
    </>
  );
}
