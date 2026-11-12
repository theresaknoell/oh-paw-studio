import Link from "next/link";
import { notFound } from "next/navigation";
import { getPosts } from "@/lib/blog";
import { getDictionary, hasLocale } from "../dictionaries";

export default async function Blog({ params }: PageProps<"/[lang]/blog">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const posts = getPosts(lang);
  const fmt = new Intl.DateTimeFormat(lang === "de" ? "de-DE" : "en-GB", {
    dateStyle: "long",
  });

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16">
      <h1 className="text-5xl">{dict.blog.title}</h1>
      {posts.length === 0 && (
        <p className="mt-6 text-lg text-cocoa/80">{dict.blog.empty}</p>
      )}
      <ul className="mt-10 space-y-10">
        {posts.map((p) => (
          <li key={p.slug}>
            <p className="text-sm text-cocoa/60">{fmt.format(new Date(p.date))}</p>
            <h2 className="mt-1 text-3xl">
              <Link href={`/${lang}/blog/${p.slug}`} className="hover:text-olive">
                {p.title}
              </Link>
            </h2>
            <p className="mt-2 text-cocoa/80">{p.excerpt}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
