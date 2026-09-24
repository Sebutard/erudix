import { Redirect } from 'expo-router';
import { usePreferences } from '@/contexts/PreferencesContext';
import { LoadingScreen } from '@/components/LoadingScreen';

export default function Index() {
  const { hydrated, preferences } = usePreferences();

  if (!hydrated) {
    return <LoadingScreen />;
  }

  return <Redirect href={preferences ? '/home' : '/onboarding/welcome'} />;
}
