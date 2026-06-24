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

// Each category defines units as a factor relative to a base unit.
// Temperature is special-cased (offsets, not pure ratios).
const CATEGORIES = [
  {
    id: 'length',
    label: 'Length',
    units: [
      { code: 'm', name: 'Meters', factor: 1 },
      { code: 'km', name: 'Kilometers', factor: 1000 },
      { code: 'cm', name: 'Centimeters', factor: 0.01 },
      { code: 'mm', name: 'Millimeters', factor: 0.001 },
      { code: 'mi', name: 'Miles', factor: 1609.344 },
      { code: 'yd', name: 'Yards', factor: 0.9144 },
      { code: 'ft', name: 'Feet', factor: 0.3048 },
      { code: 'in', name: 'Inches', factor: 0.0254 },
    ],
  },
  {
    id: 'weight',
    label: 'Weight',
    units: [
      { code: 'kg', name: 'Kilograms', factor: 1000 },
      { code: 'g', name: 'Grams', factor: 1 },
      { code: 'mg', name: 'Milligrams', factor: 0.001 },
      { code: 't', name: 'Tonnes', factor: 1e6 },
      { code: 'lb', name: 'Pounds', factor: 453.59237 },
      { code: 'oz', name: 'Ounces', factor: 28.349523 },
      { code: 'st', name: 'Stone', factor: 6350.29318 },
    ],
  },
  {
    id: 'temp',
    label: 'Temp',
    isTemp: true,
    units: [
      { code: '°C', name: 'Celsius' },
      { code: '°F', name: 'Fahrenheit' },
      { code: 'K', name: 'Kelvin' },
    ],
  },
  {
    id: 'volume',
    label: 'Volume',
    units: [
      { code: 'L', name: 'Liters', factor: 1 },
      { code: 'mL', name: 'Milliliters', factor: 0.001 },
      { code: 'gal', name: 'Gallons (US)', factor: 3.785411 },
      { code: 'qt', name: 'Quarts (US)', factor: 0.946353 },
      { code: 'pt', name: 'Pints (US)', factor: 0.473176 },
      { code: 'cup', name: 'Cups (US)', factor: 0.236588 },
      { code: 'floz', name: 'Fluid oz (US)', factor: 0.0295735 },
    ],
  },
];

function toBaseTemp(value, code) {
  if (code === '°C') return value;
  if (code === '°F') return (value - 32) * (5 / 9);
  return value - 273.15; // Kelvin -> Celsius
}
function fromBaseTemp(celsius, code) {
  if (code === '°C') return celsius;
  if (code === '°F') return celsius * (9 / 5) + 32;
  return celsius + 273.15;
}

function convertUnits(value, fromU, toU, cat) {
  if (cat.isTemp) {
    return fromBaseTemp(toBaseTemp(value, fromU.code), toU.code);
  }
  return (value * fromU.factor) / toU.factor;
}

export default function UnitConverter() {
  const insets = useSafeAreaInsets();
  const [catId, setCatId] = useState('length');
  const [amount, setAmount] = useState('1');
  const [fromCode, setFromCode] = useState('m');
  const [toCode, setToCode] = useState('ft');

  const cat = CATEGORIES.find((c) => c.id === catId);
  const fromU = cat.units.find((u) => u.code === fromCode) || cat.units[0];
  const toU = cat.units.find((u) => u.code === toCode) || cat.units[1];

  const value = parseFloat(amount.replace(',', '.')) || 0;
  const result = useMemo(
    () => convertUnits(value, fromU, toU, cat),
    [value, fromU, toU, cat]
  );

  const selectCategory = (c) => {
    setCatId(c.id);
    setFromCode(c.units[0].code);
    setToCode(c.units[1].code);
  };

  const fmt = (n) =>
    Number.isFinite(n)
      ? n.toLocaleString(undefined, { maximumFractionDigits: 6 })
      : '—';

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{ padding: spacing.lg, paddingBottom: insets.bottom + spacing.xl }}
    >
      {/* Category tabs */}
      <View style={styles.tabs}>
        {CATEGORIES.map((c) => {
          const active = c.id === catId;
          return (
            <Pressable
              key={c.id}
              onPress={() => selectCategory(c)}
              style={[styles.tab, active && styles.tabActive]}
            >
              <Text style={[styles.tabText, active && styles.tabTextActive]}>
                {c.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* From */}
      <Text style={styles.label}>From</Text>
      <UnitRow units={cat.units} selected={fromCode} onSelect={setFromCode} />
      <View style={styles.card}>
        <TextInput
          style={styles.input}
          value={amount}
          onChangeText={setAmount}
          keyboardType={cat.isTemp ? 'numbers-and-punctuation' : 'decimal-pad'}
          placeholder="0"
          placeholderTextColor={colors.textFaint}
          selectionColor={colors.accent}
        />
        <Text style={styles.unitTag}>{fromU.code}</Text>
      </View>

      {/* To */}
      <Text style={[styles.label, { marginTop: spacing.lg }]}>To</Text>
      <UnitRow units={cat.units} selected={toCode} onSelect={setToCode} />
      <View style={[styles.card, styles.cardResult]}>
        <Text style={styles.result} numberOfLines={1} adjustsFontSizeToFit>
          {fmt(result)}
        </Text>
        <Text style={[styles.unitTag, { color: colors.accent }]}>{toU.code}</Text>
      </View>

      <Text style={styles.note}>
        {fmt(value)} {fromU.code} = {fmt(result)} {toU.code}
      </Text>
    </ScrollView>
  );
}

function UnitRow({ units, selected, onSelect }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.chipRow}
    >
      {units.map((u) => {
        const active = u.code === selected;
        return (
          <Pressable
            key={u.code}
            onPress={() => onSelect(u.code)}
            style={[styles.chip, active && styles.chipActive]}
          >
            <Text style={[styles.chipText, active && styles.chipTextActive]}>
              {u.code}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  tabs: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    padding: 4,
    marginBottom: spacing.lg,
  },
  tab: { flex: 1, paddingVertical: spacing.sm, borderRadius: radius.pill, alignItems: 'center' },
  tabActive: { backgroundColor: colors.accent },
  tabText: { color: colors.textDim, fontWeight: '700', fontSize: font.small },
  tabTextActive: { color: colors.white },
  label: { color: colors.textDim, fontSize: font.small, fontWeight: '700', marginBottom: spacing.sm },
  chipRow: { gap: spacing.sm, paddingBottom: spacing.md, alignItems: 'center' },
  chip: {
    flexShrink: 0,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipActive: { backgroundColor: colors.accentSoft, borderColor: colors.accent },
  chipText: { color: colors.textDim, fontWeight: '700', fontSize: font.small },
  chipTextActive: { color: colors.accent },
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
  cardResult: { borderColor: colors.accentSoft },
  input: { flex: 1, color: colors.text, fontSize: 32, fontWeight: '700', padding: 0 },
  result: { flex: 1, color: colors.accent, fontSize: 32, fontWeight: '800' },
  unitTag: { color: colors.textDim, fontSize: font.h3, fontWeight: '700', marginLeft: spacing.md },
  note: { color: colors.textFaint, textAlign: 'center', marginTop: spacing.xl, fontSize: font.body },
});
