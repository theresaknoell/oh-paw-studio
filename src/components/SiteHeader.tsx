import Image from "next/image";
import Link from "next/link";
import NavMenu, { type NavLabels, type NavWorld } from "./NavMenu";

export default function SiteHeader({
  lang,
  nav,
  worlds,
}: {
  lang: "de" | "en";
  nav: NavLabels;
  worlds: NavWorld[];
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-sand bg-ivory">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href={`/${lang}`} aria-label={nav.home}>
          <Image src="/logo.webp" alt="Oh Paw Studio" width={48} height={48} priority />
        </Link>
        <NavMenu lang={lang} nav={nav} worlds={worlds} />
      </div>
    </header>
  );
}
