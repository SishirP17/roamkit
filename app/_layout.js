import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BackButton from '../src/components/BackButton';
import { CurrenciesProvider } from '../src/lib/currencies';
import { ExternalLinkProvider } from '../src/lib/externalLink';
import { ProProvider } from '../src/lib/pro';
import { TextScaleProvider } from '../src/lib/textScale';
import { colors } from '../src/theme';

export default function RootLayout() {
  return (
    <ProProvider>
    <TextScaleProvider>
    <CurrenciesProvider>
    <SafeAreaProvider>
    <ExternalLinkProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.bg },
          headerTintColor: colors.text,
          headerTitleStyle: { fontWeight: '700' },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => <BackButton />,
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
        <Stack.Screen name="survival/index" options={{ title: 'Survival Guide' }} />
        <Stack.Screen name="survival/category/[category]" options={{ title: 'Survival Guide' }} />
        <Stack.Screen name="survival/article/[id]" options={{ title: '' }} />
        <Stack.Screen name="budget" options={{ title: 'Trip Budget' }} />
        <Stack.Screen name="settings" options={{ title: 'Settings' }} />
        <Stack.Screen name="add-currency" options={{ title: 'Add a Currency' }} />
        <Stack.Screen name="pro" options={{ title: 'RoamKit Pro', presentation: 'modal' }} />
      </Stack>
    </ExternalLinkProvider>
    </SafeAreaProvider>
    </CurrenciesProvider>
    </TextScaleProvider>
    </ProProvider>
  );
}
