import { useEffect, useState } from 'react';
import { Image, Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { DurationSelector } from '@/components/DurationSelector';
import { usePreferences } from '@/contexts/PreferencesContext';
import { generateLearningSession } from '@/services/recommendation';
import { persistSession } from '@/services/sessionHistory';
import { storage } from '@/services/storage';
import { colors } from '@/theme';
import type { LearningResource, LearningSession } from '@/types';

function ResourceCard({ resource }: { resource: LearningResource }) {
  const isYoutube = resource.type === 'youtube';

  return (
    <View style={styles.card}>
      {isYoutube && resource.thumbnail ? (
        <View style={styles.youtubeWrap}>
          <Image source={{ uri: resource.thumbnail }} style={styles.youtubeThumb} />
          <View style={styles.playBadge}>
            <Text style={styles.playText}>▶</Text>
          </View>
        </View>
      ) : null}

      <Text style={styles.type}>
        {resource.type === 'youtube'
          ? '▶ VIDÉO'
          : resource.type === 'article'
            ? 'ARTICLE'
            : resource.type === 'educational'
              ? 'CONTEXT'
              : 'PODCAST'}{' '}
        · {resource.estimatedDuration} MIN
      </Text>

      <Text style={styles.cardTitle}>{resource.title}</Text>
      <Text style={styles.source}>{resource.source}</Text>
      {resource.description ? <Text style={styles.description}>{resource.description}</Text> : null}

      <Pressable onPress={() => void Linking.openURL(resource.url)}>
        <Text style={styles.link}>Voir la source ↗</Text>
      </Pressable>
    </View>
  );
}

export default function Session() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { preferences } = usePreferences();
  const [session, setSession] = useState<LearningSession | null>(null);
  const [duration, setDuration] = useState(preferences?.preferredSessionDuration ?? 15);

  useEffect(() => {
    async function loadCurrentSession() {
      const current = await storage.getSession();
      setSession(current);
    }

    void loadCurrentSession();
  }, [id]);

  const changeDuration = async (newDuration: number) => {
    if (!preferences) {
      return;
    }

    setDuration(newDuration);
    const nextSession = generateLearningSession(preferences, newDuration);
    await persistSession(nextSession);
    setSession(nextSession);
    router.replace(`/session/${nextSession.id}`);
  };

  if (!session) {
    return null;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Pressable onPress={() => router.replace('/home')}>
        <Text style={styles.back}>← Accueil</Text>
      </Pressable>

      <Text style={styles.eyebrow}>SESSION · {session.estimatedDuration} MIN</Text>
      <Text style={styles.title}>{session.title}</Text>
      <Text style={styles.topic}>{session.topic}</Text>
      <Text style={styles.intro}>{session.description}</Text>

      <View style={styles.durationBlock}>
        <Text style={styles.durationLabel}>J’ai :</Text>
        <DurationSelector value={duration} onChange={(value) => void changeDuration(value)} />
      </View>

      {session.resources.map((resource) => (
        <ResourceCard key={resource.id} resource={resource} />
      ))}

      <View style={styles.summary}>
        <Text style={styles.summaryTitle}>À retenir</Text>
        <Text style={styles.summaryText}>
          Les crises historiques se comprennent rarement en un seul événement : elles sont le résultat de tensions,
          de décisions et de perceptions qui s’accumulent.
        </Text>
      </View>

      <View style={styles.question}>
        <Text style={styles.questionTitle}>Question finale</Text>
        <Text style={styles.summaryText}>
          Quelles leçons de la crise de Cuba peuvent encore éclairer les crises internationales actuelles ?
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingTop: 58,
    backgroundColor: colors.background,
  },
  back: {
    fontSize: 15,
    color: colors.muted,
    marginBottom: 30,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.4,
    color: colors.accent,
  },
  title: {
    fontSize: 32,
    lineHeight: 38,
    fontWeight: '700',
    color: colors.ink,
    marginTop: 14,
  },
  topic: {
    fontSize: 14,
    color: colors.muted,
    marginTop: 12,
  },
  intro: {
    fontSize: 17,
    lineHeight: 26,
    color: colors.ink,
    marginTop: 20,
  },
  durationBlock: {
    marginVertical: 28,
  },
  durationLabel: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 12,
    color: colors.ink,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 20,
    marginBottom: 14,
  },
  type: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    color: colors.accent,
  },
  cardTitle: {
    fontSize: 21,
    lineHeight: 27,
    fontWeight: '700',
    color: colors.ink,
    marginTop: 12,
  },
  source: {
    color: colors.muted,
    marginTop: 8,
  },
  description: {
    fontSize: 15,
    lineHeight: 23,
    color: colors.muted,
    marginTop: 14,
  },
  youtubeWrap: {
    position: 'relative',
    height: 170,
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 16,
  },
  youtubeThumb: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  playBadge: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    width: 54,
    height: 54,
    borderRadius: 27,
    marginLeft: -27,
    marginTop: -27,
    backgroundColor: 'rgba(0,0,0,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playText: {
    color: '#fff',
    fontSize: 24,
    marginLeft: 4,
  },
  link: {
    color: colors.accent,
    fontWeight: '700',
    marginTop: 18,
  },
  summary: {
    backgroundColor: colors.ink,
    borderRadius: 20,
    padding: 22,
    marginTop: 8,
    marginBottom: 14,
  },
  summaryTitle: {
    fontSize: 21,
    fontWeight: '700',
    color: '#fff',
  },
  summaryText: {
    color: '#f1f1f1',
    fontSize: 15,
    lineHeight: 23,
    marginTop: 12,
  },
  question: {
    backgroundColor: '#EEDACD',
    borderRadius: 20,
    padding: 22,
    marginBottom: 30,
  },
  questionTitle: {
    fontSize: 21,
    fontWeight: '700',
    color: colors.ink,
  },
});
