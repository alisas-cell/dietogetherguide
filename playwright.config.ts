import { defineConfig } from '@playwright/test';

const remoteBaseURL = process.env.PLAYWRIGHT_BASE_URL;
const proxyServer = process.env.PLAYWRIGHT_PROXY_SERVER;
const baseURL = remoteBaseURL ?? 'http://127.0.0.1:3100';

export default defineConfig({
  testDir: './tests/e2e',
  testIgnore: ['privacy-consent.spec.ts', 'live-provider.spec.ts'],
  fullyParallel: false,
  retries: 0,
  timeout: 120_000,
  workers: 1,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL,
    colorScheme: 'dark',
    proxy: proxyServer ? { server: proxyServer } : undefined,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  webServer: remoteBaseURL
    ? undefined
    : {
        command: 'npm run dev -- --hostname 127.0.0.1 --port 3100',
        url: baseURL,
        reuseExistingServer: false,
        timeout: 120_000,
      },
  projects: [
    { name: 'mobile-320x720', use: { viewport: { width: 320, height: 720 } } },
    { name: 'mobile-375x812', use: { viewport: { width: 375, height: 812 } } },
    { name: 'mobile-390x844', use: { viewport: { width: 390, height: 844 } } },
    { name: 'mobile-430x932', use: { viewport: { width: 430, height: 932 } } },
    { name: 'tablet-768x1024', use: { viewport: { width: 768, height: 1024 } } },
    { name: 'desktop-1024x768', use: { viewport: { width: 1024, height: 768 } } },
    { name: 'desktop-1440x900', use: { viewport: { width: 1440, height: 900 } } },
  ],
});
