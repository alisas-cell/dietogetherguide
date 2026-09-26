import { guidePages, requiredCoreRoutes } from '../../content';
import { REVIEW_DATE } from '../../data/current';
export const publicRoutes = [
  ...requiredCoreRoutes,
  '/tools/coop-troubleshooter',
  '/tools/monster-finder',
  '/tools/run-chapter-tracker',
  '/tools/progression-tracker',
  '/tools/quota-planner',
];
export const lastModifiedByRoute: Record<string, string> = Object.fromEntries(
  publicRoutes.map((route) => [
    route,
    guidePages.find((page) => page.route === route)?.lastModified ??
      REVIEW_DATE,
  ]),
);
lastModifiedByRoute['/'] = '2026-09-26';
lastModifiedByRoute['/tools/monster-finder'] = '2026-09-26';
for (const route of ['/tools/progression-tracker', '/tools/quota-planner', '/tools/run-chapter-tracker']) lastModifiedByRoute[route] = '2026-09-26';
export function getLastModified(route: string): string {
  return lastModifiedByRoute[route] ?? REVIEW_DATE;
}
export function formatLastModified(route: string): string {
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
    timeZone: 'UTC',
    year: 'numeric',
  }).format(new Date(getLastModified(route) + 'T00:00:00Z'));
}
