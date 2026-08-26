'use client';

import Link from 'next/link';
import { useState } from 'react';

import {
  getTroubleshooterResult,
  problemOptions,
  type CrewRole,
  type ConnectionMethod,
  type LobbyVisibility,
  type ProblemType,
  type TroubleshooterPlatform,
} from '../../data/troubleshooter';
import { EvidenceBadge } from '../evidence/EvidenceBadge';

export function CoopTroubleshooter() {
  const [problem, setProblem] = useState<ProblemType>('quick-join-fails');
  const [role, setRole] = useState<CrewRole>('joining');
  const [platform, setPlatform] = useState<TroubleshooterPlatform>('windows');
  const [connectionMethod, setConnectionMethod] = useState<ConnectionMethod>('quick-join');
  const [lobbyVisibility, setLobbyVisibility] = useState<LobbyVisibility>('not-sure');
  const [sameVersion, setSameVersion] = useState<'yes' | 'no' | 'not-sure'>('not-sure');
  const [steamOnline, setSteamOnline] = useState<'yes' | 'no' | 'not-sure'>('not-sure');
  const [submitted, setSubmitted] = useState(false);
  const result = getTroubleshooterResult(problem, role, platform, {
    connectionMethod,
    lobbyVisibility,
    sameVersion,
    steamOnline,
  });

  return (
    <div className="tool-shell">
      <form
        className="tool-form"
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(true);
          window.requestAnimationFrame(() => {
            document.querySelector<HTMLElement>('#tool-result')?.focus();
          });
        }}
      >
        <div className="tool-step">
          <label htmlFor="problem">1 · What is happening?</label>
          <select
            id="problem"
            onChange={(event) => {
              setProblem(event.target.value as ProblemType);
              setSubmitted(false);
            }}
            value={problem}
          >
            {problemOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <fieldset className="tool-step">
          <legend>2 · What was your role?</legend>
          <div className="choice-row">
            {[
              ['joining', 'Joining'],
              ['host', 'Host'],
              ['solo', 'Solo'],
            ].map(([value, label]) => (
              <label key={value}>
                <input
                  checked={role === value}
                  name="role"
                  onChange={() => {
                    setRole(value as CrewRole);
                    setSubmitted(false);
                  }}
                  type="radio"
                  value={value}
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="tool-step">
          <label htmlFor="connection-method">4 · Connection method</label>
          <select id="connection-method" onChange={(event) => { setConnectionMethod(event.target.value as ConnectionMethod); setSubmitted(false); }} value={connectionMethod}>
            <option value="quick-join">Quick Join</option>
            <option value="join-code">Join code</option>
            <option value="steam-invite">Steam invite</option>
          </select>
        </div>

        <div className="tool-step">
          <label htmlFor="lobby-visibility">5 · Lobby visibility</label>
          <select id="lobby-visibility" onChange={(event) => { setLobbyVisibility(event.target.value as LobbyVisibility); setSubmitted(false); }} value={lobbyVisibility}>
            <option value="not-sure">Not sure</option>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>

        <fieldset className="tool-step">
          <legend>6 · Same current version?</legend>
          <div className="choice-row">{(['yes', 'no', 'not-sure'] as const).map((value) => <label key={value}><input checked={sameVersion === value} name="same-version" onChange={() => { setSameVersion(value); setSubmitted(false); }} type="radio" /><span>{value === 'not-sure' ? 'Not sure' : value === 'yes' ? 'Yes' : 'No'}</span></label>)}</div>
        </fieldset>

        <fieldset className="tool-step">
          <legend>7 · Steam online?</legend>
          <div className="choice-row">{(['yes', 'no', 'not-sure'] as const).map((value) => <label key={value}><input checked={steamOnline === value} name="steam-online" onChange={() => { setSteamOnline(value); setSubmitted(false); }} type="radio" /><span>{value === 'not-sure' ? 'Not sure' : value === 'yes' ? 'Yes' : 'No'}</span></label>)}</div>
        </fieldset>

        <fieldset className="tool-step">
          <legend>3 · Platform context</legend>
          <div className="choice-row">
            {[
              ['windows', 'Windows PC'],
              ['steam-deck', 'Steam Deck'],
            ].map(([value, label]) => (
              <label key={value}>
                <input
                  checked={platform === value}
                  name="platform"
                  onChange={() => {
                    setPlatform(value as TroubleshooterPlatform);
                    setSubmitted(false);
                  }}
                  type="radio"
                  value={value}
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <button className="button button-primary" type="submit">
          Build my safe checklist
        </button>
      </form>

      {submitted ? (
        <section className="tool-result" id="tool-result" tabIndex={-1}>
          <div className="tool-result-head">
            <div>
              <p className="section-kicker">Source-backed result</p>
              <h2>{result.title}</h2>
            </div>
            <span>Checked {result.lastChecked}</span>
          </div>
          <p>{result.diagnosisScope}</p>
          <ol>
            {result.steps.map((step) => (
              <li key={`${step.order}-${step.title}`}>
                <span>{String(step.order).padStart(2, '0')}</span>
                <div>
                  <div className="tool-step-heading">
                    <h3>{step.title}</h3>
                    {step.basis === 'official' ? (
                      <EvidenceBadge confidence="confirmed" compact />
                    ) : (
                      <span className="standard-badge">STANDARD · REVERSIBLE</span>
                    )}
                  </div>
                  <p>{step.instruction}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="tool-related">
            <strong>Read next</strong>
            {result.relatedGuides.map((guide) => (
              <Link href={guide.href} key={guide.href}>
                {guide.label} <span aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </section>
      ) : (
        <div className="tool-empty" aria-live="polite">
          <p className="section-kicker">Waiting for context</p>
          <p>Choose the symptom, crew role, and platform, then generate the checklist.</p>
        </div>
      )}
    </div>
  );
}
