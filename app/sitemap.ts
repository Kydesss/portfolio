import type { MetadataRoute } from 'next';
import { getAllWork, getWorkLastModified } from '@/lib/content';
import { absoluteUrl } from '@/lib/seo';

// Served at /sitemap.xml and referenced from /robots.txt.
export default function sitemap(): MetadataRoute.Sitemap {
  const work = getAllWork();

  // Newest case-study edit doubles as the home page's lastmod, since the home
  // page lists them.
  const workDates = work
    .map((w) => getWorkLastModified(w.slug))
    .filter((d): d is Date => d !== null);
  const newestWork = workDates.length
    ? new Date(Math.max(...workDates.map((d) => d.getTime())))
    : new Date();

  return [
    {
      url: absoluteUrl('/'),
      lastModified: newestWork,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: absoluteUrl('/gallery'),
      lastModified: newestWork,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    ...work.map((item) => ({
      url: absoluteUrl(`/work/${item.slug}`),
      lastModified: getWorkLastModified(item.slug) ?? newestWork,
      changeFrequency: 'monthly' as const,
      // Case studies are the pages worth ranking, so they outrank the gallery.
      priority: 0.8,
    })),
  ];
}
