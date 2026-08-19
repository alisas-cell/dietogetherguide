import type { Evidence, GameSnapshot } from './types';

const historicalCheckedAt = '2026-08-17T01:44:11Z';
const releaseCheckedAt = '2026-08-19T05:33:14Z';

const confirmed = (
  sourceIds: string[],
  build: Evidence['build'],
  verifiedAt = releaseCheckedAt,
): Evidence => ({
  confidence: 'confirmed',
  sourceIds,
  verifiedAt,
  build,
});

export const gameSnapshot = {
  releaseState: 'early-access-live',
  officialReleaseDate: {
    value: '2026-08-18',
    evidence: confirmed(['S01'], 'ea-launch'),
  },
  releaseTimestampUtc: {
    value: '2026-08-18T17:01:40Z',
    evidence: {
      ...confirmed(['S05'], 'ea-launch'),
      note: 'SteamDB recorded release metadata; third-party platform metadata proxy, not an official exact launch announcement.',
    },
  },
  playerRange: {
    value: { min: 1, max: 4 },
    evidence: confirmed(['S01', 'S10'], 'ea-launch'),
  },
  platform: {
    value: ['Windows'],
    evidence: confirmed(['S01'], 'ea-launch'),
  },
  earlyAccessTarget: {
    value: '6+ months',
    evidence: confirmed(['S01'], 'ea-launch'),
  },
  wishlistMilestone: {
    value: '100K+',
    evidence: {
      ...confirmed(['S02'], 'pre-ea', historicalCheckedAt),
      note: 'Official historical milestone, not current telemetry.',
    },
  },
  demoPlayerMilestone: {
    value: '205K+',
    evidence: {
      ...confirmed(['S02'], 'pre-ea', historicalCheckedAt),
      note: 'Official historical Demo milestone announced July 21, 2026.',
    },
  },
  nextFestPlacement: {
    value: 'Top 50',
    evidence: {
      ...confirmed(['S02'], 'pre-ea', historicalCheckedAt),
      note: 'Official Steam Next Fest Demo milestone.',
    },
  },
  lastGlobalCheck: releaseCheckedAt,
} satisfies GameSnapshot;

export const releaseLabel = (() => {
  const state = gameSnapshot.releaseState as GameSnapshot['releaseState'];

  switch (state) {
    case 'prerelease':
      return 'PRERELEASE';
    case 'early-access-live':
      return 'EARLY ACCESS · LIVE';
    case 'released':
      return 'RELEASED';
  }
})();
