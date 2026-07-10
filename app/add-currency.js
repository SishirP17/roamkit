import { useEffect, useMemo, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CURRENCIES } from '../src/data/currencies';
import { useCurrencies } from '../src/lib/currencies';
import { parseAmount } from '../src/lib/parseAmount';
import { loadRates, refreshRates } from '../src/lib/rateStore';
import { colors, font, radius, spacing } from '../src/theme';

const BUILTIN_CODES = new Set(CURRENCIES.map((c) => c.code));

export default function AddCurrency() {
  const insets = useSafeAreaInsets();
  const { custom, add, remove } = useCurrencies();

  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [flag, setFlag] = useState('');
  const [rate, setRate] = useState('');
  const [table, setTable] = useState(null);
  const [savedNote, setSavedNote] = useState(null);
  const noteTimer = useRef(null);

  useEffect(() => () => clearTimeout(noteTimer.current), []);

  // Load the rate table so we can tell the user when a code already has a live
  // rate (so they don't need to type one).
  useEffect(() => {
    let alive = true;
    (async () => {
      const initial = await loadRates();
      if (alive) setTable(initial);
      const fresh = await refreshRates();
      if (alive && fresh) setTable(fresh);
    })();
    return () => {
      alive = false;
    };
  }, []);

  const cleanCode = code.trim().toUpperCase();
  const liveRate = table?.rates?.[cleanCode];
  const isBuiltin = BUILTIN_CODES.has(cleanCode);
  const alreadyCustom = custom.some((c) => c.code === cleanCode);

  // A manual rate is only required when nothing else knows this currency.
  const needsRate = cleanCode.length >= 2 && liveRate == null;
  const rateNum = parseAmount(rate);
  const canSave =
    cleanCode.length >= 2 &&
    cleanCode.length <= 5 &&
    /^[A-Z]+$/.test(cleanCode) &&
    !isBuiltin &&
    (!needsRate || (rateNum > 0));

  const status = useMemo(() => {
    if (cleanCode.length < 2) return null;
    if (!/^[A-Z]+$/.test(cleanCode))
      return { tone: 'bad', text: 'Use letters only, e.g. NPR.' };
    if (isBuiltin)
      return { tone: 'bad', text: `${cleanCode} is already built in — no need to add it.` };
    if (alreadyCustom)
      return { tone: 'warn', text: `You already added ${cleanCode}. Saving will update it.` };
    if (liveRate != null)
      return {
        tone: 'good',
        text: `✓ Live rate available (1 USD ≈ ${liveRate.toLocaleString(undefined, {
          maximumFractionDigits: 4,
        })} ${cleanCode}). A manual rate is optional.`,
      };
    return {
      tone: 'warn',
      text: `No live rate for ${cleanCode} yet. Enter today's rate below so conversions work offline.`,
    };
  }, [cleanCode, isBuiltin, alreadyCustom, liveRate]);

  const onSave = () => {
    if (!canSave) return;
    add({
      code: cleanCode,
      name,
      symbol,
      flag,
      rate: needsRate ? rateNum : null,
    });
    setSavedNote(`${cleanCode} added`);
    setCode('');
    setName('');
    setSymbol('');
    setFlag('');
    setRate('');
    clearTimeout(noteTimer.current);
    noteTimer.current = setTimeout(
      () => setSavedNote((n) => (n === `${cleanCode} added` ? null : n)),
      1800
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={{ padding: spacing.lg, paddingBottom: insets.bottom + spacing.xxl }}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.intro}>
          Add any currency that isn't in the list — like the Nepalese Rupee. Most
          world currencies already have live rates; you only type a rate for ones
          we don't cover.
        </Text>

        <Text style={styles.label}>Currency code</Text>
        <TextInput
          style={styles.input}
          value={code}
          onChangeText={setCode}
          placeholder="NPR"
          placeholderTextColor={colors.textFaint}
          autoCapitalize="characters"
          autoCorrect={false}
          maxLength={5}
          selectionColor={colors.accent}
        />
        {status && (
          <Text
            style={[
              styles.status,
              status.tone === 'good' && { color: colors.success },
              status.tone === 'bad' && { color: colors.danger },
              status.tone === 'warn' && { color: colors.warning },
            ]}
          >
            {status.text}
          </Text>
        )}

        <View style={styles.row}>
          <View style={{ flex: 2 }}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Nepalese Rupee"
              placeholderTextColor={colors.textFaint}
              selectionColor={colors.accent}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Symbol</Text>
            <TextInput
              style={styles.input}
              value={symbol}
              onChangeText={setSymbol}
              placeholder="रू"
              placeholderTextColor={colors.textFaint}
              selectionColor={colors.accent}
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Flag (emoji)</Text>
            <TextInput
              style={styles.input}
              value={flag}
              onChangeText={setFlag}
              placeholder="🇳🇵"
              placeholderTextColor={colors.textFaint}
              selectionColor={colors.accent}
            />
          </View>
          <View style={{ flex: 2 }}>
            <Text style={styles.label}>
              Rate {needsRate ? '(required)' : '(optional)'}
            </Text>
            <View style={styles.rateWrap}>
              <Text style={styles.ratePrefix}>1 USD =</Text>
              <TextInput
                style={styles.rateInput}
                value={rate}
                onChangeText={setRate}
                keyboardType="decimal-pad"
                placeholder={liveRate != null ? 'live' : '133.5'}
                placeholderTextColor={colors.textFaint}
                selectionColor={colors.accent}
              />
              <Text style={styles.rateSuffix}>{cleanCode || ''}</Text>
            </View>
          </View>
        </View>

        <Pressable
          onPress={onSave}
          disabled={!canSave}
          style={({ pressed }) => [
            styles.saveBtn,
            !canSave && styles.saveBtnDisabled,
            pressed && canSave && { opacity: 0.85 },
          ]}
        >
          <Text style={[styles.saveText, !canSave && { color: colors.textFaint }]}>
            {savedNote || 'Add currency'}
          </Text>
        </Pressable>

        {/* Existing custom currencies */}
        {custom.length > 0 && (
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
                <Pressable onPress={() => remove(c.code)} hitSlop={10} style={styles.del}>
                  <Text style={styles.delText}>✕</Text>
                </Pressable>
              </View>
            ))}
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  intro: { color: colors.textDim, fontSize: font.body, lineHeight: 22, marginBottom: spacing.lg },
  label: {
    color: colors.textDim,
    fontSize: font.small,
    fontWeight: '700',
    marginBottom: spacing.sm,
    marginTop: spacing.md,
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.text,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    fontSize: font.h3,
    fontWeight: '700',
  },
  status: { fontSize: font.small, marginTop: spacing.sm, lineHeight: 19, fontWeight: '600' },
  row: { flexDirection: 'row', gap: spacing.md },
  rateWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
  },
  ratePrefix: { color: colors.textDim, fontSize: font.small, fontWeight: '700' },
  rateInput: {
    flex: 1,
    color: colors.text,
    fontSize: font.h3,
    fontWeight: '700',
    paddingVertical: spacing.md,
    textAlign: 'right',
  },
  rateSuffix: { color: colors.textDim, fontSize: font.small, fontWeight: '700', minWidth: 36 },
  saveBtn: {
    marginTop: spacing.xl,
    backgroundColor: colors.accent,
    borderRadius: radius.pill,
    paddingVertical: spacing.lg,
    alignItems: 'center',
  },
  saveBtnDisabled: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  saveText: { color: colors.white, fontWeight: '800', fontSize: font.body },
  section: {
    color: colors.textFaint,
    fontSize: font.tiny,
    fontWeight: '800',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginTop: spacing.xxl,
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
