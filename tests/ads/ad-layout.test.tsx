import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import Home from '../../app/page';
import CoopTroubleshooterPage from '../../app/tools/coop-troubleshooter/page';
import { GuidePage } from '../../components/article/GuidePage';
import { getRouteMonetization } from '../../components/ads/ad-config';
import { guidePageByRoute, guidePages } from '../../content';

function placementsIn(html: string): string[] {
  return [...html.matchAll(/data-ad-placement="([^"]+)"/g)].map((match) => match[1]!);
}

function expectInOrder(html: string, markers: string[]) {
  let cursor = -1;
  for (const marker of markers) {
    const next = html.indexOf(marker, cursor + 1);
    expect(next, `Expected ${marker} after ${markers[Math.max(0, markers.indexOf(marker) - 1)]}`).toBeGreaterThan(cursor);
    cursor = next;
  }
}

describe('max-harvest editorial placement tree', () => {
  it('puts the earliest Home Banner after Quick Facts and separates every later unit with content', () => {
    const html = renderToStaticMarkup(<Home />);

    expectInOrder(html, [
      'id="metrics"',
      'data-ad-placement="early_responsive"',
      'id="current-patch"',
      'data-ad-placement="native_primary"',
      'id="field-guide"',
      'data-ad-placement="smartlink_primary"',
      'id="progression"',
      'data-ad-placement="rectangle_300"',
      'id="monsters-teaser"',
      'data-ad-placement="horizontal_468"',
    ]);
    expect(placementsIn(html)).toEqual(getRouteMonetization('/')?.placements);
  });

  it('puts guide early inventory immediately after Evidence and spaces inline inventory by sections', () => {
    const page = guidePageByRoute.get('/beginner-guide');
    expect(page).toBeDefined();
    const html = renderToStaticMarkup(<GuidePage page={page!} />);

    expectInOrder(html, [
      'evidence-banner',
      'data-ad-placement="early_responsive"',
      `id="${page!.sections[0]!.id}"`,
      'data-ad-placement="native_primary"',
      `id="${page!.sections[1]!.id}"`,
      'data-ad-placement="smartlink_primary"',
      `id="${page!.sections[2]!.id}"`,
      'data-ad-placement="rectangle_300"',
      `id="${page!.sections[3]!.id}"`,
      'data-ad-placement="horizontal_468"',
    ]);
    expect(html).toContain('class="article-toc"');
    expect(html).toContain('data-ad-placement="sidebar_160x600"');
    expect(html).toContain('data-ad-placement="sidebar_160x300"');
    expectInOrder(html, [
      'data-ad-placement="sidebar_160x600"',
      'class="article-toc"',
      'data-ad-placement="sidebar_160x300"',
    ]);
  });

  it('renders exactly the registered placement set on every static guide route', () => {
    for (const page of guidePages) {
      const actual = placementsIn(renderToStaticMarkup(<GuidePage page={page} />));
      const expected = getRouteMonetization(page.route)?.placements ?? [];

      expect(new Set(actual), page.route).toEqual(new Set(expected));
      expect(actual.length, page.route).toBe(expected.length);
    }
  });

  it('keeps Privacy and Terms completely free of placement shells', () => {
    for (const route of ['/privacy', '/terms']) {
      const page = guidePageByRoute.get(route);
      expect(page).toBeDefined();
      expect(placementsIn(renderToStaticMarkup(<GuidePage page={page!} />))).toEqual([]);
    }
  });

  it('separates all Tool placements with useful tool or editorial content', () => {
    const html = renderToStaticMarkup(<CoopTroubleshooterPage />);

    expectInOrder(html, [
      'evidence-banner',
      'data-ad-placement="early_responsive"',
      'class="tool-shell"',
      'data-ad-placement="native_primary"',
      'class="tool-explainer"',
      'data-ad-placement="rectangle_300"',
      'Current evidence boundary',
      'data-ad-placement="smartlink_primary"',
      'source-list',
      'data-ad-placement="horizontal_468"',
    ]);
    expect(placementsIn(html)).toEqual(
      getRouteMonetization('/tools/coop-troubleshooter')?.placements,
    );
  });
});
