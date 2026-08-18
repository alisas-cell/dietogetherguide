import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import { AdSlot } from '../../components/ads/AdSlot';
import {
  hasProviderCreative,
  reduceAdLoadState,
} from '../../components/ads/ad-runtime';

describe('Adsterra slot rendering', () => {
  it('renders a deterministic Native placement without a server-side script', () => {
    const html = renderToStaticMarkup(
      <AdSlot placement="article_mid" pathname="/gameplay" />,
    );

    expect(html).toContain('aria-label="Advertisement"');
    expect(html).toContain('data-ad-placement="article_mid"');
    expect(html).toContain('data-ad-route="/gameplay"');
    expect(html).toContain('data-ad-state="off"');
    expect(html).not.toContain('<script');
    expect(html).not.toContain('effectivecpmnetwork.com');
  });

  it('renders a deterministic responsive placement without choosing both units', () => {
    const html = renderToStaticMarkup(
      <AdSlot placement="responsive_banner" pathname="/" />,
    );

    expect(html).toContain('data-ad-placement="responsive_banner"');
    expect(html).toContain('data-ad-route="/"');
    expect(html).toContain('data-ad-state="off"');
    expect(html).not.toContain('<script');
    expect(html).not.toContain('1178d923040089031d1739c3b0f07aee');
    expect(html).not.toContain('11f222c98a7f20ac1f26e0182e67c82d');
  });
});

describe('Adsterra fail-closed state machine', () => {
  it('moves from off to loading to ready only after creative content arrives', () => {
    expect(reduceAdLoadState('off', 'activate')).toBe('loading');
    expect(reduceAdLoadState('loading', 'creative')).toBe('ready');
  });

  it('collapses loading or ready slots after failure and ignores late events', () => {
    expect(reduceAdLoadState('loading', 'fail')).toBe('failed');
    expect(reduceAdLoadState('ready', 'fail')).toBe('failed');
    expect(reduceAdLoadState('failed', 'creative')).toBe('failed');
    expect(reduceAdLoadState('off', 'creative')).toBe('off');
  });

  it('does not mistake the loader script for a returned creative', () => {
    const scriptOnly = {
      children: [{ tagName: 'SCRIPT' }],
      querySelector: () => null,
      textContent: '',
    } as unknown as HTMLElement;
    const withIframe = {
      children: [{ tagName: 'SCRIPT' }, { tagName: 'IFRAME' }],
      querySelector: (selector: string) => (selector.includes('iframe') ? {} : null),
      textContent: '',
    } as unknown as HTMLElement;

    expect(hasProviderCreative(scriptOnly)).toBe(false);
    expect(hasProviderCreative(withIframe)).toBe(true);
  });
});
