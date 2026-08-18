export type AdLoadState = 'off' | 'loading' | 'ready' | 'failed';
export type AdLoadEvent = 'activate' | 'creative' | 'fail';

export function reduceAdLoadState(
  state: AdLoadState,
  event: AdLoadEvent,
): AdLoadState {
  if (state === 'failed') return 'failed';
  if (event === 'fail' && (state === 'loading' || state === 'ready')) {
    return 'failed';
  }
  if (state === 'off' && event === 'activate') return 'loading';
  if (state === 'loading' && event === 'creative') return 'ready';
  return state;
}

export function hasProviderCreative(container: HTMLElement): boolean {
  if (container.querySelector('iframe, img, a[href], object, embed')) return true;

  const hasNonLoaderElement = Array.from(container.children).some(
    (child) => child.tagName !== 'SCRIPT' && child.tagName !== 'STYLE',
  );

  return hasNonLoaderElement || (container.textContent?.trim().length ?? 0) > 0;
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

  const observer = new MutationObserver(() => {
    if (settled || !hasProviderCreative(container)) return;
    settled = true;
    window.clearTimeout(timeoutId);
    observer.disconnect();
    onCreative();
  });

  const fail = () => {
    if (settled) return;
    settled = true;
    window.clearTimeout(timeoutId);
    observer.disconnect();
    container.replaceChildren();
    onFailure();
  };

  const timeoutId = window.setTimeout(fail, timeoutMs);
  observer.observe(container, { childList: true, subtree: true });

  return {
    dispose: () => {
      settled = true;
      window.clearTimeout(timeoutId);
      observer.disconnect();
    },
    fail,
  };
}
