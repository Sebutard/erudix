import { Shell } from '../components/ui';
import { storage } from '../services/storage';

export function History() {
  const items = storage.getHistory();

  return (
    <Shell>
      <section className="content">
        <p className="eyebrow">Votre parcours</p>
        <h1>Historique</h1>

        {items.length === 0 ? (
          <p className="lead">Aucune session enregistrée pour le moment.</p>
        ) : (
          items.map((item) => (
            <article className="history-item" key={item.id}>
              <h2>{item.title}</h2>
              <p>
                {item.estimatedDuration} min · {new Date(item.createdAt).toLocaleDateString('fr-FR')}
              </p>
            </article>
          ))
        )}
      </section>
    </Shell>
  );
}
