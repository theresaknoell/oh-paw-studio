import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../dictionaries";

export default async function Blog({ params }: PageProps<"/[lang]/blog">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16">
      <h1 className="text-5xl">{dict.blog.title}</h1>
      <p className="mt-6 text-lg text-cocoa/80">{dict.blog.empty}</p>
    </main>
  );
}
