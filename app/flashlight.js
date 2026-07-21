import { CameraView, useCameraPermissions } from 'expo-camera';
import * as Brightness from 'expo-brightness';
import { useKeepAwake } from 'expo-keep-awake';
import { useEffect, useRef, useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, font, radius, spacing } from '../src/theme';

const isWeb = Platform.OS === 'web';

// SOS morse timeline (... --- ...). One unit = 220ms.
function buildSos() {
  const U = 220;
  const seq = [];
  const dot = () => seq.push({ on: true, ms: U }, { on: false, ms: U });
  const dash = () => seq.push({ on: true, ms: U * 3 }, { on: false, ms: U });
  const letterGap = () => seq.push({ on: false, ms: U * 2 });
  const wordGap = () => seq.push({ on: false, ms: U * 4 });
  dot(); dot(); dot(); letterGap();
  dash(); dash(); dash(); letterGap();
  dot(); dot(); dot(); wordGap();
  return seq;
}
const SOS = buildSos();

export default function Flashlight() {
  // The screen must never sleep here — sleep kills both the screen-light and
  // (once the app suspends) the LED torch, exactly when someone needs SOS.
  useKeepAwake();
  const insets = useSafeAreaInsets();
  const [mode, setMode] = useState('off'); // off | on | sos | strobe
  const [flashOn, setFlashOn] = useState(false);
  const [source, setSource] = useState(isWeb ? 'screen' : 'torch'); // torch | screen
  const [permission, requestPermission] = useCameraPermissions();
  const prevBrightness = useRef(null);
  const timer = useRef(null);

  const lightActive = mode === 'on' || ((mode === 'sos' || mode === 'strobe') && flashOn);
  const usingTorch = source === 'torch' && !isWeb && !!permission?.granted;
  const screenLit = lightActive && !usingTorch; // white screen only when no LED torch

  // Boost screen brightness only when we're using the SCREEN as the light.
  // Restores whenever the light stops OR the source switches to torch, and a
  // superseded run must not save/boost brightness after a newer run restored it.
  useEffect(() => {
    if (isWeb) return;
    let cancelled = false;
    const wantBright = source === 'screen' && mode !== 'off';
    (async () => {
      try {
        if (wantBright) {
          if (prevBrightness.current == null) {
            const current = await Brightness.getBrightnessAsync();
            if (cancelled) return;
            prevBrightness.current = current;
          }
          if (cancelled) return;
          await Brightness.setBrightnessAsync(1);
        } else if (prevBrightness.current != null) {
          const restoreTo = prevBrightness.current;
          prevBrightness.current = null;
          await Brightness.setBrightnessAsync(restoreTo);
        }
      } catch (e) {}
    })();
    return () => {
      cancelled = true;
    };
  }, [mode, source]);

  // Restore brightness on unmount.
  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
      if (!isWeb && prevBrightness.current != null) {
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
        timer.current = setTimeout(step, 120);
      };
      step();
    } else {
      setFlashOn(false);
    }
    return () => timer.current && clearTimeout(timer.current);
  }, [mode]);

  // Make sure we have torch (camera) permission; if denied, fall back to screen.
  const ensureTorch = async () => {
    if (isWeb) return false;
    if (permission?.granted) return true;
    const res = await requestPermission();
    if (!res?.granted) {
      setSource('screen');
      return false;
    }
    return true;
  };

  const setModeSafe = async (m) => {
    const next = mode === m ? 'off' : m;
    if (next !== 'off' && source === 'torch') await ensureTorch();
    setMode(next);
  };

  const toggleSource = async () => {
    if (source === 'screen') {
      const ok = await ensureTorch();
      if (ok) setSource('torch');
    } else {
      setSource('screen');
    }
  };

  return (
    <View style={[styles.screen, screenLit && styles.screenLit]}>
      {/* Hidden camera view — required for LED torch control. */}
      {!isWeb && source === 'torch' && permission?.granted && (
        <CameraView style={styles.hiddenCam} facing="back" enableTorch={lightActive} />
      )}

      {/* Tap anywhere to turn off while active */}
      {mode !== 'off' && (
        <Pressable style={StyleSheet.absoluteFill} onPress={() => setMode('off')} />
      )}

      {/* Idle: a big thumb-friendly power button fills the dark area above the
          mode row. While a mode runs this space is the light / tap-to-off surface. */}
      {mode === 'off' && (
        <View style={styles.hero} pointerEvents="box-none">
          <Pressable
            onPress={() => setModeSafe('on')}
            accessibilityRole="button"
            accessibilityLabel="Turn the light on"
            style={({ pressed }) => [styles.powerBtn, pressed && styles.powerBtnPressed]}
          >
            <Text style={styles.powerIcon}>🔦</Text>
            <Text style={styles.powerLabel}>Turn on</Text>
          </Pressable>
        </View>
      )}

      <View
        style={[
          styles.controls,
          { paddingBottom: insets.bottom + spacing.xl, paddingTop: insets.top + spacing.xl },
        ]}
        pointerEvents="box-none"
      >
        <Text style={[styles.title, screenLit && styles.titleLit]}>
          {mode === 'off' ? 'Tap a mode' : 'Tap screen to turn off'}
        </Text>

        <View style={styles.buttons} pointerEvents="auto">
          <ModeButton label="Light" icon="💡" active={mode === 'on'} onPress={() => setModeSafe('on')} lit={screenLit} />
          <ModeButton label="SOS" icon="🆘" active={mode === 'sos'} onPress={() => setModeSafe('sos')} lit={screenLit} />
          <ModeButton label="Strobe" icon="⚡" active={mode === 'strobe'} onPress={() => setModeSafe('strobe')} lit={screenLit} />
        </View>

        {/* Light source toggle (LED torch vs bright screen) */}
        {!isWeb && (
          <Pressable onPress={toggleSource} style={styles.sourceToggle} pointerEvents="auto">
            <Text style={[styles.sourceText, screenLit && styles.sourceTextLit]}>
              {source === 'torch' ? '🔦 Using flashlight' : '📱 Using screen'}
              <Text style={styles.sourceSwap}>
                {source === 'torch' ? '  ·  no light? use screen' : '  ·  switch to flashlight'}
              </Text>
            </Text>
          </Pressable>
        )}
        {isWeb && (
          <Text style={[styles.note, screenLit && styles.noteLit]}>
            On a phone this uses your real flashlight.
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
  hero: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  powerBtn: {
    width: 160,
    height: 160,
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.xs,
  },
  powerBtnPressed: { backgroundColor: colors.surfaceAlt, opacity: 0.9 },
  powerIcon: { fontSize: 52 },
  powerLabel: { color: colors.textDim, fontWeight: '700', fontSize: font.small },
  hiddenCam: { position: 'absolute', width: 1, height: 1, top: 0, left: 0, opacity: 0 },
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
  sourceToggle: { paddingVertical: spacing.sm },
  sourceText: { color: colors.textDim, fontSize: font.small, fontWeight: '700' },
  sourceTextLit: { color: '#444' },
  sourceSwap: { color: colors.textFaint, fontWeight: '500' },
  note: { color: colors.textFaint, fontSize: font.small, textAlign: 'center' },
  noteLit: { color: '#555' },
});
