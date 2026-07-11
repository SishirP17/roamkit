import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, font, radius, spacing, tileColors } from '../../theme';

// A large, high-contrast category tile: colored icon badge + word + one-line
// blurb. Mirrors the home-grid tile style so the app feels consistent.
export default function CategoryTile({ category, width, onPress }) {
  const color = tileColors[category.color] || colors.accent;
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={'Open ' + category.title}
      style={({ pressed }) => [
        styles.tile,
        { width },
        pressed && styles.pressed,
      ]}
    >
      <View style={[styles.iconWrap, { backgroundColor: color + '22' }]}>
        <Text style={styles.icon}>{category.icon}</Text>
      </View>
      <Text style={styles.title}>{category.title}</Text>
      {category.blurb ? (
        <Text style={styles.blurb} numberOfLines={2}>
          {category.blurb}
        </Text>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tile: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    minHeight: 138,
  },
  pressed: { borderColor: colors.accent, transform: [{ scale: 0.97 }] },
  iconWrap: {
    width: 46,
    height: 46,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  icon: { fontSize: 24 },
  title: { color: colors.text, fontSize: font.h3, fontWeight: '700' },
  blurb: { color: colors.textFaint, fontSize: font.small, marginTop: 2, lineHeight: 18 },
});
