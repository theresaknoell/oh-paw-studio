# My Paw Space – was beim Livegang noch zu tun ist

## Stand heute
Fertig und auf der Testseite ausprobierbar (Demo-Modus, Daten nur im Browser):
Einstieg `/de/my-paw-space`, App unter `/de/my-paw-space/app` mit Übersicht, Meine Katzen, Erinnerungen,
Meine Produkte (alle Produkte, noch ohne Kaufprüfung) und Einstellungen (Datenexport, alles löschen). Deutsch und Englisch.

Vorbereitet: Datenbankschema `supabase/schema.sql` (Entwurf, noch nicht getestet).
Die Seite ist nicht im Menü und nicht in der Sitemap.

## Noch NICHT vorhanden
Anmeldung, echte Datenbank, Fotos, PDF-Export, Kaufprüfung, digital ausfüllbare Vorlagen, Community.

## Checkliste zum Livegang (Stufe 1)
Entscheidungen
- [ ] Zugang: kostenlos, nur mit gekauftem Produkt oder Abo?
- [ ] Käufe verknüpfen: Gumroad, eigener Shop oder zunächst ohne Prüfung?

Du (Konten, ca. 15 Minuten)
- [ ] Kostenloses Supabase-Konto anlegen und ein Projekt erstellen (Region EU, z. B. Frankfurt)
- [ ] `supabase/schema.sql` im SQL-Editor ausführen
- [ ] Unter Authentication die E-Mail-Anmeldung (Magic Link) aktivieren und die Website-Adresse als Redirect eintragen
- [ ] Die zwei öffentlichen Projektwerte (URL und anon key) in Netlify als Umgebungsvariablen eintragen

Ich (Technik)
- [ ] Demo-Speicher `src/lib/paw-store.ts` durch Supabase ersetzen
- [ ] Anmeldeseite und geschützten Bereich bauen
- [ ] Fotos (Supabase Storage) und PDF-Export ergänzen
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
