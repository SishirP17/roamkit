import * as Clipboard from 'expo-clipboard';
import { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ADMIN_EMAIL } from '../config';
import { requestTool } from '../lib/requestTool';
import { colors, font, radius, spacing } from '../theme';

// A friendly bottom sheet shown before we hand off to the mail app. It reassures
// the user that requests are welcome, lets them copy the address, and only opens
// their email client when they choose to, instead of jumping straight to the OS
// mail-app chooser.
export default function RequestModal({ visible, onClose }) {
  const insets = useSafeAreaInsets();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await Clipboard.setStringAsync(ADMIN_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {}
  };

  const openMail = async () => {
    await requestTool();
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        {/* Stop taps on the sheet itself from closing it. */}
        <Pressable
          style={[styles.sheet, { paddingBottom: insets.bottom + spacing.lg }]}
          onPress={() => {}}
        >
          <View style={styles.handle} />

          <View style={styles.iconWrap}>
            <Text style={styles.icon}>💡</Text>
          </View>

          <Text style={styles.title}>Got an idea?</Text>
          <Text style={styles.body}>
            We read every request. Tell us the tool or feature you would love and we
            may build it right into RoamKit.
          </Text>

          <Pressable
            onPress={copyEmail}
            accessibilityRole="button"
            accessibilityLabel={'Copy email address ' + ADMIN_EMAIL}
            style={({ pressed }) => [styles.emailChip, pressed && { opacity: 0.85 }]}
          >
            <Text style={styles.emailText} numberOfLines={1}>
              {ADMIN_EMAIL}
            </Text>
            <Text style={styles.copyText}>{copied ? '✓ Copied' : 'Copy'}</Text>
          </Pressable>

          <Pressable
            onPress={openMail}
            accessibilityRole="button"
            style={({ pressed }) => [styles.primaryBtn, pressed && { opacity: 0.9 }]}
          >
            <Text style={styles.primaryText}>Open email app</Text>
          </Pressable>

          <Pressable
            onPress={onClose}
            accessibilityRole="button"
            style={({ pressed }) => [styles.secondaryBtn, pressed && { opacity: 0.6 }]}
          >
            <Text style={styles.secondaryText}>Maybe later</Text>
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
  icon: { fontSize: 28 },
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
  emailChip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
    width: '100%',
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  emailText: { flex: 1, color: colors.text, fontSize: font.body, fontWeight: '600' },
  copyText: { color: colors.accent, fontSize: font.small, fontWeight: '800' },
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
