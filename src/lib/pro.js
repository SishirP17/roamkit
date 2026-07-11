import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Platform } from 'react-native';
import {
  BILLING_ENABLED,
  PRO_ENTITLEMENT_ID,
  REVENUECAT_ANDROID_KEY,
  REVENUECAT_IOS_KEY,
} from '../config';

// ─────────────────────────────────────────────────────────────────────────────
// Pro entitlement. The whole app only depends on `isPro` from usePro(), so the
// rest of the codebase never changes whether billing is real or simulated.
//
//   • BILLING_ENABLED = false  → Pro unlocks LOCALLY (for testing in Expo Go).
//   • BILLING_ENABLED = true   → real RevenueCat purchase / restore / entitlement.
//
// react-native-purchases is a NATIVE module (not in Expo Go), so it is loaded
// LAZILY and only when billing is on. With billing off, nothing here touches it,
// which keeps Expo Go and non-billing builds working. See store/BILLING.md.
// ─────────────────────────────────────────────────────────────────────────────

const STORAGE_KEY = 'pro.entitlement.v1';

// The Pro price shown on the paywall. Keep in sync with the Play Console product.
export const PRO_PRICE = '$4.99';

// RevenueCat keys are per-platform: a goog_ key on iOS fails every call, and
// web has no store billing at all (empty key keeps billing off there, so the
// web preview falls back to the local test unlock).
const REVENUECAT_KEY = Platform.select({
  android: REVENUECAT_ANDROID_KEY,
  ios: REVENUECAT_IOS_KEY,
  default: '',
});

// Whether the app is wired for real payments right now (on this platform).
export const isBillingLive = BILLING_ENABLED && !!REVENUECAT_KEY;

// Lazy RevenueCat handle. Configured once, only when billing is live.
let Purchases = null;
let configured = false;
async function getPurchases() {
  if (!isBillingLive) return null;
  if (!Purchases) {
    Purchases = require('react-native-purchases').default;
  }
  if (!configured) {
    await Purchases.configure({ apiKey: REVENUECAT_KEY });
    configured = true;
  }
  return Purchases;
}

function hasProEntitlement(customerInfo) {
  return !!customerInfo?.entitlements?.active?.[PRO_ENTITLEMENT_ID];
}

const ProContext = createContext({
  isPro: false,
  ready: false,
  unlockPro: async () => false,
  restorePro: async () => false,
  resetPro: async () => {},
});

export function ProProvider({ children }) {
  const [isPro, setIsPro] = useState(false);
  const [ready, setReady] = useState(false);

  // Mirror the entitlement to AsyncStorage so it's available instantly and
  // offline on the next launch (and as the only source of truth in local mode).
  const cache = async (value) => {
    try {
      if (value) await AsyncStorage.setItem(STORAGE_KEY, 'true');
      else await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
  };

  useEffect(() => {
    (async () => {
      // Fast path: trust the cached flag first so the UI doesn't flicker.
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw === 'true') setIsPro(true);
      } catch (e) {}

      // Authoritative path: ask RevenueCat when billing is live.
      if (isBillingLive) {
        try {
          const P = await getPurchases();
          const info = await P.getCustomerInfo();
          const ok = hasProEntitlement(info);
          setIsPro(ok);
          await cache(ok);
        } catch (e) {
          // Offline or RC unreachable — keep the cached value.
        }
      }
      setReady(true);
    })();
  }, []);

  const value = useMemo(
    () => ({
      isPro,
      ready,
      // Buy Pro. Returns true if the entitlement is now active.
      unlockPro: async () => {
        if (isBillingLive) {
          const P = await getPurchases();
          const offerings = await P.getOfferings();
          const pkg =
            offerings.current?.availablePackages?.[0] ||
            Object.values(offerings.all || {})[0]?.availablePackages?.[0];
          if (!pkg) throw new Error('No Pro package is available to purchase.');
          const { customerInfo } = await P.purchasePackage(pkg);
          const ok = hasProEntitlement(customerInfo);
          setIsPro(ok);
          await cache(ok);
          return ok;
        }
        // Local unlock (testing).
        setIsPro(true);
        await cache(true);
        return true;
      },
      // Restore a previous purchase on this store account.
      restorePro: async () => {
        if (isBillingLive) {
          try {
            const P = await getPurchases();
            const info = await P.restorePurchases();
            const ok = hasProEntitlement(info);
            setIsPro(ok);
            await cache(ok);
            return ok;
          } catch (e) {
            return false;
          }
        }
        // Local restore (testing): whatever we cached.
        try {
          const raw = await AsyncStorage.getItem(STORAGE_KEY);
          const has = raw === 'true';
          setIsPro(has);
          return has;
        } catch (e) {
          return false;
        }
      },
      // Dev helper to re-lock locally (useful while testing the paywall). Does
      // not revoke a real store entitlement — only clears the local cache.
      resetPro: async () => {
        setIsPro(false);
        await cache(false);
      },
    }),
    [isPro, ready]
  );

  return <ProContext.Provider value={value}>{children}</ProContext.Provider>;
}

export function usePro() {
  return useContext(ProContext);
}
