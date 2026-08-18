'use client';

import { useEffect, useReducer, useRef } from 'react';

import {
  ADSTERRA_CONFIG,
  isAdsterraProductionHost,
  isMonetizedPublicRoute,
} from './ad-config';
import { reduceAdLoadState, watchProviderCreative } from './ad-runtime';

export function AdsterraNative({ pathname }: { pathname: string }) {
  const creativeRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);
  const [state, dispatch] = useReducer(reduceAdLoadState, 'off');

  useEffect(() => {
    if (
      !isAdsterraProductionHost(window.location.hostname) ||
      !isMonetizedPublicRoute(pathname) ||
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
  }, [pathname]);

  return (
    <aside
      aria-label="Advertisement"
      className="ad-slot ad-slot-native"
      data-ad-placement="article_mid"
      data-ad-route={pathname}
      data-ad-state={state}
    >
      <span className="ad-slot-label">Advertisement</span>
      <div className="ad-creative ad-native-creative" ref={creativeRef} />
    </aside>
  );
}
