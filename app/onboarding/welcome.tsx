import { ScrollView, StyleSheet, Text } from 'react-native';
import { router } from 'expo-router';
import { OnboardingLayout } from '@/components/OnboardingLayout';
import { PrimaryButton } from '@/components/PrimaryButton';
import { colors } from '@/theme';

export default function Welcome() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.mark}>ERUDIX</Text>
      <OnboardingLayout
        step="Bienvenue"
        title="Apprendre quelque chose d’intéressant, quand vous avez cinq minutes."
        description="Une expérience éditoriale personnalisée pour mieux comprendre l’Histoire et le monde qui nous entoure."
      >
        <Text style={styles.note}>
          Des sessions pensées pour votre curiosité, votre rythme et votre temps disponible.
        </Text>

        <PrimaryButton label="Configurer mon expérience" onPress={() => router.push('/onboarding/periods')} />
      </OnboardingLayout>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
  },
  mark: {
    marginLeft: 24,
    marginTop: 28,
    fontWeight: '800',
    letterSpacing: 3,
    color: colors.accent,
  },
  note: {
    fontSize: 18,
    lineHeight: 27,
    color: colors.ink,
    marginTop: 20,
  },
});
