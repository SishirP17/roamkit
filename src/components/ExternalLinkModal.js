import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, font, radius, spacing } from '../theme';

// Pulls a friendly host name out of a URL for display (e.g. "buymeacoffee.com"),
// without depending on the URL global being present on every runtime.
function hostOf(url) {
  if (!url) return '';
  const m = String(url).match(/^[a-z]+:\/\/([^/?#]+)/i);
  return m ? m[1].replace(/^www\./, '') : String(url);
}

// A gentle "you're about to leave the app" sheet, shown before we open any
// external link in the browser. Same visual language as the request sheet so the
// app feels consistent and considered.
export default function ExternalLinkModal({ visible, url, title, message, onCancel, onProceed }) {
  const insets = useSafeAreaInsets();
  const host = hostOf(url);

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onCancel}>
      <Pressable style={styles.backdrop} onPress={onCancel}>
        <Pressable
          style={[styles.sheet, { paddingBottom: insets.bottom + spacing.lg }]}
          onPress={() => {}}
        >
          <View style={styles.handle} />

          <View style={styles.iconWrap}>
            <Text style={styles.icon}>🔗</Text>
          </View>

          <Text style={styles.title}>{title || 'Leaving RoamKit'}</Text>
          <Text style={styles.body}>
            {message || 'This opens in your browser, outside the app.'}
          </Text>

          {host ? (
            <View style={styles.hostChip}>
              <Text style={styles.hostLabel}>Opens</Text>
              <Text style={styles.hostText} numberOfLines={1}>
                {host}
              </Text>
              <Text style={styles.hostArrow}>↗</Text>
            </View>
          ) : null}

          <Pressable
            onPress={onProceed}
            accessibilityRole="button"
            style={({ pressed }) => [styles.primaryBtn, pressed && { opacity: 0.9 }]}
          >
            <Text style={styles.primaryText}>Continue</Text>
          </Pressable>

          <Pressable
            onPress={onCancel}
            accessibilityRole="button"
            style={({ pressed }) => [styles.secondaryBtn, pressed && { opacity: 0.6 }]}
          >
            <Text style={styles.secondaryText}>Stay in the app</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(5, 9, 18, 0.7)',
  },
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    alignItems: 'center',
  },
  handle: {
    width: 40,
    height: 5,
    borderRadius: radius.pill,
    backgroundColor: colors.border,
    marginBottom: spacing.lg,
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  icon: { fontSize: 26 },
  title: {
    color: colors.text,
    fontSize: font.h2,
    fontWeight: '800',
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  body: {
    color: colors.textDim,
    fontSize: font.body,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  hostChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    width: '100%',
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  hostLabel: {
    color: colors.textFaint,
    fontSize: font.tiny,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  hostText: { flex: 1, color: colors.text, fontSize: font.body, fontWeight: '600' },
  hostArrow: { color: colors.accent, fontSize: font.body, fontWeight: '800' },
  primaryBtn: {
    width: '100%',
    backgroundColor: colors.accent,
    borderRadius: radius.pill,
    paddingVertical: spacing.md,
    alignItems: 'center',
    minHeight: 52,
    justifyContent: 'center',
  },
  primaryText: { color: colors.white, fontSize: font.body, fontWeight: '800' },
  secondaryBtn: {
    width: '100%',
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginTop: spacing.xs,
    minHeight: 48,
    justifyContent: 'center',
  },
  secondaryText: { color: colors.textFaint, fontSize: font.body, fontWeight: '600' },
});
