import { ScrollView, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { OnboardingLayout } from '@/components/OnboardingLayout';
import { DurationSelector } from '@/components/DurationSelector';
import { PrimaryButton } from '@/components/PrimaryButton';
import { usePreferences } from '@/contexts/PreferencesContext';

export default function Duration() {
  const { preferences, savePreferences } = usePreferences();
  const value = preferences?.preferredSessionDuration ?? 15;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <OnboardingLayout
        step="05 / 05"
        title="Combien de temps avez-vous généralement ?"
        description="Votre durée préférée guide la composition de chaque session. Vous pourrez la changer à tout moment."
      >
        <DurationSelector value={value} onChange={(n) => {
          if (preferences) {
            void savePreferences({ ...preferences, preferredSessionDuration: n });
          }
        }} />

        <PrimaryButton label="Découvrir Erudix" onPress={() => router.replace('/home')} />
      </OnboardingLayout>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1 },
});
