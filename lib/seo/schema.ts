import type { GuidePageData } from '../../content';
import { canonicalOrigin, canonicalUrl } from './metadata';

export type JsonLdObject = Record<string, unknown>;

export function buildGuideSchemas(page: GuidePageData): JsonLdObject[] {
  const url = canonicalUrl(page.route);
  const schemas: JsonLdObject[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: page.h1,
      headline: page.h1,
      description: page.description,
      isPartOf: {
        '@type': 'WebSite',
        '@id': `${canonicalOrigin}/#website`,
        url: canonicalOrigin,
        name: 'Die Together Guide',
      },
      dateModified: '2026-08-17',
      inLanguage: 'en',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: page.breadcrumbs.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.label,
        item: item.href ? canonicalUrl(item.href) : url,
      })),
    },
  ];

  if (page.faqs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: page.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    });
  }

  return schemas;
}

export function buildHomeSchemas(
  faqs: ReadonlyArray<{ question: string; answer: string }>,
): JsonLdObject[] {
  const guideItems: Array<[string, string]> = [
    ['/monsters', 'Monsters'],
    ['/maps', 'Maps'],
    ['/loot-and-extraction', 'Loot and Extraction'],
    ['/items-and-weapons', 'Items and Weapons'],
    ['/rum-buffs-and-perks', 'Rum Buffs and Perks'],
    ['/troubleshooting', 'Troubleshooting'],
  ];

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${canonicalOrigin}/#website`,
      url: canonicalOrigin,
      name: 'Die Together Guide',
      description:
        'Independent source-checked field guide for Last Pirates: Die Together.',
      inLanguage: 'en',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${canonicalOrigin}/#webpage`,
      url: canonicalOrigin,
      name: 'Last Pirates: Die Together Guide',
      description:
        'Source-checked Last Pirates: Die Together guides for monsters, maps, loot, co-op, Early Access updates and troubleshooting.',
      isPartOf: { '@id': `${canonicalOrigin}/#website` },
      dateModified: '2026-08-17',
      inLanguage: 'en',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Last Pirates field guide categories',
      itemListElement: guideItems.map(([path, name], index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name,
        url: canonicalUrl(path),
      })),
    },
  ];
}
