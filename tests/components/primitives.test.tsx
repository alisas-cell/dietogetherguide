import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import { Breadcrumbs } from '../../components/article/Breadcrumbs';
import { EvidenceBadge } from '../../components/evidence/EvidenceBadge';
import { MonsterCard } from '../../components/database/MonsterCard';
import type { MonsterEntry } from '../../data/types';

describe('field-guide primitives', () => {
  it('renders a labeled evidence badge without relying on color alone', () => {
    const confirmed = renderToStaticMarkup(
      <EvidenceBadge confidence="confirmed" />,
    );
    const preview = renderToStaticMarkup(
      <EvidenceBadge confidence="preview-build" />,
    );

    expect(confirmed).toContain('CONFIRMED · OFFICIAL');
    expect(confirmed).toContain('data-confidence="confirmed"');
    expect(preview).toContain('PREVIEW BUILD');
  });

  it('renders visible breadcrumb navigation with the same hierarchy used by schema', () => {
    const html = renderToStaticMarkup(
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Maps', href: '/maps' },
          { label: 'Silent Cove' },
        ]}
      />,
    );

    expect(html).toContain('aria-label="Breadcrumb"');
    expect(html).toContain('href="/maps"');
    expect(html).toContain('aria-current="page"');
    expect(html).toContain('Silent Cove');
  });

  it('omits unknown monster fields and does not create a detail link before page readiness', () => {
    const monster: MonsterEntry = {
      id: 'mimic',
      slug: 'mimic',
      name: 'Mimic',
      status: 'demo-evidenced',
      summary: {
        value: 'Named in an official Demo patch.',
        evidence: {
          confidence: 'preview-build',
          sourceIds: ['S08'],
          verifiedAt: '2026-08-17T00:00:00Z',
          build: 'demo',
        },
      },
      pageReady: false,
      lastVerifiedAt: '2026-08-17T00:00:00Z',
    };

    const html = renderToStaticMarkup(<MonsterCard monster={monster} />);

    expect(html).toContain('Mimic');
    expect(html).toContain('Named in an official Demo patch.');
    expect(html).not.toContain('???');
    expect(html).not.toContain('<dt>Threat</dt>');
    expect(html).not.toContain('href="/monsters/mimic"');
  });
});
