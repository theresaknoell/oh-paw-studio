# Abgleich mit Gumroad

Preise, Titel, Vorschaubilder und Beschreibungen der Produkte sind auf der Website Kopien aus deinem Gumroad-Shop
(`src/data/products.ts` und `src/data/product-details.ts`). Ändert sich etwas in Gumroad, gleicht dieser Befehl es ab.

```bash
npm run sync:gumroad              # zeigt nur die Unterschiede, ändert nichts
npm run sync:gumroad -- --write   # übernimmt die Änderungen
npm run sync:gumroad -- --verbose # zeigt zusätzlich alten und neuen Text
```

Danach `npm run build` ausführen, die Änderungen ansehen und committen.

**Was er tut:** Er liest `https://ohpawstudio.gumroad.com` und jede Produktseite, vergleicht mit den Daten der Website und
aktualisiert Preis, Titel, Vorschaubild, Untertitel, Beschreibung, Inhaltsliste und Seitenzahl bestehender Produkte.

**Was er nicht tut:** Er fügt keine Produkte hinzu und entfernt keine. Neue oder verschwundene Produkte werden nur gemeldet,
weil Welt, Lebensphase, Sprachpaar und Empfehlungen (`src/data/product-pairs.ts`) entschieden werden müssen. Sag mir dann Bescheid.
„Billy's Fall DIYs" wird bewusst ignoriert.

**Bekannte Textfehler aus Gumroad** (z. B. „Pflegeauf gaben") korrigiert er über die Liste `fixes` am Anfang der Datei
`scripts/sync-gumroad.mjs`. Besser: den Fehler auch in Gumroad beheben.

Bundles sind davon getrennt (`src/data/bundles.ts`): Preise und Links dort bitte selbst eintragen oder mir schicken.
