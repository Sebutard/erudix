import type { LearningSession, UserPreferences } from '../types';

const resources: LearningSession['resources'] = [
  {
    id: 'cuba-video',
    type: 'youtube',
    title: 'La crise des missiles de Cuba en 10 minutes',
    source: 'Histoire mondiale',
    url: 'https://www.youtube.com/watch?v=8mho1Rk4KJQ',
    thumbnail: 'https://img.youtube.com/vi/8mho1Rk4KJQ/hqdefault.jpg',
    estimatedDuration: 6,
    description: 'Les treize jours qui ont placé le monde au bord de la guerre nucléaire.',
  },
  {
    id: 'deterrence',
    type: 'article',
    title: 'Comprendre la dissuasion nucléaire',
    source: 'The Conversation',
    url: 'https://theconversation.com',
    estimatedDuration: 5,
    description: 'Pourquoi l’équilibre de la terreur a transformé les relations internationales.',
  },
  {
    id: 'context',
    type: 'educational',
    title: 'Le contexte : un monde coupé en deux',
    source: 'Erudix',
    url: '#',
    estimatedDuration: 2,
    description: '1945, la fin de la Seconde Guerre mondiale et la naissance de deux blocs rivaux.',
  },
  {
    id: 'reflection',
    type: 'article',
    title: 'Une question pour aller plus loin',
    source: 'Erudix',
    url: '#',
    estimatedDuration: 3,
    description: 'Que révèle la crise de Cuba sur notre manière de gérer les crises internationales aujourd’hui ?',
  },
];

export function generateLearningSession(preferences: UserPreferences, duration: number): LearningSession {
  const selectedResources =
    duration <= 5
      ? resources.slice(0, 1)
      : duration <= 10
        ? resources.slice(0, 2)
        : duration <= 15
          ? resources.slice(0, 3)
          : resources;

  return {
    id: crypto.randomUUID(),
    title: 'La crise de Cuba : 13 jours au bord de la guerre nucléaire',
    topic: 'Guerre froide · Cuba / USA / URSS',
    description:
      'Une session éditoriale pour comprendre comment une crise locale est devenue le moment le plus dangereux de la guerre froide.',
    estimatedDuration: selectedResources.reduce((sum, resource) => sum + resource.estimatedDuration, 0) + 2,
    resources: selectedResources,
    createdAt: new Date().toISOString(),
  };
}
