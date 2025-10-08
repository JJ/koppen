# Copilot Instructions for Köppen Climate Zone Calculator

## Project Overview

This is an interactive web-based Köppen climate classification calculator. The project is a simple, self-contained web application with no build process - it uses vanilla HTML, CSS, and JavaScript.

**Key Technologies:**
- Pure HTML/CSS/JavaScript (no frameworks)
- Playwright for end-to-end testing
- Python's http.server for local development
- GitHub Actions for CI/CD

## Project Structure

```
.
├── index.html              # Main application (HTML + inline CSS + JavaScript)
├── tests/
│   ├── koppen.test.js     # Playwright test suite
│   └── README.md          # Testing documentation
├── playwright.config.js    # Playwright configuration
├── package.json           # Project dependencies
└── .github/
    └── workflows/
        ├── test.yml       # CI test workflow
        └── static.yml     # GitHub Pages deployment
```

## Development Guidelines

### Running the Application

The application can be run with any static file server:
```bash
python3 -m http.server 8080
```
Then open `http://localhost:8080/index.html` in a browser.

### Testing

**Run tests:**
```bash
npm install
npm test
```

**Test in headed mode (with visible browser):**
```bash
npm run test:headed
```

**Debug tests:**
```bash
npm run test:debug
```

**Important:** All tests must pass before committing changes. The CI/CD pipeline runs tests automatically on:
- Push to `main` branch
- Push to any `copilot/**` branch
- Pull requests to `main` branch

### Code Style

1. **No frameworks or libraries** - This is a vanilla JavaScript project
2. **Inline everything in index.html** - CSS and JavaScript are embedded in the HTML file
3. **Spanish labels, English code** - User-facing text is in Spanish, but code comments and variable names are in English
4. **Progressive disclosure UI** - Questions appear dynamically based on previous answers
5. **70/30 layout** - Input section (70%) on left, results (30%) on right

### Climate Classification Logic

The Köppen climate classification follows this hierarchy:

1. **Zone B (Dry):** If `TMA × 24 ≥ Annual Precipitation`
2. **Zone A (Tropical):** If `TMA ≥ 18°C` (and not Zone B)
3. **Zones C, D, E:** Determined by coldest/warmest month temperatures

**Climate Zones Covered:**
- **A (Tropical):** Af, Am, Aw, As
- **B (Dry):** BWh, BWk, BSh, BSk
- **C (Temperate):** Csa, Csb, Csc, Cwa, Cwb, Cwc, Cfa, Cfb, Cfc
- **D (Continental):** Dsa, Dsb, Dsc, Dsd, Dwa, Dwb, Dwc, Dwd, Dfa, Dfb, Dfc, Dfd
- **E (Polar):** ET, EF

### Testing Requirements

When adding new climate classification logic:

1. **Add comprehensive tests** for each new climate zone
2. **Test format:** Each test should:
   - Navigate to the page
   - Fill in temperature and precipitation values
   - Answer progressive questions as they appear
   - Verify the correct zone code (e.g., 'Af', 'BWh')
   - Verify the correct climate name

3. **Example test structure:**
```javascript
test('should classify as <Zone> (<Name>)', async ({ page }) => {
  await page.goto(BASE_URL);
  await page.fill('#annual-temp', '<value>');
  await page.fill('#annual-precip', '<value>');
  // ... additional progressive questions
  const zone = await page.textContent('#climate-zone');
  expect(zone).toBe('<ExpectedZone>');
  const name = await page.textContent('#climate-name');
  expect(name).toBe('<ExpectedName>');
});
```

### Common Pitfalls

1. **Don't add a build process** - This project intentionally has no bundler or transpiler
2. **Don't split files** - Keep HTML, CSS, and JavaScript in `index.html`
3. **Maintain responsive design** - Test changes work on mobile (media query at 768px)
4. **Test thoroughly** - All 18+ tests must pass; add tests for new features
5. **Follow progressive disclosure** - New questions should appear only when needed based on previous answers

### Making Changes

1. **For UI changes:**
   - Modify `index.html`
   - Maintain 70/30 layout
   - Keep responsive design working
   - Test manually by running the local server

2. **For logic changes:**
   - Update JavaScript in `index.html`
   - Add corresponding tests in `tests/koppen.test.js`
   - Run `npm test` to verify all tests pass
   - Update documentation if classification rules change

3. **For new climate zones:**
   - Add zone logic to JavaScript
   - Add test cases in `tests/koppen.test.js`
   - Update README.md if adding major features
   - Update tests/README.md test coverage section

### File-Specific Guidelines

**index.html:**
- Contains all application code (HTML, CSS, JavaScript)
- Questions must use IDs matching test expectations (e.g., `#annual-temp`, `#annual-precip`)
- Results displayed in `#climate-zone` and `#climate-name` elements
- Questions have `.question` class and `.visible` class when shown

**tests/koppen.test.js:**
- Uses Playwright test framework
- BASE_URL configurable via environment variable
- Organized by climate zone categories (A, B, C, D, E)
- Each test is independent and self-contained

**playwright.config.js:**
- Configured to use Chromium
- Runs local web server automatically (Python http.server)
- Screenshots on failure, HTML reporter

## Useful Commands

```bash
# Install dependencies
npm install

# Run all tests
npm test

# Run tests with visible browser
npm run test:headed

# Debug tests interactively
npm run test:debug

# Start local development server
python3 -m http.server 8080

# View test report
npx playwright show-report
```

## Quick Reference

**Key DOM Elements:**
- `#annual-temp` - Annual average temperature input
- `#annual-precip` - Annual precipitation input
- `#coldest-month-temp` - Coldest month temperature
- `#warmest-month-temp` - Warmest month temperature
- `#climate-zone` - Displays zone code (e.g., "Af")
- `#climate-name` - Displays zone name (e.g., "Tropical Rainforest")

**Test Patterns:**
- All tests navigate to BASE_URL
- Use `page.fill()` for number inputs
- Use `page.selectOption()` for select dropdowns
- Always verify both zone code and climate name
