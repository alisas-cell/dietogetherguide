import { coopFixPages } from './coop-fixes';
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
  '/about',
  '/contact',
  '/privacy',
  '/terms',
] as const;

export const guidePages: GuidePageData[] = [
  ...startPages,
  ...fieldGuidePages,
  ...coopFixPages,
  ...trustPages,
];

export const guidePageByRoute = new Map(
  guidePages.map((page) => [page.route, page]),
);

export type { GuidePageData } from './types';
