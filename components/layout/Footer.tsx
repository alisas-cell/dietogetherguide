import Link from 'next/link';

import { Container } from '../ui/Container';
import { Brand } from './Brand';

const footerGroups = [
  {
    label: 'Start',
    links: [
      ['/beginner-guide', 'Beginner guide'],
      ['/gameplay', 'Gameplay'],
      ['/release-date', 'Release date'],
      ['/early-access', 'Early Access'],
    ],
  },
  {
    label: 'Field guide',
    links: [
      ['/monsters', 'Monsters'],
      ['/maps', 'Maps'],
      ['/loot-and-extraction', 'Loot & extraction'],
      ['/items-and-weapons', 'Items & weapons'],
    ],
  },
  {
    label: 'Crew support',
    links: [
      ['/coop', 'Co-op'],
      ['/coop/quick-join', 'Quick Join'],
      ['/save-and-reconnect', 'Save & reconnect'],
      ['/troubleshooting', 'Troubleshooting'],
    ],
  },
  {
    label: 'Site',
    links: [
      ['/updates', 'Updates'],
      ['/faq', 'FAQ'],
      ['/about', 'About'],
      ['/contact', 'Contact'],
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="site-footer">
      <Container>
        <div className="footer-lead">
          <Brand />
          <p>
            Source-checked guides for getting your crew, your loot, and the facts home.
          </p>
        </div>
        <div className="footer-grid">
          {footerGroups.map((group) => (
            <nav key={group.label} aria-label={`${group.label} links`}>
              <p>{group.label}</p>
              {group.links.map(([href, label]) => (
                <Link href={href} key={href}>
                  {label}
                </Link>
              ))}
            </nav>
          ))}
        </div>
        <div className="footer-legal">
          <p>
            Independent fan guide. Not affiliated with RetroStyle Games, Judatone Studios,
            Elegoose Games, Valve, or Steam.
          </p>
          <nav aria-label="Legal links">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
