'use client';

import { useEffect, useReducer, useRef, useState } from 'react';

import {
  ADSTERRA_CONFIG,
  type ResponsiveAdUnit,
  canInitializeAdsterra,
  selectResponsiveUnit,
} from './ad-config';
import { useIntentionalAdQaSession } from './ad-qa-runtime';
import { reduceAdLoadState, watchProviderCreative } from './ad-runtime';
import { usePrivacyConsent } from '../privacy/ConsentProvider';

type AdsterraWindow = Window & {
  atOptions?: Omit<ResponsiveAdUnit, 'scriptUrl'>;
};

export function AdsterraResponsiveBanner({ pathname }: { pathname: string }) {
  const creativeRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);
  const [state, dispatch] = useReducer(reduceAdLoadState, 'off');
  const [unit, setUnit] = useState<ResponsiveAdUnit | null>(null);
  const qaMode = useIntentionalAdQaSession(pathname);
  const { canLoadAds } = usePrivacyConsent();
  const renderedUnit = qaMode ? selectResponsiveUnit(window.innerWidth) : unit;

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
    const selectedUnit = selectResponsiveUnit(window.innerWidth);
    setUnit(selectedUnit);
    dispatch('activate');

    const creative = creativeRef.current;
    const providerWindow = window as AdsterraWindow;
    providerWindow.atOptions = {
      key: selectedUnit.key,
      format: selectedUnit.format,
      height: selectedUnit.height,
      width: selectedUnit.width,
      params: {},
    };

    const watch = watchProviderCreative({
      container: creative,
      onCreative: () => dispatch('creative'),
      onFailure: () => dispatch('fail'),
      timeoutMs: ADSTERRA_CONFIG.noFillTimeoutMs,
    });

    const script = document.createElement('script');
    script.async = false;
    script.src = selectedUnit.scriptUrl;
    script.setAttribute('data-adsterra-unit', selectedUnit.key);
    script.onerror = watch.fail;
    creative.append(script);

    return () => {
      watch.dispose();
      script.onerror = null;
      creative.replaceChildren();
      if (providerWindow.atOptions?.key === selectedUnit.key) {
        delete providerWindow.atOptions;
      }
      initializedRef.current = false;
    };
  }, [canLoadAds, pathname, qaMode]);

  return (
    <aside
      aria-label="Advertisement"
      className="ad-slot ad-slot-responsive"
      data-ad-height={renderedUnit?.height}
      data-ad-mode={qaMode ? 'qa' : undefined}
      data-ad-placement="responsive_banner"
      data-ad-placement-id={qaMode ? renderedUnit?.key : undefined}
      data-ad-route={pathname}
      data-ad-state={qaMode ? 'qa' : canLoadAds ? state : 'off'}
      data-responsive-variant={
        renderedUnit
          ? renderedUnit.key === ADSTERRA_CONFIG.responsive.desktop.key
            ? 'desktop'
            : 'mobile'
          : undefined
      }
      data-ad-width={renderedUnit?.width}
    >
      <span className="ad-slot-label">Advertisement</span>
      <div
        className="ad-creative ad-responsive-creative"
        data-ad-qa-placeholder={qaMode ? '' : undefined}
        ref={creativeRef}
      />
    </aside>
  );
}
