export interface QuotaInput {
  quota: number;
  secured: number;
  carried: number;
  estimated: number;
  crew: number;
}
export function calculateQuota(input: QuotaInput) {
  if (
    ![input.quota, input.secured, input.carried, input.estimated].every(
      (n) => Number.isFinite(n) && n >= 0 && n <= 1e12,
    ) ||
    !Number.isInteger(input.crew) ||
    input.crew < 1 ||
    input.crew > 4
  )
    throw new Error('Enter finite non-negative values and a crew of 1–4.');
  const securedGap = Math.max(0, input.quota - input.secured);
  const afterCargo = Math.max(0, securedGap - input.carried);
  return {
    securedGap,
    afterCargo,
    afterEstimate: Math.max(0, afterCargo - input.estimated),
    perCrew: securedGap / input.crew,
  };
}
export interface ProgressionState {
  version: 1;
  chapter: number;
  level: number;
  map: string;
  completedLevels: number[];
  unlocks: string;
  achievementIds: string[];
  notes: string;
}
export const emptyProgression: ProgressionState = {
  version: 1,
  chapter: 1,
  level: 1,
  map: 'Unknown / not selected',
  completedLevels: [],
  unlocks: '',
  achievementIds: [],
  notes: '',
};
export function parseProgression(
  text: string,
  knownAchievements: string[],
): ProgressionState {
  if (text.length > 100_000) throw new Error('Import is too large.');
  let value: unknown;
  try {
    value = JSON.parse(text);
  } catch {
    throw new Error('Enter valid exported JSON.');
  }
  if (!value || typeof value !== 'object')
    throw new Error('Invalid progression record.');
  const p = value as Partial<ProgressionState>;
  if (
    p.version !== 1 ||
    !Number.isInteger(p.chapter) ||
    p.chapter! < 1 ||
    p.chapter! > 100 ||
    !Number.isInteger(p.level) ||
    p.level! < 1 ||
    p.level! > 15 ||
    !['Mansion', 'Ship', 'Castle', 'Unknown / not selected'].includes(
      p.map ?? '',
    ) ||
    !Array.isArray(p.completedLevels) ||
    !p.completedLevels.every((n) => Number.isInteger(n) && n >= 1 && n <= 15) ||
    typeof p.unlocks !== 'string' ||
    p.unlocks.length > 4000 ||
    typeof p.notes !== 'string' ||
    p.notes.length > 8000 ||
    !Array.isArray(p.achievementIds) ||
    !p.achievementIds.every((id) => knownAchievements.includes(id))
  )
    throw new Error(
      'Invalid progression fields. Your existing record was not replaced.',
    );
  return {
    version: 1,
    chapter: p.chapter!,
    level: p.level!,
    map: p.map!,
    completedLevels: [...new Set(p.completedLevels)],
    unlocks: p.unlocks,
    achievementIds: [...new Set(p.achievementIds)],
    notes: p.notes,
  };
}
