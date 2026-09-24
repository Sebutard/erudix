# Erudix Web

Application web responsive mobile-first construite avec Vite, React, TypeScript et React Router.

## Arborescence

- `src/pages/` : Welcome, onboarding, Home, Session, History et Profile.
- `src/components/` : composants UI partagés (Shell, Button, Chip).
- `src/context/` : état global des préférences utilisateur.
- `src/services/` : localStorage et moteur de recommandation mocké.
- `src/types/` : modèles `UserPreferences`, `LearningResource` et `LearningSession`.
- `src/styles/` : design system CSS responsive mobile-first.

La future logique IA sera isolée dans `src/services/recommendation.ts`, qui pourra appeler une API backend sans modifier les pages.

## Lancer localement

```bash
npm install
npm run dev
```

Puis ouvrir l’URL affichée par Vite, généralement `http://localhost:5173`.

Le MVP utilise `localStorage`. Supabase pourra remplacer ce service pour l’authentification, les préférences et l’historique.
