export type AdFormat =
  | 'popunder'
  | 'social_bar'
  | 'native'
  | '320x50'
  | '728x90'
  | '300x250'
  | '468x60'
  | '160x300'
  | '160x600'
  | 'smartlink';

export type AdPlacement =
  | 'early_responsive'
  | 'native_primary'
  | 'smartlink_primary'
  | 'rectangle_300'
  | 'horizontal_468'
  | 'sidebar_160x300'
  | 'sidebar_160x600';

export type BannerPlacement = Exclude<
  AdPlacement,
  'native_primary' | 'smartlink_primary'
>;

const bannerPlacementSet = new Set<AdPlacement>([
  'early_responsive',
  'rectangle_300',
  'horizontal_468',
  'sidebar_160x300',
  'sidebar_160x600',
]);

export function isBannerPlacement(
  placement: AdPlacement,
): placement is BannerPlacement {
  return bannerPlacementSet.has(placement);
}

export type PageClass =
  | 'homepage'
  | 'guide-hub'
  | 'short-guide'
  | 'medium-guide'
  | 'long-guide'
  | 'database-item'
  | 'tool'
  | 'trust'
  | 'legal';

export type MonetizationMode = 'top-heavy-max-harvest' | 'light' | 'off';

export interface BannerAdUnit {
  readonly key: string;
  readonly format: 'iframe';
  readonly height: 50 | 60 | 90 | 250 | 300 | 600;
  readonly width: 160 | 300 | 320 | 468 | 728;
  readonly params: Readonly<Record<string, never>>;
  readonly scriptUrl: string;
}

export interface RouteMonetizationPlan {
  readonly eligible: boolean;
  readonly mode: MonetizationMode;
  readonly pageClass: PageClass;
  readonly placements: readonly AdPlacement[];
}

const mobile320 = {
  key: '1178d923040089031d1739c3b0f07aee',
  format: 'iframe',
  height: 50,
  width: 320,
  params: {},
  scriptUrl:
    'https://www.highrevenueformat.com/1178d923040089031d1739c3b0f07aee/invoke.js',
} as const satisfies BannerAdUnit;

const desktop728 = {
  key: '11f222c98a7f20ac1f26e0182e67c82d',
  format: 'iframe',
  height: 90,
  width: 728,
  params: {},
  scriptUrl:
    'https://www.highrevenueformat.com/11f222c98a7f20ac1f26e0182e67c82d/invoke.js',
} as const satisfies BannerAdUnit;

export const ADSTERRA_CONFIG = {
  productionHostname: 'dietogetherguide.shop',
  noFillTimeoutMs: 10_000,
  breakpoints: {
    responsiveDesktop: 800,
    wideTablet: 768,
    desktopSidebar: 1021,
  },
  globals: {
    popunder: {
      scriptUrl:
        'https://pl30996454.profitableratecpmnetwork.com/e7/f1/e6/e7f1e6deb310ac585c72de7e35fc3350.js',
    },
    socialBar: {
      scriptUrl:
        'https://pl30996456.profitableratecpmnetwork.com/44/86/9b/44869b6b34aa2a7ad49840f1a1cf8af4.js',
    },
  },
  native: {
    async: true,
    containerId: 'container-1283f453c8142633c69e76c4a788d1e9',
    dataCfasync: 'false',
    scriptUrl:
      'https://pl30902793.profitableratecpmnetwork.com/1283f453c8142633c69e76c4a788d1e9/invoke.js',
  },
  banners: {
    mobile320,
    desktop728,
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
  },
  smartlink: {
    label: 'Sponsored Resource',
    url: 'https://www.profitableratecpmnetwork.com/gxyrbuc5?key=78768be66352f70f3e8f9d17f48f7dac',
  },
} as const;

const homepagePlacements = [
  'early_responsive',
  'native_primary',
  'smartlink_primary',
  'rectangle_300',
  'horizontal_468',
] as const satisfies readonly AdPlacement[];

const hubAndLongPlacements = [
  'early_responsive',
  'sidebar_160x600',
  'native_primary',
  'smartlink_primary',
  'rectangle_300',
  'horizontal_468',
  'sidebar_160x300',
] as const satisfies readonly AdPlacement[];

const shortAndDatabasePlacements = [
  'early_responsive',
  'sidebar_160x300',
  'native_primary',
  'rectangle_300',
  'smartlink_primary',
] as const satisfies readonly AdPlacement[];

const mediumPlacements = [
  'early_responsive',
  'sidebar_160x600',
  'native_primary',
  'smartlink_primary',
  'rectangle_300',
  'horizontal_468',
] as const satisfies readonly AdPlacement[];

const toolPlacements = [
  'early_responsive',
  'native_primary',
  'rectangle_300',
  'smartlink_primary',
  'horizontal_468',
] as const satisfies readonly AdPlacement[];

const trustPlacements = [
  'early_responsive',
  'native_primary',
  'smartlink_primary',
] as const satisfies readonly AdPlacement[];

function enabled(
  pageClass: Exclude<PageClass, 'legal'>,
  placements: readonly AdPlacement[],
  mode: Exclude<MonetizationMode, 'off'> = 'top-heavy-max-harvest',
): RouteMonetizationPlan {
  return { eligible: true, mode, pageClass, placements };
}

const legalPlan: RouteMonetizationPlan = {
  eligible: false,
  mode: 'off',
  pageClass: 'legal',
  placements: [],
};

export const ROUTE_MONETIZATION = {
  '/progression': enabled('short-guide', shortAndDatabasePlacements),
  '/levels': enabled('short-guide', shortAndDatabasePlacements),
  '/chapters': enabled('short-guide', shortAndDatabasePlacements),
  '/quota': enabled('short-guide', shortAndDatabasePlacements),
  '/store': enabled('short-guide', shortAndDatabasePlacements),
  '/loot': enabled('short-guide', shortAndDatabasePlacements),
  '/loot/progression': enabled('short-guide', shortAndDatabasePlacements),
  '/loot/rare': enabled('short-guide', shortAndDatabasePlacements),
  '/loot/large-items': enabled('short-guide', shortAndDatabasePlacements),
  '/achievements': enabled('short-guide', shortAndDatabasePlacements),
  '/steam-deck': enabled('short-guide', shortAndDatabasePlacements),
  '/tutorial': enabled('short-guide', shortAndDatabasePlacements),
  '/lobby': enabled('short-guide', shortAndDatabasePlacements),
  '/voice-chat': enabled('short-guide', shortAndDatabasePlacements),
  '/host-migration': enabled('short-guide', shortAndDatabasePlacements),
  '/weapons': enabled('short-guide', shortAndDatabasePlacements),
  '/tools-and-utility': enabled('short-guide', shortAndDatabasePlacements),
  '/guides/progression': enabled('short-guide', shortAndDatabasePlacements),
  '/guides/level-order': enabled('short-guide', shortAndDatabasePlacements),
  '/guides/quota': enabled('short-guide', shortAndDatabasePlacements),
  '/guides/store-unlocks': enabled('short-guide', shortAndDatabasePlacements),
  '/guides/hauling': enabled('short-guide', shortAndDatabasePlacements),
  '/guides/fragile-loot': enabled('short-guide', shortAndDatabasePlacements),
  '/guides/elevators': enabled('short-guide', shortAndDatabasePlacements),
  '/guides/strong-arms-big-palms': enabled('short-guide', shortAndDatabasePlacements),
  '/guides/controls': enabled('short-guide', shortAndDatabasePlacements),
  '/troubleshooting/loading': enabled('short-guide', shortAndDatabasePlacements),
  '/guides': enabled('short-guide', shortAndDatabasePlacements),
  '/monsters/head-crab': enabled('database-item', shortAndDatabasePlacements),
  '/monsters/man-in-shadows': enabled('database-item', shortAndDatabasePlacements),
  '/monsters/kraken': enabled('database-item', shortAndDatabasePlacements),
  '/monsters/snake': enabled('database-item', shortAndDatabasePlacements),
  '/monsters/crab': enabled('database-item', shortAndDatabasePlacements),
  '/monsters/parrot': enabled('database-item', shortAndDatabasePlacements),
  '/monsters/sleeper': enabled('database-item', shortAndDatabasePlacements),
  '/monsters/rat': enabled('database-item', shortAndDatabasePlacements),
  '/items/boomerang': enabled('database-item', shortAndDatabasePlacements),
  '/items/cover': enabled('database-item', shortAndDatabasePlacements),
  '/items/teleport-crystal': enabled('database-item', shortAndDatabasePlacements),
  '/items/healing-fish': enabled('database-item', shortAndDatabasePlacements),
  '/items/instruments': enabled('database-item', shortAndDatabasePlacements),
  '/updates/fresh-lobby-70-loot-spawns': enabled('short-guide', shortAndDatabasePlacements),
  '/updates/september-14-tutorial-store-loot': enabled('short-guide', shortAndDatabasePlacements),
  '/updates/statues-head-crab-major-update': enabled('short-guide', shortAndDatabasePlacements),
  '/monsters/bosses': enabled('database-item', shortAndDatabasePlacements),
  '/maps/mansion': enabled('short-guide', shortAndDatabasePlacements),
  '/updates/september-2026': enabled('short-guide', shortAndDatabasePlacements),
  '/tools/progression-tracker': enabled('tool', toolPlacements),
  '/tools/quota-planner': enabled('tool', toolPlacements),
  '/': enabled('homepage', homepagePlacements),
  '/release-date': enabled('short-guide', shortAndDatabasePlacements),
  '/early-access': enabled('medium-guide', mediumPlacements),
  '/roadmap': enabled('medium-guide', mediumPlacements),
  '/gameplay': enabled('medium-guide', mediumPlacements),
  '/beginner-guide': enabled('long-guide', hubAndLongPlacements),
  '/monsters': enabled('guide-hub', hubAndLongPlacements),
  '/maps': enabled('guide-hub', hubAndLongPlacements),
  '/maps/silent-cove': enabled('database-item', shortAndDatabasePlacements),
  '/loot-and-extraction': enabled('medium-guide', mediumPlacements),
  '/items-and-weapons': enabled('guide-hub', hubAndLongPlacements),
  '/rum-buffs-and-perks': enabled('medium-guide', mediumPlacements),
  '/coop': enabled('medium-guide', mediumPlacements),
  '/coop/quick-join': enabled('medium-guide', mediumPlacements),
  '/save-and-reconnect': enabled('medium-guide', mediumPlacements),
  '/troubleshooting': enabled('long-guide', hubAndLongPlacements),
  '/system-requirements': enabled('short-guide', shortAndDatabasePlacements),
  '/updates': enabled('guide-hub', hubAndLongPlacements),
  '/faq': enabled('guide-hub', hubAndLongPlacements),
  '/about': enabled('trust', trustPlacements, 'light'),
  '/contact': enabled('trust', trustPlacements, 'light'),
  '/privacy': legalPlan,
  '/terms': legalPlan,
  '/tools/coop-troubleshooter': enabled('tool', toolPlacements),
  '/solo-guide': enabled('long-guide', hubAndLongPlacements),
  '/golden-weapons': enabled('medium-guide', mediumPlacements),
  '/monsters/ear': enabled('database-item', shortAndDatabasePlacements),
  '/monsters/anchorer': enabled('database-item', shortAndDatabasePlacements),
  '/monsters/siren': enabled('database-item', shortAndDatabasePlacements),
  '/monsters/mimic': enabled('database-item', shortAndDatabasePlacements),
  '/coop/no-game-found': enabled('medium-guide', mediumPlacements),
  '/maps/ship': enabled('medium-guide', mediumPlacements),
  '/maps/castle': enabled('medium-guide', mediumPlacements),
  '/monkey-cart': enabled('medium-guide', mediumPlacements),
  '/performance': enabled('long-guide', hubAndLongPlacements),
  '/revive-guide': enabled('medium-guide', mediumPlacements),
  '/tools': enabled('guide-hub', hubAndLongPlacements),
  '/tools/monster-finder': enabled('tool', toolPlacements),
  '/tools/run-chapter-tracker': enabled('tool', toolPlacements),
} as const satisfies Record<string, RouteMonetizationPlan>;

type RegisteredRoute = keyof typeof ROUTE_MONETIZATION;

const monetizedRouteSet = new Set<string>(
  Object.entries(ROUTE_MONETIZATION)
    .filter(([, plan]) => plan.eligible)
    .map(([route]) => route),
);

export const MONETIZED_PUBLIC_ROUTES = Object.keys(ROUTE_MONETIZATION).filter(
  (route) => ROUTE_MONETIZATION[route as RegisteredRoute].eligible,
) as RegisteredRoute[];

export function isAdsterraProductionHost(hostname: string): boolean {
  return hostname === ADSTERRA_CONFIG.productionHostname;
}

export function getRouteMonetization(
  pathname: string,
): RouteMonetizationPlan | null {
  return ROUTE_MONETIZATION[pathname as RegisteredRoute] ?? null;
}

export function isMonetizedPublicRoute(pathname: string): boolean {
  return monetizedRouteSet.has(pathname);
}

export function routeHasPlacement(
  pathname: string,
  placement: AdPlacement,
): boolean {
  return getRouteMonetization(pathname)?.placements.includes(placement) ?? false;
}

export function isAdDebugSearch(search: string): boolean {
  const query = search.replace(/^\?/, '').split('#', 1)[0] ?? '';
  return new URLSearchParams(query).get('ad_debug') === '1';
}

export function canInitializeAdsterra({
  debugMode = false,
  hostname,
  pathname,
  privacyAllowsAds,
}: {
  debugMode?: boolean;
  hostname: string;
  pathname: string;
  privacyAllowsAds: boolean;
}): boolean {
  return (
    !debugMode &&
    privacyAllowsAds &&
    isAdsterraProductionHost(hostname) &&
    isMonetizedPublicRoute(pathname)
  );
}

export function selectBannerUnit(
  placement: AdPlacement,
  viewportWidth: number,
): BannerAdUnit | null {
  if (placement === 'early_responsive') {
    if (viewportWidth < ADSTERRA_CONFIG.banners.mobile320.width) return null;
    return viewportWidth >= ADSTERRA_CONFIG.breakpoints.responsiveDesktop
      ? ADSTERRA_CONFIG.banners.desktop728
      : ADSTERRA_CONFIG.banners.mobile320;
  }
  if (placement === 'rectangle_300') {
    return viewportWidth >= ADSTERRA_CONFIG.banners.rectangle300.width
      ? ADSTERRA_CONFIG.banners.rectangle300
      : null;
  }
  if (placement === 'horizontal_468') {
    return viewportWidth >= ADSTERRA_CONFIG.breakpoints.wideTablet
      ? ADSTERRA_CONFIG.banners.horizontal468
      : null;
  }
  if (placement === 'sidebar_160x300') {
    return viewportWidth >= ADSTERRA_CONFIG.breakpoints.desktopSidebar
      ? ADSTERRA_CONFIG.banners.sidebarShort160
      : null;
  }
  if (placement === 'sidebar_160x600') {
    return viewportWidth >= ADSTERRA_CONFIG.breakpoints.desktopSidebar
      ? ADSTERRA_CONFIG.banners.sidebarLong160
      : null;
  }
  return null;
}
