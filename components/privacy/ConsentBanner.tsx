'use client';

import Link from 'next/link';
import { useEffect } from 'react';

import type { AdvertisingConsent } from '../../lib/privacy/consent-types';

export function ConsentBanner({
  consent,
  isOpen,
  mustChoose,
  onAccept,
  onClose,
  onReject,
  persistenceError = null,
}: {
  consent: AdvertisingConsent;
  isOpen: boolean;
  mustChoose: boolean;
  onAccept: () => void;
  onClose: () => void;
  onReject: () => void;
  persistenceError?: string | null;
}) {
  useEffect(() => {
    if (!isOpen || mustChoose) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [isOpen, mustChoose, onClose]);

  if (!isOpen) return null;

  const currentChoice =
    consent === 'granted'
      ? 'Current choice: advertising accepted.'
      : consent === 'rejected'
        ? 'Current choice: non-essential advertising rejected.'
        : null;

  return (
    <section
      aria-labelledby="privacy-panel-title"
      aria-live="polite"
      className="privacy-panel"
      data-consent-state={consent}
    >
      <div className="privacy-panel-copy">
        <p className="privacy-panel-kicker">Privacy control</p>
        <h2 id="privacy-panel-title">Your advertising choices</h2>
        <p>
          This site uses third-party advertising. If you accept, Adsterra may use
          cookies or similar identifiers to deliver and measure ads. The guide works
          without non-essential advertising. <Link href="/privacy">Privacy Policy</Link>
        </p>
        {persistenceError ? (
          <p className="privacy-panel-error" role="alert">
            {persistenceError}
          </p>
        ) : currentChoice ? (
          <p className="privacy-panel-status">{currentChoice}</p>
        ) : null}
      </div>

      <div className="privacy-panel-actions">
        <button className="privacy-action privacy-action-reject" onClick={onReject} type="button">
          Reject non-essential
        </button>
        <button className="privacy-action privacy-action-accept" onClick={onAccept} type="button">
          Accept advertising
        </button>
      </div>

      {!mustChoose ? (
        <button
          aria-label="Close privacy choices"
          className="privacy-panel-close"
          onClick={onClose}
          type="button"
        >
          Close
        </button>
      ) : null}
    </section>
  );
}
