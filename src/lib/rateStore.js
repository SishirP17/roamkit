import AsyncStorage from '@react-native-async-storage/async-storage';
import { BUNDLED_RATES } from '../data/bundledRates';

const STORAGE_KEY = 'rates.cache.v1';

// Free, no-API-key endpoint. USD-based. Returns { rates, time_last_update_utc }.
const ENDPOINT = 'https://open.er-api.com/v6/latest/USD';

// In-memory copy so screens don't hit AsyncStorage on every keystroke.
let memoryCache = null;

// A single shared in-flight request: several screens mounting at once should
// reuse one fetch instead of each firing their own.
let inFlight = null;

// The feed only updates about once a day (and tells us when the next update
// lands). Between updates, refetching burns a traveler's roaming data for an
// identical table — so refreshRates() returns the cached one while it's fresh.
const MAX_RATE_AGE_MS = 12 * 60 * 60 * 1000;

function isFresh(table) {
  if (!table?.checkedAt) return false; // bundled table: no fetch behind it
  const now = Date.now();
  if (now - table.checkedAt > MAX_RATE_AGE_MS) return false;
  if (table.nextUpdateAt && now >= table.nextUpdateAt) return false;
  return true;
}

function normalize(table, source) {
  return {
    base: table.base || 'USD',
    date: table.date,
    rates: table.rates,
    source, // 'bundled' | 'cache' | 'network'
    fetchedAt: table.fetchedAt || null, // feed's own last-update timestamp
    checkedAt: table.checkedAt || null, // when WE last hit the network
    nextUpdateAt: table.nextUpdateAt || null, // feed's scheduled next update
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
// While the cached table is still fresh (feed hasn't published a new one yet)
// this returns the cache without touching the network; pass { force: true }
// to always fetch (manual "Update" button).
export async function refreshRates({ force = false } = {}) {
  const current = memoryCache || (await loadRates());
  if (!force && isFresh(current)) return current;
  if (inFlight) return inFlight;
  inFlight = fetchRates().finally(() => {
    inFlight = null;
  });
  return inFlight;
}

async function fetchRates() {
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
      checkedAt: Date.now(),
      nextUpdateAt: json.time_next_update_unix ? json.time_next_update_unix * 1000 : null,
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
