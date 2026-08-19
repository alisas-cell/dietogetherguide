import type { EvidenceConfidence } from '../../data/types';
import { EvidenceBadge } from '../evidence/EvidenceBadge';
import { LastChecked } from './LastChecked';

export function EvidenceBanner({
  confidence = 'confirmed',
  context = 'Pre-Early Access / Demo evidence',
  date,
  children,
}: {
  confidence?: EvidenceConfidence;
  context?: string;
  date?: string;
  children?: React.ReactNode;
}) {
  return (
    <aside className="evidence-banner" aria-label="Evidence and build context">
      <div>
        <EvidenceBadge confidence={confidence} />
        <LastChecked context={context} date={date} />
      </div>
      {children ? <p>{children}</p> : null}
    </aside>
  );
}
