import { expect, test as base } from '@playwright/test';

import { createAdQaSessionCookie } from '../../components/ads/ad-config';

export const test = base.extend({
  page: async ({ baseURL, context }, providePage) => {
    if (!baseURL) throw new Error('The intentional ad QA fixture requires a baseURL.');

    await context.addCookies([createAdQaSessionCookie(baseURL)]);
    const page = await context.newPage();
    await providePage(page);
  },
});

export { expect };
