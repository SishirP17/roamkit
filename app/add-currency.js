import { useRouter } from 'expo-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CURRENCIES } from '../src/data/currencies';
import { CURRENCY_META } from '../src/data/currencyMeta';
import { useCurrencies } from '../src/lib/currencies';
import { usePro } from '../src/lib/pro';
import { refreshRates } from '../src/lib/rateStore';
import { colors, font, radius, spacing } from '../src/theme';

const BUILTIN_CODES = new Set(CURRENCIES.map((c) => c.code));

// Big rates read best without decimals; tiny ones need extra precision
// (VND ≈ 26,000 · EUR ≈ 0.88 · KWD ≈ 0.31).
const formatRate = (r) =>
  r.toLocaleString(undefined, {
    maximumFractionDigits: r >= 100 ? 0 : r >= 1 ? 2 : 4,
  });

// Searchable catalog of every currency the live rate feed knows (~160).
// Browsing is free; adding is Pro. Needs internet — rates are fetched live so
// the list only ever offers currencies that will actually convert.
export default function AddCurrency() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { custom, add, remove } = useCurrencies();
  const { isPro } = usePro();

  const [search, setSearch] = useState('');
  const [table, setTable] = useState(null); // fresh network rates only
  const [status, setStatus] = useState('loading'); // loading | ready | offline

  const load = useCallback(async () => {
    setStatus('loading');
    const fresh = await refreshRates();
    if (fresh) {
      setTable(fresh);
      setStatus('ready');
    } else {
      setStatus('offline');
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const customCodes = useMemo(() => new Set(custom.map((c) => c.code)), [custom]);

  const catalog = useMemo(() => {
    if (!table?.rates) return [];
    return Object.keys(table.rates)
      .sort()
      .map((code) => ({
        code,
        name: CURRENCY_META[code]?.name || code,
        flag: CURRENCY_META[code]?.flag || '🏳️',
        rate: table.rates[code],
      }));
  }, [table]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return catalog;
    return catalog.filter(
      (c) => c.code.toLowerCase().includes(q) || c.name.toLowerCase().includes(q)
    );
  }, [catalog, search]);

  const onAdd = (item) => {
    if (!isPro) {
      router.push('/pro');
      return;
    }
    add({ code: item.code, name: item.name, flag: item.flag, symbol: item.code, rate: null });
  };

  // The user's own additions, shown under the catalog (and even offline —
  // removing one is local and never needs the network).
  const yourCurrencies =
    custom.length > 0 ? (
      <>
        <Text style={styles.section}>Your currencies</Text>
        {custom.map((c) => (
          <View key={c.code} style={styles.customRow}>
            <Text style={styles.customFlag}>{c.flag}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.customCode}>{c.code}</Text>
              <Text style={styles.customName}>
                {c.name}
                {c.rate ? `  ·  1 USD = ${c.rate} ${c.code}` : '  ·  live rate'}
              </Text>
            </View>
            <Pressable
              onPress={() => remove(c.code)}
              hitSlop={12}
              style={styles.del}
              accessibilityRole="button"
              accessibilityLabel={`Remove ${c.name}`}
            >
              <Text style={styles.delText}>✕</Text>
            </Pressable>
          </View>
        ))}
      </>
    ) : null;

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.intro}>Find any world currency and add it to your converter.</Text>
        {status === 'ready' && (
          <>
            <View style={styles.searchWrap}>
              <Text style={styles.searchIcon}>🔍</Text>
              <TextInput
                style={styles.searchInput}
                value={search}
                onChangeText={setSearch}
                placeholder="Type a currency or country…"
                placeholderTextColor={colors.textFaint}
                selectionColor={colors.accent}
                autoCorrect={false}
                autoCapitalize="none"
              />
              {search !== '' && (
                <Pressable
                  onPress={() => setSearch('')}
                  hitSlop={12}
                  accessibilityRole="button"
                  accessibilityLabel="Clear search"
                >
                  <Text style={styles.clear}>✕</Text>
                </Pressable>
              )}
            </View>
            {table?.date ? (
              <Text style={styles.updated}>Live rates · updated {table.date}</Text>
            ) : null}
          </>
        )}
      </View>

      {status === 'loading' && (
        <View style={styles.center}>
          <ActivityIndicator color={colors.accent} size="large" />
          <Text style={styles.centerText}>Loading live rates…</Text>
        </View>
      )}

      {status === 'offline' && (
        <ScrollView
          contentContainerStyle={{
            padding: spacing.lg,
            paddingBottom: insets.bottom + spacing.xxl,
          }}
        >
          <View style={styles.offlineCard}>
            <Text style={styles.offlineIcon}>📡</Text>
            <Text style={styles.offlineTitle}>You're offline</Text>
            <Text style={styles.offlineText}>
              Connect to the internet to see the currency list with live rates.
            </Text>
            <Pressable onPress={load} style={styles.retryBtn} accessibilityRole="button">
              <Text style={styles.retryText}>Try again</Text>
            </Pressable>
          </View>
          {yourCurrencies}
        </ScrollView>
      )}

      {status === 'ready' && (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.code}
          keyboardShouldPersistTaps="handled"
          initialNumToRender={16}
          contentContainerStyle={{
            paddingHorizontal: spacing.lg,
            paddingBottom: insets.bottom + spacing.xxl,
          }}
          ListEmptyComponent={
            <Text style={styles.empty}>No currencies match your search.</Text>
          }
          ListFooterComponent={yourCurrencies}
          renderItem={({ item }) => {
            const isBuiltin = BUILTIN_CODES.has(item.code);
            const isAdded = customCodes.has(item.code);
            return (
              <View style={styles.itemRow}>
                <Text style={styles.itemFlag}>{item.flag}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.itemCode}>
                    {item.code}
                    <Text style={styles.itemName}>  {item.name}</Text>
                  </Text>
                  <Text style={styles.itemRate}>
                    1 USD = {formatRate(item.rate)} {item.code}
                  </Text>
                </View>
                {isBuiltin ? (
                  <Text style={styles.builtin}>Built-in</Text>
                ) : isAdded ? (
                  <Text style={styles.added}>✓ Added</Text>
                ) : (
                  <Pressable
                    onPress={() => onAdd(item)}
                    style={({ pressed }) => [styles.addBtn, pressed && { opacity: 0.85 }]}
                    accessibilityRole="button"
                    accessibilityLabel={`Add ${item.name}`}
                  >
                    <Text style={styles.addBtnText}>{isPro ? 'Add' : '🔒 Add'}</Text>
                  </Pressable>
                )}
              </View>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  header: { paddingHorizontal: spacing.lg, paddingTop: spacing.lg },
  intro: { color: colors.textDim, fontSize: font.body, lineHeight: 23, marginBottom: spacing.md },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.lg,
  },
  searchIcon: { fontSize: 16 },
  searchInput: {
    flex: 1,
    color: colors.text,
    paddingVertical: spacing.lg,
    fontSize: font.h3,
    fontWeight: '600',
  },
  clear: { color: colors.textDim, fontSize: 20, fontWeight: '700', padding: spacing.xs },
  updated: {
    color: colors.textFaint,
    fontSize: font.small,
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
  },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.md },
  centerText: { color: colors.textDim, fontSize: font.body },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
    minHeight: 64,
  },
  itemFlag: { fontSize: 28 },
  itemCode: { color: colors.text, fontSize: font.h3, fontWeight: '800' },
  itemName: { color: colors.textDim, fontSize: font.body, fontWeight: '500' },
  itemRate: { color: colors.textFaint, fontSize: font.small, marginTop: 2 },
  addBtn: {
    backgroundColor: colors.accent,
    borderRadius: radius.pill,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtnText: { color: colors.white, fontWeight: '800', fontSize: font.body },
  added: { color: colors.success, fontWeight: '800', fontSize: font.body },
  builtin: { color: colors.textFaint, fontWeight: '600', fontSize: font.small },
  empty: {
    color: colors.textDim,
    fontSize: font.body,
    textAlign: 'center',
    marginTop: spacing.xl,
    lineHeight: 23,
  },
  offlineCard: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.xl,
    gap: spacing.sm,
  },
  offlineIcon: { fontSize: 40 },
  offlineTitle: { color: colors.text, fontSize: font.h2, fontWeight: '800' },
  offlineText: {
    color: colors.textDim,
    fontSize: font.body,
    textAlign: 'center',
    lineHeight: 23,
  },
  retryBtn: {
    marginTop: spacing.md,
    backgroundColor: colors.accent,
    borderRadius: radius.pill,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xxl,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  retryText: { color: colors.white, fontWeight: '800', fontSize: font.body },
  section: {
    color: colors.textFaint,
    fontSize: font.tiny,
    fontWeight: '800',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginTop: spacing.xl,
    marginBottom: spacing.sm,
  },
  customRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    marginBottom: spacing.sm,
  },
  customFlag: { fontSize: 26 },
  customCode: { color: colors.text, fontSize: font.body, fontWeight: '800' },
  customName: { color: colors.textFaint, fontSize: font.small, marginTop: 2 },
  del: { paddingLeft: spacing.sm },
  delText: { color: colors.textFaint, fontSize: 16 },
});
