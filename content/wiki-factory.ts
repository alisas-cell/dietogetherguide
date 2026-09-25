import { REVIEW_DATE } from '../data/current';
import type { ContentSection, GuidePageData } from './types';

export function section(
  id: string,
  heading: string,
  paragraphs: string[],
  bullets?: string[],
  links?: Array<[string, string]>,
): ContentSection {
  return {
    id,
    heading,
    paragraphs,
    bullets,
    links: links?.map(([href, label]) => ({ href, label })),
  };
}
export function wikiPage(
  route: string,
  title: string,
  answer: string,
  sourceIds: string[],
  sections: ContentSection[],
  links: Array<[string, string]>,
  faqs: GuidePageData['faqs'] = [],
): GuidePageData {
  return {
    route,
    title,
    h1: title,
    description:
      answer.length > 160
        ? `${answer.slice(0, 157).replace(/\s+\S*$/, '')}…`
        : answer,
    eyebrow: 'Current Early Access field guide',
    directAnswer: [answer],
    buildContext: 'September update review · current facts and dated changes',
    confidence: 'confirmed',
    checkedAt: REVIEW_DATE,
    lastModified: REVIEW_DATE,
    breadcrumbs: [
      { label: 'Home', href: '/' },
      ...(route.split('/').filter(Boolean).length > 1
        ? [
            {
              label: route.split('/')[1]!.replaceAll('-', ' '),
              href: route.startsWith('/items/')
                ? '/items-and-weapons'
                : `/${route.split('/')[1]}`,
            },
          ]
        : []),
      { label: title },
    ],
    sourceIds,
    sections,
    faqs,
    related: links.map(([href, label]) => ({
      href,
      label,
      description: `Continue with ${label.toLowerCase()}.`,
    })),
  };
}
