import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { canUnlockPro, isBillingLive, usePro } from '../src/lib/pro';
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
    desc: 'Tap to hear phrasebook phrases pronounced out loud in the local language. Works offline.',
  },
  {
    icon: '🧭',
    title: 'Compass',
    desc: 'A full offline compass for hiking and camping. Find your bearing anywhere.',
  },
  {
    icon: '🪙',
    title: 'Full currency catalog',
    desc: 'Search 160+ world currencies with live exchange rates and add any of them to your tools.',
  },
  {
    icon: '✨',
    title: 'Every future Pro tool',
    desc: 'New premium tools are added over time. You get them all, no extra cost.',
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
  const { isPro, unlockPro, restorePro, proPrice } = usePro();
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState(null); // { text, ok }

  const onUnlock = async () => {
    setBusy(true);
    setMsg(null);
    try {
      const ok = await unlockPro();
      if (ok) {
        // Bounce back so the user lands on the now-unlocked toolkit.
        router.back();
        return;
      }
      // On a live store, unlockPro only returns false when the purchase went
      // through but the entitlement did not activate. Never tell someone who
      // just paid that nothing happened.
      setMsg({
        text: isBillingLive
          ? 'Your payment went through but Pro has not activated yet. Tap "Restore purchase" in a moment. If it still does not unlock, contact support and we will fix it.'
          : 'Purchase not completed.',
        ok: false,
      });
    } catch (e) {
      // Backing out of the store purchase sheet isn't an error.
      if (!e?.userCancelled) {
        setMsg({ text: e?.message || 'Something went wrong. Please try again.', ok: false });
      }
    } finally {
      setBusy(false);
    }
  };

  const onRestore = async () => {
    setBusy(true);
    setMsg(null);
    try {
      const ok = await restorePro();
      setMsg(
        ok
          ? { text: 'Purchase restored ✓', ok: true }
          : { text: 'No previous purchase found on this Google account.', ok: false }
      );
    } catch (e) {
      // Store unreachable is NOT "no purchase". Say so, so a paying user on
      // hotel Wi-Fi does not think their purchase is gone.
      setMsg({
        text: 'Could not reach the store. Check your connection and try again.',
        ok: false,
      });
    } finally {
      setBusy(false);
    }
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
          <Text style={styles.ownedText}>✓ You have RoamKit Pro</Text>
        </View>
      ) : !canUnlockPro ? (
        // Pro cannot be granted here (e.g. the web app). Monetization lives in
        // the mobile stores, so point people there instead of a dead button.
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Available in the mobile app</Text>
          <Text style={styles.infoBody}>
            {Platform.OS === 'web'
              ? 'RoamKit Pro is a one-time purchase in the RoamKit app for Android and iPhone. Everything you see here still works free on the web.'
              : 'RoamKit Pro is not available in this version yet. It is coming soon.'}
          </Text>
        </View>
      ) : (
        <>
          <Pressable
            onPress={onUnlock}
            disabled={busy}
            style={({ pressed }) => [styles.cta, pressed && { opacity: 0.9 }]}
          >
            <Text style={styles.ctaText}>Unlock Pro · {proPrice}</Text>
          </Pressable>
          <Pressable onPress={onRestore} disabled={busy} style={styles.restore}>
            <Text style={styles.restoreText}>Restore purchase</Text>
          </Pressable>
          {msg && (
            <Text style={[styles.msg, !msg.ok && { color: colors.danger }]}>
              {msg.text}
            </Text>
          )}
          <Text style={styles.fine}>
            {isBillingLive
              ? 'One-time purchase through Google Play. Restores free on any device signed in to the same account.'
              : 'Billing goes live once the app is on the Play Store. For now this unlocks Pro on your device so you can try everything.'}
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
  infoCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.accent,
    padding: spacing.xl,
    marginTop: spacing.md,
    alignItems: 'center',
  },
  infoTitle: { color: colors.text, fontSize: font.h3, fontWeight: '800', marginBottom: spacing.sm },
  infoBody: { color: colors.textDim, fontSize: font.body, lineHeight: 23, textAlign: 'center' },
});

