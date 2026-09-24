import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { UserPreferences } from '@/types';
import { storage } from '@/services/storage';

interface PreferencesContextValue {
  preferences: UserPreferences | null;
  hydrated: boolean;
  savePreferences: (value: UserPreferences) => Promise<void>;
}

const PreferencesContext = createContext<PreferencesContextValue>({
  preferences: null,
  hydrated: false,
  savePreferences: async () => undefined,
});

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    async function bootstrap() {
      const saved = await storage.getPreferences();
      setPreferences(saved ?? null);
      setHydrated(true);
    }

    void bootstrap();
  }, []);

  const savePreferences = async (value: UserPreferences) => {
    setPreferences(value);
    await storage.savePreferences(value);
  };

  return (
    <PreferencesContext.Provider value={{ preferences, hydrated, savePreferences }}>
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  return useContext(PreferencesContext);
}
