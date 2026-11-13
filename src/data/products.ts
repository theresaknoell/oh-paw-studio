// Produkte aus dem Gumroad-Shop (Stand November 2026).
// Neue Produkte hier ergänzen; Bild = Vorschaubild von Gumroad.
import type { Locale } from "@/app/[lang]/dictionaries";

export type World = "start" | "care" | "home" | "memories";

export const worlds: World[] = ["start", "care", "home", "memories"];

export type Product = {
  world: World;
  slug: string;
  lang: Locale;
  title: string;
  priceEur: number;
  url: string;
  image: string | null;
};

const img = (id: string) => `https://public-files.gumroad.com/${id}`;
const shop = "https://ohpawstudio.gumroad.com/l";

export const products: Product[] = [
  { world: "memories", slug: "erstes-jahr-mit-dir", lang: "de", title: "Mein erstes Jahr mit dir – Katzen-Erinnerungsbuch", priceEur: 19.9, url: `${shop}/erstes-jahr-mit-dir`, image: img("f000mqos53xco5zlyv1qo76haurn") },
  { world: "care", slug: "the-cat-care-journal-de", lang: "de", title: "The Cat Care Journal", priceEur: 19.9, url: `${shop}/the-cat-care-journal-de`, image: img("3cwq9i4qrkvsithbyxng9ux9pma1") },
  { world: "start", slug: "the-new-cat-parent-bundle-de", lang: "de", title: "The New Cat Parent Bundle", priceEur: 19.9, url: `${shop}/the-new-cat-parent-bundle-de`, image: img("b6vn86naslrtig6esxa3mhsarkzk") },
  { world: "home", slug: "the-cat-home-collection-de", lang: "de", title: "The Cat Home Collection", priceEur: 19.9, url: `${shop}/the-cat-home-collection-de`, image: img("9dtr3cp2zxaqz11gihrqz2514dq7") },
  { world: "home", slug: "the-cat-enrichment-collection-de", lang: "de", title: "The Cat Enrichment Collection", priceEur: 19.9, url: `${shop}/the-cat-enrichment-collection-de`, image: img("1cpkup9l4hhdjeb6eoxsukyc76ky") },
  { world: "start", slug: "the-kitten-care-edition-de", lang: "de", title: "The Kitten Care Edition", priceEur: 9.9, url: `${shop}/the-kitten-care-edition-de`, image: img("zxgvaxvbqr4jwtzlq63cmefo6ris") },
  { world: "care", slug: "the-senior-cat-edition-de", lang: "de", title: "The Senior Cat Care Edition", priceEur: 9.9, url: `${shop}/the-senior-cat-edition-de`, image: img("4xfpygiyo6teqv1wb2p3sz1sgno2") },
  { world: "care", slug: "the-multi-cat-household-pack-de", lang: "de", title: "The Multi-Cat Household Pack", priceEur: 7.9, url: `${shop}/the-multi-cat-household-pack-de`, image: img("jbo81wo3221cwqk4tlbizb9bglhh") },
  { world: "care", slug: "the-veterinary-records-pack-de", lang: "de", title: "The Veterinary Records Pack", priceEur: 7.9, url: `${shop}/the-veterinary-records-pack-de`, image: img("7bprca4e21dedgodelcmazk2fps6") },

  { world: "memories", slug: "first-year-with-you", lang: "en", title: "My First Year with You – Cat Memory Book", priceEur: 19.9, url: `${shop}/first-year-with-you`, image: img("1yx74u1np6coa5h6yx7j3pamhqnc") },
  { world: "care", slug: "the-cat-care-journal-en", lang: "en", title: "The Cat Care Journal", priceEur: 19.9, url: `${shop}/the-cat-care-journal-en`, image: img("ggvsv0ygqlefjb5jel1v52hypnry") },
  { world: "start", slug: "the-new-cat-parent-bundle-en", lang: "en", title: "The New Cat Parent Bundle", priceEur: 19.9, url: `${shop}/the-new-cat-parent-bundle-en`, image: img("jhrkadapzlyotwckofxc2zz3ysqt") },
  { world: "home", slug: "the-cat-home-colletion-en", lang: "en", title: "The Cat Home Collection", priceEur: 19.9, url: `${shop}/the-cat-home-colletion-en`, image: img("asjre83r6if3wp6fz3x2lb7ufzwq") },
  { world: "home", slug: "the-cat-enrichment-collection-en", lang: "en", title: "The Cat Enrichment Collection", priceEur: 19.9, url: `${shop}/the-cat-enrichment-collection-en`, image: img("kcm54sl777wct5jlgjtorjch7bgh") },
  { world: "start", slug: "the-kitten-care-edition-en", lang: "en", title: "The Kitten Care Edition", priceEur: 9.9, url: `${shop}/the-kitten-care-edition-en`, image: img("3rpnt9yosr7tpp2riy29qq2ocx3f") },
  { world: "care", slug: "the-senior-cat-care-edtion-en", lang: "en", title: "The Senior Cat Care Edition", priceEur: 9.9, url: `${shop}/the-senior-cat-care-edtion-en`, image: null },
  { world: "care", slug: "the-multi-cat-household-pack-en", lang: "en", title: "The Multi-Cat Household Pack", priceEur: 7.9, url: `${shop}/the-multi-cat-household-pack-en`, image: img("22vpzqjj85guncvefwi8qb4wv270") },
  { world: "care", slug: "the-veterinary-records-pack-en", lang: "en", title: "The Veterinary Records Pack", priceEur: 7.9, url: `${shop}/the-veterinary-records-pack-en`, image: img("h02fcvofyc43mptjyuv1ao1wjyel") },

  { world: "home", slug: "the-seasonal-enrichment-collection-de", lang: "de", title: "The Seasonal Enrichment Collection", priceEur: 7.9, url: `${shop}/the-seasonal-enrichment-collection-de`, image: img("7b9s5wln6vc4zg3ssgn3ifppw54v") },
  { world: "home", slug: "the-seasonal-enrichment-collection-en", lang: "en", title: "The Seasonal Enrichment Collection", priceEur: 8.9, url: `${shop}/the-seasonal-enrichment-collection-en`, image: null },
  { world: "home", slug: "30-days-of-cat-enrichment-de", lang: "de", title: "30 Days of Cat Enrichment", priceEur: 8.9, url: `${shop}/30-days-of-cat-enrichment-de`, image: img("6kgdoaagdnhddewo12q9xda1f6e9") },
  { world: "home", slug: "30-days-of-cat-enrichment-en", lang: "en", title: "30 Days of Cat Enrichment", priceEur: 9.9, url: `${shop}/30-days-of-cat-enrichment-en`, image: null },
  { world: "home", slug: "th-indoor-cat-activity-planner-de", lang: "de", title: "The Indoor Cat Activity Planner", priceEur: 9.9, url: `${shop}/th-indoor-cat-activity-planner-de`, image: img("ll2c49l6tg7h8vxl7jyxoc4m1nrl") },
  { world: "home", slug: "the-indoor-cat-activity-planner-en", lang: "en", title: "The Indoor Cat Activity Planner", priceEur: 9.9, url: `${shop}/the-indoor-cat-activity-planner-en`, image: img("b9ysi0ypaqtndzlq7upv31ucg67i") },
  { world: "home", slug: "the-diy-enrichment-book-de", lang: "de", title: "The DIY Enrichment Book", priceEur: 12.9, url: `${shop}/the-diy-enrichment-book-de`, image: img("3z04ofz00rncrziezr763jklgfiq") },
  { world: "home", slug: "the-diy-enrichment-book-en", lang: "en", title: "The DIY Enrichment Book", priceEur: 12.9, url: `${shop}/the-diy-enrichment-book-en`, image: img("6kshnyuuqcs2clmdawgj66x2advq") },
  { world: "care", slug: "the-printable-care-planner-en", lang: "en", title: "The Printable Care Planner", priceEur: 8.9, url: `${shop}/the-printable-care-planner-en`, image: img("o58nw7bpih5wu9ualuixtpdwxapv") },
];

export const productsFor = (lang: Locale) =>
  products.filter((p) => p.lang === lang);

export const productsInWorld = (lang: Locale, world: World) =>
  productsFor(lang).filter((p) => p.world === world);
