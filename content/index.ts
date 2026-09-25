import { coopFixPages } from './coop-fixes';
import { expansionPages } from './expansion';
import { applySeptemberRefresh } from './september-refresh';
import { applyLiveRefresh } from './live-refresh';
import { septemberSystems } from './september-systems';
import { guideHub, septemberGuides } from './september-guides';
import { septemberMonsterPages, septemberItemPages, septemberUpdatePages } from './september-entities';
import { septemberHubs, septemberMapPages, septemberTimeline, updatesHub } from './september-hubs';
import { addSeptemberDetail } from './september-details';
import { fieldGuidePages } from './field-guide';
import { startPages } from './start';
import { trustPages } from './trust';
import type { GuidePageData } from './types';

const baselineCoreRoutes = [
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

const currentPages=[...septemberSystems,...septemberGuides,guideHub,...septemberMonsterPages,...septemberItemPages,...septemberUpdatePages,...septemberHubs,...septemberMapPages,septemberTimeline,updatesHub];
const pageMap=new Map(rawGuidePages.map(page=>[page.route,applySeptemberRefresh(applyLiveRefresh(page))]));
for(const page of currentPages) pageMap.set(page.route,{...page,heroImage:page.heroImage??pageMap.get(page.route)?.heroImage,evidenceScope:'current'});
export const guidePages: GuidePageData[] = [...pageMap.values()].map(addSeptemberDetail);
export const requiredCoreRoutes = [...new Set([...baselineCoreRoutes,...guidePages.map(page=>page.route)])];

export const guidePageByRoute = new Map(
  guidePages.map((page) => [page.route, page]),
);

export type { GuidePageData } from './types';
