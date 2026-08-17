import { describe, expect, it } from 'vitest';

import { guidePages, requiredCoreRoutes } from '../../content';
import { homeSectionOrder } from '../../content/home';

const trustRoutes = new Set(['/about', '/contact', '/privacy', '/terms']);

function wordCount(value: string): number {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

describe('public content registry', () => {
  it('covers every required non-home route exactly once', () => {
    expect(requiredCoreRoutes).toHaveLength(23);
    expect(requiredCoreRoutes[0]).toBe('/');
    expect(guidePages).toHaveLength(22);
    expect(new Set(guidePages.map((page) => page.route))).toEqual(
      new Set(requiredCoreRoutes.slice(1)),
    );
  });

  it('keeps titles, H1s, and descriptions unique with a direct answer', () => {
    expect(new Set(guidePages.map((page) => page.title)).size).toBe(22);
    expect(new Set(guidePages.map((page) => page.h1)).size).toBe(22);
    expect(new Set(guidePages.map((page) => page.description)).size).toBe(22);

    for (const page of guidePages) {
      expect(page.directAnswer.length, page.route).toBeGreaterThanOrEqual(2);
      expect(page.directAnswer.join(' '), page.route).not.toMatch(
        /lorem|todo|coming soon|placeholder/i,
      );
      expect(page.related.length, page.route).toBeGreaterThanOrEqual(3);
      expect(page.sourceIds.length, page.route).toBeGreaterThanOrEqual(1);
    }
  });

  it('keeps editorial routes substantive without padding trust pages', () => {
    for (const page of guidePages) {
      const prose = [
        ...page.directAnswer,
        ...page.sections.flatMap((section) => [
          ...section.paragraphs,
          ...(section.bullets ?? []),
          ...(section.table?.rows.flat() ?? []),
        ]),
        ...page.faqs.flatMap((faq) => [faq.question, faq.answer]),
      ].join(' ');

      if (trustRoutes.has(page.route)) {
        expect(wordCount(prose), page.route).toBeGreaterThanOrEqual(120);
      } else {
        expect(page.sections.length, page.route).toBeGreaterThanOrEqual(6);
        expect(wordCount(prose), page.route).toBeGreaterThanOrEqual(350);
      }
    }
  });

  it('preserves the specified homepage hierarchy', () => {
    expect(homeSectionOrder).toEqual([
      'hero',
      'metrics',
      'start-here',
      'field-guide',
      'early-access-delta',
      'monsters-teaser',
      'maps-teaser',
      'crew-utility',
      'latest-updates',
      'common-problems',
      'faq',
      'disclaimer',
    ]);
  });
});
