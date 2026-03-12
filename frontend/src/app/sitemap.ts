import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.auto-kueppers.de';

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/fahrzeuge`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/aktionen/citroen-foerderung`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/elektro-faq`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/kundendienst`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/dekra-stuetzpunkt`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/gewerbe`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/jobs`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${base}/karriere/bewerbungsformular`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/kontakt`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/impressum`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 },
    { url: `${base}/datenschutz`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 },
  ];

  return staticRoutes;
}