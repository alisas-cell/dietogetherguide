import { describe, expect, it } from 'vitest';

import { guidePages, requiredCoreRoutes } from '../../content';
import { publicRoutes } from '../../lib/seo/routes';

describe('public route and internal-link graph', () => {
  it('publishes 23 core routes plus the accepted co-op tool', () => {
    expect(publicRoutes).toHaveLength(24);
    expect(new Set(publicRoutes)).toEqual(
      new Set([...requiredCoreRoutes, '/tools/coop-troubleshooter']),
    );
    expect(publicRoutes).not.toContain('/tools/monster-finder');
    expect(publicRoutes).not.toContain('/tools/loot-planner');
  });

  it('has no broken related-guide targets or orphan core routes', () => {
    const linked = new Set<string>(['/']);
    for (const page of guidePages) {
      for (const item of page.related) {
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
