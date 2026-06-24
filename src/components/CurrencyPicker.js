import { useState } from 'react';
import { FlatList, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CURRENCIES } from '../data/currencies';
import { colors, font, radius, spacing } from '../theme';

// Reusable bottom-sheet currency picker used across the money tools.
export default function CurrencyPicker({ visible, onClose, onSelect, selected, disabled = [] }) {
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState('');

  const filtered = CURRENCIES.filter((c) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return c.code.toLowerCase().includes(q) || c.name.toLowerCase().includes(q);
  });

  const close = () => {
    setSearch('');
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
});
