import type { Metadata } from "next";
import { pageMetadata } from "@/lib/meta";
import { notFound } from "next/navigation";
import LegalContent from "@/components/LegalContent";
import { privacy } from "@/data/legal";
import { hasLocale } from "../dictionaries";

export async function generateMetadata({ params }: PageProps<"/[lang]/datenschutz">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return pageMetadata(lang, "privacy");
}

export default async function Datenschutz({
  params,
}: PageProps<"/[lang]/datenschutz">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return <LegalContent page={privacy[lang]} />;
}
