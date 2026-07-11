import * as Location from 'expo-location';
import { Magnetometer } from 'expo-sensors';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LockedNotice from '../src/components/LockedNotice';
import { usePro } from '../src/lib/pro';
import { colors, font, radius, spacing } from '../src/theme';

const DIRECTIONS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

// Convert raw magnetometer x/y into a 0–359° compass heading (0 = North).
function toHeading(m) {
  let angle = 0;
  if (m) {
    const { x, y } = m;
    angle = Math.atan2(y, x) >= 0
      ? Math.atan2(y, x) * (180 / Math.PI)
      : (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI);
  }
  const a = Math.round(angle);
  return a - 90 >= 0 ? a - 90 : a + 270;
}

export default function Compass() {
  const insets = useSafeAreaInsets();
  const { isPro } = usePro();
  const [heading, setHeading] = useState(0);
  const [supported, setSupported] = useState(null); // null = checking
  // 0–3 OS calibration score when using fused heading; null on the raw
  // magnetometer fallback.
  const [accuracy, setAccuracy] = useState(null);
  const sub = useRef(null);
  const smooth = useRef(null);

  useEffect(() => {
    if (!isPro) return; // don't start the sensor until unlocked
    let alive = true;
    (async () => {
      // Preferred: the OS's fused compass heading (tilt-compensated, works at
      // any phone angle). magHeading needs no permission; trueHeading is used
      // when location permission was already granted elsewhere (it's -1
      // otherwise). No permission prompt is ever triggered from here.
      try {
        const headingSub = await Location.watchHeadingAsync((h) => {
          if (!alive) return;
          const deg = h.trueHeading >= 0 ? h.trueHeading : h.magHeading;
          if (deg >= 0) {
            setAccuracy(h.accuracy);
            setHeading(Math.round(deg) % 360);
          }
        });
        if (!alive) {
          headingSub.remove();
          return;
        }
        sub.current = headingSub;
        setSupported(true);
        return;
      } catch (e) {
        // No fused heading on this device — fall back to the raw magnetometer.
      }
      const ok = await Magnetometer.isAvailableAsync().catch(() => false);
      if (!alive) return;
      setSupported(ok);
      if (!ok) return;
      Magnetometer.setUpdateInterval(100);
      sub.current = Magnetometer.addListener((data) => {
        // Low-pass filter on the raw vector (not the angle, which wraps at
        // 360°) so the dial doesn't jitter at every 10 Hz sample.
        const prev = smooth.current;
        smooth.current = prev
          ? { x: prev.x * 0.75 + data.x * 0.25, y: prev.y * 0.75 + data.y * 0.25 }
          : { x: data.x, y: data.y };
        setHeading(toHeading(smooth.current));
      });
    })();
    return () => {
      alive = false;
      sub.current && sub.current.remove();
    };
  }, [isPro]);

  if (!isPro) return <LockedNotice name="Compass is a Pro tool" />;

  const cardinal = DIRECTIONS[Math.round(heading / 45) % 8];

  if (supported === false) {
    return (
      <View style={[styles.screen, styles.center]}>
        <Text style={styles.bigIcon}>🧭</Text>
        <Text style={styles.title}>No compass sensor</Text>
        <Text style={styles.dim}>This device doesn't have a magnetometer. Try it on your phone.</Text>
      </View>
    );
  }

  return (
    <View style={[styles.screen, { paddingBottom: insets.bottom }]}>
      <View style={styles.readout}>
        <Text style={styles.degrees}>{heading}°</Text>
        <Text style={styles.cardinal}>{cardinal}</Text>
      </View>

      <View style={styles.dialWrap}>
        {/* Fixed pointer = the way the top of your phone is facing */}
        <View style={styles.pointer} />
        {/* Rotating dial */}
        <View style={[styles.dial, { transform: [{ rotate: `${-heading}deg` }] }]}>
          <Text style={[styles.mark, styles.markN]}>N</Text>
          <Text style={[styles.mark, styles.markE]}>E</Text>
          <Text style={[styles.mark, styles.markS]}>S</Text>
          <Text style={[styles.mark, styles.markW]}>W</Text>
          <View style={styles.crosshair} />
        </View>
      </View>

      <Text style={styles.hint}>
        {accuracy == null
          ? 'Hold the phone flat. For best accuracy, wave it in a figure-8 to calibrate.'
          : accuracy <= 1
            ? 'Compass needs calibrating. Wave your phone in a figure-8.'
            : 'Keep away from magnets and metal for best accuracy.'}
      </Text>
    </View>
  );
}

const DIAL = 260;
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg, alignItems: 'center' },
  center: { justifyContent: 'center', padding: spacing.xl, gap: spacing.md },
  bigIcon: { fontSize: 48 },
  title: { color: colors.text, fontSize: font.h2, fontWeight: '800' },
  dim: { color: colors.textDim, fontSize: font.body, textAlign: 'center', lineHeight: 22 },
  readout: { alignItems: 'center', marginTop: spacing.xl },
  degrees: { color: colors.text, fontSize: 64, fontWeight: '800', fontVariant: ['tabular-nums'] },
  cardinal: { color: colors.accent, fontSize: font.h1, fontWeight: '800', marginTop: -spacing.sm },
  dialWrap: { marginTop: spacing.xl, alignItems: 'center', justifyContent: 'center' },
  pointer: {
    position: 'absolute',
    top: -14,
    width: 0,
    height: 0,
    borderLeftWidth: 12,
    borderRightWidth: 12,
    borderTopWidth: 18,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: colors.accent,
    zIndex: 5,
  },
  dial: {
    width: DIAL,
    height: DIAL,
    borderRadius: DIAL / 2,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mark: { position: 'absolute', fontSize: 22, fontWeight: '800', color: colors.textDim },
  markN: { top: 14, color: colors.danger },
  markE: { right: 16 },
  markS: { bottom: 14 },
  markW: { left: 16 },
  crosshair: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.accent },
  hint: { color: colors.textFaint, fontSize: font.small, textAlign: 'center', marginTop: spacing.xl, paddingHorizontal: spacing.xl, lineHeight: 19 },
});
