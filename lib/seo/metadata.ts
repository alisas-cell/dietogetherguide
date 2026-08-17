import type { Metadata } from 'next';

import type { GuidePageData } from '../../content';

export const canonicalOrigin = 'https://dietogetherguide.shop';

export function canonicalUrl(pathname: string): string {
  return pathname === '/'
    ? canonicalOrigin
    : `${canonicalOrigin}${pathname.startsWith('/') ? pathname : `/${pathname}`}`;
}

export function buildGuideMetadata(page: GuidePageData): Metadata {
  const url = canonicalUrl(page.route);
  return {
    title: { absolute: page.title },
    description: page.description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      siteName: 'Die Together Guide',
      title: page.title,
      description: page.description,
      images: page.heroImage
        ? [
            {
              url: page.heroImage.src,
              alt: page.heroImage.alt,
            },
          ]
        : ['/opengraph-image'],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
      images: page.heroImage ? [page.heroImage.src] : ['/opengraph-image'],
    },
  };
}
