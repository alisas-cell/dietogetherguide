import { expect, test, type Page } from '@playwright/test';

import {
  ADSTERRA_CONFIG,
  getRouteMonetization,
  selectBannerUnit,
  type AdPlacement,
} from '../../components/ads/ad-config';

const canonicalOrigin = 'https://dietogetherguide.shop';
const localOrigin = 'http://127.0.0.1:3101';
const consentStorageKey = 'dietogetherguide:advertising-consent';
const grantedConsent = JSON.stringify({ policyVersion: 1, advertising: 'granted' });
const globalScriptUrls: string[] = [
  ADSTERRA_CONFIG.globals.popunder.scriptUrl,
  ADSTERRA_CONFIG.globals.socialBar.scriptUrl,
];
const bannerScriptUrls: string[] = Object.values(ADSTERRA_CONFIG.banners).map(
  (unit) => unit.scriptUrl,
);
const creativeScriptUrls: string[] = [
  ADSTERRA_CONFIG.native.scriptUrl,
  ...bannerScriptUrls,
];
const allProviderScriptUrls: string[] = [...globalScriptUrls, ...creativeScriptUrls];

test.beforeEach(async ({ page, request }) => {
  await page.route(`${canonicalOrigin}/**`, async (route) => {
    const canonicalURL = new URL(route.request().url());
    const response = await request.fetch(
      `${localOrigin}${canonicalURL.pathname}${canonicalURL.search}`,
      {
        data: route.request().postDataBuffer() ?? undefined,
        headers: route.request().headers(),
        method: route.request().method(),
      },
    );
    await route.fulfill({
      body: await response.body(),
      headers: response.headers(),
      status: response.status(),
    });
  });
});

test.afterEach(async ({ page }) => {
  await page.unrouteAll({ behavior: 'ignoreErrors' });
});

async function setRegion(page: Page, requiresConsent: boolean) {
  await page.route('**/api/privacy-region', (route) =>
    route.fulfill({
      body: JSON.stringify({ requiresConsent }),
      contentType: 'application/json',
    }),
  );
}

async function grantAdvertisingBeforeHydration(page: Page) {
  await page.addInitScript(
    ({ key, value }) => window.localStorage.setItem(key, value),
    { key: consentStorageKey, value: grantedConsent },
  );
}

async function mockProviderScripts(page: Page, requests: string[]) {
  page.on('request', (request) => {
    if (allProviderScriptUrls.includes(request.url())) requests.push(request.url());
  });

  for (const url of globalScriptUrls) {
    await page.route(url, (route) =>
      route.fulfill({ contentType: 'application/javascript', body: '' }),
    );
  }

  const creativeScript = `(() => {
    const script = document.currentScript;
    const target = script?.previousElementSibling ?? script?.parentElement;
    const creative = document.createElement('a');
    creative.href = '#sponsored-creative';
    creative.textContent = 'Sponsored creative';
    target?.append(creative);
  })();`;
  for (const url of creativeScriptUrls) {
    await page.route(url, (route) =>
      route.fulfill({ contentType: 'application/javascript', body: creativeScript }),
    );
  }
}

function count(requests: string[], url: string) {
  return requests.filter((requestUrl) => requestUrl === url).length;
}

function expectedScriptUrls(pathname: string, viewportWidth: number): string[] {
  const plan = getRouteMonetization(pathname);
  if (!plan?.eligible) return [];

  const placementScripts = plan.placements.flatMap((placement) => {
    if (placement === 'native_primary') return [ADSTERRA_CONFIG.native.scriptUrl];
    if (placement === 'smartlink_primary') return [];
    const unit = selectBannerUnit(placement, viewportWidth);
    return unit ? [unit.scriptUrl] : [];
  });
  return [...globalScriptUrls, ...placementScripts];
}

function physicallySupportedPlacements(
  pathname: string,
  viewportWidth: number,
): AdPlacement[] {
  const plan = getRouteMonetization(pathname);
  return (
    plan?.placements.filter(
      (placement) =>
        placement === 'native_primary' ||
        placement === 'smartlink_primary' ||
        Boolean(selectBannerUnit(placement, viewportWidth)),
    ) ?? []
  );
}

test('restricted visitor makes zero provider requests before a choice and after rejection', async ({
  page,
}) => {
  const requests: string[] = [];
  await setRegion(page, true);
  await mockProviderScripts(page, requests);

  await page.goto('/gameplay');
  const panel = page.getByRole('region', { name: 'Your advertising choices' });
  await expect(panel).toBeVisible();
  await page.waitForTimeout(250);
  expect(requests).toEqual([]);
  await expect(
    page.locator('[data-ad-state="loading"], [data-ad-state="ready"]'),
  ).toHaveCount(0);

  await panel.getByRole('button', { name: 'Reject non-essential' }).click();
  await expect(panel).toBeHidden();
  await page.reload();
  await expect(panel).toBeHidden();
  await page.waitForTimeout(250);
  expect(requests).toEqual([]);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1,
    ),
  ).toBe(true);
});

test('acceptance loads every supported unit exactly once and no unsupported breakpoint unit', async ({
  page,
}, testInfo) => {
  const requests: string[] = [];
  const width = testInfo.project.use.viewport?.width ?? 0;
  await setRegion(page, true);
  await mockProviderScripts(page, requests);

  await page.goto('/gameplay');
  await page.getByRole('button', { name: 'Accept advertising' }).click();

  const expected = expectedScriptUrls('/gameplay', width);
  await expect.poll(() => requests.length).toBe(expected.length);
  for (const url of allProviderScriptUrls) {
    expect(count(requests, url), url).toBe(expected.includes(url) ? 1 : 0);
  }

  const supported = physicallySupportedPlacements('/gameplay', width);
  await expect(page.locator('[data-ad-state="ready"]')).toHaveCount(supported.length);
  await expect(page.locator('[data-ad-state="excluded"]')).toHaveCount(
    (getRouteMonetization('/gameplay')?.placements.length ?? 0) - supported.length,
  );
  await expect(page.locator('[data-ad-placement="early_responsive"]')).toHaveAttribute(
    'data-ad-width',
    width >= ADSTERRA_CONFIG.breakpoints.responsiveDesktop ? '728' : '320',
  );

  const firstPassRequests = [...requests];
  await page.setViewportSize(
    width >= ADSTERRA_CONFIG.breakpoints.responsiveDesktop
      ? { width: 390, height: 844 }
      : { width: 1440, height: 900 },
  );
  await page.waitForTimeout(250);
  expect(requests).toEqual(firstPassRequests);
});

test('debug mode exposes the resolved tree while making zero provider requests and no live Smartlink', async ({
  page,
}, testInfo) => {
  const requests: string[] = [];
  const width = testInfo.project.use.viewport?.width ?? 0;
  await setRegion(page, false);
  await grantAdvertisingBeforeHydration(page);
  await mockProviderScripts(page, requests);

  await page.goto('/gameplay?ad_debug=1');
  await expect(page.locator('[data-ad-debug-panel]')).toContainText('NETWORK OFF');
  await expect(page.locator('[data-ad-debug-panel]')).toContainText('medium-guide');
  await expect(page.locator('[data-ad-state="debug"]')).toHaveCount(
    physicallySupportedPlacements('/gameplay', width).length,
  );
  await expect(page.locator('[data-ad-placement="smartlink_primary"] a')).toHaveCount(0);
  await page.waitForTimeout(250);
  expect(requests).toEqual([]);
});

test('automatic eligible loading keeps exact creative dimensions, earliest-safe order, and low CLS', async ({
  page,
}, testInfo) => {
  const requests: string[] = [];
  const runtimeErrors: string[] = [];
  const width = testInfo.project.use.viewport?.width ?? 0;
  await page.addInitScript(() => {
    (window as Window & { __adCls?: number }).__adCls = 0;
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const shift = entry as PerformanceEntry & {
          hadRecentInput: boolean;
          value: number;
        };
        if (!shift.hadRecentInput) {
          (window as Window & { __adCls?: number }).__adCls =
            ((window as Window & { __adCls?: number }).__adCls ?? 0) + shift.value;
        }
      }
    }).observe({ type: 'layout-shift', buffered: true });
  });
  page.on('console', (message) => {
    if (message.type() === 'error') runtimeErrors.push(message.text());
  });
  page.on('pageerror', (error) => runtimeErrors.push(error.message));
  await setRegion(page, false);
  await mockProviderScripts(page, requests);

  await page.goto('/gameplay');
  await expect(page.locator('[data-ad-state="ready"]')).toHaveCount(
    physicallySupportedPlacements('/gameplay', width).length,
  );

  const geometry = await page.evaluate(() => {
    const rect = (selector: string) => {
      const box = document.querySelector<HTMLElement>(selector)?.getBoundingClientRect();
      return box && (box.width > 0 || box.height > 0)
        ? {
            bottom: Math.round(box.bottom),
            height: Math.round(box.height),
            top: Math.round(box.top),
            width: Math.round(box.width),
          }
        : null;
    };
    return {
      cls: (window as Window & { __adCls?: number }).__adCls ?? 0,
      directAnswer: rect('.article-direct-answer'),
      early: rect('[data-ad-placement="early_responsive"] .ad-banner-creative'),
      evidence: rect('.evidence-banner'),
      firstSection: rect('.article-body > section'),
      horizontal: rect('[data-ad-placement="horizontal_468"] .ad-banner-creative'),
      rectangle: rect('[data-ad-placement="rectangle_300"] .ad-banner-creative'),
      sidebarLong: rect('[data-ad-placement="sidebar_160x600"] .ad-banner-creative'),
    };
  });

  expect(geometry.early).toMatchObject(
    width >= ADSTERRA_CONFIG.breakpoints.responsiveDesktop
      ? { height: 90, width: 728 }
      : { height: 50, width: 320 },
  );
  expect(geometry.rectangle).toMatchObject({ height: 250, width: 300 });
  if (width >= ADSTERRA_CONFIG.breakpoints.wideTablet) {
    expect(geometry.horizontal).toMatchObject({ height: 60, width: 468 });
  } else {
    expect(geometry.horizontal).toBeNull();
  }
  if (width >= ADSTERRA_CONFIG.breakpoints.desktopSidebar) {
    expect(geometry.sidebarLong).toMatchObject({ height: 600, width: 160 });
  } else {
    expect(geometry.sidebarLong).toBeNull();
  }
  expect(geometry.early?.top ?? -1).toBeGreaterThanOrEqual(
    geometry.evidence?.bottom ?? Infinity,
  );
  expect(geometry.early?.top ?? Infinity).toBeLessThan(
    geometry.firstSection?.top ?? -1,
  );
  expect(geometry.evidence?.top ?? -1).toBeGreaterThanOrEqual(
    geometry.directAnswer?.bottom ?? Infinity,
  );
  expect(geometry.cls).toBeLessThanOrEqual(0.1);
  expect(runtimeErrors).toEqual([]);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1,
    ),
  ).toBe(true);
  await page.screenshot({
    fullPage: false,
    path: testInfo.outputPath(`ad-first-scroll-${testInfo.project.name}.png`),
  });
  if (width >= ADSTERRA_CONFIG.breakpoints.desktopSidebar) {
    await page.locator('.article-layout').evaluate((layout) => {
      document.documentElement.style.scrollBehavior = 'auto';
      window.scrollTo({
        top: layout.getBoundingClientRect().top + window.scrollY - 120,
      });
    });
    await page.waitForTimeout(100);
    await page.screenshot({
      fullPage: false,
      path: testInfo.outputPath(`ad-sidebar-${testInfo.project.name}.png`),
    });
  }
});

test('direct Privacy and Terms views have zero shells, zero globals, and zero provider requests', async ({
  page,
}) => {
  const requests: string[] = [];
  await setRegion(page, false);
  await grantAdvertisingBeforeHydration(page);
  await mockProviderScripts(page, requests);

  for (const route of ['/privacy', '/terms']) {
    await page.goto(`${route}?ad_debug=1`);
    await expect(page.locator('[data-ad-placement]')).toHaveCount(0);
    await expect(page.locator('script[data-adsterra-global]')).toHaveCount(0);
    await expect(page.locator('[data-ad-debug-panel]')).toContainText('excluded');
  }
  expect(requests).toEqual([]);
});

test('Smartlink stays disclosed and inactive until eligible, then requests only on click', async ({
  context,
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'canonical-1440x900');
  const requests: string[] = [];
  const smartlinkRequests: string[] = [];
  await setRegion(page, true);
  await mockProviderScripts(page, requests);
  await context.route(ADSTERRA_CONFIG.smartlink.url, (route) => {
    smartlinkRequests.push(route.request().url());
    return route.fulfill({ contentType: 'text/html', body: '<title>Sponsored</title>' });
  });

  await page.goto('/gameplay');
  const slot = page.locator('[data-ad-placement="smartlink_primary"]');
  await expect(slot).toContainText(ADSTERRA_CONFIG.smartlink.label);
  await expect(slot.locator('a')).toHaveCount(0);
  expect(smartlinkRequests).toEqual([]);

  await page.getByRole('button', { name: 'Accept advertising' }).click();
  const link = slot.locator('a');
  await expect(link).toHaveAttribute('href', ADSTERRA_CONFIG.smartlink.url);
  await expect(link).toHaveAttribute('rel', /nofollow.*sponsored/);
  const popupPromise = context.waitForEvent('page');
  await link.click();
  const popup = await popupPromise;
  await popup.waitForLoadState('domcontentloaded');
  expect(smartlinkRequests).toEqual([ADSTERRA_CONFIG.smartlink.url]);
  await popup.close();
});

test('SPA navigation preserves global singletons and leaves one active copy of each route unit', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'canonical-1440x900');
  const requests: string[] = [];
  await setRegion(page, false);
  await grantAdvertisingBeforeHydration(page);
  await mockProviderScripts(page, requests);

  await page.goto('/gameplay');
  await expect.poll(() => count(requests, ADSTERRA_CONFIG.native.scriptUrl)).toBe(1);
  await page.locator('.desktop-nav a[href="/monsters"]').click();
  await expect(page).toHaveURL('/monsters');
  await expect.poll(() => count(requests, ADSTERRA_CONFIG.native.scriptUrl)).toBe(2);

  for (const url of globalScriptUrls) expect(count(requests, url), url).toBe(1);
  await expect(page.locator('script[data-adsterra-global="popunder"]')).toHaveCount(1);
  await expect(page.locator('script[data-adsterra-global="social_bar"]')).toHaveCount(1);
  await expect(page.locator(`#${ADSTERRA_CONFIG.native.containerId}`)).toHaveCount(1);
  const activeUnitKeys = await page
    .locator('script[data-adsterra-unit]')
    .evaluateAll((scripts) => scripts.map((script) => script.getAttribute('data-adsterra-unit')));
  expect(new Set(activeUnitKeys).size).toBe(activeUnitKeys.length);
});

test('provider errors collapse physical units without console, hydration, or tool failures', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'canonical-1440x900');
  const runtimeErrors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') runtimeErrors.push(message.text());
  });
  page.on('pageerror', (error) => runtimeErrors.push(error.message));
  await setRegion(page, false);
  await grantAdvertisingBeforeHydration(page);
  for (const url of globalScriptUrls) {
    await page.route(url, (route) =>
      route.fulfill({ contentType: 'application/javascript', body: '' }),
    );
  }
  for (const url of creativeScriptUrls) {
    await page.route(url, (route) =>
      route.fulfill({
        contentType: 'application/javascript',
        body: "document.currentScript?.dispatchEvent(new Event('error'));",
      }),
    );
  }

  await page.goto('/tools/coop-troubleshooter');
  await expect(page.locator('[data-ad-state="failed"]')).toHaveCount(4);
  await expect(page.locator('[data-ad-state="failed"]').first()).toBeHidden();
  await page.selectOption('#problem', 'reconnect-fails');
  await page.getByLabel('Host').check();
  await page.getByRole('button', { name: 'Build my safe checklist' }).click();
  await expect(page.locator('#tool-result')).toContainText('Reconnect failure checklist');
  expect(runtimeErrors).toEqual([]);
});

test('no-fill uses the 10 second bridge timeout and then collapses all empty physical units', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'canonical-1440x900');
  await setRegion(page, false);
  await grantAdvertisingBeforeHydration(page);
  for (const url of allProviderScriptUrls) {
    await page.route(url, (route) =>
      route.fulfill({ contentType: 'application/javascript', body: '' }),
    );
  }

  await page.goto('/gameplay');
  const startedAt = Date.now();
  await expect(page.locator('[data-ad-state="loading"]')).toHaveCount(5);
  await expect(page.locator('[data-ad-state="failed"]')).toHaveCount(5, {
    timeout: 12_500,
  });
  expect(Date.now() - startedAt).toBeGreaterThanOrEqual(9_500);
});

test('revoke reloads fail-closed and a later re-grant initializes one fresh route bridge', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'canonical-1440x900');
  const requests: string[] = [];
  await setRegion(page, true);
  await mockProviderScripts(page, requests);
  await page.goto('/gameplay');
  await page.getByRole('button', { name: 'Accept advertising' }).click();
  await expect.poll(() => count(requests, ADSTERRA_CONFIG.native.scriptUrl)).toBe(1);

  await page.getByRole('button', { name: 'Privacy Choices' }).click();
  await Promise.all([
    page.waitForNavigation(),
    page.getByRole('button', { name: 'Reject non-essential' }).click(),
  ]);
  const firstPassRequestCount = requests.length;
  await page.waitForTimeout(250);
  expect(requests).toHaveLength(firstPassRequestCount);

  await page.getByRole('button', { name: 'Privacy Choices' }).click();
  await page.getByRole('button', { name: 'Accept advertising' }).click();
  await expect.poll(() => count(requests, ADSTERRA_CONFIG.native.scriptUrl)).toBe(2);
});

test('home, article, and tool remain usable and overflow-free with advertising rejected', async ({
  page,
}, testInfo) => {
  test.skip(!['canonical-390x844', 'canonical-1440x900'].includes(testInfo.project.name));
  const requests: string[] = [];
  await setRegion(page, true);
  await mockProviderScripts(page, requests);

  for (const route of ['/', '/maps', '/tools/coop-troubleshooter']) {
    await page.goto(route);
    const panel = page.getByRole('region', { name: 'Your advertising choices' });
    if (await panel.isVisible()) {
      await panel.getByRole('button', { name: 'Reject non-essential' }).click();
    }
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1,
      ),
      `${testInfo.project.name} ${route}`,
    ).toBe(true);
  }
  expect(requests).toEqual([]);
});
