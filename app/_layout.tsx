import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { PreferencesProvider } from '@/contexts/PreferencesContext';

export default function RootLayout() {
  return (
    <PreferencesProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#F8F7F3' },
        }}
      />
    </PreferencesProvider>
  );
}
