import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CITIES, CITY_MAP } from '../src/data/cities';
import { colors, font, radius, spacing } from '../src/theme';

const STORAGE_KEY = 'worldclock.cities.v1';
const DEFAULT = ['london', 'newyork', 'tokyo', 'dubai'];

// Returns { time, date, dayDiff } for a tz at the given Date, computed offline.
function partsFor(date, tz) {
  const time = new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date);
  const dateStr = new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).format(date);

  // Day difference vs the device's local day (for Today/Tomorrow/Yesterday).
  // en-CA formats as YYYY-MM-DD, so both days parse as UTC midnight and the
  // difference is an exact whole number of days across month/year boundaries.
  const dayOpts = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const localDate = new Intl.DateTimeFormat('en-CA', dayOpts).format(date);
  const tzDate = new Intl.DateTimeFormat('en-CA', { timeZone: tz, ...dayOpts }).format(date);
  const dayDiff = Math.round((Date.parse(tzDate) - Date.parse(localDate)) / 86400000);
  return { time, dateStr, dayDiff };
}

export default function WorldClock() {
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState(DEFAULT);
  const [now, setNow] = useState(() => new Date());
  const [pickerOpen, setPickerOpen] = useState(false);
  const [search, setSearch] = useState('');

  // Load saved cities once.
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const ids = JSON.parse(raw);
          if (Array.isArray(ids) && ids.length) setSelected(ids);
        }
      } catch (e) {}
    })();
  }, []);

  // Tick every second.
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const persist = (ids) => {
    setSelected(ids);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(ids)).catch(() => {});
  };

  const addCity = (id) => {
    if (!selected.includes(id)) persist([...selected, id]);
    setPickerOpen(false);
    setSearch('');
  };
  const removeCity = (id) => persist(selected.filter((c) => c !== id));

  const dayLabel = (d) =>
    d === 0 ? 'Today' : d === 1 ? 'Tomorrow' : d === -1 ? 'Yesterday' : `${d > 0 ? '+' : ''}${d} days`;

  const available = CITIES.filter((c) => {
    if (selected.includes(c.id)) return false;
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return c.name.toLowerCase().includes(q) || c.country.toLowerCase().includes(q);
  });

  return (
    <View style={[styles.screen, { paddingBottom: insets.bottom }]}>
      <FlatList
        contentContainerStyle={{ padding: spacing.lg }}
        data={selected.map((id) => CITY_MAP[id]).filter(Boolean)}
        keyExtractor={(c) => c.id}
        renderItem={({ item }) => {
          const { time, dateStr, dayDiff } = partsFor(now, item.tz);
          return (
            <View style={styles.row}>
              <Text style={styles.flag}>{item.flag}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.city}>{item.name}</Text>
                <Text style={styles.sub}>{dateStr}</Text>
              </View>
              {/* Day shift lives under the time: it explains the time, and the
                  date line can no longer wrap when the time is wide (12:10 AM). */}
              <View style={styles.timeWrap}>
                <Text style={styles.time}>{time}</Text>
                <Text style={styles.sub}>{dayLabel(dayDiff)}</Text>
              </View>
              <Pressable onPress={() => removeCity(item.id)} hitSlop={10} style={styles.remove}>
                <Text style={styles.removeText}>✕</Text>
              </Pressable>
            </View>
          );
        }}
        ListEmptyComponent={
          <Text style={styles.empty}>No cities yet. Add one below.</Text>
        }
        ListFooterComponent={
          <Pressable onPress={() => setPickerOpen(true)} style={styles.addBtn}>
            <Text style={styles.addBtnText}>+ Add city</Text>
          </Pressable>
        }
      />

      <Modal visible={pickerOpen} animationType="slide" transparent onRequestClose={() => setPickerOpen(false)}>
        <View style={styles.backdrop}>
          <View style={[styles.sheet, { paddingBottom: insets.bottom + spacing.lg }]}>
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>Add a city</Text>
              <Pressable onPress={() => setPickerOpen(false)} hitSlop={12}>
                <Text style={styles.close}>✕</Text>
              </Pressable>
            </View>
            <TextInput
              style={styles.searchInput}
              value={search}
              onChangeText={setSearch}
              placeholder="Search city or country…"
              placeholderTextColor={colors.textFaint}
              selectionColor={colors.accent}
              autoCorrect={false}
            />
            <FlatList
              data={available}
              keyExtractor={(c) => c.id}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item }) => (
                <Pressable onPress={() => addCity(item.id)} style={styles.pickItem}>
                  <Text style={styles.flag}>{item.flag}</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.city}>{item.name}</Text>
                    <Text style={styles.sub}>{item.country}</Text>
                  </View>
                </Pressable>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    marginBottom: spacing.md,
    gap: spacing.md,
  },
  flag: { fontSize: 30 },
  city: { color: colors.text, fontSize: font.h3, fontWeight: '700' },
  sub: { color: colors.textFaint, fontSize: font.small, marginTop: 2 },
  timeWrap: { alignItems: 'flex-end' },
  time: { color: colors.text, fontSize: font.h2, fontWeight: '800', fontVariant: ['tabular-nums'] },
  remove: { paddingLeft: spacing.sm },
  removeText: { color: colors.textFaint, fontSize: 16 },
  empty: { color: colors.textFaint, textAlign: 'center', marginTop: spacing.xl, fontSize: font.body },
  addBtn: {
    marginTop: spacing.sm,
    borderWidth: 1,
    borderColor: colors.accent,
    borderRadius: radius.pill,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  addBtnText: { color: colors.accent, fontWeight: '700', fontSize: font.body },
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.55)', justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: colors.bg,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    maxHeight: '85%',
    borderWidth: 1,
    borderColor: colors.border,
  },
  sheetHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md },
  sheetTitle: { color: colors.text, fontSize: font.h3, fontWeight: '800' },
  close: { color: colors.textDim, fontSize: 20, fontWeight: '700' },
  searchInput: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.text,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    fontSize: font.body,
    marginBottom: spacing.sm,
  },
  pickItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    gap: spacing.md,
  },
});
