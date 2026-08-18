import { defineConfig } from '@playwright/test';

const port = 3101;
const localServerURL = `http://127.0.0.1:${port}`;
const canonicalBaseURL = 'https://dietogetherguide.shop';

export default defineConfig({
  testDir: './tests/e2e',
  testMatch: 'privacy-consent.spec.ts',
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report/production-equivalent' }],
  ],
  use: {
    baseURL: canonicalBaseURL,
    colorScheme: 'dark',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: `npm run start -- --hostname 0.0.0.0 --port ${port}`,
    url: localServerURL,
    reuseExistingServer: false,
    timeout: 120_000,
  },
  projects: [
    { name: 'canonical-320x720', use: { viewport: { width: 320, height: 720 } } },
    { name: 'canonical-375x812', use: { viewport: { width: 375, height: 812 } } },
    { name: 'canonical-390x844', use: { viewport: { width: 390, height: 844 } } },
    { name: 'canonical-1440x900', use: { viewport: { width: 1440, height: 900 } } },
  ],
});
