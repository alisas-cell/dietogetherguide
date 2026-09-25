import Link from 'next/link';
import { AdSlot } from '../ads/AdSlot';
import { Breadcrumbs } from '../article/Breadcrumbs';
import { EvidenceBanner } from '../article/EvidenceBanner';
import { SourceList } from '../article/SourceList';
import { JsonLd } from '../seo/JsonLd';
import { Container } from '../ui/Container';
import { ProgressionTracker, QuotaPlanner } from './PlanningTools';
import { buildGuideSchemas } from '../../lib/seo/schema';
import { wikiPage } from '../../content/wiki-factory';
export function planningData(kind: 'progression-tracker' | 'quota-planner') {
  return wikiPage(
    '/tools/' + kind,
    kind === 'quota-planner'
      ? 'Quota Planner: Calculate Your Loot Gap'
      : 'Progression Tracker: Chapters, Levels and Achievements',
    kind === 'quota-planner'
      ? 'Plan with your current quota, secured loot and estimated cargo. No invented level values, prices or spawn predictions.'
      : 'Keep a local notebook of chapter, level, observed unlocks and Steam achievement progress. No save access or automatic game tracking.',
    ['S23', 'S24', 'S25', 'S26'],
    [],
    [],
  );
}
export function PlanningPage({
  kind,
}: {
  kind: 'progression-tracker' | 'quota-planner';
}) {
  const data = planningData(kind);
  return (
    <>
      <JsonLd schemas={buildGuideSchemas(data)} />
      <article className="tool-page">
        <Container>
          <header className="tool-hero">
            <Breadcrumbs items={data.breadcrumbs} />
            <p className="section-kicker">Independent planning tools</p>
            <h1>{data.h1}</h1>
            <p>{data.directAnswer[0]}</p>
          </header>
          <EvidenceBanner
            confidence="confirmed"
            context="September evidence · your observations stay separate"
            date="Sep 25, 2026"
          >
            Inputs are personal estimates or notes, not official game telemetry.
          </EvidenceBanner>
          <AdSlot pathname={data.route} placement="early_responsive" />
          {kind === 'quota-planner' ? <QuotaPlanner /> : <ProgressionTracker />}
          <AdSlot pathname={data.route} placement="native_primary" />
          <div className="tool-explainer">
            <section>
              <h2>Current progression context</h2>
              <p>
                The first four chapters each have one level; later chapters have
                two. Ship first appears at level 2 and Castle at level 4.
                September corrected quota progression and store unlock
                persistence.
              </p>
            </section>
            <section>
              <h2>Evidence limits</h2>
              <p>
                The announcements do not publish every quota, store price or
                level-to-enemy assignment. Your notes cannot unlock Steam
                achievements or confirm an unobserved game state.
              </p>
            </section>
          </div>
          <AdSlot pathname={data.route} placement="rectangle_300" />
          <p className="tool-page-links">
            <Link href="/progression">Progression</Link> ·{' '}
            <Link href="/quota">Quota evidence</Link> ·{' '}
            <Link href="/achievements">Achievements</Link> ·{' '}
            <Link href="/tools">All tools</Link>
          </p>
          <AdSlot pathname={data.route} placement="smartlink_primary" />
          <SourceList sourceIds={data.sourceIds} />
          <AdSlot pathname={data.route} placement="horizontal_468" />
        </Container>
      </article>
    </>
  );
}
