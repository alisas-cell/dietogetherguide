import { expect, test } from '@playwright/test';

import {
  ADSTERRA_CONFIG,
  getRouteMonetization,
  selectBannerUnit,
} from '../../components/ads/ad-config';
import { publicRoutes } from '../../lib/seo/routes';

const providerScriptUrls: string[] = [
  ADSTERRA_CONFIG.globals.popunder.scriptUrl,
  ADSTERRA_CONFIG.globals.socialBar.scriptUrl,
  ADSTERRA_CONFIG.native.scriptUrl,
  ...Object.values(ADSTERRA_CONFIG.banners).map((unit) => unit.scriptUrl),
];
const adsterraHosts = [
  ...new Set([
    ...providerScriptUrls,
    ADSTERRA_CONFIG.smartlink.url,
  ].map((url) => new URL(url).hostname)),
];
const consentStorageKey = 'dietogetherguide:advertising-consent';
const grantedConsent = JSON.stringify({ policyVersion: 1, advertising: 'granted' });

async function grantAdvertisingBeforeHydration(page: import('@playwright/test').Page) {
  await page.addInitScript(
    ({ key, value }) => window.localStorage.setItem(key, value),
    { key: consentStorageKey, value: grantedConsent },
  );
}

test('home is coherent, noindex in development, and free of horizontal overflow', async ({
  page,
}, testInfo) => {
  const runtimeErrors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') runtimeErrors.push(message.text());
  });
  page.on('pageerror', (error) => runtimeErrors.push(error.message));

  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Last Pirates: Die Together Wiki — Maps, Monsters, Loot, Updates & Co-op Guides',
  );
  await expect(
    page
      .getByLabel('Current game status')
      .getByText('EARLY ACCESS · LIVE', { exact: true }),
  ).toBeVisible();
  await expect(
    page
      .getByLabel('Current game status')
      .getByText('Checked Sep 25', { exact: true }),
  ).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    'content',
    /noindex.*nofollow/i,
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://dietogetherguide.shop',
  );
  await expect(page.locator('.home-hero-visual img')).toHaveJSProperty('complete', true);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1,
    ),
  ).toBe(true);
  expect(runtimeErrors).toEqual([]);

  await page.screenshot({
    fullPage: true,
    path: testInfo.outputPath(`home-${testInfo.project.name}.png`),
  });
});

test('mobile menu opens, traps a usable close control, and closes with Escape', async ({
  page,
}, testInfo) => {
  test.skip(!testInfo.project.name.startsWith('mobile'));
  await page.goto('/');
  await page.getByRole('button', { name: /open navigation/i }).click();
  const dialog = page.getByRole('dialog', { name: /site navigation/i });
  const closeButton = page.getByRole('button', { name: /close navigation/i });
  await expect(dialog).toBeVisible();
  await expect(closeButton).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(dialog.getByRole('link').last()).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(closeButton).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
});

test('mobile menu restores focus to its trigger after closing', async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith('mobile'));
  await page.goto('/');

  const trigger = page.getByRole('button', { name: /open navigation/i });
  await trigger.click();
  await page.keyboard.press('Escape');

  await expect(trigger).toBeFocused();
});

test('mobile article tables scroll locally without widening the page', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile-390x844');
  await page.goto('/maps');

  const dimensions = await page.evaluate(() => {
    const tableShell = document.querySelector<HTMLElement>('.table-shell');

    return {
      pageClientWidth: document.documentElement.clientWidth,
      pageScrollWidth: document.documentElement.scrollWidth,
      shellClientWidth: tableShell?.clientWidth ?? 0,
      shellScrollWidth: tableShell?.scrollWidth ?? 0,
    };
  });

  expect(dimensions.pageScrollWidth).toBeLessThanOrEqual(dimensions.pageClientWidth + 1);
  expect(dimensions.shellScrollWidth).toBeGreaterThan(dimensions.shellClientWidth);
});

test('mobile troubleshooter core controls meet the preferred touch target height', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile-390x844');
  await page.goto('/tools/coop-troubleshooter');

  const heights = await page
    .locator('.choice-row label, .source-list summary')
    .evaluateAll((targets) =>
      targets.map((target) => Math.round(target.getBoundingClientRect().height)),
    );

  expect(heights.length).toBeGreaterThan(0);
  expect(heights.every((height) => height >= 44), heights.join(', ')).toBe(true);
});

test('co-op troubleshooter returns an ordered safe checklist', async ({ page }) => {
  await page.goto('/tools/coop-troubleshooter');
  await page.selectOption('#problem', 'reconnect-fails');
  await page.getByLabel('Host').check();
  await page.getByRole('button', { name: 'Build my safe checklist' }).click();

  const result = page.locator('#tool-result');
  await expect(result).toBeFocused();
  await expect(result.getByRole('heading', { level: 2 })).toHaveText(
    'Reconnect failure checklist',
  );
  await expect(result.locator('ol > li')).toHaveCount(4);
  await expect(result).not.toContainText(/random DLL|delete save|disable security/i);
});

test('all public routes render one H1 with no broken local images', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-1440x900');

  test.setTimeout(180_000);
  for (const route of publicRoutes) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    await expect(page.getByRole('heading', { level: 1 }), route).toHaveCount(1);
    for(const image of await page.locator('img').all()){
      await image.scrollIntoViewIfNeeded();
      await expect.poll(()=>image.evaluate(node=>(node as HTMLImageElement).complete&&(node as HTMLImageElement).naturalWidth>0),{message:route+' image should load'}).toBe(true);
    }
    const brokenImages = await page.locator('img').evaluateAll((images) =>
      images
        .map((image) => image as HTMLImageElement)
        .filter((image) => !image.complete || image.naturalWidth === 0)
        .map((image) => image.getAttribute('src')),
    );
    expect(brokenImages, route).toEqual([]);
  }
});

test('article metadata and JSON-LD match the visible release page', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-1440x900');
  await page.goto('/release-date');
  await expect(page).toHaveTitle(
    'Last Pirates: Die Together Release Date & Early Access Time | Die Together Wiki',
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://dietogetherguide.shop/release-date',
  );
  const schemaTypes = await page.locator('script[type="application/ld+json"]').evaluateAll(
    (scripts) => scripts.map((script) => JSON.parse(script.textContent ?? '{}')['@type']),
  );
  expect(schemaTypes).toEqual(
    expect.arrayContaining(['WebPage', 'BreadcrumbList', 'FAQPage']),
  );
});

test('unknown routes use the custom 404', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-1440x900');
  const response = await page.goto('/not-a-real-chart');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'This route is not in the field guide',
  );
});

test('every public route matches its registered placement tree while localhost requests no ads', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-1440x900');
  const providerRequests: string[] = [];
  page.on('request', (request) => {
    if (adsterraHosts.includes(new URL(request.url()).hostname)) {
      providerRequests.push(request.url());
    }
  });

  for (const route of publicRoutes) {
    await page.goto(route);
    const expectedPlacements = getRouteMonetization(route)?.placements ?? [];
    await expect(page.locator('[data-ad-placement]'), route).toHaveCount(
      expectedPlacements.length,
    );
    expect(
      await page.locator('[data-ad-placement]').evaluateAll((slots) =>
        slots.map((slot) => slot.getAttribute('data-ad-placement')),
      ),
      route,
    ).toEqual(expect.arrayContaining([...expectedPlacements]));
  }

  expect(providerRequests).toEqual([]);
});

test('Preview-safe host remains ad-free after acceptance and exposes persistent choices', async ({
  page,
}, testInfo) => {
  const providerRequests: string[] = [];
  page.on('request', (request) => {
    if (adsterraHosts.includes(new URL(request.url()).hostname)) {
      providerRequests.push(request.url());
    }
  });

  await page.goto('/');
  const panel = page.getByRole('region', { name: 'Your advertising choices' });
  await expect(panel).toBeVisible();
  await expect(panel.getByRole('button', { name: 'Reject non-essential' })).toBeVisible();
  const acceptButton = panel.getByRole('button', { name: 'Accept advertising' });
  await expect(acceptButton).toBeVisible();
  await acceptButton.focus();
  await expect(acceptButton).toBeFocused();
  expect(
    await acceptButton.evaluate((button) => getComputedStyle(button).outlineStyle),
  ).not.toBe('none');
  await page.screenshot({
    fullPage: false,
    path: testInfo.outputPath(`privacy-preview-${testInfo.project.name}.png`),
  });
  await page.keyboard.press('Enter');
  await expect(panel).toBeHidden();
  await expect(page.locator('#main-content')).toBeFocused();
  await page.waitForTimeout(300);
  expect(providerRequests).toEqual([]);

  const privacyChoices = page.getByRole('button', { name: 'Privacy Choices' });
  await privacyChoices.click();
  await expect(panel).toContainText('Current choice: advertising accepted.');
  const closeButton = panel.getByRole('button', { name: 'Close privacy choices' });
  await expect(closeButton).toBeVisible();
  await closeButton.focus();
  await page.keyboard.press('Escape');
  await expect(panel).toBeHidden();
  await expect(privacyChoices).toBeFocused();

  const layout = await page.evaluate(() => {
    const privacyPanel = document.querySelector<HTMLElement>('.privacy-panel');
    return {
      panelHeight: privacyPanel?.getBoundingClientRect().height ?? 0,
      viewportHeight: window.innerHeight,
      pageClientWidth: document.documentElement.clientWidth,
      pageScrollWidth: document.documentElement.scrollWidth,
    };
  });
  expect(layout.pageScrollWidth).toBeLessThanOrEqual(layout.pageClientWidth + 1);
  expect(layout.panelHeight).toBeLessThan(layout.viewportHeight);

});

test('stalled privacy-region lookup fails safe into a required choice', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-1440x900');
  await page.route('**/api/privacy-region', () => new Promise(() => undefined));

  await page.goto('/gameplay', { waitUntil: 'domcontentloaded' });
  await expect(
    page.getByRole('region', { name: 'Your advertising choices' }),
  ).toBeVisible({ timeout: 5_000 });
  await expect(page.locator('[data-ad-state="off"]')).toHaveCount(
    getRouteMonetization('/gameplay')?.placements.length ?? 0,
  );
  await page.unrouteAll({ behavior: 'ignoreErrors' });
});

test('privacy rejection synchronizes to another open tab', async ({
  context,
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-1440x900');
  const secondPage = await context.newPage();

  await page.goto('/gameplay');
  await secondPage.goto('/maps');
  await page.getByRole('button', { name: 'Accept advertising' }).click();
  await expect(
    secondPage.getByRole('region', { name: 'Your advertising choices' }),
  ).toBeHidden();

  await page.getByRole('button', { name: 'Privacy Choices' }).click();
  await Promise.all([
    page.waitForNavigation(),
    page.getByRole('button', { name: 'Reject non-essential' }).click(),
  ]);
  await expect(secondPage.locator('[data-ad-state="off"]')).toHaveCount(
    getRouteMonetization('/maps')?.placements.length ?? 0,
  );
  await secondPage.getByRole('button', { name: 'Privacy Choices' }).click();
  await expect(
    secondPage.getByRole('region', { name: 'Your advertising choices' }),
  ).toContainText('Current choice: non-essential advertising rejected.');
  await secondPage.close();
});

test('custom 404 remains ad-free', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-1440x900');
  const response = await page.goto('/not-a-monetized-route');

  expect(response?.status()).toBe(404);
  await expect(page.locator('[data-ad-placement]')).toHaveCount(0);
});

test('tool ad placements follow the complete interactive flow', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-1440x900');
  await page.goto('/tools/coop-troubleshooter');

  const order = await page.evaluate(() => {
    const evidence = document.querySelector('.evidence-banner');
    const early = document.querySelector('[data-ad-placement="early_responsive"]');
    const tool = document.querySelector('.tool-shell');
    const native = document.querySelector('[data-ad-placement="native_primary"]');
    const explainer = document.querySelector('.tool-explainer');
    const rectangle = document.querySelector('[data-ad-placement="rectangle_300"]');
    const safetyCallout = document.querySelector('.callout');
    const smartlink = document.querySelector('[data-ad-placement="smartlink_primary"]');
    const sources = document.querySelector('.source-list');
    const horizontal = document.querySelector('[data-ad-placement="horizontal_468"]');
    const nodes = [
      evidence,
      early,
      tool,
      native,
      explainer,
      rectangle,
      safetyCallout,
      smartlink,
      sources,
      horizontal,
    ];
    if (nodes.some((node) => !node)) return null;

    return nodes.slice(0, -1).every((node, index) =>
      Boolean(node!.compareDocumentPosition(nodes[index + 1]!) & Node.DOCUMENT_POSITION_FOLLOWING),
    );
  });

  expect(order).toBe(true);
});

test('ad placements do not widen mobile or desktop pages', async ({ page }, testInfo) => {
  test.skip(
    !['mobile-390x844', 'desktop-1440x900'].includes(testInfo.project.name),
  );

  for (const route of ['/', '/gameplay', '/tools/coop-troubleshooter']) {
    await page.goto(route);
    await expect(page.locator('[data-ad-placement]')).toHaveCount(
      getRouteMonetization(route)?.placements.length ?? 0,
    );
    const dimensions = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));
    expect(dimensions.scrollWidth, `${testInfo.project.name} ${route}`).toBeLessThanOrEqual(
      dimensions.clientWidth + 1,
    );
  }
});

test('production requests every supported unit once and never loads the opposite responsive unit', async ({
  page,
}, testInfo) => {
  test.skip(process.env.PLAYWRIGHT_EXPECT_LIVE_ADS !== '1');
  test.skip(
    !['mobile-390x844', 'desktop-1440x900'].includes(testInfo.project.name),
  );

  const width = testInfo.project.use.viewport?.width ?? 0;
  const plan = getRouteMonetization('/gameplay');
  const expectedProviderUrls = [
    ADSTERRA_CONFIG.globals.popunder.scriptUrl,
    ADSTERRA_CONFIG.globals.socialBar.scriptUrl,
    ...(plan?.placements.flatMap((placement) => {
      if (placement === 'native_primary') return [ADSTERRA_CONFIG.native.scriptUrl];
      if (placement === 'smartlink_primary') return [];
      const unit = selectBannerUnit(placement, width);
      return unit ? [unit.scriptUrl] : [];
    }) ?? []),
  ];
  const scriptRequests: string[] = [];

  await grantAdvertisingBeforeHydration(page);

  page.on('request', (request) => {
    if (providerScriptUrls.includes(request.url())) {
      scriptRequests.push(request.url());
    }
  });

  await page.goto('/gameplay', { waitUntil: 'domcontentloaded' });
  await expect.poll(() => scriptRequests.length).toBe(expectedProviderUrls.length);
  for (const url of providerScriptUrls) {
    expect(scriptRequests.filter((requestUrl) => requestUrl === url), url).toHaveLength(
      expectedProviderUrls.includes(url) ? 1 : 0,
    );
  }

  const responsiveSlot = page.locator('[data-ad-placement="early_responsive"]');
  const mobile = width < ADSTERRA_CONFIG.breakpoints.responsiveDesktop;
  await expect(responsiveSlot).toHaveAttribute('data-ad-width', mobile ? '320' : '728');
  await expect(responsiveSlot).toHaveAttribute('data-ad-height', mobile ? '50' : '90');

  await page.setViewportSize(mobile ? { width: 1440, height: 900 } : { width: 390, height: 844 });
  await page.waitForTimeout(750);

  expect(scriptRequests).toHaveLength(expectedProviderUrls.length);
});

test('production ad failures collapse without breaking the troubleshooter', async ({
  page,
}, testInfo) => {
  test.skip(process.env.PLAYWRIGHT_EXPECT_LIVE_ADS !== '1');
  test.skip(testInfo.project.name !== 'desktop-1440x900');

  await grantAdvertisingBeforeHydration(page);

  for (const host of adsterraHosts) {
    await page.route(`https://${host}/**`, (route) => route.abort('failed'));
  }

  await page.goto('/tools/coop-troubleshooter', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('[data-ad-state="failed"]')).toHaveCount(4, {
    timeout: 15_000,
  });
  await expect(page.locator('[data-ad-placement]')).toHaveCount(
    getRouteMonetization('/tools/coop-troubleshooter')?.placements.length ?? 0,
  );
  await expect(page.locator('[data-ad-placement]').first()).toBeHidden();

  await page.selectOption('#problem', 'reconnect-fails');
  await page.getByLabel('Host').check();
  await page.getByRole('button', { name: 'Build my safe checklist' }).click();
  await expect(page.locator('#tool-result')).toContainText('Reconnect failure checklist');
});
