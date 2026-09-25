import { section } from './wiki-factory';
import type { GuidePageData } from './types';
const decisions: Record<
  string,
  { heading: string; rows: Array<[string, string, string]> }
> = {
  '/items/boomerang': {
    heading: 'Handling decisions before a throw',
    rows: [
      [
        'Target ahead',
        'The outward path can hit.',
        'Check the crew is not crossing the line before throwing.',
      ],
      [
        'Weapon returning',
        'The return path can also hit, including the thrower.',
        'Leave room to react; a successful outward hit does not end the interaction.',
      ],
      [
        'Attempting a catch',
        'The introduction permits a midair catch.',
        'Use the actual on-screen controls; this wiki has no verified catch-button sequence.',
      ],
      [
        'Choosing a throw variant',
        'Three variants are mentioned.',
        'Do not label unverified variants with invented names or range bonuses.',
      ],
      [
        'Purchasing',
        'Store unlocks and prices changed in September.',
        'Read the current shop and use counter rather than an old price list.',
      ],
    ],
  },
  '/items/cover': {
    heading: 'Protection and delivery are different checks',
    rows: [
      [
        'Choosing cargo',
        'Cover is described for fragile objects.',
        'Check what your current client allows you to wrap before planning the trip.',
      ],
      [
        'Dropping an item',
        'The introduction describes protection against shattering.',
        'Do not assume immunity to every enemy interaction, impact or environmental hazard.',
      ],
      [
        'Composite delivery',
        'Successful Delivery asks for a whole, undamaged composite item.',
        'Confirm the item arrives intact; owning or applying Cover is not the achievement condition.',
      ],
      [
        'Planning a route',
        'Large-item weight changed in the same update.',
        'Protection does not establish easier carrying or a faster movement speed.',
      ],
      [
        'Budgeting',
        'No exact Cover price is published in the checked notes.',
        'Enter your actual cost in personal planning notes instead of a guessed price.',
      ],
    ],
  },
  '/items/teleport-crystal': {
    heading: 'Old advice to check before using the crystal',
    rows: [
      [
        'Standing on the crystal',
        'Flight from standing on it was removed September 18.',
        'Do not follow a route that depends on that old behavior.',
      ],
      [
        'Using it while crouched',
        'Crouched right-click received a fix.',
        'Retest on the current build before treating crouching as a permanent restriction.',
      ],
      [
        'Throwing from Ship',
        'The obstruction toward Cracken was removed.',
        'A clear throw is not evidence of a safe landing, damage or boss defeat.',
      ],
      [
        'Escaping with the crew',
        'The introduction does not promise safety.',
        'Communicate before leaving teammates or cargo in an unresolved situation.',
      ],
      [
        'Comparing exact stats',
        'Range, cooldown and price are not supplied.',
        'Use visible in-game information; this guide does not supply a hidden stat sheet.',
      ],
    ],
  },
  '/items/healing-fish': {
    heading: 'Healing, revival and achievement progress',
    rows: [
      [
        'Recovering health',
        'August 28 makes right-click fish healing faster.',
        'The change does not publish HP per use or a new maximum-health rule.',
      ],
      [
        'Helping an ally',
        'Fishy doctor counts cumulative ally healing.',
        'Check the target is a teammate and the game visibly registers health recovery.',
      ],
      [
        'Reading the 500 HP figure',
        'It is the achievement’s combined total.',
        'Do not treat the number as one fish’s healing output.',
      ],
      [
        'Recovering a downed player',
        'September revival fixes concern a separate interaction.',
        'Use the revive guide; faster fish healing does not establish an automatic revive.',
      ],
      [
        'Playing alone',
        'The achievement description explicitly mentions allies.',
        'Do not assume self-healing meets this condition without additional evidence.',
      ],
    ],
  },
  '/items/instruments': {
    heading: 'Separate the object from the carrying rule',
    rows: [
      [
        'Piano cannot join a grab',
        'A specific piano multi-grab fix shipped August 28.',
        'First check you are not holding an object that blocks extra grabs under September rules.',
      ],
      [
        'A pile moves awkwardly',
        'The heaviest item leads a multi-grab pile.',
        'Test an individual object before attributing the whole pile’s behavior to a bug.',
      ],
      [
        'Comparing violin weight',
        'Violin became lighter in the major update.',
        'Do not apply the general heavier-large-items change indiscriminately.',
      ],
      [
        'Planning sale value',
        'Current exact instrument prices are not published.',
        'Use the value actually shown in the run, including any visible damage.',
      ],
      [
        'Using an old route',
        'Weight and collision fixes can alter handling.',
        'Recheck narrow passages and transport before moving valuable instruments through them.',
      ],
    ],
  },
  '/guides/progression': {
    heading: 'A short pre-run decision sheet',
    rows: [
      [
        'Chapter selected',
        'Read whether it contains one level or two.',
        'A one-level opening chapter does not establish the length of later chapters.',
      ],
      [
        'Location previewed',
        'Choose equipment for the actual level.',
        'The location name alone does not identify every enemy or boss.',
      ],
      [
        'Quota visible',
        'Record the target before buying.',
        'Use secured money and actual prices, not old balance assumptions.',
      ],
      [
        'Run completed',
        'Record the confirmed outcome.',
        'Do not mark all achievements complete just because a chapter cleared.',
      ],
    ],
  },
  '/guides/level-order': {
    heading: 'Three labels that should not be merged',
    rows: [
      [
        'Global level',
        'A stage in the revised sequence.',
        'Ship at level 2 and Castle at level 4 are documented milestones.',
      ],
      [
        'Chapter',
        'The selection and completion grouping.',
        'Opening chapters contain one level; later ones contain two.',
      ],
      [
        'Location day',
        'Day context inside a location.',
        'Ship’s cart restriction starts at its second day, not every global level after 2.',
      ],
      [
        'Enemy set',
        'Now varies by level.',
        'Use the level preview; an unpublished assignment remains unknown.',
      ],
    ],
  },
  '/guides/quota': {
    heading: 'Worked arithmetic example — not game balance',
    rows: [
      [
        'Example target 100',
        'Example secured value 30',
        'The secured gap is 70. These numbers are user-selected examples, not an official level quota.',
      ],
      [
        'Example carried value 20',
        'Not yet accepted at the boat',
        'If it all arrives intact, the remaining gap would be 50.',
      ],
      [
        'Example estimated loot 10',
        'Still less certain than carried value',
        'Recovering it as well would reduce the projected gap to 40, not guarantee success.',
      ],
      [
        'Two-person example crew',
        'Equal division is optional',
        'Splitting the secured gap gives 35 each; the game does not require that division.',
      ],
    ],
  },
  '/guides/store-unlocks': {
    heading: 'Diagnose the shop observation precisely',
    rows: [
      [
        'Card never seen',
        'Could be unavailable for the current progression state.',
        'Record chapter and level instead of inventing an unlock requirement.',
      ],
      [
        'Previously unlocked card disappears',
        'A persistence issue was fixed September 14.',
        'A repeat on the current build is worth reporting with a reproducible sequence.',
      ],
      [
        'Card cannot be selected',
        'Selection was fixed September 18.',
        'Separate a selection failure from insufficient money or absent stock.',
      ],
      [
        'Water Pistol absent',
        'Removed from the store September 10.',
        'Do not label this explicit removal as the disappearing-card bug.',
      ],
    ],
  },
  '/guides/hauling': {
    heading: 'Resolve a stalled haul in a useful order',
    rows: [
      [
        'Cannot grab another item',
        'Release a held cart, door, cauldron, booty or hand.',
        'September explicitly blocks additional grabs during those interactions.',
      ],
      [
        'Bundle follows differently',
        'Identify the heaviest item in the pile.',
        'Multi-grab now follows that item rather than proving a new movement-speed bug.',
      ],
      [
        'No cart on Ship',
        'Check the location day.',
        'Its absence from the second day onward is separate from Ship unlocking at level 2.',
      ],
      [
        'Lift load behaves incorrectly',
        'Retest after September 18.',
        'Record the level, host role and cargo rather than assuming the old lift bug remains universal.',
      ],
    ],
  },
  '/guides/fragile-loot': {
    heading: 'An intact-delivery checklist',
    rows: [
      [
        'Before pickup',
        'Identify a composite item and any visible damage.',
        'The achievement description does not publish a complete eligible-item list.',
      ],
      [
        'Before transport',
        'Check whether Cover can be applied in the current client.',
        'The item introduction is not a guarantee of immunity to every kind of damage.',
      ],
      [
        'At narrow passages',
        'Let one person manage the load while another checks the route.',
        'This is coordination advice, not a measured damage-reduction modifier.',
      ],
      [
        'After delivery',
        'Confirm arrival and achievement state in-game.',
        'A valuable delivery and a whole undamaged composite delivery are different conditions.',
      ],
    ],
  },
  '/guides/elevators': {
    heading: 'Lift symptom, current evidence, next observation',
    rows: [
      [
        'Lift on another floor',
        'Call levers are present on every level.',
        'Look for the current lever instead of relying on an older layout tutorial.',
      ],
      [
        'Missing brake control',
        'Brake levers were removed.',
        'Its absence is not proof that the location generated incorrectly.',
      ],
      [
        'Slow winch routine',
        'September 14 reduces required turns by 2.5 times.',
        'This is a relative change, not a published universal turn count for every lift.',
      ],
      [
        'Cargo or player left behind',
        'September 18 fixes riding behavior.',
        'Capture the specific repeatable case if the current build still fails.',
      ],
    ],
  },
  '/guides/strong-arms-big-palms': {
    heading: 'Keep effect claims within the tested interaction',
    rows: [
      [
        'Door does not move faster',
        'Strong Arms excludes doors and lids.',
        'Do not use this as a universal test of whether your carrying effect is active.',
      ],
      [
        'Second grab is blocked',
        'Certain held objects block an extra grab.',
        'Release the first interaction before comparing effects.',
      ],
      [
        'Mixed pile is awkward',
        'The heaviest item leads the pile.',
        'Do not infer a hidden Big Palms strength multiplier from its motion.',
      ],
      [
        'Large loot feels different',
        'September changed weight again.',
        'Record the same item and visible effect when comparing two observations.',
      ],
    ],
  },
  '/guides/controls': {
    heading: 'Useful distinctions when a button seems wrong',
    rows: [
      [
        'Healing fish',
        'Right click is named in the official patch.',
        'The patch does not supply an equivalent binding for every controller layout.',
      ],
      [
        'Crouched crystal use',
        'Right-click behavior was fixed September 18.',
        'Check the current build before reproducing an older restriction.',
      ],
      [
        'Extra item grab',
        'The held object can block the action.',
        'A game rule can look like a binding problem even when the button is working.',
      ],
      [
        'Steam Deck layout',
        'Verified status is officially announced.',
        'Custom mappings still need their own check; no FPS guarantee follows from that badge.',
      ],
    ],
  },
  '/troubleshooting/loading': {
    heading: 'Information that makes a loading report actionable',
    rows: [
      [
        'Startup from Steam',
        'Report whether any game window opens.',
        'Do not combine this with a tutorial-only loading failure.',
      ],
      [
        'Tutorial loading',
        'Mention whether it repeats after the September 14 fix.',
        'A historical fix does not make a current reproducible report invalid.',
      ],
      [
        'Returning after disconnect',
        'Record whether someone left during a loading screen.',
        'The August 28 reconnect correction is directly relevant to that sequence.',
      ],
      [
        'Crew session',
        'Include host/client role and chapter selection.',
        'A clear sequence helps distinguish loading from a lobby waiting state.',
      ],
    ],
  },
};
export function addSeptemberDetail(page: GuidePageData): GuidePageData {
  const detail = decisions[page.route];
  if (!detail) return page;
  return {
    ...page,
    sections: [
      ...page.sections,
      {
        ...section('decision-reference', detail.heading, [
          'The distinctions below separate the official change from the observation you can make in your own run. Practical next steps are guidance, not additional hidden mechanics.',
        ]),
        table: {
          headers: ['Situation', 'Evidence or example', 'How to use it'],
          rows: detail.rows,
        },
      },
    ],
  };
}
