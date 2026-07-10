// App-wide constants. Change ADMIN_EMAIL to wherever tool requests should go.
export const ADMIN_EMAIL = 'roamkitsupport@gmail.com';
export const APP_NAME = 'RoamKit';
export const APP_VERSION = '1.0.0';
export const PRIVACY_URL = 'https://roamkitsupport.github.io/roamkit-privacy/';

// Tip jar link (Ko-fi).
export const TIP_URL = 'https://ko-fi.com/roamkit';

// ── Billing (RevenueCat) ──────────────────────────────────────────────────
// Real RevenueCat billing (see store/BILLING.md). Note: with this ON, the
// paywall needs a real store build — in Expo Go / web dev the purchase
// button errors instead of granting the free local test unlock.
export const BILLING_ENABLED = true;
export const REVENUECAT_ANDROID_KEY = 'goog_MmavUdZhpYwBYQakrZKApHCfAdr'; // 'goog_...' from RevenueCat → API keys
export const REVENUECAT_IOS_KEY = ''; // 'appl_...' from RevenueCat → API keys
export const PRO_ENTITLEMENT_ID = 'pro'; // entitlement name in RevenueCat
export const PRO_PRODUCT_ID = 'roamkit_pro'; // product id you create in Play Console
