# My Paw Space – Entwurf (Konzept, noch nichts gebaut)

## Idee in einem Satz
Ein persönlicher digitaler Ort für Mensch und Katze: gekaufte Produkte, Erinnerungen und Alltag an einer Stelle –
mit der Option, später Teile mit anderen Katzenmenschen zu teilen.

Schwerpunkt: (1) Kundenbereich für Produkte, (2) persönlicher Katzenbereich. Community (3) erst später.

## Ausbaustufen

### Stufe 0 – Warteliste (ohne Technik-Risiko)
Landingpage `/my-paw-space` (DE/EN) mit Idee, Vorschau-Mockups und Eintrag in die Newsletter-Liste „My Paw Space".
Ziel: Interesse messen, bevor Konten und Datenbank gebaut werden.

### Stufe 1 – Persönlicher Bereich (MVP)
- Anmeldung per E-Mail-Link (kein Passwort)
- **Meine Katzen:** Profil pro Katze (Name, Foto, Geburtstag, Einzugsdatum)
- **Erinnerungen:** Zeitachse mit Einträgen (Text, Foto, Datum, Kategorie: Erste Male / Alltag / Meilenstein)
- **Meine Produkte:** Übersicht der gekauften Produkte mit Download-Link
- Export einer Katze als druckbares PDF
- Datenschutz-Einstellungen: Daten exportieren, Konto löschen

### Stufe 2 – Interaktive Produkte
- Digital ausfüllbare Versionen der Vorlagen (z. B. Erinnerungsbuch, Care Journal, Tierarztunterlagen)
- Mehrere Katzen pro Konto
- Optionale Erinnerungen per E-Mail (Termine, Geburtstag der Katze)

### Stufe 3 – Community (optional)
- Freiwilliges Teilen einzelner Erinnerungen in einer Galerie
- Challenges und Mitmach-Aktionen, Kommentare, Moderation

## Seitenstruktur
`/my-paw-space` Einstieg · `/my-paw-space/dashboard` · `/cats` · `/memories` · `/products` · `/settings`

## Technik (Vorschlag)
- Supabase: Anmeldung, Datenbank, Bildspeicher. Hier wird Supabase erstmals wirklich sinnvoll.
- Weiter Next.js auf Netlify. E-Mail-Versand über den Newsletter-/Mail-Dienst.
- Kosten: Start im kostenlosen Tarif möglich (begrenzt, Projekte werden bei Inaktivität pausiert).
  Ab echten Nutzerinnen ist der Bezahltarif (ca. 25 USD/Monat) realistisch, ebenso bei vielen Fotos.

## Der wichtigste offene Punkt: Käufe verknüpfen
Der Kundenbereich muss wissen, wer was gekauft hat. Optionen:
1. **Bei Gumroad bleiben:** Käufe per Lizenzschlüssel oder Benachrichtigung von Gumroad verknüpfen. Ob und wie genau das mit
   deinem Shop geht, ist noch zu prüfen.
2. **Eigener Shop** (z. B. mit Stripe): volle Kontrolle, aber mehr Technik, Gebühren und rechtliche Pflichten.
3. **Ohne Verknüpfung starten:** Stufe 1 zuerst nur mit Erinnerungen, die Produkt-Übersicht kommt später.

## Datenschutz und Betrieb
- Es entstehen personenbezogene Daten und Fotos: Datenschutzerklärung erweitern, Auftragsverarbeitung mit Supabase prüfen,
  Löschkonzept, Backups.
- Login braucht technisch notwendige Cookies/Speicher (in der Datenschutzerklärung nennen).
- Support-Aufwand (Passwort/Login-Hilfe, Datenlöschung) einplanen.
- Community nur mit Moderationskonzept und Melde-Funktion.

## Risiken
Großer Aufwand im Verhältnis zu den Produkten; laufender Betrieb und Support; Kosten wachsen mit Nutzung.
Empfehlung: erst Stufe 0 (Warteliste), dann entscheiden.

## Offene Entscheidungen
1. Käufe verknüpfen: Gumroad, eigener Shop oder zunächst ohne?
2. Soll der Bereich kostenlos, mit Kauf eines Produkts oder als Abo zugänglich sein?
3. Zeitpunkt: erst Warteliste oder direkt Stufe 1?
