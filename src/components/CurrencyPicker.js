import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, FlatList, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CURRENCY_META } from '../data/currencyMeta';
import { useCurrencies } from '../lib/currencies';
import { usePro } from '../lib/pro';
import { loadRates, refreshRates } from '../lib/rateStore';
import { colors, font, radius, spacing } from '../theme';

// Reusable bottom-sheet currency picker used across the money tools.
export default function CurrencyPicker({ visible, onClose, onSelect, selected, disabled = [] }) {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { currencies, add } = useCurrencies();
  const { isPro } = usePro();
  const [search, setSearch] = useState('');
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState(null);

  const filtered = currencies.filter((c) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return c.code.toLowerCase().includes(q) || c.name.toLowerCase().includes(q);
  });

  // When nothing in the local list matches, a query that looks like a currency
  // code (2–5 letters) can be pulled in from the live rate feed instead.
  const candidateCode = search.trim().toUpperCase();
  const canAddOnline = /^[A-Z]{2,5}$/.test(candidateCode);

  // Hit the rate feed for an uncurated code, cache it, and select it. We use
  // whatever rates we already have first (cache/bundled), and only go to the
  // network if that code isn't known yet — a failed fetch means we're offline.
  const onAddOnline = async () => {
    if (!canAddOnline || adding) return;
    // Adding new currencies is a Pro feature. Close the sheet first — this RN
    // Modal sits above the navigator, so a route pushed while it's open would
    // appear hidden behind it.
    if (!isPro) {
      close();
      router.push('/pro');
      return;
    }
    setAdding(true);
    setAddError(null);
    try {
      let table = await loadRates();
      if (!table?.rates?.[candidateCode]) {
        const fresh = await refreshRates();
        if (fresh) table = fresh;
      }
      if (table?.rates?.[candidateCode]) {
        const meta = CURRENCY_META[candidateCode];
        await add({
          code: candidateCode,
          name: meta?.name || candidateCode,
          flag: meta?.flag || '🏳️',
          symbol: candidateCode,
          rate: null, // the live feed knows it — no manual rate needed
        });
        onSelect(candidateCode);
        close();
      } else {
        setAddError(
          `Couldn't find ${candidateCode} online. Connect to Wi-Fi and try again, or find it in Settings → Add a currency.`
        );
      }
    } catch (e) {
      setAddError('Something went wrong. Please try again.');
    } finally {
      setAdding(false);
    }
  };

  const close = () => {
    setSearch('');
    setAdding(false);
    setAddError(null);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={close}>
      <View style={styles.backdrop}>
        <View style={[styles.sheet, { paddingBottom: insets.bottom + spacing.lg }]}>
          <View style={styles.header}>
            <Text style={styles.title}>Select currency</Text>
            <Pressable onPress={close} hitSlop={12}>
              <Text style={styles.close}>✕</Text>
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
            ListEmptyComponent={
              <View style={styles.empty}>
                {canAddOnline ? (
                  <>
                    <Text style={styles.emptyText}>
                      {`"${candidateCode}" isn't in your list.`}
                    </Text>
                    <Pressable
                      onPress={onAddOnline}
                      disabled={adding}
                      style={({ pressed }) => [
                        styles.addOnlineBtn,
                        pressed && !adding && { opacity: 0.85 },
                      ]}
                    >
                      {adding ? (
                        <ActivityIndicator color={colors.white} />
                      ) : (
                        <Text style={styles.addOnlineText}>
                          {`${isPro ? '＋' : '🔒'} Add ${candidateCode} from online rates`}
                        </Text>
                      )}
                    </Pressable>
                    {addError ? (
                      <Text style={styles.addError}>{addError}</Text>
                    ) : (
                      <Text style={styles.emptyHint}>
                        Needs Wi-Fi the first time. After that it's saved on your phone.
                      </Text>
                    )}
                  </>
                ) : (
                  <Text style={styles.emptyText}>No currencies match your search.</Text>
                )}
              </View>
            }
            renderItem={({ item }) => {
              const isSelected = item.code === selected;
              const isDisabled = disabled.includes(item.code);
              return (
                <Pressable
                  disabled={isDisabled}
                  onPress={() => {
                    onSelect(item.code);
                    close();
                  }}
                  style={({ pressed }) => [
                    styles.item,
                    isSelected && styles.itemSelected,
                    isDisabled && { opacity: 0.35 },
                    pressed && { backgroundColor: colors.surfaceAlt },
                  ]}
                >
                  <Text style={styles.flag}>{item.flag}</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.code}>{item.code}</Text>
                    <Text style={styles.name}>{item.name}</Text>
                  </View>
                  {isSelected && <Text style={styles.check}>✓</Text>}
                </Pressable>
              );
            }}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.55)', justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: colors.bg,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    maxHeight: '85%',
    borderWidth: 1,
    borderColor: colors.border,
  },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md },
  title: { color: colors.text, fontSize: font.h3, fontWeight: '800' },
  close: { color: colors.textDim, fontSize: 20, fontWeight: '700' },
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
  item: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.md, paddingHorizontal: spacing.sm, borderRadius: radius.md, gap: spacing.md },
  itemSelected: { backgroundColor: colors.accentSoft },
  flag: { fontSize: 26 },
  code: { color: colors.text, fontSize: font.body, fontWeight: '700' },
  name: { color: colors.textFaint, fontSize: font.small },
  check: { color: colors.accent, fontSize: font.h3, fontWeight: '800' },
  empty: { paddingVertical: spacing.xl, paddingHorizontal: spacing.sm, alignItems: 'center' },
  emptyText: { color: colors.textDim, fontSize: font.body, textAlign: 'center' },
  emptyHint: {
    color: colors.textFaint,
    fontSize: font.small,
    textAlign: 'center',
    marginTop: spacing.md,
    lineHeight: 18,
  },
  addOnlineBtn: {
    marginTop: spacing.lg,
    backgroundColor: colors.accent,
    borderRadius: radius.pill,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    minHeight: 46,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addOnlineText: { color: colors.white, fontWeight: '800', fontSize: font.body },
  addError: {
    color: colors.warning,
    fontSize: font.small,
    textAlign: 'center',
    marginTop: spacing.md,
    lineHeight: 18,
  },
});
