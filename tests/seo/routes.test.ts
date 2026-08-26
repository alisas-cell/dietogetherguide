import { describe, expect, it } from 'vitest';

import { guidePages, requiredCoreRoutes } from '../../content';
import { publicRoutes } from '../../lib/seo/routes';

describe('public route and internal-link graph', () => {
  it('publishes 36 core routes plus all three accepted tools', () => {
    expect(publicRoutes).toHaveLength(39);
    expect(new Set(publicRoutes)).toEqual(
      new Set([...requiredCoreRoutes, '/tools/coop-troubleshooter', '/tools/monster-finder', '/tools/run-chapter-tracker']),
    );
    expect(publicRoutes).toContain('/tools/monster-finder');
    expect(publicRoutes).toContain('/tools/run-chapter-tracker');
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
