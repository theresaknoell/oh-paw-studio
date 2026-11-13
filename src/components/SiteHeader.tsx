import Image from "next/image";
import Link from "next/link";
import LanguageSwitch from "./LanguageSwitch";

type Nav = {
  home: string;
  about: string;
  products: string;
  blog: string;
  switchLanguage: string;
  main: string;
};

export default function SiteHeader({
  lang,
  nav,
}: {
  lang: "de" | "en";
  nav: Nav;
}) {
  const links = [
    { href: `/${lang}/products`, label: nav.products },
    { href: `/${lang}/blog`, label: nav.blog },
    { href: `/${lang}/about`, label: nav.about },
  ];
  return (
    <header className="border-b border-sand">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link href={`/${lang}`} aria-label={nav.home}>
          <Image src="/logo.webp" alt="Oh Paw Studio" width={64} height={64} />
        </Link>
        <nav aria-label={nav.main} className="flex items-center gap-6 text-sm">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-olive-deep">
              {l.label}
            </Link>
          ))}
          <LanguageSwitch lang={lang} label={nav.switchLanguage} />
        </nav>
      </div>
    </header>
  );
}
