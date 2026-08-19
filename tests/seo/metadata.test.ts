import { describe, expect, it } from 'vitest';

import { guidePages } from '../../content';
import { buildGuideMetadata } from '../../lib/seo/metadata';
import { buildGuideSchemas } from '../../lib/seo/schema';
import sitemap from '../../app/sitemap';

describe('guide SEO builders', () => {
  it('uses the exact page title and canonical apex route', () => {
    for (const page of guidePages) {
      const metadata = buildGuideMetadata(page);

      expect(metadata.title).toEqual({ absolute: page.title });
      expect(metadata.description).toBe(page.description);
      expect(metadata.alternates?.canonical).toBe(
        `https://dietogetherguide.shop${page.route}`,
      );
      expect(metadata.openGraph?.url).toBe(
        `https://dietogetherguide.shop${page.route}`,
      );
    }
  });

  it('builds visible-content-matched WebPage, breadcrumb, and FAQ schemas', () => {
    for (const page of guidePages) {
      const schemas = buildGuideSchemas(page);
      expect(schemas.map((schema) => schema['@type'])).toContain('WebPage');
      expect(schemas.map((schema) => schema['@type'])).toContain(
        'BreadcrumbList',
      );

      const faqSchema = schemas.find((schema) => schema['@type'] === 'FAQPage');
      if (page.faqs.length > 0) {
        expect(faqSchema?.mainEntity).toHaveLength(page.faqs.length);
      } else {
        expect(faqSchema).toBeUndefined();
      }
    }
  });

  it('locks representative title, H1, canonical, and sitemap identities', () => {
    const identities = new Map(
      guidePages.map((page) => [page.route, { title: page.title, h1: page.h1 }]),
    );

    expect(identities.get('/release-date')).toEqual({
      title: 'Last Pirates: Die Together Release Date & Early Access Time',
      h1: 'Last Pirates: Die Together Release Date',
    });
    expect(identities.get('/privacy')).toEqual({
      title: 'Privacy Policy — Die Together Guide',
      h1: 'Privacy Policy',
    });
    expect(sitemap()).toHaveLength(24);
    expect(sitemap().map((entry) => entry.url)).toEqual(
      expect.arrayContaining([
        'https://dietogetherguide.shop',
        'https://dietogetherguide.shop/privacy',
        'https://dietogetherguide.shop/tools/coop-troubleshooter',
      ]),
    );
  });

  it('publishes truthful route-level last-modified dates', () => {
    const entries = new Map(
      sitemap().map((entry) => [
        new URL(entry.url).pathname,
        entry.lastModified instanceof Date
          ? entry.lastModified.toISOString()
          : entry.lastModified,
      ]),
    );

    expect(entries.get('/')).toBe('2026-08-19T00:00:00.000Z');
    expect(entries.get('/release-date')).toBe('2026-08-19T00:00:00.000Z');
    expect(entries.get('/troubleshooting')).toBe('2026-08-19T00:00:00.000Z');
    expect(entries.get('/tools/coop-troubleshooter')).toBe(
      '2026-08-19T00:00:00.000Z',
    );
    expect(entries.get('/privacy')).toBe('2026-08-18T00:00:00.000Z');
    expect(entries.get('/terms')).toBe('2026-08-17T00:00:00.000Z');
  });
});
