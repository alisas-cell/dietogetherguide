'use client';

import { useEffect, useReducer, useRef } from 'react';

import {
  ADSTERRA_CONFIG,
  canInitializeAdsterra,
} from './ad-config';
import { reduceAdLoadState, watchProviderCreative } from './ad-runtime';
import { usePrivacyConsent } from '../privacy/ConsentProvider';

export function AdsterraNative({ pathname }: { pathname: string }) {
  const creativeRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);
  const [state, dispatch] = useReducer(reduceAdLoadState, 'off');
  const { canLoadAds } = usePrivacyConsent();

  useEffect(() => {
    if (
      !canInitializeAdsterra({
        hostname: window.location.hostname,
        pathname,
        privacyAllowsAds: canLoadAds,
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
  }, [canLoadAds, pathname]);

  return (
    <aside
      aria-label="Advertisement"
      className="ad-slot ad-slot-native"
      data-ad-placement="article_mid"
      data-ad-route={pathname}
      data-ad-state={canLoadAds ? state : 'off'}
    >
      <span className="ad-slot-label">Advertisement</span>
      <div className="ad-creative ad-native-creative" ref={creativeRef} />
    </aside>
  );
}
