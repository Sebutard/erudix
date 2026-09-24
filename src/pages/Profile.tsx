import { Shell } from '../components/ui';
import { usePreferences } from '../context/PreferencesContext';

export function Profile() {
  const { preferences } = usePreferences();

  return (
    <Shell>
      <section className="content">
        <p className="eyebrow">Votre profil</p>
        <h1>Vos préférences</h1>
        <p className="lead">Durée préférée : {preferences?.preferredSessionDuration ?? 15} minutes.</p>
        <p>
          Les préférences sont conservées dans votre navigateur pour cette première démo. Supabase pourra remplacer ce
          stockage local sans modifier la structure de l’application.
        </p>
      </section>
    </Shell>
  );
}
