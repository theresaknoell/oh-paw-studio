import Link from "next/link";

// Zweisprachig, weil die Sprache hier nicht bekannt ist.
export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-24 text-center">
      <h1 className="text-5xl">404</h1>
      <p className="text-lg text-cocoa/80">
        Diese Seite gibt es nicht. · This page does not exist.
      </p>
      <p className="flex gap-6">
        <Link href="/de" className="text-olive-deep underline underline-offset-4">
          Zur Startseite
        </Link>
        <Link href="/en" className="text-olive-deep underline underline-offset-4">
          Back to home
        </Link>
      </p>
    </main>
  );
}
