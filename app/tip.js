import { useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, font, radius, spacing } from '../src/theme';

const TIP_PRESETS = [10, 15, 18, 20, 25];

export default function TipSplit() {
  const insets = useSafeAreaInsets();
  const [bill, setBill] = useState('');
  const [tipPct, setTipPct] = useState(15);
  const [customTip, setCustomTip] = useState('');
  const [people, setPeople] = useState(2);
  const [roundUp, setRoundUp] = useState(false);

  const billNum = parseFloat(bill.replace(',', '.')) || 0;
  const effectiveTip =
    customTip.trim() !== '' ? parseFloat(customTip.replace(',', '.')) || 0 : tipPct;

  const { tipAmount, total, perPerson } = useMemo(() => {
    const tip = billNum * (effectiveTip / 100);
    let tot = billNum + tip;
    let per = tot / Math.max(1, people);
    if (roundUp) {
      per = Math.ceil(per);
      tot = per * people;
    }
    return { tipAmount: tip, total: tot, perPerson: per };
  }, [billNum, effectiveTip, people, roundUp]);

  const fmt = (n) =>
    n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{ padding: spacing.lg, paddingBottom: insets.bottom + spacing.xl }}
    >
      {/* Bill */}
      <Text style={styles.label}>Bill amount</Text>
      <View style={styles.card}>
        <Text style={styles.prefix}>$</Text>
        <TextInput
          style={styles.input}
          value={bill}
          onChangeText={setBill}
          keyboardType="decimal-pad"
          placeholder="0.00"
          placeholderTextColor={colors.textFaint}
          selectionColor={colors.accent}
        />
      </View>

      {/* Tip */}
      <Text style={[styles.label, { marginTop: spacing.lg }]}>Tip</Text>
      <View style={styles.tipRow}>
        {TIP_PRESETS.map((p) => {
          const active = customTip.trim() === '' && p === tipPct;
          return (
            <Pressable
              key={p}
              onPress={() => {
                setTipPct(p);
                setCustomTip('');
              }}
              style={[styles.tipChip, active && styles.tipChipActive]}
            >
              <Text style={[styles.tipChipText, active && styles.tipChipTextActive]}>
                {p}%
              </Text>
            </Pressable>
          );
        })}
        <View style={[styles.tipChip, styles.customChip, customTip.trim() !== '' && styles.tipChipActive]}>
          <TextInput
            style={styles.customInput}
            value={customTip}
            onChangeText={setCustomTip}
            keyboardType="decimal-pad"
            placeholder="Custom"
            placeholderTextColor={colors.textFaint}
            selectionColor={colors.accent}
          />
          {customTip.trim() !== '' && <Text style={styles.tipChipTextActive}>%</Text>}
        </View>
      </View>

      {/* People */}
      <Text style={[styles.label, { marginTop: spacing.lg }]}>Split between</Text>
      <View style={styles.stepperRow}>
        <Pressable
          onPress={() => setPeople((n) => Math.max(1, n - 1))}
          style={styles.stepBtn}
        >
          <Text style={styles.stepBtnText}>−</Text>
        </Pressable>
        <View style={styles.peopleBox}>
          <Text style={styles.peopleNum}>{people}</Text>
          <Text style={styles.peopleLabel}>{people === 1 ? 'person' : 'people'}</Text>
        </View>
        <Pressable onPress={() => setPeople((n) => n + 1)} style={styles.stepBtn}>
          <Text style={styles.stepBtnText}>+</Text>
        </Pressable>
      </View>

      {/* Round up */}
      <Pressable onPress={() => setRoundUp((r) => !r)} style={styles.toggleRow}>
        <View style={[styles.checkbox, roundUp && styles.checkboxOn]}>
          {roundUp && <Text style={styles.checkmark}>✓</Text>}
        </View>
        <Text style={styles.toggleText}>Round up per person</Text>
      </Pressable>

      {/* Results */}
      <View style={styles.resultCard}>
        <View style={styles.resultRow}>
          <Text style={styles.resultLabel}>Tip</Text>
          <Text style={styles.resultValue}>${fmt(tipAmount)}</Text>
        </View>
        <View style={styles.resultRow}>
          <Text style={styles.resultLabel}>Total</Text>
          <Text style={styles.resultValue}>${fmt(total)}</Text>
        </View>
        <View style={styles.resultDivider} />
        <View style={styles.resultRow}>
          <Text style={styles.perLabel}>Per person</Text>
          <Text style={styles.perValue}>${fmt(perPerson)}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  label: { color: colors.textDim, fontSize: font.small, fontWeight: '700', marginBottom: spacing.sm },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  prefix: { color: colors.textDim, fontSize: 30, fontWeight: '700', marginRight: spacing.sm },
  input: { flex: 1, color: colors.text, fontSize: 32, fontWeight: '700', padding: 0 },
  tipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  tipChip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tipChipActive: { backgroundColor: colors.accentSoft, borderColor: colors.accent },
  tipChipText: { color: colors.textDim, fontWeight: '700', fontSize: font.body },
  tipChipTextActive: { color: colors.accent, fontWeight: '700', fontSize: font.body },
  customChip: { flexDirection: 'row', alignItems: 'center', minWidth: 92 },
  customInput: { color: colors.text, fontSize: font.body, fontWeight: '700', padding: 0, minWidth: 56 },
  stepperRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.lg },
  stepBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepBtnText: { color: colors.accent, fontSize: 30, fontWeight: '700' },
  peopleBox: { flex: 1, alignItems: 'center' },
  peopleNum: { color: colors.text, fontSize: 36, fontWeight: '800' },
  peopleLabel: { color: colors.textFaint, fontSize: font.small },
  toggleRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, marginTop: spacing.lg },
  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxOn: { backgroundColor: colors.accent, borderColor: colors.accent },
  checkmark: { color: colors.white, fontWeight: '800', fontSize: 16 },
  toggleText: { color: colors.text, fontSize: font.body },
  resultCard: {
    marginTop: spacing.xl,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  resultLabel: { color: colors.textDim, fontSize: font.body },
  resultValue: { color: colors.text, fontSize: font.body, fontWeight: '700' },
  resultDivider: { height: 1, backgroundColor: colors.border, marginVertical: spacing.sm },
  perLabel: { color: colors.text, fontSize: font.h3, fontWeight: '700' },
  perValue: { color: colors.accent, fontSize: font.h2, fontWeight: '800' },
});
