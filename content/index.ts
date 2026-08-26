import { coopFixPages } from './coop-fixes';
import { expansionPages } from './expansion';
import { applyLiveRefresh } from './live-refresh';
import { fieldGuidePages } from './field-guide';
import { startPages } from './start';
import { trustPages } from './trust';
import type { GuidePageData } from './types';

export const requiredCoreRoutes = [
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
  '/solo-guide',
  '/golden-weapons',
  '/monsters/ear',
  '/monsters/anchorer',
  '/monsters/siren',
  '/monsters/mimic',
  '/coop/no-game-found',
  '/maps/ship',
  '/maps/castle',
  '/monkey-cart',
  '/performance',
  '/revive-guide',
  '/tools',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
] as const;

const rawGuidePages: GuidePageData[] = [
  ...startPages,
  ...fieldGuidePages,
  ...coopFixPages,
  ...expansionPages,
  ...trustPages,
];

export const guidePages: GuidePageData[] = rawGuidePages.map(applyLiveRefresh);

export const guidePageByRoute = new Map(
  guidePages.map((page) => [page.route, page]),
);

export type { GuidePageData } from './types';
