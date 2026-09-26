import { describe, expect, it } from 'vitest';

import {
  ADSTERRA_CONFIG,
  MONETIZED_PUBLIC_ROUTES,
  ROUTE_MONETIZATION,
  canInitializeAdsterra,
  getRouteMonetization,
  isAdDebugSearch,
  isAdsterraProductionHost,
  isMonetizedPublicRoute,
  routeHasPlacement,
  selectBannerUnit,
} from '../../components/ads/ad-config';
import { publicRoutes } from '../../lib/seo/routes';

describe('top-heavy Adsterra source-of-truth registry', () => {
  it('preserves every supplied script, key, size, attribute, and Smartlink exactly', () => {
    expect(ADSTERRA_CONFIG.globals).toEqual({
      popunder: {
        scriptUrl:
          'https://pl30996454.profitableratecpmnetwork.com/e7/f1/e6/e7f1e6deb310ac585c72de7e35fc3350.js',
      },
      socialBar: {
        scriptUrl:
          'https://pl30996456.profitableratecpmnetwork.com/44/86/9b/44869b6b34aa2a7ad49840f1a1cf8af4.js',
      },
    });
    expect(ADSTERRA_CONFIG.native).toEqual({
      async: true,
      containerId: 'container-1283f453c8142633c69e76c4a788d1e9',
      dataCfasync: 'false',
      scriptUrl:
        'https://pl30902793.profitableratecpmnetwork.com/1283f453c8142633c69e76c4a788d1e9/invoke.js',
    });
    expect(ADSTERRA_CONFIG.banners).toEqual({
      mobile320: {
        key: '1178d923040089031d1739c3b0f07aee',
        format: 'iframe',
        height: 50,
        width: 320,
        params: {},
        scriptUrl:
          'https://www.highrevenueformat.com/1178d923040089031d1739c3b0f07aee/invoke.js',
      },
      desktop728: {
        key: '11f222c98a7f20ac1f26e0182e67c82d',
        format: 'iframe',
        height: 90,
        width: 728,
        params: {},
        scriptUrl:
          'https://www.highrevenueformat.com/11f222c98a7f20ac1f26e0182e67c82d/invoke.js',
      },
      rectangle300: {
        key: 'ffe91604cbf7d7aad1682b8911650131',
        format: 'iframe',
        height: 250,
        width: 300,
        params: {},
        scriptUrl:
          'https://www.highrevenueformat.com/ffe91604cbf7d7aad1682b8911650131/invoke.js',
      },
      horizontal468: {
        key: 'ba5a236f74cff2891ca1777b943f4146',
        format: 'iframe',
        height: 60,
        width: 468,
        params: {},
        scriptUrl:
          'https://www.highrevenueformat.com/ba5a236f74cff2891ca1777b943f4146/invoke.js',
      },
      sidebarShort160: {
        key: '756db9f3942bc59b500e058bad3a9156',
        format: 'iframe',
        height: 300,
        width: 160,
        params: {},
        scriptUrl:
          'https://www.highrevenueformat.com/756db9f3942bc59b500e058bad3a9156/invoke.js',
      },
      sidebarLong160: {
        key: 'eed05d446c0f6275b0cecce8192e0f66',
        format: 'iframe',
        height: 600,
        width: 160,
        params: {},
        scriptUrl:
          'https://www.highrevenueformat.com/eed05d446c0f6275b0cecce8192e0f66/invoke.js',
      },
    });
    expect(ADSTERRA_CONFIG.smartlink).toEqual({
      label: 'Sponsored Resource',
      url: 'https://www.profitableratecpmnetwork.com/gxyrbuc5?key=78768be66352f70f3e8f9d17f48f7dac',
    });
  });

  it('classifies all public routes and excludes only the two legal routes', () => {
    expect(Object.keys(ROUTE_MONETIZATION)).toHaveLength(95);
    expect(new Set(Object.keys(ROUTE_MONETIZATION))).toEqual(new Set(publicRoutes));
    expect(new Set(MONETIZED_PUBLIC_ROUTES)).toEqual(
      new Set(publicRoutes.filter((route) => !['/privacy', '/terms'].includes(route))),
    );

    expect(getRouteMonetization('/')).toMatchObject({
      pageClass: 'homepage',
      mode: 'top-heavy-max-harvest',
      eligible: true,
    });
    expect(getRouteMonetization('/monsters')?.pageClass).toBe('guide-hub');
    expect(getRouteMonetization('/release-date')?.pageClass).toBe('short-guide');
    expect(getRouteMonetization('/gameplay')?.pageClass).toBe('medium-guide');
    expect(getRouteMonetization('/troubleshooting')?.pageClass).toBe('long-guide');
    expect(getRouteMonetization('/maps/silent-cove')?.pageClass).toBe('database-item');
    expect(getRouteMonetization('/tools/coop-troubleshooter')?.pageClass).toBe('tool');
    expect(getRouteMonetization('/solo-guide')?.pageClass).toBe('long-guide');
    expect(getRouteMonetization('/golden-weapons')?.pageClass).toBe('medium-guide');
    expect(getRouteMonetization('/monsters/ear')?.pageClass).toBe('database-item');
    expect(getRouteMonetization('/performance')?.pageClass).toBe('long-guide');
    expect(getRouteMonetization('/tools')?.pageClass).toBe('guide-hub');
    expect(getRouteMonetization('/tools/monster-finder')?.pageClass).toBe('tool');
    expect(getRouteMonetization('/tools/run-chapter-tracker')?.pageClass).toBe('tool');
    expect(getRouteMonetization('/about')).toMatchObject({
      pageClass: 'trust',
      mode: 'light',
      eligible: true,
    });

    for (const route of ['/privacy', '/terms']) {
      expect(getRouteMonetization(route)).toEqual({
        eligible: false,
        mode: 'off',
        pageClass: 'legal',
        placements: [],
      });
      expect(isMonetizedPublicRoute(route)).toBe(false);
    }
    expect(getRouteMonetization('/not-a-route')).toBeNull();
  });

  it('gives each route only unique, class-appropriate placement names', () => {
    for (const [route, plan] of Object.entries(ROUTE_MONETIZATION)) {
      expect(new Set(plan.placements).size, route).toBe(plan.placements.length);
    }

    expect(getRouteMonetization('/beginner-guide')?.placements).toEqual([
      'early_responsive',
      'sidebar_160x600',
      'native_primary',
      'smartlink_primary',
      'rectangle_300',
      'horizontal_468',
      'sidebar_160x300',
    ]);
    expect(getRouteMonetization('/contact')?.placements).toEqual([
      'early_responsive',
      'native_primary',
      'smartlink_primary',
    ]);
    expect(routeHasPlacement('/privacy', 'early_responsive')).toBe(false);
    expect(routeHasPlacement('/gameplay', 'early_responsive')).toBe(true);
  });

  it('allows provider initialization only for canonical eligible non-debug views', () => {
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

    expect(
      canInitializeAdsterra({
        debugMode: false,
        hostname: 'dietogetherguide.shop',
        pathname: '/gameplay',
        privacyAllowsAds: true,
      }),
    ).toBe(true);

    for (const blocked of [
      {
        debugMode: true,
        hostname: 'dietogetherguide.shop',
        pathname: '/gameplay',
        privacyAllowsAds: true,
      },
      {
        debugMode: false,
        hostname: 'dietogetherguide.shop',
        pathname: '/privacy',
        privacyAllowsAds: true,
      },
      {
        debugMode: false,
        hostname: 'preview.vercel.app',
        pathname: '/gameplay',
        privacyAllowsAds: true,
      },
      {
        debugMode: false,
        hostname: 'dietogetherguide.shop',
        pathname: '/gameplay',
        privacyAllowsAds: false,
      },
    ]) {
      expect(canInitializeAdsterra(blocked), JSON.stringify(blocked)).toBe(false);
    }
  });

  it('recognizes only an explicit ad_debug=1 query value', () => {
    expect(isAdDebugSearch('?ad_debug=1')).toBe(true);
    expect(isAdDebugSearch('?source=qa&ad_debug=1#slot')).toBe(true);
    expect(isAdDebugSearch('ad_debug=0')).toBe(false);
    expect(isAdDebugSearch('?ad_debug=true')).toBe(false);
    expect(isAdDebugSearch('')).toBe(false);
  });

  it('selects exactly one supported Banner without hidden cross-breakpoint loads', () => {
    expect(selectBannerUnit('early_responsive', 320)).toBe(
      ADSTERRA_CONFIG.banners.mobile320,
    );
    expect(selectBannerUnit('early_responsive', 799)).toBe(
      ADSTERRA_CONFIG.banners.mobile320,
    );
    expect(selectBannerUnit('early_responsive', 800)).toBe(
      ADSTERRA_CONFIG.banners.desktop728,
    );
    expect(selectBannerUnit('rectangle_300', 320)).toBe(
      ADSTERRA_CONFIG.banners.rectangle300,
    );
    expect(selectBannerUnit('horizontal_468', 767)).toBeNull();
    expect(selectBannerUnit('horizontal_468', 768)).toBe(
      ADSTERRA_CONFIG.banners.horizontal468,
    );
    expect(selectBannerUnit('sidebar_160x300', 1020)).toBeNull();
    expect(selectBannerUnit('sidebar_160x300', 1021)).toBe(
      ADSTERRA_CONFIG.banners.sidebarShort160,
    );
    expect(selectBannerUnit('sidebar_160x600', 1440)).toBe(
      ADSTERRA_CONFIG.banners.sidebarLong160,
    );
    expect(selectBannerUnit('native_primary', 1440)).toBeNull();
    expect(selectBannerUnit('smartlink_primary', 1440)).toBeNull();
  });
});
