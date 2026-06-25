# RoamKit — Deployment Guide (Google Play)

This walks you from "code on my laptop" to "installable on phones via Play
Store". Commands you run are in code blocks. Anything that opens a browser /
needs your login is marked **(you)**.

> Reality check: a brand-new **personal** Play developer account must run a
> **closed test with 12+ testers for 14 days** before Google unlocks public
> production. So the realistic path this week is: build → upload to a test track
> (installable immediately) → start the 14-day clock. Public launch follows.

---

## 0. Accounts you need (do these first — verification is the slow part)

1. **Expo account** (free) — for cloud builds. Sign up at https://expo.dev **(you)**
2. **Google Play Developer account** — $25 one-time. **(you)**
   - Go to https://play.google.com/console/signup
   - Choose **Personal** account type
   - Complete **identity verification** (photo ID). This can take 1–3 days, so
     start now.

---

## 1. Install the build tool

```bash
npm install -g eas-cli
eas login            # sign in with your Expo account  (you)
```

## 2. Link the project to EAS

From the project folder:

```bash
eas init             # creates/links an EAS project, writes the project ID
```

If it asks to create a new project, say yes. This adds an `extra.eas.projectId`
to your app config — commit that.

## 3. Build the Android app bundle (.aab)

```bash
eas build --platform android --profile production
```

- First run, EAS offers to **generate an Android Keystore** for you — say **Yes**
  and let EAS manage it. (This is your app's signing key; EAS keeps it safe.)
- The build runs in the cloud (~10–20 min). When done you get a link to download
  a **.aab** file. That's what you upload to Play.

> Free tier includes a limited number of builds per month — plenty for launch.

## 4. Create the app in Play Console **(you)**

1. https://play.google.com/console → **Create app**
2. App name: **RoamKit**, language English, type **App**, **Free**
3. Accept the declarations.

## 5. Fill the store listing **(you)**

Use the ready-made copy in [`store/play-listing.md`](store/play-listing.md):

- **Main store listing**: name, short + full description
- **App icon**: upload `store/play-icon-512.png`
- **Feature graphic**: upload `store/feature-graphic.png`
- **Screenshots**: at least 2 phone screenshots (see "Getting screenshots" below)
- **Privacy policy URL**: required — see step 6

Then complete these required forms (answers are in `store/play-listing.md`):
- **Content rating** questionnaire → expect Everyone / PEGI 3
- **Data safety** → "No data collected"
- **Target audience**, **Ads** (select "No ads"), **App access** (all features
  available without login)

## 6. Host the privacy policy **(you)**

Google requires a public URL. Easiest free option — GitHub Pages:

1. Create a public GitHub repo (e.g. `roamkit-site`)
2. Upload `store/privacy-policy.html` as `index.html`
3. Repo **Settings → Pages → Deploy from branch → main / root**
4. Your URL will be like `https://<you>.github.io/roamkit-site/`
5. Paste that URL into Play Console's Privacy policy field, and update
   `PRIVACY_URL` in `src/config.js` to match.

## 7. Upload to Closed Testing (starts the 14-day clock) **(you)**

1. Play Console → **Testing → Closed testing → Create track**
2. **Create new release** → upload your `.aab` from step 3
3. Add release notes (e.g. "First release of RoamKit — 6 offline travel tools.")
4. **Testers**: create an email list and add **at least 12** testers (friends/
   family with Android). They tap the opt-in link, install from Play, and just
   need to keep it installed.
5. **Roll out** the release.

Keep the test running **14 continuous days** with those 12+ testers. Then Play
Console will let you **apply for production access**.

## 8. Go to production (after the 14 days)

1. **Production → Create release** → reuse the same build (or a newer one)
2. Submit for review. Google review is usually 1–3 days.
3. 🎉 RoamKit is live for everyone.

---

## Getting screenshots

Two easy ways:
- **On a phone:** run `npm start`, open in **Expo Go**, take screenshots with the
  phone's buttons. Capture: Home, Currency, World Clock, Phrasebook.
- **On desktop:** `npm run web`, narrow the browser to phone width, screenshot.

## Updating the app later

Bump nothing manually — `autoIncrement` handles the Android versionCode. To ship
an update: change code, run `eas build --platform android --profile production`,
upload the new `.aab` to a release. (Raise `version` in `app.json`, e.g. 1.0.1,
for a user-visible version name.)

## iOS later (optional)

Same flow with `--platform ios`, but you need an **Apple Developer account**
($99/year) and `eas submit -p ios`. Not required for the Play Store launch.
