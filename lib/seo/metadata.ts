import type { Metadata } from 'next';

import type { GuidePageData } from '../../content';

export const canonicalOrigin = 'https://dietogetherguide.shop';
export const wikiTitle = (title:string) => title.replace(/\s*\|\s*Die Together (?:Guide|Wiki)$/, '') + ' | Die Together Wiki';

export function canonicalUrl(pathname: string): string {
  return pathname === '/'
    ? canonicalOrigin
    : `${canonicalOrigin}${pathname.startsWith('/') ? pathname : `/${pathname}`}`;
}

export function buildGuideMetadata(page: GuidePageData): Metadata {
  const url = canonicalUrl(page.route);
  return {
    title: { absolute: wikiTitle(page.title) },
    description: page.description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      siteName: 'Die Together Wiki',
      title: wikiTitle(page.title),
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
      title: wikiTitle(page.title),
      description: page.description,
      images: page.heroImage ? [page.heroImage.src] : ['/opengraph-image'],
    },
  };
}
