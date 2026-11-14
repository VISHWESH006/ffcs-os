import { useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';
import { appReducer, initialState } from '../logic/appState';
import { AppContext } from './contextStore';
import {
  saveSession,
  loadSession,
  saveRegisteredCourses,
  loadRegisteredCourses,
  saveSeatCounts,
  loadSeatCounts,
  clearSession,
} from '../logic/persistence';
import { getInitialSeatCounts, getCourseByCode } from '../data/demoData';

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, {
    ...initialState,
    seatCounts: getInitialSeatCounts(),
  });

  // Hydrate from localStorage on mount
  useEffect(() => {
    const session = loadSession();
    const registeredCourses = loadRegisteredCourses();
    const seatCounts = loadSeatCounts();
    if (session) {
      dispatch({
        type: 'HYDRATE',
        payload: { session, registeredCourses, seatCounts },
      });
    }
  }, []);

  // Persist on change
  useEffect(() => {
    if (state.session.demoRegisterNumber) {
      saveSession(state.session);
    } else clearSession();
  }, [state.session]);

  useEffect(() => {
    saveRegisteredCourses(state.registeredCourses);
  }, [state.registeredCourses]);

  useEffect(() => {
    saveSeatCounts(state.seatCounts);
  }, [state.seatCounts]);

  const getEffectiveSeats = (offeringId: string, defaultSeats: number | null) => {
    return state.seatCounts[offeringId] ?? defaultSeats;
  };

  const getTotalRegisteredCredits = () => {
    return state.registeredCourses.reduce((sum, rc) => {
      const course = getCourseByCode(rc.courseCode);
      return sum + (course?.credits ?? rc.credits);
    }, 0);
  };

  const getTotalRegisteredCourses = () => state.registeredCourses.length;

  const isCourseRegistered = (courseCode: string) =>
    state.registeredCourses.some(rc => rc.courseCode === courseCode);

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        getEffectiveSeats,
        getTotalRegisteredCredits,
        getTotalRegisteredCourses,
        isCourseRegistered,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

