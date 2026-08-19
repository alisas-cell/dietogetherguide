import type { Metadata } from 'next';
import Link from 'next/link';

import { AdSlot } from '../../../components/ads/AdSlot';
import { Breadcrumbs } from '../../../components/article/Breadcrumbs';
import { Callout } from '../../../components/article/Callout';
import { EvidenceBanner } from '../../../components/article/EvidenceBanner';
import { SourceList } from '../../../components/article/SourceList';
import { JsonLd } from '../../../components/seo/JsonLd';
import { CoopTroubleshooter } from '../../../components/tools/CoopTroubleshooter';
import { Container } from '../../../components/ui/Container';
import { canonicalOrigin } from '../../../lib/seo/metadata';
import { formatLastModified, getLastModified } from '../../../lib/seo/routes';

const route = '/tools/coop-troubleshooter';
const url = `${canonicalOrigin}${route}`;

export const metadata: Metadata = {
  title: { absolute: 'Last Pirates: Die Together Co-op Troubleshooter' },
  description:
    'Choose a Quick Join, reconnect, host, desync, window, or controller symptom and get the safest source-backed checks first.',
  alternates: { canonical: url },
  openGraph: {
    type: 'website',
    url,
    siteName: 'Die Together Guide',
    title: 'Last Pirates: Die Together Co-op Troubleshooter',
    description: 'Tell us what is happening and get the safest source-backed steps first.',
  },
};

const schemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: 'Last Pirates: Die Together Co-op Troubleshooter',
    description:
      'A source-backed interactive checklist for Quick Join, reconnect, host, desync, window, and controller symptoms.',
    isPartOf: { '@id': `${canonicalOrigin}/#website` },
    dateModified: getLastModified(route),
    inLanguage: 'en',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: canonicalOrigin },
      { '@type': 'ListItem', position: 2, name: 'Co-op Troubleshooter', item: url },
    ],
  },
];

export default function CoopTroubleshooterPage() {
  return (
    <>
      <JsonLd schemas={schemas} />
      <article className="tool-page">
        <Container>
          <header className="tool-hero">
            <Breadcrumbs
              items={[{ label: 'Home', href: '/' }, { label: 'Co-op Troubleshooter' }]}
            />
            <p className="section-kicker">Interactive crew support</p>
            <h1>Co-op Troubleshooter</h1>
            <p>
              Tell us what is happening and get the safest source-backed steps first.
              The tool uses official Quick Join, reconnect, save, and host-migration
              history plus standard reversible Steam and Windows checks.
            </p>
          </header>

          <EvidenceBanner
            context="Early Access live · official patch context"
            date={formatLastModified(route)}
          >
            The tool uses current availability plus documented feature history. Exact menu
            paths stay qualified until they are directly verified in the current client.
          </EvidenceBanner>

          <CoopTroubleshooter />

          <div className="tool-explainer">
            <section>
              <h2>How this works</h2>
              <p>
                The selected symptom maps to a deterministic checklist. Official steps
                carry evidence labels; client and operating-system steps are marked as
                standard and reversible. The tool does not diagnose server health or
                claim a guaranteed fix.
              </p>
            </section>
            <section>
              <h2>What this tool will not ask you to do</h2>
              <p>
                It will not recommend random downloads, invasive system edits, broad
                security changes, or destructive save actions. If basic steps fail, stop
                and report the build, region, crew role, and repeatable symptom.
              </p>
            </section>
          </div>

          <Callout variant="build" title="Current evidence boundary">
            <p>
              Quick Join and session-resilience work are documented in June and July
              historical patches. Visit the <Link href="/updates">updates hub</Link> for the
              source timeline.
            </p>
          </Callout>
          <AdSlot pathname={route} placement="article_mid" />
          <SourceList sourceIds={['S01', 'S07', 'S08', 'S10']} />
          <AdSlot pathname={route} placement="responsive_banner" />
        </Container>
      </article>
    </>
  );
}
