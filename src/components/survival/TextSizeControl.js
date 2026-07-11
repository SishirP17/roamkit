import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SCALE_STEPS, useTextScale } from '../../lib/textScale';
import { colors, radius, spacing } from '../../theme';

// A segmented text-size picker. Each option is an "A" drawn at its own size, so
// what you tap is what you get. The active size is highlighted, which makes the
// change obvious. Tapping sets the size directly (no confusing disabled states).
export default function TextSizeControl() {
  const { scale, setScale } = useTextScale();
  return (
    <View style={styles.wrap} accessibilityRole="radiogroup">
      {SCALE_STEPS.map((s, i) => {
        const active = s === scale;
        return (
          <Pressable
            key={s}
            onPress={() => setScale(s)}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            accessibilityLabel={'Text size ' + (i + 1) + ' of ' + SCALE_STEPS.length}
            style={[styles.btn, active && styles.btnActive]}
          >
            <Text style={[styles.a, active && styles.aActive, { fontSize: 14 + i * 6 }]}>
              A
            </Text>
          </Pressable>
        );
      })}
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
    padding: 3,
    gap: 3,
  },
  btn: {
    minWidth: 46,
    height: 46,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.sm,
  },
  btnActive: { backgroundColor: colors.accent },
  a: { color: colors.textDim, fontWeight: '800' },
  aActive: { color: colors.white },
});
