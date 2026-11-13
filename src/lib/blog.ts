import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Locale } from "@/app/[lang]/dictionaries";

export const topics = ["start", "memories", "enrichment", "care", "home"] as const;
export type Topic = (typeof topics)[number];

export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  topic: Topic;
  readingMinutes: number;
  pair: string | null;
  image: string | null;
  content: string;
};

const dir = (lang: Locale) => path.join(process.cwd(), "content", "blog", lang);

export function getPosts(lang: Locale): Post[] {
  if (!fs.existsSync(dir(lang))) return [];
  return fs
    .readdirSync(dir(lang))
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const { data, content } = matter(
        fs.readFileSync(path.join(dir(lang), file), "utf8"),
      );
      return {
        slug: file.replace(/\.md$/, ""),
        title: String(data.title),
        // gray-matter liest Datumsangaben als Date-Objekt
        date: new Date(data.date).toISOString().slice(0, 10),
        excerpt: String(data.excerpt ?? ""),
        topic: (topics as readonly string[]).includes(String(data.topic)) ? (String(data.topic) as Topic) : "start",
        readingMinutes: Math.max(1, Math.round(content.split(/\s+/).filter(Boolean).length / 200)),
        pair: data.pair ? String(data.pair) : null,
        image: data.image ? String(data.image) : null,
        content,
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export const getPost = (lang: Locale, slug: string) =>
  getPosts(lang).find((p) => p.slug === slug);

// Für den Sprachumschalter: Slug → Slug des Beitrags in der anderen Sprache
export const postSlugMap = (): Record<string, string> =>
  Object.fromEntries(
    (["de", "en"] as const).flatMap((lang) =>
      getPosts(lang).flatMap((p) => (p.pair ? [[p.slug, p.pair]] : [])),
    ),
  );
