import { notFound } from "next/navigation";
import LegalContent from "@/components/LegalContent";
import { imprint } from "@/data/legal";
import { hasLocale } from "../dictionaries";

export default async function Impressum({
  params,
}: PageProps<"/[lang]/impressum">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return <LegalContent page={imprint[lang]} />;
}
