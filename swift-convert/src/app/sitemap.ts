import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://swiftconvert.app";
  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/convert/heic-to-png`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/convert/heic-to-jpg`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/convert/png-to-webp`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/convert/docx-to-pdf`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/compress/jpg`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/compress/png`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/feedback`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];
}
