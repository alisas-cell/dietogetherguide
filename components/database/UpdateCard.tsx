import Link from 'next/link';

import type { PatchEntry } from '../../data/types';

export function UpdateCard({ patch }: { patch: PatchEntry }) {
  return (
    <article className="update-card">
      <div className="update-date">
        <time dateTime={patch.date}>{patch.date}</time>
        <span>Official update</span>
      </div>
      <div>
        <h3>{patch.title}</h3>
        <p>{patch.summary}</p>
        <ul>
          {patch.changes.slice(0, 3).map((change) => (
            <li key={change.text}>{change.text}</li>
          ))}
        </ul>
        {patch.affectedRoutes[0] ? (
          <Link className="text-link" href={patch.affectedRoutes[0]}>
            See affected guide <span aria-hidden="true">→</span>
          </Link>
        ) : null}
      </div>
    </article>
  );
}
