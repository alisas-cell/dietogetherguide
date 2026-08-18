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
