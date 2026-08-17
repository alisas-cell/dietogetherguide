import { describe, expect, it } from 'vitest';

import {
  getTroubleshooterResult,
  problemOptions,
  type ProblemType,
} from '../../data/troubleshooter';

const prohibited =
  /disable (?:your )?(?:antivirus|firewall)|download .*(?:dll|exe)|delete (?:your )?save|registry edit|port forward/i;

describe('co-op troubleshooter gate', () => {
  it('covers every selectable problem with useful safe results', () => {
    expect(problemOptions.length).toBeGreaterThanOrEqual(8);

    for (const option of problemOptions) {
      const result = getTroubleshooterResult(option.value as ProblemType, 'joining', 'windows');
      expect(result.steps.length, option.value).toBeGreaterThanOrEqual(3);
      expect(result.relatedGuides.length, option.value).toBeGreaterThanOrEqual(2);
      expect(result.steps.map((step) => step.order)).toEqual(
        result.steps.map((_, index) => index + 1),
      );
      expect(result.steps.map((step) => step.instruction).join(' ')).not.toMatch(
        prohibited,
      );
    }
  });

  it('traces official steps and labels standard reversible steps', () => {
    const result = getTroubleshooterResult('quick-join-fails', 'joining', 'windows');
    for (const step of result.steps) {
      if (step.basis === 'official') {
        expect(step.evidence?.sourceIds.length).toBeGreaterThan(0);
      } else {
        expect(step.basis).toBe('standard');
        expect(step.risk).not.toBe('caution');
      }
    }
  });
});
