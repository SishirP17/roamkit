// App-wide constants. Change ADMIN_EMAIL to wherever tool requests should go.
export const ADMIN_EMAIL = 'roamkitsupport@gmail.com';
export const APP_NAME = 'RoamKit';
export const APP_VERSION = '1.0.0';
export const PRIVACY_URL = 'https://roamkitsupport.github.io/roamkit-privacy/';

// Tip jar link (Ko-fi).
export const TIP_URL = 'https://ko-fi.com/roamkit';

// ── Billing (RevenueCat) ──────────────────────────────────────────────────
// Stays OFF until the app is on Google Play with an in-app product configured.
// Flip BILLING_ENABLED to true + paste the key once everything is set up
// (see store/BILLING.md). Until then, Pro unlocks locally for testing.
export const BILLING_ENABLED = false;
export const REVENUECAT_ANDROID_KEY = ''; // 'goog_...' from RevenueCat → API keys
export const PRO_ENTITLEMENT_ID = 'pro'; // entitlement name in RevenueCat
export const PRO_PRODUCT_ID = 'roamkit_pro'; // product id you create in Play Console
