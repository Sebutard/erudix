# Erudix

MVP mobile-first d’apprentissage éditorial sur l’Histoire, construit avec Expo, React Native, TypeScript et Expo Router.

## Arborescence principale

- `app/` : routes Expo Router pour onboarding, accueil, session et profil.
- `components/` : composants UI réutilisables comme les chips, boutons, sélection de durée et layouts.
- `contexts/` : état global des préférences utilisateur.
- `hooks/` : logique de chargement/comportement local.
- `services/` : persistance locale, mock recommendation engine, historique et futur client Supabase.
- `types/` : contrats TypeScript partagés.
- `theme/` : tokens de design system (couleurs, spacing, radius).

## Démarrage rapide

```bash
npm install
npx expo start
```

Le MVP fonctionne en local via AsyncStorage. Pour préparer Supabase, ajoutez `EXPO_PUBLIC_SUPABASE_URL` et `EXPO_PUBLIC_SUPABASE_ANON_KEY` dans votre environnement.
