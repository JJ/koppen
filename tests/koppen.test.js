/**
 * Köppen Climate Zone Calculator Tests
 * Tests for zones C (Temperate) and D (Continental) with new summer/winter dry questions
 */

const { chromium } = require('playwright');
const { test, expect } = require('@playwright/test');

const BASE_URL = process.env.BASE_URL || 'http://localhost:8080/index.html';

test.describe('Köppen Climate Zone Calculator', () => {
  
  // Zone C (Temperate) Tests - with new summer/winter dry questions
  test.describe('Zone C - Temperate', () => {
    test('should classify as Csa (Hot-Summer Mediterranean)', async ({ page }) => {
      await page.goto(BASE_URL);
      
      await page.fill('#annual-temp', '15');
      await page.fill('#annual-precip', '600');
      
      // Zone C criteria: coldest > -3 and < 18, warmest > 10
      await page.fill('#coldest-month-temp', '5');
      await page.fill('#warmest-month-temp', '28');
      
      await page.fill('#months-above-10', '8');
      
      // Summer is dry
      await page.selectOption('#summer-dry', 'yes');
      
      const zone = await page.textContent('#climate-zone');
      expect(zone).toBe('Csa');
      
      const name = await page.textContent('#climate-name');
      expect(name).toBe('Hot-Summer Mediterranean');
    });

    test('should classify as Csb (Warm-Summer Mediterranean)', async ({ page }) => {
      await page.goto(BASE_URL);
      
      await page.fill('#annual-temp', '14');
      await page.fill('#annual-precip', '700');
      
      await page.fill('#coldest-month-temp', '4');
      await page.fill('#warmest-month-temp', '20');
      
      await page.fill('#months-above-10', '5');
      
      // Summer is dry
      await page.selectOption('#summer-dry', 'yes');
      
      const zone = await page.textContent('#climate-zone');
      expect(zone).toBe('Csb');
      
      const name = await page.textContent('#climate-name');
      expect(name).toBe('Warm-Summer Mediterranean');
    });

    test('should classify as Csc (Cool-Summer Mediterranean)', async ({ page }) => {
      await page.goto(BASE_URL);
      
      await page.fill('#annual-temp', '10');
      await page.fill('#annual-precip', '500');
      
      await page.fill('#coldest-month-temp', '2');
      await page.fill('#warmest-month-temp', '16');
      
      await page.fill('#months-above-10', '3');
      
      // Summer is dry
      await page.selectOption('#summer-dry', 'yes');
      
      const zone = await page.textContent('#climate-zone');
      expect(zone).toBe('Csc');
      
      const name = await page.textContent('#climate-name');
      expect(name).toBe('Cool-Summer Mediterranean');
    });

    test('should classify as Cwa (Humid Subtropical - dry winter)', async ({ page }) => {
      await page.goto(BASE_URL);
      
      await page.fill('#annual-temp', '18');
      await page.fill('#annual-precip', '900');
      
      await page.fill('#coldest-month-temp', '8');
      await page.fill('#warmest-month-temp', '28');
      
      await page.fill('#months-above-10', '10');
      
      // Summer not dry, winter dry
      await page.selectOption('#summer-dry', 'no');
      await page.selectOption('#winter-dry', 'yes');
      
      const zone = await page.textContent('#climate-zone');
      expect(zone).toBe('Cwa');
      
      const name = await page.textContent('#climate-name');
      expect(name).toBe('Humid Subtropical (dry winter)');
    });

    test('should classify as Cwb (Subtropical Highland - dry winter)', async ({ page }) => {
      await page.goto(BASE_URL);
      
      await page.fill('#annual-temp', '16');
      await page.fill('#annual-precip', '800');
      
      await page.fill('#coldest-month-temp', '6');
      await page.fill('#warmest-month-temp', '20');
      
      await page.fill('#months-above-10', '6');
      
      // Summer not dry, winter dry
      await page.selectOption('#summer-dry', 'no');
      await page.selectOption('#winter-dry', 'yes');
      
      const zone = await page.textContent('#climate-zone');
      expect(zone).toBe('Cwb');
      
      const name = await page.textContent('#climate-name');
      expect(name).toBe('Subtropical Highland (dry winter)');
    });

    test('should classify as Cwc (Cold Subtropical Highland - dry winter)', async ({ page }) => {
      await page.goto(BASE_URL);
      
      await page.fill('#annual-temp', '12');
      await page.fill('#annual-precip', '600');
      
      await page.fill('#coldest-month-temp', '3');
      await page.fill('#warmest-month-temp', '17');
      
      await page.fill('#months-above-10', '3');
      
      // Summer not dry, winter dry
      await page.selectOption('#summer-dry', 'no');
      await page.selectOption('#winter-dry', 'yes');
      
      const zone = await page.textContent('#climate-zone');
      expect(zone).toBe('Cwc');
      
      const name = await page.textContent('#climate-name');
      expect(name).toBe('Cold Subtropical Highland (dry winter)');
    });

    test('should classify as Cfa (Humid Subtropical)', async ({ page }) => {
      await page.goto(BASE_URL);
      
      await page.fill('#annual-temp', '17');
      await page.fill('#annual-precip', '1000');
      
      await page.fill('#coldest-month-temp', '7');
      await page.fill('#warmest-month-temp', '27');
      
      await page.fill('#months-above-10', '9');
      
      // No dry season
      await page.selectOption('#summer-dry', 'no');
      await page.selectOption('#winter-dry', 'no');
      
      const zone = await page.textContent('#climate-zone');
      expect(zone).toBe('Cfa');
      
      const name = await page.textContent('#climate-name');
      expect(name).toBe('Humid Subtropical');
    });

    test('should classify as Cfb (Oceanic)', async ({ page }) => {
      await page.goto(BASE_URL);
      
      await page.fill('#annual-temp', '12');
      await page.fill('#annual-precip', '800');
      
      await page.fill('#coldest-month-temp', '3');
      await page.fill('#warmest-month-temp', '18');
      
      await page.fill('#months-above-10', '4');
      
      // No dry season
      await page.selectOption('#summer-dry', 'no');
      await page.selectOption('#winter-dry', 'no');
      
      const zone = await page.textContent('#climate-zone');
      expect(zone).toBe('Cfb');
      
      const name = await page.textContent('#climate-name');
      expect(name).toBe('Oceanic');
    });

    test('should classify as Cfc (Subpolar Oceanic)', async ({ page }) => {
      await page.goto(BASE_URL);
      
      await page.fill('#annual-temp', '8');
      await page.fill('#annual-precip', '700');
      
      await page.fill('#coldest-month-temp', '0');
      await page.fill('#warmest-month-temp', '14');
      
      await page.fill('#months-above-10', '2');
      
      // No dry season
      await page.selectOption('#summer-dry', 'no');
      await page.selectOption('#winter-dry', 'no');
      
      const zone = await page.textContent('#climate-zone');
      expect(zone).toBe('Cfc');
      
      const name = await page.textContent('#climate-name');
      expect(name).toBe('Subpolar Oceanic');
    });
  });

  // Zone D (Continental) Tests
  test.describe('Zone D - Continental', () => {
    test('should classify as Dsa (Hot-Summer Continental Mediterranean)', async ({ page }) => {
      await page.goto(BASE_URL);
      
      await page.fill('#annual-temp', '10');
      await page.fill('#annual-precip', '600');
      
      // Zone D criteria: coldest <= -3, warmest > 10
      await page.fill('#coldest-month-temp', '-5');
      await page.fill('#warmest-month-temp', '26');
      
      await page.fill('#months-above-10', '6');
      
      // Summer is dry
      await page.selectOption('#summer-dry', 'yes');
      
      const zone = await page.textContent('#climate-zone');
      expect(zone).toBe('Dsa');
      
      const name = await page.textContent('#climate-name');
      expect(name).toBe('Hot-Summer Continental Mediterranean');
    });

    test('should classify as Dsb (Warm-Summer Continental Mediterranean)', async ({ page }) => {
      await page.goto(BASE_URL);
      
      await page.fill('#annual-temp', '8');
      await page.fill('#annual-precip', '500');
      
      await page.fill('#coldest-month-temp', '-6');
      await page.fill('#warmest-month-temp', '20');
      
      await page.fill('#months-above-10', '4');
      
      // Summer is dry
      await page.selectOption('#summer-dry', 'yes');
      
      const zone = await page.textContent('#climate-zone');
      expect(zone).toBe('Dsb');
      
      const name = await page.textContent('#climate-name');
      expect(name).toBe('Warm-Summer Continental Mediterranean');
    });

    test('should classify as Dsc (Subarctic Mediterranean)', async ({ page }) => {
      await page.goto(BASE_URL);
      
      await page.fill('#annual-temp', '4');
      await page.fill('#annual-precip', '400');
      
      await page.fill('#coldest-month-temp', '-20');
      await page.fill('#warmest-month-temp', '16');
      
      await page.fill('#months-above-10', '3');
      
      // Summer is dry
      await page.selectOption('#summer-dry', 'yes');
      
      const zone = await page.textContent('#climate-zone');
      expect(zone).toBe('Dsc');
      
      const name = await page.textContent('#climate-name');
      expect(name).toBe('Subarctic Mediterranean');
    });

    test('should classify as Dsd (Subarctic Mediterranean - very cold winter)', async ({ page }) => {
      await page.goto(BASE_URL);
      
      await page.fill('#annual-temp', '0');
      await page.fill('#annual-precip', '300');
      
      await page.fill('#coldest-month-temp', '-42');
      await page.fill('#warmest-month-temp', '15');
      
      await page.fill('#months-above-10', '2');
      
      // Summer is dry
      await page.selectOption('#summer-dry', 'yes');
      
      const zone = await page.textContent('#climate-zone');
      expect(zone).toBe('Dsd');
      
      const name = await page.textContent('#climate-name');
      expect(name).toBe('Subarctic Mediterranean (very cold winter)');
    });

    test('should classify as Dwa (Hot-Summer Humid Continental - dry winter)', async ({ page }) => {
      await page.goto(BASE_URL);
      
      await page.fill('#annual-temp', '7');
      await page.fill('#annual-precip', '600');
      
      await page.fill('#coldest-month-temp', '-12');
      await page.fill('#warmest-month-temp', '23');
      
      await page.fill('#months-above-10', '5');
      
      // Summer not dry, winter dry
      await page.selectOption('#summer-dry', 'no');
      await page.selectOption('#winter-dry', 'yes');
      
      const zone = await page.textContent('#climate-zone');
      expect(zone).toBe('Dwa');
      
      const name = await page.textContent('#climate-name');
      expect(name).toBe('Hot-Summer Humid Continental (dry winter)');
    });

    test('should classify as Dwb (Warm-Summer Humid Continental - dry winter)', async ({ page }) => {
      await page.goto(BASE_URL);
      
      await page.fill('#annual-temp', '5');
      await page.fill('#annual-precip', '500');
      
      await page.fill('#coldest-month-temp', '-15');
      await page.fill('#warmest-month-temp', '19');
      
      await page.fill('#months-above-10', '4');
      
      // Summer not dry, winter dry
      await page.selectOption('#summer-dry', 'no');
      await page.selectOption('#winter-dry', 'yes');
      
      const zone = await page.textContent('#climate-zone');
      expect(zone).toBe('Dwb');
      
      const name = await page.textContent('#climate-name');
      expect(name).toBe('Warm-Summer Humid Continental (dry winter)');
    });

    test('should classify as Dwc (Subarctic - dry winter)', async ({ page }) => {
      await page.goto(BASE_URL);
      
      await page.fill('#annual-temp', '2');
      await page.fill('#annual-precip', '400');
      
      await page.fill('#coldest-month-temp', '-25');
      await page.fill('#warmest-month-temp', '16');
      
      await page.fill('#months-above-10', '3');
      
      // Summer not dry, winter dry
      await page.selectOption('#summer-dry', 'no');
      await page.selectOption('#winter-dry', 'yes');
      
      const zone = await page.textContent('#climate-zone');
      expect(zone).toBe('Dwc');
      
      const name = await page.textContent('#climate-name');
      expect(name).toBe('Subarctic (dry winter)');
    });

    test('should classify as Dwd (Subarctic - dry winter, very cold)', async ({ page }) => {
      await page.goto(BASE_URL);
      
      await page.fill('#annual-temp', '-2');
      await page.fill('#annual-precip', '300');
      
      await page.fill('#coldest-month-temp', '-45');
      await page.fill('#warmest-month-temp', '14');
      
      await page.fill('#months-above-10', '2');
      
      // Summer not dry, winter dry
      await page.selectOption('#summer-dry', 'no');
      await page.selectOption('#winter-dry', 'yes');
      
      const zone = await page.textContent('#climate-zone');
      expect(zone).toBe('Dwd');
      
      const name = await page.textContent('#climate-name');
      expect(name).toBe('Subarctic (dry winter, very cold)');
    });

    test('should classify as Dfa (Hot-Summer Humid Continental)', async ({ page }) => {
      await page.goto(BASE_URL);
      
      await page.fill('#annual-temp', '8');
      await page.fill('#annual-precip', '900');
      
      // Zone D criteria: coldest <= -3, warmest > 10
      await page.fill('#coldest-month-temp', '-8');
      await page.fill('#warmest-month-temp', '24');
      
      await page.fill('#months-above-10', '5');
      
      // No dry season
      await page.selectOption('#summer-dry', 'no');
      await page.selectOption('#winter-dry', 'no');
      
      const zone = await page.textContent('#climate-zone');
      expect(zone).toBe('Dfa');
      
      const name = await page.textContent('#climate-name');
      expect(name).toBe('Hot-Summer Humid Continental');
    });

    test('should classify as Dfb (Warm-Summer Humid Continental)', async ({ page }) => {
      await page.goto(BASE_URL);
      
      await page.fill('#annual-temp', '6');
      await page.fill('#annual-precip', '700');
      
      await page.fill('#coldest-month-temp', '-10');
      await page.fill('#warmest-month-temp', '20');
      
      await page.fill('#months-above-10', '4');
      
      // No dry season
      await page.selectOption('#summer-dry', 'no');
      await page.selectOption('#winter-dry', 'no');
      
      const zone = await page.textContent('#climate-zone');
      expect(zone).toBe('Dfb');
      
      const name = await page.textContent('#climate-name');
      expect(name).toBe('Warm-Summer Humid Continental');
    });

    test('should classify as Dfc (Subarctic)', async ({ page }) => {
      await page.goto(BASE_URL);
      
      await page.fill('#annual-temp', '2');
      await page.fill('#annual-precip', '500');
      
      await page.fill('#coldest-month-temp', '-25');
      await page.fill('#warmest-month-temp', '15');
      
      await page.fill('#months-above-10', '3');
      
      // No dry season
      await page.selectOption('#summer-dry', 'no');
      await page.selectOption('#winter-dry', 'no');
      
      const zone = await page.textContent('#climate-zone');
      expect(zone).toBe('Dfc');
      
      const name = await page.textContent('#climate-name');
      expect(name).toBe('Subarctic');
    });

    test('should classify as Dfd (Subarctic - very cold winter)', async ({ page }) => {
      await page.goto(BASE_URL);
      
      await page.fill('#annual-temp', '-5');
      await page.fill('#annual-precip', '400');
      
      await page.fill('#coldest-month-temp', '-45');
      await page.fill('#warmest-month-temp', '15');
      
      await page.fill('#months-above-10', '3');
      
      // No dry season
      await page.selectOption('#summer-dry', 'no');
      await page.selectOption('#winter-dry', 'no');
      
      const zone = await page.textContent('#climate-zone');
      expect(zone).toBe('Dfd');
      
      const name = await page.textContent('#climate-name');
      expect(name).toBe('Subarctic (very cold winter)');
    });
  });
});
