import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Chip, Shell } from '../components/ui';
import { emptyPreferences, usePreferences } from '../context/PreferencesContext';
import type { StepId } from '../types';

const steps: StepId[] = ['periods', 'civilizations', 'personalities', 'geography', 'duration'];

const configByStep = {
  periods: {
    title: 'Quelles époques vous attirent ?',
    description: 'Choisissez plusieurs périodes.',
    items: ['Antiquité', 'Moyen Âge', 'Renaissance', 'XVIIe siècle', 'XVIIIe siècle', 'XIXe siècle', 'Première moitié du XXe siècle', 'Deuxième moitié du XXe siècle', 'XXIe siècle'],
    key: 'historicalPeriods',
  },
  civilizations: {
    title: 'Quels mondes voulez-vous explorer ?',
    description: 'Sélectionnez les sociétés et civilisations qui vous intéressent.',
    items: ['Empire romain', 'Grèce antique', 'Égypte ancienne', 'Empire ottoman', 'Civilisations précolombiennes', 'Chine impériale', 'Japon', 'Monde arabe', 'Europe médiévale', 'URSS', 'États-Unis', 'Amérique latine'],
    key: 'civilizations',
  },
  personalities: {
    title: 'Qui aimeriez-vous mieux connaître ?',
    description: 'Recherchez ou choisissez quelques personnalités.',
    items: ['Jules César', 'Cléopâtre', 'Napoléon', 'Simón Bolívar', 'Charles de Gaulle', 'Winston Churchill', 'Nelson Mandela', 'Marie Curie'],
    key: 'personalities',
  },
  geography: {
    title: 'Où l’Histoire vous emmène-t-elle ?',
    description: 'Choisissez des régions ou des pays pour donner le contexte géographique.',
    items: ['Europe', 'Afrique', 'Amérique du Nord', 'Amérique latine', 'Asie', 'Moyen-Orient', 'Océanie', 'France', 'États-Unis', 'Russie', 'Chine', 'Égypte', 'Israël / Palestine', 'Inde'],
    key: 'regions',
  },
} as const;

export function Onboarding() {
  const { step = 'periods' } = useParams<{ step: StepId }>();
  const navigate = useNavigate();
  const { preferences, update } = usePreferences();
  const current = preferences ?? emptyPreferences;
  const index = steps.indexOf(step);
  const [search, setSearch] = useState('');

  const currentConfig = step === 'duration' ? null : configByStep[step];

  const selectedItems = currentConfig
    ? current[currentConfig.key as keyof UserPreferences as 'historicalPeriods' | 'civilizations' | 'personalities' | 'regions' | 'countries']
    : [];

  const filteredItems = currentConfig
    ? currentConfig.items.filter((item) => item.toLowerCase().includes(search.toLowerCase()))
    : [];

  const toggleItem = (item: string) => {
    if (!currentConfig) return;

    const key = currentConfig.key as keyof UserPreferences;
    const currentValues = current[key] as string[];
    const nextValues = currentValues.includes(item)
      ? currentValues.filter((value) => value !== item)
      : [...currentValues, item];

    update({ ...current, [key]: nextValues });
  };

  const goNext = () => {
    const nextStep = steps[index + 1];
    if (nextStep) {
      navigate(`/onboarding/${nextStep}`);
      return;
    }
    navigate('/home');
  };

  return (
    <Shell>
      <section className="onboarding">
        <p className="eyebrow">{String(index + 1).padStart(2, '0')} / 05</p>

        {step === 'duration' ? (
          <>
            <h1>Combien de temps avez-vous généralement ?</h1>
            <p className="lead">Votre durée préférée guide la composition de chaque session.</p>
            <div className="chips">
              {[5, 10, 15, 20, 30].map((value) => (
                <Chip
                  key={value}
                  selected={current.preferredSessionDuration === value}
                  onClick={() => update({ ...current, preferredSessionDuration: value })}
                >
                  {value} min
                </Chip>
              ))}
            </div>
          </>
        ) : (
          <>
            <h1>{currentConfig.title}</h1>
            <p className="lead">{currentConfig.description}</p>

            {(step === 'personalities' || step === 'geography') && (
              <input
                className="input"
                type="text"
                placeholder="Rechercher..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            )}

            <div className="chips">
              {filteredItems.map((item) => (
                <Chip key={item} selected={selectedItems.includes(item)} onClick={() => toggleItem(item)}>
                  {item}
                </Chip>
              ))}
            </div>
          </>
        )}

        <Button onClick={goNext}>{step === 'duration' ? 'Découvrir Erudix' : 'Continuer'}</Button>
      </section>
    </Shell>
  );
}
