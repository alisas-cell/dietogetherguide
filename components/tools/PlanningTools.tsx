'use client';
import { useEffect, useState } from 'react';
import { achievements } from '../../data/achievements';
import {
  calculateQuota,
  emptyProgression,
  parseProgression,
  type ProgressionState,
} from '../../lib/tools/planning';

export function QuotaPlanner() {
  const [values, setValues] = useState({
    quota: '',
    secured: '',
    carried: '',
    estimated: '',
    crew: '1',
  });
  const [result, setResult] = useState<ReturnType<
    typeof calculateQuota
  > | null>(null);
  const [error, setError] = useState('');
  return (
    <div className="tool-shell tool-shell-stacked">
      <form
        className="tool-form"
        onSubmit={(e) => {
          e.preventDefault();
          try {
            if (Object.values(values).some((v) => v.trim() === ''))
              throw new Error(
                'Fill every field. Use zero when there is no value.',
              );
            setResult(
              calculateQuota({
                quota: Number(values.quota),
                secured: Number(values.secured),
                carried: Number(values.carried),
                estimated: Number(values.estimated),
                crew: Number(values.crew),
              }),
            );
            setError('');
          } catch (err) {
            setError((err as Error).message);
            setResult(null);
          }
        }}
      >
        <fieldset className="tool-step">
          <legend>Your current run — no assumed game values</legend>
          <div className="finder-grid">
            {(
              [
                ['quota', 'Quota shown in game'],
                ['secured', 'Value already secured'],
                ['carried', 'Value still being carried'],
                ['estimated', 'Additional estimated recoverable value'],
                ['crew', 'Crew size'],
              ] as const
            ).map(([key, label]) => (
              <label key={key}>
                {label}
                <input
                  required
                  type="number"
                  min={key === 'crew' ? 1 : 0}
                  max={key === 'crew' ? 4 : 1e12}
                  step={key === 'crew' ? 1 : 'any'}
                  value={values[key]}
                  onChange={(e) => {
                    setValues((v) => ({ ...v, [key]: e.target.value }));
                    setResult(null);
                  }}
                />
              </label>
            ))}
          </div>
        </fieldset>
        <p className="tool-help">
          Use the same in-game currency unit for every field. Carried and
          estimated loot are not secured; this calculator cannot predict damage,
          spawns or survival.
        </p>
        <button className="button button-primary" type="submit">
          Calculate quota gap
        </button>
        <p role="alert">{error}</p>
      </form>
      <section className="tool-result" aria-live="polite">
        <h2>Quota plan</h2>
        {result ? (
          <dl className="wiki-facts">
            <dt>Still needed from secured value</dt>
            <dd>{result.securedGap.toLocaleString()}</dd>
            <dt>Gap if all carried loot arrives</dt>
            <dd>{result.afterCargo.toLocaleString()}</dd>
            <dt>Gap if estimates also arrive</dt>
            <dd>{result.afterEstimate.toLocaleString()}</dd>
            <dt>Equal share of secured gap per crew member</dt>
            <dd>
              {result.perCrew.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </dd>
          </dl>
        ) : (
          <p>Enter your observed values to calculate a plan.</p>
        )}
        <p>
          Equal sharing is an arithmetic option, not an official crew
          requirement. A projected zero gap does not confirm extraction.
        </p>
      </section>
    </div>
  );
}
const storageKey = 'dietogetherguide.progression.v1';
const known = achievements.map((a) => a.id);
export function ProgressionTracker() {
  const [state, setState] = useState<ProgressionState>(emptyProgression);
  const [ready, setReady] = useState(false);
  const [message, setMessage] = useState('Loading local notebook…');
  const [transfer, setTransfer] = useState('');
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const stored = localStorage.getItem(storageKey);
        if (stored) setState(parseProgression(stored, known));
        setMessage(
          'Loaded. Changes are saved only when you choose Save locally.',
        );
      } catch {
        setMessage(
          'Saved data could not be read. Export or inspect it before overwriting; no automatic reset occurred.',
        );
      }
      setReady(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);
  const update = <K extends keyof ProgressionState>(
    key: K,
    value: ProgressionState[K],
  ) => setState((s) => ({ ...s, [key]: value }));
  const save = (value: ProgressionState) => {
    try {
      const checked = parseProgression(JSON.stringify(value), known);
      localStorage.setItem(storageKey, JSON.stringify(checked));
      setState(checked);
      setMessage('Saved on this browser only.');
    } catch (err) {
      setMessage(
        (err as Error).message +
          ' Browser storage may be unavailable; export a backup.',
      );
    }
  };
  return (
    <div className="tool-shell tool-shell-stacked">
      <form
        className="tool-form"
        onSubmit={(e) => {
          e.preventDefault();
          save(state);
        }}
      >
        <fieldset disabled={!ready} className="tool-step">
          <legend>Observed progression</legend>
          <div className="finder-grid">
            <label>
              Chapter
              <input
                required
                type="number"
                min="1"
                max="100"
                value={state.chapter}
                onChange={(e) => update('chapter', Number(e.target.value))}
              />
            </label>
            <label>
              Global level
              <input
                required
                type="number"
                min="1"
                max="15"
                value={state.level}
                onChange={(e) => update('level', Number(e.target.value))}
              />
            </label>
            <label>
              Location
              <select
                aria-label="Location"
                value={state.map}
                onChange={(e) => update('map', e.target.value)}
              >
                {['Unknown / not selected', 'Mansion', 'Ship', 'Castle'].map(
                  (name) => (
                    <option key={name}>{name}</option>
                  ),
                )}
              </select>
            </label>
          </div>
          <p className="tool-help">
            First four chapters: one level each; later chapters: two. This
            notebook does not infer a full level/location mapping or the total
            chapter count.
          </p>
        </fieldset>
        <fieldset disabled={!ready} className="tool-step">
          <legend>Levels you have completed</legend>
          <div className="finder-grid">
            {Array.from({ length: 15 }, (_, i) => i + 1).map((level) => (
              <label key={level}>
                <input
                  type="checkbox"
                  checked={state.completedLevels.includes(level)}
                  onChange={() =>
                    update(
                      'completedLevels',
                      state.completedLevels.includes(level)
                        ? state.completedLevels.filter((n) => n !== level)
                        : [...state.completedLevels, level],
                    )
                  }
                />{' '}
                Level {level}
              </label>
            ))}
          </div>
        </fieldset>
        <label className="tool-step">
          Observed store unlocks
          <textarea
            maxLength={4000}
            rows={3}
            value={state.unlocks}
            onChange={(e) => update('unlocks', e.target.value)}
          />
        </label>
        <fieldset disabled={!ready} className="tool-step">
          <legend>
            Achievements you confirm in Steam ({state.achievementIds.length}/20)
          </legend>
          <div className="finder-grid">
            {achievements.map((a) => (
              <label key={a.id}>
                <input
                  type="checkbox"
                  checked={state.achievementIds.includes(a.id)}
                  onChange={() =>
                    update(
                      'achievementIds',
                      state.achievementIds.includes(a.id)
                        ? state.achievementIds.filter((id) => id !== a.id)
                        : [...state.achievementIds, a.id],
                    )
                  }
                />
                <span>
                  {a.name}
                  <small>
                    {a.condition ??
                      'Condition not published in the reviewed achievement list.'}
                  </small>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        <label className="tool-step">
          Run / crew notes
          <textarea
            rows={4}
            maxLength={8000}
            value={state.notes}
            onChange={(e) => update('notes', e.target.value)}
          />
        </label>
        <button
          disabled={!ready}
          className="button button-primary"
          type="submit"
        >
          Save locally
        </button>
        <p aria-live="polite">{message}</p>
      </form>
      <section className="tool-result">
        <h2>Backup and restore</h2>
        <p>
          No account, save-file access or automatic upload. Clearing this
          browser removes its copy. Export includes your current visible
          changes.
        </p>
        <div className="button-row">
          <button
            className="button button-secondary"
            disabled={!ready}
            onClick={() => {
              const url = URL.createObjectURL(
                new Blob([JSON.stringify(state, null, 2)], {
                  type: 'application/json',
                }),
              );
              const a = document.createElement('a');
              a.href = url;
              a.download = 'dietogether-progression.json';
              a.click();
              URL.revokeObjectURL(url);
            }}
          >
            Export JSON
          </button>
          <button
            className="button button-secondary"
            disabled={!ready}
            onClick={() => {
              if (
                !confirm(
                  'Remove this browser’s progression notebook? Export first if you need a backup.',
                )
              )
                return;
              try {
                localStorage.removeItem(storageKey);
                setState(emptyProgression);
                setMessage('Local progression notebook removed.');
              } catch {
                setMessage(
                  'Storage could not be cleared; the existing record was preserved.',
                );
              }
            }}
          >
            Reset local data
          </button>
        </div>
        <label className="tool-step">
          Paste exported JSON
          <textarea
            maxLength={100000}
            rows={6}
            value={transfer}
            onChange={(e) => setTransfer(e.target.value)}
          />
        </label>
        <button
          className="button button-secondary"
          disabled={!ready || !transfer.trim()}
          onClick={() => {
            try {
              const parsed = parseProgression(transfer, known);
              if (
                !confirm(
                  'Replace the current progression notebook with this validated import?',
                )
              )
                return;
              save(parsed);
              setTransfer('');
            } catch (err) {
              setMessage((err as Error).message);
            }
          }}
        >
          Validate and import
        </button>
      </section>
    </div>
  );
}
