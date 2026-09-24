import type { LearningSession, UserPreferences } from '../types';

const PREFERENCES_KEY = 'erudix_preferences';
const HISTORY_KEY = 'erudix_history';
const SESSION_KEY = 'erudix_session';

export const storage = {
  getPreferences(): UserPreferences | null {
    const raw = localStorage.getItem(PREFERENCES_KEY);
    return raw ? (JSON.parse(raw) as UserPreferences) : null;
  },

  savePreferences(value: UserPreferences) {
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(value));
  },

  getHistory(): LearningSession[] {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? (JSON.parse(raw) as LearningSession[]) : [];
  },

  saveSession(value: LearningSession) {
    const nextHistory = [value, ...this.getHistory().filter((item) => item.id !== value.id)].slice(0, 20);
    localStorage.setItem(SESSION_KEY, JSON.stringify(value));
    localStorage.setItem(HISTORY_KEY, JSON.stringify(nextHistory));
  },

  getSession(): LearningSession | null {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as LearningSession) : null;
  },
};
