import type { MetadataRoute } from 'next';

import { canonicalUrl } from '../lib/seo/metadata';
import { lastModifiedByRoute, publicRoutes } from '../lib/seo/routes';

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((route) => ({
    url: canonicalUrl(route),
    lastModified: new Date(`${lastModifiedByRoute[route]}T00:00:00Z`),
    changeFrequency:
      route === '/' || route === '/updates'
        ? 'daily'
        : route === '/privacy' || route === '/terms'
          ? 'yearly'
          : 'weekly',
    priority: route === '/' ? 1 : route.includes('/tools/') ? 0.8 : 0.7,
  }));
}
