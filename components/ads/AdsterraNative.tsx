'use client';

import { useEffect, useReducer, useRef } from 'react';

import {
  ADSTERRA_CONFIG,
  ADSTERRA_NATIVE_MIN_HEIGHT,
  ADSTERRA_NATIVE_PLACEMENT_ID,
  canInitializeAdsterra,
} from './ad-config';
import { useIntentionalAdQaSession } from './ad-qa-runtime';
import { reduceAdLoadState, watchProviderCreative } from './ad-runtime';
import { usePrivacyConsent } from '../privacy/ConsentProvider';

export function AdsterraNative({ pathname }: { pathname: string }) {
  const creativeRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);
  const [state, dispatch] = useReducer(reduceAdLoadState, 'off');
  const qaMode = useIntentionalAdQaSession(pathname);
  const { canLoadAds } = usePrivacyConsent();

  useEffect(() => {
    const cookieHeader = document.cookie;
    if (qaMode) return;

    if (
      !canInitializeAdsterra({
        hostname: window.location.hostname,
        pathname,
        privacyAllowsAds: canLoadAds,
        cookieHeader,
      }) ||
      initializedRef.current ||
      !creativeRef.current
    ) {
      return;
    }

    initializedRef.current = true;
    dispatch('activate');

    const creative = creativeRef.current;
    const providerContainer = document.createElement('div');
    providerContainer.id = ADSTERRA_CONFIG.native.containerId;
    creative.append(providerContainer);

    const watch = watchProviderCreative({
      container: providerContainer,
      onCreative: () => dispatch('creative'),
      onFailure: () => dispatch('fail'),
      timeoutMs: ADSTERRA_CONFIG.noFillTimeoutMs,
    });

    const script = document.createElement('script');
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.src = ADSTERRA_CONFIG.native.scriptUrl;
    script.onerror = watch.fail;
    creative.append(script);

    return () => {
      watch.dispose();
      script.onerror = null;
      creative.replaceChildren();
      initializedRef.current = false;
    };
  }, [canLoadAds, pathname, qaMode]);

  return (
    <aside
      aria-label="Advertisement"
      className="ad-slot ad-slot-native"
      data-ad-placement="article_mid"
      data-ad-placement-id={qaMode ? ADSTERRA_NATIVE_PLACEMENT_ID : undefined}
      data-ad-route={pathname}
      data-ad-mode={qaMode ? 'qa' : undefined}
      data-ad-state={qaMode ? 'qa' : canLoadAds ? state : 'off'}
      data-ad-height={qaMode ? ADSTERRA_NATIVE_MIN_HEIGHT : undefined}
    >
      <span className="ad-slot-label">Advertisement</span>
      <div
        className="ad-creative ad-native-creative"
        data-ad-qa-placeholder={qaMode ? '' : undefined}
        ref={creativeRef}
      />
    </aside>
  );
}
