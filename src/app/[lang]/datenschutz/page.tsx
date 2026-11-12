import { notFound } from "next/navigation";
import LegalContent from "@/components/LegalContent";
import { privacy } from "@/data/legal";
import { hasLocale } from "../dictionaries";

export default async function Datenschutz({
  params,
}: PageProps<"/[lang]/datenschutz">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return <LegalContent page={privacy[lang]} />;
}
