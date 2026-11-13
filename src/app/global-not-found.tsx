import type { Metadata } from "next";
import Link from "next/link";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});
const dmSans = DM_Sans({ variable: "--font-dm-sans", subsets: ["latin"] });

export const metadata: Metadata = { title: "404 · Oh Paw Studio" };

// 404 für Adressen, die zu keiner Seite passen. Zweisprachig, weil die Sprache unbekannt ist.
export default function GlobalNotFound() {
  return (
    <html lang="de" className={`${cormorant.variable} ${dmSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-24 text-center">
          <h1 className="text-5xl">404</h1>
          <p className="text-lg text-cocoa/80">
            Diese Seite gibt es nicht. · <span lang="en">This page does not exist.</span>
          </p>
          <p className="flex gap-6">
            <Link href="/de" className="text-olive-deep underline underline-offset-4">Zur Startseite</Link>
            <Link href="/en" lang="en" className="text-olive-deep underline underline-offset-4">Back to home</Link>
          </p>
        </main>
      </body>
    </html>
  );
}
