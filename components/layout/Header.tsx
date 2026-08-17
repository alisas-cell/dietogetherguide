import Link from 'next/link';

import { Container } from '../ui/Container';
import { Brand } from './Brand';
import { MobileMenu } from './MobileMenu';
import { primaryNavigation, utilityNavigation } from './navigation';

export function Header() {
  return (
    <header className="site-header">
      <Container className="header-main">
        <Brand />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {primaryNavigation.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <MobileMenu />
      </Container>
      <div className="utility-nav-shell">
        <Container>
          <nav className="utility-nav" aria-label="Utility navigation">
            {utilityNavigation.map((item) => (
              <Link href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
        </Container>
      </div>
    </header>
  );
}
