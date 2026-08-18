import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';

import { ConsentBanner } from '../../components/privacy/ConsentBanner';
import { PrivacyChoices } from '../../components/privacy/PrivacyChoices';

describe('privacy choice controls', () => {
  it('renders a compact required-choice panel with equally explicit actions', () => {
    const html = renderToStaticMarkup(
      <ConsentBanner
        consent="unknown"
        isOpen
        mustChoose
        onAccept={vi.fn()}
        onClose={vi.fn()}
        onReject={vi.fn()}
      />,
    );

    expect(html).toContain('Your advertising choices');
    expect(html).toContain('Accept advertising');
    expect(html).toContain('Reject non-essential');
    expect(html).toContain('href="/privacy"');
    expect(html).not.toContain('privacy-panel-close');
  });

  it('makes a reopened management panel dismissible and states the current choice', () => {
    const html = renderToStaticMarkup(
      <ConsentBanner
        consent="rejected"
        isOpen
        mustChoose={false}
        onAccept={vi.fn()}
        onClose={vi.fn()}
        onReject={vi.fn()}
      />,
    );

    expect(html).toContain('Current choice: non-essential advertising rejected.');
    expect(html).toContain('aria-label="Close privacy choices"');
  });

  it('renders a persistent footer button instead of a fake navigation link', () => {
    const html = renderToStaticMarkup(<PrivacyChoices />);

    expect(html).toContain('<button');
    expect(html).toContain('Privacy Choices');
    expect(html).not.toContain('href=');
  });

  it('renders nothing when the panel is closed', () => {
    const html = renderToStaticMarkup(
      <ConsentBanner
        consent="unknown"
        isOpen={false}
        mustChoose={false}
        onAccept={vi.fn()}
        onClose={vi.fn()}
        onReject={vi.fn()}
      />,
    );

    expect(html).toBe('');
  });
});
