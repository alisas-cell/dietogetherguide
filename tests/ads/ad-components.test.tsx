import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import { AdSlot } from '../../components/ads/AdSlot';
import {
  hasProviderCreative,
  reduceAdLoadState,
} from '../../components/ads/ad-runtime';

describe('max-harvest slot rendering', () => {
  it('renders one deterministic Native placement without a server-side script or ID', () => {
    const html = renderToStaticMarkup(
      <AdSlot placement="native_primary" pathname="/gameplay" />,
    );

    expect(html).toContain('aria-label="Advertisement"');
    expect(html).toContain('data-ad-format="native"');
    expect(html).toContain('data-ad-placement="native_primary"');
    expect(html).toContain('data-ad-route="/gameplay"');
    expect(html).toContain('data-ad-state="off"');
    expect(html).not.toContain('<script');
    expect(html).not.toContain('container-1283f453c8142633c69e76c4a788d1e9');
    expect(html).not.toContain('profitableratecpmnetwork.com');
  });

  it('renders deterministic responsive and fixed Banner placements before viewport selection', () => {
    for (const [placement, format] of [
      ['early_responsive', 'responsive'],
      ['rectangle_300', '300x250'],
      ['horizontal_468', '468x60'],
      ['sidebar_160x300', '160x300'],
      ['sidebar_160x600', '160x600'],
    ] as const) {
      const html = renderToStaticMarkup(
        <AdSlot placement={placement} pathname="/beginner-guide" />,
      );

      expect(html, placement).toContain(`data-ad-format="${format}"`);
      expect(html, placement).toContain(`data-ad-placement="${placement}"`);
      expect(html, placement).toContain('data-ad-state="off"');
      expect(html, placement).not.toContain('<script');
      expect(html, placement).not.toContain('highrevenueformat.com');
      expect(html, placement).not.toMatch(/data-ad-width="\d/);
    }
  });

  it('renders Smartlink disclosure without a live provider href before the client gate', () => {
    const html = renderToStaticMarkup(
      <AdSlot placement="smartlink_primary" pathname="/gameplay" />,
    );

    expect(html).toContain('data-ad-format="smartlink"');
    expect(html).toContain('data-ad-placement="smartlink_primary"');
    expect(html).toContain('Sponsored Resource');
    expect(html).toContain('data-ad-state="off"');
    expect(html).not.toContain('gxyrbuc5');
    expect(html).not.toContain('<script');
  });
});

describe('Adsterra fail-closed state machine', () => {
  it('moves through debug, excluded, loading, and ready states only on valid events', () => {
    expect(reduceAdLoadState('off', 'debug')).toBe('debug');
    expect(reduceAdLoadState('off', 'exclude')).toBe('excluded');
    expect(reduceAdLoadState('off', 'activate')).toBe('loading');
    expect(reduceAdLoadState('loading', 'creative')).toBe('ready');
    expect(reduceAdLoadState('debug', 'activate')).toBe('debug');
    expect(reduceAdLoadState('excluded', 'activate')).toBe('excluded');
  });

  it('collapses loading or ready slots after failure and ignores late events', () => {
    expect(reduceAdLoadState('loading', 'fail')).toBe('failed');
    expect(reduceAdLoadState('ready', 'fail')).toBe('failed');
    expect(reduceAdLoadState('failed', 'creative')).toBe('failed');
    expect(reduceAdLoadState('off', 'creative')).toBe('off');
  });

  it('does not mistake loader or empty iframe shells for returned creative', () => {
    const scriptOnly = {
      children: [{ tagName: 'SCRIPT' }],
      querySelector: () => null,
      textContent: '',
    } as unknown as HTMLElement;
    const emptyIframe = {
      getAttribute: (name: string) => (name === 'src' ? 'about:blank' : null),
      contentDocument: { body: { children: [], textContent: '' } },
    };
    const withEmptyIframe = {
      children: [{ tagName: 'SCRIPT' }, { tagName: 'IFRAME' }],
      querySelector: (selector: string) =>
        selector.includes('iframe') ? emptyIframe : null,
      textContent: '',
    } as unknown as HTMLElement;

    expect(hasProviderCreative(scriptOnly)).toBe(false);
    expect(hasProviderCreative(withEmptyIframe)).toBe(false);
  });

  it('accepts meaningful direct or iframe creative content', () => {
    const withDirectCreative = {
      children: [{ tagName: 'A' }],
      querySelector: (selector: string) =>
        selector.includes('a[href]')
          ? { getAttribute: () => 'https://example.com/ad' }
          : null,
      textContent: '',
    } as unknown as HTMLElement;
    const filledIframe = {
      getAttribute: (name: string) => (name === 'src' ? 'about:blank' : null),
      contentDocument: { body: { children: [{}], textContent: '' } },
    };
    const withFilledIframe = {
      children: [{ tagName: 'SCRIPT' }, { tagName: 'IFRAME' }],
      querySelector: (selector: string) =>
        selector.includes('iframe') ? filledIframe : null,
      textContent: '',
    } as unknown as HTMLElement;

    expect(hasProviderCreative(withDirectCreative)).toBe(true);
    expect(hasProviderCreative(withFilledIframe)).toBe(true);
  });
});
