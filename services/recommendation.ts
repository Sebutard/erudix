import { LearningSession, UserPreferences } from '@/types';

const baseResources = [
  {
    id: 'cuba-video',
    type: 'youtube' as const,
    title: 'La crise des missiles de Cuba en 10 minutes',
    source: 'Histoire mondiale',
    url: 'https://www.youtube.com/watch?v=8mho1Rk4KJQ',
    thumbnail: 'https://img.youtube.com/vi/8mho1Rk4KJQ/hqdefault.jpg',
    estimatedDuration: 6,
    description: 'Retour sur les treize jours qui ont placé le monde au bord de la guerre nucléaire.',
  },
  {
    id: 'deterrence',
    type: 'article' as const,
    title: 'Comprendre la dissuasion nucléaire',
    source: 'The Conversation',
    url: 'https://theconversation.com',
    estimatedDuration: 5,
    description: 'Pourquoi l’équilibre de la terreur a transformé les relations internationales.',
  },
  {
    id: 'two-blocs',
    type: 'educational' as const,
    title: 'Le contexte : un monde coupé en deux',
    source: 'Erudix',
    url: 'https://erudix.app',
    estimatedDuration: 2,
    description: '1945, la fin de la Seconde Guerre mondiale et la naissance de deux blocs rivaux.',
  },
];

export function generateLearningSession(
  preferences: UserPreferences,
  duration: number,
): LearningSession {
  const selectedResources =
    duration <= 5
      ? baseResources.slice(0, 1)
      : duration <= 10
        ? baseResources.slice(0, 2)
        : duration <= 15
          ? baseResources
          : [
              ...baseResources,
              {
                id: 'reflection',
                type: 'article' as const,
                title: 'Une question pour aller plus loin',
                source: 'Erudix',
                url: 'https://erudix.app',
                estimatedDuration: 3,
                description:
                  'Que révèle la crise de Cuba sur notre manière de gérer les crises internationales aujourd’hui ?',
              },
            ];

  const totalDuration = selectedResources.reduce((sum, item) => sum + item.estimatedDuration, 0) + 2;

  return {
    id: `session-${Date.now()}`,
    title: 'La crise de Cuba : 13 jours au bord de la guerre nucléaire',
    topic: 'Guerre froide · Cuba / USA / URSS',
    description:
      'Une session courte pour comprendre comment une crise locale est devenue le moment le plus dangereux de la guerre froide.',
    estimatedDuration: totalDuration,
    resources: selectedResources,
  };
}
