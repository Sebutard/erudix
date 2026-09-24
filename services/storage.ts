import AsyncStorage from '@react-native-async-storage/async-storage';
import type { LearningSession, UserPreferences } from '@/types';

const PREFS_KEY = 'erudix.preferences';
const SESSION_KEY = 'erudix.current-session';
const HISTORY_KEY = 'erudix.history';

export const storage = {
  async getPreferences(): Promise<UserPreferences | null> {
    const raw = await AsyncStorage.getItem(PREFS_KEY);
    return raw ? (JSON.parse(raw) as UserPreferences) : null;
  },

  async savePreferences(value: UserPreferences): Promise<void> {
    await AsyncStorage.setItem(PREFS_KEY, JSON.stringify(value));
  },

  async saveSession(value: LearningSession): Promise<void> {
    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(value));
    const history = await this.getHistory();
    const nextHistory = [value, ...history.filter((item) => item.id !== value.id)].slice(0, 10);
    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(nextHistory));
  },

  async getSession(): Promise<LearningSession | null> {
    const raw = await AsyncStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as LearningSession) : null;
  },

  async getHistory(): Promise<LearningSession[]> {
    const raw = await AsyncStorage.getItem(HISTORY_KEY);
    return raw ? (JSON.parse(raw) as LearningSession[]) : [];
  },
};
