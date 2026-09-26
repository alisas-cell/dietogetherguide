import { describe, expect, it } from 'vitest';
import { guidePages, guidePageByRoute } from '../../content';
import { publicRoutes } from '../../lib/seo/routes';
import { searchEntries } from '../../lib/search';
import { sourceReview } from '../../data/current';
import { patches } from '../../data/patches';
import { getRouteMonetization } from '../../components/ads/ad-config';
import { readFileSync } from 'node:fs';

const batchRoutes = [
  '/updates/september-25-mimic-coop-sync',
  '/updates/sep-01-cleaner-carrying-fresh-loot',
  '/updates/aug-28-healing-fish-fixes',
  '/updates/changes/slot-machine-dice-refund',
  '/items/cauldron',
  '/guides/returning-player-guide',
  '/platform/language-support',
];
describe('qualified first batch release', () => {
  it('qualifies chapter mappings in the homepage and existing notebook tools', () => {
    for (const file of ['app/page.tsx', 'components/tools/PlanningPage.tsx', 'components/tools/PlanningTools.tsx', 'app/tools/run-chapter-tracker/page.tsx']) {
      expect(readFileSync(file, 'utf8'), file).toContain('chapterWordingCaution');
    }
    const chapter = guidePageByRoute.get('/guides/level-order')!;
    expect(JSON.stringify(chapter)).not.toContain('Opening chapters contain one level; later ones contain two.');
  });
  it('publishes seven real discoverable pages with existing ad inventory', () => {
    expect(publicRoutes).toHaveLength(95);
    for (const route of batchRoutes) {
      const page = guidePageByRoute.get(route);
      expect(page, route).toBeDefined();
      expect(page!.directAnswer.join(' ').trim().length).toBeGreaterThan(40);
      expect(page!.sections.some((section) => section.table || section.bullets?.length)).toBe(true);
      expect(page!.related.length).toBeGreaterThanOrEqual(3);
      expect(searchEntries.some((entry) => entry.href === route)).toBe(true);
      expect(getRouteMonetization(route)?.placements).toContain('native_primary');
      expect(getRouteMonetization(route)?.placements).toContain('early_responsive');
      expect(guidePages.some((owner) => owner.route !== route && [
        ...owner.related.map((link) => link.href),
        ...owner.sections.flatMap((section) => section.links?.map((link) => link.href) ?? []),
      ].includes(route)), route + ' inbound editorial link').toBe(true);
    }
  });
  it('represents the newest verified patch without erasing historical dates', () => {
    expect(sourceReview.latestGameplayPatch).toBe('2026-09-25');
    expect(patches.some((patch) => patch.date === '2026-09-25')).toBe(true);
    expect(guidePageByRoute.get('/updates/sep-01-cleaner-carrying-fresh-loot')?.evidenceScope).toBe('historical');
    expect(guidePageByRoute.get('/privacy')?.lastModified).toBe('2026-09-25');
  });
  it('exposes the new solo exception and unresolved chapter wording to quota readers', () => {
    for (const route of ['/quota', '/guides/quota', '/chapters', '/levels']) {
      const page = guidePageByRoute.get(route)!;
      expect(JSON.stringify(page), route).toMatch(/September 25/);
      expect(JSON.stringify(page), route).toMatch(/Chapter 1/);
    }
  });
});
