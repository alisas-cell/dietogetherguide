export interface EvidenceFact {
  id: string;
  claim: string;
  sourceUrl: string;
  evidence: string;
  checkedAt: string;
}
export interface PageReview {
  route: string;
  intent: string;
  body: string;
  reviewedDigest: string;
  reviewer: string;
  artifact: string;
  kind: 'editorial' | 'tool';
  facts?: EvidenceFact[];
  toolProof?: { command: string; reportPath: string; passedTests: string[]; testedDigest: string };
}
export interface RouteObservation {
  route: string;
  status: number;
  canonical: string;
  metaRobots: string;
  headerRobots: string;
  bodyDigest: string;
}
export interface ReleaseCount {
  ok: boolean;
  baselineCount: number;
  finalCount: number;
  netNew: number;
  missingBaseline: string[];
  exclusions: { route: string; reasons: string[] }[];
  errors: string[];
}
