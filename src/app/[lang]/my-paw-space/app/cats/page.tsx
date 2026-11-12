import { notFound } from "next/navigation";
import CatsManager from "@/components/paw/CatsManager";
import { pawApp } from "@/data/paw-app";
import { hasLocale } from "../../../dictionaries";

export default async function Cats({ params }: PageProps<"/[lang]/my-paw-space/app/cats">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = pawApp[lang].cats;
  return (
    <>
      <h1 className="mb-6 text-5xl">{t.title}</h1>
      <CatsManager t={t} />
    </>
  );
}
