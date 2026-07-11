import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, font, radius, spacing } from '../../theme';

// The "In an emergency" band on the guide home. The most life-critical articles
// are one tap away. On phones the chips scroll sideways to stay compact. On the
// web a sideways ScrollView cannot be scrolled with a mouse wheel, so there the
// chips wrap onto multiple lines instead and every topic stays reachable.
export default function EmergencyRow({ items, onPick }) {
  if (!items || items.length === 0) return null;

  const chips = items.map((a) => (
    <Pressable
      key={a.id}
      onPress={() => onPick(a)}
      accessibilityRole="button"
      accessibilityLabel={'Emergency. Open ' + a.title}
      style={({ pressed }) => [styles.chip, pressed && { opacity: 0.85 }]}
    >
      <Text style={styles.chipText}>{a.title}</Text>
    </Pressable>
  ));

  return (
    <View style={styles.card}>
      <Text style={styles.heading}>In an emergency</Text>
      {Platform.OS === 'web' ? (
        <View style={styles.wrap}>{chips}</View>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chips}
        >
          {chips}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  heading: {
    color: colors.textDim,
    fontSize: font.small,
    fontWeight: '800',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: spacing.sm,
    marginLeft: spacing.xs,
  },
  chips: { gap: spacing.sm, paddingRight: spacing.sm },
  wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  chip: {
    flexShrink: 0,
    justifyContent: 'center',
    minHeight: 48,
    backgroundColor: colors.accentSoft,
    borderWidth: 1,
    borderColor: colors.accent,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  chipText: { color: colors.text, fontSize: font.body, fontWeight: '700' },
});
