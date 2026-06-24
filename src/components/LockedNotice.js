import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, font, radius, spacing } from '../theme';

// Shown when a Pro-only screen is opened without an unlock (e.g. deep link).
export default function LockedNotice({ name = 'This is a Pro tool' }) {
  const router = useRouter();
  return (
    <View style={styles.wrap}>
      <Text style={styles.icon}>🔒</Text>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.sub}>Unlock Roamkit Pro to use it.</Text>
      <Pressable onPress={() => router.push('/pro')} style={styles.btn}>
        <Text style={styles.btnText}>Unlock Roamkit Pro</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: colors.bg, alignItems: 'center', justifyContent: 'center', padding: spacing.xl },
  icon: { fontSize: 48, marginBottom: spacing.md },
  title: { color: colors.text, fontSize: font.h2, fontWeight: '800', textAlign: 'center' },
  sub: { color: colors.textDim, fontSize: font.body, marginTop: spacing.sm, marginBottom: spacing.lg },
  btn: { backgroundColor: colors.accent, borderRadius: radius.pill, paddingVertical: spacing.md, paddingHorizontal: spacing.xl },
  btnText: { color: colors.white, fontWeight: '800', fontSize: font.body },
});
