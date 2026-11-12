# SWS-D-8-Electronic-Instrument-Array

The Electronic Instrument Array (EIA) for the SimWorks Studios Dash 8 in MSFS 2024. It is an HTML/TypeScript instrument that draws the ten engine readouts (torque, NH, propeller RPM, fuel flow and ITT for each engine) on one 1024 x 1024 screen.

## Requirements

- Node.js (with npm).
- Git, only if you need to update the seven-segment package.

The `node_modules` folder is part of this repository, so you do not need to run `npm install` after cloning.

## Build

Run this in the project folder:

```powershell
npm run build
```

The result is `build\SWSDH8AEIA.js`. The `build` folder is not kept in the repository.

## Deploy to the aircraft

The aircraft needs three files in `PackageSources\html_ui\pages\vcockpit\Instruments\SWSDH8AEIA\` of the aircraft project:

- `build\SWSDH8AEIA.js`
- `SWSDH8AEIA.css`
- `SWSDH8AEIA.html`

Copy them there after each build, then rebuild the aircraft package.

`npm run build-and-run` builds and then runs `updateFiles.bat` to do the copying. That file is not in the repository because it holds paths from one person's machine, so create your own in the project folder:

```bat
@echo off
set "DEST=C:\path\to\aircraft-project\PackageSources\html_ui\pages\vcockpit\Instruments\SWSDH8AEIA"
copy /y "%~dp0build\SWSDH8AEIA.js" "%DEST%\"
copy /y "%~dp0SWSDH8AEIA.css" "%DEST%\"
copy /y "%~dp0SWSDH8AEIA.html" "%DEST%\"
```

## Aircraft setup

The instrument is loaded from the aircraft's `panel.cfg`:

```ini
[VCockpit01]
size_mm=1024,1024
pixel_size=1024,1024
texture=EngineGauges_Screen
htmlgauge00=SWSDH8AEIA/SWSDH8AEIA.html, 0,0, 1024, 1024
```

## Readouts

Every readout has 4 digits, uses the `sws_d8_EIA2` digit style at 250 px, and is refreshed five times a second.

| Readout | Element ids | Decimals | Variable | Unit |
|---|---|---|---|---|
| Gas generator speed (NH) | `gasGeneratorSpeed1Readout`, `gasGeneratorSpeed2Readout` | 1 | `L:1:TURB_ENG_NH_1`, `L:1:TURB_ENG_NH_2` | percent |
| Torque | `torqueIndicator1Readout`, `torqueIndicator2Readout` | 1 | `TURB ENG MAX TORQUE PERCENT:1`, `:2` | percent |
| Fuel flow | `fuelFlow1Readout`, `fuelFlow2Readout` | 0 | `TURB ENG FUEL FLOW PPH:1`, `:2` | pounds per hour |
| Propeller RPM | `propellerRPM1Readout`, `propellerRPM2Readout` | 0 | `PROP RPM:1`, `:2` | rpm |
| ITT | `ITT1Readout`, `ITT2Readout` | 0 | `TURB ENG ITT:1`, `:2` | celsius |

Where to change things:

- **Digit style, size, colors and spacing:** the options of each readout in `Init()` in `SWSDH8AEIA.tsx`.
- **Position of each readout on the screen:** `SWSDH8AEIA.css`.
- **Which variable a readout shows:** `Update()` in `SWSDH8AEIA.tsx`.

## Things to know

- **There is no power check.** In the Dash 8, `isElectricityAvailable()` is always false, because the instrument has no `<Electric>` entry and the aircraft has no avionics circuit. `Update()` therefore does not use it, and the instrument does not blank itself when the aircraft has no power.
- **Test values at startup.** `Init()` puts a fixed number on each readout (155.5, 1888 and so on). The first update replaces them. If you see those numbers in the sim, the update is not running.
- **Development grid.** `SWSDH8AEIADisplay.tsx` draws a green grid with lines every 100 px, which helps when positioning readouts. `Init()` hides it. To see it, change the `visibility` of `developmentGridContainer` there.

## Seven-segment package

The digits are drawn by [sws-seven-segment-lcd](https://github.com/EvripidesEfthymiou/sws-seven-segment-lcd), which has its own README and developer guide. You need access to that repository to update it.

To move to its newest version:

```powershell
npm install git+https://github.com/EvripidesEfthymiou/sws-seven-segment-lcd.git
npm run build
```

Then commit the changes, which will be in `package-lock.json` and `node_modules`.

## Files

| File | Purpose |
|---|---|
| `SWSDH8AEIA.tsx` | The instrument: creates the readouts and reads the sim variables |
| `SWSDH8AEIADisplay.tsx` | The page content: one empty element per readout, and the development grid |
| `SWSDH8AEIAUtils.ts` | Helper functions such as `round` |
| `SWSDH8AEIA.css` | Background color and the position of each readout |
| `SWSDH8AEIA.html` | The page the sim loads, which pulls in the script and the stylesheet |
| `rollup.config.js`, `tsconfig.json` | Build settings |
| `node_modules/` | The dependencies, kept in the repository |
