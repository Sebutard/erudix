import { useEffect, useState } from 'react';
import type { UserPreferences } from '@/types';
import { storage } from '@/services/storage';

const defaultPreferences: UserPreferences = {
  historicalPeriods: [],
  civilizations: [],
  personalities: [],
  regions: [],
  countries: [],
  preferredSessionDuration: 15,
};

export function usePreferencesState() {
  const [value, setValue] = useState<UserPreferences>(defaultPreferences);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    async function load() {
      const saved = await storage.getPreferences();
      setValue(saved ?? defaultPreferences);
      setHydrated(true);
    }

    void load();
  }, []);

  return { value, setValue, hydrated };
}
