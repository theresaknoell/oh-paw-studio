import Image from "next/image";
import type { SiteImage } from "@/data/site-images";

// Foto oder ruhiger Platzhalter in festem Seitenverhältnis.
export default function PhotoSlot({
  image,
  lang,
  ratio,
  sizes,
  priority = false,
  className = "",
}: {
  image: SiteImage | null | undefined;
  lang: "de" | "en";
  ratio: string; // Tailwind-Klasse, z. B. "aspect-[4/5]"
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden rounded-[10px] bg-gradient-to-br from-sand to-[#efe7da] ${ratio} ${className}`}>
      {image ? (
        <Image src={image.src} alt={image.alt[lang]} fill sizes={sizes} priority={priority} className="object-cover" />
      ) : (
        <div aria-hidden className="flex h-full w-full items-center justify-center">
          <Image src="/logo.webp" alt="" width={160} height={160} className="w-1/3 max-w-40 opacity-40 mix-blend-multiply" />
        </div>
      )}
    </div>
  );
}
