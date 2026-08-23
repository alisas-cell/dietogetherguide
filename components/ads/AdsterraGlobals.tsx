'use client';

import { useEffect } from 'react';

import {
  ADSTERRA_CONFIG,
  canInitializeAdsterra,
  isAdDebugSearch,
} from './ad-config';
import { usePrivacyConsent } from '../privacy/ConsentProvider';

const globalScripts = [
  ['popunder', ADSTERRA_CONFIG.globals.popunder.scriptUrl],
  ['social_bar', ADSTERRA_CONFIG.globals.socialBar.scriptUrl],
] as const;

export function AdsterraGlobals({ pathname }: { pathname: string }) {
  const { canLoadAds } = usePrivacyConsent();

  useEffect(() => {
    const debugMode = isAdDebugSearch(window.location.search);
    if (
      !canInitializeAdsterra({
        debugMode,
        hostname: window.location.hostname,
        pathname,
        privacyAllowsAds: canLoadAds,
      })
    ) {
      return;
    }

    for (const [format, scriptUrl] of globalScripts) {
      if (document.querySelector(`script[data-adsterra-global="${format}"]`)) {
        continue;
      }

      const script = document.createElement('script');
      script.async = false;
      script.src = scriptUrl;
      script.setAttribute('data-adsterra-global', format);
      script.setAttribute('data-adsterra-state', 'loading');
      script.onload = () => script.setAttribute('data-adsterra-state', 'ready');
      script.onerror = () => script.setAttribute('data-adsterra-state', 'failed');
      document.body.append(script);
    }
  }, [canLoadAds, pathname]);

  return null;
}
