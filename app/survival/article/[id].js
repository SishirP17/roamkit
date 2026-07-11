import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ArticleRow from '../../../src/components/survival/ArticleRow';
import Callout from '../../../src/components/survival/Callout';
import QuickStepsCard from '../../../src/components/survival/QuickStepsCard';
import ReadAloudButton from '../../../src/components/survival/ReadAloudButton';
import TextSizeControl from '../../../src/components/survival/TextSizeControl';
import { articleToSpeech, getArticle } from '../../../src/data/survival';
import { useTextScale } from '../../../src/lib/textScale';
import { colors, font, radius, spacing } from '../../../src/theme';

export default function SurvivalArticle() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { scale } = useTextScale();
  const article = getArticle(id);

  if (!article) {
    return (
      <>
        <Stack.Screen options={{ title: 'Not found' }} />
        <View style={[styles.screen, styles.center]}>
          <Text style={styles.missing}>That guide could not be found.</Text>
        </View>
      </>
    );
  }

  const related = (article.related || [])
    .map((rid) => getArticle(rid))
    .filter(Boolean);

  return (
    <>
      <Stack.Screen options={{ title: article.title }} />
      <ScrollView
        style={styles.screen}
        contentContainerStyle={{
          padding: spacing.lg,
          paddingBottom: insets.bottom + spacing.xl,
        }}
      >
        {article.emergency ? (
          <View style={styles.emergencyTag}>
            <Text style={styles.emergencyText}>EMERGENCY</Text>
          </View>
        ) : null}

        <Text style={[styles.title, { fontSize: font.h1 * scale, lineHeight: font.h1 * scale * 1.15 }]}>
          {article.title}
        </Text>
        <Text style={[styles.summary, { fontSize: font.body * scale, lineHeight: font.body * scale * 1.4 }]}>
          {article.summary}
        </Text>

        <View style={styles.controls}>
          <ReadAloudButton text={articleToSpeech(article)} />
          <TextSizeControl />
        </View>

        <QuickStepsCard steps={article.quickSteps} scale={scale} />

        {article.sections.map((sec, si) => (
          <View key={si} style={styles.section}>
            {sec.heading ? (
              <Text
                accessibilityRole="header"
                style={[styles.heading, { fontSize: font.h2 * scale, lineHeight: font.h2 * scale * 1.25 }]}
              >
                {sec.heading}
              </Text>
            ) : null}

            {(sec.paragraphs || []).map((p, pi) => (
              <Text
                key={pi}
                style={[styles.paragraph, { fontSize: font.body * scale, lineHeight: font.body * scale * 1.45 }]}
              >
                {p}
              </Text>
            ))}

            {(sec.steps || []).map((s, sti) => (
              <View key={sti} style={styles.stepRow}>
                <View style={styles.num}>
                  <Text style={[styles.numText, { fontSize: font.small * scale }]}>{sti + 1}</Text>
                </View>
                <Text style={[styles.stepText, { fontSize: font.body * scale, lineHeight: font.body * scale * 1.4 }]}>
                  {s}
                </Text>
              </View>
            ))}

            {sec.warning ? <Callout text={sec.warning} scale={scale} /> : null}
          </View>
        ))}

        {related.length ? (
          <View style={styles.relatedWrap}>
            <Text style={styles.relatedLabel}>See also</Text>
            {related.map((r) => (
              <ArticleRow
                key={r.id}
                title={r.title}
                summary={r.summary}
                emergency={r.emergency}
                onPress={() => router.push('/survival/article/' + r.id)}
              />
            ))}
          </View>
        ) : null}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  center: { alignItems: 'center', justifyContent: 'center' },
  missing: { color: colors.textDim, fontSize: font.body, padding: spacing.xl },
  emergencyTag: {
    alignSelf: 'flex-start',
    backgroundColor: colors.danger,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
    marginBottom: spacing.sm,
  },
  emergencyText: { color: colors.white, fontSize: font.tiny, fontWeight: '900', letterSpacing: 1 },
  title: { color: colors.text, fontWeight: '800' },
  summary: { color: colors.textDim, marginTop: spacing.sm },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
    flexWrap: 'wrap',
  },
  section: { marginBottom: spacing.xl },
  heading: { color: colors.text, fontWeight: '800', marginBottom: spacing.sm },
  paragraph: { color: colors.text, marginBottom: spacing.md },
  stepRow: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.sm, alignItems: 'flex-start' },
  num: {
    minWidth: 26,
    height: 26,
    borderRadius: 13,
    paddingHorizontal: 6,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  numText: { color: colors.accent, fontWeight: '900' },
  stepText: { flex: 1, color: colors.text },
  relatedWrap: { marginTop: spacing.sm },
  relatedLabel: {
    color: colors.textFaint,
    fontSize: font.tiny,
    fontWeight: '800',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: spacing.md,
  },
});
