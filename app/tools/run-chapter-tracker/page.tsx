import type { Metadata } from 'next';
import Link from 'next/link';

import { AdSlot } from '../../../components/ads/AdSlot';
import { Breadcrumbs } from '../../../components/article/Breadcrumbs';
import { Callout } from '../../../components/article/Callout';
import { EvidenceBanner } from '../../../components/article/EvidenceBanner';
import { SourceList } from '../../../components/article/SourceList';
import { JsonLd } from '../../../components/seo/JsonLd';
import { RunChapterTracker } from '../../../components/tools/RunChapterTracker';
import { Container } from '../../../components/ui/Container';
import { canonicalOrigin } from '../../../lib/seo/metadata';
import { formatLastModified, getLastModified } from '../../../lib/seo/routes';

const route = '/tools/run-chapter-tracker';
const url = `${canonicalOrigin}${route}`;
const title = 'Last Pirates Run & Chapter Tracker — Save Progress & Crew Notes';
const description = 'Keep personal Last Pirates run, day, chapter, crew, monster, loot, and checklist notes in localStorage with edit, delete, reset, and JSON backup.';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: url },
  openGraph: { type: 'website', url, siteName: 'Die Together Guide', title, description },
};

const schemas = [
  { '@context': 'https://schema.org', '@type': 'WebPage', '@id': `${url}#webpage`, url, name: title, description, isPartOf: { '@id': `${canonicalOrigin}/#website` }, dateModified: getLastModified(route), inLanguage: 'en' },
  { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: canonicalOrigin },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: `${canonicalOrigin}/tools` },
    { '@type': 'ListItem', position: 3, name: 'Run & Chapter Tracker', item: url },
  ] },
];

export default function RunChapterTrackerPage() {
  return (
    <><JsonLd schemas={schemas} /><article className="tool-page"><Container>
      <header className="tool-hero"><Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Tools', href: '/tools' }, { label: 'Run & Chapter Tracker' }]} /><p className="section-kicker">Personal local notebook</p><h1>Last Pirates Run and Chapter Tracker</h1><p>Keep run, crew, map, day, chapter, monster, loot, and checklist notes in this browser. This tool does not read, locate, edit, or replace Last Pirates game save files.</p></header>
      <EvidenceBanner confidence="confirmed" context="Local-only tracker · official save context" date={formatLastModified(route)}>The Aug 21 official patch says game progress saves every day and every chapter. This independent notebook stores only what you type in localStorage.</EvidenceBanner>
      <AdSlot pathname={route} placement="early_responsive" />
      <RunChapterTracker />
      <AdSlot pathname={route} placement="native_primary" />
      <div className="tool-explainer"><section><h2>What stays local</h2><p>Run records live under one versioned localStorage key in this browser. There is no account, sync service, server database, or automatic upload.</p></section><section><h2>Backup is optional</h2><p>Export downloads human-readable JSON. Import accepts only a validated run-record list and replaces local tracker records after you choose the action.</p></section></div>
      <AdSlot pathname={route} placement="rectangle_300" />
      <Callout variant="build" title="Not a save-file reader"><p>The tracker cannot verify in-game save state and never modifies game files. Use the <Link href="/save-and-reconnect">save and reconnect guide</Link> for official daily/chapter and reconnect context.</p></Callout>
      <p className="tool-page-links"><Link href="/solo-guide">Solo guide</Link> · <Link href="/maps">Maps</Link> · <Link href="/tools/monster-finder">Monster Finder</Link></p>
      <AdSlot pathname={route} placement="smartlink_primary" />
      <SourceList sourceIds={['S16']} />
      <AdSlot pathname={route} placement="horizontal_468" />
    </Container></article></>
  );
}
