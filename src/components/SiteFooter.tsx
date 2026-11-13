import Link from "next/link";

export default function SiteFooter({
  lang,
  claim,
  imprint,
  privacy,
}: {
  lang: "de" | "en";
  claim: string;
  imprint: string;
  privacy: string;
}) {
  return (
    <footer className="mt-auto border-t border-sand">
      <div className="mx-auto max-w-5xl px-6 py-8 text-center text-sm text-cocoa/75">
        <p className="font-serif text-lg text-cocoa">{claim}</p>
        <p className="mt-3 flex justify-center gap-6">
          <Link href={`/${lang}/impressum`} className="hover:text-olive-deep">
            {imprint}
          </Link>
          <Link href={`/${lang}/datenschutz`} className="hover:text-olive-deep">
            {privacy}
          </Link>
        </p>
        <p className="mt-2">© 2026 Oh Paw Studio</p>
      </div>
    </footer>
  );
}
