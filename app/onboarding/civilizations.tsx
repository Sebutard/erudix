import { ScrollView, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { OnboardingLayout } from '@/components/OnboardingLayout';
import { InterestChip } from '@/components/InterestChip';
import { PrimaryButton } from '@/components/PrimaryButton';
import { usePreferences } from '@/contexts/PreferencesContext';

const items = [
  'Empire romain',
  'Grèce antique',
  'Égypte ancienne',
  'Empire ottoman',
  'Civilisations précolombiennes',
  'Chine impériale',
  'Japon',
  'Monde arabe',
  'Europe médiévale',
  'URSS',
  'États-Unis',
  'Amérique latine',
];

export default function Civilizations() {
  const { preferences, savePreferences } = usePreferences();
  const selected = preferences?.civilizations ?? [];

  const toggle = (value: string) => {
    if (!preferences) {
      return;
    }

    const next = selected.includes(value)
      ? selected.filter((item) => item !== value)
      : [...selected, value];

    void savePreferences({ ...preferences, civilizations: next });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <OnboardingLayout
        step="02 / 05"
        title="Quels mondes voulez-vous explorer ?"
        description="Sélectionnez les sociétés et civilisations qui vous intéressent."
      >
        <ScrollView>
          {items.map((item) => (
            <InterestChip key={item} label={item} selected={selected.includes(item)} onPress={() => toggle(item)} />
          ))}
        </ScrollView>

        <PrimaryButton label="Continuer" onPress={() => router.push('/onboarding/personalities')} />
      </OnboardingLayout>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1 },
});
