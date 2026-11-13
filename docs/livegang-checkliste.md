# Livegang-Checkliste für Oh Paw Studio (für den MacBook)

Jeder Punkt ist einzeln erledigbar. Die Reihenfolge ist so gewählt, dass nichts doppelt gemacht werden muss.
Wenn dir ein Menüpunkt anders heißt als hier beschrieben, schick mir einfach, was du siehst.

## 1. Impressum (Österreich)
- Eingetragen sind: Theresa Knöll, c/o Neubauerstraße 77, 4050 Traun, Österreich, hello@ohpawstudio.com.
- Wegen der österreichischen Adresse gelten österreichische Regeln (E-Commerce-Gesetz, Mediengesetz, Gewerbeordnung, Kleinunternehmerregelung nach § 6 Abs. 1 Z 27 UStG). Die Texte sind Vorlagen, keine Rechtsberatung; bitte bei der Wirtschaftskammer oder einer Steuerberatung abgleichen.
- Noch offen im Text (in eckigen Klammern): Gewerbebehörde, Wirtschaftskammer/Landeskammer, UID-Nummer (falls vorhanden), Abgleich des Unternehmensgegenstands mit deiner Gewerbeberechtigung.

## 2. Domain und E-Mail (erledigt: bei IONOS gekauft)
- Domain und E-Mail-Postfach liegen bei IONOS. Die Cloudflare-Anleitung aus früheren Versionen ist nicht mehr nötig.
- Domain: **ohpawstudio.com**, E-Mail: **hello@ohpawstudio.com** (die E-Mail steht schon im Impressum und in der Datenschutzerklärung).
- Die IONOS-Adresse kannst du als Kontakt im Impressum, als Absender bei MailerLite und für den Gumroad-Support nutzen.
- Wichtig: In den IONOS-DNS-Einstellungen nur die Einträge für die Website ändern (A/CNAME). Die E-Mail-Einträge (MX, SPF, DKIM) nicht löschen, sonst funktioniert dein Postfach nicht mehr.

## 3. Domain mit dem Hosting verbinden
Variante A, Netlify (aktuell eingerichtet):
1. Netlify: Site configuration → Domain management → Add a domain → `ohpawstudio.com` eintragen.
2. Netlify zeigt die nötigen DNS-Einträge (meist ein A-Eintrag für die Hauptdomain und ein CNAME für `www`). Diese bei IONOS unter Domains → DNS eintragen. Bestehende E-Mail-Einträge nicht anfassen.
3. In Netlify „HTTPS“ aktivieren (kostenloses Zertifikat, dauert einige Minuten bis Stunden nach der DNS-Änderung).

Variante B, anderes Hosting (z. B. STRATO oder IONOS-Webspace): siehe technische Einschätzung zum statischen Export. Dafür wäre eine kleine Vorbereitung nötig.

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
`https://ohpawstudio.com/sitemap.xml` einreichen. Die Bestätigung geht über einen DNS-Eintrag bei IONOS.

## 8. Entscheidungen
- Analytics: nur Search Console und Gumroad-Statistik (kostenlos) oder zusätzliches Tool (ca. 9 €/Monat)?
- My Paw Space: erst Warteliste oder direkt Stufe 1 (siehe `docs/my-paw-space-livegang.md`)?

## 9. Letzte Prüfung vor dem Livegang
- [ ] Impressum und Datenschutz ohne Platzhalter
- [ ] Alle Blogtexte und „Über uns“ von dir gelesen und freigegeben
- [ ] Produktbilder und Gumroad-Links auf der echten Domain getestet (Deutsch und Englisch, Handy und Computer)
- [ ] Englisches Senior-Produkt in Gumroad: Vorschaubild ergänzen
