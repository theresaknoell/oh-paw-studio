# Livegang-Checkliste für Oh Paw Studio (für den MacBook)

Jeder Punkt ist einzeln erledigbar. Die Reihenfolge ist so gewählt, dass nichts doppelt gemacht werden muss.
Wenn dir ein Menüpunkt anders heißt als hier beschrieben, schick mir einfach, was du siehst.

## 1. Impressum-Angaben festlegen
- Name, ladungsfähige Anschrift (kein reines Postfach) und E-Mail-Adresse entscheiden.
- Schick mir die Angaben; ich trage sie in Impressum und Datenschutzerklärung ein (beide Sprachen).
- Wenn du die Privatadresse schützen willst: Geschäfts- oder c/o-Adresse bzw. Impressumsservice (kostet meist Geld).

## 2. Domain kaufen (ca. 10–15 € pro Jahr)
1. Kostenloses Konto auf https://dash.cloudflare.com/sign-up anlegen, sofort Zwei-Faktor-Anmeldung aktivieren.
2. Unter „Domainregistrierung“ ohpawstudio.com suchen (war frei) und für 1 Jahr kaufen, automatische Verlängerung an.
3. Kaufpreis vor dem Bezahlen auf der Bestellseite prüfen.

## 3. Domain mit Netlify verbinden
1. Netlify: Site configuration → Domain management → Add a domain → ohpawstudio.com.
2. Netlify zeigt die nötigen DNS-Einträge. Diese bei Cloudflare unter „DNS“ eintragen.
   Wichtig: Bei Cloudflare den Status bei diesen Einträgen auf „Nur DNS“ (graue Wolke) stellen.
3. In Netlify „HTTPS“ aktivieren (kostenloses Zertifikat, dauert einige Minuten).

## 4. Livegang-Schalter in Netlify
Site configuration → Environment variables:
- `SITE_URL` = `https://ohpawstudio.com`
- `SITE_LIVE` = `true`
Danach „Trigger deploy“. Erst jetzt öffnet sich die Seite für Suchmaschinen (Sperre, robots.txt, Sitemap).

## 5. Bundles in Gumroad anlegen
Zusammenstellung (jeweils für Deutsch und Englisch, 20 % Vorteil):
| Bundle | Enthalten | Preis |
|---|---|---|
| Kitten-Jahr / Kitten Year | Kitten Care Edition, Veterinary Records Pack, Erinnerungsbuch | 29,90 € |
| Zuhause & Spiel / Home & Play | Cat Home Collection, Cat Enrichment Collection | 31,90 € |
| Senior-Begleitung / Senior Companion | Senior Cat Care Edition, Veterinary Records Pack, Cat Care Journal | 29,90 € |
| Mehrkatzen-Alltag / Multi-Cat Everyday | Multi-Cat Household Pack, Cat Care Journal | 21,90 € |

Vorgehen (nach meinem Kenntnisstand): Gumroad → Products → New product → Typ „Bundle“ wählen → Produkte auswählen →
Titel, Beschreibung, Preis → veröffentlichen. Die Links schickst du mir; ich baue die Kaufen-Buttons ein
(`src/data/bundles.ts`).

## 6. Newsletter (MailerLite)
- Formular „Oh Paw Studio Website“ als Embedded form anlegen, Double Opt-in aktivieren, HTML-Code an mich schicken.
- Absenderadresse im Konto hinterlegen (gleiche Adresse wie im Impressum).
- Danach baue ich Formular, Einwilligungstext und den Datenschutz-Abschnitt ein.

## 7. Search Console (kostenlos)
Nach dem Livegang auf https://search.google.com/search-console die Domain bestätigen und die Sitemap
`https://ohpawstudio.com/sitemap.xml` einreichen.

## 8. Entscheidungen
- Analytics: nur Search Console und Gumroad-Statistik (kostenlos) oder zusätzliches Tool (ca. 9 €/Monat)?
- My Paw Space: erst Warteliste oder direkt Stufe 1 (siehe `docs/my-paw-space-livegang.md`)?

## 9. Letzte Prüfung vor dem Livegang
- [ ] Impressum und Datenschutz ohne Platzhalter
- [ ] Alle Blogtexte und „Über uns“ von dir gelesen und freigegeben
- [ ] Produktbilder und Gumroad-Links auf der echten Domain getestet (Deutsch und Englisch, Handy und Computer)
- [ ] Englisches Senior-Produkt in Gumroad: Vorschaubild ergänzen
