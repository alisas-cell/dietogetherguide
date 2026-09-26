// Conservative scaffold: do not claim support for Allow precedence or user-agent rule grouping.
// A restrictive file is held for an RFC-aware per-route parser in the integration phase.
export function permitsUnrestrictedCrawl(text: string): boolean {
  const lines = text.split('\n').map((line) => line.split('#')[0]!.trim());
  return lines.some((line) => /^user-agent:\s*\*$/i.test(line)) &&
    !lines.some((line) => /^disallow\s*:\s*\S/i.test(line));
}
