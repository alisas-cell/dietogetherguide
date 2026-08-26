'use client';

import Link from 'next/link';
import { useState } from 'react';

import type { MonsterBehaviorTag } from '../../data/types';
import { findMonsters, type MonsterMatch } from '../../lib/tools/monster-finder';
import { EvidenceBadge } from '../evidence/EvidenceBadge';

const clues: Array<{ value: MonsterBehaviorTag; label: string }> = [
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
  const matches: MonsterMatch[] = submitted ? findMonsters(selected) : [];

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
        <div className="button-row">
          <button className="button button-primary" disabled={selected.length === 0} type="submit">Find matching records</button>
          <button className="button button-secondary" onClick={() => { setSelected([]); setSubmitted(true); }} type="button">Not sure</button>
        </div>
      </form>

      <section aria-live="polite" className="tool-result finder-results" id="monster-results" tabIndex={-1}>
        <div className="tool-result-head">
          <div>
            <p className="section-kicker">Transparent rule result</p>
            <h2>{!submitted ? 'Choose your clues' : matches.length > 0 ? `${matches.length} matching ${matches.length === 1 ? 'record' : 'records'}` : 'No verified match'}</h2>
          </div>
          <span>Registry checked Aug 26</span>
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
            <p><strong>Why it matched:</strong> {match.reason}</p>
            {match.latestPatchChange ? <p><strong>Latest stored change:</strong> {match.latestPatchChange}</p> : null}
            <Link href={match.monster.detailRoute ?? '/monsters'}>Open {match.monster.detailRoute ? 'detail guide' : 'monster hub'} <span aria-hidden="true">→</span></Link>
          </article>
        ))}
      </section>
    </div>
  );
}
