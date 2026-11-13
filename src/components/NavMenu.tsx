"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import LanguageSwitch from "./LanguageSwitch";

export type SlugMap = { products: Record<string, string>; posts: Record<string, string> };

export type NavLabels = {
  home: string;
  shop: string;
  bundles: string;
  inspiration: string;
  about: string;
  allProducts: string;
  switchLanguage: string;
  main: string;
  openMenu: string;
  closeMenu: string;
  mobileMenu: string;
};

export type NavWorld = { id: string; title: string; text: string };

export default function NavMenu({
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
  const pathname = usePathname();
  // Menüs gelten nur für die Seite, auf der sie geöffnet wurden: ein Seitenwechsel schließt sie.
  const [shopFor, setShopFor] = useState<string | null>(null);
  const [mobileFor, setMobileFor] = useState<string | null>(null);
  const [mobileShop, setMobileShop] = useState(false);
  const shopOpen = shopFor === pathname;
  const mobileOpen = mobileFor === pathname;
  const closeRef = useRef<HTMLButtonElement>(null);
  const shopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!shopOpen && !mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShopFor(null);
        setMobileFor(null);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (shopOpen && shopRef.current && !shopRef.current.contains(e.target as Node)) {
        setShopFor(null);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [shopOpen, mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const base = `/${lang}`;
  const is = (p: string) => pathname === p || pathname.startsWith(`${p}/`);
  const link = (active: boolean) =>
    `border-b-[1.5px] py-1 transition-colors hover:border-olive-deep ${
      active ? "border-olive-deep" : "border-transparent"
    }`;

  return (
    <>
      {/* Desktop */}
      <nav aria-label={nav.main} className="hidden items-center gap-8 text-[15px] md:flex">
        <div ref={shopRef} className="relative">
          <button
            type="button"
            aria-expanded={shopOpen}
            aria-controls="shop-menu"
            onClick={() => setShopFor(shopOpen ? null : pathname)}
            className={`flex items-center gap-1 ${link(is(`${base}/products`))}`}
          >
            {nav.shop}
            <span aria-hidden className={`text-xs transition-transform ${shopOpen ? "rotate-180" : ""}`}>▾</span>
          </button>
          {shopOpen && (
            <div
              id="shop-menu"
              className="absolute left-1/2 top-full z-50 mt-3 w-[34rem] -translate-x-1/2 rounded-[10px] border border-sand bg-ivory p-5"
            >
              <ul className="grid grid-cols-2 gap-x-6 gap-y-4">
                {worlds.map((w) => (
                  <li key={w.id}>
                    <Link href={`${base}/products#${w.id}`} className="group block">
                      <span className="font-serif text-xl group-hover:text-olive-deep">{w.title}</span>
                      <span className="mt-0.5 block text-sm text-cocoa/75">{w.text}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href={`${base}/products`}
                className="mt-5 inline-block border-t border-sand pt-4 text-sm text-olive-deep underline underline-offset-4 hover:text-cocoa"
              >
                {nav.allProducts} →
              </Link>
            </div>
          )}
        </div>
        <Link href={`${base}/bundles`} className={link(is(`${base}/bundles`))}>{nav.bundles}</Link>
        <Link href={`${base}/blog`} className={link(is(`${base}/blog`))}>{nav.inspiration}</Link>
        <Link href={`${base}/about`} className={link(is(`${base}/about`))}>{nav.about}</Link>
        <LanguageSwitch lang={lang} label={nav.switchLanguage} slugMap={slugMap} />
      </nav>

      {/* Mobil */}
      <div className="flex items-center gap-5 md:hidden">
        <LanguageSwitch lang={lang} label={nav.switchLanguage} slugMap={slugMap} />
        <button
          type="button"
          aria-label={nav.openMenu}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileFor(pathname)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-taupe"
        >
          <span aria-hidden className="block h-3.5 w-5 border-y-[1.5px] border-cocoa before:mt-[5px] before:block before:border-t-[1.5px] before:border-cocoa" />
        </button>
      </div>
      {mobileOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label={nav.mobileMenu}
          className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-ivory px-4 pb-10"
        >
          <div className="flex items-center justify-between py-3">
            <Link href={base} aria-label={nav.home}>
              <Image src="/logo.webp" alt="Oh Paw Studio" width={48} height={48} />
            </Link>
            <div className="flex items-center gap-5">
              <LanguageSwitch lang={lang} label={nav.switchLanguage} slugMap={slugMap} />
              <button
                ref={closeRef}
                type="button"
                aria-label={nav.closeMenu}
                onClick={() => setMobileFor(null)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-taupe text-lg"
              >
                <span aria-hidden>✕</span>
              </button>
            </div>
          </div>
          <ul className="mt-6 font-serif text-3xl">
            <li className="border-b border-sand py-3">
              <button
                type="button"
                aria-expanded={mobileShop}
                onClick={() => setMobileShop(!mobileShop)}
                className="flex w-full items-center justify-between text-left"
              >
                {nav.shop}
                <span aria-hidden className={`text-base transition-transform ${mobileShop ? "rotate-180" : ""}`}>▾</span>
              </button>
              {mobileShop && (
                <ul className="mt-3 space-y-3 pb-2 font-sans text-base">
                  {worlds.map((w) => (
                    <li key={w.id}>
                      <Link href={`${base}/products#${w.id}`} className="block py-1">
                        <span className="font-serif text-2xl">{w.title}</span>
                        <span className="block text-sm text-cocoa/75">{w.text}</span>
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link href={`${base}/products`} className="block py-1 text-olive-deep underline underline-offset-4">
                      {nav.allProducts} →
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li className="border-b border-sand py-3"><Link href={`${base}/bundles`} className="block">{nav.bundles}</Link></li>
            <li className="border-b border-sand py-3"><Link href={`${base}/blog`} className="block">{nav.inspiration}</Link></li>
            <li className="border-b border-sand py-3"><Link href={`${base}/about`} className="block">{nav.about}</Link></li>
          </ul>
        </div>
      )}
    </>
  );
}
