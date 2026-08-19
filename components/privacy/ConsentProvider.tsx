'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  canInitializeAdvertising,
  parseConsentCookie,
  parseStoredConsent,
  readPersistedConsent,
  serializeConsent,
  serializeConsentCookie,
} from '../../lib/privacy/consent';
import {
  CONSENT_BROADCAST_CHANNEL,
  CONSENT_POLICY_VERSION,
  CONSENT_STORAGE_KEY,
  PRIVACY_REGION_TIMEOUT_MS,
  type AdvertisingConsent,
} from '../../lib/privacy/consent-types';
import { ConsentBanner } from './ConsentBanner';

interface PrivacyConsentContextValue {
  readonly canLoadAds: boolean;
  readonly consent: AdvertisingConsent;
  readonly openChoices: (trigger?: HTMLElement) => void;
}

const safeDefaultContext: PrivacyConsentContextValue = {
  canLoadAds: false,
  consent: 'unknown',
  openChoices: () => undefined,
};

const PrivacyConsentContext = createContext<PrivacyConsentContextValue>(safeDefaultContext);

function readBrowserConsent(): AdvertisingConsent {
  let localStorageValue: string | null = null;
  let cookieHeader = '';
  try {
    localStorageValue = window.localStorage.getItem(CONSENT_STORAGE_KEY);
  } catch {
    // A verified first-party cookie can still preserve the privacy choice.
  }
  try {
    cookieHeader = document.cookie;
  } catch {
    // Missing browser storage resolves to an unknown, fail-closed choice.
  }

  return readPersistedConsent({
    cookieHeader,
    localStorageValue,
  });
}

function writeFallbackCookie(
  consent: Exclude<AdvertisingConsent, 'unknown'>,
): boolean {
  try {
    document.cookie = serializeConsentCookie(consent);
    return parseConsentCookie(document.cookie) === consent;
  } catch {
    return false;
  }
}

function persistConsent(consent: Exclude<AdvertisingConsent, 'unknown'>): boolean {
  let existingCookieConsent: AdvertisingConsent = 'unknown';
  try {
    existingCookieConsent = parseConsentCookie(document.cookie);
  } catch {
    // localStorage may still be writable.
  }
  let localStoragePersisted = false;

  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, serializeConsent(consent));
    localStoragePersisted =
      parseStoredConsent(window.localStorage.getItem(CONSENT_STORAGE_KEY)) === consent;
  } catch {
    localStoragePersisted = false;
  }

  if (!localStoragePersisted || existingCookieConsent !== 'unknown') {
    writeFallbackCookie(consent);
  }

  return readBrowserConsent() === consent;
}

function broadcastConsent(consent: Exclude<AdvertisingConsent, 'unknown'>) {
  if (!('BroadcastChannel' in window)) return;

  const channel = new BroadcastChannel(CONSENT_BROADCAST_CHANNEL);
  channel.postMessage({
    advertising: consent,
    policyVersion: CONSENT_POLICY_VERSION,
  });
  channel.close();
}

function readInitialConsent(): AdvertisingConsent {
  if (typeof window === 'undefined') return 'unknown';

  try {
    return readBrowserConsent();
  } catch {
    return 'unknown';
  }
}

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<AdvertisingConsent>(readInitialConsent);
  const [regionResolved, setRegionResolved] = useState(false);
  const [requiresConsent, setRequiresConsent] = useState(true);
  const [managementOpen, setManagementOpen] = useState(false);
  const [persistenceError, setPersistenceError] = useState<string | null>(null);
  const externalReloadScheduledRef = useRef(false);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    let disposed = false;
    const timeoutId = window.setTimeout(
      () => controller.abort(),
      PRIVACY_REGION_TIMEOUT_MS,
    );

    async function resolveRegion() {
      try {
        const response = await fetch('/api/privacy-region', {
          cache: 'no-store',
          credentials: 'same-origin',
          signal: controller.signal,
        });
        if (!response.ok) throw new Error('Privacy region unavailable');

        const result: unknown = await response.json();
        if (
          !result ||
          typeof result !== 'object' ||
          typeof (result as { requiresConsent?: unknown }).requiresConsent !== 'boolean'
        ) {
          throw new Error('Invalid privacy region response');
        }

        setRequiresConsent(
          (result as { requiresConsent: boolean }).requiresConsent,
        );
      } catch {
        if (disposed) return;
        setRequiresConsent(true);
      } finally {
        window.clearTimeout(timeoutId);
        if (!disposed) setRegionResolved(true);
      }
    }

    void resolveRegion();
    return () => {
      disposed = true;
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, []);

  const privacyResolved = regionResolved;
  const canLoadAds = canInitializeAdvertising({
    consent,
    regionResolved: privacyResolved,
    requiresConsent,
  });
  const mustChoose =
    privacyResolved && requiresConsent && consent === 'unknown';
  const panelOpen = mustChoose || managementOpen;

  const closeChoices = useCallback(() => {
    const returnFocusTarget =
      returnFocusRef.current ?? document.getElementById('main-content');
    returnFocusRef.current = null;
    setManagementOpen(false);
    queueMicrotask(() => returnFocusTarget?.focus());
  }, []);
  const accept = useCallback(() => {
    if (!persistConsent('granted')) {
      setPersistenceError(
        'This choice could not be saved. Check browser storage settings and try again.',
      );
      return;
    }

    setPersistenceError(null);
    setConsent('granted');
    broadcastConsent('granted');
    closeChoices();
  }, [closeChoices]);
  const reject = useCallback(() => {
    const persisted = persistConsent('rejected');
    setConsent('rejected');

    if (!persisted) {
      setPersistenceError(
        'Advertising is off for this page, but the choice could not be saved. Check browser storage settings and try again.',
      );
      setManagementOpen(true);
      return;
    }

    setPersistenceError(null);
    broadcastConsent('rejected');

    if (canLoadAds) {
      window.location.reload();
      return;
    }

    closeChoices();
  }, [canLoadAds, closeChoices]);

  useEffect(() => {
    const applyExternalConsent = (nextConsent: AdvertisingConsent) => {
      if (nextConsent === 'unknown') return;
      setPersistenceError(null);

      if (nextConsent === 'rejected' && canLoadAds) {
        if (!externalReloadScheduledRef.current) {
          externalReloadScheduledRef.current = true;
          window.location.reload();
        }
        return;
      }

      setConsent(nextConsent);
      setManagementOpen(false);
    };

    const handleStorage = (event: StorageEvent) => {
      if (event.key === CONSENT_STORAGE_KEY) {
        applyExternalConsent(readBrowserConsent());
      }
    };
    window.addEventListener('storage', handleStorage);

    const channel =
      'BroadcastChannel' in window
        ? new BroadcastChannel(CONSENT_BROADCAST_CHANNEL)
        : null;
    if (channel) {
      channel.onmessage = (event: MessageEvent<unknown>) => {
        const payload = event.data as {
          advertising?: unknown;
          policyVersion?: unknown;
        } | null;
        if (
          payload?.policyVersion === CONSENT_POLICY_VERSION &&
          (payload.advertising === 'granted' || payload.advertising === 'rejected')
        ) {
          applyExternalConsent(payload.advertising);
        }
      };
    }

    return () => {
      window.removeEventListener('storage', handleStorage);
      channel?.close();
    };
  }, [canLoadAds]);

  const contextValue = useMemo<PrivacyConsentContextValue>(
    () => ({
      canLoadAds,
      consent,
      openChoices: (trigger?: HTMLElement) => {
        returnFocusRef.current = trigger ?? null;
        setPersistenceError(null);
        setManagementOpen(true);
      },
    }),
    [canLoadAds, consent],
  );

  return (
    <PrivacyConsentContext.Provider value={contextValue}>
      {children}
      <ConsentBanner
        consent={consent}
        isOpen={panelOpen}
        mustChoose={mustChoose}
        onAccept={accept}
        onClose={closeChoices}
        onReject={reject}
        persistenceError={persistenceError}
      />
    </PrivacyConsentContext.Provider>
  );
}

export function usePrivacyConsent(): PrivacyConsentContextValue {
  return useContext(PrivacyConsentContext);
}
