export type EvidenceConfidence =
  | 'confirmed'
  | 'community-reported'
  | 'preview-build'
  | 'pending-verification';

export type BuildContext =
  | 'demo'
  | 'pre-ea'
  | 'ea-launch'
  | `ea-${string}`;

export interface SourceRef {
  id: string;
  title: string;
  url: string;
  publisher: string;
  sourceType:
    | 'official-store'
    | 'official-news'
    | 'official-developer'
    | 'official-community'
    | 'steamdb'
    | 'community'
    | 'press-preview'
    | 'first-party-capture';
  publishedAt?: string;
  checkedAt: string;
  notes?: string;
}

export interface Evidence {
  confidence: EvidenceConfidence;
  sourceIds: string[];
  verifiedAt: string;
  build: BuildContext;
  note?: string;
}

export interface VersionedField<T> {
  value: T;
  evidence: Evidence;
}

export interface GameSnapshot {
  releaseState: 'prerelease' | 'early-access-live' | 'released';
  officialReleaseDate: VersionedField<string>;
  releaseTimestampUtc?: VersionedField<string>;
  playerRange: VersionedField<{ min: number; max: number }>;
  platform: VersionedField<string[]>;
  earlyAccessTarget?: VersionedField<string>;
  wishlistMilestone?: VersionedField<string>;
  demoPlayerMilestone?: VersionedField<string>;
  nextFestPlacement?: VersionedField<string>;
  lastGlobalCheck: string;
}

export type ThreatLevel = 'low' | 'medium' | 'high' | 'extreme' | 'unknown';

export type DetectionTrigger =
  | 'sound'
  | 'movement'
  | 'sight'
  | 'proximity'
  | 'attack'
  | 'item'
  | 'unknown';

export interface EntityImage {
  src: string;
  alt: string;
  sourceId: string;
}

export interface MonsterEntry {
  id: string;
  slug: string;
  name: string;
  aliases?: string[];
  image?: EntityImage;
  status: 'demo-evidenced' | 'ea-confirmed' | 'retired-or-unverified';
  summary?: VersionedField<string>;
  detection?: VersionedField<DetectionTrigger[]>;
  behavior?: VersionedField<string[]>;
  threat?: VersionedField<ThreatLevel>;
  counterplay?: VersionedField<string[]>;
  mapIds?: VersionedField<string[]>;
  itemInteractions?: VersionedField<string[]>;
  notes?: VersionedField<string[]>;
  pageReady: boolean;
  lastVerifiedAt: string;
}

export interface MapEntry {
  id: string;
  slug: string;
  name: string;
  status: 'demo' | 'ea-live' | 'announced' | 'unverified';
  setting?: VersionedField<string>;
  overview?: VersionedField<string>;
  landmarks?: VersionedField<string[]>;
  monsterIds?: VersionedField<string[]>;
  extractionNotes?: VersionedField<string[]>;
  lootNotes?: VersionedField<string[]>;
  hazards?: VersionedField<string[]>;
  image?: EntityImage;
  pageReady: boolean;
  lastVerifiedAt: string;
}

export type ItemCategory =
  | 'weapon'
  | 'utility'
  | 'consumable'
  | 'treasure'
  | 'cursed-loot'
  | 'unknown';

export interface ItemEntry {
  id: string;
  slug: string;
  name: string;
  category: ItemCategory;
  status: 'demo-evidenced' | 'ea-confirmed' | 'planned' | 'unverified';
  purpose?: VersionedField<string>;
  effect?: VersionedField<string[]>;
  acquisition?: VersionedField<string[]>;
  price?: VersionedField<number>;
  value?: VersionedField<number>;
  durability?: VersionedField<number>;
  ammo?: VersionedField<number>;
  mapIds?: VersionedField<string[]>;
  interactions?: VersionedField<string[]>;
  pageReady: boolean;
  lastVerifiedAt: string;
}

export type EffectSystem = 'rum' | 'card' | 'perk' | 'booty-stat' | 'other';

export interface EffectEntry {
  id: string;
  slug: string;
  name: string;
  system: EffectSystem;
  status: 'demo-evidenced' | 'ea-confirmed' | 'preview-build' | 'unverified';
  positiveEffects?: VersionedField<string[]>;
  negativeEffects?: VersionedField<string[]>;
  duration?: VersionedField<string>;
  acquisition?: VersionedField<string[]>;
  stacking?: VersionedField<string>;
  lastVerifiedAt: string;
}

export interface PatchEntry {
  id: string;
  slug: string;
  title: string;
  date: string;
  sourceIds: string[];
  build?: string;
  summary: string;
  changes: Array<{
    category:
      | 'monsters'
      | 'maps'
      | 'items'
      | 'coop'
      | 'save'
      | 'performance'
      | 'progression'
      | 'other';
    text: string;
    affectedEntityIds?: string[];
  }>;
  affectedRoutes: string[];
}

export interface AssetSource {
  id: string;
  localPath: string;
  sourceUrl: string;
  sourcePage: string;
  publisher: 'Steam' | 'RetroStyle Games' | 'Site Original';
  fetchedAt: string;
  role: 'hero' | 'article' | 'map' | 'monster' | 'update' | 'brand';
  description: string;
  rightsNote?: string;
}

export interface RegistrySet {
  sources: SourceRef[];
  monsters: MonsterEntry[];
  maps: MapEntry[];
  items: ItemEntry[];
  effects: EffectEntry[];
  assets: AssetSource[];
  now?: Date;
}

export interface ValidationResult {
  errors: string[];
  warnings: string[];
}
