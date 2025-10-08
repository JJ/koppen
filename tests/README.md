# Köppen Climate Zone Calculator Tests

This directory contains automated tests for the Köppen climate zone calculator using Playwright.

## Test Coverage

The test suite covers all major Köppen climate zones:

### Zone A (Tropical) - 4 tests
- **Af**: Tropical Rainforest
- **Am**: Tropical Monsoon
- **Aw**: Tropical Savanna (dry winter)
- **As**: Tropical Savanna (dry summer)

### Zone B (Dry) - 4 tests
- **BWh**: Hot Desert
- **BWk**: Cold Desert
- **BSh**: Hot Semi-arid (Steppe)
- **BSk**: Cold Semi-arid (Steppe)

### Zone C (Temperate) - 4 tests
- **Csa**: Hot-Summer Mediterranean (dry summer)
- **Cwa**: Humid Subtropical (dry winter)
- **Cfa**: Humid Subtropical (no dry season)
- **Cfb**: Oceanic

### Zone D (Continental) - 3 tests
- **Dfa**: Hot-Summer Humid Continental
- **Dsa**: Hot-Summer Continental Mediterranean (dry summer)
- **Dwa**: Hot-Summer Humid Continental (dry winter)

### Zone E (Polar) - 2 tests
- **ET**: Tundra
- **EF**: Ice Cap

## Running the Tests

### Prerequisites
```bash
npm install
```

### Run all tests
```bash
npm test
```

### Run tests in headed mode (with visible browser)
```bash
npm run test:headed
```

### Debug tests
```bash
npm run test:debug
```

## CI/CD

Tests are automatically run on:
- Push to `main` branch
- Push to any `copilot/**` branch
- Pull requests to `main` branch

See `.github/workflows/test.yml` for the GitHub Actions workflow configuration.

## Test Report

After running tests, an HTML report is generated at `playwright-report/index.html`. You can view it by running:

```bash
npx playwright show-report
```
