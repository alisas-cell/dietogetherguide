import { describe, expect, it } from 'vitest';

import { guidePageByRoute, guidePages, requiredCoreRoutes } from '../../content';
import { publicRoutes } from '../../lib/seo/routes';

const newRoutes = [
  '/solo-guide',
  '/golden-weapons',
  '/monsters/ear',
  '/monsters/anchorer',
  '/monsters/siren',
  '/monsters/mimic',
  '/coop/no-game-found',
  '/maps/ship',
  '/maps/castle',
  '/monkey-cart',
  '/performance',
  '/revive-guide',
  '/tools',
  '/tools/monster-finder',
  '/tools/run-chapter-tracker',
] as const;

const dedicatedToolRoutes = new Set([
  '/tools/monster-finder',
  '/tools/run-chapter-tracker',
]);

describe('SEO MAX expansion route contract', () => {
  it('publishes exactly the 15 approved new routes without alternate slugs', () => {
    expect(publicRoutes).toHaveLength(39);
    for (const route of newRoutes) expect(publicRoutes).toContain(route);
    expect(new Set(publicRoutes).size).toBe(39);
    expect(publicRoutes).not.toContain('/gold-weapons');
    expect(publicRoutes).not.toContain('/monster-finder');
    expect(requiredCoreRoutes).toHaveLength(36);
    expect(guidePages).toHaveLength(35);
  });

  it('gives every new article a substantive sourced answer and link graph', () => {
    for (const route of newRoutes.filter((item) => !dedicatedToolRoutes.has(item))) {
      const page = guidePageByRoute.get(route);
      expect(page, route).toBeDefined();
      expect(page?.directAnswer.join(' ').length, route).toBeGreaterThan(140);
      expect(page?.sections.length, route).toBeGreaterThanOrEqual(6);
      expect(page?.related.length, route).toBeGreaterThanOrEqual(3);
      expect(page?.sourceIds.length, route).toBeGreaterThanOrEqual(1);
      expect(page?.heroImage?.src, route).toMatch(/^\/images\//);
    }
  });

  it('uses unique searchable metadata and H1s for all new pages', () => {
    const pages = newRoutes
      .filter((route) => !dedicatedToolRoutes.has(route))
      .map((route) => guidePageByRoute.get(route));
    expect(new Set(pages.map((page) => page?.title)).size).toBe(13);
    expect(new Set(pages.map((page) => page?.h1)).size).toBe(13);
    expect(new Set(pages.map((page) => page?.description)).size).toBe(13);
  });
});
