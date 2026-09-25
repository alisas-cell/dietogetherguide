import { test, expect } from '@playwright/test';
test('search indexes entity synonyms and clears after navigation', async ({
  page,
}) => {
  await page.goto('/');
  await page.getByLabel('Search the wiki', { exact: true }).fill('cracken');
  await expect(page.locator('#wiki-search-results')).toContainText('Kraken');
  await page
    .locator('#wiki-search-results a')
    .filter({ hasText: 'Kraken' })
    .click();
  await expect(page).toHaveURL(/monsters\/kraken/);
  await expect(page.getByLabel('Search the wiki', { exact: true })).toHaveValue(
    '',
  );
});
test('Monster Finder distinguishes hook from unnamed loot disguise', async ({
  page,
}) => {
  await page.goto('/tools/monster-finder');
  await page.getByLabel('Hooks and reels players in').check();
  await page.getByRole('button', { name: 'Find matching records' }).click();
  await expect(page.locator('#monster-results')).toContainText('Anchorer');
  await page.getByLabel('Hides among loot').check();
  await page.getByRole('button', { name: 'Find matching records' }).click();
  await expect(page.locator('#monster-results')).toContainText(
    'No verified match',
  );
});
test('quota planner uses entered values and invalidates stale result', async ({
  page,
}) => {
  await page.goto('/tools/quota-planner');
  for (const [label, value] of [
    ['Quota shown in game', '100'],
    ['Value already secured', '30'],
    ['Value still being carried', '20'],
    ['Additional estimated recoverable value', '10'],
    ['Crew size', '2'],
  ])
    await page.getByLabel(label!).fill(value!);
  await page.getByRole('button', { name: 'Calculate quota gap' }).click();
  await expect(page.locator('.wiki-facts dd')).toHaveText([
    '70',
    '50',
    '40',
    '35',
  ]);
  await page.getByLabel('Value already secured').fill('40');
  await expect(page.locator('.wiki-facts')).toHaveCount(0);
});
test('progression saves locally and survives reload; invalid import preserves it', async ({
  page,
}) => {
  await page.goto('/tools/progression-tracker');
  await expect(
    page.getByRole('button', { name: 'Save locally' }),
  ).toBeEnabled();
  await page.getByLabel('Chapter', { exact: true }).fill('3');
  await page.getByLabel('Global level', { exact: true }).fill('4');
  await page.getByLabel('Location', { exact: true }).selectOption('Castle');
  await page.getByLabel('Run / crew notes').fill('QA local note');
  await page.getByRole('button', { name: 'Save locally' }).click();
  await page.reload();
  await expect(page.getByLabel('Chapter', { exact: true })).toHaveValue('3');
  await expect(page.getByLabel('Run / crew notes')).toHaveValue(
    'QA local note',
  );
  await page.getByLabel('Paste exported JSON').fill('{"version":1}');
  await page.getByRole('button', { name: 'Validate and import' }).click();
  await expect(page.getByLabel('Chapter', { exact: true })).toHaveValue('3');
  await expect(page.getByText(/Invalid progression fields/)).toBeVisible();
  expect(
    await page.evaluate(
      () =>
        JSON.parse(localStorage.getItem('dietogetherguide.progression.v1')!)
          .notes,
    ),
  ).toBe('QA local note');
});
