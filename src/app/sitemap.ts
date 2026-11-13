import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/blog";
import { siteUrl } from "@/lib/site";

const pages = ["", "/products", "/bundles", "/blog", "/about", "/impressum", "/datenschutz"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = pages.map((p) => ({
    url: `${siteUrl}/de${p}`,
    alternates: {
      languages: { de: `${siteUrl}/de${p}`, en: `${siteUrl}/en${p}` },
    },
  }));
  for (const lang of ["en", "de"] as const) {
    if (lang === "en") {
      for (const p of pages)
        entries.push({
          url: `${siteUrl}/en${p}`,
          alternates: {
            languages: { de: `${siteUrl}/de${p}`, en: `${siteUrl}/en${p}` },
          },
        });
    }
    for (const post of getPosts(lang)) {
      entries.push({
        url: `${siteUrl}/${lang}/blog/${post.slug}`,
        lastModified: post.date,
      });
    }
  }
  return entries;
}
