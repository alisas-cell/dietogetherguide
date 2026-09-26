import { describe, expect, it } from 'vitest';
import { permitsUnrestrictedCrawl } from '../../lib/expansion/robots';
describe('robots gate fails closed until full path/group rule evaluation exists', () => {
  it('accepts an explicit unrestricted wildcard policy', () => {
    expect(permitsUnrestrictedCrawl('User-agent: *\nAllow: /\nDisallow: # empty')).toBe(true);
  });
  it.each([
    'User-agent: *\nDisallow: /new/',
    'User-agent: Googlebot\nDisallow: /new/\nUser-agent: *\nAllow: /',
    'User-agent: *\nDisallow: /new/\nAllow: /new/permitted',
    '<html>Unavailable</html>',
  ])('does not silently ignore path/group/Allow rules: %s', (text) => {
    expect(permitsUnrestrictedCrawl(text)).toBe(false);
  });
});
