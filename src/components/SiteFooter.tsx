import Link from "next/link";

type Col = { title: string; links: { href: string; label: string }[] };

export default function SiteFooter({
  claim,
  columns,
  copyright,
}: {
  claim: string;
  columns: Col[];
  copyright: string;
}) {
  return (
    <footer className="mt-auto bg-sand">
      <div className="mx-auto grid max-w-5xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[2fr_1fr_1fr_1fr]">
        <div>
          <p className="font-serif text-2xl">Oh Paw Studio</p>
          <p className="mt-2 font-serif text-xl text-cocoa/85">{claim}</p>
        </div>
        {columns.map((c) => (
          <nav key={c.title} aria-label={c.title}>
            <p className="font-medium">{c.title}</p>
            <ul className="mt-3 space-y-1 text-[15px]">
              {c.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="inline-block py-1 hover:text-olive-deep hover:underline underline-offset-4">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <p className="border-t border-taupe/40 px-4 py-4 text-center text-sm text-cocoa/90">{copyright}</p>
    </footer>
  );
}
