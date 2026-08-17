import type { EvidenceConfidence } from '../../data/types';

const labels: Record<EvidenceConfidence, string> = {
  confirmed: 'CONFIRMED · OFFICIAL',
  'community-reported': 'COMMUNITY REPORT',
  'preview-build': 'PREVIEW BUILD',
  'pending-verification': 'EA CHECK PENDING',
};

export function EvidenceBadge({
  confidence,
  compact = false,
}: {
  confidence: EvidenceConfidence;
  compact?: boolean;
}) {
  return (
    <span
      className="evidence-badge"
      data-confidence={confidence}
      data-compact={compact || undefined}
    >
      <span aria-hidden="true" className="evidence-dot" />
      {labels[confidence]}
    </span>
  );
}
