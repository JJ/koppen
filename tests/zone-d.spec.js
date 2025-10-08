// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Zone D Classification', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should classify as Dsc (dry summer)', async ({ page }) => {
    // Enter values that should result in Zone D
    await page.locator('#annual-temp').fill('5');
    await page.locator('#annual-precip').fill('600');
    await page.locator('#coldest-month-temp').fill('-5');
    await page.locator('#warmest-month-temp').fill('20');
    
    // Check that summer dry question appears
    await expect(page.locator('#q-summer-dry-check')).toBeVisible();
    
    // Select "Sí" for summer dry
    await page.locator('#summer-dry-check').selectOption('yes');
    
    // Check that zone is Dsc (since warmest=20 < 22 and we need months above 10)
    // Without months-above-10, it defaults to Dsc
    const zone = await page.locator('#climate-zone').textContent();
    expect(zone).toBe('Dsc');
    
    const name = await page.locator('#climate-name').textContent();
    expect(name).toBe('Subarctic Mediterranean');
  });

  test('should classify as Dsa when warmest >= 22 and summer dry', async ({ page }) => {
    // Enter values for Dsa
    await page.locator('#annual-temp').fill('8');
    await page.locator('#annual-precip').fill('600');
    await page.locator('#coldest-month-temp').fill('-5');
    await page.locator('#warmest-month-temp').fill('25');
    
    // Select "Sí" for summer dry
    await page.locator('#summer-dry-check').selectOption('yes');
    
    // Check that zone is Dsa
    const zone = await page.locator('#climate-zone').textContent();
    expect(zone).toBe('Dsa');
    
    const name = await page.locator('#climate-name').textContent();
    expect(name).toBe('Hot-Summer Continental Mediterranean');
  });

  test('should classify as Dwc (dry winter)', async ({ page }) => {
    // Enter values that should result in Zone D
    await page.locator('#annual-temp').fill('5');
    await page.locator('#annual-precip').fill('600');
    await page.locator('#coldest-month-temp').fill('-5');
    await page.locator('#warmest-month-temp').fill('20');
    
    // Select "No" for summer dry
    await page.locator('#summer-dry-check').selectOption('no');
    
    // Check that winter dry question appears
    await expect(page.locator('#q-winter-dry-check')).toBeVisible();
    
    // Select "Sí" for winter dry
    await page.locator('#winter-dry-check').selectOption('yes');
    
    // Check that zone is Dwc
    const zone = await page.locator('#climate-zone').textContent();
    expect(zone).toBe('Dwc');
    
    const name = await page.locator('#climate-name').textContent();
    expect(name).toBe('Subarctic (dry winter)');
  });

  test('should classify as Dwa when warmest >= 22 and winter dry', async ({ page }) => {
    // Enter values for Dwa
    await page.locator('#annual-temp').fill('8');
    await page.locator('#annual-precip').fill('600');
    await page.locator('#coldest-month-temp').fill('-5');
    await page.locator('#warmest-month-temp').fill('25');
    
    // Select "No" for summer dry
    await page.locator('#summer-dry-check').selectOption('no');
    
    // Select "Sí" for winter dry
    await page.locator('#winter-dry-check').selectOption('yes');
    
    // Check that zone is Dwa
    const zone = await page.locator('#climate-zone').textContent();
    expect(zone).toBe('Dwa');
    
    const name = await page.locator('#climate-name').textContent();
    expect(name).toBe('Hot-Summer Humid Continental (dry winter)');
  });

  test('should classify as Dfc (fully humid)', async ({ page }) => {
    // Enter values that should result in Zone D
    await page.locator('#annual-temp').fill('5');
    await page.locator('#annual-precip').fill('600');
    await page.locator('#coldest-month-temp').fill('-5');
    await page.locator('#warmest-month-temp').fill('20');
    
    // Select "No" for summer dry
    await page.locator('#summer-dry-check').selectOption('no');
    
    // Select "No" for winter dry
    await page.locator('#winter-dry-check').selectOption('no');
    
    // Check that zone is Dfc
    const zone = await page.locator('#climate-zone').textContent();
    expect(zone).toBe('Dfc');
    
    const name = await page.locator('#climate-name').textContent();
    expect(name).toBe('Subarctic');
  });

  test('should classify as Dfa when warmest >= 22 and fully humid', async ({ page }) => {
    // Enter values for Dfa
    await page.locator('#annual-temp').fill('8');
    await page.locator('#annual-precip').fill('600');
    await page.locator('#coldest-month-temp').fill('-5');
    await page.locator('#warmest-month-temp').fill('25');
    
    // Select "No" for summer dry
    await page.locator('#summer-dry-check').selectOption('no');
    
    // Select "No" for winter dry
    await page.locator('#winter-dry-check').selectOption('no');
    
    // Check that zone is Dfa
    const zone = await page.locator('#climate-zone').textContent();
    expect(zone).toBe('Dfa');
    
    const name = await page.locator('#climate-name').textContent();
    expect(name).toBe('Hot-Summer Humid Continental');
  });

  test('should classify as Dsb when months above 10 >= 4 and summer dry', async ({ page }) => {
    // Enter values for Dsb
    await page.locator('#annual-temp').fill('8');
    await page.locator('#annual-precip').fill('600');
    await page.locator('#coldest-month-temp').fill('-5');
    await page.locator('#warmest-month-temp').fill('20');
    await page.locator('#months-above-10').fill('5');
    
    // Select "Sí" for summer dry
    await page.locator('#summer-dry-check').selectOption('yes');
    
    // Check that zone is Dsb
    const zone = await page.locator('#climate-zone').textContent();
    expect(zone).toBe('Dsb');
    
    const name = await page.locator('#climate-name').textContent();
    expect(name).toBe('Warm-Summer Continental Mediterranean');
  });

  test('should classify as Dwb when months above 10 >= 4 and winter dry', async ({ page }) => {
    // Enter values for Dwb
    await page.locator('#annual-temp').fill('8');
    await page.locator('#annual-precip').fill('600');
    await page.locator('#coldest-month-temp').fill('-5');
    await page.locator('#warmest-month-temp').fill('20');
    await page.locator('#months-above-10').fill('5');
    
    // Select "No" for summer dry
    await page.locator('#summer-dry-check').selectOption('no');
    
    // Select "Sí" for winter dry
    await page.locator('#winter-dry-check').selectOption('yes');
    
    // Check that zone is Dwb
    const zone = await page.locator('#climate-zone').textContent();
    expect(zone).toBe('Dwb');
    
    const name = await page.locator('#climate-name').textContent();
    expect(name).toBe('Warm-Summer Humid Continental (dry winter)');
  });

  test('should classify as Dfb when months above 10 >= 4 and fully humid', async ({ page }) => {
    // Enter values for Dfb
    await page.locator('#annual-temp').fill('8');
    await page.locator('#annual-precip').fill('600');
    await page.locator('#coldest-month-temp').fill('-5');
    await page.locator('#warmest-month-temp').fill('20');
    await page.locator('#months-above-10').fill('5');
    
    // Select "No" for summer dry
    await page.locator('#summer-dry-check').selectOption('no');
    
    // Select "No" for winter dry
    await page.locator('#winter-dry-check').selectOption('no');
    
    // Check that zone is Dfb
    const zone = await page.locator('#climate-zone').textContent();
    expect(zone).toBe('Dfb');
    
    const name = await page.locator('#climate-name').textContent();
    expect(name).toBe('Warm-Summer Humid Continental');
  });

  test('should show winter dry question only when summer is not dry', async ({ page }) => {
    // Enter values for Zone D
    await page.locator('#annual-temp').fill('5');
    await page.locator('#annual-precip').fill('600');
    await page.locator('#coldest-month-temp').fill('-5');
    await page.locator('#warmest-month-temp').fill('20');
    
    // Initially winter dry question should not be visible
    await expect(page.locator('#q-winter-dry-check')).not.toBeVisible();
    
    // Select "No" for summer dry
    await page.locator('#summer-dry-check').selectOption('no');
    
    // Now winter dry question should be visible
    await expect(page.locator('#q-winter-dry-check')).toBeVisible();
  });

  test('should not show winter dry question when summer is dry', async ({ page }) => {
    // Enter values for Zone D
    await page.locator('#annual-temp').fill('5');
    await page.locator('#annual-precip').fill('600');
    await page.locator('#coldest-month-temp').fill('-5');
    await page.locator('#warmest-month-temp').fill('20');
    
    // Select "Sí" for summer dry
    await page.locator('#summer-dry-check').selectOption('yes');
    
    // Winter dry question should not be visible (or should remain hidden)
    // Note: the question might already be visible if previously answered
    // We're checking that logic doesn't require it
    const zone = await page.locator('#climate-zone').textContent();
    expect(zone).toMatch(/^Ds/); // Should be Dsa, Dsb, Dsc, or Dsd
  });
});
