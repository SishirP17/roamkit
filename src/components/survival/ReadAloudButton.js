import { useFocusEffect } from 'expo-router';
import * as Speech from 'expo-speech';
import { useCallback, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text } from 'react-native';
import { colors, font, radius, spacing } from '../../theme';

// Reads an article out loud using the device's built-in voice (expo-speech, fully
// offline). This is a core accessibility feature for anyone who struggles to read
// on a small screen, so it is free for everyone. Tap once to play, again to stop.
export default function ReadAloudButton({ text }) {
  const [speaking, setSpeaking] = useState(false);

  // Never keep talking after the user leaves the screen. Focus (not unmount)
  // is the right signal: pushing a "See also" article keeps this screen
  // mounted underneath, so an unmount cleanup would keep narrating over it.
  useFocusEffect(
    useCallback(
      () => () => {
        try {
          Speech.stop();
        } catch (e) {}
        setSpeaking(false);
      },
      []
    )
  );

  const stop = () => {
    try {
      Speech.stop();
    } catch (e) {}
    setSpeaking(false);
  };

  const play = () => {
    if (!text) return;
    try {
      Speech.stop();
      setSpeaking(true);
      Speech.speak(text, {
        language: 'en-US',
        rate: 0.9,
        onDone: () => setSpeaking(false),
        onStopped: () => setSpeaking(false),
        // speak() can fail async (e.g. no voice pack installed). Recover the UI.
        onError: () => {
          setSpeaking(false);
          Alert.alert(
            'Voice not available',
            "Your device does not have a voice installed. You can add one in your system's text-to-speech settings."
          );
        },
      });
    } catch (e) {
      setSpeaking(false);
    }
  };

  return (
    <Pressable
      onPress={speaking ? stop : play}
      accessibilityRole="button"
      accessibilityLabel={speaking ? 'Stop reading aloud' : 'Read this article aloud'}
      style={({ pressed }) => [
        styles.btn,
        speaking && styles.btnActive,
        pressed && { opacity: 0.85 },
      ]}
    >
      <Text style={styles.icon}>{speaking ? '⏹' : '🔊'}</Text>
      <Text style={[styles.label, speaking && styles.labelActive]}>
        {speaking ? 'Stop' : 'Listen'}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    minHeight: 52,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    backgroundColor: colors.accentSoft,
    borderWidth: 1,
    borderColor: colors.accent,
  },
  btnActive: { backgroundColor: colors.accent },
  icon: { fontSize: 20 },
  label: { color: colors.accent, fontSize: font.body, fontWeight: '800' },
  labelActive: { color: colors.white },
});
