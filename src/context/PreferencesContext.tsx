import { createContext, useContext, useState, type ReactNode } from 'react';
import { storage } from '../services/storage';
import type { UserPreferences } from '../types';

const emptyPreferences: UserPreferences = {
  historicalPeriods: [],
  civilizations: [],
  personalities: [],
  regions: [],
  countries: [],
  preferredSessionDuration: 15,
};

interface PreferencesContextValue {
  preferences: UserPreferences | null;
  update: (value: UserPreferences) => void;
}

const PreferencesContext = createContext<PreferencesContextValue>({
  preferences: null,
  update: () => undefined,
});

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<UserPreferences | null>(() => storage.getPreferences());

  const update = (value: UserPreferences) => {
    setPreferences(value);
    storage.savePreferences(value);
  };

  return <PreferencesContext.Provider value={{ preferences, update }}>{children}</PreferencesContext.Provider>;
}

export function usePreferences() {
  return useContext(PreferencesContext);
}

export { emptyPreferences };
