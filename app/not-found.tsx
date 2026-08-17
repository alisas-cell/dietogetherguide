import Link from 'next/link';

import { Container } from '../components/ui/Container';

export default function NotFound() {
  return (
    <Container className="not-found">
      <p className="section-kicker">Chart ends here · 404</p>
      <h1>This route is not in the field guide.</h1>
      <p>
        The page may have moved, or the record has not passed its evidence gate.
        Return to a verified guide hub instead.
      </p>
      <div className="button-row">
        <Link className="button button-primary" href="/">
          Return home
        </Link>
        <Link className="button button-secondary" href="/beginner-guide">
          Open beginner guide
        </Link>
      </div>
    </Container>
  );
}
