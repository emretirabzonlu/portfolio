import type { MetadataRoute } from "next";

const BASE = "https://emretirabzonlu.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/hi`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
  ];
}
