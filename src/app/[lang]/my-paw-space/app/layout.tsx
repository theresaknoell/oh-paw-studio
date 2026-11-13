import Link from "next/link";
import { notFound } from "next/navigation";
import { pawApp } from "@/data/paw-app";
import { hasLocale } from "../../dictionaries";

export default async function PawAppLayout({
  children,
  params,
}: LayoutProps<"/[lang]/my-paw-space/app">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = pawApp[lang];
  const base = `/${lang}/my-paw-space/app`;
  const links = [
    { href: base, label: t.nav.dashboard },
    { href: `${base}/cats`, label: t.nav.cats },
    { href: `${base}/memories`, label: t.nav.memories },
    { href: `${base}/products`, label: t.nav.products },
    { href: `${base}/print`, label: t.nav.print },
    { href: `${base}/settings`, label: t.nav.settings },
  ];
  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-10">
      <p className="no-print rounded-md bg-sage/25 px-4 py-2 text-sm text-cocoa/90">{t.demoBanner}</p>
      <nav aria-label={t.nav.app} className="no-print mt-6 flex flex-wrap gap-x-6 gap-y-2 border-b border-sand pb-3 text-sm">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="hover:text-olive-deep">{l.label}</Link>
        ))}
      </nav>
      <div className="mt-8">{children}</div>
    </main>
  );
}
