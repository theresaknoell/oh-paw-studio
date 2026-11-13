# My Paw Space – was beim Livegang noch zu tun ist

## Stand heute
Fertig und ausprobierbar (Demo-Modus, Daten nur im Browser), unter `/de/my-paw-space` und `/en/my-paw-space`:
- Katzenprofile mit Foto, Bearbeiten und Löschen; mehrere Katzen
- Erinnerungs-Zeitachse mit Kategorie (Erstes Mal, Alltag, Meilenstein) und optionalem Foto
- **Geführtes Erinnerungsbuch** (`/app/book`): 16 Kapitel (Ankunft, Monat 1 bis 12, Eigenheiten, Meilensteine, Zum Abschluss) mit
  eigenen Fragen als Anregung, Foto je Kapitel, Fortschrittsanzeige und automatischem Speichern. Die Fragen stehen in `src/data/paw-book.ts`
  und lassen sich dort ergänzen oder ändern (die `id`s nicht ändern, sonst gehen gespeicherte Antworten verloren). Das Buch ist eine
  Mitmach-Version; das ausgearbeitete, druckbare PDF bleibt dein Gumroad-Produkt (die App verweist darauf).
- **Druckansicht:** pro Katze mit Titelblatt und wahlweise Erinnerungsbuch (nur ausgefüllte Kapitel) oder Zeitachse; „Drucken / als PDF speichern“ nutzt den Druckdialog des Browsers
- Meine Produkte (alle Produkte, noch ohne Kaufprüfung)
- Einstellungen: Daten exportieren und wieder importieren (JSON), alles löschen, Anzeige des belegten Speichers
- Anmeldeseite `/my-paw-space/login` als deaktivierte Vorbereitung (Formular noch ohne Funktion)
- Deutsch und Englisch, barrierearm geprüft

Vorbereitet: Datenbankschema `supabase/schema.sql` (Entwurf, noch nicht getestet).
Die Seite ist nicht im Menü und nicht in der Sitemap.

## Grenzen des Demo-Modus
Fotos werden im Browser auf 900 px verkleinert und im lokalen Speicher abgelegt (ca. 5 MB gesamt). Daten gelten nur für diesen Browser und dieses Gerät.

## Noch NICHT vorhanden
Echte Anmeldung, echte Datenbank, Foto-Speicher in der Cloud, Kaufprüfung, weitere ausfüllbare Vorlagen (z. B. Care Journal), E-Mail-Erinnerungen, Community.

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
- [ ] Datenschutzerklärung um My Paw Space erweitern (Konto, gespeicherte Daten, Supabase als Dienstleister, Löschung)
- [ ] Auftragsverarbeitung mit Supabase prüfen
- [ ] Impressum fertig (bereits Voraussetzung für den Livegang der Website)
- [ ] Backup- und Löschkonzept festlegen

## Kosten
Start im kostenlosen Supabase-Tarif möglich (begrenzte Größe, Projekt kann bei Inaktivität pausiert werden).
Mit echten Nutzerinnen und vielen Fotos ist der Bezahltarif realistisch (ca. 25 USD pro Monat).
