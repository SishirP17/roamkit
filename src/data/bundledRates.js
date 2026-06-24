// Snapshot of exchange rates bundled with the app so it works fully OFFLINE
// on first launch. Base currency is USD: 1 USD = rate[code].
// When the device gets internet, rateStore refreshes these and caches the
// fresh values locally — so offline always falls back to the most recent
// table we've ever seen (bundled, or last successful online refresh).
export const BUNDLED_RATES = {
  base: 'USD',
  // Human-readable date the snapshot represents.
  date: '2024-06-01',
  rates: {
    USD: 1,
    EUR: 0.922,
    GBP: 0.785,
    JPY: 157.3,
    CNY: 7.24,
    AUD: 1.504,
    CAD: 1.369,
    CHF: 0.899,
    INR: 83.4,
    KRW: 1378.0,
    SGD: 1.352,
    HKD: 7.81,
    THB: 36.7,
    MYR: 4.71,
    IDR: 16250.0,
    PHP: 58.6,
    VND: 25450.0,
    AED: 3.673,
    SAR: 3.75,
    TRY: 32.2,
    MXN: 18.1,
    BRL: 5.23,
    ZAR: 18.7,
    NZD: 1.63,
    SEK: 10.55,
    NOK: 10.62,
    DKK: 6.87,
    PLN: 3.95,
    EGP: 47.1,
    RUB: 89.5,
  },
};
