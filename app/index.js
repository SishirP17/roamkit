import { useRouter } from 'expo-router';
import {
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AFFILIATE } from '../src/data/affiliate';
import { TOOLS } from '../src/data/tools';
import { usePro } from '../src/lib/pro';
import { requestTool } from '../src/lib/requestTool';
import { colors, font, radius, spacing } from '../src/theme';

export default function Home() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const { isPro } = usePro();

  // Responsive grid: 2 columns on phones, more on wide/web screens.
  const maxContentWidth = 640;
  const contentWidth = Math.min(width, maxContentWidth);
  const columns = contentWidth < 480 ? 2 : 3;
  const gutter = spacing.md;
  const sidePad = spacing.lg;
  const tileWidth =
    (contentWidth - sidePad * 2 - gutter * (columns - 1)) / columns;

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + spacing.lg, paddingBottom: insets.bottom + spacing.xxl },
      ]}
    >
      <View style={[styles.inner, { maxWidth: maxContentWidth }]}>
        <View style={styles.topBar}>
          <Text style={styles.eyebrow}>ROAMKIT</Text>
          <Pressable
            onPress={() => router.push('/settings')}
            hitSlop={12}
            style={({ pressed }) => [styles.gear, pressed && { opacity: 0.7 }]}
          >
            <Text style={styles.gearIcon}>⚙︎</Text>
          </Pressable>
        </View>
        <Text style={styles.title}>Travel tools{'\n'}that work offline.</Text>
        <Text style={styles.subtitle}>
          Everything you need on the road — no internet required, anywhere in the world.
        </Text>

        <View style={[styles.grid, { marginTop: spacing.xl }]}>
          {TOOLS.map((tool) => {
            const isActive = tool.status === 'active';
            const locked = tool.pro && !isPro;
            const onPress = () => {
              if (!isActive) return;
              // Locked Pro tools route to the paywall; once unlocked, open normally.
              if (locked) router.push({ pathname: '/pro', params: { from: tool.id } });
              else router.push(tool.route);
            };
            return (
              <Pressable
                key={tool.id}
                disabled={!isActive}
                onPress={onPress}
                style={({ pressed }) => [
                  styles.tile,
                  { width: tileWidth },
                  !isActive && styles.tileDisabled,
                  pressed && isActive && styles.tilePressed,
                ]}
              >
                <View
                  style={[styles.iconWrap, { backgroundColor: tool.color + '22' }]}
                >
                  <Text style={styles.icon}>{tool.icon}</Text>
                </View>
                <Text style={styles.tileTitle} numberOfLines={1}>
                  {tool.title}
                </Text>
                <Text style={styles.tileSub} numberOfLines={2}>
                  {tool.subtitle}
                </Text>
                {!isActive && (
                  <View style={styles.soonBadge}>
                    <Text style={styles.soonText}>SOON</Text>
                  </View>
                )}
                {/* Fully-locked Pro tool: shows lock, routes to paywall. */}
                {locked && (
                  <View style={styles.proBadge}>
                    <Text style={styles.proText}>🔒 PRO</Text>
                  </View>
                )}
                {/* Free tool with a Pro extra inside (e.g. phrasebook audio). */}
                {!locked && tool.proHint && !isPro && (
                  <View style={[styles.proBadge, styles.proHintBadge]}>
                    <Text style={styles.proText}>PRO</Text>
                  </View>
                )}
                {isActive && !locked && !(tool.proHint && !isPro) && (
                  <View style={[styles.dot, { backgroundColor: tool.color }]} />
                )}
              </Pressable>
            );
          })}
        </View>

        {AFFILIATE.enabled && (
          <View style={styles.affCard}>
            <Text style={styles.affHeading}>Before you go</Text>
            {AFFILIATE.items.map((it) => (
              <Pressable
                key={it.id}
                onPress={() => Linking.openURL(it.url).catch(() => {})}
                style={({ pressed }) => [styles.affRow, pressed && { opacity: 0.8 }]}
              >
                <Text style={styles.affIcon}>{it.icon}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.affTitle}>{it.title}</Text>
                  <Text style={styles.affSub}>{it.sub}</Text>
                </View>
                <Text style={styles.affArrow}>›</Text>
              </Pressable>
            ))}
          </View>
        )}

        <View style={styles.requestCard}>
          <Text style={styles.requestTitle}>Want a tool that isn't here?</Text>
          <Text style={styles.requestSub}>
            The toolkit keeps growing. Request a tool and we may add it.
          </Text>
          <Pressable
            onPress={requestTool}
            style={({ pressed }) => [styles.requestBtn, pressed && { opacity: 0.85 }]}
          >
            <Text style={styles.requestBtnText}>Request a tool</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { alignItems: 'center', paddingHorizontal: spacing.lg },
  inner: { width: '100%' },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  eyebrow: {
    color: colors.accent,
    fontSize: font.tiny,
    fontWeight: '800',
    letterSpacing: 2,
  },
  gear: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gearIcon: { color: colors.textDim, fontSize: 18 },
  title: {
    color: colors.text,
    fontSize: font.h1,
    fontWeight: '800',
    lineHeight: font.h1 + 6,
  },
  subtitle: {
    color: colors.textDim,
    fontSize: font.body,
    marginTop: spacing.sm,
    lineHeight: 22,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  tile: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    minHeight: 138,
    justifyContent: 'flex-start',
  },
  tileDisabled: { opacity: 0.55 },
  tilePressed: { transform: [{ scale: 0.97 }], borderColor: colors.accent },
  iconWrap: {
    width: 46,
    height: 46,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  icon: { fontSize: 24 },
  tileTitle: {
    color: colors.text,
    fontSize: font.h3,
    fontWeight: '700',
  },
  tileSub: {
    color: colors.textFaint,
    fontSize: font.small,
    marginTop: 2,
  },
  soonBadge: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
  },
  soonText: {
    color: colors.textDim,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1,
  },
  proBadge: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    backgroundColor: colors.warning,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
  },
  proBadgeOwned: { backgroundColor: colors.success },
  proHintBadge: { backgroundColor: colors.accent },
  proText: {
    color: '#0B1220',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  dot: {
    position: 'absolute',
    top: spacing.lg,
    right: spacing.lg,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  affCard: {
    marginTop: spacing.xl,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
  },
  affHeading: { color: colors.textDim, fontSize: font.small, fontWeight: '700', marginBottom: spacing.sm },
  affRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.md },
  affIcon: { fontSize: 24 },
  affTitle: { color: colors.text, fontSize: font.body, fontWeight: '700' },
  affSub: { color: colors.textFaint, fontSize: font.small },
  affArrow: { color: colors.textFaint, fontSize: 24, fontWeight: '700' },
  requestCard: {
    marginTop: spacing.xl,
    backgroundColor: colors.accentSoft,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.xl,
  },
  requestTitle: { color: colors.text, fontSize: font.h3, fontWeight: '700' },
  requestSub: {
    color: colors.textDim,
    fontSize: font.small,
    marginTop: spacing.xs,
    lineHeight: 19,
  },
  requestBtn: {
    marginTop: spacing.lg,
    backgroundColor: colors.accent,
    borderRadius: radius.pill,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  requestBtnText: { color: colors.white, fontWeight: '700', fontSize: font.body },
});
