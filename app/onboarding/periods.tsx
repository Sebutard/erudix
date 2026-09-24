import { ScrollView, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { OnboardingLayout } from '@/components/OnboardingLayout';
import { InterestChip } from '@/components/InterestChip';
import { PrimaryButton } from '@/components/PrimaryButton';
import { usePreferences } from '@/contexts/PreferencesContext';

const items = [
  'Antiquité',
  'Moyen Âge',
  'Renaissance',
  'XVIIe siècle',
  'XVIIIe siècle',
  'XIXe siècle',
  'Première moitié du XXe siècle',
  'Deuxième moitié du XXe siècle',
  'XXIe siècle',
];

export default function Periods() {
  const { preferences, savePreferences } = usePreferences();
  const selected = preferences?.historicalPeriods ?? [];

  const toggle = (value: string) => {
    if (!preferences) {
      return;
    }

    const next = selected.includes(value)
      ? selected.filter((item) => item !== value)
      : [...selected, value];

    void savePreferences({ ...preferences, historicalPeriods: next });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <OnboardingLayout
        step="01 / 05"
        title="Quelles époques vous attirent ?"
        description="Choisissez plusieurs périodes. Vous pourrez les modifier plus tard."
      >
        <ScrollView>
          {items.map((item) => (
            <InterestChip key={item} label={item} selected={selected.includes(item)} onPress={() => toggle(item)} />
          ))}
        </ScrollView>

        <PrimaryButton label="Continuer" onPress={() => router.push('/onboarding/civilizations')} />
      </OnboardingLayout>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1 },
});
