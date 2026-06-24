import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PRO_PRICE, usePro } from '../src/lib/pro';
import { colors, font, radius, spacing } from '../src/theme';

const FEATURES = [
  {
    icon: '💰',
    title: 'Trip Budget & Expenses',
    desc: 'Log spending in any currency, auto-converted to your home currency. Daily budget + trip total.',
  },
  {
    icon: '🔊',
    title: 'Hear any phrase spoken',
    desc: 'Tap to hear phrasebook phrases pronounced out loud in the local language — works offline.',
  },
  {
    icon: '🧭',
    title: 'Compass',
    desc: 'A full offline compass for hiking and camping — find your bearing anywhere.',
  },
  {
    icon: '✨',
    title: 'Every future Pro tool',
    desc: 'New premium tools are added over time — you get them all, no extra cost.',
  },
  {
    icon: '🚫',
    title: 'Forever, no subscription',
    desc: 'One payment. No ads, no tracking, no recurring fees.',
  },
];

export default function Paywall() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { isPro, unlockPro, restorePro } = usePro();
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState(null);

  const onUnlock = async () => {
    setBusy(true);
    await unlockPro();
    setBusy(false);
    // Bounce back so the user lands on the now-unlocked toolkit.
    router.back();
  };

  const onRestore = async () => {
    setBusy(true);
    const ok = await restorePro();
    setBusy(false);
    setMsg(ok ? 'Purchase restored ✓' : 'No previous purchase found.');
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{ padding: spacing.lg, paddingBottom: insets.bottom + spacing.xl }}
    >
      <View style={styles.hero}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>ROAMKIT PRO</Text>
        </View>
        <Text style={styles.title}>Unlock the power tools</Text>
        <Text style={styles.subtitle}>
          One-time purchase. Yours forever, on this account.
        </Text>
      </View>

      {FEATURES.map((f) => (
        <View key={f.title} style={styles.feature}>
          <Text style={styles.featureIcon}>{f.icon}</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.featureTitle}>{f.title}</Text>
            <Text style={styles.featureDesc}>{f.desc}</Text>
          </View>
        </View>
      ))}

      {isPro ? (
        <View style={styles.ownedCard}>
          <Text style={styles.ownedText}>✓ You have Roamkit Pro</Text>
        </View>
      ) : (
        <>
          <Pressable
            onPress={onUnlock}
            disabled={busy}
            style={({ pressed }) => [styles.cta, pressed && { opacity: 0.9 }]}
          >
            <Text style={styles.ctaText}>Unlock Pro · {PRO_PRICE}</Text>
          </Pressable>
          <Pressable onPress={onRestore} disabled={busy} style={styles.restore}>
            <Text style={styles.restoreText}>Restore purchase</Text>
          </Pressable>
          {msg && <Text style={styles.msg}>{msg}</Text>}
          <Text style={styles.fine}>
            Billing goes live once the app is on the Play Store. For now this
            unlocks Pro on your device so you can try everything.
          </Text>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  hero: { alignItems: 'center', paddingVertical: spacing.lg },
  badge: {
    backgroundColor: colors.warning,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 5,
    marginBottom: spacing.md,
  },
  badgeText: { color: '#0B1220', fontWeight: '900', fontSize: font.tiny, letterSpacing: 1.5 },
  title: { color: colors.text, fontSize: font.h1, fontWeight: '800', textAlign: 'center' },
  subtitle: { color: colors.textDim, fontSize: font.body, marginTop: spacing.sm, textAlign: 'center' },
  feature: {
    flexDirection: 'row',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  featureIcon: { fontSize: 26 },
  featureTitle: { color: colors.text, fontSize: font.h3, fontWeight: '700' },
  featureDesc: { color: colors.textDim, fontSize: font.small, marginTop: 2, lineHeight: 19 },
  cta: {
    backgroundColor: colors.accent,
    borderRadius: radius.pill,
    paddingVertical: spacing.lg,
    alignItems: 'center',
    marginTop: spacing.md,
  },
  ctaText: { color: colors.white, fontWeight: '800', fontSize: font.h3 },
  restore: { alignItems: 'center', paddingVertical: spacing.md },
  restoreText: { color: colors.accent, fontWeight: '700', fontSize: font.body },
  msg: { color: colors.success, textAlign: 'center', fontSize: font.small },
  fine: {
    color: colors.textFaint,
    fontSize: font.tiny,
    textAlign: 'center',
    marginTop: spacing.sm,
    lineHeight: 16,
  },
  ownedCard: {
    backgroundColor: colors.accentSoft,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.success,
    padding: spacing.xl,
    alignItems: 'center',
    marginTop: spacing.md,
  },
  ownedText: { color: colors.success, fontSize: font.h3, fontWeight: '800' },
});
