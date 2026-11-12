// Beim Livegang in Netlify die Umgebungsvariable SITE_LIVE=true setzen.
// Bis dahin bleibt die Seite für Suchmaschinen gesperrt.
export const isLive = process.env.SITE_LIVE === "true";

export const siteUrl = process.env.SITE_URL ?? process.env.URL ?? "http://localhost:3000";
