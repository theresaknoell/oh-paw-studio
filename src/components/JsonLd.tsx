// Strukturierte Daten (schema.org) für Suchmaschinen. Inhalt kommt nur aus eigenen Daten.
export default function JsonLd({ data }: { data: object | object[] }) {
  // "<" wird maskiert, damit der Text nie einen Skript-Block beenden kann
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
