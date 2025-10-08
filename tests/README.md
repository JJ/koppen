# Testing

This project uses Playwright for end-to-end testing.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Install Playwright browsers:
```bash
npx playwright install chromium
```

## Running Tests

Run all tests:
```bash
npm test
```

Run tests in headed mode (see the browser):
```bash
npm run test:headed
```

Run tests in UI mode (interactive):
```bash
npm run test:ui
```

## Test Coverage

The tests cover Zone D classification scenarios:
- Ds zones (dry summer)
- Dw zones (dry winter)
- Df zones (fully humid)

Each test verifies:
- Correct zone classification based on temperature and precipitation inputs
- Progressive disclosure of questions
- Correct climate zone names
