import { auditFreshness } from '../lib/freshness';
import { sourceReview } from '../data/current';
const issues = auditFreshness();
console.log(
  JSON.stringify(
    {
      asOf: new Date().toISOString(),
      sourceReview,
      issues,
      errors: issues.filter((i) => i.severity === 'error').length,
      warnings: issues.filter((i) => i.severity === 'warning').length,
    },
    null,
    2,
  ),
);
if (issues.some((i) => i.severity === 'error')) process.exitCode = 1;
