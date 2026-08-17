import { describe, expect, it } from 'vitest';

import type { Evidence, MonsterEntry, SourceRef } from '../../data/types';
import {
  filterPublicVersionedField,
  validateRegistries,
} from '../../lib/evidence/validate';
import { assets } from '../../data/assets';
import { effects } from '../../data/effects';
import { gameSnapshot } from '../../data/game';
import { items } from '../../data/items';
import { maps } from '../../data/maps';
import { monsters } from '../../data/monsters';
import { sources } from '../../data/sources';

const confirmedEvidence: Evidence = {
  confidence: 'confirmed',
  sourceIds: ['S01'],
  verifiedAt: '2026-08-17T01:44:11Z',
  build: 'pre-ea',
};

const source: SourceRef = {
  id: 'S01',
  title: 'Last Pirates: Die Together on Steam',
  url: 'https://store.steampowered.com/app/4317790/Last_Pirates_Die_Together/',
  publisher: 'Steam',
  sourceType: 'official-store',
  checkedAt: '2026-08-17T01:44:11Z',
};

describe('evidence registry validation', () => {
  it('keeps the shipped registries valid and the release state explicitly prerelease', () => {
    const result = validateRegistries({
      sources,
      monsters,
      maps,
      items,
      effects,
      assets,
      now: new Date('2026-08-17T02:00:00Z'),
    });

    expect(result.errors).toEqual([]);
    expect(gameSnapshot.releaseState).toBe('prerelease');
    expect(gameSnapshot.releaseTimestampUtc?.value).toBe(
      '2026-08-18T17:00:00Z',
    );
  });

  it('rejects duplicate source IDs and dangling evidence references', () => {
    const result = validateRegistries({
      sources: [source, { ...source }],
      monsters: [
        {
          id: 'howler',
          slug: 'howler',
          name: 'Howler',
          status: 'demo-evidenced',
          summary: {
            value: 'Named in an official pre-Early Access patch.',
            evidence: { ...confirmedEvidence, sourceIds: ['S99'] },
          },
          pageReady: false,
          lastVerifiedAt: '2026-08-17T01:44:11Z',
        },
      ],
      maps: [],
      items: [],
      effects: [],
      assets: [],
      now: new Date('2026-08-17T02:00:00Z'),
    });

    expect(result.errors).toContain('Duplicate source id: S01');
    expect(result.errors).toContain(
      'Monster howler summary references unknown source: S99',
    );
  });

  it('rejects confirmed evidence without a source and future verification dates', () => {
    const result = validateRegistries({
      sources: [source],
      monsters: [
        {
          id: 'mimic',
          slug: 'mimic',
          name: 'Mimic',
          status: 'demo-evidenced',
          summary: {
            value: 'Pre-Early Access identity reference.',
            evidence: {
              ...confirmedEvidence,
              sourceIds: [],
              verifiedAt: '2026-08-18T00:00:00Z',
            },
          },
          pageReady: false,
          lastVerifiedAt: '2026-08-18T00:00:00Z',
        },
      ],
      maps: [],
      items: [],
      effects: [],
      assets: [],
      now: new Date('2026-08-17T02:00:00Z'),
    });

    expect(result.errors).toContain(
      'Monster mimic summary is confirmed without a source',
    );
    expect(result.errors).toContain(
      'Monster mimic summary has a future verifiedAt date',
    );
  });

  it('rejects a page-ready monster without behavior, counterplay, or map context', () => {
    const monster: MonsterEntry = {
      id: 'howler',
      slug: 'howler',
      name: 'Howler',
      status: 'ea-confirmed',
      summary: {
        value: 'A live-build monster.',
        evidence: confirmedEvidence,
      },
      pageReady: true,
      lastVerifiedAt: '2026-08-17T01:44:11Z',
    };

    const result = validateRegistries({
      sources: [source],
      monsters: [monster],
      maps: [],
      items: [],
      effects: [],
      assets: [],
      now: new Date('2026-08-17T02:00:00Z'),
    });

    expect(result.errors).toContain(
      'Page-ready monster howler is missing behavior or detection',
    );
    expect(result.errors).toContain(
      'Page-ready monster howler is missing counterplay',
    );
    expect(result.errors).toContain(
      'Page-ready monster howler is missing map context',
    );
  });

  it('never exposes a pending-verification field as a public answer', () => {
    const pendingField = {
      value: 'Unverified exact damage value',
      evidence: {
        ...confirmedEvidence,
        confidence: 'pending-verification' as const,
        sourceIds: [],
      },
    };

    expect(filterPublicVersionedField(pendingField)).toBeUndefined();
    expect(
      filterPublicVersionedField({
        value: 'Steam lists August 18, 2026.',
        evidence: confirmedEvidence,
      }),
    ).toBe('Steam lists August 18, 2026.');
  });
});
