import Constants from 'expo-constants';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import RequestModal from '../src/components/RequestModal';
import { APP_NAME, APP_VERSION, PRIVACY_URL, TIP_URL } from '../src/config';
import { useExternalLink } from '../src/lib/externalLink';

// Read the real version from app config so it never drifts out of sync.
const VERSION = Constants.expoConfig?.version || APP_VERSION;
import { usePro } from '../src/lib/pro';
import { colors, font, radius, spacing } from '../src/theme';

export default function Settings() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { isPro } = usePro();
  const { confirmOpen } = useExternalLink();
  const [requestOpen, setRequestOpen] = useState(false);

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{ padding: spacing.lg, paddingBottom: insets.bottom + spacing.xl }}
    >
      <View style={styles.hero}>
        <Image source={require('../assets/icon.png')} style={styles.logo} />
        <Text style={styles.appName}>{APP_NAME}</Text>
        <Text style={styles.tagline}>Travel tools that work offline.</Text>
      </View>

      <Row
        icon={isPro ? '✅' : '⭐'}
        title={isPro ? 'RoamKit Pro' : 'Get RoamKit Pro'}
        sub={isPro ? "You're a Pro member" : 'Unlock the premium tools'}
        onPress={() => router.push('/pro')}
      />

      <Text style={styles.section}>Currency</Text>
      <Row
        icon="🪙"
        title="Add a currency"
        sub="Search 160+ world currencies with live rates"
        badge={!isPro}
        onPress={() => router.push('/add-currency')}
      />

      <Text style={styles.section}>Support</Text>
      <Row
        icon="☕"
        title="Leave a tip"
        sub="Support development, totally optional"
        onPress={() =>
          confirmOpen(TIP_URL, {
            title: 'Support RoamKit',
            message: 'This opens our tip page in your browser. Thank you for considering it.',
          })
        }
      />
      <Row
        icon="✉️"
        title="Request a tool"
        sub="Tell us what to build next"
        onPress={() => setRequestOpen(true)}
      />

      <Text style={styles.section}>About</Text>
      <Row
        icon="🔒"
        title="Privacy policy"
        sub="How your data is handled (spoiler: it stays on your device)"
        onPress={() =>
          confirmOpen(PRIVACY_URL, {
            title: 'Privacy policy',
            message: 'This opens our privacy policy in your browser.',
          })
        }
      />
      <Row icon="📦" title="Version" sub={VERSION} />

      <Text style={styles.footer}>
        RoamKit works fully offline. The only time it uses the internet is to
        refresh currency exchange rates. Even then, it keeps the last rates
        saved on your device.
      </Text>

      <RequestModal visible={requestOpen} onClose={() => setRequestOpen(false)} />
    </ScrollView>
  );
}

function Row({ icon, title, sub, badge, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={({ pressed }) => [styles.row, pressed && onPress && { borderColor: colors.accent }]}
    >
      <Text style={styles.rowIcon}>{icon}</Text>
      <View style={{ flex: 1 }}>
        <View style={styles.rowTitleWrap}>
          <Text style={styles.rowTitle}>{title}</Text>
          {badge && (
            <View style={styles.proBadge}>
              <Text style={styles.proText}>🔒 PRO</Text>
            </View>
          )}
        </View>
        <Text style={styles.rowSub}>{sub}</Text>
      </View>
      {onPress && <Text style={styles.chevron}>›</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  hero: { alignItems: 'center', paddingVertical: spacing.xl },
  logo: { width: 84, height: 84, borderRadius: 20, marginBottom: spacing.sm },
  appName: { color: colors.text, fontSize: font.h1, fontWeight: '800', marginTop: spacing.sm },
  tagline: { color: colors.textDim, fontSize: font.body, marginTop: spacing.xs },
  section: {
    color: colors.textFaint,
    fontSize: font.tiny,
    fontWeight: '800',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    marginBottom: spacing.sm,
  },
  rowIcon: { fontSize: 22 },
  rowTitleWrap: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  rowTitle: { color: colors.text, fontSize: font.body, fontWeight: '700' },
  proBadge: {
    backgroundColor: colors.warning,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
  },
  proText: {
    color: '#0B1220',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  rowSub: { color: colors.textFaint, fontSize: font.small, marginTop: 2 },
  chevron: { color: colors.textFaint, fontSize: 24, fontWeight: '700' },
  footer: { color: colors.textFaint, fontSize: font.small, lineHeight: 19, marginTop: spacing.lg },
});
