import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CurrenciesProvider } from '../src/lib/currencies';
import { ProProvider } from '../src/lib/pro';
import { colors } from '../src/theme';

export default function RootLayout() {
  return (
    <ProProvider>
    <CurrenciesProvider>
    <SafeAreaProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.bg },
          headerTintColor: colors.text,
          headerTitleStyle: { fontWeight: '700' },
          headerShadowVisible: false,
          contentStyle: { backgroundColor: colors.bg },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="currency" options={{ title: 'Currency Converter' }} />
        <Stack.Screen name="units" options={{ title: 'Unit Converter' }} />
        <Stack.Screen name="tip" options={{ title: 'Tip & Split' }} />
        <Stack.Screen name="timezones" options={{ title: 'World Clock' }} />
        <Stack.Screen name="phrasebook" options={{ title: 'Phrasebook' }} />
        <Stack.Screen name="flashlight" options={{ title: 'Flashlight & SOS' }} />
        <Stack.Screen name="compass" options={{ title: 'Compass' }} />
        <Stack.Screen name="sun" options={{ title: 'Sun Times' }} />
        <Stack.Screen name="survival" options={{ title: 'Survival Guide' }} />
        <Stack.Screen name="budget" options={{ title: 'Trip Budget' }} />
        <Stack.Screen name="settings" options={{ title: 'Settings' }} />
        <Stack.Screen name="add-currency" options={{ title: 'Add a Currency' }} />
        <Stack.Screen name="pro" options={{ title: 'Roamkit Pro', presentation: 'modal' }} />
      </Stack>
    </SafeAreaProvider>
    </CurrenciesProvider>
    </ProProvider>
  );
}
