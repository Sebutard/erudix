import { createContext, useContext, useState, type ReactNode } from 'react';
import type { UserPreferences } from '../types'; import { storage } from '../services/storage';
const empty:UserPreferences={historicalPeriods:[],civilizations:[],personalities:[],regions:[],countries:[],preferredSessionDuration:15};
const C=createContext<{preferences:UserPreferences|null;update:(p:UserPreferences)=>void}>({preferences:null,update:()=>undefined});
export function PreferencesProvider({children}:{children:ReactNode}){const [preferences,setPreferences]=useState<UserPreferences|null>(storage.getPreferences()); const update=(p:UserPreferences)=>{setPreferences(p);storage.savePreferences(p);}; return <C.Provider value={{preferences,update}}>{children}</C.Provider>;}
export function usePreferences(){return useContext(C);} export { empty };
