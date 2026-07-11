import { useNavigation, useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../theme';

// App-wide header back control. Rendered as the header's left item on every screen
// (home has no header, so it never shows there). It uses the real navigation
// history so it always returns to the previous section, and falls back to home if
// there is nothing to go back to (e.g. a page opened directly by URL on the web).
// Styled to match the rounded settings button on the home screen so it feels
// native to the app on both Android and the web.
export default function BackButton() {
  const router = useRouter();
  const navigation = useNavigation();

  const onPress = () => {
    if (navigation.canGoBack && navigation.canGoBack()) router.back();
    else router.replace('/');
  };

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="Go back"
      hitSlop={10}
      style={({ pressed }) => [styles.btn, pressed && { opacity: 0.6 }]}
    >
      <Text style={styles.chevron}>‹</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
    marginRight: 6,
  },
  chevron: {
    color: colors.text,
    fontSize: 26,
    fontWeight: '800',
    lineHeight: 30,
    marginTop: -3,
    marginLeft: -2,
  },
});
