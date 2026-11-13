"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import FilterChip from "./FilterChip";
import PhotoSlot from "./PhotoSlot";
import PostCard, { type PostItem } from "./PostCard";

export type BlogItem = PostItem & { topic: string };

type Props = {
  lang: "de" | "en";
  posts: BlogItem[];
  topics: { id: string; label: string }[];
  t: { all: string; topicLabel: string; none: string; featuredLabel: string };
};

function BlogView({ lang, posts, topics, t, topic, setTopic }: Props & { topic: string | null; setTopic: (v: string | null) => void }) {
  const list = posts.filter((p) => !topic || p.topic === topic);
  const [featured, ...rest] = list;

  return (
    <div>
      <div role="group" aria-label={t.topicLabel}>
        <p className="mb-2 text-[13px] font-medium uppercase tracking-[0.08em] text-cocoa/75">{t.topicLabel}</p>
        <div className="flex flex-wrap gap-2">
          <FilterChip active={!topic} onClick={() => setTopic(null)}>{t.all}</FilterChip>
          {topics.map((x) => (
            <FilterChip key={x.id} active={topic === x.id} onClick={() => setTopic(x.id)}>{x.label}</FilterChip>
          ))}
        </div>
      </div>

      {!featured ? (
        <p className="mt-10 text-lg text-cocoa/85">{t.none}</p>
      ) : (
        <>
          <article className="mt-10 grid items-center gap-6 md:grid-cols-[1.2fr_1fr] md:gap-10">
            <Link href={featured.href} aria-label={featured.title} className="group block">
              <PhotoSlot
                image={featured.image ? { src: featured.image, alt: { de: "", en: "" } } : null}
                lang={lang}
                ratio="aspect-[3/2]"
                sizes="(min-width: 768px) 560px, 100vw"
                className="transition-transform duration-300 group-hover:-translate-y-0.5"
              />
            </Link>
            <div>
              <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-cocoa/75">
                {t.featuredLabel} · {featured.topicLabel}
              </p>
              <h2 className="mt-2 text-3xl md:text-4xl">
                <Link href={featured.href} className="hover:text-olive-deep">{featured.title}</Link>
              </h2>
              <p className="mt-3 text-lg text-cocoa/90">{featured.excerpt}</p>
              <p className="mt-3 text-sm text-cocoa/75">{featured.date} · {featured.readingTime}</p>
            </div>
          </article>
          {rest.length > 0 && (
            <ul className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((p) => <PostCard key={p.slug} post={p} lang={lang} />)}
            </ul>
          )}
        </>
      )}
    </div>
  );
}

export function BlogBrowser(props: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const raw = sp.get("topic");
  const topic = props.topics.some((x) => x.id === raw) ? raw : null;
  const setTopic = (v: string | null) => router.replace(v ? `${pathname}?topic=${v}` : pathname, { scroll: false });
  return <BlogView {...props} topic={topic} setTopic={setTopic} />;
}

export function BlogStatic(props: Props) {
  return <BlogView {...props} topic={null} setTopic={() => {}} />;
}
