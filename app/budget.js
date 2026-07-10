import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CurrencyPicker from '../src/components/CurrencyPicker';
import LockedNotice from '../src/components/LockedNotice';
import { useCurrencies } from '../src/lib/currencies';
import { parseAmount } from '../src/lib/parseAmount';
import { usePro } from '../src/lib/pro';
import { convert, loadRates, refreshRates } from '../src/lib/rateStore';
import { colors, font, radius, spacing } from '../src/theme';

const KEY = 'budget.v1';
const DEFAULT = { tripName: 'My Trip', home: 'USD', dailyBudget: '', expenses: [] };

export default function Budget() {
  const insets = useSafeAreaInsets();
  const { isPro } = usePro();
  const { currencyMap, applyRates } = useCurrencies();
  const [rawTable, setRawTable] = useState(null);
  // Overlay any user-added currencies' manual rates the feed doesn't cover.
  const table = useMemo(() => applyRates(rawTable), [rawTable, applyRates]);
  const [data, setData] = useState(DEFAULT);
  const [loaded, setLoaded] = useState(false);
  const [picker, setPicker] = useState(null); // 'home' | 'expense' | null

  // Add-expense modal state
  const [addOpen, setAddOpen] = useState(false);
  const [exAmount, setExAmount] = useState('');
  const [exCurrency, setExCurrency] = useState('USD');
  const [exLabel, setExLabel] = useState('');

  useEffect(() => {
    let alive = true;
    (async () => {
      const initial = await loadRates();
      if (alive) setRawTable(initial);
      const fresh = await refreshRates();
      if (alive && fresh) setRawTable(fresh);
      try {
        const raw = await AsyncStorage.getItem(KEY);
        if (raw && alive) {
          const parsed = JSON.parse(raw);
          // A truncated/corrupted store must not brick the screen: expenses
          // is spread during render, so force it back to an array.
          if (parsed && typeof parsed === 'object') {
            if (!Array.isArray(parsed.expenses)) parsed.expenses = [];
            setData({ ...DEFAULT, ...parsed });
            setExCurrency(parsed.home || 'USD');
          }
        }
      } catch (e) {}
      if (alive) setLoaded(true);
    })();
    return () => {
      alive = false;
    };
  }, []);

  const save = (next) => {
    setData((prev) => {
      const merged = { ...prev, ...next };
      AsyncStorage.setItem(KEY, JSON.stringify(merged)).catch(() => {});
      return merged;
    });
  };

  const inHome = (amount, currency) =>
    table ? convert(amount, currency, data.home, table) : null;

  // Totals
  const { todayTotal, tripTotal, grouped } = useMemo(() => {
    const today = new Date().toDateString();
    let tToday = 0;
    let tAll = 0;
    const groups = {};
    const sorted = [...(data.expenses || [])].sort((a, b) => b.ts - a.ts);
    for (const e of sorted) {
      const conv = inHome(e.amount, e.currency) || 0;
      tAll += conv;
      const day = new Date(e.ts).toDateString();
      if (day === today) tToday += conv;
      (groups[day] = groups[day] || []).push(e);
    }
    return { todayTotal: tToday, tripTotal: tAll, grouped: groups };
  }, [data.expenses, data.home, table]);

  const dailyBudgetNum = parseAmount(data.dailyBudget) || 0;
  const pct = dailyBudgetNum > 0 ? Math.min(1, todayTotal / dailyBudgetNum) : 0;
  const over = dailyBudgetNum > 0 && todayTotal > dailyBudgetNum;

  const homeSym = currencyMap[data.home]?.symbol || '';
  const fmt = (n) =>
    (n || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const addExpense = () => {
    const amt = parseAmount(exAmount);
    if (!amt || amt <= 0) return;
    const e = {
      id: `${Date.now()}-${Math.floor(Math.random() * 1e6)}`,
      amount: amt,
      currency: exCurrency,
      label: exLabel.trim() || 'Expense',
      ts: Date.now(),
    };
    save({ expenses: [...(data.expenses || []), e] });
    setExAmount('');
    setExLabel('');
    setAddOpen(false);
  };

  const removeExpense = (id) =>
    save({ expenses: (data.expenses || []).filter((e) => e.id !== id) });

  const dayLabel = (dayStr) => {
    const today = new Date().toDateString();
    const yest = new Date(Date.now() - 86400000).toDateString();
    if (dayStr === today) return 'Today';
    if (dayStr === yest) return 'Yesterday';
    return dayStr;
  };

  if (!isPro) return <LockedNotice name="Trip Budget is a Pro tool" />;

  return (
    <View style={[styles.screen, { paddingBottom: insets.bottom }]}>
      <ScrollView contentContainerStyle={{ padding: spacing.lg, paddingBottom: spacing.xxl * 2 }}>
        {/* Trip header */}
        <View style={styles.headerCard}>
          <TextInput
            style={styles.tripName}
            value={data.tripName}
            onChangeText={(t) => save({ tripName: t })}
            placeholder="Trip name"
            placeholderTextColor={colors.textFaint}
            selectionColor={colors.accent}
          />
          <View style={styles.headerRow}>
            <View style={styles.headerField}>
              <Text style={styles.fieldLabel}>Home currency</Text>
              <Pressable onPress={() => setPicker('home')} style={styles.chip}>
                <Text style={styles.chipFlag}>{currencyMap[data.home]?.flag}</Text>
                <Text style={styles.chipCode}>{data.home}</Text>
                <Text style={styles.chipCaret}>▾</Text>
              </Pressable>
            </View>
            <View style={styles.headerField}>
              <Text style={styles.fieldLabel}>Daily budget ({homeSym})</Text>
              <TextInput
                style={styles.budgetInput}
                value={data.dailyBudget}
                onChangeText={(t) => save({ dailyBudget: t })}
                keyboardType="decimal-pad"
                placeholder="none"
                placeholderTextColor={colors.textFaint}
                selectionColor={colors.accent}
              />
            </View>
          </View>
        </View>

        {/* Today summary */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryTop}>
            <Text style={styles.summaryLabel}>Today</Text>
            <Text style={styles.summaryAmount}>
              {homeSym}{fmt(todayTotal)}
            </Text>
          </View>
          {dailyBudgetNum > 0 && (
            <>
              <View style={styles.barTrack}>
                <View
                  style={[
                    styles.barFill,
                    { width: `${pct * 100}%`, backgroundColor: over ? colors.danger : colors.success },
                  ]}
                />
              </View>
              <Text style={[styles.budgetNote, over && { color: colors.danger }]}>
                {over
                  ? `Over budget by ${homeSym}${fmt(todayTotal - dailyBudgetNum)}`
                  : `${homeSym}${fmt(dailyBudgetNum - todayTotal)} left today`}
              </Text>
            </>
          )}
        </View>

        {/* Trip total */}
        <View style={styles.tripTotalRow}>
          <Text style={styles.tripTotalLabel}>Trip total</Text>
          <Text style={styles.tripTotalValue}>{homeSym}{fmt(tripTotal)}</Text>
        </View>

        {/* Expenses */}
        {loaded && (data.expenses || []).length === 0 && (
          <Text style={styles.empty}>No expenses yet. Tap + to add your first one.</Text>
        )}
        {Object.keys(grouped).map((day) => (
          <View key={day} style={{ marginTop: spacing.lg }}>
            <Text style={styles.dayHeader}>{dayLabel(day)}</Text>
            {grouped[day].map((e) => (
              <View key={e.id} style={styles.expense}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.expLabel}>{e.label}</Text>
                  <Text style={styles.expOrig}>
                    {currencyMap[e.currency]?.flag} {fmt(e.amount)} {e.currency}
                  </Text>
                </View>
                <Text style={styles.expConv}>
                  {homeSym}{fmt(inHome(e.amount, e.currency))}
                </Text>
                <Pressable onPress={() => removeExpense(e.id)} hitSlop={10} style={styles.expDel}>
                  <Text style={styles.expDelText}>✕</Text>
                </Pressable>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>

      {/* FAB */}
      <Pressable
        onPress={() => {
          setExCurrency(data.home);
          setAddOpen(true);
        }}
        style={[styles.fab, { bottom: insets.bottom + spacing.lg }]}
      >
        <Text style={styles.fabText}>+ Expense</Text>
      </Pressable>

      {/* Add expense modal */}
      <Modal visible={addOpen} animationType="slide" transparent onRequestClose={() => setAddOpen(false)}>
        {/* On iOS the keyboard slides over a bottom-anchored sheet inside a
            Modal (no auto-pan like Android), hiding the inputs and Add button. */}
        <KeyboardAvoidingView
          style={styles.backdrop}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <Pressable style={{ flex: 1 }} onPress={() => setAddOpen(false)} />
          <View style={[styles.sheet, { paddingBottom: insets.bottom + spacing.lg }]}>
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>Add expense</Text>
              <Pressable onPress={() => setAddOpen(false)} hitSlop={12}>
                <Text style={styles.close}>✕</Text>
              </Pressable>
            </View>

            <View style={styles.addRow}>
              <Pressable onPress={() => setPicker('expense')} style={styles.chip}>
                <Text style={styles.chipFlag}>{currencyMap[exCurrency]?.flag}</Text>
                <Text style={styles.chipCode}>{exCurrency}</Text>
                <Text style={styles.chipCaret}>▾</Text>
              </Pressable>
              <TextInput
                style={styles.addAmount}
                value={exAmount}
                onChangeText={setExAmount}
                keyboardType="decimal-pad"
                placeholder="0"
                placeholderTextColor={colors.textFaint}
                selectionColor={colors.accent}
                autoFocus
              />
            </View>
            <TextInput
              style={styles.addLabel}
              value={exLabel}
              onChangeText={setExLabel}
              placeholder="What was it? (e.g. Lunch)"
              placeholderTextColor={colors.textFaint}
              selectionColor={colors.accent}
            />
            {exAmount ? (
              <Text style={styles.addPreview}>
                ≈ {homeSym}
                {fmt(inHome(parseAmount(exAmount) || 0, exCurrency))} in {data.home}
              </Text>
            ) : null}
            <Pressable onPress={addExpense} style={styles.addBtn}>
              <Text style={styles.addBtnText}>Add expense</Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      <CurrencyPicker
        visible={picker === 'home'}
        selected={data.home}
        onClose={() => setPicker(null)}
        onSelect={(code) => save({ home: code })}
      />
      <CurrencyPicker
        visible={picker === 'expense'}
        selected={exCurrency}
        onClose={() => setPicker(null)}
        onSelect={(code) => setExCurrency(code)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  headerCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
  },
  tripName: { color: colors.text, fontSize: font.h2, fontWeight: '800', padding: 0, marginBottom: spacing.md },
  headerRow: { flexDirection: 'row', gap: spacing.lg },
  headerField: { flex: 1 },
  fieldLabel: { color: colors.textDim, fontSize: font.tiny, fontWeight: '700', marginBottom: spacing.xs },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.pill,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    alignSelf: 'flex-start',
  },
  chipFlag: { fontSize: 18 },
  chipCode: { color: colors.text, fontWeight: '800', fontSize: font.body },
  chipCaret: { color: colors.textDim, fontSize: 11 },
  budgetInput: {
    color: colors.text,
    fontSize: font.h3,
    fontWeight: '700',
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  summaryCard: {
    backgroundColor: colors.accentSoft,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    marginTop: spacing.md,
  },
  summaryTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  summaryLabel: { color: colors.textDim, fontSize: font.body, fontWeight: '700' },
  summaryAmount: { color: colors.text, fontSize: font.h1, fontWeight: '800' },
  barTrack: { height: 10, backgroundColor: colors.bg, borderRadius: 5, marginTop: spacing.md, overflow: 'hidden' },
  barFill: { height: 10, borderRadius: 5 },
  budgetNote: { color: colors.textDim, fontSize: font.small, marginTop: spacing.sm, fontWeight: '600' },
  tripTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    marginTop: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tripTotalLabel: { color: colors.textDim, fontSize: font.body, fontWeight: '700' },
  tripTotalValue: { color: colors.accent, fontSize: font.h2, fontWeight: '800' },
  empty: { color: colors.textFaint, textAlign: 'center', marginTop: spacing.xl, fontSize: font.body },
  dayHeader: {
    color: colors.textFaint,
    fontSize: font.tiny,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: spacing.sm,
  },
  expense: {
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
  expLabel: { color: colors.text, fontSize: font.body, fontWeight: '700' },
  expOrig: { color: colors.textFaint, fontSize: font.small, marginTop: 2 },
  expConv: { color: colors.text, fontSize: font.h3, fontWeight: '800' },
  expDel: { paddingLeft: spacing.sm },
  expDelText: { color: colors.textFaint, fontSize: 15 },
  fab: {
    position: 'absolute',
    right: spacing.lg,
    backgroundColor: colors.accent,
    borderRadius: radius.pill,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  fabText: { color: colors.white, fontWeight: '800', fontSize: font.body },
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.55)', justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: colors.bg,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sheetHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.lg },
  sheetTitle: { color: colors.text, fontSize: font.h3, fontWeight: '800' },
  close: { color: colors.textDim, fontSize: 20, fontWeight: '700' },
  addRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, marginBottom: spacing.md },
  addAmount: { flex: 1, color: colors.text, fontSize: 32, fontWeight: '700', textAlign: 'right', padding: 0 },
  addLabel: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.text,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    fontSize: font.body,
  },
  addPreview: { color: colors.textDim, fontSize: font.small, marginTop: spacing.md, textAlign: 'center' },
  addBtn: { backgroundColor: colors.accent, borderRadius: radius.pill, paddingVertical: spacing.md, alignItems: 'center', marginTop: spacing.lg },
  addBtnText: { color: colors.white, fontWeight: '800', fontSize: font.body },
});
