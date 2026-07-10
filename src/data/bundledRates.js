// Snapshot of exchange rates bundled with the app so it works fully OFFLINE
// on first launch. Base currency is USD: 1 USD = rate[code].
// When the device gets internet, rateStore refreshes these and caches the
// fresh values locally — so offline always falls back to the most recent
// table we've ever seen (bundled, or last successful online refresh).
export const BUNDLED_RATES = {
  base: 'USD',
  // Human-readable date the snapshot represents.
  date: '2026-07-10',
  rates: {
    USD: 1,
    EUR: 0.875,
    GBP: 0.746,
    JPY: 162.4,
    CNY: 6.8,
    AUD: 1.441,
    CAD: 1.417,
    CHF: 0.807,
    INR: 95.5,
    KRW: 1508.0,
    SGD: 1.293,
    HKD: 7.84,
    THB: 33.4,
    MYR: 4.08,
    IDR: 18100.0,
    PHP: 61.6,
    VND: 26230.0,
    AED: 3.673,
    SAR: 3.75,
    TRY: 46.95,
    MXN: 17.54,
    BRL: 5.14,
    ZAR: 16.33,
    NZD: 1.737,
    SEK: 9.67,
    NOK: 9.72,
    DKK: 6.53,
    PLN: 3.78,
    EGP: 49.65,
    RUB: 76.2,
  },
};
