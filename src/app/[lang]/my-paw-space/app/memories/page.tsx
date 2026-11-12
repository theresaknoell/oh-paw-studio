import { notFound } from "next/navigation";
import MemoriesManager from "@/components/paw/MemoriesManager";
import { pawApp } from "@/data/paw-app";
import { hasLocale } from "../../../dictionaries";

export default async function Memories({ params }: PageProps<"/[lang]/my-paw-space/app/memories">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = pawApp[lang].memories;
  return (
    <>
      <h1 className="mb-6 text-5xl">{t.title}</h1>
      <MemoriesManager t={t} />
    </>
  );
}
