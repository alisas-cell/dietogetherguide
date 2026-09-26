import type { GuidePageData } from '../../content/types';
import { bodyDigest } from './qualification';

function editorialText(page: GuidePageData): string[] {
  return [...page.directAnswer, ...page.sections.flatMap((section) => [
    section.heading, ...section.paragraphs, ...(section.bullets ?? []),
    ...(section.table?.headers ?? []), ...(section.table?.rows.flat() ?? []),
    ...(section.callout ? [section.callout.title, section.callout.body] : []),
    ...(section.image ? [section.image.caption] : []),
  ]), ...page.faqs.flatMap((faq) => [faq.question, faq.answer])].filter(Boolean);
}

export function reviewedContent(page: GuidePageData): string {
  // Deliberately exclude route/title/date so a renamed copied body has the same digest.
  return JSON.stringify(editorialText(page));
}

function normalize(text: string): string {
  return text.replace(/&#(x[0-9a-f]+|\d+);/gi, (_, value: string) => {
    const code = value.startsWith('x') || value.startsWith('X') ? parseInt(value.slice(1), 16) : parseInt(value, 10);
    return code <= 0x10ffff ? String.fromCodePoint(code) : '';
  }).replace(/&(amp|quot|apos|lt|gt|nbsp);/g, (_, key: string) => ({
    amp: '&', quot: '"', apos: "'", lt: '<', gt: '>', nbsp: ' ',
  }[key] ?? '')).replace(/\s+/g, ' ').trim();
}

export function observedContentDigest(html: string, page: GuidePageData): string {
  const clean = html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, '').replace(/<!--[\s\S]*?-->/g, '');
  const start = clean.search(/<article\b[^>]*class="[^"]*article-page/);
  const end = clean.lastIndexOf('</article>');
  if (start < 0 || end < start) return '';
  const visible = normalize(clean.slice(start, end).replace(/<[^>]+>/g, ' '));
  return editorialText(page).every((text) => visible.includes(normalize(text)))
    ? bodyDigest(reviewedContent(page)) : '';
}
