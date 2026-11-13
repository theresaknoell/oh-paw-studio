import { notFound, redirect } from "next/navigation";
import { hasLocale } from "../../../dictionaries";

// Frühere Vorschau: Das gestaltete Layout ist jetzt die normale Druckansicht.
export default async function BookPdf({ params }: PageProps<"/[lang]/my-paw-space/app/book-pdf">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  redirect(`/${lang}/my-paw-space/app/print`);
}
