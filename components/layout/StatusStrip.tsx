import { gameSnapshot, releaseLabel } from '../../data/game';
import { Container } from '../ui/Container';

export function StatusStrip() {
  return (
    <div className="status-strip" role="status" aria-label="Current game status">
      <Container className="status-strip-inner">
        <span className="status-entity">Last Pirates: Die Together</span>
        <span className="status-fact status-release">
          <span aria-hidden="true" className="status-pulse" />
          {releaseLabel}
        </span>
        <span className="status-fact">
          {gameSnapshot.playerRange.value.min}–{gameSnapshot.playerRange.value.max} players
        </span>
        <span className="status-fact">
          {gameSnapshot.demoPlayerMilestone?.value} Demo players
        </span>
        <span className="status-checked">Checked Aug 17</span>
      </Container>
    </div>
  );
}
