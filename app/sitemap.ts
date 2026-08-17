import type { MetadataRoute } from 'next';

import { canonicalUrl } from '../lib/seo/metadata';
import { publicRoutes } from '../lib/seo/routes';

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((route) => ({
    url: canonicalUrl(route),
    lastModified: new Date('2026-08-17T00:00:00Z'),
    changeFrequency:
      route === '/' || route === '/updates'
        ? 'daily'
        : route === '/privacy' || route === '/terms'
          ? 'yearly'
          : 'weekly',
    priority: route === '/' ? 1 : route.includes('/tools/') ? 0.8 : 0.7,
  }));
}
