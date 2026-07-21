import { Stack, useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, font, radius, spacing } from '../src/theme';

// Branded catch-all for unknown URLs (stale deep links, web typos). Without
// this, Expo Router shows its default black "Unmatched Route" developer screen.
export default function NotFound() {
  const router = useRouter();

  return (
    <>
      <Stack.Screen options={{ title: 'Not found' }} />
      <View style={styles.screen}>
        <Text style={styles.icon}>🧭</Text>
        <Text style={styles.title}>Page not found</Text>
        <Text style={styles.subtitle}>
          That page does not exist or has moved. The toolkit is still right
          where you left it.
        </Text>
        <Pressable
          onPress={() => router.replace('/')}
          style={({ pressed }) => [styles.btn, pressed && { opacity: 0.9 }]}
        >
          <Text style={styles.btnText}>Go to the toolkit</Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  icon: { fontSize: 56, marginBottom: spacing.lg },
  title: { color: colors.text, fontSize: font.h1, fontWeight: '800', textAlign: 'center' },
  subtitle: {
    color: colors.textDim,
    fontSize: font.body,
    textAlign: 'center',
    lineHeight: 23,
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
    maxWidth: 320,
  },
  btn: {
    backgroundColor: colors.accent,
    borderRadius: radius.pill,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
  },
  btnText: { color: colors.white, fontWeight: '800', fontSize: font.h3 },
});
