import { requiredCoreRoutes } from '../../content';

export const publicRoutes = [
  ...requiredCoreRoutes,
  '/tools/coop-troubleshooter',
  '/tools/monster-finder',
  '/tools/run-chapter-tracker',
] as const;

export const lastModifiedByRoute: Record<(typeof publicRoutes)[number], string> = {
  '/': '2026-08-26',
  '/release-date': '2026-08-26',
  '/early-access': '2026-08-26',
  '/roadmap': '2026-08-26',
  '/gameplay': '2026-08-26',
  '/beginner-guide': '2026-08-26',
  '/monsters': '2026-08-26',
  '/maps': '2026-08-26',
  '/maps/silent-cove': '2026-08-26',
  '/loot-and-extraction': '2026-08-26',
  '/items-and-weapons': '2026-08-26',
  '/rum-buffs-and-perks': '2026-08-26',
  '/coop': '2026-08-26',
  '/coop/quick-join': '2026-08-26',
  '/save-and-reconnect': '2026-08-26',
  '/troubleshooting': '2026-08-26',
  '/system-requirements': '2026-08-26',
  '/updates': '2026-08-26',
  '/faq': '2026-08-26',
  '/solo-guide': '2026-08-26',
  '/golden-weapons': '2026-08-26',
  '/monsters/ear': '2026-08-26',
  '/monsters/anchorer': '2026-08-26',
  '/monsters/siren': '2026-08-26',
  '/monsters/mimic': '2026-08-26',
  '/coop/no-game-found': '2026-08-26',
  '/maps/ship': '2026-08-26',
  '/maps/castle': '2026-08-26',
  '/monkey-cart': '2026-08-26',
  '/performance': '2026-08-26',
  '/revive-guide': '2026-08-26',
  '/tools': '2026-08-26',
  '/about': '2026-08-17',
  '/contact': '2026-08-17',
  '/privacy': '2026-08-18',
  '/terms': '2026-08-17',
  '/tools/coop-troubleshooter': '2026-08-26',
  '/tools/monster-finder': '2026-08-26',
  '/tools/run-chapter-tracker': '2026-08-26',
};

export function getLastModified(route: string): string {
  return lastModifiedByRoute[route as keyof typeof lastModifiedByRoute] ?? '2026-08-17';
}

export function formatLastModified(route: string): string {
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
    timeZone: 'UTC',
    year: 'numeric',
  }).format(new Date(`${getLastModified(route)}T00:00:00Z`));
}
