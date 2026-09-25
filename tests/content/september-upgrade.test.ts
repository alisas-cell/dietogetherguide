import { describe, it, expect } from 'vitest';
import { guidePages } from '../../content';
import { publicRoutes } from '../../lib/seo/routes';
import { baselineRoutes } from '../../data/baseline-routes';
import { sourceById } from '../../data/sources';
import { auditFreshness } from '../../lib/freshness';
import { findMonsters } from '../../lib/tools/monster-finder';
import {
  calculateQuota,
  emptyProgression,
  parseProgression,
} from '../../lib/tools/planning';
import { achievements } from '../../data/achievements';
import { ROUTE_MONETIZATION } from '../../components/ads/ad-config';
describe('September upgrade gates', () => {
  it('preserves every production URL and unique current routes', () => {
    for (const route of baselineRoutes) expect(publicRoutes).toContain(route);
    expect(new Set(publicRoutes).size).toBe(publicRoutes.length);
    expect(publicRoutes.length).toBeGreaterThanOrEqual(80);
  });
  it('uses existing monetization plans on all routes', () => {
    for (const route of publicRoutes)
      expect(ROUTE_MONETIZATION).toHaveProperty(route);
  });
  it('has no broken editorial links or source IDs', () => {
    for (const page of guidePages) {
      for (const id of page.sourceIds)
        expect(sourceById.has(id), page.route + ':' + id).toBe(true);
      for (const href of [
        ...page.related.map((l) => l.href),
        ...page.sections.flatMap((s) => s.links?.map((l) => l.href) ?? []),
        ...page.breadcrumbs.flatMap((b) => (b.href ? [b.href] : [])),
      ].filter((h) => h.startsWith('/')))
        expect(publicRoutes, page.route + ':' + href).toContain(
          href.split('#')[0],
        );
    }
  });
  it('passes current review and detects future stale pages', () => {
    expect(
      auditFreshness(new Date('2026-09-25')).filter(
        (i) => i.severity === 'error',
      ),
    ).toEqual([]);
    expect(
      auditFreshness(new Date('2026-10-25')).some(
        (i) => i.code === 'stale-page',
      ),
    ).toBe(true);
  });
  it('does not conflate named and unnamed monsters', () => {
    expect(findMonsters(['hook']).map((m) => m.monster.id)).toEqual([
      'anchorer',
    ]);
    expect(findMonsters(['loot-hiding'])).toEqual([]);
    expect(findMonsters(['head-clamp']).map((m) => m.monster.id)).toEqual([
      'head-crab',
    ]);
    expect(
      findMonsters([], { location: 'ship' }).map((m) => m.monster.id),
    ).toEqual(['kraken']);
    expect(findMonsters([], { level: 2 })).toEqual([]);
  });
  it('calculates only supplied quota values', () => {
    expect(
      calculateQuota({
        quota: 100,
        secured: 30,
        carried: 20,
        estimated: 10,
        crew: 2,
      }),
    ).toEqual({
      securedGap: 70,
      afterCargo: 50,
      afterEstimate: 40,
      perCrew: 35,
    });
    expect(() =>
      calculateQuota({
        quota: Infinity,
        secured: 0,
        carried: 0,
        estimated: 0,
        crew: 1,
      }),
    ).toThrow();
  });
  it('validates progression imports without inventing achievements', () => {
    const ids = achievements.map((a) => a.id);
    expect(parseProgression(JSON.stringify(emptyProgression), ids)).toEqual(
      emptyProgression,
    );
    expect(() =>
      parseProgression(
        JSON.stringify({ ...emptyProgression, achievementIds: ['fake'] }),
        ids,
      ),
    ).toThrow();
    expect(() => parseProgression('null', ids)).toThrow();
  });
});
