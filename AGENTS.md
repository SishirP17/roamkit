# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v56.0.0/ before writing any code.

# Offline Toolkit — project notes

Cross-platform (iOS + Android + Web) offline-first travel toolkit app.
Stack: **Expo SDK 56, Expo Router (file-based routing), React Native 0.85, React 19.**
Single codebase ships to App Store, Play Store, and web.

## Architecture
- `app/` = routes (Expo Router). `_layout.js` defines the Stack + dark theme.
- `src/theme.js` = design tokens — use these, don't hardcode colors/spacing.
- `src/data/tools.js` = the catalog that renders the home grid. Adding a tool =
  add an entry here + a screen under `app/`. This is the seam for the future
  user-request/admin-approval system.
- Offline-first rates: `src/lib/rateStore.js` (load cached/bundled → refresh from
  `open.er-api.com` when online → cache via AsyncStorage). USD is the pivot for
  all conversions.

## Conventions
- Dark navy theme, one accent blue. Tiles each get a color from `tileColors`.
- Keep new tools self-contained as a single screen file where possible.
- **Never use em dashes (—) in user-facing text** (screen copy, data content,
  store listing, release notes). Use a comma, period, or colon, or restructure
  the sentence. Code comments are exempt.

## Run / verify
- `npm run web` to run; `npx expo export --platform web` to check it compiles.
