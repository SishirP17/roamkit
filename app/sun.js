import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { daylightLength, getSunTimes } from '../src/lib/sun';
import { colors, font, radius, spacing } from '../src/theme';

export default function Sun() {
  const insets = useSafeAreaInsets();
  const [status, setStatus] = useState('loading'); // loading | denied | error | ready
  const [canAskAgain, setCanAskAgain] = useState(true);
  const [coords, setCoords] = useState(null);
  const [times, setTimes] = useState(null);

  const load = async () => {
    setStatus('loading');
    try {
      const perm = await Location.requestForegroundPermissionsAsync();
      if (perm.status !== 'granted') {
        // After "don't ask again" (Android) / first denial (iOS) the request
        // resolves instantly with no dialog — retrying is a dead end, the only
        // way forward is the system settings screen.
        setCanAskAgain(perm.canAskAgain !== false);
        setStatus('denied');
        return;
      }
      const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Low });
      const { latitude, longitude } = loc.coords;
      setCoords({ latitude, longitude });
      setTimes(getSunTimes(new Date(), latitude, longitude));
      setStatus('ready');
    } catch (e) {
      setStatus('error');
    }
  };

  useEffect(() => {
    load();
  }, []);

  const fmtTime = (d) =>
    d ? d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }) : '–';

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{ padding: spacing.lg, paddingBottom: insets.bottom + spacing.xl }}
    >
      {status === 'loading' && (
        <View style={styles.center}>
          <ActivityIndicator color={colors.accent} />
          <Text style={styles.dim}>Finding your location…</Text>
        </View>
      )}

      {(status === 'denied' || status === 'error') && (
        <View style={styles.center}>
          <Text style={styles.icon}>📍</Text>
          <Text style={styles.title}>
            {status === 'denied' ? 'Location needed' : 'Could not get location'}
          </Text>
          <Text style={styles.dim}>
            {status === 'denied'
              ? canAskAgain
                ? 'RoamKit needs your location to work out local sunrise and sunset. It stays on your device.'
                : 'Location is turned off for RoamKit. Allow it in your device settings, then come back and try again.'
              : 'Make sure location is turned on, then try again.'}
          </Text>
          {status === 'denied' && !canAskAgain ? (
            <Pressable onPress={() => Linking.openSettings().catch(() => {})} style={styles.btn}>
              <Text style={styles.btnText}>Open settings</Text>
            </Pressable>
          ) : null}
          <Pressable
            onPress={load}
            style={[styles.btn, status === 'denied' && !canAskAgain && styles.btnGhost]}
          >
            <Text
              style={[
                styles.btnText,
                status === 'denied' && !canAskAgain && { color: colors.accent },
              ]}
            >
              Try again
            </Text>
          </Pressable>
        </View>
      )}

      {status === 'ready' && times && (
        <>
          <View style={styles.bigCard}>
            <Row icon="🌅" label="Sunrise" value={fmtTime(times.sunrise)} big />
            <View style={styles.divider} />
            <Row icon="🌇" label="Sunset" value={fmtTime(times.sunset)} big />
          </View>

          <View style={styles.card}>
            <Row icon="🌣" label="Daylight" value={daylightLength(times.sunrise, times.sunset) || '–'} />
            <Row icon="🌄" label="First light (dawn)" value={fmtTime(times.dawn)} />
            <Row icon="🌃" label="Last light (dusk)" value={fmtTime(times.dusk)} />
          </View>

          <Text style={styles.footer}>
            For your current location, today. Works fully offline.
          </Text>
        </>
      )}
    </ScrollView>
  );
}

function Row({ icon, label, value, big }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowIcon}>{icon}</Text>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={[styles.rowValue, big && styles.rowValueBig]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  center: { alignItems: 'center', justifyContent: 'center', paddingTop: spacing.xxl, gap: spacing.md },
  icon: { fontSize: 44 },
  title: { color: colors.text, fontSize: font.h2, fontWeight: '800' },
  dim: { color: colors.textDim, fontSize: font.body, textAlign: 'center', lineHeight: 22 },
  btn: { marginTop: spacing.md, backgroundColor: colors.accent, borderRadius: radius.pill, paddingVertical: spacing.md, paddingHorizontal: spacing.xl },
  btnGhost: { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.accent },
  btnText: { color: colors.white, fontWeight: '800', fontSize: font.body },
  bigCard: {
    backgroundColor: colors.accentSoft,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    marginTop: spacing.md,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.md },
  rowIcon: { fontSize: 26 },
  rowLabel: { flex: 1, color: colors.textDim, fontSize: font.body, fontWeight: '600' },
  rowValue: { color: colors.text, fontSize: font.h3, fontWeight: '700' },
  rowValueBig: { color: colors.accent, fontSize: font.h1, fontWeight: '800' },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: spacing.xs },
  footer: { color: colors.textFaint, textAlign: 'center', fontSize: font.small, marginTop: spacing.lg },
});
