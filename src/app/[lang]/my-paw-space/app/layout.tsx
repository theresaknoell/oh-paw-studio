import type { Metadata } from "next";
import AppNav from "@/components/paw/AppNav";
import { notFound } from "next/navigation";
import { pawApp } from "@/data/paw-app";
import { hasLocale } from "../../dictionaries";

// Demo-Bereich: nicht für Suchmaschinen gedacht
export const metadata: Metadata = { robots: { index: false, follow: false } };

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
    { href: `${base}/book`, label: t.nav.book },
    { href: `${base}/care`, label: t.nav.care },
    { href: `${base}/products`, label: t.nav.products },
    { href: `${base}/print`, label: t.nav.print },
    { href: `${base}/settings`, label: t.nav.settings },
  ];
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-10 print:max-w-none print:p-0">
      <p className="no-print rounded-md bg-sage/25 px-4 py-2 text-sm text-cocoa/90" role="note">{t.demoBanner}</p>
      <AppNav links={links} base={base} label={t.nav.app} />
      <div className="mt-8 print:mt-0">{children}</div>
    </main>
  );
}
