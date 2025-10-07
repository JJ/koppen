#!/usr/bin/env node

/**
 * Example usage of Köppen climate classification
 */

const { classify, classifyBZone } = require('./index');

console.log('Köppen Climate Classification Examples\n');
console.log('=========================================\n');

// Example 1: Typical steppe climate (BS)
console.log('Example 1: Steppe Climate');
console.log('PMA: 300mm, TMA: 20°C');
console.log('Threshold: 20 × 12 = 240mm');
console.log('Result: 300 > 240 →', classifyBZone(300, 20));
console.log();

// Example 2: Typical desert climate (BW)
console.log('Example 2: Desert Climate');
console.log('PMA: 200mm, TMA: 20°C');
console.log('Threshold: 20 × 12 = 240mm');
console.log('Result: 200 < 240 →', classifyBZone(200, 20));
console.log();

// Example 3: Hot desert (Sahara-like)
console.log('Example 3: Hot Desert (Sahara-like)');
console.log('PMA: 50mm, TMA: 25°C');
console.log('Threshold: 25 × 12 = 300mm');
console.log('Result: 50 < 300 →', classifyBZone(50, 25));
console.log();

// Example 4: Cold steppe
console.log('Example 4: Cold Steppe');
console.log('PMA: 250mm, TMA: 5°C');
console.log('Threshold: 5 × 12 = 60mm');
console.log('Result: 250 > 60 →', classifyBZone(250, 5));
console.log();

// Example 5: Using classify function
console.log('Example 5: Using classify() function');
console.log('PMA: 400mm, TMA: 18°C, Zone: B');
console.log('Result:', classify(400, 18, 'B'));
console.log();

// Example 6: Edge case (equal to threshold)
console.log('Example 6: Edge Case (PMA = TMA × 12)');
console.log('PMA: 240mm, TMA: 20°C');
console.log('Threshold: 20 × 12 = 240mm');
console.log('Result: 240 = 240 →', classifyBZone(240, 20), '(defaults to BS)');
