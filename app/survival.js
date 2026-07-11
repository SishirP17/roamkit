import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SURVIVAL } from '../src/data/survival';
import { colors, font, radius, spacing } from '../src/theme';

export default function Survival() {
  const insets = useSafeAreaInsets();
  const [open, setOpen] = useState(SURVIVAL[0].id); // first section open

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{ padding: spacing.lg, paddingBottom: insets.bottom + spacing.xl }}
    >
      {/* Safety disclaimer */}
      <View style={styles.disclaimer}>
        <Text style={styles.disclaimerText}>
          ⚠️ General guidance only. In any emergency, call for professional help if
          you possibly can. This is not a substitute for proper training.
        </Text>
      </View>

      {SURVIVAL.map((section) => {
        const expanded = open === section.id;
        return (
          <View key={section.id} style={styles.section}>
            <Pressable
              onPress={() => setOpen(expanded ? null : section.id)}
              style={({ pressed }) => [styles.header, pressed && { opacity: 0.8 }]}
            >
              <Text style={styles.headerIcon}>{section.icon}</Text>
              <Text style={styles.headerTitle}>{section.title}</Text>
              <Text style={styles.chevron}>{expanded ? '▲' : '▼'}</Text>
            </Pressable>

            {expanded && (
              <View style={styles.body}>
                {section.blocks.map((block, bi) => (
                  <View key={bi} style={bi > 0 && { marginTop: spacing.lg }}>
                    <Text style={styles.sub}>{block.sub}</Text>
                    {block.steps.map((step, si) => (
                      <View key={si} style={styles.stepRow}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.step}>{step}</Text>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            )}
          </View>
        );
      })}

      <Text style={styles.footer}>Works fully offline. Keep it handy out there.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  disclaimer: {
    backgroundColor: colors.accentSoft,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.warning,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  disclaimerText: { color: colors.text, fontSize: font.small, lineHeight: 19 },
  section: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
    overflow: 'hidden',
  },
  header: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, padding: spacing.lg },
  headerIcon: { fontSize: 24 },
  headerTitle: { flex: 1, color: colors.text, fontSize: font.h3, fontWeight: '700' },
  chevron: { color: colors.textFaint, fontSize: 13 },
  body: { paddingHorizontal: spacing.lg, paddingBottom: spacing.lg },
  sub: { color: colors.accent, fontSize: font.body, fontWeight: '800', marginBottom: spacing.sm },
  stepRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.xs },
  bullet: { color: colors.textFaint, fontSize: font.body, lineHeight: 22 },
  step: { flex: 1, color: colors.textDim, fontSize: font.body, lineHeight: 22 },
  footer: { color: colors.textFaint, textAlign: 'center', fontSize: font.small, marginTop: spacing.lg },
});
