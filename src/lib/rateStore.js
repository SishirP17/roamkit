import AsyncStorage from '@react-native-async-storage/async-storage';
import { BUNDLED_RATES } from '../data/bundledRates';

const STORAGE_KEY = 'rates.cache.v1';

// Free, no-API-key endpoint. USD-based. Returns { rates, time_last_update_utc }.
const ENDPOINT = 'https://open.er-api.com/v6/latest/USD';

// In-memory copy so screens don't hit AsyncStorage on every keystroke.
let memoryCache = null;

function normalize(table, source) {
  return {
    base: table.base || 'USD',
    date: table.date,
    rates: table.rates,
    source, // 'bundled' | 'cache' | 'network'
    fetchedAt: table.fetchedAt || null,
  };
}

// Load the best rates we currently have, without touching the network.
// Order of preference: in-memory -> cached (last online refresh) -> bundled.
export async function loadRates() {
  if (memoryCache) return memoryCache;
  let stored = null;
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.rates) stored = normalize(parsed, 'cache');
    }
  } catch (e) {
    // ignore corrupt cache, fall through to bundled
  }
  // A network refresh may have landed while we awaited AsyncStorage; fresher
  // rates always win over the stored/bundled table.
  if (memoryCache) return memoryCache;
  memoryCache = stored || normalize(BUNDLED_RATES, 'bundled');
  return memoryCache;
}

// Try to fetch fresh rates. Returns updated table on success, or null if
// offline / the request failed (caller keeps using whatever loadRates gave).
export async function refreshRates() {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(ENDPOINT, { signal: controller.signal });
    clearTimeout(timeout);
    if (!res.ok) return null;
    const json = await res.json();
    if (json.result !== 'success' || !json.rates) return null;

    const table = {
      base: 'USD',
      date: (json.time_last_update_utc || '').slice(0, 16) || json.time_last_update_utc,
      rates: json.rates,
      fetchedAt: json.time_last_update_unix ? json.time_last_update_unix * 1000 : null,
    };
    memoryCache = normalize(table, 'network');
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(table));
    } catch (e) {
      // cache write failed — not fatal, we still return the fresh rates
    }
    return memoryCache;
  } catch (e) {
    return null; // offline or aborted
  }
}

// Convert between two currency codes using a USD-based rate table.
// amount in `from` -> value in `to`.  USD is the pivot.
export function convert(amount, from, to, table) {
  const rates = table?.rates;
  if (!rates || !rates[from] || !rates[to]) return null;
  const inUsd = amount / rates[from];
  return inUsd * rates[to];
}
