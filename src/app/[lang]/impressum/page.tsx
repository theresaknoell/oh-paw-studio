import type { Metadata } from "next";
import { pageMetadata } from "@/lib/meta";
import { notFound } from "next/navigation";
import LegalContent from "@/components/LegalContent";
import { imprint } from "@/data/legal";
import { hasLocale } from "../dictionaries";

export async function generateMetadata({ params }: PageProps<"/[lang]/impressum">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return pageMetadata(lang, "imprint");
}

export default async function Impressum({
  params,
}: PageProps<"/[lang]/impressum">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return <LegalContent page={imprint[lang]} />;
}
