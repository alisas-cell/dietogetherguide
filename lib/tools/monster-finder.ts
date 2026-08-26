import { monsters } from '../../data/monsters';
import type { MonsterBehaviorTag, MonsterEntry } from '../../data/types';

export interface MonsterMatch {
  monster: MonsterEntry;
  matchedTags: MonsterBehaviorTag[];
  reason: string;
  latestPatchChange?: string;
}

export function findMonsters(tags: MonsterBehaviorTag[]): MonsterMatch[] {
  if (tags.length === 0) return [];

  return monsters
    .filter((monster) => tags.every((tag) => monster.behaviorTags?.includes(tag)))
    .map((monster) => ({
      monster,
      matchedTags: tags,
      reason: `Matched ${tags.join(', ')} against the verified behavior tags stored for ${monster.name}.`,
      latestPatchChange: monster.patchChanges?.at(-1)?.text,
    }));
}
