'use client';

import Link from 'next/link';
import { useState } from 'react';

import type { MonsterBehaviorTag } from '../../data/types';
import { findMonsters, type MonsterMatch, type MonsterFilters } from '../../lib/tools/monster-finder';
import { sources } from '../../data/sources';
import { EvidenceBadge } from '../evidence/EvidenceBadge';

const clues: Array<{ value: MonsterBehaviorTag; label: string }> = [
  { value: 'head-clamp', label: 'Leaps onto / clamps the head' },
  { value: 'hook', label: 'Hooks and reels players in' },
  { value: 'teleport', label: 'Teleports between floors' },
  { value: 'sound', label: 'Reacts to sound' },
  { value: 'movement', label: 'Reacts to movement' },
  { value: 'loot-hiding', label: 'Hides among loot' },
  { value: 'disguise', label: 'Looks like a teammate' },
  { value: 'disturbed', label: 'Wakes when disturbed' },
  { value: 'pull-sound', label: 'Makes a pull sound' },
  { value: 'knockback', label: 'Knockback context' },
  { value: 'rat-group', label: 'Rat or group behavior' },
];

export function MonsterFinder() {
  const [selected, setSelected] = useState<MonsterBehaviorTag[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [filters,setFilters]=useState<MonsterFilters>({version:'current'});
  const matches: MonsterMatch[] = submitted ? findMonsters(selected,filters) : [];
  const filter=(key:keyof MonsterFilters,value:string|number|undefined)=>{setFilters(old=>({...old,[key]:value}));setSubmitted(false);};

  return (
    <div className="tool-shell tool-shell-stacked">
      <form
        className="tool-form"
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(true);
          window.requestAnimationFrame(() => document.querySelector<HTMLElement>('#monster-results')?.focus());
        }}
      >
        <fieldset className="tool-step">
          <legend>What did you observe?</legend>
          <p className="tool-help">Select every clue you are confident about. All selected clues must match one registry record.</p>
          <div className="finder-grid">
            {clues.map((clue) => (
              <label key={clue.value}>
                <input
                  checked={selected.includes(clue.value)}
                  onChange={() => {
                    setSelected((current) => current.includes(clue.value) ? current.filter((item) => item !== clue.value) : [...current, clue.value]);
                    setSubmitted(false);
                  }}
                  type="checkbox"
                />
                <span>{clue.label}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset className="tool-step"><legend>Location, version and evidence</legend><div className="finder-grid">
          <label>Location<select value={filters.location??''} onChange={e=>filter('location',e.target.value||undefined)}><option value="">Any / unknown</option><option value="mansion">Mansion</option><option value="ship">Ship</option><option value="castle">Castle</option></select></label>
          <label>Level<input type="number" min="1" max="15" value={filters.level??''} onChange={e=>filter('level',e.target.value?Number(e.target.value):undefined)} /></label>
          <label>Evidence scope<select value={filters.version??'all'} onChange={e=>filter('version',e.target.value)}><option value="current">Current Early Access</option><option value="historical">Demo / historical</option><option value="all">All labeled records</option></select></label>
          <label>Changed since<select value={filters.changedSince??''} onChange={e=>filter('changedSince',e.target.value||undefined)}><option value="">Any date</option><option value="2026-09-01">September 1</option><option value="2026-09-10">September 10</option><option value="2026-09-18">September 18</option></select></label>
          <label>Confidence<select value={filters.confidence??''} onChange={e=>filter('confidence',e.target.value||undefined)}><option value="">Any labeled confidence</option><option value="confirmed">Confirmed</option><option value="preview-build">Preview / Demo</option></select></label>
        </div><p className="tool-help">Unknown locations and levels do not match a specific filter. No complete level-to-monster table is published; an empty result does not mean no enemies spawn there.</p></fieldset>
        <div className="button-row">
          <button className="button button-primary" type="submit">Find matching records</button>
          <button className="button button-secondary" onClick={() => { setSelected([]);setFilters({}); setSubmitted(true); }} type="button">Not sure</button>
        </div>
      </form>

      <section aria-live="polite" className="tool-result finder-results" id="monster-results" tabIndex={-1}>
        <div className="tool-result-head">
          <div>
            <p className="section-kicker">Transparent rule result</p>
            <h2>{!submitted ? 'Choose your clues' : matches.length > 0 ? `${matches.length} matching ${matches.length === 1 ? 'record' : 'records'}` : 'No verified match'}</h2>
          </div>
          <span>Reviewed Sep 25 · latest patch Sep 18</span>
        </div>
        {!submitted ? <p>Select clues, then run the matcher. It will not fill missing information with a guess.</p> : null}
        {submitted && matches.length === 0 ? <p>No record matches every selected clue. Remove one uncertain clue or use the monsters hub; “not sure” intentionally returns no invented answer.</p> : null}
        {matches.map((match) => (
          <article className="finder-card" key={match.monster.id}>
            <div className="tool-step-heading">
              <h3>{match.monster.name}</h3>
              <EvidenceBadge confidence={match.monster.summary?.evidence.confidence ?? 'pending-verification'} compact />
            </div>
            <p>{match.monster.summary?.value}</p>
            <p>{match.monster.status==='ea-confirmed'?'Current Early Access':'Historical / Demo'} · {match.monster.mapIds?.value.join(', ')||'Location unverified'}</p>
            <p>{match.monster.locationNote}</p>
            <p><strong>Why it matched:</strong> {match.reason}</p>
            {match.latestPatchChange ? <p><strong>Latest stored change:</strong> {match.latestPatchChange}</p> : null}
            <Link href={match.monster.detailRoute ?? '/monsters'}>Open {match.monster.detailRoute ? 'detail guide' : 'monster hub'} <span aria-hidden="true">→</span></Link>
            <p>{match.monster.summary?.evidence.sourceIds.map(id=>{const source=sources.find(s=>s.id===id);return source?<a key={id} href={source.url} rel="noreferrer" target="_blank">{id}: {source.title} </a>:null;})}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
