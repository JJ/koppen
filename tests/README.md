# Köppen Climate Zone Calculator Tests

This directory contains automated tests for the Köppen Climate Zone Calculator.

## Setup

Install dependencies:

```bash
npm install
npx playwright install
```

## Running Tests

Run all tests:

```bash
npm test
```

Run tests with UI:

```bash
npm run test:ui
```

Run tests in headed mode (visible browser):

```bash
npm run test:headed
```

## Test Coverage

The tests cover all C (Temperate) and D (Continental) climate zone classifications, including:

### Zone C (Temperate)
- Csa, Csb, Csc (Mediterranean with dry summer)
- Cwa, Cwb, Cwc (Subtropical with dry winter)
- Cfa, Cfb, Cfc (No dry season)

### Zone D (Continental)
- Dsa, Dsb, Dsc, Dsd (Continental Mediterranean with dry summer)
- Dwa, Dwb, Dwc, Dwd (Continental with dry winter)
- Dfa, Dfb, Dfc, Dfd (Continental with no dry season)

Each test verifies:
1. The correct zone classification based on temperature and precipitation
2. The correct climate name is displayed
