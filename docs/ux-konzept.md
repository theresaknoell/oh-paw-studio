# UX-Konzept Oh Paw Studio (Phase 1) – Entwurf zur Freigabe

Status: Konzept. Es wurde nichts umgesetzt. Annahmen sind als solche markiert; Besucherzahlen und Nutzerdaten liegen noch nicht vor.

---

## 0. Leitgedanken

**Aus der Markenvision abgeleitet:** Oh Paw Studio soll Menschen über viele Jahre mit ihren Katzen begleiten. Die Website ist deshalb
kein reiner Produktkatalog, sondern ein Ort, an dem man ankommt, sich orientiert und wiederkommt.

Sechs UX-Prinzipien, an denen jede Entscheidung gemessen wird:

1. **Ruhig führen.** Eine klare Aufgabe pro Bildschirm, großzügige Abstände, keine konkurrierenden Aufforderungen.
2. **Nach Lebenslage statt nach Katalog.** Menschen suchen „Ich habe ein Kitten“, nicht „Produktnummer 7“.
3. **Erst Nutzen, dann Preis.** Was hilft es mir im Alltag? Danach kommt der Kauf.
4. **Emotional, nie kitschig.** Wärme durch Sprache, Bildwirkung und Rhythmus, nicht durch Dekoration.
5. **Zweisprachig auf Augenhöhe.** Deutsch und Englisch sind gleichwertig gestaltet, nicht übersetzt „angeklebt“.
6. **Wachsen ohne Umbau.** Die Struktur hat Platz für neue Produktwelten, My Paw Space, Community und einen eigenen Shop.

---

## 1. Ist-Zustand (kurzes Audit)

**Stark**
- Klare Markenwirkung (Farben, Typografie, Logo), ruhige Optik, zweisprachig, barrierearm (automatisch geprüft, keine Befunde).
- Produkte nach Welten gegliedert, Bundles vorbereitet, Blog mit Produktbezug, saubere URLs mit Sprache.

**Lücken**
| Bereich | Befund | Auswirkung |
|---|---|---|
| Produkt | Keine eigenen Produktdetailseiten; nur Karte mit aufklappbarem Inhalt | Kaum Überzeugungsarbeit, schwache Auffindbarkeit bei Google |
| Navigation | Nur „Produkte, Blog, Über uns“; Bundles, Welten und Lebensphasen sind nicht erreichbar | Orientierung schwach |
| Bundles | Nur Platzhalter, in Produktliste eingebettet | Größter Umsatzhebel noch nicht sichtbar |
| Produktseite | Eine lange Liste mit 9 Produkten, keine Filter | Wird mit mehr Produkten unübersichtlich |
| Sprache | Umschalter wechselt auf dieselbe Unterseite, aber Produkte/Blogbeiträge haben kein Gegenstück | Bei fehlendem Gegenstück Sackgasse |
| Mobil | Menü ist eine Zeile mit Links, kein eigenes Mobilmenü | Wird mit mehr Punkten zu eng |
| Vertrauen | Keine Hinweise zu Sofort-Download, Druckversion, Zahlungsabwicklung vor dem Klick | Hürde vor dem Wechsel zu Gumroad |
| Bindung | Newsletter und My Paw Space noch nicht auffindbar | Kein Weg für wiederkehrende Besucher |

---

## 2. Zielgruppen und ihre Anliegen (Annahmen)

| Typ | Situation | Sucht | Entscheidet über |
|---|---|---|---|
| **Die Neue** | Kitten zieht ein oder ist gerade eingezogen | Orientierung, Checklisten, Sicherheit | Vertrauen, Vollständigkeit, Bundle „Kitten-Jahr“ |
| **Die Erinnernde** | Lebt mit Katze(n), will Momente bewahren | Persönliches, Schönes, Erinnerungsstück | Optik, Ton, Druckbarkeit, Geschenkcharakter |
| **Die Organisierte** | Mehrkatzen- oder Senior-Haushalt, Tierarztthemen | Überblick, Praktisches | Funktion, Inhaltsübersicht, Seitenzahl |

Gemeinsam: überwiegend mobil unterwegs (Annahme, über Pinterest/Instagram/Google), wollen schnell wissen „Ist das für mich?“.

---

## 3. Informationsarchitektur

```
Start
├─ Shop                     /products
│   ├─ Produktwelten        (Der Start · Alltag & Pflege · Zuhause & Beschäftigung · Erinnerungen)
│   ├─ Nach Lebensphase     (Kitten · Erwachsene Katze · Senior · Mehrere Katzen)  [Filter]
│   └─ Produktdetail        /products/[slug]                                       [NEU]
├─ Bundles                  /bundles                                               [NEU]
├─ Inspiration (Blog)       /blog        Themen: Start · Erinnerungen · Beschäftigung · Alltag · Zuhause
│   └─ Beitrag              /blog/[slug]
├─ Über uns                 /about
├─ My Paw Space             /my-paw-space (später im Menü)
└─ Footer: Newsletter · Impressum · Datenschutz · (später) Kontakt, Community
```

Bestehende URLs bleiben erhalten (`/de/products`, `/de/blog`, …). Neu hinzu kommen nur Detailseiten und `/bundles`.

**Benennung (Vorschlag):** „Shop“ statt „Produkte“ im Menü (klarer Kaufkontext), „Inspiration“ statt „Blog“ (wärmer, Markenton).
Englisch: Shop · Bundles · Inspiration · About.

---

## 4. Navigation und Menüführung

**Desktop-Header** (ruhig, sticky, Höhe ca. 72 px)
`Logo | Shop ▾ | Bundles | Inspiration | Über uns | [DE/EN] | (später) My Paw Space`
- **Shop ▾** öffnet ein schlichtes Untermenü: die vier Welten mit je einer Zeile Nutzen, darunter „Alle Produkte“.
- Aktive Seite dezent markiert (Unterstreichung in Olive, kein Farbblock).
- Der Sprachumschalter bleibt am rechten Rand, immer sichtbar.

**Mobil-Header**
`Logo | DE/EN | ☰` – das Menü öffnet als ruhiges Vollbild-Overlay mit großen Links (ca. 20 px Schrift), Shop-Welten direkt darunter ausklappbar, Newsletter-Hinweis am Ende. Schließen per ✕ und per Wischen.

**Orientierung auf Unterseiten**
- Brotkrumen auf Produktdetails: `Shop › Der Start › Kitten Care Edition`.
- „Zurück zur Welt“ statt nur Browser-Zurück.

**Footer** (vier ruhige Spalten, mobil gestapelt)
Marke + Claim · Shop (Welten, Bundles) · Inspiration & Über uns · Rechtliches + Sprache + Newsletter-Feld (sobald verfügbar).

---

## 5. Nutzerwege vom ersten Besuch bis zum Kauf

**Weg A – Suche (Google):** „Kitten Einzug Checkliste“ → Blogbeitrag → Inhaltsblock „Passende Hilfe“ (1 Produkt, 1 Satz Nutzen) → Produktdetail → *Bei Gumroad kaufen*.
*Messpunkt:* Klicks vom Beitrag auf Produkt.

**Weg B – Soziale Medien/Pinterest:** Pin zum Produkt → direkt Produktdetail (Deep Link) → Hinweis „Im Bundle günstiger“ → Bundle oder Einzelkauf.
*Messpunkt:* Klicks auf Gumroad je Produkt.

**Weg C – Direktbesuch/Neugier:** Startseite → Markenbotschaft → Welt wählen → Produktliste der Welt → Detail → Kauf.
*Messpunkt:* Klicktiefe Startseite → Welt.

**Weg D – Wiederkehrend:** Newsletter oder My Paw Space → ergänzendes Produkt („Dazu passt …“) → Kauf.
*Messpunkt:* Wiederkaufquote (nach Einführung Newsletter/My Paw Space).

Prinzip auf jedem Weg: **ein klarer nächster Schritt**, höchstens ein ergänzender (z. B. Bundle).

---

## 6. Produkt- und Kategoriestruktur

Primär **Welten** (genau eine pro Produkt), ergänzend **Lebensphasen** (mehrere möglich) und **Typ**.

| Produkt | Welt | Lebensphase | Typ |
|---|---|---|---|
| New Cat Parent Bundle | Der Start | Kitten, Neue Katze | Bundle (bereits in Gumroad) |
| Kitten Care Edition | Der Start | Kitten | Einzelprodukt |
| Cat Care Journal | Alltag & Pflege | Alle | Einzelprodukt |
| Veterinary Records Pack | Alltag & Pflege | Alle | Einzelprodukt |
| Multi-Cat Household Pack | Alltag & Pflege | Mehrere Katzen | Einzelprodukt |
| Senior Cat Care Edition | Alltag & Pflege | Senior | Einzelprodukt |
| Cat Home Collection | Zuhause & Beschäftigung | Alle | Collection |
| Cat Enrichment Collection | Zuhause & Beschäftigung | Alle | Collection |
| My First Year with You | Erinnerungen | Kitten | Einzelprodukt |
| (neu) vier Bundles | Welt des Kernprodukts, zusätzlich Typ „Bundle“ | je nach Inhalt | Bundle |

Offener Punkt: Das bestehende „New Cat Parent Bundle“ und die neuen Bundles müssen inhaltlich klar abgegrenzt sein.

**Erweiterbarkeit:** Neue Welten (z. B. „Unterwegs“, „Geschenke“) lassen sich als Eintrag in der Produktdatei ergänzen; Menü und Startseite folgen automatisch.

---

## 7. Führung zwischen Produkten und Bundles

Regeln, die auf allen Produktseiten gleich gelten:

1. **Jedes Produkt zeigt höchstens zwei Empfehlungen** – ein Bundle („Im Bundle X günstiger: Ersparnis Y €“) und ein passendes Einzelprodukt („Dazu passt …“).
2. **Bundles erklären sich selbst:** Was ist enthalten, Einzelpreise durchgestrichen, Ersparnis, für wen.
3. **Eine Primäraktion pro Seite:** „Bei Gumroad kaufen“. Empfehlungen sind visuell leiser (Textlink oder kleine Karte).
4. **Keine Konkurrenz:** Auf der Bundle-Seite ist das Bundle der Hauptakt, die Einzelprodukte sind Aufklappdetails.
5. **Vor dem Klick Erwartung klären:** „Sofort-Download · Digital und Druckversion · Bezahlung über Gumroad“.

Empfehlungslogik (aus `docs/shop-strategie.md` übernommen) bleibt die Datenbasis.

---

## 8. Mobile User Experience

- **Daumenzone:** Primärbutton fest am unteren Rand der Produktdetailseite (Preis + „Bei Gumroad kaufen“), sobald der Hauptbutton aus dem Bild scrollt.
- **Tippflächen** mindestens 44 × 44 px, genügend Abstand zwischen Links.
- **Produktlisten** einspaltig, Karten mit großem Bild, Titel, einer Zeile Nutzen, Preis.
- **Welten als horizontale, wischbare Leiste** am Anfang der Shopseite, plus Lebensphasen als Filter-Chips.
- **Inhaltsübersicht und Details** als Akkordeons, damit die Seite nicht endlos wird.
- **Lesen:** Fließtext 17–18 px, Zeilenlänge unter 65 Zeichen, Überschriften brechen sauber um.
- **Keine Hover-Abhängigkeit:** Alles, was Hover zeigt, ist auch per Tipp erreichbar.
- **Ladezeit:** Bilder in passender Größe, Schriften lokal; später per Messung prüfen.

---

## 9. Zweisprachige Benutzerführung

- **Sprache steckt in der Adresse** (`/de`, `/en`), das bleibt als Quelle der Wahrheit. Erstbesuch: automatische Weiterleitung nach Browsersprache, danach immer frei umschaltbar.
- **Umschalter** im Header und im Mobilmenü, beschriftet in der Zielsprache („English“ / „Deutsch“).
- **Gegenstück-Logik:** Produkte und Bundles kennen ihr Sprachpendant; der Umschalter springt direkt dorthin. Hat ein Blogbeitrag kein Pendant, führt der Umschalter zur Inspiration-Übersicht der anderen Sprache statt in eine Fehlerseite.
- **Sprachhinweis am Produkt:** „Dieses Produkt gibt es auch auf Englisch“ mit Link; Gumroad-Produkte sind sprachgebunden.
- **Lokalisiert statt übersetzt:** Ton, Beispiele und Überschriften je Sprache eigenständig. Währung bleibt Euro, Zahlenformat folgt der Sprache.
- **Technisch:** hreflang-Verweise sind in der Sitemap vorbereitet und kommen für Produkte und Seiten dazu.

---

## 10. Wachstum, Vision und Wirtschaftlichkeit

| Zeithorizont | UX-Baustein | Aufwand | Voraussetzung |
|---|---|---|---|
| Jetzt | Navigation, Produktdetails, Bundle-Seite, Mobilmenü | mittel | Freigabe dieses Konzepts |
| Bald | Newsletter-Block in Footer und Beiträgen | klein | MailerLite-Formular |
| Danach | My Paw Space im Menü | mittel | Supabase, Entscheidungen laut Checkliste |
| Später | Community, individuelle Erinnerungsstücke (z. B. aus Erinnerungen gestaltbare PDFs) | groß | My Paw Space läuft |
| Offen | Eigener Shop | groß | Entscheidung Gumroad vs. eigener Shop |

Die Produktdetailseiten sind dabei **die tragende Investition**: Sie bleiben bestehen, auch wenn später nur der Kaufbutton von Gumroad auf einen eigenen Checkout wechselt. Es gibt keine Sackgasse in der Architektur.

---

## 11. Erfolgsmessung (nach Livegang)

Klicks auf „Bei Gumroad kaufen“ je Produkt · Klickrate von Beitrag zu Produkt · Nutzung der Welten und Filter · Bundle-Klicks gegenüber Einzelprodukt · Newsletter-Anmeldungen · Anteil mobiler Besuche. Dafür ist eine datensparsame Statistik nötig (offene Entscheidung).

---

## 12. Getroffene Entscheidungen

1. **Eigene Produktdetailseiten** auf der Website, Kauf bleibt bei Gumroad. ✔
2. **Hauptmenü:** Shop ▾ (Welten), Bundles, Inspiration, Über uns. ✔
3. **Produktnamen:** englische Markennamen bleiben, auf der deutschen Seite kommt ein deutscher Untertitel dazu. ✔
4. **Lebensphasen-Filter** als einfache Chips zusätzlich zu den Welten. ✔

Offen: Gesamtfreigabe dieses UX-Konzepts. Danach folgt Phase 2: Designsystem (Typografie, Raster, Komponenten, Zustände), wieder zuerst als Konzept zur Prüfung.
