"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export type AppNavLink = { href: string; label: string };

// Navigation im Paw Space: aktiver Punkt hervorgehoben, auf kleinen Bildschirmen seitlich scrollbar statt umgebrochen.
export default function AppNav({ links, base, label }: { links: AppNavLink[]; base: string; label: string }) {
  const pathname = usePathname();
  const isActive = (href: string) => (href === base ? pathname === base : pathname === href || pathname.startsWith(`${href}/`));
  return (
    <nav aria-label={label} className="no-print -mx-6 mt-5 border-b border-sand px-6 md:mx-0 md:px-0">
      <ul className="-mb-px flex gap-1 overflow-x-auto md:gap-2 whitespace-nowrap text-sm [scrollbar-width:none]">
        {links.map((l) => {
          const active = isActive(l.href);
          return (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`inline-flex min-h-11 items-center border-b-2 px-2.5 lg:px-3 transition-colors ${
                  active ? "border-olive-deep font-medium text-olive-deep" : "border-transparent hover:border-taupe hover:text-olive-deep"
                }`}
              >
                {l.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
