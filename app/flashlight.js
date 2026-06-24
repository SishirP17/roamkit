import * as Brightness from 'expo-brightness';
import { useEffect, useRef, useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, font, radius, spacing } from '../src/theme';

// Builds an SOS morse timeline (... --- ...) as [{on, ms}, ...].
// One time unit = 220ms.
function buildSos() {
  const U = 220;
  const seq = [];
  const dot = () => seq.push({ on: true, ms: U }, { on: false, ms: U });
  const dash = () => seq.push({ on: true, ms: U * 3 }, { on: false, ms: U });
  const letterGap = () => seq.push({ on: false, ms: U * 2 }); // +1U already added = 3U
  const wordGap = () => seq.push({ on: false, ms: U * 4 });
  dot(); dot(); dot(); letterGap();
  dash(); dash(); dash(); letterGap();
  dot(); dot(); dot(); wordGap();
  return seq;
}
const SOS = buildSos();

export default function Flashlight() {
  const insets = useSafeAreaInsets();
  const [mode, setMode] = useState('off'); // off | on | sos | strobe
  const [flashOn, setFlashOn] = useState(false);
  const prevBrightness = useRef(null);
  const timer = useRef(null);

  const lit = mode === 'on' || ((mode === 'sos' || mode === 'strobe') && flashOn);

  // Maximize device brightness while the light is active (mobile only).
  useEffect(() => {
    if (Platform.OS === 'web') return;
    (async () => {
      try {
        if (mode !== 'off') {
          if (prevBrightness.current == null) {
            prevBrightness.current = await Brightness.getBrightnessAsync();
          }
          await Brightness.setBrightnessAsync(1);
        } else if (prevBrightness.current != null) {
          await Brightness.setBrightnessAsync(prevBrightness.current);
          prevBrightness.current = null;
        }
      } catch (e) {}
    })();
  }, [mode]);

  // Restore brightness on unmount.
  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
      if (Platform.OS !== 'web' && prevBrightness.current != null) {
        Brightness.setBrightnessAsync(prevBrightness.current).catch(() => {});
      }
    };
  }, []);

  // Drive SOS / strobe patterns.
  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    if (mode === 'sos') {
      let i = 0;
      const step = () => {
        const frame = SOS[i % SOS.length];
        setFlashOn(frame.on);
        timer.current = setTimeout(step, frame.ms);
        i++;
      };
      step();
    } else if (mode === 'strobe') {
      const step = () => {
        setFlashOn((f) => !f);
        timer.current = setTimeout(step, 90);
      };
      step();
    } else {
      setFlashOn(false);
    }
    return () => timer.current && clearTimeout(timer.current);
  }, [mode]);

  const set = (m) => setMode((cur) => (cur === m ? 'off' : m));

  return (
    <View style={[styles.screen, lit && styles.screenLit]}>
      {/* Tap anywhere on the lit area to turn off */}
      {mode !== 'off' && (
        <Pressable style={StyleSheet.absoluteFill} onPress={() => setMode('off')} />
      )}

      <View
        style={[
          styles.controls,
          { paddingBottom: insets.bottom + spacing.xl, paddingTop: insets.top + spacing.xl },
        ]}
        pointerEvents="box-none"
      >
        <Text style={[styles.title, lit && styles.titleLit]}>
          {mode === 'off' ? 'Tap a mode' : 'Tap screen to turn off'}
        </Text>

        <View style={styles.buttons} pointerEvents="auto">
          <ModeButton label="Light" icon="💡" active={mode === 'on'} onPress={() => set('on')} lit={lit} />
          <ModeButton label="SOS" icon="🆘" active={mode === 'sos'} onPress={() => set('sos')} lit={lit} />
          <ModeButton label="Strobe" icon="⚡" active={mode === 'strobe'} onPress={() => set('strobe')} lit={lit} />
        </View>

        {Platform.OS === 'web' && (
          <Text style={[styles.note, lit && styles.noteLit]}>
            On a phone this also maxes out screen brightness.
          </Text>
        )}
      </View>
    </View>
  );
}

function ModeButton({ label, icon, active, onPress, lit }) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.btn, active && styles.btnActive, lit && !active && styles.btnOnLit]}
    >
      <Text style={styles.btnIcon}>{icon}</Text>
      <Text style={[styles.btnLabel, active && styles.btnLabelActive, lit && !active && styles.btnLabelOnLit]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg, justifyContent: 'flex-end' },
  screenLit: { backgroundColor: '#FFFFFF' },
  controls: { paddingHorizontal: spacing.lg, alignItems: 'center', gap: spacing.lg },
  title: { color: colors.textDim, fontSize: font.body, fontWeight: '600' },
  titleLit: { color: '#222' },
  buttons: { flexDirection: 'row', gap: spacing.md, width: '100%', justifyContent: 'center' },
  btn: {
    flex: 1,
    maxWidth: 130,
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.lg,
    gap: spacing.xs,
  },
  btnActive: { backgroundColor: colors.accent, borderColor: colors.accent },
  btnOnLit: { backgroundColor: 'rgba(0,0,0,0.06)', borderColor: 'rgba(0,0,0,0.15)' },
  btnIcon: { fontSize: 26 },
  btnLabel: { color: colors.textDim, fontWeight: '700', fontSize: font.small },
  btnLabelActive: { color: colors.white },
  btnLabelOnLit: { color: '#333' },
  note: { color: colors.textFaint, fontSize: font.small, textAlign: 'center' },
  noteLit: { color: '#555' },
});
