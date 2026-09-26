import Link from 'next/link';
import { patchesForRoute } from '../../lib/patch-graph';
import { sources } from '../../data/sources';
export function PatchLinks({ route }: { route: string }) {
  const changes = patchesForRoute(route).filter(
    (patch) => patch.date >= '2026-08-28',
  );
  if (!changes.length) return null;
  return (
    <section className="wiki-patch-links" id="relevant-patches">
      <p className="section-kicker">Shared patch graph</p>
      <h2>Latest changes affecting this page</h2>
      <ul>
        {changes.map((patch) => (
          <li key={patch.id}>
            <strong>
              {patch.date} · {patch.title}
            </strong>
            <p>{patch.summary}</p>
            <Link
              href={
                ['2026-09-25', '2026-09-18', '2026-09-14', '2026-09-10'].includes(patch.date)
                  ? '/updates/' + patch.slug
                  : '/updates/september-2026'
              }
            >
              Patch context
            </Link>
            {patch.sourceUrl ? (
              <>
                {' '}
                · <a href={patch.sourceUrl}>Official source</a>
              </>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
export function SourceLedger() {
  return (
    <section id="source-registry">
      <h2>Source registry</h2>
      <p>
        Source review dates describe when that source was checked. Older
        announcements remain dated history, even when a current guide references
        them. Shared archive links identify the exact announcement by title and
        date.
      </p>
      <ul className="wiki-source-ledger">
        {sources.map((source) => (
          <li key={source.id}>
            <a href={source.url}>
              {source.id} · {source.title}
            </a>
            <p>
              {source.publisher} · Published{' '}
              {source.publishedAt?.slice(0, 10) ?? 'not specified'} · Reviewed{' '}
              {source.checkedAt.slice(0, 10)}
            </p>
            {source.notes ? <p>{source.notes}</p> : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
