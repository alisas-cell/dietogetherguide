import { useSyncExternalStore } from 'react';

import type { BannerAdUnit } from './ad-config';

const serverBrowserSnapshot = '\n\n0';
let initialViewportWidth: number | null = null;

function subscribeToBrowserEnvironment(onStoreChange: () => void) {
  window.addEventListener('resize', onStoreChange);
  window.addEventListener('popstate', onStoreChange);
  return () => {
    window.removeEventListener('resize', onStoreChange);
    window.removeEventListener('popstate', onStoreChange);
  };
}

function getBrowserSnapshot(): string {
  return `${window.location.hostname}\n${window.location.search}\n${window.innerWidth}`;
}

function subscribeToInitialBrowserEnvironment(onStoreChange: () => void) {
  window.addEventListener('popstate', onStoreChange);
  return () => window.removeEventListener('popstate', onStoreChange);
}

function getInitialBrowserSnapshot(): string {
  initialViewportWidth ??= window.innerWidth;
  return `${window.location.hostname}\n${window.location.search}\n${initialViewportWidth}`;
}

function getServerBrowserSnapshot(): string {
  return serverBrowserSnapshot;
}

function parseBrowserSnapshot(snapshot: string) {
  const [hostname = '', search = '', width = '0'] = snapshot.split('\n');
  return {
    hostname,
    hydrated: snapshot !== serverBrowserSnapshot,
    search,
    viewportWidth: Number(width),
  };
}

export function useBrowserAdEnvironment() {
  return parseBrowserSnapshot(
    useSyncExternalStore(
      subscribeToBrowserEnvironment,
      getBrowserSnapshot,
      getServerBrowserSnapshot,
    ),
  );
}

export function useInitialBrowserAdEnvironment() {
  return parseBrowserSnapshot(
    useSyncExternalStore(
      subscribeToInitialBrowserEnvironment,
      getInitialBrowserSnapshot,
      getServerBrowserSnapshot,
    ),
  );
}

export type AdLoadState =
  | 'off'
  | 'debug'
  | 'excluded'
  | 'loading'
  | 'ready'
  | 'failed';
export type AdLoadEvent =
  | 'reset'
  | 'debug'
  | 'exclude'
  | 'activate'
  | 'creative'
  | 'fail';

export function reduceAdLoadState(
  state: AdLoadState,
  event: AdLoadEvent,
): AdLoadState {
  if (event === 'reset') return 'off';
  if (state === 'failed') return 'failed';
  if (state === 'debug' || state === 'excluded') return state;
  if (state === 'off' && event === 'debug') return 'debug';
  if (state === 'off' && event === 'exclude') return 'excluded';
  if (event === 'fail' && (state === 'loading' || state === 'ready')) {
    return 'failed';
  }
  if (state === 'off' && event === 'activate') return 'loading';
  if (state === 'loading' && event === 'creative') return 'ready';
  return state;
}

type AdsterraWindow = Window & {
  atOptions?: Omit<BannerAdUnit, 'scriptUrl'>;
};

interface EnqueuedBannerLoad {
  cancel: () => void;
}

let bannerLoadQueue: Promise<void> = Promise.resolve();

export function enqueueBannerLoad({
  container,
  onScriptError,
  onStart,
  timeoutMs,
  unit,
}: {
  container: HTMLElement;
  onScriptError: () => void;
  onStart: () => void;
  timeoutMs: number;
  unit: BannerAdUnit;
}): EnqueuedBannerLoad {
  let cancelled = false;
  let finishActive: (() => void) | null = null;

  const run = async () => {
    if (cancelled) return;

    onStart();
    const providerWindow = window as AdsterraWindow;
    providerWindow.atOptions = {
      key: unit.key,
      format: unit.format,
      height: unit.height,
      width: unit.width,
      params: {},
    };

    const script = document.createElement('script');
    script.async = false;
    script.src = unit.scriptUrl;
    script.setAttribute('data-adsterra-unit', unit.key);

    await new Promise<void>((resolve) => {
      let settled = false;
      const timeoutId = window.setTimeout(() => {
        onScriptError();
        finish();
      }, timeoutMs);
      const finish = () => {
        if (settled) return;
        settled = true;
        window.clearTimeout(timeoutId);
        script.onload = null;
        script.onerror = null;
        finishActive = null;
        resolve();
      };

      finishActive = finish;
      script.onload = finish;
      script.onerror = () => {
        onScriptError();
        finish();
      };

      if (cancelled) {
        finish();
        return;
      }
      container.append(script);
    });

    if (providerWindow.atOptions?.key === unit.key) {
      delete providerWindow.atOptions;
    }
  };

  bannerLoadQueue = bannerLoadQueue.catch(() => undefined).then(run);

  return {
    cancel: () => {
      cancelled = true;
      finishActive?.();
    },
  };
}

export function hasProviderCreative(container: HTMLElement): boolean {
  if (container.querySelector('a[href], img[src], object[data], embed[src]')) {
    return true;
  }

  const iframe = container.querySelector('iframe') as HTMLIFrameElement | null;
  if (!iframe) return false;

  const src = iframe.getAttribute('src')?.trim();
  if (src && src !== 'about:blank') return true;

  try {
    const body = iframe.contentDocument?.body;
    return Boolean(
      body && (body.children.length > 0 || (body.textContent?.trim().length ?? 0) > 0),
    );
  } catch {
    return false;
  }
}

export interface AdCreativeWatch {
  dispose: () => void;
  fail: () => void;
}

export function watchProviderCreative({
  container,
  onCreative,
  onFailure,
  timeoutMs,
}: {
  container: HTMLElement;
  onCreative: () => void;
  onFailure: () => void;
  timeoutMs: number;
}): AdCreativeWatch {
  let settled = false;

  const settleCreative = () => {
    if (settled || !hasProviderCreative(container)) return;
    settled = true;
    window.clearTimeout(timeoutId);
    window.clearInterval(probeIntervalId);
    observer.disconnect();
    onCreative();
  };

  const observer = new MutationObserver(settleCreative);

  const fail = () => {
    if (settled) return;
    settled = true;
    window.clearTimeout(timeoutId);
    window.clearInterval(probeIntervalId);
    observer.disconnect();
    container.replaceChildren();
    onFailure();
  };

  const timeoutId = window.setTimeout(fail, timeoutMs);
  const probeIntervalId = window.setInterval(settleCreative, 100);
  observer.observe(container, { childList: true, subtree: true });
  settleCreative();

  return {
    dispose: () => {
      settled = true;
      window.clearTimeout(timeoutId);
      window.clearInterval(probeIntervalId);
      observer.disconnect();
    },
    fail,
  };
}
