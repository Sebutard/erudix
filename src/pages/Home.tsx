import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Chip, Shell } from '../components/ui';
import { usePreferences } from '../context/PreferencesContext';
import { generateLearningSession } from '../services/recommendation';
import { storage } from '../services/storage';

export function Home() {
  const navigate = useNavigate();
  const { preferences } = usePreferences();
  const [duration, setDuration] = useState(preferences?.preferredSessionDuration ?? 15);

  const startSession = () => {
    if (!preferences) return;

    const session = generateLearningSession(preferences, duration);
    storage.saveSession(session);
    navigate(`/session/${session.id}`);
  };

  const suggestions = useMemo(
    () => [
      'Comprendre la chute de l’Empire romain',
      'Pourquoi la Guerre froide a commencé',
      'Comment Napoléon a transformé l’Europe',
      'Les origines historiques du conflit israélo-palestinien',
      'La Révolution industrielle en 15 minutes',
    ],
    [],
  );

  return (
    <Shell>
      <section className="content">
        <p className="eyebrow">Erudix · aujourd’hui</p>
        <h1>Vous avez combien de temps ?</h1>

        <div className="chips">
          {[5, 10, 15, 20, 30].map((value) => (
            <Chip key={value} selected={duration === value} onClick={() => setDuration(value)}>
              {value} min
            </Chip>
          ))}
        </div>

        <Button onClick={startSession}>Commencer une session</Button>

        <div className="stacked-block">
          <h2>Pour vous</h2>
          <div className="suggestions">
            {suggestions.map((item) => (
              <article className="suggestion" key={item}>
                <span>{item}</span>
                <span aria-hidden="true">↗</span>
              </article>
            ))}
          </div>
        </div>

        <div className="stacked-block muted-block">
          <h2>Historique</h2>
          {storage.getHistory().length === 0 ? (
            <p className="muted">Aucune session enregistrée pour le moment.</p>
          ) : (
            storage.getHistory().slice(0, 3).map((item) => (
              <article className="history-item" key={item.id}>
                <h3>{item.title}</h3>
                <p>
                  {item.estimatedDuration} min · {new Date(item.createdAt).toLocaleDateString('fr-FR')}
                </p>
              </article>
            ))
          )}
        </div>
      </section>
    </Shell>
  );
}
