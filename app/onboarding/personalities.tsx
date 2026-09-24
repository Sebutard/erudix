import { ScrollView, StyleSheet, TextInput } from 'react-native';
import { router } from 'expo-router';
import { OnboardingLayout } from '@/components/OnboardingLayout';
import { InterestChip } from '@/components/InterestChip';
import { PrimaryButton } from '@/components/PrimaryButton';
import { usePreferences } from '@/contexts/PreferencesContext';
import { colors } from '@/theme';

const items = ['Jules César', 'Cléopâtre', 'Napoléon', 'Simón Bolívar', 'Charles de Gaulle', 'Winston Churchill', 'Nelson Mandela', 'Marie Curie'];

export default function Personalities() {
  const { preferences, savePreferences } = usePreferences();
  const selected = preferences?.personalities ?? [];

  const toggle = (value: string) => {
    if (!preferences) {
      return;
    }

    const next = selected.includes(value)
      ? selected.filter((item) => item !== value)
      : [...selected, value];

    void savePreferences({ ...preferences, personalities: next });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <OnboardingLayout
        step="03 / 05"
        title="Qui aimeriez-vous mieux connaître ?"
        description="Recherchez ou choisissez quelques personnalités qui vous intriguent."
      >
        <TextInput placeholder="Rechercher une personnalité" placeholderTextColor={colors.muted} style={styles.input} />

        {items.map((item) => (
          <InterestChip key={item} label={item} selected={selected.includes(item)} onPress={() => toggle(item)} />
        ))}

        <PrimaryButton label="Continuer" onPress={() => router.push('/onboarding/geography')} />
      </OnboardingLayout>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1 },
  input: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 14,
    padding: 16,
    fontSize: 16,
    marginBottom: 20,
    color: colors.ink,
  },
});
