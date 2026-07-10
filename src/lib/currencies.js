import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { CURRENCIES } from '../data/currencies';
import { parseAmount } from './parseAmount';

// ─────────────────────────────────────────────────────────────────────────────
// Custom currencies. The built-in list in src/data/currencies.js is a curated
// set of ~30. The live rate feed (open.er-api.com) actually returns ~160 codes,
// so most "missing" currencies (e.g. NPR) already have a live rate — they're
// just not in the curated picker. This store lets the user add any code:
//   • If the live/bundled feed knows that code, conversions use the LIVE rate.
//   • If it doesn't (offline, or an exotic/local code), the user's manual rate
//     is used as a fallback. So manual rates only ever fill gaps.
// ─────────────────────────────────────────────────────────────────────────────

const KEY = 'custom.currencies.v1';

// In-memory cache so quick reads don't hit AsyncStorage each time.
let cache = null;

export async function loadCustomCurrencies() {
  if (cache) return cache;
  try {
    const raw = await AsyncStorage.getItem(KEY);
    cache = raw ? JSON.parse(raw) : [];
  } catch (e) {
    cache = [];
  }
  return cache;
}

const CurrenciesContext = createContext(null);

export function CurrenciesProvider({ children }) {
  const [custom, setCustom] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      const list = await loadCustomCurrencies();
      setCustom(list);
      setReady(true);
    })();
  }, []);

  const persist = useCallback(async (next) => {
    cache = next;
    setCustom(next);
    try {
      await AsyncStorage.setItem(KEY, JSON.stringify(next));
    } catch (e) {}
  }, []);

  // Add or update a custom currency. `rate` = units of this currency per 1 USD
  // (same convention as the feed), optional when the feed already has the code.
  const add = useCallback(
    (cur) => {
      const code = (cur.code || '').trim().toUpperCase();
      if (!code) return;
      // Accept "1,5" as well as "1.5"; drop anything non-positive/non-numeric
      // so a bad manual rate never silently poisons conversions.
      const manualRate = parseAmount(cur.rate);
      const cleaned = {
        code,
        name: (cur.name || code).trim(),
        symbol: (cur.symbol || code).trim(),
        flag: (cur.flag || '🏳️').trim() || '🏳️',
        rate: Number.isFinite(manualRate) && manualRate > 0 ? manualRate : null,
        custom: true,
      };
      const next = [...custom.filter((c) => c.code !== code), cleaned];
      return persist(next);
    },
    [custom, persist]
  );

  const remove = useCallback(
    (code) => persist(custom.filter((c) => c.code !== code)),
    [custom, persist]
  );

  const value = useMemo(() => {
    // Built-in first, then any custom codes the user added that aren't built-in.
    const builtinCodes = new Set(CURRENCIES.map((c) => c.code));
    const extras = custom.filter((c) => !builtinCodes.has(c.code));
    const currencies = [...CURRENCIES, ...extras];
    const currencyMap = currencies.reduce((acc, c) => {
      acc[c.code] = c;
      return acc;
    }, {});

    // Overlay manual rates ONLY for codes the live/bundled feed doesn't know,
    // so a real live rate always wins over a hand-typed one.
    const applyRates = (table) => {
      if (!table) return table;
      const rates = { ...table.rates };
      for (const c of custom) {
        if (c.rate && rates[c.code] == null) rates[c.code] = c.rate;
      }
      return { ...table, rates };
    };

    return { currencies, currencyMap, custom, ready, add, remove, applyRates };
  }, [custom, ready, add, remove]);

  return (
    <CurrenciesContext.Provider value={value}>
      {children}
    </CurrenciesContext.Provider>
  );
}

export function useCurrencies() {
  const ctx = useContext(CurrenciesContext);
  if (!ctx) {
    throw new Error('useCurrencies must be used within a CurrenciesProvider');
  }
  return ctx;
}
