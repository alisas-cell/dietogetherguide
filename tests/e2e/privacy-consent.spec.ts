import { expect, test, type Page } from '@playwright/test';

const nativeScriptUrl =
  'https://pl30902793.effectivecpmnetwork.com/1283f453c8142633c69e76c4a788d1e9/invoke.js';
const bannerScriptUrls = {
  mobile: 'https://www.highperformanceformat.com/1178d923040089031d1739c3b0f07aee/invoke.js',
  desktop: 'https://www.highperformanceformat.com/11f222c98a7f20ac1f26e0182e67c82d/invoke.js',
} as const;
const providerScriptUrls = [nativeScriptUrl, ...Object.values(bannerScriptUrls)];
const consentStorageKey = 'dietogetherguide:advertising-consent';
const grantedConsent = JSON.stringify({ policyVersion: 1, advertising: 'granted' });

test.beforeEach(async ({ page, request }) => {
  await page.route('https://dietogetherguide.shop/**', async (route) => {
    const canonicalURL = new URL(route.request().url());
    const localURL = `http://127.0.0.1:3101${canonicalURL.pathname}${canonicalURL.search}`;
    const response = await request.fetch(localURL, {
      data: route.request().postDataBuffer() ?? undefined,
      headers: route.request().headers(),
      method: route.request().method(),
    });
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
      contentType: 'application/json',
      body: JSON.stringify({ requiresConsent }),
    }),
  );
}

async function mockProviderScripts(page: Page, requests: string[]) {
  page.on('request', (request) => {
    if (providerScriptUrls.includes(request.url())) requests.push(request.url());
  });

  const creativeScript = `(() => {
    const script = document.currentScript;
    const target = script?.previousElementSibling ?? script?.parentElement;
    const creative = document.createElement('a');
    creative.href = '#sponsored';
    creative.textContent = 'Sponsored';
    target?.append(creative);
  })();`;

  for (const url of providerScriptUrls) {
    await page.route(url, (route) =>
      route.fulfill({ contentType: 'application/javascript', body: creativeScript }),
    );
  }
}

function count(requests: string[], url: string) {
  return requests.filter((requestUrl) => requestUrl === url).length;
}

function expectedBanner(projectName: string) {
  return projectName === 'canonical-1440x900'
    ? bannerScriptUrls.desktop
    : bannerScriptUrls.mobile;
}

test('restricted or unknown visitor makes zero requests before a choice and after rejection', async ({
  page,
}, testInfo) => {
  const requests: string[] = [];
  await setRegion(page, true);
  await mockProviderScripts(page, requests);

  await page.goto('/');
  const panel = page.getByRole('region', { name: 'Your advertising choices' });
  await expect(panel).toBeVisible();
  await page.waitForTimeout(300);
  expect(requests).toEqual([]);
  await expect(page.locator('[data-ad-state="off"]')).toHaveCount(2);

  const panelBox = await panel.boundingBox();
  expect(panelBox?.height ?? Infinity).toBeLessThan(testInfo.project.use.viewport?.height ?? 0);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1,
    ),
  ).toBe(true);

  await panel.getByRole('button', { name: 'Reject non-essential' }).click();
  await expect(panel).toBeHidden();
  await page.reload();
  await expect(panel).toBeHidden();
  await expect(page.locator('[data-ad-state="off"]')).toHaveCount(2);
  await page.waitForTimeout(300);
  expect(requests).toEqual([]);

  await page.getByRole('button', { name: 'Privacy Choices' }).click();
  await expect(panel).toContainText('Current choice: non-essential advertising rejected.');
});

test('acceptance makes exactly one Native and one matching responsive request', async ({
  page,
}, testInfo) => {
  const requests: string[] = [];
  await setRegion(page, true);
  await mockProviderScripts(page, requests);

  await page.goto('/gameplay');
  await expect(requests).toEqual([]);
  await page.getByRole('button', { name: 'Accept advertising' }).click();

  const matchingBanner = expectedBanner(testInfo.project.name);
  const oppositeBanner =
    matchingBanner === bannerScriptUrls.mobile
      ? bannerScriptUrls.desktop
      : bannerScriptUrls.mobile;
  await expect.poll(() => count(requests, nativeScriptUrl)).toBe(1);
  await expect.poll(() => count(requests, matchingBanner)).toBe(1);
  expect(count(requests, oppositeBanner)).toBe(0);
  await expect(page.locator('[data-ad-state="ready"]')).toHaveCount(2);

  await page.setViewportSize(
    testInfo.project.name === 'canonical-1440x900'
      ? { width: 390, height: 844 }
      : { width: 1440, height: 900 },
  );
  await page.waitForTimeout(300);
  expect(count(requests, nativeScriptUrl)).toBe(1);
  expect(count(requests, matchingBanner)).toBe(1);
  expect(count(requests, oppositeBanner)).toBe(0);
});

test('non-gated visitor preserves automatic single-request behavior', async ({
  page,
}, testInfo) => {
  const requests: string[] = [];
  await setRegion(page, false);
  await mockProviderScripts(page, requests);

  await page.goto('/');
  await expect(
    page.getByRole('region', { name: 'Your advertising choices' }),
  ).toBeHidden();

  const matchingBanner = expectedBanner(testInfo.project.name);
  const oppositeBanner =
    matchingBanner === bannerScriptUrls.mobile
      ? bannerScriptUrls.desktop
      : bannerScriptUrls.mobile;
  await expect.poll(() => count(requests, nativeScriptUrl)).toBe(1);
  await expect.poll(() => count(requests, matchingBanner)).toBe(1);
  expect(count(requests, oppositeBanner)).toBe(0);
});

test('revoke reloads ads-off and a later re-grant initializes one fresh bridge', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'canonical-1440x900');
  const requests: string[] = [];
  await setRegion(page, true);
  await mockProviderScripts(page, requests);

  await page.goto('/');
  await page.evaluate(
    ({ key, value }) => window.localStorage.setItem(key, value),
    { key: consentStorageKey, value: grantedConsent },
  );
  await page.reload();
  await expect.poll(() => count(requests, nativeScriptUrl)).toBe(1);
  await expect.poll(() => count(requests, bannerScriptUrls.desktop)).toBe(1);

  await page.getByRole('button', { name: 'Privacy Choices' }).click();
  await Promise.all([
    page.waitForNavigation(),
    page.getByRole('button', { name: 'Reject non-essential' }).click(),
  ]);
  await expect(page.locator('[data-ad-state="off"]')).toHaveCount(2);
  expect(count(requests, nativeScriptUrl)).toBe(1);
  expect(count(requests, bannerScriptUrls.desktop)).toBe(1);

  await page.getByRole('button', { name: 'Privacy Choices' }).click();
  await page.getByRole('button', { name: 'Accept advertising' }).click();
  await expect.poll(() => count(requests, nativeScriptUrl)).toBe(2);
  await expect.poll(() => count(requests, bannerScriptUrls.desktop)).toBe(2);
});

test('home, article, and tool stay usable while advertising is rejected', async ({
  page,
}, testInfo) => {
  test.skip(
    !['canonical-390x844', 'canonical-1440x900'].includes(testInfo.project.name),
  );
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
    ).toBe(true);
  }

  await page.selectOption('#problem', 'reconnect-fails');
  await page.getByLabel('Host').check();
  await page.getByRole('button', { name: 'Build my safe checklist' }).click();
  await expect(page.locator('#tool-result')).toContainText('Reconnect failure checklist');
  expect(requests).toEqual([]);
});

test('failed provider requests collapse both slots without console or hydration errors', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'canonical-1440x900');
  const runtimeErrors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') runtimeErrors.push(message.text());
  });
  page.on('pageerror', (error) => runtimeErrors.push(error.message));
  await setRegion(page, true);
  for (const url of providerScriptUrls) {
    await page.route(url, (route) =>
      route.fulfill({
        contentType: 'application/javascript',
        body: "document.currentScript?.dispatchEvent(new Event('error'));",
      }),
    );
  }

  await page.goto('/tools/coop-troubleshooter');
  await page.getByRole('button', { name: 'Accept advertising' }).click();
  await expect(page.locator('[data-ad-state="failed"]')).toHaveCount(2);
  await expect(page.locator('[data-ad-placement]').first()).toBeHidden();
  expect(runtimeErrors).toEqual([]);
});

test('no-fill waits for the existing timeout and then removes both empty slots', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'canonical-1440x900');
  await setRegion(page, true);
  for (const url of providerScriptUrls) {
    await page.route(url, (route) =>
      route.fulfill({ contentType: 'application/javascript', body: '' }),
    );
  }

  await page.goto('/gameplay');
  const startedAt = Date.now();
  await page.getByRole('button', { name: 'Accept advertising' }).click();
  await expect(page.locator('[data-ad-state="loading"]')).toHaveCount(2);
  await expect(page.locator('[data-ad-state="failed"]')).toHaveCount(2, {
    timeout: 12_000,
  });
  expect(Date.now() - startedAt).toBeGreaterThanOrEqual(9_500);
  await expect(page.locator('[data-ad-placement]').first()).toBeHidden();
});

test('a slow creative settles once without duplicate provider requests', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'canonical-1440x900');
  const requests: string[] = [];
  page.on('request', (request) => {
    if (providerScriptUrls.includes(request.url())) requests.push(request.url());
  });
  await setRegion(page, true);
  const slowCreativeScript = `(() => {
    const script = document.currentScript;
    const target = script?.previousElementSibling ?? script?.parentElement;
    window.setTimeout(() => {
      const creative = document.createElement('a');
      creative.href = '#slow-sponsored';
      creative.textContent = 'Sponsored';
      target?.append(creative);
    }, 450);
  })();`;
  for (const url of providerScriptUrls) {
    await page.route(url, (route) =>
      route.fulfill({ contentType: 'application/javascript', body: slowCreativeScript }),
    );
  }

  await page.goto('/gameplay');
  await page.getByRole('button', { name: 'Accept advertising' }).click();
  await expect(page.locator('[data-ad-state="ready"]')).toHaveCount(2);
  expect(count(requests, nativeScriptUrl)).toBe(1);
  expect(count(requests, bannerScriptUrls.desktop)).toBe(1);
  expect(count(requests, bannerScriptUrls.mobile)).toBe(0);
});

test('a verified first-party cookie preserves rejection when localStorage writes fail', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'canonical-1440x900');
  const requests: string[] = [];
  await page.addInitScript((storageKey) => {
    const originalSetItem = Storage.prototype.setItem;
    Storage.prototype.setItem = function setItem(key: string, value: string) {
      if (key === storageKey) {
        throw new DOMException('Storage write blocked', 'QuotaExceededError');
      }
      return originalSetItem.call(this, key, value);
    };
  }, consentStorageKey);
  await setRegion(page, true);
  await mockProviderScripts(page, requests);

  await page.goto('/gameplay');
  const panel = page.getByRole('region', { name: 'Your advertising choices' });
  await panel.getByRole('button', { name: 'Reject non-essential' }).click();
  await expect(panel).toBeHidden();
  expect(
    await page.evaluate(() => document.cookie.includes('dietogetherguide_ad_consent=')),
  ).toBe(true);

  await page.reload();
  await expect(panel).toBeHidden();
  await expect(page.locator('[data-ad-state="off"]')).toHaveCount(2);
  expect(requests).toEqual([]);
});

test('a rejected choice stays fail-closed when both persistence mechanisms fail', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'canonical-1440x900');
  const requests: string[] = [];
  await page.addInitScript((storageKey) => {
    const originalSetItem = Storage.prototype.setItem;
    Storage.prototype.setItem = function setItem(key: string, value: string) {
      if (key === storageKey) {
        throw new DOMException('Storage write blocked', 'QuotaExceededError');
      }
      return originalSetItem.call(this, key, value);
    };
    Object.defineProperty(document, 'cookie', {
      configurable: true,
      get: () => '',
      set: () => undefined,
    });
  }, consentStorageKey);
  await setRegion(page, true);
  await mockProviderScripts(page, requests);

  await page.goto('/gameplay');
  const panel = page.getByRole('region', { name: 'Your advertising choices' });
  await panel.getByRole('button', { name: 'Reject non-essential' }).click();

  await expect(panel).toBeVisible();
  await expect(panel).toContainText('Advertising is off for this page');
  await expect(page.locator('[data-ad-state="off"]')).toHaveCount(2);
  expect(requests).toEqual([]);
});
