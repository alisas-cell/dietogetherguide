import { guidePages } from '../content';
import { monsters } from '../data/monsters';
export interface SearchEntry {
  href: string;
  title: string;
  keywords: string;
}
export const searchEntries: SearchEntry[] = [
  ...guidePages.map((page) => ({
    href: page.route,
    title: page.h1,
    keywords: [
      page.route,
      ...(page.topics ?? []),
      ...monsters
        .filter((m) => m.detailRoute === page.route)
        .flatMap((m) => m.aliases ?? []),
    ].join(' '),
  })),
  {
    href: '/tools/monster-finder',
    title: 'Monster Finder',
    keywords: 'headcrab anchor anchorer cracken identification behavior',
  },
  {
    href: '/tools/coop-troubleshooter',
    title: 'Co-op Troubleshooter',
    keywords: 'quick join no game found code voice waiting host migration',
  },
  {
    href: '/tools/run-chapter-tracker',
    title: 'Run and Chapter Tracker',
    keywords: 'local save notebook',
  },
  {
    href: '/tools/progression-tracker',
    title: 'Progression Tracker',
    keywords: 'levels chapters achievements unlocks local',
  },
  {
    href: '/tools/quota-planner',
    title: 'Quota Planner',
    keywords: 'calculator loot value money budget',
  },
];
export function searchWiki(entries: SearchEntry[], query: string) {
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  return entries
    .filter((e) =>
      words.every((word) =>
        (e.title + ' ' + e.keywords).toLowerCase().includes(word),
      ),
    )
    .slice(0, 8);
}
