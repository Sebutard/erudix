import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Chip, Shell } from '../components/ui';
import { usePreferences } from '../context/PreferencesContext';
import { generateLearningSession } from '../services/recommendation';
import { storage } from '../services/storage';
import type { LearningResource, LearningSession } from '../types';

function ResourceCard({ resource }: { resource: LearningResource }) {
  return (
    <article className="resource">
      {resource.type === 'youtube' && (
        <div className="video-frame">
          <iframe
            src="https://www.youtube.com/embed/8mho1Rk4KJQ"
            title={resource.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      <p className="eyebrow">{resource.type.toUpperCase()} · {resource.estimatedDuration} MIN</p>
      <h2>{resource.title}</h2>
      <p className="source">{resource.source}</p>
      {resource.description && <p>{resource.description}</p>}
      {resource.url !== '#' && (
        <a href={resource.url} target="_blank" rel="noreferrer" className="text-link">
          Voir la source ↗
        </a>
      )}
    </article>
  );
}

export function Session() {
  const { id } = useParams<{ id: string }>();
  const { preferences } = usePreferences();
  const currentSession = storage.getSession();
  const [session, setSession] = useState<LearningSession | null>(currentSession && currentSession.id === id ? currentSession : null);
  const [duration, setDuration] = useState(preferences?.preferredSessionDuration ?? 15);

  const changeDuration = (value: number) => {
    if (!preferences) return;

    setDuration(value);
    const nextSession = generateLearningSession(preferences, value);
    storage.saveSession(nextSession);
    setSession(nextSession);
    window.history.replaceState({}, '', `/session/${nextSession.id}`);
  };

  if (!session) return null;

  return (
    <Shell>
      <section className="content session-page">
        <a href="/home" className="back-link">← Accueil</a>
        <p className="eyebrow">Session · {session.estimatedDuration} min</p>
        <h1>{session.title}</h1>
        <p className="topic">{session.topic}</p>
        <p className="bio">{session.description}</p>

        <div className="duration-box">
          <strong>J’ai :</strong>
          <div className="chips">
            {[5, 10, 15, 20, 30].map((value) => (
              <Chip key={value} selected={duration === value} onClick={() => changeDuration(value)}>
                {value} min
              </Chip>
            ))}
          </div>
        </div>

        {session.resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}

        <article className="summary-box">
          <h2>À retenir</h2>
          <p>
            Les crises historiques se comprennent rarement en un seul événement : elles sont le résultat de tensions,
            de décisions et de perceptions qui s’accumulent.
          </p>
        </article>

        <article className="question-box">
          <h2>Question finale</h2>
          <p>Quelles leçons de la crise de Cuba peuvent encore éclairer les crises internationales actuelles ?</p>
        </article>
      </section>
    </Shell>
  );
}
