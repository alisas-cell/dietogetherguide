export interface ContentTable {
  headers: string[];
  rows: string[][];
}

export interface ContentSection {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  table?: ContentTable;
  links?: Array<{ href: string; label: string }>;
  callout?: {
    type: 'field-note' | 'build-check' | 'danger';
    title: string;
    body: string;
  };
}

export interface ContentFaq {
  question: string;
  answer: string;
}

export interface RelatedGuide {
  href: string;
  label: string;
  description: string;
}

export interface GuidePageData {
  route: string;
  title: string;
  h1: string;
  description: string;
  eyebrow: string;
  directAnswer: string[];
  buildContext: string;
  confidence: 'confirmed' | 'community-reported' | 'preview-build';
  breadcrumbs: Array<{ label: string; href?: string }>;
  heroImage?: {
    src: string;
    alt: string;
    assetId: string;
  };
  sections: ContentSection[];
  faqs: ContentFaq[];
  sourceIds: string[];
  related: RelatedGuide[];
}

export function related(
  href: string,
  label: string,
  description: string,
): RelatedGuide {
  return { href, label, description };
}
