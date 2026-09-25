'use client';
import Link from 'next/link';
import { useState } from 'react';
import type { SearchEntry } from '../../lib/search';
export function WikiSearch({ entries }: { entries: SearchEntry[] }) {
  const [query, setQuery] = useState('');
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const results = words.length
    ? entries
        .filter((e) =>
          words.every((w) =>
            (e.title + ' ' + e.keywords).toLowerCase().includes(w),
          ),
        )
        .slice(0, 8)
    : [];
  return (
    <div className="wiki-search">
      <label htmlFor="wiki-search">Search the wiki</label>
      <div className="wiki-search-input">
        <input
          id="wiki-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Head Crab, quota, Ship, lobby…"
          aria-controls="wiki-search-results"
        />
        {query ? (
          <button type="button" onClick={() => setQuery('')}>
            Clear
          </button>
        ) : null}
      </div>
      {query.trim() ? (
        <div
          id="wiki-search-results"
          className="wiki-search-results"
          aria-live="polite"
        >
          {results.length ? (
            <ul>
              {results.map((result) => (
                <li key={result.href}>
                  <Link href={result.href} onClick={() => setQuery('')}>
                    {result.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              No match. Try a creature name, item, map or problem. Unknown enemy
              names are not invented.
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
}
