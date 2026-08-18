import {
  CONSENT_COOKIE_KEY,
  CONSENT_POLICY_VERSION,
  type AdvertisingConsent,
  type StoredConsent,
} from './consent-types';

export function parseStoredConsent(storedValue: string | null): AdvertisingConsent {
  if (!storedValue) return 'unknown';

  try {
    const parsed: unknown = JSON.parse(storedValue);
    if (!parsed || typeof parsed !== 'object') return 'unknown';

    const candidate = parsed as Partial<StoredConsent>;
    if (
      candidate.policyVersion !== CONSENT_POLICY_VERSION ||
      (candidate.advertising !== 'granted' && candidate.advertising !== 'rejected')
    ) {
      return 'unknown';
    }

    return candidate.advertising;
  } catch {
    return 'unknown';
  }
}

export function serializeConsent(consent: AdvertisingConsent): string {
  if (consent === 'unknown') {
    throw new Error('Only an explicit advertising decision can be persisted.');
  }

  const record: StoredConsent = {
    policyVersion: CONSENT_POLICY_VERSION,
    advertising: consent,
  };

  return JSON.stringify(record);
}

export function serializeConsentCookie(consent: AdvertisingConsent): string {
  return `${CONSENT_COOKIE_KEY}=${encodeURIComponent(serializeConsent(consent))}; Path=/; Max-Age=31536000; SameSite=Lax; Secure`;
}

export function parseConsentCookie(cookieHeader: string): AdvertisingConsent {
  const cookiePrefix = `${CONSENT_COOKIE_KEY}=`;
  const encodedValue = cookieHeader
    .split(';')
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(cookiePrefix))
    ?.slice(cookiePrefix.length);

  if (!encodedValue) return 'unknown';

  try {
    return parseStoredConsent(decodeURIComponent(encodedValue));
  } catch {
    return 'unknown';
  }
}

export function readPersistedConsent({
  cookieHeader,
  localStorageValue,
}: {
  cookieHeader: string;
  localStorageValue: string | null;
}): AdvertisingConsent {
  const cookieConsent = parseConsentCookie(cookieHeader);
  const localConsent = parseStoredConsent(localStorageValue);

  if (cookieConsent === 'rejected' || localConsent === 'rejected') {
    return 'rejected';
  }
  if (cookieConsent === 'granted' || localConsent === 'granted') {
    return 'granted';
  }
  return 'unknown';
}

export function canInitializeAdvertising({
  consent,
  regionResolved,
  requiresConsent,
}: {
  consent: AdvertisingConsent;
  regionResolved: boolean;
  requiresConsent: boolean;
}): boolean {
  if (!regionResolved || consent === 'rejected') return false;
  if (consent === 'granted') return true;
  return !requiresConsent;
}
