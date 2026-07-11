import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ArticleRow from '../../src/components/survival/ArticleRow';
import CategoryTile from '../../src/components/survival/CategoryTile';
import EmergencyRow from '../../src/components/survival/EmergencyRow';
import SearchBox from '../../src/components/survival/SearchBox';
import {
  CATEGORIES,
  EMERGENCY_ARTICLES,
  searchArticles,
} from '../../src/data/survival';
import { colors, font, radius, spacing } from '../../src/theme';

export default function SurvivalHome() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const [query, setQuery] = useState('');

  const maxContentWidth = 640;
  const contentWidth = Math.min(width, maxContentWidth);
  const columns = contentWidth < 480 ? 2 : 3;
  const sidePad = spacing.lg;
  const gutter = spacing.md;
  const tileWidth =
    (contentWidth - sidePad * 2 - gutter * (columns - 1)) / columns;

  const results = useMemo(() => searchArticles(query), [query]);
  const searching = query.trim().length > 0;

  const openArticle = (id) => router.push('/survival/article/' + id);
  const openCategory = (id) => router.push('/survival/category/' + id);

  return (
    <ScrollView
      style={styles.screen}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{
        padding: spacing.lg,
        paddingBottom: insets.bottom + spacing.xl,
      }}
    >
      <View style={styles.disclaimer}>
        <Text style={styles.disclaimerText}>
          ⚠️ General guidance only. In any emergency, call for professional help
          if you possibly can. This is not a substitute for proper training.
        </Text>
      </View>

      <SearchBox value={query} onChangeText={setQuery} onClear={() => setQuery('')} />

      {searching ? (
        <View style={{ marginTop: spacing.lg }}>
          {results.length === 0 ? (
            <Text style={styles.noResults}>
              No guides match that. Try a simple word like "water", "burn" or
              "cold".
            </Text>
          ) : (
            results.map((a) => (
              <ArticleRow
                key={a.id}
                title={a.title}
                summary={a.summary}
                onPress={() => openArticle(a.id)}
              />
            ))
          )}
        </View>
      ) : (
        <>
          <View style={{ marginTop: spacing.lg }}>
            <EmergencyRow
              items={EMERGENCY_ARTICLES}
              onPick={(a) => openArticle(a.id)}
            />
          </View>

          <Text style={styles.sectionLabel}>Browse topics</Text>
          <View style={styles.grid}>
            {CATEGORIES.map((c) => (
              <CategoryTile
                key={c.id}
                category={c}
                width={tileWidth}
                onPress={() => openCategory(c.id)}
              />
            ))}
          </View>

          <Text style={styles.footer}>
            Works fully offline. Tap any topic to read or listen.
          </Text>
        </>
      )}
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
  sectionLabel: {
    color: colors.textFaint,
    fontSize: font.tiny,
    fontWeight: '800',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  noResults: { color: colors.textDim, fontSize: font.body, lineHeight: 24 },
  footer: {
    color: colors.textFaint,
    textAlign: 'center',
    fontSize: font.small,
    marginTop: spacing.xl,
  },
});
