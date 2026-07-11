import { StyleSheet, Text, View } from 'react-native';
import { colors, font, radius, spacing } from '../../theme';

// A warning callout used for "do not" / danger notes inside an article. Amber so
// it reads as caution against the navy background without being alarming.
export default function Callout({ text, scale = 1 }) {
  if (!text) return null;
  return (
    <View style={styles.box} accessibilityRole="alert">
      <Text style={styles.icon}>⚠️</Text>
      <Text style={[styles.text, { fontSize: font.body * scale, lineHeight: font.body * scale * 1.35 }]}>
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderLeftWidth: 4,
    borderColor: colors.border,
    borderLeftColor: colors.warning,
    padding: spacing.md,
    marginTop: spacing.sm,
  },
  icon: { fontSize: 18, marginTop: 1 },
  text: { flex: 1, color: colors.text, fontWeight: '600' },
});
