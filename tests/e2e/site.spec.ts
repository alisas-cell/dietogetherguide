import { expect, test } from './qa-fixture';

import { publicRoutes } from '../../lib/seo/routes';

const adsterraHosts = [
  'pl30902793.effectivecpmnetwork.com',
  'www.highperformanceformat.com',
];

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
    'Last Pirates: Die Together Guide',
  );
  await expect(
    page
      .getByLabel('Current game status')
      .getByText('EARLY ACCESS · LIVE', { exact: true }),
  ).toBeVisible();
  await expect(
    page
      .getByLabel('Current game status')
      .getByText('Checked Aug 19', { exact: true }),
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

  for (const route of publicRoutes) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    await expect(page.getByRole('heading', { level: 1 }), route).toHaveCount(1);
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
    'Last Pirates: Die Together Release Date & Early Access Time',
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

test('every public route has two ad placements while localhost requests no ads', async ({
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
    await expect(
      page.locator('[data-ad-placement="article_mid"]'),
      `${route} Native placement`,
    ).toHaveCount(1);
    await expect(
      page.locator('[data-ad-placement="responsive_banner"]'),
      `${route} responsive placement`,
    ).toHaveCount(1);
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
  await expect(page.locator('[data-ad-state="qa"]')).toHaveCount(2);
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
  await expect(secondPage.locator('[data-ad-state="qa"]')).toHaveCount(2);
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
    const tool = document.querySelector('.tool-shell');
    const safetyCallout = document.querySelector('.callout');
    const native = document.querySelector('[data-ad-placement="article_mid"]');
    const sources = document.querySelector('.source-list');
    const responsive = document.querySelector(
      '[data-ad-placement="responsive_banner"]',
    );
    if (!tool || !safetyCallout || !native || !sources || !responsive) return null;

    return {
      nativeAfterTool: Boolean(
        tool.compareDocumentPosition(native) & Node.DOCUMENT_POSITION_FOLLOWING,
      ),
      nativeAfterSafetyCallout: Boolean(
        safetyCallout.compareDocumentPosition(native) & Node.DOCUMENT_POSITION_FOLLOWING,
      ),
      responsiveAfterSources: Boolean(
        sources.compareDocumentPosition(responsive) & Node.DOCUMENT_POSITION_FOLLOWING,
      ),
    };
  });

  expect(order).toEqual({
    nativeAfterTool: true,
    nativeAfterSafetyCallout: true,
    responsiveAfterSources: true,
  });
});

test('ad placements do not widen mobile or desktop pages', async ({ page }, testInfo) => {
  test.skip(
    !['mobile-390x844', 'desktop-1440x900'].includes(testInfo.project.name),
  );

  for (const route of ['/', '/gameplay', '/tools/coop-troubleshooter']) {
    await page.goto(route);
    await expect(page.locator('[data-ad-placement]')).toHaveCount(2);
    const dimensions = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));
    expect(dimensions.scrollWidth, `${testInfo.project.name} ${route}`).toBeLessThanOrEqual(
      dimensions.clientWidth + 1,
    );
  }
});
