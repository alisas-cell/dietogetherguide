import type { Metadata } from 'next';
import Link from 'next/link';

import { AdSlot } from '../../../components/ads/AdSlot';
import { Breadcrumbs } from '../../../components/article/Breadcrumbs';
import { Callout } from '../../../components/article/Callout';
import { EvidenceBanner } from '../../../components/article/EvidenceBanner';
import { SourceList } from '../../../components/article/SourceList';
import { JsonLd } from '../../../components/seo/JsonLd';
import { MonsterFinder } from '../../../components/tools/MonsterFinder';
import { Container } from '../../../components/ui/Container';
import { canonicalOrigin } from '../../../lib/seo/metadata';
import { formatLastModified, getLastModified } from '../../../lib/seo/routes';

const route = '/tools/monster-finder';
const url = `${canonicalOrigin}${route}`;
const title = 'Last Pirates Monster Finder — Identify Enemies by Sound & Behavior';
const description = 'Filter current monsters by behavior, location, level, evidence and patch date. Head Crab, Anchorer and other threats share the wiki registry.';

export const metadata: Metadata = {
  title: { absolute: title + ' | Die Together Wiki' },
  description,
  alternates: { canonical: url },
  openGraph: { type: 'website', url, siteName: 'Die Together Wiki', title: title + ' | Die Together Wiki', description, images: ['/opengraph-image'] },
};

const schemas = [
  { '@context': 'https://schema.org', '@type': 'WebPage', '@id': `${url}#webpage`, url, name: title, description, isPartOf: { '@id': `${canonicalOrigin}/#website` }, dateModified: getLastModified(route), inLanguage: 'en' },
  { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: canonicalOrigin },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: `${canonicalOrigin}/tools` },
    { '@type': 'ListItem', position: 3, name: 'Monster Finder', item: url },
  ] },
];

export default function MonsterFinderPage() {
  return (
    <><JsonLd schemas={schemas} /><article className="tool-page"><Container>
      <header className="tool-hero"><Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Tools', href: '/tools' }, { label: 'Monster Finder' }]} /><p className="section-kicker">Rule-based field identification</p><h1>Last Pirates Monster Finder</h1><p>Select what the creature did. The matcher checks the shared typed monster registry and returns only records that match every selected clue—no LLM guess and no invented stats.</p></header>
      <EvidenceBanner confidence="confirmed" context="Current typed registry · official + explicitly labeled evidence" date={formatLastModified(route)}>Finder rules are transparent. “Not sure” returns no guess, and the combined monster roster is not claimed to be complete.</EvidenceBanner>
      <AdSlot pathname={route} placement="early_responsive" />
      <MonsterFinder />
      <AdSlot pathname={route} placement="native_primary" />
      <div className="tool-explainer"><section><h2>How matching works</h2><p>All selected tags must exist on the same record. Sound maps to Ear, disguise to Mimic, disturbance to Sleeper, pull sound and knockback context to Siren, and rat-group context to Rat.</p></section><section><h2>Why no result can be useful</h2><p>An empty result means the verified registry cannot support that clue combination. Remove only a clue you are unsure about or continue with the broader monster hub.</p></section></div>
      <AdSlot pathname={route} placement="rectangle_300" />
      <Callout variant="build" title="Evidence boundary"><p>Anchorer uses a hook-and-pull clue. The new treasure-disguised enemy is unnamed; loot-hiding does not identify Anchorer. Exact monster meters, cooldowns, damage, and spawn rates remain unpublished.</p></Callout>
      <p className="tool-page-links"><Link href="/monsters">Monster hub</Link> · <Link href="/beginner-guide">Beginner guide</Link> · <Link href="/solo-guide">Solo guide</Link></p>
      <AdSlot pathname={route} placement="smartlink_primary" />
      <SourceList sourceIds={['S11', 'S17', 'S20', 'S23', 'S25']} />
      <AdSlot pathname={route} placement="horizontal_468" />
    </Container></article></>
  );
}
