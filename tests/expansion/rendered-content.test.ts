import { describe, expect, it } from 'vitest';
import { observedContentDigest, reviewedContent } from '../../lib/expansion/rendered-content';
import { bodyDigest } from '../../lib/expansion/qualification';
import type { GuidePageData } from '../../content/types';
const page = {
  route: '/one', title: 'One', h1: 'One', description: 'One', eyebrow: 'Guide',
  directAnswer: ['Answer & useful detail'], buildContext: 'current', confidence: 'confirmed',
  breadcrumbs: [], sections: [{ id: 'check', heading: 'Check', paragraphs: ['Unique visible explanation.'] }],
  faqs: [], sourceIds: ['S01'], related: [],
} satisfies GuidePageData;
describe('reviewed editorial content must exist in rendered article', () => {
  it('binds visible paragraphs and handles escaped text', () => {
    const html = '<article class="article-page"><p>Answer &amp; useful detail</p><h2>Check</h2><p>Unique visible explanation.</p></article>';
    expect(observedContentDigest(html, page)).toBe(bodyDigest(reviewedContent(page)));
  });
  it('does not accept a missing paragraph hidden only in hydration scripts', () => {
    const html = '<article class="article-page"><p>Answer &amp; useful detail</p><h2>Check</h2></article><script>Unique visible explanation.</script>';
    expect(observedContentDigest(html, page)).toBe('');
  });
  it('cannot distinguish copied bodies merely by changing route/title', () => {
    expect(reviewedContent(page)).toContain('Unique visible explanation.');
    expect(reviewedContent({ ...page, route: '/two', title: 'Two', h1: 'Two' })).toBe(reviewedContent(page));
  });
});
