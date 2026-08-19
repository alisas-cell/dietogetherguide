import { requiredCoreRoutes } from '../../content';

export const publicRoutes = [
  ...requiredCoreRoutes,
  '/tools/coop-troubleshooter',
] as const;

export const lastModifiedByRoute: Record<(typeof publicRoutes)[number], string> = {
  '/': '2026-08-19',
  '/release-date': '2026-08-19',
  '/early-access': '2026-08-19',
  '/roadmap': '2026-08-19',
  '/gameplay': '2026-08-19',
  '/beginner-guide': '2026-08-19',
  '/monsters': '2026-08-19',
  '/maps': '2026-08-19',
  '/maps/silent-cove': '2026-08-19',
  '/loot-and-extraction': '2026-08-19',
  '/items-and-weapons': '2026-08-19',
  '/rum-buffs-and-perks': '2026-08-19',
  '/coop': '2026-08-19',
  '/coop/quick-join': '2026-08-19',
  '/save-and-reconnect': '2026-08-19',
  '/troubleshooting': '2026-08-19',
  '/system-requirements': '2026-08-19',
  '/updates': '2026-08-19',
  '/faq': '2026-08-19',
  '/about': '2026-08-17',
  '/contact': '2026-08-17',
  '/privacy': '2026-08-18',
  '/terms': '2026-08-17',
  '/tools/coop-troubleshooter': '2026-08-19',
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
