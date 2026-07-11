import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ArticleRow from '../../../src/components/survival/ArticleRow';
import { CATEGORY_BY_ID, articlesInCategory } from '../../../src/data/survival';
import { colors, font, spacing, tileColors } from '../../../src/theme';

export default function SurvivalCategory() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { category } = useLocalSearchParams();
  const cat = CATEGORY_BY_ID[category];
  const articles = articlesInCategory(category);
  const color = (cat && tileColors[cat.color]) || colors.accent;

  return (
    <>
      <Stack.Screen options={{ title: cat ? cat.title : 'Survival Guide' }} />
      <ScrollView
        style={styles.screen}
        contentContainerStyle={{
          padding: spacing.lg,
          paddingBottom: insets.bottom + spacing.xl,
        }}
      >
        {cat ? (
          <View style={styles.header}>
            <View style={[styles.iconWrap, { backgroundColor: color + '22' }]}>
              <Text style={styles.icon}>{cat.icon}</Text>
            </View>
            <Text style={styles.blurb}>{cat.blurb}</Text>
          </View>
        ) : null}

        {articles.map((a) => (
          <ArticleRow
            key={a.id}
            title={a.title}
            summary={a.summary}
            emergency={a.emergency}
            onPress={() => router.push('/survival/article/' + a.id)}
          />
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  header: { alignItems: 'center', marginBottom: spacing.lg },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  icon: { fontSize: 34 },
  blurb: {
    color: colors.textDim,
    fontSize: font.body,
    textAlign: 'center',
    lineHeight: 23,
  },
});
