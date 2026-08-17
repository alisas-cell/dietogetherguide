'use client';

import Link from 'next/link';
import { useState } from 'react';

import {
  getTroubleshooterResult,
  problemOptions,
  type CrewRole,
  type ProblemType,
  type TroubleshooterPlatform,
} from '../../data/troubleshooter';
import { EvidenceBadge } from '../evidence/EvidenceBadge';

export function CoopTroubleshooter() {
  const [problem, setProblem] = useState<ProblemType>('quick-join-fails');
  const [role, setRole] = useState<CrewRole>('joining');
  const [platform, setPlatform] = useState<TroubleshooterPlatform>('windows');
  const [submitted, setSubmitted] = useState(false);
  const result = getTroubleshooterResult(problem, role, platform);

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
