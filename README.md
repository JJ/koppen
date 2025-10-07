# koppen
Calculator of Köppen climactic zones

## Description

This package implements the Köppen climate classification system, a widely used system for classifying the world's climates based on temperature and precipitation patterns.

Currently, it supports classification of **B (Arid) zones**:
- **BS (Steppe)**: Semi-arid climate - when precipitation mean annual (PMA) > temperature mean annual (TMA) × 12
- **BW (Desert)**: Arid climate - when precipitation mean annual (PMA) < temperature mean annual (TMA) × 12

## Installation

```bash
npm install koppen
```

## Usage

```javascript
const { classify, classifyBZone } = require('koppen');

// Classify a B zone with given precipitation and temperature
const zone1 = classifyBZone(300, 20); // Returns 'BS' (steppe)
// PMA = 300mm, TMA = 20°C, threshold = 240mm, 300 > 240 → BS

const zone2 = classifyBZone(200, 20); // Returns 'BW' (desert)
// PMA = 200mm, TMA = 20°C, threshold = 240mm, 200 < 240 → BW

// Using the general classify function
const zone3 = classify(400, 18, 'B'); // Returns 'BS'
const zone4 = classify(100, 15); // Returns 'BW' (defaults to B zone)
```

## API

### `classifyBZone(pma, tma)`

Classifies zone B (arid) into BS (steppe) or BW (desert).

**Parameters:**
- `pma` (number): Precipitation Mean Annual in millimeters
- `tma` (number): Temperature Mean Annual in degrees Celsius

**Returns:** String - 'BS' for steppe or 'BW' for desert

### `classify(pma, tma, zone = 'B')`

General classification function for Köppen zones.

**Parameters:**
- `pma` (number): Precipitation Mean Annual in millimeters
- `tma` (number): Temperature Mean Annual in degrees Celsius
- `zone` (string, optional): Climate zone to classify (default: 'B')

**Returns:** String - Detailed climate classification

## Testing

```bash
npm test
```

## License

ISC
