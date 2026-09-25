import { describe, expect, it } from 'vitest';

import { guidePages, requiredCoreRoutes } from '../../content';
import { primaryNavigation, utilityNavigation } from '../../components/layout/navigation';
import { publicRoutes } from '../../lib/seo/routes';

describe('public route and internal-link graph', () => {
  it('publishes the September guide registry plus five tools', () => {
    expect(publicRoutes).toHaveLength(88);
    expect(new Set(publicRoutes)).toEqual(
      new Set([...requiredCoreRoutes, '/tools/coop-troubleshooter', '/tools/monster-finder', '/tools/run-chapter-tracker','/tools/progression-tracker','/tools/quota-planner']),
    );
    expect(publicRoutes).toContain('/tools/monster-finder');
    expect(publicRoutes).toContain('/tools/run-chapter-tracker');
    expect(publicRoutes).not.toContain('/tools/loot-planner');
  });

  it('has no broken related-guide targets or orphan core routes', () => {
    const linked = new Set<string>(['/',...primaryNavigation.map(l=>l.href),...utilityNavigation.map(l=>l.href)]);
    for (const page of guidePages) {
      for (const item of [...page.related,...page.sections.flatMap(s=>s.links??[])].filter(l=>l.href.startsWith('/'))) {
        expect(publicRoutes, `${page.route} -> ${item.href}`).toContain(item.href);
        linked.add(item.href);
      }
    }

    for (const route of requiredCoreRoutes) {
      expect(linked.has(route) || route === '/contact' || route === '/terms').toBe(
        true,
      );
    }
  });

  it('keeps public prose free of placeholders and competitor references', () => {
    const prose = JSON.stringify(guidePages);
    expect(prose).not.toMatch(/lorem|todo|tbd|placeholder|coming soon/i);
    expect(prose).not.toMatch(
      /miniwars\.art|gamblewithyourfriends\.net|vvultimatum\.net|farevergame\.wiki/i,
    );
  });
});
