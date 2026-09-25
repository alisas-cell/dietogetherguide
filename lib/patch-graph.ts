import { patches } from '../data/patches';

export const latestPatch = patches.reduce(
  (latest, patch) => (patch.date > latest.date ? patch : latest),
  patches[0]!,
);
export function patchesForRoute(route: string) {
  return patches
    .filter((p) => p.affectedRoutes.includes(route))
    .sort((a, b) => b.date.localeCompare(a.date));
}
export function patchesForEntity(id: string) {
  return patches
    .filter(
      (p) =>
        p.affectedEntities?.includes(id) ||
        p.changes.some((c) => c.affectedEntityIds?.includes(id)),
    )
    .sort((a, b) => b.date.localeCompare(a.date));
}
