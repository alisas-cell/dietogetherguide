import type {
  DetectionTrigger,
  MonsterEntry,
  VersionedField,
} from './types';

const launchCheckedAt = '2026-08-19T05:33:14Z';
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
    pageReady: false,
    lastVerifiedAt: launchCheckedAt,
  },
  {
    id: 'anchorer',
    slug: 'anchorer',
    name: 'Anchorer',
    status: 'ea-confirmed',
    summary: launchField('A deaf but sharp-eyed launch-build monster.'),
    detection: launchField<DetectionTrigger[]>(['sight']),
    behavior: launchField(['It hooks from range, reels players in, and throws them; the launch post warns about mid distance.']),
    pageReady: false,
    lastVerifiedAt: launchCheckedAt,
  },
  {
    id: 'snake',
    slug: 'snake',
    name: 'Snake',
    status: 'ea-confirmed',
    summary: launchField('A launch-build monster that restrains rather than striking directly.'),
    behavior: launchField(['It wraps around a player and pins them in place.']),
    counterplay: launchField(['A trapped player can struggle free, while a teammate can pull it off faster.']),
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
    pageReady: false,
    lastVerifiedAt: launchCheckedAt,
  },
  {
    id: 'rat',
    slug: 'rat',
    name: 'Rat',
    status: 'ea-confirmed',
    summary: launchField('Rats and their king are explicitly named in the official launch announcement.'),
    pageReady: false,
    lastVerifiedAt: launchCheckedAt,
  },
];

const historicalEntries: Array<[string, string, string[]]> = [
  ['howler', 'Howler', ['S07']],
  ['misha', 'Misha', ['S02']],
  ['screamer', 'Screamer', ['S08']],
  ['monkey-screamer', 'Monkey Screamer', ['S02']],
  ['pirate', 'Pirate', ['S08']],
  ['shark', 'Shark', ['S02']],
  ['pirate-head', 'Pirate Head', ['S02']],
];

export const monsters = [
  ...currentMonsters,
  ...historicalEntries.map(([id, name, sourceIds]) => ({
    id,
    slug: id,
    name,
    status: 'demo-evidenced' as const,
    summary: demoReference(name, sourceIds),
    pageReady: false,
    lastVerifiedAt: historicalCheckedAt,
  })),
] satisfies MonsterEntry[];
