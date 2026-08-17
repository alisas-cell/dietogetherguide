export const homeSectionOrder = [
  'hero',
  'metrics',
  'start-here',
  'field-guide',
  'early-access-delta',
  'monsters-teaser',
  'maps-teaser',
  'crew-utility',
  'latest-updates',
  'common-problems',
  'faq',
  'disclaimer',
] as const;

export const homeFaqs = [
  {
    question: 'When does Last Pirates: Die Together enter Early Access?',
    answer:
      'Steam lists August 18, 2026. A pre-release SteamDB snapshot points to 17:00 UTC, but we treat that as a timestamp snapshot until the store actually unlocks.',
  },
  {
    question: 'How many players can play together?',
    answer:
      'Official Steam information describes online co-op for one to four players. A crew can therefore be a solo pirate or a group of up to four.',
  },
  {
    question: 'Is this an official game website?',
    answer:
      'No. Die Together Guide is an independent fan-made field guide. We cite official sources and separate Demo evidence from facts verified for Early Access.',
  },
  {
    question: 'Will the Demo guides still be useful?',
    answer:
      'They remain useful for the documented extraction loop, Silent Cove context, and pre-EA feature history, but every build-sensitive detail is labeled and queued for a launch-day recheck.',
  },
  {
    question: 'Does Early Access add maps and monsters?',
    answer:
      'The official store promises a new map, fresh monsters, and more content than the Demo. Exact live names and quantities remain unconfirmed before unlock.',
  },
  {
    question: 'How long is Early Access expected to last?',
    answer:
      'The developers currently say they are aiming for six months or more and will keep the game in Early Access until it is ready for 1.0.',
  },
] as const;
