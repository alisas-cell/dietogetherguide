'use client';

import {
  getRouteMonetization,
  isAdDebugSearch,
  selectBannerUnit,
  type AdPlacement,
} from './ad-config';
import { useBrowserAdEnvironment } from './ad-runtime';

function formatPlacement(placement: AdPlacement, viewportWidth: number): string {
  if (placement === 'native_primary') return 'native';
  if (placement === 'smartlink_primary') return 'smartlink · click only';
  const unit = selectBannerUnit(placement, viewportWidth);
  return unit
    ? `${unit.width}x${unit.height} · eligible at ${viewportWidth}px`
    : `not requested at ${viewportWidth}px`;
}

export function AdDebugPanel({ pathname }: { pathname: string }) {
  const browser = useBrowserAdEnvironment();
  const debug = isAdDebugSearch(browser.search);
  const viewportWidth = browser.viewportWidth;
  const plan = getRouteMonetization(pathname);

  if (!debug) return null;

  return (
    <aside className="ad-debug-panel" data-ad-debug-panel aria-label="Ad debug">
      <strong>AD DEBUG · NETWORK OFF</strong>
      <dl>
        <div><dt>Route</dt><dd>{pathname}</dd></div>
        <div><dt>Page class</dt><dd>{plan?.pageClass ?? 'unknown'}</dd></div>
        <div><dt>Mode</dt><dd>{plan?.mode ?? 'off'}</dd></div>
        <div><dt>Status</dt><dd>{plan?.eligible ? 'eligible' : 'excluded'}</dd></div>
        <div><dt>Breakpoint</dt><dd>{viewportWidth}px</dd></div>
      </dl>
      {plan?.eligible ? (
        <ul>
          <li>popunder · singleton</li>
          <li>social_bar · singleton</li>
          {plan.placements.map((placement) => (
            <li key={placement}>
              {placement} · {formatPlacement(placement, viewportWidth)}
            </li>
          ))}
        </ul>
      ) : (
        <p>No provider placement is eligible on this route.</p>
      )}
    </aside>
  );
}
