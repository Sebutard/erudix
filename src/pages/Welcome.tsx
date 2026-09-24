import { useNavigate } from 'react-router-dom';
import { Button, Shell } from '../components/ui';

export function Welcome() {
  const navigate = useNavigate();

  return (
    <Shell>
      <section className="hero">
        <p className="eyebrow">Bienvenue dans Erudix</p>
        <h1>Apprendre quelque chose d’intéressant, quand vous avez cinq minutes.</h1>
        <p className="lead">
          Des sessions éditoriales personnalisées pour mieux comprendre l’Histoire et le monde qui nous entoure.
        </p>
        <Button onClick={() => navigate('/onboarding/periods')}>Configurer mon expérience</Button>
      </section>
    </Shell>
  );
}
