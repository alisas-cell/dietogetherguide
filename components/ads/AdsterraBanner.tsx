'use client';

import { useEffect, useReducer, useRef } from 'react';

import {
  ADSTERRA_CONFIG,
  type BannerPlacement,
  canInitializeAdsterra,
  isAdDebugSearch,
  routeHasPlacement,
  selectBannerUnit,
} from './ad-config';
import {
  enqueueBannerLoad,
  reduceAdLoadState,
  useInitialBrowserAdEnvironment,
  watchProviderCreative,
  type AdCreativeWatch,
} from './ad-runtime';
import { usePrivacyConsent } from '../privacy/ConsentProvider';

const intendedFormatByPlacement = {
  early_responsive: 'responsive',
  rectangle_300: '300x250',
  horizontal_468: '468x60',
  sidebar_160x300: '160x300',
  sidebar_160x600: '160x600',
} as const;

export function AdsterraBanner({
  pathname,
  placement,
}: {
  pathname: string;
  placement: BannerPlacement;
}) {
  const creativeRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);
  const [state, dispatch] = useReducer(reduceAdLoadState, 'off');
  const { canLoadAds } = usePrivacyConsent();
  const browser = useInitialBrowserAdEnvironment();
  const debugMode = isAdDebugSearch(browser.search);
  const unit = selectBannerUnit(placement, browser.viewportWidth);
  const placementEnabled = routeHasPlacement(pathname, placement);

  useEffect(() => {
    dispatch('reset');
    if (debugMode && placementEnabled) {
      dispatch(unit ? 'debug' : 'exclude');
      return;
    }
    if (browser.hydrated && !unit) {
      dispatch('exclude');
      return;
    }
    if (
      !unit ||
      !canInitializeAdsterra({
        debugMode,
        hostname: browser.hostname,
        pathname,
        privacyAllowsAds: canLoadAds,
      }) ||
      !placementEnabled ||
      initializedRef.current ||
      !creativeRef.current
    ) {
      return;
    }

    initializedRef.current = true;
    dispatch('activate');

    const creative = creativeRef.current;
    let watch: AdCreativeWatch | null = null;
    const queuedLoad = enqueueBannerLoad({
      container: creative,
      onScriptError: () => watch?.fail(),
      onStart: () => {
        watch = watchProviderCreative({
          container: creative,
          onCreative: () => dispatch('creative'),
          onFailure: () => dispatch('fail'),
          timeoutMs: ADSTERRA_CONFIG.noFillTimeoutMs,
        });
      },
      timeoutMs: ADSTERRA_CONFIG.noFillTimeoutMs,
      unit,
    });

    return () => {
      queuedLoad.cancel();
      watch?.dispose();
      creative.replaceChildren();
      initializedRef.current = false;
    };
  }, [
    browser.hostname,
    browser.hydrated,
    canLoadAds,
    debugMode,
    pathname,
    placementEnabled,
    unit,
  ]);

  return (
    <aside
      aria-label="Advertisement"
      className={`ad-slot ad-slot-banner ad-slot-${placement}`}
      data-ad-format={intendedFormatByPlacement[placement]}
      data-ad-height={unit?.height}
      data-ad-placement={placement}
      data-ad-route={pathname}
      data-ad-state={state}
      data-ad-width={unit?.width}
    >
      <span className="ad-slot-label">Advertisement</span>
      <div className="ad-creative ad-banner-creative" ref={creativeRef} />
    </aside>
  );
}
