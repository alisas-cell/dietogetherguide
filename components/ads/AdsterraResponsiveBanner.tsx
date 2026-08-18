'use client';

import { useEffect, useReducer, useRef, useState } from 'react';

import {
  ADSTERRA_CONFIG,
  type ResponsiveAdUnit,
  isAdsterraProductionHost,
  isMonetizedPublicRoute,
  selectResponsiveUnit,
} from './ad-config';
import { reduceAdLoadState, watchProviderCreative } from './ad-runtime';

type AdsterraWindow = Window & {
  atOptions?: Omit<ResponsiveAdUnit, 'scriptUrl'>;
};

export function AdsterraResponsiveBanner({ pathname }: { pathname: string }) {
  const creativeRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);
  const [state, dispatch] = useReducer(reduceAdLoadState, 'off');
  const [unit, setUnit] = useState<ResponsiveAdUnit | null>(null);

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
  }, [pathname]);

  return (
    <aside
      aria-label="Advertisement"
      className="ad-slot ad-slot-responsive"
      data-ad-height={unit?.height}
      data-ad-placement="responsive_banner"
      data-ad-route={pathname}
      data-ad-state={state}
      data-ad-width={unit?.width}
    >
      <span className="ad-slot-label">Advertisement</span>
      <div className="ad-creative ad-responsive-creative" ref={creativeRef} />
    </aside>
  );
}
