'use client';

import { useEffect, useState } from 'react';

import {
  createRunRecord,
  importRunRecords,
  serializeRunRecords,
  type RunMode,
  type RunRecord,
  type RunRecordInput,
} from '../../lib/tools/run-tracker';

const storageKey = 'dietogetherguide.run-tracker.v1';

const emptyForm: RunRecordInput & { checklistText: string; monstersText: string } = {
  runName: '',
  mode: 'solo',
  map: 'Ship',
  currentDay: 1,
  currentChapter: 1,
  currentLevel: 1,
  crewNotes: '',
  monstersEncountered: [],
  monstersText: '',
  lootNotes: '',
  checklist: [],
  checklistText: '',
};

function persist(records: RunRecord[]) {
  try {
    localStorage.setItem(storageKey, serializeRunRecords(records));
    return true;
  } catch {
    return false;
  }
}

export function RunChapterTracker() {
  const [records, setRecords] = useState<RunRecord[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [importText, setImportText] = useState('');
  const [message, setMessage] = useState('Stored only in this browser.');

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const stored = localStorage.getItem(storageKey);
        if (!stored) return;
        setRecords(importRunRecords(stored));
      } catch {
        setMessage('Existing local tracker data was invalid and was not loaded.');
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const update = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => setForm((current) => ({ ...current, [key]: value }));

  return (
    <div className="tracker-layout">
      <form
        className="tool-form tracker-form"
        onSubmit={(event) => {
          event.preventDefault();
          try {
            const existing = editingId ? records.find((record) => record.id === editingId) : undefined;
            const record = createRunRecord(
              {
                runName: form.runName,
                mode: form.mode,
                map: form.map,
                currentDay: Number(form.currentDay),
                currentChapter: Number(form.currentChapter),
                currentLevel: form.currentLevel,
                crewNotes: form.crewNotes,
                monstersEncountered: form.monstersText.split(',').map((item) => item.trim()).filter(Boolean),
                lootNotes: form.lootNotes,
                checklist: form.checklistText.split('\n').map((label, index) => label.trim() ? ({ id: existing?.checklist[index]?.id ?? crypto.randomUUID(), label: label.trim(), done: existing?.checklist[index]?.done ?? false }) : null).filter((item): item is NonNullable<typeof item> => item !== null),
              },
              editingId ? { id: editingId } : {},
            );
            const next = editingId ? records.map((item) => item.id === editingId ? record : item) : [record, ...records];
            setRecords(next);
            const stored = persist(next);
            setEditingId(null);
            setForm(emptyForm);
            setMessage(stored ? (editingId ? 'Run updated locally.' : 'Run saved locally.') : 'Browser storage is unavailable; this run is visible only until the page closes.');
          } catch (error) {
            setMessage(error instanceof Error ? error.message : 'Could not save this run.');
          }
        }}
      >
        <div className="tool-step"><label htmlFor="run-name">Run name</label><input id="run-name" maxLength={200} onChange={(event) => update('runName', event.target.value)} required value={form.runName} /></div>
        <fieldset className="tool-step"><legend>Mode</legend><div className="choice-row">{([['solo', 'Solo'], ['coop', 'Co-op']] as const).map(([value, label]) => <label key={value}><input checked={form.mode === value} name="run-mode" onChange={() => update('mode', value as RunMode)} type="radio" /><span>{label}</span></label>)}</div></fieldset>
        <div className="tracker-inline">
          <div className="tool-step"><label htmlFor="run-map">Map</label><select id="run-map" onChange={(event) => update('map', event.target.value)} value={form.map}><option>Mansion</option><option>Ship</option><option>Castle</option><option>Silent Cove (Demo archive)</option><option>Other / unknown</option></select></div>
          <div className="tool-step"><label htmlFor="run-level">Global level (optional)</label><input id="run-level" min="1" max="15" type="number" value={form.currentLevel??''} onChange={e=>update('currentLevel',e.target.value?Number(e.target.value):undefined)} /></div>
          <div className="tool-step"><label htmlFor="run-day">Day</label><input id="run-day" min="0" onChange={(event) => update('currentDay', Number(event.target.value))} type="number" value={form.currentDay} /></div>
          <div className="tool-step"><label htmlFor="run-chapter">Chapter</label><input id="run-chapter" min="0" onChange={(event) => update('currentChapter', Number(event.target.value))} type="number" value={form.currentChapter} /></div>
        </div>
        <div className="tool-step"><label htmlFor="crew-notes">Crew notes</label><textarea id="crew-notes" maxLength={2000} onChange={(event) => update('crewNotes', event.target.value)} rows={3} value={form.crewNotes} /></div>
        <div className="tool-step"><label htmlFor="monsters-seen">Monsters encountered · comma separated</label><input id="monsters-seen" onChange={(event) => update('monstersText', event.target.value)} value={form.monstersText} /></div>
        <div className="tool-step"><label htmlFor="loot-notes">Loot notes</label><textarea id="loot-notes" maxLength={2000} onChange={(event) => update('lootNotes', event.target.value)} rows={3} value={form.lootNotes} /></div>
        <div className="tool-step"><label htmlFor="run-checklist">Checklist · one item per line</label><textarea id="run-checklist" onChange={(event) => update('checklistText', event.target.value)} rows={4} value={form.checklistText} /></div>
        <div className="button-row"><button className="button button-primary" type="submit">{editingId ? 'Update run' : 'Save run locally'}</button>{editingId ? <button className="button button-secondary" onClick={() => { setEditingId(null); setForm(emptyForm); }} type="button">Cancel edit</button> : null}</div>
        <p aria-live="polite" className="tool-help">{message}</p>
      </form>

      <section className="tracker-records">
        <div className="tool-result-head"><div><p className="section-kicker">Local records</p><h2>{records.length} saved {records.length === 1 ? 'run' : 'runs'}</h2></div><span>localStorage only</span></div>
        {records.length === 0 ? <div className="tool-empty"><p>No personal run notes yet.</p></div> : records.map((record) => (
          <article className="tracker-card" key={record.id}>
            <div><p className="section-kicker">{record.mode} · {record.map}</p><h3>{record.runName}</h3><p>Day {record.currentDay} · Chapter {record.currentChapter} · Updated {new Date(record.updatedAt).toLocaleString()}</p></div>
            {record.crewNotes ? <p><strong>Crew:</strong> {record.crewNotes}</p> : null}
            {record.monstersEncountered.length ? <p><strong>Monsters:</strong> {record.monstersEncountered.join(', ')}</p> : null}
            {record.lootNotes ? <p><strong>Loot:</strong> {record.lootNotes}</p> : null}
            {record.checklist.length ? <ul className="tracker-checklist">{record.checklist.map((item) => <li key={item.id}><label><input checked={item.done} onChange={() => { const next = records.map((entry) => entry.id === record.id ? { ...entry, updatedAt: new Date().toISOString(), checklist: entry.checklist.map((check) => check.id === item.id ? { ...check, done: !check.done } : check) } : entry); setRecords(next); persist(next); }} type="checkbox" /> {item.label}</label></li>)}</ul> : null}
            <div className="button-row compact-actions"><button className="button button-secondary" onClick={() => { setEditingId(record.id); setForm({ ...record, monstersText: record.monstersEncountered.join(', '), checklistText: record.checklist.map((item) => item.label).join('\n') }); window.scrollTo({ top: 0, behavior: 'smooth' }); }} type="button">Edit</button><button className="button button-secondary" onClick={() => { const next = records.filter((item) => item.id !== record.id); setRecords(next); persist(next); setMessage('Run deleted locally.'); }} type="button">Delete</button></div>
          </article>
        ))}

        <div className="tracker-transfer">
          <h3>JSON export / import</h3>
          <p>Export a local backup or paste a previously exported list. Import replaces the current local list only after validation.</p>
          <div className="button-row"><button className="button button-secondary" disabled={records.length === 0} onClick={() => { const blob = new Blob([serializeRunRecords(records)], { type: 'application/json' }); const url = URL.createObjectURL(blob); const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'dietogether-runs.json'; anchor.click(); URL.revokeObjectURL(url); }} type="button">Export JSON</button><button className="button button-secondary" disabled={records.length === 0} onClick={() => { if (!window.confirm('Reset every local tracker record?')) return; setRecords([]); try { localStorage.removeItem(storageKey); setMessage('All local tracker records were reset.'); } catch { setMessage('The visible list was reset, but browser storage could not be changed.'); } }} type="button">Reset local data</button></div>
          <label className="tool-step"><span>Paste exported JSON</span><textarea onChange={(event) => setImportText(event.target.value)} rows={7} value={importText} /></label>
          <button className="button button-secondary" disabled={!importText.trim()} onClick={() => { try { const next = importRunRecords(importText); setRecords(next); persist(next); setImportText(''); setMessage('Validated JSON imported locally.'); } catch (error) { setMessage(error instanceof Error ? error.message : 'Import failed.'); } }} type="button">Validate and import</button>
        </div>
      </section>
    </div>
  );
}
