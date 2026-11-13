import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";

export type CardItem = {
  slug: string;
  title: string;
  tagline: string;
  price: string;
  image: string | null;
  href: string;
};

export default function ProductCard({
  item,
  label,
  sizes = "(min-width: 1024px) 320px, (min-width: 640px) 45vw, 100vw",
  index = 0,
}: {
  item: CardItem;
  label: string;
  sizes?: string;
  index?: number;
}) {
  return (
    <Reveal as="li" delay={(index % 3) * 90}>
      <Link href={item.href} className="group zoom-on-hover block">
        <div className="relative aspect-square overflow-hidden rounded-[10px] bg-sand">
          {item.image && (
            <Image
              src={item.image}
              alt=""
              fill
              sizes={sizes}
              className="object-cover"
            />
          )}
        </div>
        <p className="mt-4 text-[13px] font-medium uppercase tracking-[0.08em] text-cocoa/75">{label}</p>
        <h3 className="mt-1 text-2xl group-hover:text-olive-deep">{item.title}</h3>
        <p className="mt-1 text-[15px] text-cocoa/85">{item.tagline}</p>
        <p className="mt-2 font-serif text-2xl">{item.price}</p>
      </Link>
    </Reveal>
  );
}
