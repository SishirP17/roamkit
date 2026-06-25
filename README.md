# RoamKit

A cross-platform (iOS + Android + Web) **offline-first travel toolkit**, built with
Expo + Expo Router. Every tool works with no internet, and the home screen is a
grid of tools designed to keep growing.

**v1 tools:** Currency converter · Unit converter · Tip & Split · World Clock ·
Phrasebook · Flashlight & SOS.

To ship to the Play Store, follow [`DEPLOY.md`](DEPLOY.md). Store copy and
graphics live in [`store/`](store/).

## Run it

```bash
npm install          # once
npm run web          # open in a browser
npm run android      # Android device/emulator (needs Android Studio)
npm run ios          # iOS simulator (needs a Mac) — or use Expo Go on iPhone
npm start            # dev menu: scan QR with the Expo Go app on your phone
```

> Easiest first test: `npm start`, install **Expo Go** on your phone, scan the QR.

## How "offline" works

Live exchange rates change daily, so true 100%-offline live rates are impossible.
Instead the app is **offline-first**:

1. Ships with a bundled rate snapshot (`src/data/bundledRates.js`) so it works on
   first launch with no internet.
2. When online, it silently fetches fresh rates and **caches them on the device**
   (`src/lib/rateStore.js`, via AsyncStorage).
3. Offline, it falls back to the most recent rates it has ever seen and shows a
   "Rates as of …" line so the user knows how fresh they are.

## Project structure

```
app/                 # Expo Router screens (file = route)
  _layout.js         # Stack navigator + theme
  index.js           # Home screen (tool tile grid)
  currency.js        # Currency converter tool
src/
  theme.js           # Colors, spacing, radius, fonts (design tokens)
  data/
    tools.js         # The toolkit catalog that drives the home grid
    currencies.js    # Currency list (codes, names, symbols, flags)
    bundledRates.js  # Offline rate snapshot (USD-based)
  lib/
    rateStore.js     # Offline-first load / refresh / convert logic
```

## Adding a new tool

1. Add an entry to `src/data/tools.js` (set `status: 'active'` and a `route`).
2. Create the matching screen file under `app/` (e.g. `app/units.js`).
3. Register it in `app/_layout.js` if you want a custom header title.

## Roadmap ideas

- Travel: units, tip & bill split, world clock, phrasebook, packing list
- Offline utility: flashlight, compass, QR scanner, images → PDF, calculator
- Outdoors/camping: sunrise-sunset, SOS signal, knots, star map
- Later: "Request a tool" → admin approval flow (needs a backend)
