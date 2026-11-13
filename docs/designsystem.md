# Designsystem Oh Paw Studio (Phase 2) – Entwurf zur Freigabe

Visuelle Vorschau: `docs/designsystem/vorschau.html` (im Browser öffnen) bzw. `docs/designsystem/vorschau.png`.
Status: Konzept. Auf der Website ist noch nichts davon umgesetzt.

## 1. Gestaltungsprinzipien
Ruhig statt laut · Weißraum als Gestaltungsmittel · Wärme durch Farbe und Sprache, nicht durch Dekor · Funktion vor Effekt ·
ein klarer Blickfang pro Bildschirm · alles in Deutsch und Englisch gleich gut lesbar.

## 2. Farben
| Name | HEX | Rolle |
|---|---|---|
| Warm Ivory | #F5F1E9 | Seitenhintergrund |
| Soft Sand | #E5DCCF | Karten-, Bundle- und Footer-Flächen, Trennlinien |
| Muted Sage | #A7AD98 | Dezente Akzente, Chips, Linien |
| Olive Grey | #747B67 | Dekor und große Elemente (nicht für kleinen Text) |
| Deep Cocoa | #443C35 | Text, Überschriften, Fokus, Hover-Zustand von Buttons |
| Dusty Taupe | #B7A99A | Rahmen von Formularfeldern, feine Details |
| **Olive Deep (Ergänzung)** | #626A54 | Olive für Text und Buttons, bereits auf der Website im Einsatz |

Hinweis: Olive Deep ist die einzige Ergänzung zur Markenpalette. Sie ist nur etwas dunkler als Olive Grey und nötig, weil Olive Grey
(3,9:1) für kleinen Text und Buttons nicht genug Kontrast bietet. Ob sie in den Markenrichtlinien offiziell aufgenommen wird, entscheidest du.

**Kontraste (WCAG, Ziel 4,5:1 für Text):** Cocoa/Ivory 9,6 · Cocoa/Sand 8,0 · Olive Deep/Ivory 5,0 · Ivory/Olive Deep 5,0 · Cocoa/Sage 4,7.
Nicht erlaubt für Text: Sage/Ivory (2,1), Taupe/Ivory (2,0), Olive Grey/Ivory (3,9). **Olive Deep nicht auf Sand** (4,2); dort Cocoa.
Keine weiteren kräftigen Farben. Fehlertext nutzt ein gedämpftes Rotbraun (#7A3F33) und tritt nur im Fehlerfall auf.

## 3. Typografie
| Stufe | Schrift | Größe (Mobil → Desktop) | Zeilenhöhe |
|---|---|---|---|
| Display | Cormorant Garamond 500 | 44 → 72 px | 1,05 |
| H1 | Cormorant Garamond 500 | 36 → 52 px | 1,1 |
| H2 | Cormorant Garamond 500 | 28 → 40 px | 1,15 |
| H3 | Cormorant Garamond 500 | 22 → 28 px | 1,2 |
| Lead | Cormorant Garamond 400 | 20 → 26 px | 1,4 |
| Fließtext | DM Sans 400 | 17 → 18 px | 1,65 |
| UI, Buttons | DM Sans 500 | 15 px | 1,2 |
| Label | DM Sans 500, Versalien, 0,08 em | 13 px | 1,3 |

Regeln: Zeilenlänge maximal 65 Zeichen · Überschriften nie fett, Eleganz kommt aus der Größe · lange deutsche Wörter werden
automatisch getrennt · Preise in Cormorant · keine weiteren Schriftfamilien.

## 4. Abstände und Raster
Basis 4 px: 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96. Abschnittsabstand 48 px (Mobil) bzw. 96 px (Desktop).
Inhaltsbreite 1080 px, Lesetext 680 px. Seitenrand 16 / 24 / 32 px. Raster 4 / 8 / 12 Spalten, Abstand 24 px.
Ecken: 10 px (Karten, Bilder), 8 px (Formulare), Pille (Buttons). Keine Schatten, Ausnahme: mobile Kaufleiste (sehr weich).

## 5. Buttons und Links
- **Primär:** Olive Deep, Ivory-Text, Pille, 44 px hoch. Hover und Gedrückt: Cocoa. Pro Ansicht nur einer.
- **Sekundär:** transparent mit Olive-Deep-Rahmen. Hover: gefüllt.
- **Textlink:** Olive Deep, unterstrichen (4 px Abstand). Hover: Cocoa, Strich etwas stärker.
- **Fokus:** 2 px Cocoa-Ring mit 3 px Abstand, immer sichtbar bei Tastaturbedienung.
- **Deaktiviert:** Sand-Fläche, gedämpfter Text.
Beschriftung: Verb + Ziel, z. B. „Bei Gumroad kaufen“, „Alle Produkte ansehen“.

## 6. Karten
**Produktkarte:** Bild 1:1 → Label (Welt) → Titel (Cormorant) → Nutzenzeile → Meta (PDF, Seiten, Digital und Druck) → Preis.
Kein Rahmen, kein Schatten; Hover hebt das Bild um 2 px.
**Bundle-Karte:** Sand-Fläche, Chip „Bundle“, enthaltene Produkte, Preis mit durchgestrichener Summe, Chip „Du sparst X €“, Primärbutton.
**Beitragskarte:** Bild 3:2, Datum und Thema als Label, Titel, Auszug.
Alle Karten stehen einspaltig (Mobil), zweispaltig (Tablet), dreispaltig (Desktop).

## 7. Bildsprache und Formate
Natürliches Licht, warme neutrale Töne, viel Weißraum, echte Katzen in ruhigen Alltagsmomenten statt gestellter Posen.
Produkte als sauberes Mockup auf Ivory oder Sand. Keine Cartoons, keine Clip-Art, keine harten Filter.
Formate: Produkt 1:1 (wie Gumroad-Cover) · Beitrag 3:2 · Banner 16:9 · Social 1:1 und 4:5 · Vorschaubild für Links 1200 × 630.
Alle Bilder mit Alternativtext, in passender Größe geliefert (Next.js passt sie an), Format WebP oder AVIF.
Das Logo bleibt unverändert; Mindestgröße im Header 48 px.

## 8. Formulare
Beschriftung immer über dem Feld. Feldhöhe 48 px, Rahmen Taupe, Hover Olive Deep, Fokus Cocoa-Ring. Fehler: Rotbraun-Rahmen und
sachlicher Text darunter. Pflichtfelder klar markiert. Newsletter: Einwilligungstext lesbar direkt unter dem Feld, Bestätigung per Mail erklärt.

## 9. Navigation und Footer
**Desktop:** sticky Header, Logo links, Shop ▾ (Welten), Bundles, Inspiration, Über uns, Sprache rechts. Aktiv = feine Unterstreichung.
**Mobil:** Logo, Sprache, ☰ → Vollbild-Menü mit 30 px Cormorant-Links, Shop klappt die vier Welten auf.
**Kaufleiste (Mobil, Produktdetail):** Preis und Primärbutton am unteren Rand, sobald der Hauptbutton aus dem Bild scrollt.
**Footer:** Sand-Fläche, vier Spalten (Marke und Claim, Shop, Entdecken, Rechtliches), mobil zweispaltig, später Newsletter-Feld.

## 10. Interaktion und Bewegung
Übergänge 150–300 ms mit sanfter Beschleunigung, keine Sprünge oder Federn. Hover nur für Zusatz, nie für Wesentliches
(Touch). Bei „Bewegung reduzieren“ im Betriebssystem entfallen die Übergänge. Ladezustände: ruhig, ohne Drehkreisel.

## 11. Responsive
Smartphone bis 639 px: eine Spalte, Vollbild-Menü, Kaufleiste, Akkordeons. Tablet 640–1023 px: zwei Spalten, Rand 24 px.
Desktop ab 1024 px: drei Spalten, Untermenü, zweispaltiges Produktdetail mit mitlaufendem Kaufbereich.

## 12. Umsetzung (erst nach Freigabe)
Bestehende Bausteine bleiben: Tailwind-Farbwerte (`ivory`, `sand`, `sage`, `olive`, `cocoa`, `taupe`, `olive-deep`), Schriften, Produktdaten,
Gumroad-Links, Blog, My Paw Space. Neu: Komponenten Button, Karte, Navigation, Footer und Formularfelder als wiederverwendbare Bausteine.
Reihenfolge laut Phase 3 und 4: Seite für Seite, jede Änderung getestet.

## 13. Getroffene Entscheidungen (freigegeben)
1. Olive Deep (#626A54) ist offizielle Ergänzung der Markenpalette für Text und Buttons. ✔
2. Produktkarten ohne Rahmen und Schatten. ✔
3. Buttons als Pille. ✔
