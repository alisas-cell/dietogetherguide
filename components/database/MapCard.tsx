import Link from 'next/link';

import type { MapEntry } from '../../data/types';
import { filterPublicVersionedField } from '../../lib/evidence/validate';
import { EvidenceBadge } from '../evidence/EvidenceBadge';

export function MapCard({ map }: { map: MapEntry }) {
  const setting = filterPublicVersionedField(map.setting);
  const overview = filterPublicVersionedField(map.overview);
  const confidence = map.overview?.evidence.confidence ?? 'pending-verification';

  return (
    <article className="database-card map-card">
      <div className="database-card-head">
        <div>
          <p className="database-kicker">{map.status === 'demo' ? 'Demo location' : 'Location record'}</p>
          <h3>{map.name}</h3>
        </div>
        <EvidenceBadge confidence={confidence} compact />
      </div>
      {setting ? <p className="card-lede">{setting}</p> : null}
      {overview ? <p>{overview}</p> : null}
      {map.pageReady ? (
        <Link className="text-link" href={`/maps/${map.slug}`}>
          Open map guide <span aria-hidden="true">→</span>
        </Link>
      ) : (
        <span className="verification-note">Exact EA map identity pending</span>
      )}
    </article>
  );
}
