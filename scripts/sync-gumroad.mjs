#!/usr/bin/env node
// Gleicht Preise, Titel, Bilder und Beschreibungen mit deinem Gumroad-Shop ab.
//
//   npm run sync:gumroad            zeigt nur die Unterschiede (ändert nichts)
//   npm run sync:gumroad -- --write schreibt die Änderungen in die Datendateien
//
// Der Abgleich ändert nur Produkte, die es schon in src/data/products.ts gibt. Neue oder entfernte
// Produkte werden nur gemeldet: Welt, Lebensphase und Sprachpaar legst du mit Claude fest.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SHOP = "https://ohpawstudio.gumroad.com";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const productsFile = path.join(root, "src/data/products.ts");
const detailsFile = path.join(root, "src/data/product-details.ts");
const write = process.argv.includes("--write");

const unescapeHtml = (s) =>
  s.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
// Bekannte Fehler in den Gumroad-Texten (z. B. durch Trennstellen im Editor), die hier korrigiert werden.
// Weitere Korrekturen bei Bedarf ergänzen: [fehlerhaft, richtig].
const fixes = [
  ["Pflegeauf gaben", "Pflegeaufgaben"],
  ["W elt", "Welt"],
  ["auf gaben", "aufgaben"],
  ["7- Tage", "7-Tage"],
];
const applyFixes = (t) => fixes.reduce((acc, [bad, good]) => acc.split(bad).join(good), t);
const text = (h) =>
  applyFixes(
    unescapeHtml(h.replace(/<br\s*\/?>/gi, " ").replace(/<[^>]+>/g, ""))
      .replace(/\u00a0/g, " ")
      .replace(/\s+/g, " ")
      .replace(/ ([,.;:!?])/g, "$1")
      .trim(),
  );

async function page(url) {
  const res = await fetch(url, { headers: { "user-agent": "Mozilla/5.0 (Oh Paw Studio sync)" } });
  if (!res.ok) throw new Error(`${url}: HTTP ${res.status}`);
  const html = await res.text();
  const m = html.match(/data-page="(.*?)">\s*<\/div>/s);
  if (!m) throw new Error(`${url}: keine Seitendaten gefunden`);
  return JSON.parse(unescapeHtml(m[1])).props;
}

// 1) Produkte der Shop-Seite sammeln
const shopProps = await page(SHOP + "/");
const listed = new Map();
(function walk(o) {
  if (Array.isArray(o)) return o.forEach(walk);
  if (o && typeof o === "object") {
    if (o.permalink && o.name && o.url) {
      const slug = o.url.split("?")[0].split("/").pop();
      listed.set(slug, { name: o.name, cents: o.price_cents, thumb: o.thumbnail_url });
    }
    Object.values(o).forEach(walk);
  }
})(shopProps);

// 2) Lokale Produkte lesen
let productsSrc = fs.readFileSync(productsFile, "utf8");
const lineRe = /^(\s*\{ world: "[a-z]+", slug: ")([^"]+)(", lang: "[a-z]+", title: )("(?:[^"\\]|\\.)*")(, priceEur: )([0-9.]+)(, url: `[^`]+`, image: )(null|img\("[^"]+"\))( \},)$/gm;
const local = [];
for (const m of productsSrc.matchAll(lineRe)) local.push(m[2]);

const changes = [];
const cleanName = (n) => n.replace(/ - (de|en)$/i, "");

productsSrc = productsSrc.replace(lineRe, (all, a, slug, b, title, c, price, d, image, e) => {
  const live = listed.get(slug);
  if (!live) return all;
  const newTitle = JSON.stringify(cleanName(live.name));
  const newPrice = String(live.cents / 100);
  const newImage = live.thumb ? `img("${live.thumb.split("/").pop()}")` : "null";
  if (newTitle !== title) changes.push(`${slug}: Titel ${title} → ${newTitle}`);
  if (Number(price) !== live.cents / 100) changes.push(`${slug}: Preis ${price} € → ${newPrice} €`);
  if (newImage !== image) changes.push(`${slug}: Bild ${image} → ${newImage}`);
  return a + slug + b + newTitle + c + newPrice + d + newImage + e;
});

// 3) Beschreibungen
const key = "export const productDetails: Record<string, ProductDetail> = ";
const detailsSrc = fs.readFileSync(detailsFile, "utf8");
const head = detailsSrc.slice(0, detailsSrc.indexOf(key));
const details = JSON.parse(detailsSrc.slice(detailsSrc.indexOf(key) + key.length).trim().replace(/;$/, ""));

const stop = /^(Ruhiges Design|Liebevoll gestaltet|A calm design|This memory book was intentionally|Thoughtfully designed|Schlicht|Das erwartet|What.s inside|Inside the book|Produktdetails|Product details|Die Digitalversion|Fill in the digital|Bitte beachten|Please note|Simple, calm)/;
const spec = /^(Digitales PDF|Digital PDF|PDF|Digitales Erinnerungsbuch|\d+-page|\d+ pages|\d+ Seiten)/;
const fixSplit = (t) =>
  t.replace(/(^|\s)([B-HJ-Zb-hj-zÄÖÜ]) ([a-zäöüß]{3,})/g, (m, pre, l, w) => (pre === " " || pre === "" ? `${pre}${l}${w}` : m));

for (const slug of local) {
  const live = listed.get(slug);
  if (!live || !details[slug]) continue;
  let props;
  try {
    props = (await page(`${SHOP}/l/${slug}`)).product;
  } catch (e) {
    console.warn(`! ${slug}: ${e.message}`);
    continue;
  }
  const html = props?.description_html ?? "";
  const grab = (re) => [...html.matchAll(re)].map((m) => text(m[1])).filter(Boolean);
  const paras = grab(/<p[^>]*>(.*?)<\/p>/gs).map(fixSplit);
  const lis = grab(/<li[^>]*>(.*?)<\/li>/gs);
  const hs = grab(/<h\d[^>]*>(.*?)<\/h\d>/gs);
  const isMemory = slug === "erstes-jahr-mit-dir" || slug === "first-year-with-you";

  let tagline = isMemory ? (slug === "erstes-jahr-mit-dir" ? hs[1] : paras[0]?.replace(/\s*[🤍🐾]\s*$/u, "")) : hs[0];
  const intro = [];
  for (const p of paras) {
    if (stop.test(p)) break;
    intro.push(p.replace(/\s*[🤍🐾]\s*$/u, ""));
  }
  if (slug === "first-year-with-you") intro.shift();
  const cut = lis.findIndex((x) => spec.test(x));
  const inside = cut === -1 ? lis : lis.slice(0, cut);
  const pagesItem = lis.map((x) => x.match(/(\d+)[- ](Seiten|pages?|page)/i)).find(Boolean);
  const next = {
    tagline: tagline ? fixSplit(tagline).replace(/\.$/, "") : details[slug].tagline,
    intro: intro.filter(Boolean).slice(0, 4),
    inside: isMemory ? inside.slice(0, slug === "erstes-jahr-mit-dir" ? 6 : 5) : inside,
    pages: pagesItem ? Number(pagesItem[1]) : details[slug].pages,
  };
  for (const f of ["tagline", "intro", "inside", "pages"]) {
    if (JSON.stringify(next[f]) !== JSON.stringify(details[slug][f])) {
      changes.push(`${slug}: ${f} geändert`);
      if (process.argv.includes("--verbose")) {
        console.log(`   alt: ${JSON.stringify(details[slug][f])}\n   neu: ${JSON.stringify(next[f])}`);
      }
      details[slug][f] = next[f];
    }
  }
}

// 4) Bericht
const known = new Set(local);
const added = [...listed.keys()].filter((s) => !known.has(s) && s !== "fall-diys");
const missing = local.filter((s) => !listed.has(s));
console.log(`Shop: ${listed.size} Produkte, Website: ${local.length} Produkte.\n`);
console.log(changes.length ? `Änderungen (${changes.length}):\n - ${changes.join("\n - ")}` : "Keine Änderungen: Website und Gumroad stimmen überein.");
if (added.length) console.log(`\nNEU in Gumroad, noch nicht auf der Website (bitte mit Claude einbauen):\n - ${added.map((s) => `${s} (${listed.get(s).name})`).join("\n - ")}`);
if (missing.length) console.log(`\nAuf der Website, aber nicht mehr in Gumroad (bitte prüfen):\n - ${missing.join("\n - ")}`);

if (write && changes.length) {
  fs.writeFileSync(productsFile, productsSrc);
  fs.writeFileSync(detailsFile, head + key + JSON.stringify(details, null, 2) + ";\n");
  console.log("\nÄnderungen wurden in src/data/ geschrieben. Danach `npm run build` ausführen und prüfen.");
} else if (changes.length) {
  console.log("\nNichts geändert. Mit `npm run sync:gumroad -- --write` übernehmen.");
}
