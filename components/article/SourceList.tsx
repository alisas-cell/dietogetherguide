import { sourceById } from '../../data/sources';

const checkedDateFormatter = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  month: 'short',
  timeZone: 'UTC',
  year: 'numeric',
});

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
            <span>
              {source.publisher} · checked {checkedDateFormatter.format(new Date(source.checkedAt))}
            </span>
          </li>
        ))}
      </ul>
    </details>
  );
}
