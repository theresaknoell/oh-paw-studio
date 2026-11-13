import Image from "next/image";
import Link from "next/link";

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
}: {
  item: CardItem;
  label: string;
  sizes?: string;
}) {
  return (
    <li>
      <Link href={item.href} className="group block">
        <div className="relative aspect-square overflow-hidden rounded-[10px] bg-sand">
          {item.image && (
            <Image
              src={item.image}
              alt=""
              fill
              sizes={sizes}
              className="object-cover transition-transform duration-300 group-hover:-translate-y-0.5"
            />
          )}
        </div>
        <p className="mt-4 text-[13px] font-medium uppercase tracking-[0.08em] text-cocoa/75">{label}</p>
        <h3 className="mt-1 text-2xl group-hover:text-olive-deep">{item.title}</h3>
        <p className="mt-1 text-[15px] text-cocoa/85">{item.tagline}</p>
        <p className="mt-2 font-serif text-2xl">{item.price}</p>
      </Link>
    </li>
  );
}
