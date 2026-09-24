import type { LearningSession, UserPreferences } from '../types';
const P='erudix_preferences', H='erudix_history', S='erudix_session';
export const storage={
 getPreferences:():UserPreferences|null=>JSON.parse(localStorage.getItem(P)||'null'),
 savePreferences:(p:UserPreferences)=>localStorage.setItem(P,JSON.stringify(p)),
 getHistory:():LearningSession[]=>JSON.parse(localStorage.getItem(H)||'[]'),
 saveSession:(s:LearningSession)=>{localStorage.setItem(S,JSON.stringify(s));localStorage.setItem(H,JSON.stringify([s,...storage.getHistory().filter(x=>x.id!==s.id)].slice(0,20)));},
 getSession:():LearningSession|null=>JSON.parse(localStorage.getItem(S)||'null')
};
