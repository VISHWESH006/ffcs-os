// ============================================================
// VTOP FFCS Registration - TypeScript Types
// ============================================================

export interface DemoSession {
  demoRegisterNumber: string;
  studentName: string;
  programme: string;
  branch: string;
  degree: string;
  loggedIn: boolean;
  registrationStarted: boolean;
  selectedRegistrationCategory: string | null;
}

export interface Course {
  courseCode: string;
  courseTitle: string;
  courseType: string;
  ltpj: string; // e.g. "2 1 0 0"
  credits: number;
  category: string;
  preRequisite: string;
  coRequisite: string;
  antiRequisite: string;
  offerings: Offering[];
}

export interface Offering {
  offeringId: string;
  courseCode: string;
  slot: string; // e.g. "A11+A12+A13" or "F11+F12"
  venue: string;
  faculty: string;
  availableSeats: number | null;
  courseType: string; // "Lecture and Tutorial Hours Only", etc.
  courseCategory: string;
}

export interface RegisteredCourse {
  courseCode: string;
  courseTitle: string;
  courseType: string;
  ltpj: string;
  credits: number;
  courseCategory: string;
  courseOption: string; // "Regular"
  classNo: string;
  slot: string;
  venue: string;
  faculty: string;
  registrationStatus: string; // "Registered and Approved"
  selectedOfferingId: string;
  group: string;
}

export interface SlotClash {
  conflictingCourseCode: string;
  conflictingCourseTitle: string;
  conflictingSlot: string;
  clashingAtomicSlots: string[];
}

export interface RegistrationCategory {
  id: string;
  label: string;
}

export interface DemoConfig {
  sessionHeading: string;
  registrationPeriod: string;
  maxCredits: number;
  minCredits: number;
}

export type AppScreen =
  | 'home'
  | 'login'
  | 'startRegistration'
  | 'registration' // main registration dashboard
  | 'courseList'
  | 'offeringSelection'
  | 'modifySlots'
  | 'modifyOfferingSelection'
  | 'registeredCourses';

export interface ModalState {
  type: 'success' | 'error' | 'clashWarning' | 'confirm' | null;
  title?: string;
  message?: string;
  clashDetails?: SlotClash[];
  onConfirm?: () => void;
  onCancel?: () => void;
}

