import { Navigate, Route, Routes } from 'react-router-dom';
import { PreferencesProvider, usePreferences } from './context/PreferencesContext';
import { Welcome } from './pages/Welcome';
import { Onboarding } from './pages/Onboarding';
import { Home } from './pages/Home';
import { Session } from './pages/Session';
import { History } from './pages/History';
import { Profile } from './pages/Profile';

function Entry() { const { preferences } = usePreferences(); return <Navigate to={preferences ? '/home' : '/'} replace />; }
export default function App() { return <PreferencesProvider><Routes><Route path="/" element={<Welcome />} /><Route path="/onboarding/:step" element={<Onboarding />} /><Route path="/home" element={<Home />} /><Route path="/session/:id" element={<Session />} /><Route path="/history" element={<History />} /><Route path="/profile" element={<Profile />} /><Route path="/entry" element={<Entry />} /><Route path="*" element={<Navigate to="/" replace />} /></Routes></PreferencesProvider>; }
