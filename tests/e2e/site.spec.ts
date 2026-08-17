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
  await expect(page.getByRole('dialog', { name: /site navigation/i })).toBeVisible();
  await expect(page.getByRole('button', { name: /close navigation/i })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog', { name: /site navigation/i })).toBeHidden();
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
