export interface ResponsiveAdUnit {
  readonly key: string;
  readonly format: 'iframe';
  readonly height: 50 | 90;
  readonly width: 320 | 728;
  readonly params: Readonly<Record<string, never>>;
  readonly scriptUrl: string;
}

export const AD_QA_COOKIE = {
  name: 'gsf_ad_qa',
  value: 'layout-v1',
} as const;

export type AdQaSessionCookie = {
  readonly name: typeof AD_QA_COOKIE.name;
  readonly value: typeof AD_QA_COOKIE.value;
  readonly domain: string;
  readonly path: '/';
  readonly httpOnly: false;
  readonly secure: boolean;
  readonly sameSite: 'Strict';
};

export function createAdQaSessionCookie(baseURL: string): AdQaSessionCookie {
  const url = new URL(baseURL);

  return {
    ...AD_QA_COOKIE,
    domain: url.hostname,
    path: '/',
    httpOnly: false,
    secure: url.protocol === 'https:',
    sameSite: 'Strict',
  };
}

export function isIntentionalAdQaSession(cookieHeader: string): boolean {
  return cookieHeader.split(';').some((cookie) => {
    const separator = cookie.indexOf('=');
    if (separator < 0) return false;

    return (
      cookie.slice(0, separator).trim() === AD_QA_COOKIE.name &&
      cookie.slice(separator + 1).trim() === AD_QA_COOKIE.value
    );
  });
}

export const MONETIZED_PUBLIC_ROUTES = [
  '/',
  '/release-date',
  '/early-access',
  '/roadmap',
  '/gameplay',
  '/beginner-guide',
  '/monsters',
  '/maps',
  '/maps/silent-cove',
  '/loot-and-extraction',
  '/items-and-weapons',
  '/rum-buffs-and-perks',
  '/coop',
  '/coop/quick-join',
  '/save-and-reconnect',
  '/troubleshooting',
  '/system-requirements',
  '/updates',
  '/faq',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
  '/tools/coop-troubleshooter',
] as const;

const monetizedRouteSet = new Set<string>(MONETIZED_PUBLIC_ROUTES);

export const ADSTERRA_CONFIG = {
  productionHostname: 'dietogetherguide.shop',
  noFillTimeoutMs: 10_000,
  native: {
    containerId: 'container-1283f453c8142633c69e76c4a788d1e9',
    scriptUrl:
      'https://pl30902793.effectivecpmnetwork.com/1283f453c8142633c69e76c4a788d1e9/invoke.js',
  },
  responsive: {
    breakpoint: 800,
    mobile: {
      key: '1178d923040089031d1739c3b0f07aee',
      format: 'iframe',
      height: 50,
      width: 320,
      params: {},
      scriptUrl:
        'https://www.highperformanceformat.com/1178d923040089031d1739c3b0f07aee/invoke.js',
    },
    desktop: {
      key: '11f222c98a7f20ac1f26e0182e67c82d',
      format: 'iframe',
      height: 90,
      width: 728,
      params: {},
      scriptUrl:
        'https://www.highperformanceformat.com/11f222c98a7f20ac1f26e0182e67c82d/invoke.js',
    },
  },
} as const satisfies {
  readonly productionHostname: string;
  readonly noFillTimeoutMs: number;
  readonly native: {
    readonly containerId: string;
    readonly scriptUrl: string;
  };
  readonly responsive: {
    readonly breakpoint: number;
    readonly mobile: ResponsiveAdUnit;
    readonly desktop: ResponsiveAdUnit;
  };
};

export const ADSTERRA_NATIVE_PLACEMENT_ID =
  '1283f453c8142633c69e76c4a788d1e9' as const;
export const ADSTERRA_NATIVE_MIN_HEIGHT = 180 as const;

export function isAdsterraProductionHost(hostname: string): boolean {
  return hostname === ADSTERRA_CONFIG.productionHostname;
}

export function isMonetizedPublicRoute(pathname: string): boolean {
  return monetizedRouteSet.has(pathname);
}

export function canInitializeAdsterra({
  hostname,
  pathname,
  privacyAllowsAds,
  cookieHeader = '',
}: {
  hostname: string;
  pathname: string;
  privacyAllowsAds: boolean;
  cookieHeader?: string;
}): boolean {
  return (
    !isIntentionalAdQaSession(cookieHeader) &&
    privacyAllowsAds &&
    isAdsterraProductionHost(hostname) &&
    isMonetizedPublicRoute(pathname)
  );
}

export function selectResponsiveUnit(viewportWidth: number): ResponsiveAdUnit {
  return viewportWidth >= ADSTERRA_CONFIG.responsive.breakpoint
    ? ADSTERRA_CONFIG.responsive.desktop
    : ADSTERRA_CONFIG.responsive.mobile;
}
