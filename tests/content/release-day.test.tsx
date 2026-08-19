import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import Home from '../../app/page';
import { GuidePage } from '../../components/article/GuidePage';
import { guidePageByRoute } from '../../content';

const currentStateRoutes = [
  '/release-date',
  '/early-access',
  '/roadmap',
  '/gameplay',
  '/beginner-guide',
  '/monsters',
  '/maps',
  '/loot-and-extraction',
  '/items-and-weapons',
  '/rum-buffs-and-perks',
  '/coop',
  '/coop/quick-join',
  '/save-and-reconnect',
  '/troubleshooting',
  '/system-requirements',
  '/updates',
  '/faq',
] as const;

const staleAvailability =
  /STEAM NOT UNLOCKED|not yet available|not unlocked|planned to enter Early Access|before the store unlocks|opening build pending|live build pending/i;

describe('release-day public content', () => {
  it('renders the verified live state in the homepage first viewport', () => {
    const html = renderToStaticMarkup(<Home />);

    expect(html).toContain('EARLY ACCESS · LIVE');
    expect(html).toContain('Last Pirates: Die Together Guide');
    expect(html).toContain('Monsters. Maps. Loot. Get your crew home.');
    expect(html).toContain('<strong>LIVE</strong><span>Early Access</span>');
    expect(html).not.toMatch(staleAvailability);
  });

  it('keeps current-state route copy free of prerelease availability claims', () => {
    for (const route of currentStateRoutes) {
      const page = guidePageByRoute.get(route);
      expect(page, route).toBeDefined();
      expect(JSON.stringify(page), route).not.toMatch(staleAvailability);
    }
  });

  it('renders route and source freshness from the shared registries', () => {
    const monstersPage = guidePageByRoute.get('/monsters');
    expect(monstersPage).toBeDefined();

    const html = renderToStaticMarkup(<GuidePage page={monstersPage!} />);
    expect(html).toContain('Last checked Aug 19, 2026');
    expect(html).toContain('Steam · checked Aug 19, 2026');
  });
});
