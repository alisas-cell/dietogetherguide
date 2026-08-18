import { describe, expect, it } from 'vitest';

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
