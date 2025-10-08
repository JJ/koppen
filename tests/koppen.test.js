/**
 * Köppen Climate Zone Calculator Tests
 * Tests all climate zones: A (Tropical), B (Dry), C (Temperate), D (Continental), E (Polar)
 */

const { chromium } = require('playwright');
const { test, expect } = require('@playwright/test');

const BASE_URL = process.env.BASE_URL || 'http://localhost:8080/index.html';

test.describe('Köppen Climate Zone Calculator', () => {
  
  // Zone A (Tropical) Tests
  test.describe('Zone A - Tropical', () => {
    test('should classify as Af (Tropical Rainforest)', async ({ page }) => {
      await page.goto(BASE_URL);
      
      // Enter annual temperature >= 18 (tropical)
      await page.fill('#annual-temp', '25');
      // Enter high annual precipitation
      await page.fill('#annual-precip', '2500');
      
      // All months above 18°C
      await page.selectOption('#all-months-above-18', 'yes');
      
      // All months above 60mm
      await page.selectOption('#always-above-60', 'yes');
      
      const zone = await page.textContent('#climate-zone');
      expect(zone).toBe('Af');
      
      const name = await page.textContent('#climate-name');
      expect(name).toBe('Tropical Rainforest');
    });

    test('should classify as Am (Tropical Monsoon)', async ({ page }) => {
      await page.goto(BASE_URL);
      
      await page.fill('#annual-temp', '26');
      await page.fill('#annual-precip', '2000');
      
      // All months above 18°C
      await page.selectOption('#all-months-above-18', 'yes');
      
      // Not all months above 60mm
      await page.selectOption('#always-above-60', 'no');
      
      // Driest month meets monsoon criteria
      await page.fill('#driest-month-precip', '30');
      
      const zone = await page.textContent('#climate-zone');
      expect(zone).toBe('Am');
      
      const name = await page.textContent('#climate-name');
      expect(name).toBe('Tropical Monsoon');
    });

    test('should classify as Aw (Tropical Savanna)', async ({ page }) => {
      await page.goto(BASE_URL);
      
      await page.fill('#annual-temp', '24');
      await page.fill('#annual-precip', '1200');
      
      // All months above 18°C
      await page.selectOption('#all-months-above-18', 'yes');
      
      await page.selectOption('#always-above-60', 'no');
      await page.fill('#driest-month-precip', '10');
      
      // Dry season in winter
      await page.selectOption('#dry-season', 'winter');
      
      const zone = await page.textContent('#climate-zone');
      expect(zone).toBe('Aw');
      
      const name = await page.textContent('#climate-name');
      expect(name).toBe('Tropical Savanna');
    });

    test('should classify as As (Tropical Savanna - dry summer)', async ({ page }) => {
      await page.goto(BASE_URL);
      
      await page.fill('#annual-temp', '25');
      await page.fill('#annual-precip', '1100');
      
      await page.selectOption('#all-months-above-18', 'yes');
      await page.selectOption('#always-above-60', 'no');
      await page.fill('#driest-month-precip', '8');
      
      // Dry season in summer
      await page.selectOption('#dry-season', 'summer');
      
      const zone = await page.textContent('#climate-zone');
      expect(zone).toBe('As');
      
      const name = await page.textContent('#climate-name');
      expect(name).toBe('Tropical Savanna (dry summer)');
    });

    test('should classify Ibagué as Af (Tropical Rainforest)', async ({ page }) => {
      await page.goto(BASE_URL);
      
      // Ibagué data from issue
      await page.fill('#annual-temp', '22.3');
      await page.fill('#annual-precip', '1902');
      
      // All months above 18°C
      await page.selectOption('#all-months-above-18', 'yes');
      
      // All months above 60mm
      await page.selectOption('#always-above-60', 'yes');
      
      const zone = await page.textContent('#climate-zone');
      expect(zone).toBe('Af');
      
      const name = await page.textContent('#climate-name');
      expect(name).toBe('Tropical Rainforest');
    });
  });

  // Zone B (Dry) Tests
  test.describe('Zone B - Dry', () => {
    test('should classify as BWh (Hot Desert)', async ({ page }) => {
      await page.goto(BASE_URL);
      
      // High temp, low precipitation (TMA * 24 >= Precipitation)
      await page.fill('#annual-temp', '25');
      await page.fill('#annual-precip', '100');
      
      const zone = await page.textContent('#climate-zone');
      expect(zone).toBe('BWh');
      
      const name = await page.textContent('#climate-name');
      expect(name).toBe('Desierto cálido');
    });

    test('should classify as BWk (Cold Desert)', async ({ page }) => {
      await page.goto(BASE_URL);
      
      await page.fill('#annual-temp', '10');
      await page.fill('#annual-precip', '100');
      
      const zone = await page.textContent('#climate-zone');
      expect(zone).toBe('BWk');
      
      const name = await page.textContent('#climate-name');
      expect(name).toBe('Desierto frío');
    });

    test('should classify as BSh (Hot Semi-arid)', async ({ page }) => {
      await page.goto(BASE_URL);
      
      // Steppe: annualPrecip > annual * 12
      await page.fill('#annual-temp', '20');
      await page.fill('#annual-precip', '300');
      
      const zone = await page.textContent('#climate-zone');
      expect(zone).toBe('BSh');
      
      const name = await page.textContent('#climate-name');
      expect(name).toBe('Caliente semiárido');
    });

    test('should classify as BSk (Cold Semi-arid)', async ({ page }) => {
      await page.goto(BASE_URL);
      
      await page.fill('#annual-temp', '12');
      await page.fill('#annual-precip', '200');
      
      const zone = await page.textContent('#climate-zone');
      expect(zone).toBe('BSk');
      
      const name = await page.textContent('#climate-name');
      expect(name).toBe('Frío semi-arido');
    });
  });

  // Zone C (Temperate) Tests - with new summer/winter dry questions
  test.describe('Zone C - Temperate', () => {
    test('should classify as Csa (Hot-Summer Mediterranean)', async ({ page }) => {
      await page.goto(BASE_URL);
      
      await page.fill('#annual-temp', '15');
      await page.fill('#annual-precip', '600');
      
      // Not all months above 18°C
      await page.selectOption('#all-months-above-18', 'no');
      
      // Zone C criteria: coldest > -3 and < 18, warmest > 10
      await page.fill('#coldest-month-temp', '5');
      await page.fill('#warmest-month-temp', '28');
      
      // Summer is dry
      await page.selectOption('#summer-dry', 'yes');
      
      // Answer third letter questions
      await page.selectOption('#warm-month-above-22', 'yes');
      await page.selectOption('#four-months-above-10', 'yes');
      
      const zone = await page.textContent('#climate-zone');
      expect(zone).toBe('Csa');
      
      const name = await page.textContent('#climate-name');
      expect(name).toBe('Hot-Summer Mediterranean');
    });

    test('should classify as Cwa (Humid Subtropical - dry winter)', async ({ page }) => {
      await page.goto(BASE_URL);
      
      await page.fill('#annual-temp', '16');
      await page.fill('#annual-precip', '900');
      
      // Not all months above 18°C
      await page.selectOption('#all-months-above-18', 'no');
      
      await page.fill('#coldest-month-temp', '6');
      await page.fill('#warmest-month-temp', '26');
      
      // Summer is not dry, winter is dry
      await page.selectOption('#summer-dry', 'no');
      await page.selectOption('#winter-dry', 'yes');
      
      // Answer third letter questions
      await page.selectOption('#warm-month-above-22', 'yes');
      await page.selectOption('#four-months-above-10', 'yes');
      
      const zone = await page.textContent('#climate-zone');
      expect(zone).toBe('Cwa');
      
      const name = await page.textContent('#climate-name');
      expect(name).toBe('Humid Subtropical (dry winter)');
    });

    test('should classify as Cfa (Humid Subtropical)', async ({ page }) => {
      await page.goto(BASE_URL);
      
      await page.fill('#annual-temp', '14');
      await page.fill('#annual-precip', '1100');
      
      // Not all months above 18°C
      await page.selectOption('#all-months-above-18', 'no');
      
      await page.fill('#coldest-month-temp', '3');
      await page.fill('#warmest-month-temp', '24');
      
      // Neither summer nor winter is dry
      await page.selectOption('#summer-dry', 'no');
      await page.selectOption('#winter-dry', 'no');
      
      // Answer third letter questions
      await page.selectOption('#warm-month-above-22', 'yes');
      await page.selectOption('#four-months-above-10', 'yes');
      
      const zone = await page.textContent('#climate-zone');
      expect(zone).toBe('Cfa');
      
      const name = await page.textContent('#climate-name');
      expect(name).toBe('Humid Subtropical');
    });

    test('should classify as Cfb (Oceanic)', async ({ page }) => {
      await page.goto(BASE_URL);
      
      await page.fill('#annual-temp', '10');
      await page.fill('#annual-precip', '800');
      
      // Not all months above 18°C
      await page.selectOption('#all-months-above-18', 'no');
      
      await page.fill('#coldest-month-temp', '2');
      await page.fill('#warmest-month-temp', '23');
      
      // No dry season
      await page.selectOption('#summer-dry', 'no');
      await page.selectOption('#winter-dry', 'no');
      
      // Answer third letter questions - warmest is 23 (> 22), but fewer than 4 months >= 10
      await page.selectOption('#warm-month-above-22', 'yes');
      await page.selectOption('#four-months-above-10', 'no');
      
      const zone = await page.textContent('#climate-zone');
      expect(zone).toBe('Cfb');
      
      const name = await page.textContent('#climate-name');
      expect(name).toBe('Oceanic');
    });
  });

  // Zone D (Continental) Tests
  test.describe('Zone D - Continental', () => {
    test('should classify as Dfa (Hot-Summer Humid Continental)', async ({ page }) => {
      await page.goto(BASE_URL);
      
      await page.fill('#annual-temp', '11');
      await page.fill('#annual-precip', '900');
      
      // Not all months above 18°C
      await page.selectOption('#all-months-above-18', 'no');
      
      // Zone D criteria: coldest <= -3, warmest > 10
      await page.fill('#coldest-month-temp', '-8');
      await page.fill('#warmest-month-temp', '24');
      
      // No dry season
      await page.selectOption('#summer-dry', 'no');
      await page.selectOption('#winter-dry', 'no');
      
      // Answer third letter questions
      await page.selectOption('#warm-month-above-22', 'yes');
      await page.selectOption('#four-months-above-10', 'yes');
      
      const zone = await page.textContent('#climate-zone');
      expect(zone).toBe('Dfa');
      
      const name = await page.textContent('#climate-name');
      expect(name).toBe('Hot-Summer Humid Continental');
    });

    test('should classify as Dsa (Hot-Summer Continental Mediterranean)', async ({ page }) => {
      await page.goto(BASE_URL);
      
      await page.fill('#annual-temp', '10');
      await page.fill('#annual-precip', '500');
      
      // Not all months above 18°C
      await page.selectOption('#all-months-above-18', 'no');
      
      await page.fill('#coldest-month-temp', '-5');
      await page.fill('#warmest-month-temp', '26');
      
      // Summer is dry
      await page.selectOption('#summer-dry', 'yes');
      
      // Answer third letter questions
      await page.selectOption('#warm-month-above-22', 'yes');
      await page.selectOption('#four-months-above-10', 'yes');
      
      const zone = await page.textContent('#climate-zone');
      expect(zone).toBe('Dsa');
      
      const name = await page.textContent('#climate-name');
      expect(name).toBe('Hot-Summer Continental Mediterranean');
    });

    test('should classify as Dwa (Hot-Summer Humid Continental - dry winter)', async ({ page }) => {
      await page.goto(BASE_URL);
      
      await page.fill('#annual-temp', '10');
      await page.fill('#annual-precip', '600');
      
      // Not all months above 18°C
      await page.selectOption('#all-months-above-18', 'no');
      
      await page.fill('#coldest-month-temp', '-12');
      await page.fill('#warmest-month-temp', '23');
      
      // Summer not dry, winter dry
      await page.selectOption('#summer-dry', 'no');
      await page.selectOption('#winter-dry', 'yes');
      
      // Answer third letter questions
      await page.selectOption('#warm-month-above-22', 'yes');
      await page.selectOption('#four-months-above-10', 'yes');
      
      const zone = await page.textContent('#climate-zone');
      expect(zone).toBe('Dwa');
      
      const name = await page.textContent('#climate-name');
      expect(name).toBe('Hot-Summer Humid Continental (dry winter)');
    });

    test('should classify Verjoyansk as Dsd (Subarctic Mediterranean - very cold winter)', async ({ page }) => {
      await page.goto(BASE_URL);
      
      // Verjoyansk data from issue
      await page.fill('#annual-temp', '-13.5');
      await page.fill('#annual-precip', '127');
      
      // Not all months above 18°C
      await page.selectOption('#all-months-above-18', 'no');
      
      await page.fill('#coldest-month-temp', '-44.5');
      await page.fill('#warmest-month-temp', '14');
      
      // Summer is dry (one summer month with precip < 2*temp)
      await page.selectOption('#summer-dry', 'yes');
      
      // No warm month above 22°C
      await page.selectOption('#warm-month-above-22', 'no');
      
      // Coldest month below -38°C
      await page.selectOption('#coldest-below-minus-38', 'yes');
      
      const zone = await page.textContent('#climate-zone');
      expect(zone).toBe('Dsd');
      
      const name = await page.textContent('#climate-name');
      expect(name).toBe('Clima continental templado frío con estación seca en verano e invierno extremadamente frío');
    });
  });

  // Zone E (Polar) Tests
  test.describe('Zone E - Polar', () => {
    test('should classify as ET (Tundra)', async ({ page }) => {
      await page.goto(BASE_URL);
      
      await page.fill('#annual-temp', '5');
      await page.fill('#annual-precip', '300');
      
      // Not all months above 18°C
      await page.selectOption('#all-months-above-18', 'no');
      
      // Warmest month 0 < temp < 10
      await page.fill('#coldest-month-temp', '-15');
      await page.fill('#warmest-month-temp', '5');
      
      const zone = await page.textContent('#climate-zone');
      expect(zone).toBe('ET');
      
      const name = await page.textContent('#climate-name');
      expect(name).toBe('Tundra');
    });

    test('should classify as EF (Ice Cap)', async ({ page }) => {
      await page.goto(BASE_URL);
      
      await page.fill('#annual-temp', '-5');
      await page.fill('#annual-precip', '100');
      
      // Not all months above 18°C
      await page.selectOption('#all-months-above-18', 'no');
      
      // Warmest month <= 0
      await page.fill('#coldest-month-temp', '-30');
      await page.fill('#warmest-month-temp', '-5');
      
      const zone = await page.textContent('#climate-zone');
      expect(zone).toBe('EF');
      
      const name = await page.textContent('#climate-name');
      expect(name).toBe('Casquete polar');
    });
  });
});
