import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "../globals.css";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { getDictionary, hasLocale, locales } from "./dictionaries";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    // Testphase: Suchmaschinen sollen die Seite noch nicht aufnehmen.
    // Zum Livegang entfernen.
    robots: { index: false, follow: false },
  };
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <html lang={lang} className={`${cormorant.variable} ${dmSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <SiteHeader lang={lang} nav={dict.nav} />
        <div className="flex flex-1 flex-col">{children}</div>
        <SiteFooter
          lang={lang}
          claim={dict.claim}
          imprint={dict.footer.imprint}
          privacy={dict.footer.privacy}
        />
      </body>
    </html>
  );
}
