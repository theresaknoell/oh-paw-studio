import Link from "next/link";
import PhotoSlot from "./PhotoSlot";

export type PostItem = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  topicLabel: string;
  readingTime: string;
  image: string | null;
  href: string;
};

export default function PostCard({ post, lang }: { post: PostItem; lang: "de" | "en" }) {
  return (
    <li>
      <Link href={post.href} className="group block">
        <PhotoSlot
          image={post.image ? { src: post.image, alt: { de: "", en: "" } } : null}
          lang={lang}
          ratio="aspect-[3/2]"
          sizes="(min-width: 768px) 320px, 100vw"
          className="transition-transform duration-300 group-hover:-translate-y-0.5"
        />
        <p className="mt-4 text-[13px] font-medium uppercase tracking-[0.08em] text-cocoa/75">{post.topicLabel}</p>
        <h3 className="mt-1 text-2xl group-hover:text-olive-deep">{post.title}</h3>
        <p className="mt-2 text-[15px] text-cocoa/85">{post.excerpt}</p>
        <p className="mt-2 text-sm text-cocoa/75">{post.date} · {post.readingTime}</p>
      </Link>
    </li>
  );
}
