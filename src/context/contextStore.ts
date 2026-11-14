import { createContext, useContext } from 'react';
import type { Dispatch } from 'react';
import type { AppState, Action } from '../logic/appState';

interface AppContextType {
  state: AppState;
  dispatch: Dispatch<Action>;
  getEffectiveSeats: (offeringId: string, defaultSeats: number | null) => number | null;
  getTotalRegisteredCredits: () => number;
  getTotalRegisteredCourses: () => number;
  isCourseRegistered: (courseCode: string) => boolean;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export function useApp(): AppContextType {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
