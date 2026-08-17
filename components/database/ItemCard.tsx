import type { ItemEntry } from '../../data/types';
import { filterPublicVersionedField } from '../../lib/evidence/validate';
import { EvidenceBadge } from '../evidence/EvidenceBadge';

export function ItemCard({ item }: { item: ItemEntry }) {
  const purpose = filterPublicVersionedField(item.purpose);
  const confidence = item.purpose?.evidence.confidence ?? 'pending-verification';

  return (
    <article className="database-card item-card">
      <div className="database-card-head">
        <div>
          <p className="database-kicker">{item.category}</p>
          <h3>{item.name}</h3>
        </div>
        <EvidenceBadge confidence={confidence} compact />
      </div>
      {purpose ? <p>{purpose}</p> : null}
      <span className="verification-note">No unverified stats shown</span>
    </article>
  );
}
