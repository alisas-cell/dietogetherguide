'use client';

import {
  ADSTERRA_CONFIG,
  canInitializeAdsterra,
  isAdDebugSearch,
  routeHasPlacement,
} from './ad-config';
import { useBrowserAdEnvironment } from './ad-runtime';
import { usePrivacyConsent } from '../privacy/ConsentProvider';

type SmartlinkState = 'off' | 'debug' | 'ready';

export function SponsoredSmartlink({ pathname }: { pathname: string }) {
  const { canLoadAds } = usePrivacyConsent();
  const browser = useBrowserAdEnvironment();
  const debugMode = isAdDebugSearch(browser.search);
  const placementEnabled = routeHasPlacement(pathname, 'smartlink_primary');
  let state: SmartlinkState = 'off';
  if (debugMode && placementEnabled) {
    state = 'debug';
  } else if (
    placementEnabled &&
    canInitializeAdsterra({
      debugMode,
      hostname: browser.hostname,
      pathname,
      privacyAllowsAds: canLoadAds,
    })
  ) {
    state = 'ready';
  }

  return (
    <aside
      aria-label="Sponsored recommendation"
      className="ad-slot ad-slot-smartlink"
      data-ad-format="smartlink"
      data-ad-placement="smartlink_primary"
      data-ad-route={pathname}
      data-ad-state={state}
    >
      <span className="ad-slot-label">Sponsored</span>
      {state === 'ready' ? (
        <a
          className="sponsored-resource"
          href={ADSTERRA_CONFIG.smartlink.url}
          rel="nofollow noopener noreferrer sponsored"
          target="_blank"
        >
          {ADSTERRA_CONFIG.smartlink.label}
          <span aria-hidden="true">↗</span>
        </a>
      ) : (
        <span className="sponsored-resource sponsored-resource-inactive">
          {ADSTERRA_CONFIG.smartlink.label}
        </span>
      )}
    </aside>
  );
}
