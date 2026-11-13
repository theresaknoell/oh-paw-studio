import type { Metadata } from "next";
import { pageMetadata } from "@/lib/meta";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { BlogBrowser, BlogStatic, type BlogItem } from "@/components/BlogBrowser";
import { getPosts, topics } from "@/lib/blog";
import { getDictionary, hasLocale } from "../dictionaries";

export async function generateMetadata({ params }: PageProps<"/[lang]/blog">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return pageMetadata(lang, "blog");
}

export default async function Blog({ params }: PageProps<"/[lang]/blog">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const fmt = new Intl.DateTimeFormat(lang === "de" ? "de-DE" : "en-GB", { dateStyle: "long" });

  const posts: BlogItem[] = getPosts(lang).map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    date: fmt.format(new Date(p.date)),
    topic: p.topic,
    topicLabel: dict.blog.topics[p.topic],
    readingTime: `${p.readingMinutes} ${dict.blog.readingTime}`,
    image: p.image,
    href: `/${lang}/blog/${p.slug}`,
  }));
  const props = {
    lang,
    posts,
    topics: topics.map((id) => ({ id, label: dict.blog.topics[id] })),
    t: dict.blog,
  };

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 md:py-16">
      <h1 className="text-4xl md:text-5xl">{dict.blog.lead}</h1>
      <div className="mt-10">
        <Suspense fallback={<BlogStatic {...props} />}>
          <BlogBrowser {...props} />
        </Suspense>
      </div>
    </main>
  );
}
