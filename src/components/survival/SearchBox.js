import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, font, radius, spacing } from '../../theme';

// Large, high-contrast search field for the survival guide home. Kept simple so
// it reads clearly for older eyes: big text, a magnifier, and a clear button.
export default function SearchBox({ value, onChangeText, onClear }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.glass}>🔍</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search, e.g. bleeding, water, snake"
        placeholderTextColor={colors.textFaint}
        style={styles.input}
        autoCorrect={false}
        autoCapitalize="none"
        returnKeyType="search"
        accessibilityLabel="Search the survival guide"
        accessibilityRole="search"
      />
      {value ? (
        <Pressable
          onPress={onClear}
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel="Clear search"
          style={({ pressed }) => [styles.clear, pressed && { opacity: 0.6 }]}
        >
          <Text style={styles.clearGlyph}>✕</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.lg,
    minHeight: 56,
  },
  glass: { fontSize: 18, marginRight: spacing.sm },
  input: {
    flex: 1,
    color: colors.text,
    fontSize: font.h3,
    paddingVertical: spacing.md,
  },
  clear: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.sm,
  },
  clearGlyph: { color: colors.textDim, fontSize: 14, fontWeight: '800' },
});
