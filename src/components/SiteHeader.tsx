import Image from "next/image";
import Link from "next/link";
import NavMenu, { type NavLabels, type NavWorld, type SlugMap } from "./NavMenu";

export default function SiteHeader({
  lang,
  nav,
  worlds,
  slugMap,
}: {
  lang: "de" | "en";
  nav: NavLabels;
  worlds: NavWorld[];
  slugMap: SlugMap;
}) {
  return (
    <header className="site-header sticky top-0 z-40 border-b border-sand">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href={`/${lang}`} aria-label={nav.home}>
          <Image src="/logo.webp" alt="Oh Paw Studio" width={48} height={48} priority />
        </Link>
        <NavMenu lang={lang} nav={nav} worlds={worlds} slugMap={slugMap} />
      </div>
    </header>
  );
}
