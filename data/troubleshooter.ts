import type { Evidence } from './types';

export type ProblemType =
  | 'no-public-lobby'
  | 'quick-join-fails'
  | 'disconnected'
  | 'reconnect-fails'
  | 'host-left'
  | 'desync'
  | 'no-window'
  | 'controller';

export type CrewRole = 'solo' | 'host' | 'joining';
export type TroubleshooterPlatform = 'windows' | 'steam-deck';

export interface TroubleshooterStep {
  order: number;
  title: string;
  instruction: string;
  basis: 'official' | 'standard';
  evidence?: Evidence;
  risk: 'none' | 'low' | 'caution';
}

export interface TroubleshooterResult {
  title: string;
  diagnosisScope: string;
  steps: TroubleshooterStep[];
  relatedGuides: Array<{ href: string; label: string }>;
  lastChecked: string;
}

export const problemOptions: Array<{ value: ProblemType; label: string }> = [
  { value: 'no-public-lobby', label: 'Cannot find a public lobby' },
  { value: 'quick-join-fails', label: 'Quick Join returns nothing or fails' },
  { value: 'disconnected', label: 'Disconnected during a run' },
  { value: 'reconnect-fails', label: 'Reconnect fails' },
  { value: 'host-left', label: 'The host left or migration failed' },
  { value: 'desync', label: 'The crew appears out of sync' },
  { value: 'no-window', label: 'The game runs but no window appears' },
  { value: 'controller', label: 'Controller or Steam Deck input issue' },
];

const official = (sourceIds: string[]): Evidence => ({
  confidence: 'confirmed',
  sourceIds,
  verifiedAt: '2026-08-17T01:44:11Z',
  build: 'pre-ea',
});

type StepSeed = Omit<TroubleshooterStep, 'order'>;

const releaseCheck: StepSeed = {
  title: 'Confirm the current release state',
  instruction:
    'Open the Steam store page and confirm that the game is available in your client. Before unlock, a missing session or play control is not a networking failure.',
  basis: 'official',
  evidence: official(['S01', 'S05']),
  risk: 'none',
};

const versionCheck: StepSeed = {
  title: 'Put every crew member on the same build',
  instruction:
    'Finish Steam updates, restart the client, and compare the displayed game version if the live build exposes one.',
  basis: 'standard',
  risk: 'none',
};

const steamRestart: StepSeed = {
  title: 'Restart the Steam session cleanly',
  instruction:
    'Exit the game and Steam, reopen Steam, and retry the in-game flow once. If the client behaves abnormally, use Steam’s installed-files verification.',
  basis: 'standard',
  risk: 'low',
};

const resultSeeds: Record<
  ProblemType,
  {
    title: string;
    scope: string;
    steps: StepSeed[];
    related: Array<{ href: string; label: string }>;
  }
> = {
  'no-public-lobby': {
    title: 'Public lobby search checklist',
    scope: 'Checks availability, version, public-lobby context, and region before deeper escalation.',
    steps: [
      releaseCheck,
      versionCheck,
      {
        title: 'Review the selected region',
        instruction:
          'Use the nearest reasonable region. If the current interface offers other nearby regions, one controlled retry can help separate availability from a general connection failure.',
        basis: 'official',
        evidence: official(['S07']),
        risk: 'none',
      },
      steamRestart,
    ],
    related: [
      { href: '/coop/quick-join', label: 'Quick Join guide' },
      { href: '/troubleshooting', label: 'General troubleshooting' },
    ],
  },
  'quick-join-fails': {
    title: 'Quick Join recovery checklist',
    scope: 'Uses the official July Quick Join context and reversible Steam checks.',
    steps: [
      releaseCheck,
      {
        title: 'Cancel and retry the current Quick Join flow once',
        instruction:
          'Return to the current lobby screen, confirm the visible region, and start one fresh search rather than repeatedly stacking requests.',
        basis: 'official',
        evidence: official(['S07']),
        risk: 'none',
      },
      versionCheck,
      steamRestart,
    ],
    related: [
      { href: '/coop/quick-join', label: 'Quick Join guide' },
      { href: '/coop', label: 'Co-op guide' },
    ],
  },
  disconnected: {
    title: 'Mid-run disconnect checklist',
    scope: 'Prioritizes the documented reconnect screen and preserves local progress.',
    steps: [
      {
        title: 'Use the in-game reconnect prompt first',
        instruction:
          'Stay in the current recovery flow and attempt the dedicated reconnect option before recreating the session.',
        basis: 'official',
        evidence: official(['S08']),
        risk: 'none',
      },
      versionCheck,
      {
        title: 'Let the current host recreate one clean lobby',
        instruction:
          'If reconnect does not recover the run, have the crew agree on one host and recreate the lobby after every player is back online.',
        basis: 'official',
        evidence: official(['S07']),
        risk: 'low',
      },
      {
        title: 'Capture the session context',
        instruction:
          'Record the build, region, host or joiner role, run stage, and visible error before reporting a recurring case.',
        basis: 'standard',
        risk: 'none',
      },
    ],
    related: [
      { href: '/save-and-reconnect', label: 'Save and reconnect guide' },
      { href: '/troubleshooting', label: 'General troubleshooting' },
    ],
  },
  'reconnect-fails': {
    title: 'Reconnect failure checklist',
    scope: 'Checks the official recovery flow, version state, and a clean session retry.',
    steps: [
      {
        title: 'Retry only the current reconnect prompt',
        instruction:
          'Use the dedicated reconnect screen once and note the exact result instead of cycling through unrelated settings.',
        basis: 'official',
        evidence: official(['S07', 'S08']),
        risk: 'none',
      },
      versionCheck,
      steamRestart,
      {
        title: 'Report a repeatable failure with context',
        instruction:
          'Include build, region, host or joining role, run stage, and the visible message so the case can be distinguished from a lobby-search issue.',
        basis: 'standard',
        risk: 'none',
      },
    ],
    related: [
      { href: '/save-and-reconnect', label: 'Save and reconnect guide' },
      { href: '/coop', label: 'Co-op guide' },
    ],
  },
  'host-left': {
    title: 'Host departure checklist',
    scope: 'Uses the official host-migration history without promising that every session can recover.',
    steps: [
      {
        title: 'Wait for the current in-game migration result',
        instruction:
          'Allow the live client to finish its host-migration or reconnect state before another player starts a replacement lobby.',
        basis: 'official',
        evidence: official(['S07']),
        risk: 'none',
      },
      versionCheck,
      {
        title: 'Choose one replacement host',
        instruction:
          'If the session cannot continue, have the crew select one replacement host and create one clean lobby rather than several competing sessions.',
        basis: 'standard',
        risk: 'low',
      },
      {
        title: 'Record whether progress returned',
        instruction:
          'Note the chapter or run state before and after recovery without changing local data. The pre-EA save history does not guarantee every Early Access outcome.',
        basis: 'official',
        evidence: official(['S08']),
        risk: 'none',
      },
    ],
    related: [
      { href: '/save-and-reconnect', label: 'Save and reconnect guide' },
      { href: '/coop/quick-join', label: 'Quick Join guide' },
    ],
  },
  desync: {
    title: 'Crew desync checklist',
    scope: 'Separates a session-state problem from version and host inconsistencies.',
    steps: [
      versionCheck,
      {
        title: 'Compare one visible state across the crew',
        instruction:
          'Confirm the same lobby, chapter, and major object state before deciding that the session is out of sync.',
        basis: 'standard',
        risk: 'none',
      },
      {
        title: 'Use the official reconnect flow for the affected player',
        instruction:
          'If one player is clearly divergent, use the current reconnect path before the whole crew abandons the session.',
        basis: 'official',
        evidence: official(['S07', 'S08']),
        risk: 'low',
      },
      steamRestart,
    ],
    related: [
      { href: '/save-and-reconnect', label: 'Save and reconnect guide' },
      { href: '/troubleshooting', label: 'General troubleshooting' },
    ],
  },
  'no-window': {
    title: 'No visible game window checklist',
    scope: 'Uses standard reversible display recovery before unsupported configuration changes.',
    steps: [
      releaseCheck,
      {
        title: 'Check the window switcher and taskbar',
        instruction:
          'Look for a game window behind another application or on another desktop and bring that existing window forward.',
        basis: 'standard',
        risk: 'none',
      },
      {
        title: 'Return to one active display temporarily',
        instruction:
          'If a display was removed or rearranged, use one active display and the operating system’s normal window-move controls for one retry.',
        basis: 'standard',
        risk: 'low',
      },
      steamRestart,
    ],
    related: [
      { href: '/troubleshooting', label: 'General troubleshooting' },
      { href: '/system-requirements', label: 'System requirements' },
    ],
  },
  controller: {
    title: 'Controller and Steam Deck checklist',
    scope: 'Uses current input prompts and standard Steam Input isolation steps.',
    steps: [
      versionCheck,
      {
        title: 'Test one input device',
        instruction:
          'Disconnect extra controllers, restart the game with one device, and confirm the current in-game button prompts.',
        basis: 'standard',
        risk: 'none',
      },
      {
        title: 'Review Steam Input for this game',
        instruction:
          'Check the game-specific Steam Input configuration and restore the prior setting if a single controlled change does not help.',
        basis: 'standard',
        risk: 'low',
      },
      {
        title: 'Treat Steam Deck support as build-sensitive',
        instruction:
          'Official pre-EA notes mention Steam Deck support fixes, but current prompts and compatibility status still need verification in the live build.',
        basis: 'official',
        evidence: official(['S07']),
        risk: 'none',
      },
    ],
    related: [
      { href: '/system-requirements', label: 'System requirements and Deck status' },
      { href: '/troubleshooting', label: 'General troubleshooting' },
    ],
  },
};

export function getTroubleshooterResult(
  problem: ProblemType,
  role: CrewRole,
  platform: TroubleshooterPlatform,
): TroubleshooterResult {
  const seed = resultSeeds[problem];
  const context = `${role === 'joining' ? 'Joining player' : role === 'host' ? 'Host' : 'Solo'} · ${platform === 'steam-deck' ? 'Steam Deck' : 'Windows'}`;
  return {
    title: seed.title,
    diagnosisScope: `${seed.scope} Context: ${context}.`,
    steps: seed.steps.map((step, index) => ({ ...step, order: index + 1 })),
    relatedGuides: seed.related,
    lastChecked: 'Aug 17, 2026',
  };
}
