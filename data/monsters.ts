import type {
  DetectionTrigger,
  MonsterEntry,
  VersionedField,
} from './types';
import { addedMonsters, reviewMonster, applySeptember25MonsterReview } from './current-entities';

const launchCheckedAt = '2026-08-19T05:33:14Z';
const currentCheckedAt = '2026-08-26T12:36:29Z';
const historicalCheckedAt = '2026-08-17T00:00:00Z';

const launchField = <T>(value: T): VersionedField<T> => ({
  value,
  evidence: {
    confidence: 'confirmed',
    sourceIds: ['S11'],
    verifiedAt: launchCheckedAt,
    build: 'ea-launch',
  },
});

const demoReference = (
  name: string,
  sourceIds: string[],
): VersionedField<string> => ({
  value: `${name} appears by name in official Demo or pre-Early Access patch context. Its current Early Access behavior is not yet verified.`,
  evidence: {
    confidence: 'preview-build',
    sourceIds,
    verifiedAt: historicalCheckedAt,
    build: 'demo',
  },
});

const currentMonsters: MonsterEntry[] = [
  {
    id: 'ear',
    slug: 'ear',
    name: 'Ear',
    status: 'ea-confirmed',
    summary: launchField('A blind launch-build monster that hunts by sound.'),
    detection: launchField<DetectionTrigger[]>(['sound']),
    behavior: launchField(['It cannot see; the launch post says noise sends it swinging.']),
    counterplay: launchField(['Reduce avoidable sound and give the creature room; no exact hearing distance is officially published.']),
    mapIds: launchField(['ship', 'castle']),
    behaviorTags: ['sound'],
    patchChanges: [{ date: '2026-08-19', text: 'Attack range and hearing range were reduced.', sourceIds: ['S13'] }],
    detailRoute: '/monsters/ear',
    pageReady: true,
    lastVerifiedAt: currentCheckedAt,
  },
  {
    id: 'anchorer',
    slug: 'anchorer',
    name: 'Anchorer',
    status: 'ea-confirmed',
    summary: launchField('A deaf but sharp-eyed launch-build monster.'),
    detection: launchField<DetectionTrigger[]>(['sight']),
    behavior: launchField(['It hooks from range, reels players in, and throws them; the launch post warns about mid distance.']),
    counterplay: launchField(['Break sightlines and avoid lingering at the mid-distance described in the official launch notes.']),
    mapIds: launchField(['ship', 'castle']),
    behaviorTags: ['loot-hiding'],
    patchChanges: [{ date: '2026-08-20', text: 'Attack speed was reduced.', sourceIds: ['S15'] }],
    detailRoute: '/monsters/anchorer',
    pageReady: true,
    lastVerifiedAt: currentCheckedAt,
  },
  {
    id: 'snake',
    slug: 'snake',
    name: 'Snake',
    status: 'ea-confirmed',
    summary: launchField('A launch-build monster that restrains rather than striking directly.'),
    behavior: launchField(['It wraps around a player and pins them in place.']),
    counterplay: launchField(['A trapped player can struggle free, while a teammate can pull it off faster.']),
    behaviorTags: ['movement'],
    pageReady: false,
    lastVerifiedAt: launchCheckedAt,
  },
  {
    id: 'crab',
    slug: 'crab',
    name: 'Crab',
    status: 'ea-confirmed',
    summary: launchField('A launch-build threat to both loot and crew position.'),
    behavior: launchField(['It steals loot and can grab a player and haul them away.']),
    pageReady: false,
    lastVerifiedAt: launchCheckedAt,
  },
  {
    id: 'parrot',
    slug: 'parrot',
    name: 'Parrot',
    status: 'ea-confirmed',
    summary: launchField('A launch-build alarm creature.'),
    behavior: launchField(['It is harmless alone, but its screech calls enemies within earshot.']),
    pageReady: false,
    lastVerifiedAt: launchCheckedAt,
  },
  {
    id: 'sleeper',
    slug: 'sleeper',
    name: 'Sleeper',
    status: 'ea-confirmed',
    summary: launchField('A sleeping launch-build monster that becomes persistent when disturbed.'),
    behavior: launchField(['The launch post says that once awakened, it will not lose the player trail.']),
    counterplay: launchField(['Leave it sleeping when possible.']),
    behaviorTags: ['disturbed'],
    pageReady: false,
    lastVerifiedAt: launchCheckedAt,
  },
  {
    id: 'mimic',
    slug: 'mimic',
    name: 'Mimic',
    status: 'ea-confirmed',
    summary: launchField('A launch-build impostor designed to resemble a teammate.'),
    behavior: launchField(['It can copy familiar player voices and use them to draw crewmates closer.']),
    counterplay: launchField(['Verify who you are approaching and test suspicious behavior from a safe position; the exact disguise rules are not published.']),
    mapIds: launchField(['ship', 'castle']),
    behaviorTags: ['disguise'],
    patchChanges: [{ date: '2026-06-19', text: 'The Mimic was changed to react when attacked.', sourceIds: ['S08'] }],
    detailRoute: '/monsters/mimic',
    pageReady: true,
    lastVerifiedAt: currentCheckedAt,
  },
  {
    id: 'rat',
    slug: 'rat',
    name: 'Rat',
    status: 'ea-confirmed',
    summary: launchField('Rats and their king are explicitly named in the official launch announcement.'),
    behaviorTags: ['rat-group'],
    pageReady: false,
    lastVerifiedAt: launchCheckedAt,
  },
];

currentMonsters.push({
  id: 'siren',
  slug: 'siren',
  name: 'Siren',
  status: 'ea-confirmed',
  summary: {
    value: 'A current Early Access threat with an audible pull cue and restored knockback.',
    evidence: {
      confidence: 'confirmed',
      sourceIds: ['S17'],
      verifiedAt: currentCheckedAt,
      build: 'ea-2026-08-26',
    },
  },
  detection: {
    value: ['sound'],
    evidence: {
      confidence: 'confirmed',
      sourceIds: ['S17'],
      verifiedAt: currentCheckedAt,
      build: 'ea-2026-08-26',
    },
  },
  behavior: {
    value: ['The Aug 26 patch added a pull sound and restored Siren knockback.'],
    evidence: {
      confidence: 'confirmed',
      sourceIds: ['S17'],
      verifiedAt: currentCheckedAt,
      build: 'ea-2026-08-26',
    },
  },
  counterplay: {
    value: ['Use the pull sound as a warning and avoid assuming an unpublished range or cooldown.'],
    evidence: {
      confidence: 'confirmed',
      sourceIds: ['S17'],
      verifiedAt: currentCheckedAt,
      build: 'ea-2026-08-26',
    },
  },
  mapIds: launchField(['ship', 'castle']),
  behaviorTags: ['pull-sound', 'knockback'],
  patchChanges: [{ date: '2026-08-26', text: 'A pull sound was added and knockback was restored.', sourceIds: ['S17'] }],
  detailRoute: '/monsters/siren',
  pageReady: true,
  lastVerifiedAt: currentCheckedAt,
});

const historicalEntries: Array<[string, string, string[]]> = [
  ['howler', 'Howler', ['S07']],
  ['misha', 'Misha', ['S02']],
  ['screamer', 'Screamer', ['S08']],
  ['monkey-screamer', 'Monkey Screamer', ['S02']],
  ['pirate', 'Pirate', ['S08']],
  ['shark', 'Shark', ['S02']],
  ['pirate-head', 'Pirate Head', ['S02']],
];

export const monsters: MonsterEntry[] = ([
  ...addedMonsters,
  ...currentMonsters.map(reviewMonster),
  ...historicalEntries.map(([id, name, sourceIds]) => ({
    id,
    slug: id,
    name,
    status: 'demo-evidenced' as const,
    summary: demoReference(name, sourceIds),
    pageReady: false,
    lastVerifiedAt: historicalCheckedAt,
  })),
] as MonsterEntry[]).map(applySeptember25MonsterReview);
