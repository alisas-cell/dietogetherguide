import type {
  Evidence,
  RegistrySet,
  ValidationResult,
  VersionedField,
} from '../../data/types';

type VersionedEntity = Record<string, unknown> & {
  id: string;
  slug?: string;
};

function isVersionedField(value: unknown): value is VersionedField<unknown> {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as Record<string, unknown>;
  return 'value' in candidate && 'evidence' in candidate;
}

function entityLabel(kind: string, id: string): string {
  return `${kind} ${id}`;
}

function validateUniqueValues(
  entries: Array<{ id: string; slug?: string }>,
  kind: string,
  errors: string[],
): void {
  const ids = new Set<string>();
  const slugs = new Set<string>();

  for (const entry of entries) {
    if (ids.has(entry.id)) errors.push(`Duplicate ${kind} id: ${entry.id}`);
    ids.add(entry.id);

    if (!entry.slug) continue;
    if (slugs.has(entry.slug)) {
      errors.push(`Duplicate ${kind} slug: ${entry.slug}`);
    }
    slugs.add(entry.slug);
  }
}

function validateEvidence(
  evidence: Evidence,
  label: string,
  sourceIds: Set<string>,
  now: Date,
  errors: string[],
): void {
  if (evidence.confidence === 'confirmed' && evidence.sourceIds.length === 0) {
    errors.push(`${label} is confirmed without a source`);
  }

  for (const sourceId of evidence.sourceIds) {
    if (!sourceIds.has(sourceId)) {
      errors.push(`${label} references unknown source: ${sourceId}`);
    }
  }

  const verifiedAt = new Date(evidence.verifiedAt);
  if (Number.isNaN(verifiedAt.getTime())) {
    errors.push(`${label} has an invalid verifiedAt date`);
  } else if (verifiedAt.getTime() > now.getTime()) {
    errors.push(`${label} has a future verifiedAt date`);
  }
}

function validateVersionedEntity(
  entity: VersionedEntity,
  kind: string,
  sourceIds: Set<string>,
  now: Date,
  errors: string[],
): void {
  for (const [fieldName, fieldValue] of Object.entries(entity)) {
    if (!isVersionedField(fieldValue)) continue;
    validateEvidence(
      fieldValue.evidence,
      `${entityLabel(kind, entity.id)} ${fieldName}`,
      sourceIds,
      now,
      errors,
    );
  }
}

function hasCurrentEaEvidence(entity: VersionedEntity): boolean {
  return Object.values(entity).some(
    (value) =>
      isVersionedField(value) &&
      value.evidence.confidence === 'confirmed' &&
      value.evidence.build.startsWith('ea-') &&
      value.evidence.sourceIds.length > 0,
  );
}

export function filterPublicVersionedField<T>(
  field: VersionedField<T> | undefined,
): T | undefined {
  if (!field || field.evidence.confidence === 'pending-verification') {
    return undefined;
  }
  return field.value;
}

export function validateRegistries(registries: RegistrySet): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const now = registries.now ?? new Date();

  validateUniqueValues(registries.sources, 'source', errors);
  validateUniqueValues(registries.monsters, 'monster', errors);
  validateUniqueValues(registries.maps, 'map', errors);
  validateUniqueValues(registries.items, 'item', errors);
  validateUniqueValues(registries.effects, 'effect', errors);
  validateUniqueValues(registries.assets, 'asset', errors);

  const sourceIds = new Set(registries.sources.map((source) => source.id));

  for (const [kind, entries] of [
    ['Monster', registries.monsters],
    ['Map', registries.maps],
    ['Item', registries.items],
    ['Effect', registries.effects],
  ] as const) {
    for (const entry of entries) {
      validateVersionedEntity(
        entry as unknown as VersionedEntity,
        kind,
        sourceIds,
        now,
        errors,
      );
    }
  }

  for (const monster of registries.monsters) {
    if (
      monster.status === 'ea-confirmed' &&
      !hasCurrentEaEvidence(monster as unknown as VersionedEntity)
    ) {
      errors.push(
        `EA-confirmed monster ${monster.id} has no current EA evidence`,
      );
    }

    if (!monster.pageReady) continue;
    if (!monster.behavior && !monster.detection) {
      errors.push(
        `Page-ready monster ${monster.id} is missing behavior or detection`,
      );
    }
    if (!monster.counterplay) {
      errors.push(`Page-ready monster ${monster.id} is missing counterplay`);
    }
    if (!monster.mapIds) {
      errors.push(`Page-ready monster ${monster.id} is missing map context`);
    }
  }

  for (const map of registries.maps) {
    if (
      map.status === 'ea-live' &&
      !hasCurrentEaEvidence(map as unknown as VersionedEntity)
    ) {
      errors.push(`EA-live map ${map.id} has no current EA evidence`);
    }
  }

  for (const item of registries.items) {
    if (
      item.status === 'ea-confirmed' &&
      !hasCurrentEaEvidence(item as unknown as VersionedEntity)
    ) {
      errors.push(`EA-confirmed item ${item.id} has no current EA evidence`);
    }
  }

  for (const effect of registries.effects) {
    if (
      effect.status === 'ea-confirmed' &&
      !hasCurrentEaEvidence(effect as unknown as VersionedEntity)
    ) {
      errors.push(`EA-confirmed effect ${effect.id} has no current EA evidence`);
    }
  }

  for (const asset of registries.assets) {
    try {
      new URL(asset.sourceUrl);
      new URL(asset.sourcePage);
    } catch {
      errors.push(`Asset ${asset.id} has an invalid source URL`);
    }

    const fetchedAt = new Date(asset.fetchedAt);
    if (Number.isNaN(fetchedAt.getTime())) {
      errors.push(`Asset ${asset.id} has an invalid fetchedAt date`);
    } else if (fetchedAt.getTime() > now.getTime()) {
      errors.push(`Asset ${asset.id} has a future fetchedAt date`);
    }
  }

  return { errors, warnings };
}
