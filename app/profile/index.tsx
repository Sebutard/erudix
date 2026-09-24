import { StyleSheet, Text, View } from 'react-native';
import { colors } from '@/theme';

export default function Profile() {
  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>VOTRE PROFIL</Text>
      <Text style={styles.title}>Bientôt, votre espace personnel.</Text>
      <Text style={styles.body}>
        Les préférences et l’historique sont déjà conservés localement. La synchronisation Supabase sera activée avec l’authentification.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 64,
    backgroundColor: colors.background,
  },
  eyebrow: {
    color: colors.accent,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.ink,
    marginTop: 18,
  },
  body: {
    fontSize: 16,
    lineHeight: 25,
    color: colors.muted,
    marginTop: 18,
  },
});
