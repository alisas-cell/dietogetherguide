import { expect, test } from './qa-fixture';

import { ADSTERRA_CONFIG } from '../../components/ads/ad-config';
import { publicRoutes } from '../../lib/seo/routes';

const nativePlacementId = ADSTERRA_CONFIG.native.containerId.replace('container-', '');
const excludedRoute = '/not-a-real-chart';

test('every registered route has exactly two QA ad opportunities at the intended breakpoint', async ({
  baseURL,
  page,
}, testInfo) => {
  test.skip(
    !['desktop-1440x900', 'mobile-390x844'].includes(testInfo.project.name),
  );

  const desktop = testInfo.project.name === 'desktop-1440x900';
  const expectedUnit = desktop
    ? ADSTERRA_CONFIG.responsive.desktop
    : ADSTERRA_CONFIG.responsive.mobile;
  const oppositeUnit = desktop
    ? ADSTERRA_CONFIG.responsive.mobile
    : ADSTERRA_CONFIG.responsive.desktop;
  if (!baseURL) throw new Error('The route audit requires a first-party baseURL.');
  const firstPartyOrigin = new URL(baseURL).origin;
  const thirdPartyRequests: string[] = [];
  const results: Array<Record<string, string | number | boolean>> = [];

  page.on('request', (request) => {
    const url = new URL(request.url());
    if (['http:', 'https:'].includes(url.protocol) && url.origin !== firstPartyOrigin) {
      thirdPartyRequests.push(request.url());
    }
  });

  for (const route of publicRoutes) {
    const response = await page.goto(route, { waitUntil: 'domcontentloaded' });
    expect(response?.status(), route).toBe(200);

    const allPlacements = page.locator('[data-ad-placement]');
    const native = page.locator(
      '[data-ad-placement="article_mid"][data-ad-mode="qa"]',
    );
    const banner = page.locator(
      '[data-ad-placement="responsive_banner"][data-ad-mode="qa"]',
    );

    await expect(allPlacements, `${route} all placements`).toHaveCount(2);
    await expect(native, `${route} Native`).toHaveCount(1);
    await expect(banner, `${route} responsive banner`).toHaveCount(1);
    await expect(native).toHaveAttribute('data-ad-placement-id', nativePlacementId);
    await expect(native).toHaveAttribute('data-ad-state', 'qa');
    await expect(banner).toHaveAttribute('data-ad-placement-id', expectedUnit.key);
    await expect(banner).toHaveAttribute(
      'data-responsive-variant',
      desktop ? 'desktop' : 'mobile',
    );
    await expect(banner).toHaveAttribute('data-ad-width', String(expectedUnit.width));
    await expect(banner).toHaveAttribute('data-ad-height', String(expectedUnit.height));
    await expect(page.locator(`[data-ad-placement-id="${oppositeUnit.key}"]`)).toHaveCount(0);
    await expect(page.locator('script[src*="effectivecpmnetwork.com"]')).toHaveCount(0);
    await expect(page.locator('script[src*="highperformanceformat.com"]')).toHaveCount(0);

    const nativeBox = await native.locator('[data-ad-qa-placeholder]').boundingBox();
    const bannerBox = await banner.locator('[data-ad-qa-placeholder]').boundingBox();
    expect(nativeBox?.height ?? 0, `${route} Native height`).toBeGreaterThanOrEqual(180);
    expect(bannerBox?.width, `${route} banner width`).toBe(expectedUnit.width);
    expect(bannerBox?.height, `${route} banner height`).toBe(expectedUnit.height);

    results.push({
      route,
      eligible: true,
      native: 1,
      desktopBanner: desktop ? 1 : 0,
      mobileBanner: desktop ? 0 : 1,
      nativePlacementId,
      responsivePlacementId: expectedUnit.key,
      qaResult: 'PASS',
    });
  }

  const excludedResponse = await page.goto(excludedRoute, {
    waitUntil: 'domcontentloaded',
  });
  expect(excludedResponse?.status(), excludedRoute).toBe(404);
  await expect(page.locator('[data-ad-placement]'), `${excludedRoute} placements`).toHaveCount(0);
  expect(thirdPartyRequests).toEqual([]);

  results.push({
    route: `${excludedRoute} (representative unmatched/error route)`,
    eligible: false,
    native: 0,
    desktopBanner: 0,
    mobileBanner: 0,
    nativePlacementId: '',
    responsivePlacementId: '',
    qaResult: 'PASS',
  });

  await testInfo.attach(`route-placement-results-${testInfo.project.name}`, {
    body: JSON.stringify(results, null, 2),
    contentType: 'application/json',
  });
});
