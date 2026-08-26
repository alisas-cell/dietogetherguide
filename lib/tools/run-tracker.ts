export type RunMode = 'solo' | 'coop';

export interface RunChecklistItem {
  id: string;
  label: string;
  done: boolean;
}

export interface RunRecordInput {
  runName: string;
  mode: RunMode;
  map: string;
  currentDay: number;
  currentChapter: number;
  crewNotes: string;
  monstersEncountered: string[];
  lootNotes: string;
  checklist: RunChecklistItem[];
}

export interface RunRecord extends RunRecordInput {
  id: string;
  updatedAt: string;
}

function validString(value: unknown, max = 2_000): value is string {
  return typeof value === 'string' && value.trim().length > 0 && value.length <= max;
}

function isRunRecord(value: unknown): value is RunRecord {
  if (!value || typeof value !== 'object') return false;
  const item = value as Partial<RunRecord>;
  return (
    validString(item.id, 200) &&
    validString(item.runName, 200) &&
    (item.mode === 'solo' || item.mode === 'coop') &&
    validString(item.map, 100) &&
    Number.isInteger(item.currentDay) &&
    Number(item.currentDay) >= 0 &&
    Number.isInteger(item.currentChapter) &&
    Number(item.currentChapter) >= 0 &&
    typeof item.crewNotes === 'string' &&
    typeof item.lootNotes === 'string' &&
    Array.isArray(item.monstersEncountered) &&
    item.monstersEncountered.every((entry) => validString(entry, 100)) &&
    Array.isArray(item.checklist) &&
    item.checklist.every(
      (entry) =>
        entry &&
        typeof entry === 'object' &&
        validString((entry as RunChecklistItem).id, 200) &&
        validString((entry as RunChecklistItem).label, 300) &&
        typeof (entry as RunChecklistItem).done === 'boolean',
    ) &&
    typeof item.updatedAt === 'string' &&
    !Number.isNaN(Date.parse(item.updatedAt))
  );
}

export function createRunRecord(
  input: RunRecordInput,
  context: { id?: string; now?: string } = {},
): RunRecord {
  const record: RunRecord = {
    ...input,
    runName: input.runName.trim(),
    map: input.map.trim(),
    id: context.id ?? crypto.randomUUID(),
    updatedAt: context.now ?? new Date().toISOString(),
  };
  if (!isRunRecord(record)) throw new Error('Invalid run record');
  return record;
}

export function serializeRunRecords(records: RunRecord[]): string {
  return JSON.stringify(records, null, 2);
}

export function importRunRecords(value: string): RunRecord[] {
  let parsed: unknown;
  try {
    parsed = JSON.parse(value);
  } catch {
    throw new Error('Import must be a valid run list in JSON format');
  }
  if (!Array.isArray(parsed)) throw new Error('Import must be a valid run list');
  if (!parsed.every(isRunRecord)) throw new Error('Import contains an invalid run record');
  return parsed;
}
