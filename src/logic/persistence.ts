import type { DemoSession, RegisteredCourse } from '../types';
import { getInitialSeatCounts, getOfferingById } from '../data/demoData.ts';

const STORAGE_KEYS = {
  VERSION: 'vtop_ffcs_storage_version',
  SESSION: 'vtop_ffcs_session',
  REGISTERED_COURSES: 'vtop_ffcs_registered',
  SEAT_COUNTS: 'vtop_ffcs_seats',
} as const;
const STORAGE_VERSION = '1';
const DATA_KEYS = [STORAGE_KEYS.SESSION, STORAGE_KEYS.REGISTERED_COURSES, STORAGE_KEYS.SEAT_COUNTS] as const;

function getStorage(): Storage | null {
  try {
    return typeof localStorage === 'undefined' ? null : localStorage;
  } catch {
    return null;
  }
}

function prepareStorage(storage: Storage): boolean {
  try {
    const version = storage.getItem(STORAGE_KEYS.VERSION);
    if (version !== null && version !== STORAGE_VERSION) {
      for (const key of DATA_KEYS) storage.removeItem(key);
    }
    if (version !== STORAGE_VERSION) storage.setItem(STORAGE_KEYS.VERSION, STORAGE_VERSION);
    return true;
  } catch {
    return false;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function saveSession(session: DemoSession): void {
  const storage = getStorage();
  if (!storage || !prepareStorage(storage)) return;
  try {
    // Only demo identity/session fields are stored; password and captcha are never part of DemoSession.
    storage.setItem(STORAGE_KEYS.SESSION, JSON.stringify({ ...session, demoRegisterNumber: 'DEMO-SESSION' }));
  } catch {
    console.warn('Failed to save session to localStorage');
  }
}

export function clearSession(): void {
  const storage = getStorage();
  if (!storage) return;
  try {
    storage.removeItem(STORAGE_KEYS.SESSION);
  } catch {
    console.warn('Failed to clear demo session from localStorage');
  }
}

export function loadSession(): DemoSession | null {
  const storage = getStorage();
  if (!storage || !prepareStorage(storage)) return null;
  try {
    const raw = storage.getItem(STORAGE_KEYS.SESSION);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (!isRecord(parsed)) return null;
    if (typeof parsed.demoRegisterNumber !== 'string' || !parsed.demoRegisterNumber.trim()) return null;
    if (typeof parsed.studentName !== 'string' || typeof parsed.programme !== 'string' || typeof parsed.branch !== 'string' || typeof parsed.degree !== 'string') return null;
    if (typeof parsed.loggedIn !== 'boolean' || typeof parsed.registrationStarted !== 'boolean') return null;
    if (parsed.selectedRegistrationCategory !== null && typeof parsed.selectedRegistrationCategory !== 'string') return null;
    if (!parsed.loggedIn) return null;
    return parsed as unknown as DemoSession;
  } catch {
    return null;
  }
}

function isRegisteredCourse(value: unknown): value is RegisteredCourse {
  if (!isRecord(value)) return false;
  const offering = typeof value.selectedOfferingId === 'string' ? getOfferingById(value.selectedOfferingId) : undefined;
  return Boolean(
    offering && offering.courseCode === value.courseCode && offering.slot === value.slot &&
    offering.faculty === value.faculty && offering.venue === value.venue &&
    typeof value.courseCode === 'string' && typeof value.courseTitle === 'string' &&
    typeof value.courseType === 'string' && typeof value.ltpj === 'string' &&
    typeof value.credits === 'number' && Number.isFinite(value.credits) &&
    typeof value.courseCategory === 'string' && typeof value.courseOption === 'string' &&
    typeof value.classNo === 'string' && typeof value.slot === 'string' &&
    typeof value.venue === 'string' && typeof value.faculty === 'string' &&
    typeof value.registrationStatus === 'string' && typeof value.group === 'string'
  );
}

export function saveRegisteredCourses(courses: RegisteredCourse[]): void {
  const storage = getStorage();
  if (!storage || !prepareStorage(storage)) return;
  try {
    storage.setItem(STORAGE_KEYS.REGISTERED_COURSES, JSON.stringify(courses));
  } catch {
    console.warn('Failed to save registered courses to localStorage');
  }
}

export function loadRegisteredCourses(): RegisteredCourse[] {
  const storage = getStorage();
  if (!storage || !prepareStorage(storage)) return [];
  try {
    const raw = storage.getItem(STORAGE_KEYS.REGISTERED_COURSES);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isRegisteredCourse) : [];
  } catch {
    return [];
  }
}

export function saveSeatCounts(counts: Record<string, number>): void {
  const storage = getStorage();
  if (!storage || !prepareStorage(storage)) return;
  try {
    storage.setItem(STORAGE_KEYS.SEAT_COUNTS, JSON.stringify(counts));
  } catch {
    console.warn('Failed to save seat counts to localStorage');
  }
}

export function loadSeatCounts(): Record<string, number> {
  const storage = getStorage();
  if (!storage || !prepareStorage(storage)) return {};
  try {
    const raw = storage.getItem(STORAGE_KEYS.SEAT_COUNTS);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (!isRecord(parsed)) return {};
    const knownOfferingIds = getInitialSeatCounts();
    const counts: Record<string, number> = {};
    for (const [id, seats] of Object.entries(parsed)) {
      if (id in knownOfferingIds && typeof seats === 'number' && Number.isInteger(seats) && seats >= 0) counts[id] = seats;
    }
    return counts;
  } catch {
    return {};
  }
}

export function clearAllData(): void {
  const storage = getStorage();
  if (!storage) return;
  for (const key of [...DATA_KEYS, STORAGE_KEYS.VERSION]) {
    try {
      storage.removeItem(key);
    } catch {
      console.warn('Failed to clear all VTOP demo data from localStorage');
      return;
    }
  }
}
