import { describe, expect, it } from 'vitest';

import {
  createRunRecord,
  importRunRecords,
  serializeRunRecords,
} from '../../lib/tools/run-tracker';

describe('local run tracker data boundary', () => {
  it('normalizes a valid run without pretending to read game saves', () => {
    const record = createRunRecord(
      {
        runName: 'Castle crew',
        mode: 'coop',
        map: 'Castle',
        currentDay: 3,
        currentChapter: 2,
        crewNotes: 'Four players',
        monstersEncountered: ['Siren'],
        lootNotes: 'Heavy chest left by exit',
        checklist: [{ id: 'return', label: 'Return for chest', done: false }],
      },
      { id: 'run-1', now: '2026-08-26T12:00:00.000Z' },
    );
    expect(record.id).toBe('run-1');
    expect(record.updatedAt).toBe('2026-08-26T12:00:00.000Z');
    expect(record.currentDay).toBe(3);
    expect(record.currentChapter).toBe(2);
  });

  it('round-trips valid JSON and rejects malformed or dangerous values', () => {
    const record = createRunRecord(
      {
        runName: 'Solo ship',
        mode: 'solo',
        map: 'Ship',
        currentDay: 1,
        currentChapter: 1,
        crewNotes: '',
        monstersEncountered: ['Ear'],
        lootNotes: '',
        checklist: [],
      },
      { id: 'run-2', now: '2026-08-26T12:30:00.000Z' },
    );
    expect(importRunRecords(serializeRunRecords([record]))).toEqual([record]);
    expect(() => importRunRecords('{"not":"a list"}')).toThrow(/valid run list/i);
    expect(() => importRunRecords('[{"runName":""}]')).toThrow(/invalid run/i);
  });
});
