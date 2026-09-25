import { monsters } from '../../data/monsters';
import type { MonsterBehaviorTag, MonsterEntry } from '../../data/types';

export interface MonsterMatch {
  monster: MonsterEntry;
  matchedTags: MonsterBehaviorTag[];
  reason: string;
  latestPatchChange?: string;
}

export interface MonsterFilters { location?:string; level?:number; version?:'current'|'historical'|'all'; changedSince?:string; confidence?:string; }
export function findMonsters(tags: MonsterBehaviorTag[], filters:MonsterFilters={}): MonsterMatch[] {
  if (tags.length === 0 && !filters.location && !filters.level && !filters.changedSince && !filters.confidence && !filters.version) return [];

  return monsters
    .filter((monster) => tags.every((tag) => monster.behaviorTags?.includes(tag)))
    .filter(monster=>!filters.location||monster.mapIds?.value.includes(filters.location))
    .filter(monster=>!filters.level||monster.levelNumbers?.includes(filters.level))
    .filter(monster=>!filters.version||filters.version==='all'||(filters.version==='current'?monster.status==='ea-confirmed':monster.status!=='ea-confirmed'))
    .filter(monster=>!filters.changedSince||monster.patchChanges?.some(change=>change.date>=filters.changedSince!))
    .filter(monster=>!filters.confidence||monster.summary?.evidence.confidence===filters.confidence)
    .map((monster) => ({
      monster,
      matchedTags: tags,
      reason: tags.length ? `Matched ${tags.join(', ')} against stored behavior tags; every selected filter must also match.` : 'Matched the selected evidence, version and location filters.',
      latestPatchChange: monster.patchChanges?.toSorted((a,b)=>a.date.localeCompare(b.date)).at(-1)?.text,
    }));
}
