import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { DurationSelector } from '@/components/DurationSelector';
import { PrimaryButton } from '@/components/PrimaryButton';
import { usePreferences } from '@/contexts/PreferencesContext';
import { colors } from '@/theme';
import { generateLearningSession } from '@/services/recommendation';
import { persistSession } from '@/services/sessionHistory';
import { storage } from '@/services/storage';
import type { LearningSession } from '@/types';

export default function Home() {
  const { preferences } = usePreferences();
  const [duration, setDuration] = useState(preferences?.preferredSessionDuration ?? 15);
  const [history, setHistory] = useState<LearningSession[]>([]);

  useEffect(() => {
    async function loadHistory() {
      const previousSessions = await storage.getHistory();
      setHistory(previousSessions);
    }

    void loadHistory();
  }, []);

  const start = async () => {
    if (!preferences) {
      return;
    }

    const session = generateLearningSession(preferences, duration);
    await persistSession(session);
    router.push(`/session/${session.id}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.eyebrow}>ERUDIX · AUJOURD’HUI</Text>
      <Text style={styles.title}>Vous avez combien de temps ?</Text>

      <DurationSelector
        value={duration}
        onChange={(value) => {
          setDuration(value);
        }}
      />

      <PrimaryButton label="Commencer une session" onPress={() => void start()} />

      <Text style={styles.section}>Pour vous</Text>
      {[
        'Comprendre la chute de l’Empire romain',
        'Pourquoi la Guerre froide a commencé',
        'Comment Napoléon a transformé l’Europe',
        'Les origines historiques du conflit israélo-palestinien',
        'La Révolution industrielle en 15 minutes',
      ].map((item) => (
        <View key={item} style={styles.suggestion}>
          <Text style={styles.suggestionText}>{item}</Text>
          <Text style={styles.arrow}>↗</Text>
        </View>
      ))}

      <Text style={styles.section}>Historique</Text>
      {history.length === 0 ? (
        <Text style={styles.empty}>Aucune session enregistrée pour le moment.</Text>
      ) : (
        history.slice(0, 3).map((item) => (
          <View key={item.id} style={styles.historyCard}>
            <Text style={styles.historyTitle}>{item.title}</Text>
            <Text style={styles.historyMeta}>{item.estimatedDuration} min</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    paddingTop: 64,
    backgroundColor: colors.background,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.5,
    color: colors.accent,
  },
  title: {
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '700',
    color: colors.ink,
    marginTop: 18,
    marginBottom: 30,
  },
  section: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.ink,
    marginTop: 40,
    marginBottom: 16,
  },
  suggestion: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  suggestionText: {
    fontSize: 16,
    color: colors.ink,
    flex: 1,
  },
  arrow: {
    fontSize: 20,
    color: colors.accent,
    marginLeft: 12,
  },
  empty: {
    color: colors.muted,
    fontSize: 15,
  },
  historyCard: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.ink,
  },
  historyMeta: {
    color: colors.muted,
    marginTop: 6,
  },
});
