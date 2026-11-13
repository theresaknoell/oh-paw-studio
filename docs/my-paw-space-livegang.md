# My Paw Space – was beim Livegang noch zu tun ist

## Stand heute
Fertig und ausprobierbar (Demo-Modus, Daten nur im Browser), unter `/de/my-paw-space` und `/en/my-paw-space`:
- Katzenprofile mit Foto, Bearbeiten und Löschen; mehrere Katzen
- Erinnerungs-Zeitachse mit Kategorie (Erstes Mal, Alltag, Meilenstein) und optionalem Foto
- **Digitales Erinnerungsbuch** (`/app/book`): folgt dem Buch „Mein erstes Jahr mit dir“ / „My First Year with You“ (Willkommen, Kapitel 01 bis 13,
  12 Monatskapitel, „Von mir für dich“). Es gibt Steckbrief, Fragen, Listen, Foto-Felder mit Datum, Tabellen (Meilensteine, Gewicht, Tierarzt,
  Impfungen) und die Erinnerungsimpulse. Deutsch und Englisch, automatisches Speichern, Fortschritt, Pfoten-Konfetti beim ersten Eintrag je Abschnitt.
  Die Texte stehen in `src/data/paw-book-de.ts` und `paw-book-en.ts` (gleicher Aufbau und gleiche Reihenfolge der Felder, Antworten werden nach
  Position gespeichert; neue Felder nur am Ende einer Seite ergänzen).
- **Druckbares Erinnerungsbuch** (`/app/print`, `/app/book-pdf` leitet dorthin um): Titelblatt mit Logo, Foto und Daten, ein Layout im Markendesign
  (Cormorant, Strichillustrationen je Kapitel, Pfoten-Trenner), weißer Hintergrund (spart Tinte), nur ausgefüllte Seiten, A4. Alternativ als Zeitachse.
  „Drucken / als PDF speichern“ nutzt den Druckdialog (Hintergrundgrafiken aktivieren). Das ist die Grundlage für den späteren bezahlten Export;
  für ein echtes Produkt fehlen noch Feinschliff (Seitenzahlen, Widmungsseite) und Bezahlung. Die Illustrationen stehen in
  `src/components/paw/BookArt.tsx`, das Logo für den Druck in `public/logo-print.png` (transparent).
- **Pflege-Journal** (`/app/care`): Profil und Kontakte (Mikrochip, Tierarztpraxis, Notfallkontakt, Futter, Besonderheiten), Gewichtsverlauf mit
  Diagramm, Tierarzt und Gesundheit (Impfung, Kontrolle, Behandlung), Medikamente; Druckansicht; Verweis auf das Care Journal bei Gumroad.
  Es ist reine Dokumentation und gibt keine Gesundheitsempfehlungen.
- **Warteliste** auf der Vorschauseite (`/my-paw-space`): nutzt das Newsletter-Formular. Für eine eigene Gruppe in MailerLite ein zweites Formular
  anlegen und die Adresse in `src/data/newsletter.ts` bei `pawSpaceAction` eintragen.
- Meine Produkte (alle Produkte, noch ohne Kaufprüfung)
- Einstellungen: Daten exportieren und wieder importieren (JSON), alles löschen, Anzeige des belegten Speichers
- Anmeldeseite `/my-paw-space/login` als deaktivierte Vorbereitung (Formular noch ohne Funktion)
- Deutsch und Englisch, barrierearm geprüft

Vorbereitet: Datenbankschema `supabase/schema.sql` (Entwurf, noch nicht getestet).
Die Seite ist nicht im Menü und nicht in der Sitemap.

## Grenzen des Demo-Modus
Fotos werden im Browser auf 900 px verkleinert und im lokalen Speicher abgelegt (ca. 5 MB gesamt). Daten gelten nur für diesen Browser und dieses Gerät.

## Noch NICHT vorhanden
Echte Anmeldung, echte Datenbank, Foto-Speicher in der Cloud, Kaufprüfung, bezahlter Export, E-Mail-Erinnerungen (z. B. für Impftermine), Community.

## Checkliste zum Livegang (Stufe 1)
Entscheidungen
- [ ] Erinnerungsbuch in der App, Zugang offen. Zwei Varianten (Entscheidung nach Interessenstest mit der Warteliste):
  - A: Probe (z. B. Ankunft und zwei Monate) frei, Rest nur mit gekauftem Erinnerungsbuch (braucht Kaufprüfung).
  - B (Empfehlung): Ausfüllen kostenlos, bezahlt wird das gestaltete PDF mit eigenem Layout (neues Produkt „Personalisiertes Erinnerungsbuch“).
    Die einfache Druckansicht bleibt schlicht, sonst zahlt niemand für das gestaltete PDF. Käuferinnen des Standard-PDFs könnten den Export gratis bekommen.
  - Der gestaltete PDF-Export ist ein eigener Baustein (Layout, Zahlung) und wird erst gebaut, wenn Interesse da ist.
- [ ] Zugang: kostenlos, nur mit gekauftem Produkt oder Abo?
- [ ] Käufe verknüpfen: Gumroad, eigener Shop oder zunächst ohne Prüfung?

Du (Konten, ca. 15 Minuten)
- [ ] Kostenloses Supabase-Konto anlegen und ein Projekt erstellen (Region EU, z. B. Frankfurt)
- [ ] `supabase/schema.sql` im SQL-Editor ausführen
- [ ] Unter Authentication die E-Mail-Anmeldung (Magic Link) aktivieren und die Website-Adresse als Redirect eintragen
- [ ] Die zwei öffentlichen Projektwerte (URL und anon key) in Netlify als Umgebungsvariablen eintragen

Ich (Technik)
- [ ] Demo-Speicher `src/lib/paw-store.ts` durch Supabase ersetzen
- [ ] Anmeldeformular (`/my-paw-space/login`) mit Supabase verbinden und den Bereich schützen
- [ ] Fotos in Supabase Storage statt im Browser speichern (PDF-Druckansicht ist bereits fertig)
- [ ] Kaufprüfung gemäß Entscheidung oben
- [ ] Seite ins Menü und in die Sitemap aufnehmen, Demo-Hinweis entfernen

Recht und Betrieb
- [ ] Datenschutzerklärung um My Paw Space erweitern (Konto, gespeicherte Daten inkl. Gesundheitsangaben zur Katze und Fotos, Supabase als Dienstleister, Löschung)
- [ ] Auftragsverarbeitung mit Supabase prüfen
- [ ] Impressum fertig (bereits Voraussetzung für den Livegang der Website)
- [ ] Backup- und Löschkonzept festlegen

## Kosten
Start im kostenlosen Supabase-Tarif möglich (begrenzte Größe, Projekt kann bei Inaktivität pausiert werden).
Mit echten Nutzerinnen und vielen Fotos ist der Bezahltarif realistisch (ca. 25 USD pro Monat).
