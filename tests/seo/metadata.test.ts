import { describe, expect, it } from 'vitest';

import { guidePages } from '../../content';
import { buildGuideMetadata } from '../../lib/seo/metadata';
import { buildGuideSchemas } from '../../lib/seo/schema';

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
});
