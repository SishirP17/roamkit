import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, font, radius, spacing } from '../../theme';

// A big-tap-target row linking to one article. Shows the title and a one-line
// plain summary. Emergency articles get a small red marker so they stand out.
export default function ArticleRow({ title, summary, emergency, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={
        (emergency ? 'Emergency. ' : '') + title + '. ' + (summary || '')
      }
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
    >
      <View style={{ flex: 1 }}>
        <View style={styles.titleWrap}>
          {emergency ? <View style={styles.dot} /> : null}
          <Text style={styles.title}>{title}</Text>
        </View>
        {summary ? (
          <Text style={styles.summary} numberOfLines={2}>
            {summary}
          </Text>
        ) : null}
      </View>
      <Text style={styles.chevron}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    minHeight: 64,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
  },
  pressed: { borderColor: colors.accent, transform: [{ scale: 0.99 }] },
  titleWrap: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.danger },
  title: { flex: 1, color: colors.text, fontSize: font.h3, fontWeight: '700' },
  summary: { color: colors.textDim, fontSize: font.small, marginTop: 3, lineHeight: 19 },
  chevron: { color: colors.textFaint, fontSize: 26, fontWeight: '700' },
});
