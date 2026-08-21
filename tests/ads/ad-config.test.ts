import { describe, expect, it } from 'vitest';

import * as adConfig from '../../components/ads/ad-config';

import {
  ADSTERRA_CONFIG,
  MONETIZED_PUBLIC_ROUTES,
  canInitializeAdsterra,
  isAdsterraProductionHost,
  isMonetizedPublicRoute,
  selectResponsiveUnit,
} from '../../components/ads/ad-config';
import { publicRoutes } from '../../lib/seo/routes';

describe('Adsterra bridge contract', () => {
  it('builds a session-only first-party QA cookie with strict scope', () => {
    const buildCookie = Reflect.get(adConfig, 'createAdQaSessionCookie') as
      | ((baseURL: string) => Record<string, unknown>)
      | undefined;

    expect(buildCookie).toBeTypeOf('function');
    if (!buildCookie) return;

    const productionCookie = buildCookie('https://dietogetherguide.shop');
    expect(productionCookie).toEqual({
      name: 'gsf_ad_qa',
      value: 'layout-v1',
      domain: 'dietogetherguide.shop',
      path: '/',
      httpOnly: false,
      secure: true,
      sameSite: 'Strict',
    });
    expect(productionCookie).not.toHaveProperty('expires');
    expect(productionCookie).not.toHaveProperty('maxAge');

    expect(buildCookie('http://127.0.0.1:3100')).toMatchObject({
      domain: '127.0.0.1',
      path: '/',
      secure: false,
      sameSite: 'Strict',
    });
  });

  it('allows only the canonical Production hostname', () => {
    expect(isAdsterraProductionHost('dietogetherguide.shop')).toBe(true);

    for (const hostname of [
      'www.dietogetherguide.shop',
      'localhost',
      '127.0.0.1',
      'dietogetherguide.vercel.app',
      'dietogetherguide-o14cwzpwi-alisasun.vercel.app',
    ]) {
      expect(isAdsterraProductionHost(hostname), hostname).toBe(false);
    }
  });

  it('requires host, route, and privacy permission at the single initialization gate', () => {
    expect(
      canInitializeAdsterra({
        hostname: 'dietogetherguide.shop',
        pathname: '/gameplay',
        privacyAllowsAds: true,
      }),
    ).toBe(true);

    expect(
      canInitializeAdsterra({
        hostname: 'dietogetherguide.shop',
        pathname: '/gameplay',
        privacyAllowsAds: false,
      }),
    ).toBe(false);
    expect(
      canInitializeAdsterra({
        hostname: 'preview.vercel.app',
        pathname: '/gameplay',
        privacyAllowsAds: true,
      }),
    ).toBe(false);
    expect(
      canInitializeAdsterra({
        hostname: 'dietogetherguide.shop',
        pathname: '/not-a-route',
        privacyAllowsAds: true,
      }),
    ).toBe(false);
  });

  it('suppresses live initialization only for the exact intentional QA session cookie', () => {
    const production = {
      hostname: 'dietogetherguide.shop',
      pathname: '/gameplay',
      privacyAllowsAds: true,
    } as const;

    expect(
      canInitializeAdsterra({
        ...production,
        cookieHeader: 'gsf_ad_qa=layout-v1',
      }),
    ).toBe(false);

    for (const cookieHeader of [
      '',
      'gsf_ad_qa=layout',
      'gsf_ad_qa=LAYOUT-V1',
      'other=layout-v1',
    ]) {
      expect(
        canInitializeAdsterra({
          ...production,
          cookieHeader,
        }),
        cookieHeader,
      ).toBe(true);
    }
  });

  it.each([
    ['normal browser', 'Mozilla/5.0 Chrome/140.0 Safari/537.36'],
    ['Googlebot', 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'],
    ['Bingbot', 'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)'],
    ['Playwright-like', 'Mozilla/5.0 HeadlessChrome/140.0.0.0 Safari/537.36'],
  ])('keeps %s live when the QA cookie is absent', (_label, userAgent) => {
    const originalNavigator = Object.getOwnPropertyDescriptor(globalThis, 'navigator');
    Object.defineProperty(globalThis, 'navigator', {
      configurable: true,
      value: { userAgent },
    });

    try {
      expect(
        canInitializeAdsterra({
          hostname: 'dietogetherguide.shop',
          pathname: '/gameplay',
          privacyAllowsAds: true,
          cookieHeader: '',
        }),
      ).toBe(true);
    } finally {
      if (originalNavigator) {
        Object.defineProperty(globalThis, 'navigator', originalNavigator);
      } else {
        Reflect.deleteProperty(globalThis, 'navigator');
      }
    }
  });

  it('monetizes every public route and no unknown route', () => {
    expect(new Set(MONETIZED_PUBLIC_ROUTES)).toEqual(new Set(publicRoutes));

    for (const route of publicRoutes) {
      expect(isMonetizedPublicRoute(route), route).toBe(true);
    }

    expect(isMonetizedPublicRoute('/definitely-not-a-route')).toBe(false);
  });

  it('uses only the exact supplied Native unit', () => {
    expect(ADSTERRA_CONFIG.native).toEqual({
      containerId: 'container-1283f453c8142633c69e76c4a788d1e9',
      scriptUrl:
        'https://pl30902793.effectivecpmnetwork.com/1283f453c8142633c69e76c4a788d1e9/invoke.js',
    });
  });

  it('selects one exact responsive unit at the 800px boundary', () => {
    expect(selectResponsiveUnit(320)).toEqual(ADSTERRA_CONFIG.responsive.mobile);
    expect(selectResponsiveUnit(390)).toEqual(ADSTERRA_CONFIG.responsive.mobile);
    expect(selectResponsiveUnit(799)).toEqual(ADSTERRA_CONFIG.responsive.mobile);
    expect(selectResponsiveUnit(800)).toEqual(ADSTERRA_CONFIG.responsive.desktop);
    expect(selectResponsiveUnit(1440)).toEqual(ADSTERRA_CONFIG.responsive.desktop);

    expect(ADSTERRA_CONFIG.responsive.mobile).toEqual({
      key: '1178d923040089031d1739c3b0f07aee',
      format: 'iframe',
      height: 50,
      width: 320,
      params: {},
      scriptUrl:
        'https://www.highperformanceformat.com/1178d923040089031d1739c3b0f07aee/invoke.js',
    });
    expect(ADSTERRA_CONFIG.responsive.desktop).toEqual({
      key: '11f222c98a7f20ac1f26e0182e67c82d',
      format: 'iframe',
      height: 90,
      width: 728,
      params: {},
      scriptUrl:
        'https://www.highperformanceformat.com/11f222c98a7f20ac1f26e0182e67c82d/invoke.js',
    });
  });
});
