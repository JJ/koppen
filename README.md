# Köppen Climate Zone Calculator

Interactive web calculator for determining Köppen climate classification zones based on climate variables.

## Features

- **Progressive Disclosure**: Questions appear dynamically based on previous answers
- **70/30 Split Layout**: Input prompts on the left (70%), results on the right (30%)
- **Real-time Classification**: Climate zone updates as you enter data
- **Responsive Design**: Works on desktop and mobile devices
- **Complete Coverage**: Supports all Köppen climate types (A-E with 2-3 letter codes)

## Usage

Open `index.html` in a web browser to use the calculator.

The calculator starts with two essential questions:
1. **Temperatura Media Anual (°C)** - Annual Average Temperature
2. **Precipitación anual (mm)** - Annual Precipitation

Based on these values, the calculator applies the Köppen classification logic:
- If `TMA × 24 ≥ Precipitation` → Zone **B** (Dry/Arid)
- Else if `TMA ≥ 18°C` → Zone **A** (Tropical)
- Otherwise → Additional questions for coldest/warmest month temperatures to determine zones **C**, **D**, or **E**

Additional questions appear progressively based on the climate zone being determined, and the zone is displayed as soon as it can be determined from the available data.

## Climate Zones

The Köppen climate classification system includes:
- **A (Tropical)**: Af, Am, Aw, As
- **B (Dry)**: BWh, BWk, BSh, BSk
- **C (Temperate)**: Csa, Csb, Csc, Cwa, Cwb, Cwc, Cfa, Cfb, Cfc
- **D (Continental)**: Dsa, Dsb, Dsc, Dsd, Dwa, Dwb, Dwc, Dwd, Dfa, Dfb, Dfc, Dfd
- **E (Polar)**: ET, EF
