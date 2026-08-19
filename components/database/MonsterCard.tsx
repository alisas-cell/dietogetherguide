import Link from 'next/link';

import type { MonsterEntry } from '../../data/types';
import { filterPublicVersionedField } from '../../lib/evidence/validate';
import { EvidenceBadge } from '../evidence/EvidenceBadge';

export function MonsterCard({ monster }: { monster: MonsterEntry }) {
  const summary = filterPublicVersionedField(monster.summary);
  const detection = filterPublicVersionedField(monster.detection);
  const threat = filterPublicVersionedField(monster.threat);
  const counterplay = filterPublicVersionedField(monster.counterplay);
  const confidence = monster.summary?.evidence.confidence ?? 'preview-build';

  return (
    <article className="database-card monster-card">
      <div className="database-card-head">
        <div>
          <p className="database-kicker">Threat record</p>
          <h3>{monster.name}</h3>
        </div>
        <EvidenceBadge confidence={confidence} compact />
      </div>
      {summary ? <p>{summary}</p> : null}
      {detection ? (
        <dl className="database-facts">
          <div>
            <dt>Reacts to</dt>
            <dd>{detection.join(', ')}</dd>
          </div>
        </dl>
      ) : null}
      {threat ? (
        <dl className="database-facts">
          <div>
            <dt>Threat</dt>
            <dd>{threat}</dd>
          </div>
        </dl>
      ) : null}
      {counterplay?.[0] ? <p className="card-note">{counterplay[0]}</p> : null}
      {monster.pageReady ? (
        <Link className="text-link" href={`/monsters/${monster.slug}`}>
          Open threat record <span aria-hidden="true">→</span>
        </Link>
      ) : (
        <span className="verification-note">
          {monster.status === 'ea-confirmed'
            ? 'Current hub record · detail-page evidence gate not met'
            : 'Current EA identity not reverified'}
        </span>
      )}
    </article>
  );
}
