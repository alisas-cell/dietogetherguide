import { REVIEWED_AT } from './current';
export interface AchievementRecord {
  id: string;
  name: string;
  condition: string | null;
  hidden: null;
  multiplayer: string;
  sourceIds: string[];
  lastChecked: string;
}
const rows: Array<[string, string, string | null]> = [
  ['pulled-yourself', 'Pulled yourself', 'Perform a self-revive.'],
  ['first-run', 'First run', 'Finish the opening day.'],
  ['money-first', 'Money first!', 'Pay a coin to the Monkey.'],
  [
    'clean-cut',
    'Clean cut',
    'Recover through a revive after the Guillotine takes your booty.',
  ],
  [
    'dont-blink',
    'Don’t blink',
    'Defeat Man in Shadows (the achievement description uses Man in Shadow).',
  ],
  ['cashback', 'Cashback', 'Activate the Golden Butt cashback effect.'],
  [
    'no-head',
    'No Head, No Problem',
    'Defeat Head Man; do not assume this means Head Crab.',
  ],
  ['graduated', 'Graduated', 'Finish the tutorial.'],
  ['shark-on-land', 'Shark on land', 'Defeat the Shark.'],
  [
    'nine-lives',
    'Nine lives',
    'Use Iron Butt for at least three revives within one level.',
  ],
  ['rich-deadman', 'Rich Deadman', null],
  [
    'full-bestiary',
    'Full bestiary',
    'Defeat the six enemies referred to by the achievement. The exact six are not listed.',
  ],
  [
    'big-money',
    'Big Money',
    'Bring more than 1300¢ to the boat in a single delivery.',
  ],
  [
    'successful-delivery',
    'Successful Delivery',
    'Return a composite item intact, with no damage.',
  ],
  [
    'one-shot-one-boss',
    'One shot - one boss',
    'Defeat an enemy using the Cannon. The title alone does not require a boss.',
  ],
  ['loud-deaths', 'Loud deaths', 'Defeat two enemies with the same Bomb.'],
  ['all-circles', 'All circles of hell', 'Finish every chapter.'],
  ['full-clear', 'Full clear', 'Return all loot that spawned in one level.'],
  [
    'fishy-doctor',
    'Fishy doctor',
    'Restore a cumulative 500 HP to allies with Healing Fish.',
  ],
  ['on-the-top', 'On the top', null],
];
export const achievements: AchievementRecord[] = rows.map(
  ([id, name, condition]) => ({
    id,
    name,
    condition,
    hidden: null,
    multiplayer:
      id === 'fishy-doctor'
        ? 'Allies required by the description'
        : 'Not specified separately',
    sourceIds: ['S26'],
    lastChecked: REVIEWED_AT,
  }),
);
