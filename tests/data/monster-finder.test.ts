import { describe, expect, it } from 'vitest';

import { findMonsters } from '../../lib/tools/monster-finder';

describe('transparent Monster Finder rules', () => {
  it.each([
    ['sound', 'Ear'],
    ['loot-hiding', 'Anchorer'],
    ['movement', 'Snake'],
    ['disturbed', 'Sleeper'],
    ['disguise', 'Mimic'],
    ['pull-sound', 'Siren'],
    ['rat-group', 'Rat'],
  ] as const)('maps %s to the verified %s record', (tag, expectedName) => {
    const result = findMonsters([tag]);
    expect(result[0]?.monster.name).toBe(expectedName);
    expect(result[0]?.matchedTags).toContain(tag);
    expect(result[0]?.reason.length).toBeGreaterThan(20);
  });

  it('requires all selected clues and returns no invented guess', () => {
    expect(findMonsters(['sound', 'disguise'])).toEqual([]);
    expect(findMonsters([])).toEqual([]);
  });
});
