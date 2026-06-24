import * as Clipboard from 'expo-clipboard';
import * as Speech from 'expo-speech';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LANGUAGES, PHRASES } from '../src/data/phrases';
import { usePro } from '../src/lib/pro';
import { colors, font, radius, spacing } from '../src/theme';

// Maps our language codes to spoken-voice locales (used by expo-speech, offline).
const SPEAK_LOCALE = {
  es: 'es-ES',
  fr: 'fr-FR',
  de: 'de-DE',
  it: 'it-IT',
  pt: 'pt-PT',
  ja: 'ja-JP',
};

export default function Phrasebook() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { isPro } = usePro();
  const [lang, setLang] = useState('es');
  const [copied, setCopied] = useState(null);

  const copy = async (text, key) => {
    try {
      await Clipboard.setStringAsync(text);
      setCopied(key);
      setTimeout(() => setCopied((c) => (c === key ? null : c)), 1200);
    } catch (e) {}
  };

  const speak = (text) => {
    if (!isPro) {
      // Audio is the Pro upgrade — send them to the paywall.
      router.push('/pro');
      return;
    }
    try {
      Speech.stop();
      Speech.speak(text, { language: SPEAK_LOCALE[lang] || 'en-US', rate: 0.9 });
    } catch (e) {}
  };

  return (
    <View style={[styles.screen, { paddingBottom: insets.bottom }]}>
      {/* Language selector */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.langBar}
        contentContainerStyle={styles.langRow}
      >
        {LANGUAGES.map((l) => {
          const active = l.code === lang;
          return (
            <Pressable
              key={l.code}
              onPress={() => setLang(l.code)}
              style={[styles.langChip, active && styles.langChipActive]}
            >
              <Text style={styles.langFlag}>{l.flag}</Text>
              <Text style={[styles.langName, active && styles.langNameActive]}>
                {l.name}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: spacing.lg, paddingTop: spacing.sm }}>
        {PHRASES.map((group) => (
          <View key={group.category} style={{ marginBottom: spacing.lg }}>
            <Text style={styles.category}>{group.category}</Text>
            {group.items.map((item, i) => {
              const tr = item[lang];
              const key = `${group.category}-${i}`;
              return (
                <View key={key} style={styles.card}>
                  <Pressable
                    onPress={() => copy(tr.t, key)}
                    style={({ pressed }) => [styles.cardText, pressed && { opacity: 0.7 }]}
                  >
                    <Text style={styles.en}>{item.en}</Text>
                    <Text style={styles.translation}>{tr.t}</Text>
                    {tr.p ? <Text style={styles.pron}>{tr.p}</Text> : null}
                    <Text style={styles.copyHint}>
                      {copied === key ? '✓ Copied' : 'Tap to copy'}
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => speak(tr.t)}
                    style={({ pressed }) => [styles.speakBtn, pressed && { opacity: 0.8 }]}
                    hitSlop={8}
                  >
                    <Text style={styles.speakIcon}>🔊</Text>
                    {!isPro && <Text style={styles.speakLock}>🔒</Text>}
                  </Pressable>
                </View>
              );
            })}
          </View>
        ))}
        <Text style={styles.footer}>
          Tap a phrase to copy it. Tap 🔊 to hear it out loud.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  langBar: { flexGrow: 0, flexShrink: 0, borderBottomWidth: 1, borderBottomColor: colors.border },
  langRow: { gap: spacing.sm, padding: spacing.md, alignItems: 'center' },
  langChip: {
    flexShrink: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  langChipActive: { backgroundColor: colors.accentSoft, borderColor: colors.accent },
  langFlag: { fontSize: 18 },
  langName: { color: colors.textDim, fontWeight: '700', fontSize: font.small },
  langNameActive: { color: colors.accent },
  category: {
    color: colors.accent,
    fontSize: font.tiny,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
  },
  card: {
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
  cardText: { flex: 1 },
  speakBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  speakIcon: { fontSize: 24 },
  speakLock: { position: 'absolute', bottom: 4, right: 6, fontSize: 11 },
  en: { color: colors.textDim, fontSize: font.small },
  translation: { color: colors.text, fontSize: font.h3, fontWeight: '700', marginTop: 2 },
  pron: { color: colors.textFaint, fontSize: font.small, fontStyle: 'italic', marginTop: 2 },
  copyHint: { color: colors.textFaint, fontSize: font.tiny, marginTop: spacing.sm },
  footer: { color: colors.textFaint, textAlign: 'center', fontSize: font.small, marginTop: spacing.sm },
});
