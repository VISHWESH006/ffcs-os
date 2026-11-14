import type { DemoSession, RegisteredCourse, AppScreen, ModalState, Course, Offering } from '../types';
import { clearAllData } from './persistence.ts';
import { getInitialSeatCounts, getCourseByCode } from '../data/demoData.ts';
import { detectSlotClashes } from './clashDetection.ts';
import { isValidSlot } from './slotMapping.ts';

// ============================================================
// State shape
// ============================================================
export interface AppState {
  session: DemoSession;
  registeredCourses: RegisteredCourse[];
  seatCounts: Record<string, number>;
  currentScreen: AppScreen;
  selectedCourse: Course | null;
  selectedOffering: Offering | null;
  modifyingCourseCode: string | null;
  modal: ModalState;
}

const defaultSession: DemoSession = {
  demoRegisterNumber: '',
  studentName: '',
  programme: '',
  branch: '',
  degree: '',
  loggedIn: false,
  registrationStarted: false,
  selectedRegistrationCategory: null,
};

export const initialState: AppState = {
  session: defaultSession,
  registeredCourses: [],
  seatCounts: {},
  currentScreen: 'home',
  selectedCourse: null,
  selectedOffering: null,
  modifyingCourseCode: null,
  modal: { type: null },
};

// ============================================================
// Actions
// ============================================================
export type Action =
  | { type: 'LOGIN'; payload: { registerNumber: string } }
  | { type: 'LOGOUT' }
  | { type: 'START_REGISTRATION' }
  | { type: 'SELECT_CATEGORY'; payload: string }
  | { type: 'NAVIGATE'; payload: AppScreen }
  | { type: 'SELECT_COURSE'; payload: Course }
  | { type: 'SELECT_OFFERING'; payload: Offering | null }
  | { type: 'REGISTER_COURSE'; payload: { course: Course; offering: Offering } }
  | { type: 'MODIFY_COURSE'; payload: string } // courseCode to modify
  | { type: 'UPDATE_SLOT'; payload: { courseCode: string; offering: Offering } }
  | { type: 'SET_MODAL'; payload: ModalState }
  | { type: 'CLOSE_MODAL' }
  | { type: 'RESET_DEMO' }
  | { type: 'HYDRATE'; payload: { session: DemoSession; registeredCourses: RegisteredCourse[]; seatCounts: Record<string, number> } };

function generateClassNo(): string {
  return 'BL' + (2024250100000 + Math.floor(Math.random() * 9000 + 1000)).toString();
}

// ============================================================
// Reducer
// ============================================================
export function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'LOGIN': {
      const session: DemoSession = {
        demoRegisterNumber: action.payload.registerNumber,
        studentName: 'DEMO STUDENT',
        programme: 'MAS',
        branch: 'Artificial Intelligence and Data Science',
        degree: 'MTECH',
        loggedIn: true,
        registrationStarted: false,
        selectedRegistrationCategory: null,
      };
      return { ...state, session, currentScreen: 'startRegistration' };
    }

    case 'LOGOUT':
      return {
        ...state,
        session: defaultSession,
        currentScreen: 'home',
        selectedCourse: null,
        selectedOffering: null,
        modifyingCourseCode: null,
      };

    case 'START_REGISTRATION': {
      return {
        ...state,
        session: { ...state.session, registrationStarted: true },
        currentScreen: 'registration',
      };
    }

    case 'SELECT_CATEGORY':
      return {
        ...state,
        session: { ...state.session, selectedRegistrationCategory: action.payload },
        currentScreen: 'courseList',
      };

    case 'NAVIGATE':
      return {
        ...state,
        currentScreen: action.payload,
        selectedCourse: action.payload === 'registration' ? null : state.selectedCourse,
        selectedOffering: null,
        modifyingCourseCode: action.payload === 'modifySlots' ? state.modifyingCourseCode : null,
      };

    case 'SELECT_COURSE':
      return {
        ...state,
        selectedCourse: action.payload,
        selectedOffering: null,
        currentScreen: 'offeringSelection',
      };

    case 'SELECT_OFFERING':
      return { ...state, selectedOffering: action.payload };

    case 'REGISTER_COURSE': {
      const course = getCourseByCode(action.payload.course?.courseCode);
      const offering = course?.offerings.find(item => item.offeringId === action.payload.offering?.offeringId);

      if (!course || !offering || offering.courseCode !== course.courseCode || !isValidSlot(offering.slot)) {
        return { ...state, modal: { type: 'error', title: 'Invalid offering', message: 'The selected course or offering is not available in this demo.' } };
      }

      // Check if already registered
      if (state.registeredCourses.some(rc => rc.courseCode === course.courseCode)) {
        return {
          ...state,
          modal: {
            type: 'error',
            title: 'Duplicate Registration',
            message: `Course ${course.courseCode} is already registered.`,
          },
        };
      }

      // Check seat availability
      const seats = state.seatCounts[offering.offeringId] ?? offering.availableSeats;
      if (seats !== null && seats <= 0) {
        return {
          ...state,
          modal: {
            type: 'error',
            title: 'No Seats Available',
            message: `The selected offering for ${course.courseCode} has no available seats.`,
          },
        };
      }

      // Check slot clashes
      const clashes = detectSlotClashes(offering.slot, state.registeredCourses);
      if (clashes.length > 0) {
        return {
          ...state,
          modal: {
            type: 'clashWarning',
            title: 'Slot Clash Detected',
            message: `Cannot register ${course.courseCode}. Slot ${offering.slot} clashes with existing registrations.`,
            clashDetails: clashes,
          },
        };
      }

      // Register
      const newRegistered: RegisteredCourse = {
        courseCode: course.courseCode,
        courseTitle: course.courseTitle,
        courseType: course.courseType,
        ltpj: course.ltpj,
        credits: course.credits,
        courseCategory: course.category,
        courseOption: 'Regular',
        classNo: generateClassNo(),
        slot: offering.slot,
        venue: offering.venue,
        faculty: offering.faculty,
        registrationStatus: 'Registered and Approved',
        selectedOfferingId: offering.offeringId,
        group: 'Freshers-PG',
      };

      const updatedSeats = seats === null ? state.seatCounts : { ...state.seatCounts, [offering.offeringId]: seats - 1 };

      return {
        ...state,
        registeredCourses: [...state.registeredCourses, newRegistered],
        seatCounts: updatedSeats,
        selectedOffering: null,
        modal: {
          type: 'success',
          title: 'Registration Successful',
          message: 'Selected Course Successfully Registered',
        },
      };
    }

    case 'MODIFY_COURSE':
      return {
        ...state,
        modifyingCourseCode: action.payload,
        currentScreen: 'modifyOfferingSelection',
      };

    case 'UPDATE_SLOT': {
      const { courseCode, offering } = action.payload;
      const course = getCourseByCode(courseCode);
      const validOffering = course?.offerings.find(item => item.offeringId === offering?.offeringId);
      if (!course || !validOffering || validOffering.courseCode !== courseCode || !isValidSlot(validOffering.slot)) {
        return { ...state, modal: { type: 'error', title: 'Invalid offering', message: 'The selected replacement is not available for this course.' } };
      }

      // Find current registration
      const currentIdx = state.registeredCourses.findIndex(rc => rc.courseCode === courseCode);
      if (currentIdx === -1) return state;
      const current = state.registeredCourses[currentIdx];

      // Check clashes excluding this course
      const clashes = detectSlotClashes(validOffering.slot, state.registeredCourses, courseCode);
      if (clashes.length > 0) {
        return {
          ...state,
          modal: {
            type: 'clashWarning',
            title: 'Slot Clash Detected',
            message: `Cannot modify to slot ${validOffering.slot}. It clashes with existing registrations.`,
            clashDetails: clashes,
          },
        };
      }

      // Update
      const updated = [...state.registeredCourses];
      const updatedSeats = { ...state.seatCounts };

      // Restore seat on old offering
      const oldOfferingId = current.selectedOfferingId;
      if (oldOfferingId && updatedSeats[oldOfferingId] !== undefined) {
        updatedSeats[oldOfferingId] = (updatedSeats[oldOfferingId] ?? 0) + 1;
      }

      // Deduct seat on new offering
      const newSeats = updatedSeats[validOffering.offeringId] ?? validOffering.availableSeats;
      if (newSeats !== null && newSeats <= 0) {
        return {
          ...state,
          modal: {
            type: 'error',
            title: 'No Seats Available',
            message: `The selected offering has no available seats.`,
          },
        };
      }
      if (newSeats !== null) updatedSeats[validOffering.offeringId] = newSeats - 1;

      updated[currentIdx] = {
        ...current,
        slot: validOffering.slot,
        venue: validOffering.venue,
        faculty: validOffering.faculty,
        selectedOfferingId: validOffering.offeringId,
      };

      return {
        ...state,
        registeredCourses: updated,
        seatCounts: updatedSeats,
        modifyingCourseCode: null,
        currentScreen: 'modifySlots',
        modal: {
          type: 'success',
          title: 'Modification Successful',
          message: 'Slot Modified Successfully',
        },
      };
    }

    case 'SET_MODAL':
      return { ...state, modal: action.payload };

    case 'CLOSE_MODAL':
      return { ...state, modal: { type: null } };

    case 'RESET_DEMO':
      clearAllData();
      return {
        ...initialState,
        seatCounts: getInitialSeatCounts(),
      };

    case 'HYDRATE':
      return {
        ...state,
        session: action.payload.session,
        registeredCourses: action.payload.registeredCourses,
        seatCounts: Object.keys(action.payload.seatCounts).length > 0
          ? action.payload.seatCounts
          : getInitialSeatCounts(),
        currentScreen: action.payload.session.loggedIn
          ? (action.payload.session.registrationStarted ? (action.payload.session.selectedRegistrationCategory ? 'courseList' : 'registration') : 'startRegistration')
          : 'home',
      };

    default:
      return state;
  }
}

