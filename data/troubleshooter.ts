import type { Evidence } from './types';

export type ProblemType =
  | 'waiting-for-host'
  | 'copied-code'
  | 'revive-attachment'
  | 'no-public-lobby'
  | 'quick-join-fails'
  | 'join-code-fails'
  | 'steam-invite-fails'
  | 'disconnected'
  | 'reconnect-fails'
  | 'host-left'
  | 'desync'
  | 'no-window'
  | 'controller'
  | 'voice-open-deck'
  | 'version-mismatch'
  | 'lobby-visibility';

export type CrewRole = 'solo' | 'host' | 'joining';
export type TroubleshooterPlatform = 'windows' | 'steam-deck';
export type ConnectionMethod = 'quick-join' | 'join-code' | 'steam-invite';
export type LobbyVisibility = 'public' | 'private' | 'not-sure';

export interface TroubleshooterContext {
  connectionMethod: ConnectionMethod;
  lobbyVisibility: LobbyVisibility;
  sameVersion: 'yes' | 'no' | 'not-sure';
  steamOnline: 'yes' | 'no' | 'not-sure';
}

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
  { value:'waiting-for-host',label:'Lobby says Waiting for host' },
  { value:'copied-code',label:'Code copied but the crew cannot join' },
  { value:'revive-attachment',label:'Teammate revival or booty attachment fails' },
  { value: 'no-public-lobby', label: 'Cannot find a public lobby' },
  { value: 'quick-join-fails', label: 'Quick Join returns nothing or fails' },
  { value: 'join-code-fails', label: 'A join code fails' },
  { value: 'steam-invite-fails', label: 'A Steam invite fails' },
  { value: 'disconnected', label: 'Disconnected during a run' },
  { value: 'reconnect-fails', label: 'Reconnect fails' },
  { value: 'host-left', label: 'The host left or migration failed' },
  { value: 'desync', label: 'The crew appears out of sync' },
  { value: 'no-window', label: 'The game runs but no window appears' },
  { value: 'controller', label: 'Controller or Steam Deck input issue' },
  { value: 'voice-open-deck', label: 'Voice chat fails on the open deck' },
  { value: 'version-mismatch', label: 'Crew versions do not match' },
  { value: 'lobby-visibility', label: 'Public/private lobby confusion' },
];

const official = (sourceIds: string[]): Evidence => ({
  confidence: 'confirmed',
  sourceIds,
  verifiedAt: '2026-09-25T00:00:00Z',
  build: 'ea-2026-09-18',
});

type StepSeed = Omit<TroubleshooterStep, 'order'>;

const releaseCheck: StepSeed = {
  title: 'Confirm the full game and current client state',
  instruction:
    'Early Access is live. Confirm the full game rather than the separate Demo is selected, finish Steam updates, and refresh the library state before treating a missing control as a networking failure.',
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
 'waiting-for-host': {title:'Waiting for host checklist',scope:'Distinguishes an expected lobby state from failed discovery.',steps:[
  {title:'Read the September lobby state',instruction:'September 18 adds previews and explicit Waiting for host feedback. This state is not the same as No Game Found.',basis:'official',evidence:official(['S25']),risk:'none'},
  {title:'Ask the host to confirm session state',instruction:'Check whether the host is still selecting or starting the chapter. Compare the intended lobby before retrying an invite.',basis:'standard',risk:'none'},versionCheck
 ],related:[{href:'/lobby',label:'Lobby states'},{href:'/coop/no-game-found',label:'No Game Found'}]},
 'copied-code': {title:'Copied code checklist',scope:'A clipboard confirmation is not proof of a reachable lobby.',steps:[
  {title:'Confirm the host’s current code',instruction:'September 18 puts copy feedback on the code button. A copied value may still refer to an old or different lobby.',basis:'official',evidence:official(['S25']),risk:'none'},
  versionCheck,{title:'Retry one intended method',instruction:'Confirm Steam is online and use either the current host code or one fresh invite. Avoid parallel search attempts.',basis:'standard',risk:'none'}
 ],related:[{href:'/lobby',label:'Lobby feedback'},{href:'/coop/no-game-found',label:'Join errors'}]},
 'revive-attachment': {title:'Revive and attachment checklist',scope:'Uses the September recovery fixes without inventing stamina costs.',steps:[
  {title:'Update before testing the recovery interaction',instruction:'September 18 fixed teammate revival and booty attachment and made Anchor/Crab release players during host migration.',basis:'official',evidence:official(['S25']),risk:'none'},
  {title:'Record the exact failed action',instruction:'Separate attaching, carrying and reviving. Note the level, host role, held objects and whether migration occurred; preserve all save data.',basis:'standard',risk:'none'},versionCheck
 ],related:[{href:'/revive-guide',label:'Revive guide'},{href:'/host-migration',label:'Host migration'}]},
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
  'join-code-fails': {
    title: 'Join-code recovery checklist',
    scope: 'Separates a stale code from version, Steam-session, and lobby-visibility problems.',
    steps: [
      versionCheck,
      {
        title: 'Confirm the host is still in the same lobby',
        instruction: 'Ask the host to read the current code from the active lobby and enter it once exactly as shown.',
        basis: 'standard',
        risk: 'none',
      },
      {
        title: 'Compare one Steam invite',
        instruction: 'If the code still fails, try one direct Steam invite to learn whether the problem is code-specific or affects the whole session.',
        basis: 'standard',
        risk: 'none',
      },
      steamRestart,
    ],
    related: [
      { href: '/coop/no-game-found', label: 'No Game Found fixes' },
      { href: '/coop/quick-join', label: 'Quick Join guide' },
    ],
  },
  'steam-invite-fails': {
    title: 'Steam-invite recovery checklist',
    scope: 'Checks the Steam presence, version, and alternate current lobby path without random network changes.',
    steps: [
      versionCheck,
      {
        title: 'Confirm both Steam accounts are online',
        instruction: 'Make sure both players are signed in, visible to Steam, and can receive a fresh invite from the current lobby.',
        basis: 'standard',
        risk: 'none',
      },
      {
        title: 'Compare the lobby code or Quick Join path',
        instruction: 'Use one alternate supported connection method to identify whether only the Steam invite handoff is failing.',
        basis: 'official',
        evidence: official(['S07', 'S16']),
        risk: 'none',
      },
      steamRestart,
    ],
    related: [
      { href: '/coop/no-game-found', label: 'No Game Found fixes' },
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
          'Steam Deck Verified was announced September 9 after keyboard and navigation fixes. This does not guarantee an exact FPS or fix every custom Steam Input layout.',
        basis: 'official',
        evidence: official(['S22']),
        risk: 'none',
      },
    ],
    related: [
      { href: '/system-requirements', label: 'System requirements and Deck status' },
      { href: '/troubleshooting', label: 'General troubleshooting' },
    ],
  },
  'voice-open-deck': {
    title: 'Open-deck voice checklist',
    scope: 'Starts from the Aug 26 open-deck voice fix, then checks reversible voice settings.',
    steps: [
      versionCheck,
      {
        title: 'Confirm the Aug 26 or newer client is installed',
        instruction: 'The official Aug 26 notes include an open-deck voice fix, so finish current Steam updates before changing audio configuration.',
        basis: 'official',
        evidence: official(['S17']),
        risk: 'none',
      },
      {
        title: 'Check the selected input device and noise suppression',
        instruction: 'Use the normal in-game and operating-system input selectors, then test voice with one crewmate.',
        basis: 'official',
        evidence: official(['S15']),
        risk: 'low',
      },
    ],
    related: [
      { href: '/coop', label: 'Co-op guide' },
      { href: '/updates', label: 'Current update history' },
    ],
  },
  'version-mismatch': {
    title: 'Version mismatch checklist',
    scope: 'Brings every player onto one current Steam build before retesting the lobby.',
    steps: [
      versionCheck,
      releaseCheck,
      {
        title: 'Recreate one clean lobby',
        instruction: 'After every player finishes the update and restarts Steam, have one agreed host create a fresh lobby and invite the crew again.',
        basis: 'standard',
        risk: 'none',
      },
    ],
    related: [
      { href: '/updates', label: 'Current update history' },
      { href: '/coop/no-game-found', label: 'No Game Found fixes' },
    ],
  },
  'lobby-visibility': {
    title: 'Lobby visibility checklist',
    scope: 'Checks whether the host intended a public lobby or a private invite/code flow.',
    steps: [
      {
        title: 'Confirm the intended lobby visibility',
        instruction: 'Public lobbies are enabled by default in the Aug 21 build; a private crew should use the current invite or code shown by the host.',
        basis: 'official',
        evidence: official(['S16']),
        risk: 'none',
      },
      versionCheck,
      {
        title: 'Retry one matching connection method',
        instruction: 'Use Quick Join for a public search, or the host’s current invite/code for a private session. Do not stack several searches at once.',
        basis: 'standard',
        risk: 'none',
      },
    ],
    related: [
      { href: '/coop/quick-join', label: 'Quick Join guide' },
      { href: '/coop/no-game-found', label: 'No Game Found fixes' },
    ],
  },
};

export function getTroubleshooterResult(
  problem: ProblemType,
  role: CrewRole,
  platform: TroubleshooterPlatform,
  extra: TroubleshooterContext = {
    connectionMethod: 'quick-join',
    lobbyVisibility: 'not-sure',
    sameVersion: 'not-sure',
    steamOnline: 'not-sure',
  },
): TroubleshooterResult {
  const seed = resultSeeds[problem];
  const contextualSteps:StepSeed[]=[];
  if(extra.steamOnline==='no')contextualSteps.push({title:'Restore Steam online state first',instruction:'Bring Steam online before retrying an online crew connection. A copied code cannot make an offline client join a session.',basis:'standard',risk:'none'});
  if(extra.sameVersion==='no')contextualSteps.push(versionCheck);
  if(extra.connectionMethod==='quick-join'&&extra.lobbyVisibility==='private')contextualSteps.push({title:'Use the intended private connection path',instruction:'Quick Join searches public sessions. Ask the agreed host for the current private invite or code instead of repeating a public search for that crew.',basis:'standard',risk:'none'});
  if(problem==='host-left')contextualSteps.push({title:'Check the September migration corrections',instruction:'September 10 fixed players getting stuck after migration. September 18 makes Anchor and Crab release captured players. These fixes do not promise every interrupted session recovers.',basis:'official',evidence:official(['S23','S25']),risk:'none'});
  const context = `${role === 'joining' ? 'Joining player' : role === 'host' ? 'Host' : 'Solo'} · ${platform === 'steam-deck' ? 'Steam Deck' : 'Windows'}`;
  return {
    title: seed.title,
    diagnosisScope: `${seed.scope} Context: ${context}; ${extra.connectionMethod}; ${extra.lobbyVisibility} lobby; same version: ${extra.sameVersion}; Steam online: ${extra.steamOnline}.`,
    steps: [...contextualSteps,...seed.steps.filter(step=>!contextualSteps.some(existing=>existing.title===step.title))].map((step, index) => ({ ...step, order: index + 1 })),
    relatedGuides: seed.related,
    lastChecked: 'Sep 25, 2026',
  };
}
