import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import { getPost, getPosts } from "@/lib/blog";
import { getDictionary, hasLocale, locales } from "../../dictionaries";

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    getPosts(lang).map((p) => ({ lang, slug: p.slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/blog/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const post = getPost(lang, slug);
  return post ? { title: post.title, description: post.excerpt } : {};
}

export default async function Post({
  params,
}: PageProps<"/[lang]/blog/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const post = getPost(lang, slug);
  if (!post) notFound();
  const dict = await getDictionary(lang);

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16">
      <Link href={`/${lang}/blog`} className="text-sm text-olive-deep hover:underline">
        ← {dict.blog.title}
      </Link>
      <h1 className="mt-6 text-5xl">{post.title}</h1>
      <div className="mt-8 space-y-5 text-lg leading-8 text-cocoa/90 [&_em]:text-cocoa/75 [&_h2]:mt-10 [&_h2]:font-serif [&_h2]:text-3xl [&_a]:text-olive-deep [&_a]:underline">
        <Markdown>{post.content}</Markdown>
      </div>
    </main>
  );
}
