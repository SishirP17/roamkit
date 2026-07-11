import { StyleSheet, Text, View } from 'react-native';
import { colors, font, radius, spacing } from '../../theme';

// The pinned "Do this now" card at the top of an article: the condensed, act-now
// version. One numbered action per line. `scale` enlarges the text with the
// user's chosen size.
export default function QuickStepsCard({ steps, scale = 1 }) {
  if (!steps || steps.length === 0) return null;
  return (
    <View style={styles.card} accessibilityRole="summary">
      <Text style={[styles.heading, { fontSize: font.small * scale }]}>
        DO THIS NOW
      </Text>
      {steps.map((s, i) => (
        <View key={i} style={styles.row}>
          <View style={styles.num}>
            <Text style={[styles.numText, { fontSize: font.small * scale }]}>
              {i + 1}
            </Text>
          </View>
          <Text style={[styles.step, { fontSize: font.body * scale, lineHeight: font.body * scale * 1.35 }]}>
            {s}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.accentSoft,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.accent,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  heading: {
    color: colors.accent,
    fontWeight: '900',
    letterSpacing: 1.5,
    marginBottom: spacing.md,
  },
  row: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.sm, alignItems: 'flex-start' },
  num: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  numText: { color: colors.white, fontWeight: '900' },
  step: { flex: 1, color: colors.text, fontWeight: '600' },
});
