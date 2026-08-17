import { requiredCoreRoutes } from '../../content';

export const publicRoutes = [
  ...requiredCoreRoutes,
  '/tools/coop-troubleshooter',
] as const;
