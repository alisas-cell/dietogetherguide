import { expect, test } from '@playwright/test';

import { publicRoutes } from '../../lib/seo/routes';

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
      .getByText('EARLY ACCESS · AUG 18', { exact: true }),
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
