import type { Evidence, GameSnapshot } from './types';

const evidenceCheckedAt = '2026-08-17T01:44:11Z';
const releaseCheckedAt = '2026-08-18T11:31:54Z';

const confirmed = (sourceIds: string[], build: Evidence['build']): Evidence => ({
  confidence: 'confirmed',
  sourceIds,
  verifiedAt: evidenceCheckedAt,
  build,
});

export const gameSnapshot = {
  releaseState: 'prerelease',
  officialReleaseDate: {
    value: '2026-08-18',
    evidence: confirmed(['S01'], 'pre-ea'),
  },
  releaseTimestampUtc: {
    value: '2026-08-18T17:00:00Z',
    evidence: {
      ...confirmed(['S05'], 'pre-ea'),
      note: 'SteamDB timestamp snapshot; not a guaranteed launch minute.',
    },
  },
  playerRange: {
    value: { min: 1, max: 4 },
    evidence: confirmed(['S01', 'S03'], 'pre-ea'),
  },
  platform: {
    value: ['Windows'],
    evidence: confirmed(['S01'], 'pre-ea'),
  },
  earlyAccessTarget: {
    value: '6+ months',
    evidence: confirmed(['S01'], 'pre-ea'),
  },
  wishlistMilestone: {
    value: '100K+',
    evidence: {
      ...confirmed(['S02'], 'pre-ea'),
      note: 'Official historical milestone, not current telemetry.',
    },
  },
  demoPlayerMilestone: {
    value: '205K+',
    evidence: {
      ...confirmed(['S02'], 'pre-ea'),
      note: 'Official historical Demo milestone announced July 21, 2026.',
    },
  },
  nextFestPlacement: {
    value: 'Top 50',
    evidence: {
      ...confirmed(['S02'], 'pre-ea'),
      note: 'Official Steam Next Fest Demo milestone.',
    },
  },
  lastGlobalCheck: releaseCheckedAt,
} satisfies GameSnapshot;

export const releaseLabel =
  gameSnapshot.releaseState === 'prerelease'
    ? 'RELEASES TODAY · STEAM NOT UNLOCKED YET'
    : 'EARLY ACCESS · LIVE';
