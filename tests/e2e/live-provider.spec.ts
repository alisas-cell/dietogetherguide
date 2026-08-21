import { expect, test } from '@playwright/test';

import { AD_QA_COOKIE, ADSTERRA_CONFIG } from '../../components/ads/ad-config';

const consentStorageKey = 'dietogetherguide:advertising-consent';
const grantedConsent = JSON.stringify({ policyVersion: 1, advertising: 'granted' });

test('one cookie-free production route requests the Native and desktop providers once', async ({
  browser,
}) => {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });

  try {
    await context.clearCookies();
    expect(
      (await context.cookies()).some((cookie) => cookie.name === AD_QA_COOKIE.name),
    ).toBe(false);

    const page = await context.newPage();
    await page.addInitScript(
      ({ key, value }) => window.localStorage.setItem(key, value),
      { key: consentStorageKey, value: grantedConsent },
    );

    const requestedScripts: string[] = [];
    page.on('request', (request) => {
      if (
        request.url() === ADSTERRA_CONFIG.native.scriptUrl ||
        request.url() === ADSTERRA_CONFIG.responsive.desktop.scriptUrl ||
        request.url() === ADSTERRA_CONFIG.responsive.mobile.scriptUrl
      ) {
        requestedScripts.push(request.url());
      }
    });

    const [nativeResponse, desktopResponse] = await Promise.all([
      page.waitForResponse(ADSTERRA_CONFIG.native.scriptUrl),
      page.waitForResponse(ADSTERRA_CONFIG.responsive.desktop.scriptUrl),
      page.goto('/gameplay', { waitUntil: 'domcontentloaded' }),
    ]);

    expect(nativeResponse.ok(), `Native HTTP ${nativeResponse.status()}`).toBe(true);
    expect(desktopResponse.ok(), `desktop banner HTTP ${desktopResponse.status()}`).toBe(true);

    await expect
      .poll(
        () => requestedScripts.filter((url) => url === ADSTERRA_CONFIG.native.scriptUrl).length,
      )
      .toBe(1);
    await expect
      .poll(
        () =>
          requestedScripts.filter(
            (url) => url === ADSTERRA_CONFIG.responsive.desktop.scriptUrl,
          ).length,
      )
      .toBe(1);
    expect(requestedScripts).not.toContain(ADSTERRA_CONFIG.responsive.mobile.scriptUrl);
    expect(page.url()).toBe('https://dietogetherguide.shop/gameplay');
  } finally {
    await context.close();
  }
});
