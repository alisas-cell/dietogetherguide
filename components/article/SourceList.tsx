import { sourceById } from '../../data/sources';

export function SourceList({ sourceIds }: { sourceIds: string[] }) {
  const listedSources = sourceIds
    .map((sourceId) => sourceById.get(sourceId))
    .filter((source) => source !== undefined);

  return (
    <details className="source-list">
      <summary>How we verified this</summary>
      <ul>
        {listedSources.map((source) => (
          <li key={source.id}>
            <a href={source.url} rel="noopener noreferrer">
              {source.title}
            </a>
            <span>{source.publisher} · checked Aug 17, 2026</span>
          </li>
        ))}
      </ul>
    </details>
  );
}
