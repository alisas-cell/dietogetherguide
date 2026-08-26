import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { AdSlot } from '../components/ads/AdSlot';
import { FaqList } from '../components/article/FaqList';
import { MapCard } from '../components/database/MapCard';
import { MonsterCard } from '../components/database/MonsterCard';
import { UpdateCard } from '../components/database/UpdateCard';
import { EvidenceBadge } from '../components/evidence/EvidenceBadge';
import { JsonLd } from '../components/seo/JsonLd';
import { Container } from '../components/ui/Container';
import { homeFaqs } from '../content/home';
import { gameSnapshot, releaseLabel } from '../data/game';
import { maps } from '../data/maps';
import { monsters } from '../data/monsters';
import { patches } from '../data/patches';
import { canonicalOrigin } from '../lib/seo/metadata';
import { buildHomeSchemas } from '../lib/seo/schema';

export const metadata: Metadata = {
  title: {
    absolute: 'Last Pirates: Die Together Wiki & Guide — Monsters, Maps & Loot',
  },
  description:
    'Source-checked Last Pirates: Die Together guides for monsters, maps, loot, co-op, Early Access updates and troubleshooting.',
  alternates: { canonical: canonicalOrigin },
  openGraph: {
    type: 'website',
    url: canonicalOrigin,
    siteName: 'Die Together Guide',
    title: 'Last Pirates: Die Together Wiki & Guide — Monsters, Maps & Loot',
    description:
      'Monsters. Maps. Loot. Get your crew home with a source-checked independent field guide.',
    images: [
      {
        url: '/images/game/steam-page-background.jpg',
        alt: 'Official Last Pirates: Die Together key art',
      },
    ],
  },
};

const startCards = [
  {
    number: '01',
    href: '/gameplay',
    title: 'Know the mission',
    description: 'Learn the extraction loop before the crew starts pulling at everything.',
  },
  {
    number: '02',
    href: '/coop',
    title: 'Build your crew',
    description: 'Set up one to four pirates, a lobby, and a recovery plan.',
  },
  {
    number: '03',
    href: '/monsters',
    title: 'Learn the threats',
    description: 'Read the evidence ledger without mistaking Demo names for a live roster.',
  },
  {
    number: '04',
    href: '/loot-and-extraction',
    title: 'Bring the loot home',
    description: 'Make the return decision before greed makes it for you.',
  },
] as const;

const guideCards = [
  ['/monsters', 'Threat ledger', 'Monsters', 'Names, triggers, behavior, and counterplay only when verified.'],
  ['/maps', 'Location charts', 'Maps', 'Current Ship and Castle records, with Demo-era Silent Cove kept separate.'],
  ['/loot-and-extraction', 'Haul protocol', 'Loot & Extraction', 'How physics, risk, and the return trip shape a run.'],
  ['/items-and-weapons', 'Equipment locker', 'Items & Weapons', 'Official patch references with no invented statistics.'],
  ['/rum-buffs-and-perks', 'Effects ledger', 'Rum / Buffs / Perks', 'Separate systems until the live build proves how they connect.'],
  ['/troubleshooting', 'Problem desk', 'Fixes', 'Reversible launch, lobby, reconnect, and control checks.'],
] as const;

const problems = [
  ['/coop/no-game-found', 'No Game Found', 'Compare versions, Steam state, lobby intent, codes, invites, and Quick Join safely.'],
  ['/save-and-reconnect', 'Disconnected mid-run', 'Use the in-game recovery flow and protect local progress.'],
  ['/performance', 'Low FPS or stutter', 'Use patch, preset, resolution, driver, file, and scene checks without random flags.'],
  ['/revive-guide', 'Downed friend recovery', 'Separate official 25/15-second timers from player-reported stamina pressure.'],
] as const;

const priorityLinks = [
  ['/solo-guide', 'Solo Guide', 'Separate balance, 25-second floor time, shop, hauling, and threats.'],
  ['/golden-weapons', 'Golden Weapons', 'Golden Sword and Hand Cannon with exact unknowns kept visible.'],
  ['/tools/monster-finder', 'Monster Finder', 'Identify a threat using transparent behavior rules.'],
  ['/coop/no-game-found', 'No Game Found', 'Fix codes, invites, and Quick Join in a safe order.'],
  ['/maps/ship', 'Ship', 'Titanic, hauling, and current Ship changes.'],
  ['/maps/castle', 'Castle', 'Heavy loot, transport, and evidence boundaries.'],
  ['/performance', 'Performance', 'Current official fixes and reversible diagnostics.'],
  ['/revive-guide', 'Revive Guide', 'Current floor timers and recovery planning.'],
] as const;

export default function Home() {
  return (
    <>
      <JsonLd schemas={buildHomeSchemas(homeFaqs)} />

      <section className="home-hero" id="hero">
        <Container className="home-hero-grid">
          <div className="home-hero-copy">
            <div className="home-eyebrow">
              <EvidenceBadge confidence="confirmed" />
              <span>Independent Early Access field guide</span>
            </div>
            <h1>Last Pirates: Die Together Guide</h1>
            <p className="home-tagline">Monsters. Maps. Loot. Get your crew home.</p>
            <p className="home-lede">
              Source-checked Early Access briefings for the extraction loop, threats,
              current locations, loot, public crews, and the problems that can strand a run.
            </p>
            <div className="button-row">
              <Link className="button button-primary" href="/beginner-guide">
                Start the Beginner Guide
              </Link>
              <Link className="button button-secondary" href="/monsters">
                Browse Monsters
              </Link>
            </div>
            <p className="hero-source-note">
              Early Access is live · evidence revalidated Aug 26, 2026
            </p>
          </div>
          <figure className="home-hero-visual">
            <div className="image-coordinate">DTG / EA LIVE / PLATE 01</div>
            <Image
              alt="Official art of a pirate hauling colorful treasure while the crew and a monster close in"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 42vw"
              src="/images/game/steam-page-background.jpg"
            />
            <figcaption>Official Steam media · localized · source registered</figcaption>
          </figure>
        </Container>
      </section>

      <section className="metric-section" id="metrics" aria-label="Quick facts">
        <Container className="metric-grid">
          <div><strong>LIVE</strong><span>Early Access</span></div>
          <div><strong>{gameSnapshot.playerRange.value.min}–{gameSnapshot.playerRange.value.max}</strong><span>Solo + online co-op</span></div>
          <div><strong>{gameSnapshot.demoPlayerMilestone?.value}</strong><span>Historical Demo milestone</span></div>
          <div><strong>{gameSnapshot.earlyAccessTarget?.value.toUpperCase()}</strong><span>Official launch target</span></div>
        </Container>
      </section>

      <AdSlot pathname="/" placement="early_responsive" />

      <section className="home-section" id="start-here">
        <Container>
          <div className="section-heading">
            <div><p className="section-kicker">Start here · Expedition route</p><h2>Four moves before the first haul</h2></div>
            <Link className="text-link" href="/beginner-guide">Open the full first-run guide <span aria-hidden="true">→</span></Link>
          </div>
          <div className="start-route-grid">
            {startCards.map((card) => (
              <Link href={card.href} key={card.number}>
                <span>{card.number}</span><h3>{card.title}</h3><p>{card.description}</p><b aria-hidden="true">→</b>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <AdSlot pathname="/" placement="native_primary" />

      <section className="home-section home-section-alt" id="field-guide">
        <Container>
          <div className="section-heading"><div><p className="section-kicker">Field guide · Codex</p><h2>Choose the problem, not the lore shelf</h2></div><p>Every hub owns one player intent and carries its own evidence state.</p></div>
          <div className="guide-card-grid">
            {guideCards.map(([href, kicker, title, description]) => (
              <Link href={href} key={href}><span>{kicker}</span><h3>{title}</h3><p>{description}</p><b aria-hidden="true">Open record →</b></Link>
            ))}
          </div>
        </Container>
      </section>

      <AdSlot pathname="/" placement="smartlink_primary" />

      <section className="home-section" id="early-access-delta">
        <Container className="ea-delta-grid">
          <div>
            <p className="section-kicker">{releaseLabel}</p>
            <h2>What Early Access includes now</h2>
            <p>The live build now includes Ship and Castle, separate solo/team tuning, daily and chapter saves, public-default lobbies, Golden Weapons, and official fixes through Aug 26.</p>
            <Link className="button button-secondary" href="/early-access">Read the evidence split</Link>
          </div>
          <div className="delta-list">
            <div><span>LIVE BUILD</span><strong>Golden Weapons</strong><p>Golden Sword and Golden Hand Cannon landed Aug 26.</p></div>
            <div><span>BALANCE</span><strong>Solo and team split</strong><p>Quota, shop, item counts, and enemy spawns tune independently.</p></div>
            <div><span>PROGRESS</span><strong>Daily + chapter saves</strong><p>The Aug 21 patch confirms both save checkpoints.</p></div>
            <div><span>LOBBIES</span><strong>Public by default</strong><p>Quick Join now sits in a live public-lobby context.</p></div>
            <div><span>LATEST</span><strong>Aug 26 balance pass</strong><p>Monster, floor-time, hauling, store, respawn, and voice changes.</p></div>
          </div>
        </Container>
        <Container>
          <div className="live-priority-grid" aria-label="Current priority guides">
            {priorityLinks.map(([href, title, description]) => <Link href={href} key={href}><strong>{title}</strong><span>{description}</span><b aria-hidden="true">→</b></Link>)}
          </div>
        </Container>
      </section>

      <AdSlot pathname="/" placement="rectangle_300" />

      <section className="home-section split-teaser" id="monsters-teaser">
        <Container>
          <div className="section-heading"><div><p className="section-kicker">Early Access threat snapshot</p><h2>Current names. No fake stat blocks.</h2></div><p>The launch announcement identifies these threats and their broad behavior. It does not establish a complete roster or hidden statistics.</p></div>
          <div className="database-grid">
            {monsters.filter((monster) => monster.status === 'ea-confirmed').slice(0, 3).map((monster) => <MonsterCard key={monster.id} monster={monster} />)}
          </div>
          <Link className="text-link section-link" href="/monsters">Open the monster evidence table <span aria-hidden="true">→</span></Link>
        </Container>
      </section>

      <AdSlot pathname="/" placement="horizontal_468" />

      <section className="home-section home-section-alt" id="maps-teaser">
        <Container>
          <div className="section-heading"><div><p className="section-kicker">Location charts</p><h2>Ship and Castle are live</h2></div><p>Those two launch locations are current. Silent Cove remains a clearly labeled Demo-era record until direct current evidence connects it to the live build.</p></div>
          <div className="database-grid map-grid">
            {maps.map((map) => <MapCard key={map.id} map={map} />)}
          </div>
        </Container>
      </section>

      <section className="crew-strip" id="crew-utility">
        <Container className="crew-strip-grid">
          <div><p className="section-kicker">Crew utility</p><h2>Public crew? Keep the recovery plan close.</h2><p>Public lobbies are enabled by default. Use Quick Join for the feature path, No Game Found for failed discovery, and the contextual troubleshooter for codes, invites, voice, version, lobby, disconnect, or reconnect symptoms.</p></div>
          <div className="button-row"><Link className="button button-primary" href="/coop/no-game-found">No Game Found</Link><Link className="button button-secondary" href="/tools/coop-troubleshooter">Open troubleshooter</Link></div>
        </Container>
      </section>

      <section className="home-section" id="latest-updates">
        <Container>
          <div className="section-heading"><div><p className="section-kicker">Verified build log</p><h2>Latest official updates</h2></div><Link className="text-link" href="/updates">Full update timeline <span aria-hidden="true">→</span></Link></div>
          <div className="updates-list">{patches.map((patch) => <UpdateCard key={patch.id} patch={patch} />)}</div>
        </Container>
      </section>

      <section className="home-section home-section-alt" id="common-problems">
        <Container>
          <div className="section-heading"><div><p className="section-kicker">Popular problems</p><h2>Get the crew moving again</h2></div><p>Safe checks first. No random DLLs, save deletion, or global security shutdowns.</p></div>
          <div className="problem-grid">
            {problems.map(([href, title, description]) => <Link href={href} key={href}><h3>{title}</h3><p>{description}</p><span>Open field note →</span></Link>)}
          </div>
        </Container>
      </section>

      <section className="home-section" id="faq">
        <Container className="faq-home-grid">
          <div><p className="section-kicker">Direct answers</p><h2>Early Access questions</h2><p>Every answer below comes from the same release and evidence registry as the rest of the site.</p><Link className="text-link" href="/faq">Read all questions <span aria-hidden="true">→</span></Link></div>
          <FaqList items={[...homeFaqs]} />
        </Container>
      </section>

      <section className="disclaimer-section" id="disclaimer">
        <Container className="disclaimer-grid">
          <div><p className="section-kicker">Source & fan disclaimer</p><h2>An independent logbook, not an official ship’s order.</h2></div>
          <div><p>Die Together Guide is not affiliated with RetroStyle Games, Judatone Studios, Elegoose Games, Valve, or Steam. Official media is locally hosted with provenance; trademarks and artwork belong to their owners.</p><p>Checked Aug 26, 2026. Current Early Access evidence and historical Demo evidence stay visibly separated.</p><div className="inline-links"><Link href="/about">Editorial method</Link><Link href="/contact">Corrections</Link><Link href="/tools">All tools</Link><a href="https://store.steampowered.com/app/4317790/Last_Pirates_Die_Together/" rel="noopener noreferrer">Official Steam page</a></div></div>
        </Container>
      </section>
    </>
  );
}
