import { ScrollView, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { OnboardingLayout } from '@/components/OnboardingLayout';
import { InterestChip } from '@/components/InterestChip';
import { PrimaryButton } from '@/components/PrimaryButton';
import { usePreferences } from '@/contexts/PreferencesContext';

const continents = ['Europe', 'Afrique', 'Amérique du Nord', 'Amérique latine', 'Asie', 'Moyen-Orient', 'Océanie'];
const countries = ['France', 'États-Unis', 'Russie', 'Chine', 'Égypte', 'Israël / Palestine', 'Inde'];

export default function Geography() {
  const { preferences, savePreferences } = usePreferences();
  const selectedRegions = preferences?.regions ?? [];
  const selectedCountries = preferences?.countries ?? [];

  const toggle = (key: 'regions' | 'countries', value: string) => {
    if (!preferences) {
      return;
    }

    const current = key === 'regions' ? selectedRegions : selectedCountries;
    const next = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value];

    void savePreferences({ ...preferences, [key]: next });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <OnboardingLayout
        step="04 / 05"
        title="Où l’Histoire vous emmène-t-elle ?"
        description="Choisissez des régions ou des pays pour donner une dimension géographique à vos sessions."
      >
        <ScrollView>
          {continents.map((item) => (
            <InterestChip key={item} label={item} selected={selectedRegions.includes(item)} onPress={() => toggle('regions', item)} />
          ))}
        </ScrollView>

        <ScrollView>
          {countries.map((item) => (
            <InterestChip key={item} label={item} selected={selectedCountries.includes(item)} onPress={() => toggle('countries', item)} />
          ))}
        </ScrollView>

        <PrimaryButton label="Dernière étape" onPress={() => router.push('/onboarding/duration')} />
      </OnboardingLayout>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1 },
});
