# Seitenkonzepte (Phase 3) – Entwurf zur Freigabe

Visuelle Entwürfe: `docs/seitenkonzepte/vorschau.html` (im Browser öffnen) bzw. `docs/seitenkonzepte/vorschau.png`.
Basis: UX-Konzept (`docs/ux-konzept.md`) und Designsystem (`docs/designsystem.md`). Umgesetzt ist davon noch nichts.

## Übersicht: Rolle jeder Seite
| Seite | Aufgabe | Hauptaktion | Führt weiter zu |
|---|---|---|---|
| Startseite | Markenwelt erleben, orientieren | Shop entdecken | Welten, Bundle, Über uns, Inspiration |
| Shop | Produkte finden | Produkt öffnen | Produktdetail, Bundles |
| Produktdetail | Überzeugen, Kauf vorbereiten | Bei Gumroad kaufen | Bundle, passende Produkte, Beitrag |
| Bundles | Vorteil verständlich machen | Bei Gumroad kaufen | Einzelprodukte |
| Über uns | Vertrauen, Haltung | Zum Ursprungsprodukt | Shop |
| Inspiration | Hilfe, Sichtbarkeit, Bindung | Beitrag lesen | Produkt („Passende Hilfe“), Newsletter |

## Wie die Bereiche zusammenwirken
- **Welten** sind der rote Faden: Startseite-Kachel → Shop-Filter → Label an Karte und Detail → Themen im Blog. Dieselbe Sprache überall.
- **Bundles** tauchen an drei Stellen leise auf (Startseite-Teaser, Shop-Band, Hinweis am Produkt) und haben eine eigene Seite zum Vergleichen.
- **Blog → Produkt:** jeder Beitrag verweist über einen ruhigen Kasten auf genau ein passendes Produkt.
- **Über uns → Produkt:** die Geschichte endet beim Erinnerungsbuch, mit dem alles begann.
- **Mobil:** alle Seiten funktionieren einspaltig; Kaufleiste am Produkt, wischbare Welten und Bundles, Vollbild-Menü.
- **Zweisprachig:** jede Seite existiert gleichwertig in Deutsch und Englisch; der Umschalter springt zum Gegenstück.

## Wiederverwendete Bausteine (Komponenten)
Header · Footer · Button · Chip · Produktkarte · Bundle-Karte · Beitragskarte · Akkordeon · Zitatband · Vertrauenszeile · Kaufleiste (mobil) ·
Hinweiskasten „Passende Hilfe“. Jeder wird einmal gebaut und auf mehreren Seiten genutzt.

## Was du für die Umsetzung bereitstellen solltest
- **Fotos** (größter Hebel für die Wirkung): ein Hauptbild für die Startseite (Katze im Alltag, Hochformat 4:5), ein Bild je Welt (4:3),
  optional ein persönliches Foto für „Über uns“. Ohne Fotos nutze ich vorerst Produktbilder und das Logo.
- **Produktbilder** für die Detailseiten: Innenseiten, Druckversion, Mockup (aus Gumroad oder neu), mindestens 3 je Produkt.
- **Beitragsbilder** je Blogartikel (3:2).
- Das englische Senior-Produkt braucht noch ein Bild.

## Vorschlag für die Umsetzung (Phase 4, jeweils Seite für Seite, getestet)
| Schritt | Inhalt | Aufwand |
|---|---|---|
| 1 | Bausteine und neue Navigation (Menü, Mobilmenü, Footer) | mittel |
| 2 | Produktdetailseiten (18 Seiten aus den vorhandenen Daten) | mittel |
| 3 | Shop mit Filtern und Bundle-Band | mittel |
| 4 | Bundle-Seite | klein |
| 5 | Startseite neu | mittel |
| 6 | Inspiration (Übersicht und Beitragsseite) | mittel |
| 7 | Über uns neu | klein |

Beibehalten wird: Gumroad-Anbindung, Produktdaten, Blog-Texte, Zweisprachigkeit, My Paw Space, bestehende Adressen.
Neue Adressen: `/products/[slug]` und `/bundles`.

## Offene Entscheidungen
1. Foto-Strategie für die Startseite (siehe Fragen).
2. Auswahlhilfe („Womit anfangen?“) ist als späterer Baustein eingeplant, nicht im ersten Schritt.
3. Reihenfolge der Umsetzung wie oben vorgeschlagen?
