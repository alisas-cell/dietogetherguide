import type { EvidenceConfidence } from '../../data/types';
import { EvidenceBadge } from '../evidence/EvidenceBadge';
import { LastChecked } from './LastChecked';

export function EvidenceBanner({
  confidence = 'confirmed',
  context = 'Pre-Early Access / Demo evidence',
  children,
}: {
  confidence?: EvidenceConfidence;
  context?: string;
  children?: React.ReactNode;
}) {
  return (
    <aside className="evidence-banner" aria-label="Evidence and build context">
      <div>
        <EvidenceBadge confidence={confidence} />
        <LastChecked context={context} />
      </div>
      {children ? <p>{children}</p> : null}
    </aside>
  );
}
