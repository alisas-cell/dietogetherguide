import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { AdSlot } from '../components/ads/AdSlot';
import { FaqList } from '../components/article/FaqList';
import { SourceList } from '../components/article/SourceList';
import { MapCard } from '../components/database/MapCard';
import { MonsterCard } from '../components/database/MonsterCard';
import { UpdateCard } from '../components/database/UpdateCard';
import { JsonLd } from '../components/seo/JsonLd';
import { Container } from '../components/ui/Container';
import { homeFaqs } from '../content/home';
import { toolLinks } from '../content/september-hubs';
import { maps } from '../data/maps';
import { monsters } from '../data/monsters';
import { septemberPatches } from '../data/september-patches';
import { canonicalOrigin, wikiTitle } from '../lib/seo/metadata';
import { buildHomeSchemas } from '../lib/seo/schema';
const title = 'Last Pirates: Die Together Wiki — Maps, Monsters, Loot';
const description =
  'Current September guides for Last Pirates: Die Together. Explore maps, monsters, loot, equipment, chapters, achievements and co-op tools with official sources.';
export const metadata: Metadata = {
  title: { absolute: wikiTitle(title) },
  description,
  alternates: { canonical: canonicalOrigin },
  openGraph: {
    type: 'website',
    url: canonicalOrigin,
    siteName: 'Die Together Wiki',
    title: wikiTitle(title),
    description,
    images: [
      {
        url: '/images/game/steam-page-background.jpg',
        alt: 'Official Last Pirates: Die Together key art',
      },
    ],
  },
};
const hubs: Array<[string, string, string, string]> = [
  [
    '/updates/september-2026',
    'Patch log',
    'September updates',
    'Read the progression rebuild, current monster changes and subsequent fixes in date order.',
  ],
  [
    '/maps',
    'Locations',
    'Mansion · Ship · Castle',
    'Check transport, loot corrections and known progression milestones without a fabricated floor plan.',
  ],
  [
    '/monsters',
    'Bestiary',
    'Recognize the threat',
    'Separate sound hunting, head clamps, hook grabs, disguise and teleportation. Unknown assignments stay unknown.',
  ],
  [
    '/loot',
    'Cargo ledger',
    'Loot and quota',
    'Distinguish spawn points from guaranteed loot, carried value from secured money, and history from current prices.',
  ],
  [
    '/items-and-weapons',
    'Equipment',
    'Tools and weapons',
    'Boomerang, Cover and Teleport Crystal join the equipment record, with unpublished stats left blank.',
  ],
  [
    '/guides',
    'Run decisions',
    'Practical guides',
    'Use current hauling restrictions, elevator controls and store checks before committing your next load.',
  ],
];
export default function Home() {
  return (
    <>
      <JsonLd schemas={buildHomeSchemas(homeFaqs)} />
      <section className="home-hero" id="hero">
        <Container className="home-hero-grid">
          <div className="home-hero-copy">
            <p className="section-kicker">
              Independent field guide · September edition
            </p>
            <h1>
              Last Pirates: Die Together Wiki — Maps, Monsters, Loot, Updates
              &amp; Co-op Guides
            </h1>
            <p className="home-tagline">
              Know the patch. Plan the haul. Bring the crew home.
            </p>
            <p className="home-lede">
              Current-build answers backed by official announcements. Find what
              changed, identify a threat and plan your next run without
              mistaking old Demo mechanics for today’s game.
            </p>
            <div className="button-row">
              <Link
                className="button button-primary"
                href="/updates/september-2026"
              >
                Read September updates
              </Link>
              <Link className="button button-secondary" href="/beginner-guide">
                Start here
              </Link>
            </div>
            <p className="hero-source-note">
              Reviewed September 25, 2026 · Latest gameplay patch found:
              September 18
            </p>
          </div>
          <figure className="home-hero-visual">
            <div className="image-coordinate">
              DT WIKI / CURRENT FIELD NOTES
            </div>
            <Image
              alt="Official artwork of a pirate hauling treasure with crew and a monster nearby"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 42vw"
              src="/images/game/steam-page-background.jpg"
            />
            <figcaption>Official Steam artwork · source registered</figcaption>
          </figure>
        </Container>
      </section>
      <section
        className="metric-section"
        id="metrics"
        aria-label="Current game facts"
      >
        <Container className="metric-grid">
          <div>
            <strong>SEP 18</strong>
            <span>Latest gameplay patch found</span>
          </div>
          <div>
            <strong>1–4</strong>
            <span>Solo + online co-op</span>
          </div>
          <div>
            <strong>VERIFIED</strong>
            <span>Steam Deck · announced Sep 9</span>
          </div>
          <div>
            <strong>20</strong>
            <span>Steam achievements</span>
          </div>
        </Container>
      </section>
      <AdSlot pathname="/" placement="early_responsive" />
      <section className="home-section" id="current-patch">
        <Container>
          <div className="section-heading">
            <div>
              <p className="section-kicker">What changed most recently</p>
              <h2>A clearer lobby. More places to find loot.</h2>
            </div>
            <Link
              className="text-link"
              href="/updates/fresh-lobby-70-loot-spawns"
            >
              September 18 details →
            </Link>
          </div>
          <p>
            The latest gameplay announcement found in the official archive adds
            lobby previews, clearer waiting-for-host and code-copy feedback,
            plus 70 loot spawn points distributed across 15 levels. It also
            fixes lift cargo, revival, booty attachment and several enemy
            interactions. Seventy spawn points does not mean seventy extra items
            in every run.
          </p>
          <div className="live-priority-grid">
            {(
              [
                ['/lobby', 'Lobby states'],
                ['/guides/elevators', 'Current lift controls'],
                ['/revive-guide', 'Recovery fixes'],
                ['/loot', 'Loot changes'],
              ] as const
            ).map(([href, label]) => (
              <Link href={href} key={href}>
                <strong>{label}</strong>
                <span>
                  Read the current evidence and practical implications.
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>
      <AdSlot pathname="/" placement="native_primary" />
      <section className="home-section home-section-alt" id="field-guide">
        <Container>
          <div className="section-heading">
            <div>
              <p className="section-kicker">Wiki reference desk</p>
              <h2>Find the answer for this run</h2>
            </div>
            <p>
              Each guide links its current facts to a dated source and related
              tools.
            </p>
          </div>
          <div className="guide-card-grid">
            {hubs.map(([href, kicker, name, text]) => (
              <Link href={href} key={href}>
                <span>{kicker}</span>
                <h3>{name}</h3>
                <p>{text}</p>
                <b aria-hidden="true">Open guide →</b>
              </Link>
            ))}
          </div>
        </Container>
      </section>
      <AdSlot pathname="/" placement="smartlink_primary" />
      <section className="home-section" id="progression">
        <Container className="ea-delta-grid">
          <div>
            <p className="section-kicker">September progression rebuild</p>
            <h2>Check the chapter before packing the cart</h2>
            <p>
              The first four chapters each contain one level; later chapters
              have two. Ship enters at level 2 and Castle at level 4. The notes
              do not publish every level’s location, enemy set or store
              inventory, so the current preview remains your deciding reference.
            </p>
            <Link className="button button-secondary" href="/progression">
              Progression reference
            </Link>
          </div>
          <div className="delta-list">
            <div>
              <span>QUOTA</span>
              <strong>A corrected progression curve</strong>
              <p>
                September 14 fixes quotas that could drop after the reorder.
                Plan from the value on your screen, not a guessed table.
              </p>
            </div>
            <div>
              <span>STORE</span>
              <strong>Reordered unlocks and persistent cards</strong>
              <p>
                Check actual prices and uses. Water Pistol was removed from the
                store; the three new equipment entries have separate guides.
              </p>
            </div>
            <div>
              <span>HAULING</span>
              <strong>Large items became heavier</strong>
              <p>
                September supersedes the August weight reduction. Multi-grab
                follows the heaviest item, and Ship’s cart restriction is based
                on location day.
              </p>
            </div>
          </div>
        </Container>
      </section>
      <AdSlot pathname="/" placement="rectangle_300" />
      <section className="home-section home-section-alt" id="monsters-teaser">
        <Container>
          <div className="section-heading">
            <div>
              <p className="section-kicker">Current threat records</p>
              <h2>Head Crab changed shape</h2>
            </div>
            <p>
              The rebuilt creature is a jellyfish. Two other September threats
              remain unnamed in the announcement; we do not assign invented
              names or conflate them with Anchorer or Mimic.
            </p>
          </div>
          <div className="database-grid">
            {monsters
              .filter((m) =>
                ['head-crab', 'anchorer', 'man-in-shadows'].includes(m.id),
              )
              .map((monster) => (
                <MonsterCard key={monster.id} monster={monster} />
              ))}
          </div>
          <Link className="text-link section-link" href="/tools/monster-finder">
            Use Monster Finder →
          </Link>
        </Container>
      </section>
      <AdSlot pathname="/" placement="horizontal_468" />
      <section className="home-section" id="maps-teaser">
        <Container>
          <div className="section-heading">
            <div>
              <p className="section-kicker">Current locations</p>
              <h2>Mansion, Ship and Castle</h2>
            </div>
            <p>
              Current location records are separate from the Silent Cove Demo
              archive. Level-specific enemy assignments are not filled from old
              assumptions.
            </p>
          </div>
          <div className="database-grid map-grid">
            {maps
              .filter((m) => m.status === 'ea-live')
              .map((map) => (
                <MapCard key={map.id} map={map} />
              ))}
          </div>
        </Container>
      </section>
      <section className="home-section home-section-alt" id="crew-utility">
        <Container>
          <div className="section-heading">
            <div>
              <p className="section-kicker">Five practical browser tools</p>
              <h2>Identify, troubleshoot, record and calculate</h2>
            </div>
            <p>
              Tools share the wiki’s evidence. Personal notes stay local; no
              tool reads your Steam save or predicts unverified mechanics.
            </p>
          </div>
          <div className="live-priority-grid">
            {toolLinks.map(([href, label]) => (
              <Link href={href} key={href}>
                <strong>{label}</strong>
                <span>Open tool →</span>
              </Link>
            ))}
          </div>
          <p>
            Need a crew? Use <Link href="/coop/quick-join">Quick Join</Link>. If
            discovery fails, follow{' '}
            <Link href="/coop/no-game-found">No Game Found</Link>. Waiting for
            host, host migration and voice problems each have their own
            diagnostic path.
          </p>
        </Container>
      </section>
      <section className="home-section" id="latest-updates">
        <Container>
          <div className="section-heading">
            <div>
              <p className="section-kicker">Dated official announcements</p>
              <h2>The current patch sequence</h2>
            </div>
            <Link className="text-link" href="/updates">
              Full update timeline →
            </Link>
          </div>
          <div className="updates-list">
            {septemberPatches.slice(0, 3).map((patch) => (
              <UpdateCard key={patch.id} patch={patch} />
            ))}
          </div>
        </Container>
      </section>
      <section className="home-section home-section-alt" id="faq">
        <Container className="faq-home-grid">
          <div>
            <p className="section-kicker">Direct answers</p>
            <h2>Before your next run</h2>
            <p>
              Short answers from the same evidence used by the full guides. A
              dated official fix is not a promise that every related edge case
              is impossible.
            </p>
          </div>
          <FaqList items={[...homeFaqs]} />
        </Container>
      </section>
      <section className="disclaimer-section" id="disclaimer">
        <Container>
          <h2>Independent, source-led and explicit about unknowns</h2>
          <p>
            Die Together Wiki is a fan-made reference, not an official game
            service. Trademarks and artwork belong to their owners. We
            distinguish current facts, dated changes, practical suggestions and
            unverified details. No independently tested FPS, hidden damage, drop
            probability or complete level chart is claimed.
          </p>
          <p>
            <Link href="/about">
              Read the source registry and editorial method
            </Link>{' '}
            · <Link href="/contact">Send a correction</Link> ·{' '}
            <Link href="/achievements">Achievement evidence</Link> ·{' '}
            <Link href="/steam-deck">Steam Deck status</Link>
          </p>
          <SourceList sourceIds={['S01', 'S22', 'S23', 'S24', 'S25', 'S26']} />
        </Container>
      </section>
    </>
  );
}
