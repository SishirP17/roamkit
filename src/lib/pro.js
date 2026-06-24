import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// Pro entitlement. Right now this is a LOCAL flag so the paywall and gating are
// fully testable before billing is live.
//
// TO GO LIVE WITH REAL BILLING (after the app is in a Play testing track):
//   1. npx expo install react-native-purchases   (RevenueCat)
//   2. Configure a one-time product in Play Console + RevenueCat.
//   3. In unlockPro(): call Purchases.purchasePackage(...) and set isPro from
//      the returned customerInfo.entitlements.active['pro'].
//   4. In restorePro(): call Purchases.restorePurchases().
//   5. On mount: read entitlements from Purchases.getCustomerInfo() instead of
//      (or in addition to) AsyncStorage.
// The rest of the app only depends on `isPro` from usePro(), so nothing else
// needs to change.
// ─────────────────────────────────────────────────────────────────────────────

const STORAGE_KEY = 'pro.entitlement.v1';

// The Pro price shown on the paywall. Keep in sync with the Play Console product.
export const PRO_PRICE = '$4.99';

const ProContext = createContext({
  isPro: false,
  ready: false,
  unlockPro: async () => {},
  restorePro: async () => false,
  resetPro: async () => {},
});

export function ProProvider({ children }) {
  const [isPro, setIsPro] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw === 'true') setIsPro(true);
      } catch (e) {}
      setReady(true);
    })();
  }, []);

  const value = useMemo(
    () => ({
      isPro,
      ready,
      // Local unlock for now. Replace body with a RevenueCat purchase call.
      unlockPro: async () => {
        setIsPro(true);
        try {
          await AsyncStorage.setItem(STORAGE_KEY, 'true');
        } catch (e) {}
        return true;
      },
      // Local restore for now. Replace with Purchases.restorePurchases().
      restorePro: async () => {
        try {
          const raw = await AsyncStorage.getItem(STORAGE_KEY);
          const has = raw === 'true';
          setIsPro(has);
          return has;
        } catch (e) {
          return false;
        }
      },
      // Dev helper to re-lock (useful while testing the paywall).
      resetPro: async () => {
        setIsPro(false);
        try {
          await AsyncStorage.removeItem(STORAGE_KEY);
        } catch (e) {}
      },
    }),
    [isPro, ready]
  );

  return <ProContext.Provider value={value}>{children}</ProContext.Provider>;
}

export function usePro() {
  return useContext(ProContext);
}
