import { NextResponse, type NextRequest } from "next/server";

const locales = ["de", "en"];
const defaultLocale = "de";

// Wählt anhand der Browser-Spracheinstellung Deutsch oder Englisch.
function getLocale(request: NextRequest): string {
  const header = request.headers.get("accept-language") ?? "";
  const preferred = header
    .split(",")
    .map((part) => part.split(";")[0].trim().slice(0, 2).toLowerCase());
  return preferred.find((lang) => locales.includes(lang)) ?? defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return;

  request.nextUrl.pathname = `/${getLocale(request)}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Alles außer interne Pfade, API und Dateien mit Endung (Bilder, Icons usw.)
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
