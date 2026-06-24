import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CURRENCIES, CURRENCY_MAP } from '../src/data/currencies';
import { convert, loadRates, refreshRates } from '../src/lib/rateStore';
import { colors, font, radius, spacing } from '../src/theme';

const SOURCE_LABEL = {
  bundled: 'Built-in rates',
  cache: 'Saved rates',
  network: 'Live rates',
};

const PAIR_KEY = 'currency.pair.v1';
const COMPARE_KEY = 'currency.compare.v1';
const DEFAULT_TARGETS = ['EUR', 'GBP', 'THB', 'KRW'];

export default function CurrencyConverter() {
  const insets = useSafeAreaInsets();
  const [table, setTable] = useState(null);
  const [mode, setMode] = useState('convert'); // 'convert' | 'compare'
  const [amount, setAmount] = useState('100');
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('JPY');
  const [targets, setTargets] = useState(DEFAULT_TARGETS);
  const [refreshing, setRefreshing] = useState(false);
  const [pickerFor, setPickerFor] = useState(null); // 'from' | 'to' | 'add' | null
  const [search, setSearch] = useState('');

  // Load rates immediately (offline-friendly), then refresh quietly online.
  useEffect(() => {
    let alive = true;
    (async () => {
      const initial = await loadRates();
      if (alive) setTable(initial);
      setRefreshing(true);
      const fresh = await refreshRates();
      if (alive) {
        if (fresh) setTable(fresh);
        setRefreshing(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  // Restore saved pair + compare list.
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(PAIR_KEY);
        if (raw && alive) {
          const saved = JSON.parse(raw);
          if (saved?.from) setFrom(saved.from);
          if (saved?.to) setTo(saved.to);
        }
        const rawC = await AsyncStorage.getItem(COMPARE_KEY);
        if (rawC && alive) {
          const arr = JSON.parse(rawC);
          if (Array.isArray(arr)) setTargets(arr);
        }
      } catch (e) {}
    })();
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(PAIR_KEY, JSON.stringify({ from, to })).catch(() => {});
  }, [from, to]);

  const saveTargets = (arr) => {
    setTargets(arr);
    AsyncStorage.setItem(COMPARE_KEY, JSON.stringify(arr)).catch(() => {});
  };

  const numericAmount = parseFloat(amount.replace(',', '.')) || 0;
  const result = useMemo(
    () => (table ? convert(numericAmount, from, to, table) : null),
    [numericAmount, from, to, table]
  );
  const rate = useMemo(
    () => (table ? convert(1, from, to, table) : null),
    [from, to, table]
  );
  const compareRows = useMemo(
    () =>
      targets.map((code) => ({
        code,
        value: table ? convert(numericAmount, from, code, table) : null,
      })),
    [targets, from, numericAmount, table]
  );

  const onManualRefresh = async () => {
    setRefreshing(true);
    const fresh = await refreshRates();
    if (fresh) setTable(fresh);
    setRefreshing(false);
  };

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  const pick = (code) => {
    if (pickerFor === 'from') setFrom(code);
    else if (pickerFor === 'to') setTo(code);
    else if (pickerFor === 'add' && !targets.includes(code) && code !== from)
      saveTargets([...targets, code]);
    setPickerFor(null);
    setSearch('');
  };

  const filtered = CURRENCIES.filter((c) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return c.code.toLowerCase().includes(q) || c.name.toLowerCase().includes(q);
  });

  const fmt = (n) =>
    n == null
      ? '—'
      : n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <View style={[styles.screen, { paddingBottom: insets.bottom }]}>
      {/* Mode toggle */}
      <View style={styles.tabs}>
        {[
          ['convert', 'Convert'],
          ['compare', 'Compare'],
        ].map(([id, label]) => {
          const active = mode === id;
          return (
            <Pressable key={id} onPress={() => setMode(id)} style={[styles.tab, active && styles.tabActive]}>
              <Text style={[styles.tabText, active && styles.tabTextActive]}>{label}</Text>
            </Pressable>
          );
        })}
      </View>

      {mode === 'convert' ? (
        <View style={styles.body}>
          <View style={styles.card}>
            <CurrencyRow label="Amount" currency={CURRENCY_MAP[from]} onPressCurrency={() => setPickerFor('from')}>
              <TextInput
                style={styles.input}
                value={amount}
                onChangeText={setAmount}
                keyboardType="decimal-pad"
                placeholder="0"
                placeholderTextColor={colors.textFaint}
                selectionColor={colors.accent}
              />
            </CurrencyRow>
          </View>

          <View style={styles.swapWrap}>
            <View style={styles.divider} />
            <Pressable onPress={swap} style={({ pressed }) => [styles.swapBtn, pressed && { opacity: 0.8 }]}>
              <Text style={styles.swapIcon}>⇅</Text>
            </Pressable>
            <View style={styles.divider} />
          </View>

          <View style={styles.card}>
            <CurrencyRow label="Converted to" currency={CURRENCY_MAP[to]} onPressCurrency={() => setPickerFor('to')}>
              <Text style={styles.result} numberOfLines={1} adjustsFontSizeToFit>
                {fmt(result)}
              </Text>
            </CurrencyRow>
          </View>

          {rate != null && (
            <Text style={styles.rateLine}>
              1 {from} = {rate.toLocaleString(undefined, { maximumFractionDigits: 4 })} {to}
            </Text>
          )}
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.body}>
          {/* Base amount */}
          <View style={styles.card}>
            <CurrencyRow label="Amount" currency={CURRENCY_MAP[from]} onPressCurrency={() => setPickerFor('from')}>
              <TextInput
                style={styles.input}
                value={amount}
                onChangeText={setAmount}
                keyboardType="decimal-pad"
                placeholder="0"
                placeholderTextColor={colors.textFaint}
                selectionColor={colors.accent}
              />
            </CurrencyRow>
          </View>

          <Text style={styles.compareLabel}>Same amount in</Text>
          {compareRows.map((r) => (
            <View key={r.code} style={styles.compareRow}>
              <Text style={styles.compareFlag}>{CURRENCY_MAP[r.code]?.flag}</Text>
              <Text style={styles.compareCode}>{r.code}</Text>
              <Text style={styles.compareValue}>{fmt(r.value)}</Text>
              <Pressable onPress={() => saveTargets(targets.filter((t) => t !== r.code))} hitSlop={10} style={styles.compareDel}>
                <Text style={styles.compareDelText}>✕</Text>
              </Pressable>
            </View>
          ))}
          <Pressable onPress={() => setPickerFor('add')} style={styles.addBtn}>
            <Text style={styles.addBtnText}>+ Add currency</Text>
          </Pressable>
        </ScrollView>
      )}

      {/* Status footer */}
      <View style={styles.footer}>
        <View style={{ flex: 1 }}>
          <Text style={styles.footerLabel}>{table ? SOURCE_LABEL[table.source] : 'Loading…'}</Text>
          {table?.date ? <Text style={styles.footerDate}>Rates as of {table.date}</Text> : null}
        </View>
        <Pressable
          onPress={onManualRefresh}
          disabled={refreshing}
          style={({ pressed }) => [styles.refreshBtn, pressed && { opacity: 0.8 }]}
        >
          {refreshing ? (
            <ActivityIndicator size="small" color={colors.accent} />
          ) : (
            <Text style={styles.refreshText}>↻ Update</Text>
          )}
        </Pressable>
      </View>

      {/* Currency picker modal */}
      <Modal visible={pickerFor != null} animationType="slide" transparent onRequestClose={() => setPickerFor(null)}>
        <View style={styles.modalBackdrop}>
          <View style={[styles.modalSheet, { paddingBottom: insets.bottom + spacing.lg }]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select currency</Text>
              <Pressable onPress={() => setPickerFor(null)} hitSlop={12}>
                <Text style={styles.modalClose}>✕</Text>
              </Pressable>
            </View>
            <TextInput
              style={styles.searchInput}
              value={search}
              onChangeText={setSearch}
              placeholder="Search currency or code…"
              placeholderTextColor={colors.textFaint}
              selectionColor={colors.accent}
              autoCorrect={false}
            />
            <FlatList
              data={filtered}
              keyExtractor={(item) => item.code}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item }) => {
                const selected =
                  (pickerFor === 'from' && item.code === from) ||
                  (pickerFor === 'to' && item.code === to);
                // In Compare's "add" list, grey out ones already shown.
                const alreadyAdded =
                  pickerFor === 'add' && (item.code === from || targets.includes(item.code));
                return (
                  <Pressable
                    disabled={alreadyAdded}
                    onPress={() => pick(item.code)}
                    style={({ pressed }) => [
                      styles.currencyItem,
                      selected && styles.currencyItemSelected,
                      alreadyAdded && { opacity: 0.35 },
                      pressed && { backgroundColor: colors.surfaceAlt },
                    ]}
                  >
                    <Text style={styles.currencyFlag}>{item.flag}</Text>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.currencyCode}>{item.code}</Text>
                      <Text style={styles.currencyName}>{item.name}</Text>
                    </View>
                    <Text style={styles.currencySymbol}>
                      {alreadyAdded ? 'Added' : item.symbol}
                    </Text>
                  </Pressable>
                );
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

function CurrencyRow({ label, currency, onPressCurrency, children }) {
  return (
    <View>
      <Text style={styles.cardLabel}>{label}</Text>
      <View style={styles.row}>
        <Pressable onPress={onPressCurrency} style={({ pressed }) => [styles.chip, pressed && { opacity: 0.85 }]}>
          <Text style={styles.chipFlag}>{currency?.flag}</Text>
          <Text style={styles.chipCode}>{currency?.code}</Text>
          <Text style={styles.chipCaret}>▾</Text>
        </Pressable>
        <View style={styles.valueWrap}>{children}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg, justifyContent: 'space-between' },
  tabs: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    padding: 4,
    margin: spacing.lg,
    marginBottom: 0,
  },
  tab: { flex: 1, paddingVertical: spacing.md, borderRadius: radius.pill, alignItems: 'center' },
  tabActive: { backgroundColor: colors.accent },
  tabText: { color: colors.textDim, fontWeight: '700', fontSize: font.body },
  tabTextActive: { color: colors.white },
  body: { padding: spacing.lg },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
  },
  cardLabel: { color: colors.textDim, fontSize: font.small, fontWeight: '600', marginBottom: spacing.md },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.pill,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    gap: spacing.xs,
  },
  chipFlag: { fontSize: 18 },
  chipCode: { color: colors.text, fontWeight: '800', fontSize: font.body },
  chipCaret: { color: colors.textDim, fontSize: 11, marginLeft: 2 },
  valueWrap: { flex: 1, alignItems: 'flex-end' },
  input: { color: colors.text, fontSize: 34, fontWeight: '700', textAlign: 'right', width: '100%', padding: 0 },
  result: { color: colors.accent, fontSize: 34, fontWeight: '800', textAlign: 'right' },
  swapWrap: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.md, gap: spacing.md },
  divider: { flex: 1, height: 1, backgroundColor: colors.border },
  swapBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center' },
  swapIcon: { color: colors.white, fontSize: 22, fontWeight: '800' },
  rateLine: { color: colors.textDim, fontSize: font.body, textAlign: 'center', marginTop: spacing.lg },
  // Compare mode
  compareLabel: { color: colors.textDim, fontSize: font.small, fontWeight: '700', marginTop: spacing.lg, marginBottom: spacing.sm },
  compareRow: {
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
  },
  compareFlag: { fontSize: 24 },
  compareCode: { color: colors.text, fontSize: font.body, fontWeight: '700', width: 52 },
  compareValue: { flex: 1, color: colors.accent, fontSize: font.h3, fontWeight: '800', textAlign: 'right' },
  compareDel: { paddingLeft: spacing.sm },
  compareDelText: { color: colors.textFaint, fontSize: 15 },
  addBtn: { marginTop: spacing.sm, borderWidth: 1, borderColor: colors.accent, borderRadius: radius.pill, paddingVertical: spacing.md, alignItems: 'center' },
  addBtnText: { color: colors.accent, fontWeight: '700', fontSize: font.body },
  footer: { flexDirection: 'row', alignItems: 'center', padding: spacing.lg, borderTopWidth: 1, borderTopColor: colors.border },
  footerLabel: { color: colors.text, fontSize: font.small, fontWeight: '700' },
  footerDate: { color: colors.textFaint, fontSize: font.tiny, marginTop: 2 },
  refreshBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accentSoft,
    borderRadius: radius.pill,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    minWidth: 96,
    justifyContent: 'center',
  },
  refreshText: { color: colors.accent, fontWeight: '700', fontSize: font.small },
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.55)', justifyContent: 'flex-end' },
  modalSheet: {
    backgroundColor: colors.bg,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    maxHeight: '85%',
    borderWidth: 1,
    borderColor: colors.border,
  },
  modalHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.md },
  modalTitle: { color: colors.text, fontSize: font.h3, fontWeight: '800' },
  modalClose: { color: colors.textDim, fontSize: 20, fontWeight: '700' },
  searchInput: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.text,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    fontSize: font.body,
    marginBottom: spacing.sm,
  },
  currencyItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.md, paddingHorizontal: spacing.sm, borderRadius: radius.md, gap: spacing.md },
  currencyItemSelected: { backgroundColor: colors.accentSoft },
  currencyFlag: { fontSize: 26 },
  currencyCode: { color: colors.text, fontSize: font.body, fontWeight: '700' },
  currencyName: { color: colors.textFaint, fontSize: font.small },
  currencySymbol: { color: colors.textDim, fontSize: font.body, fontWeight: '600' },
});
