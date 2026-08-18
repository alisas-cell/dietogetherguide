import { describe, expect, it } from 'vitest';

import {
  canInitializeAdvertising,
  parseConsentCookie,
  parseStoredConsent,
  readPersistedConsent,
  serializeConsentCookie,
  serializeConsent,
} from '../../lib/privacy/consent';
import {
  CONSENT_POLICY_VERSION,
  CONSENT_COOKIE_KEY,
  type AdvertisingConsent,
} from '../../lib/privacy/consent-types';

describe('versioned consent persistence', () => {
  it.each([null, '', 'not json', '{}', '{"advertising":"granted"}']) (
    'treats missing or malformed storage as unknown',
    (storedValue) => {
      expect(parseStoredConsent(storedValue)).toBe('unknown');
    },
  );

  it('round-trips accept and reject decisions for returning visitors', () => {
    expect(parseStoredConsent(serializeConsent('granted'))).toBe('granted');
    expect(parseStoredConsent(serializeConsent('rejected'))).toBe('rejected');
  });

  it('invalidates a preference from an earlier policy version', () => {
    expect(
      parseStoredConsent(
        JSON.stringify({ policyVersion: CONSENT_POLICY_VERSION - 1, advertising: 'granted' }),
      ),
    ).toBe('unknown');
  });

  it('never persists an unknown non-decision', () => {
    expect(() => serializeConsent('unknown')).toThrow(/explicit/i);
  });

  it('round-trips a versioned fallback cookie without reading unrelated cookies', () => {
    const cookie = serializeConsentCookie('rejected').split(';', 1)[0] ?? '';

    expect(cookie).toContain(`${CONSENT_COOKIE_KEY}=`);
    expect(parseConsentCookie(`theme=dark; ${cookie}; session=opaque`)).toBe(
      'rejected',
    );
    expect(parseConsentCookie('theme=dark; session=opaque')).toBe('unknown');
  });

  it('lets a verified fallback cookie override a stale local preference', () => {
    expect(
      readPersistedConsent({
        cookieHeader: serializeConsentCookie('rejected').split(';', 1)[0] ?? '',
        localStorageValue: serializeConsent('granted'),
      }),
    ).toBe('rejected');
  });

  it('always makes rejection win a conflict between persistence mechanisms', () => {
    const grantedCookie = serializeConsentCookie('granted').split(';', 1)[0] ?? '';
    const rejectedCookie = serializeConsentCookie('rejected').split(';', 1)[0] ?? '';

    expect(
      readPersistedConsent({
        cookieHeader: grantedCookie,
        localStorageValue: serializeConsent('rejected'),
      }),
    ).toBe('rejected');
    expect(
      readPersistedConsent({
        cookieHeader: rejectedCookie,
        localStorageValue: serializeConsent('granted'),
      }),
    ).toBe('rejected');
  });
});

describe('advertising eligibility', () => {
  const mayLoad = (
    consent: AdvertisingConsent,
    requiresConsent: boolean,
    regionResolved = true,
  ) => canInitializeAdvertising({ consent, regionResolved, requiresConsent });

  it('blocks while the privacy-region decision is unresolved', () => {
    expect(mayLoad('granted', false, false)).toBe(false);
    expect(mayLoad('unknown', false, false)).toBe(false);
  });

  it('blocks a required region before a choice and after rejection', () => {
    expect(mayLoad('unknown', true)).toBe(false);
    expect(mayLoad('rejected', true)).toBe(false);
  });

  it('allows a required region after acceptance', () => {
    expect(mayLoad('granted', true)).toBe(true);
  });

  it('preserves normal advertising for an undecided non-gated visitor', () => {
    expect(mayLoad('unknown', false)).toBe(true);
  });

  it('honors an explicit rejection even outside the required scope', () => {
    expect(mayLoad('rejected', false)).toBe(false);
  });

  it('supports revoke and re-grant transitions without ambiguous state', () => {
    expect(mayLoad('granted', true)).toBe(true);
    expect(mayLoad('rejected', true)).toBe(false);
    expect(mayLoad('granted', true)).toBe(true);
  });
});
