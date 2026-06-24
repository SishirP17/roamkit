# Roamkit — Activating Real Billing (RevenueCat)

The app already has a Pro paywall and a clean entitlement seam (`src/lib/pro.js`).
Right now Pro unlocks **locally** for testing. This guide turns on **real
payments** once Roamkit is on Google Play.

> Order matters — billing literally cannot be tested until the app is on a Play
> track with a product configured. Do these in sequence.

## Prerequisites (must be done first)
1. Google Play Developer account created + identity verified.
2. Roamkit uploaded to a Play track (internal/closed testing is fine).
3. A **payments/merchant profile** set up in Play Console (to receive money).

## Step 1 — Create the in-app product in Play Console
- Play Console → your app → **Monetize → Products → In-app products → Create**
- Product ID: **`roamkit_pro`**  (must match `PRO_PRODUCT_ID` in src/config.js)
- Type: one-time purchase, Price: **$4.99**
- Activate it.

## Step 2 — RevenueCat account (free)
- Sign up at **revenuecat.com** → create a Project → add an **Android app**
  (package name `com.roamkit.app`).
- Connect it to Google Play: upload the **Play service account JSON** RevenueCat
  asks for (RevenueCat shows exactly how — it needs read access to your Play app).
- Create an **Entitlement** named **`pro`** (matches `PRO_ENTITLEMENT_ID`).
- Create an **Offering** and attach the `roamkit_pro` product to a package.
- Copy the **Android API key** (starts with `goog_`).

## Step 3 — Flip the switch in the app
The `react-native-purchases` SDK is **already wired** into `src/lib/pro.js`
(purchase / restore / entitlement, loaded lazily so it never affects Expo Go
while billing is off). To go live you only edit `src/config.js`:
```js
export const BILLING_ENABLED = true;
export const REVENUECAT_ANDROID_KEY = 'goog_xxxxxxxxxxxxxxxx';
```
That's it — `usePro()` then makes a real Google Play purchase. No other code
changes. The paywall already shows real-billing copy and handles cancel/errors.

> Reminder: `react-native-purchases` is native, so it only runs in an **EAS
> build** (e.g. the `preview` APK), not in Expo Go. With the flag off, Expo Go
> is unaffected.

## Step 4 — Build + test a real purchase
- `eas build -p android --profile preview`
- Install on a device that's a **license tester** (add your Google account under
  Play Console → Setup → License testing — testers aren't charged real money).
- Open Pro → buy → confirm it unlocks and survives a reinstall (Restore).

## Notes
- iOS later: add an iOS app in RevenueCat + an App Store product, same entitlement.
- The rest of the app only depends on `isPro` from `usePro()`, so nothing else
  changes when billing goes live.
