import assert from 'node:assert/strict';
import test from 'node:test';
import { initialState, appReducer } from '../src/logic/appState.ts';
import { ALL_COURSES, getCourseByCode, getInitialSeatCounts, getCoursesByCategory } from '../src/data/demoData.ts';
import { expandSlot, isValidSlot, SLOT_MAPPING, TIMETABLE_GRID, DAYS } from '../src/logic/slotMapping.ts';
import { detectSlotClashes } from '../src/logic/clashDetection.ts';
import { generateTimetable, formatCellText } from '../src/logic/timetableGenerator.ts';
import { validateDemoLogin } from '../src/logic/demoLogin.ts';
import * as persistence from '../src/logic/persistence.ts';

function createState() {
  return { ...initialState, seatCounts: getInitialSeatCounts() };
}

function dispatch(state, action) {
  return appReducer(state, action);
}

function register(state, course, offering) {
  return dispatch(state, { type: 'REGISTER_COURSE', payload: { course, offering } });
}

function sampleStorage() {
  const entries = new Map();
  return {
    entries,
    setItem(key, value) { entries.set(String(key), String(value)); },
    getItem(key) { return entries.has(String(key)) ? entries.get(String(key)) : null; },
    removeItem(key) { entries.delete(String(key)); },
    clear() { entries.clear(); },
  };
}

function withStorage(storage, callback) {
  const previous = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');
  Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: storage });
  try { callback(); } finally {
    if (previous) Object.defineProperty(globalThis, 'localStorage', previous);
    else delete globalThis.localStorage;
  }
}

test('demo login accepts fictional details and validates captcha locally', () => {
  assert.equal(validateDemoLogin('', 'pw', '7K4P'), 'required-fields');
  assert.equal(validateDemoLogin('DEMO123', '', '7K4P'), 'required-fields');
  assert.equal(validateDemoLogin('DEMO123', 'pw', ''), 'required-fields');
  assert.equal(validateDemoLogin('DEMO123', 'pw', 'WRONG'), 'invalid-captcha');
  assert.equal(validateDemoLogin('DEMO123', 'pw', '7 k 4 p'), 'valid');
});

test('slot map has 42 periods, expands combined slots, and rejects unknown or duplicate slot codes', () => {
  assert.equal(Object.keys(SLOT_MAPPING).length, 42);
  assert.equal(DAYS.length, 6);
  assert.ok(DAYS.every(day => TIMETABLE_GRID[day].length === 7));
  assert.ok(DAYS.every(day => TIMETABLE_GRID[day].every(slot => slot in SLOT_MAPPING)));
  assert.deepEqual(expandSlot('A11 + A12 + A13'), ['A11', 'A12', 'A13']);
  assert.deepEqual(expandSlot('A11+A11+UNKNOWN'), ['A11']);
  assert.equal(isValidSlot('A11+A12+A13'), true);
  assert.equal(isValidSlot('A11++A12'), false);
  assert.equal(isValidSlot('A11+UNKNOWN'), false);
  assert.equal(isValidSlot('A11+A11'), false);
  assert.equal(isValidSlot('Lunch'), false);
  assert.equal(isValidSlot(undefined), false);
  assert.deepEqual(expandSlot(undefined), []);
});

test('expanded synthetic catalogue has unique records, valid atomic slots, and seat coverage', () => {
  const codes = ALL_COURSES.map(course => course.courseCode);
  const offerings = ALL_COURSES.flatMap(course => course.offerings);
  const offeringIds = offerings.map(offering => offering.offeringId);
  const distinctFaculty = new Set(offerings.map(offering => offering.faculty));
  const distinctSlots = new Set(offerings.map(offering => offering.slot));

  assert.equal(new Set(codes).size, codes.length);
  assert.equal(new Set(offeringIds).size, offeringIds.length);
  assert.equal(ALL_COURSES.length, 25);
  assert.equal(offerings.length, 140);
  assert.ok(offerings.every(offering => codes.includes(offering.courseCode)));
  assert.ok(offerings.every(offering => isValidSlot(offering.slot)));
  assert.ok(offerings.every(offering => expandSlot(offering.slot).join('+') === offering.slot));
  assert.ok(distinctFaculty.size >= 40);
  assert.ok(distinctSlots.size >= 20);

  assert.ok(offerings.some(offering => offering.availableSeats === 0));
  assert.ok(offerings.some(offering => offering.availableSeats === null));
  assert.ok(offerings.some(offering => offering.availableSeats >= 40));
  assert.ok(offerings.some(offering => offering.availableSeats >= 15 && offering.availableSeats <= 39));
  assert.ok(offerings.some(offering => offering.availableSeats >= 1 && offering.availableSeats <= 14));

  const syntheticCourse = getCourseByCode('CSE7001');
  assert.equal(syntheticCourse.offerings[0].slot, syntheticCourse.offerings[7].slot);
  assert.notEqual(syntheticCourse.offerings[0].faculty, syntheticCourse.offerings[7].faculty);
  assert.notEqual(syntheticCourse.offerings[0].venue, syntheticCourse.offerings[7].venue);
  assert.equal(syntheticCourse.offerings[0].faculty, syntheticCourse.offerings[4].faculty);
  assert.notEqual(syntheticCourse.offerings[0].slot, syntheticCourse.offerings[4].slot);
  assert.ok(offerings.every(offering => !('clashStatus' in offering) && !('clashes' in offering)));
});

test('registration, full seats, clashes, modification, duplicate guards, and timetable agree', () => {
  const mca1005 = getCourseByCode('MCA1005');
  const mca1002 = getCourseByCode('MCA1002');
  let state = createState();
  state = dispatch(state, { type: 'LOGIN', payload: { registerNumber: 'DEMO123' } });
  state = dispatch(state, { type: 'START_REGISTRATION' });
  state = dispatch(state, { type: 'SELECT_CATEGORY', payload: 'PC' });
  assert.equal(state.currentScreen, 'courseList');

  const fullOffering = mca1002.offerings.find(offering => offering.availableSeats === 0);
  state = register(state, mca1002, fullOffering);
  assert.equal(state.modal.title, 'No Seats Available');
  assert.equal(state.registeredCourses.length, 0);
  assert.equal(state.seatCounts[fullOffering.offeringId], 0);

  const firstOffering = mca1005.offerings[0];
  const originalSeats = state.seatCounts[firstOffering.offeringId];
  state = register(state, mca1005, firstOffering);
  assert.equal(state.registeredCourses.length, 1);
  assert.equal(state.seatCounts[firstOffering.offeringId], originalSeats - 1);

  const conflictingOffering = mca1002.offerings.find(offering => offering.slot === 'A11+A12+A13');
  const conflictSeats = state.seatCounts[conflictingOffering.offeringId];
  state = register(state, mca1002, conflictingOffering);
  assert.equal(state.modal.type, 'clashWarning');
  assert.equal(state.modal.clashDetails[0].conflictingCourseCode, 'MCA1005');
  assert.equal(state.registeredCourses.length, 1);
  assert.equal(state.seatCounts[conflictingOffering.offeringId], conflictSeats);

  const replacement = mca1005.offerings.find(offering => offering.slot === 'D11+D12+B14');
  state = dispatch(state, { type: 'MODIFY_COURSE', payload: 'MCA1005' });
  state = dispatch(state, { type: 'UPDATE_SLOT', payload: { courseCode: 'MCA1005', offering: replacement } });
  assert.equal(state.registeredCourses[0].slot, replacement.slot);
  assert.equal(state.seatCounts[firstOffering.offeringId], originalSeats);
  assert.equal(state.seatCounts[replacement.offeringId], replacement.availableSeats - 1);

  const seatsBeforeSameSlot = { ...state.seatCounts };
  state = dispatch(state, { type: 'UPDATE_SLOT', payload: { courseCode: 'MCA1005', offering: replacement } });
  assert.deepEqual(state.seatCounts, seatsBeforeSameSlot);

  state = register(state, mca1002, conflictingOffering);
  assert.equal(state.registeredCourses.length, 2);
  assert.equal(state.seatCounts[conflictingOffering.offeringId], conflictSeats - 1);
  const currentReplacementSeats = state.seatCounts[replacement.offeringId];
  state = dispatch(state, { type: 'UPDATE_SLOT', payload: { courseCode: 'MCA1005', offering: firstOffering } });
  assert.equal(state.modal.type, 'clashWarning');
  assert.equal(state.registeredCourses.find(course => course.courseCode === 'MCA1005').slot, replacement.slot);
  assert.equal(state.seatCounts[replacement.offeringId], currentReplacementSeats);

  const beforeDuplicate = state.seatCounts[conflictingOffering.offeringId];
  state = register(state, mca1002, mca1002.offerings[0]);
  assert.equal(state.modal.title, 'Duplicate Registration');
  assert.equal(state.registeredCourses.length, 2);
  assert.equal(state.seatCounts[conflictingOffering.offeringId], beforeDuplicate);
  assert.equal(detectSlotClashes(replacement.slot, state.registeredCourses, 'MCA1005').length, 0);

  const timetable = generateTimetable(state.registeredCourses);
  assert.equal(timetable.length, 6);
  assert.ok(timetable.every(row => row.cells.length === 7));
  assert.equal(timetable.flatMap(row => row.cells).filter(cell => cell.occupied).length, 6);
  assert.ok(timetable.flatMap(row => row.cells).some(cell => cell.courseCode === 'MCA1002'));
  assert.match(formatCellText(timetable.flatMap(row => row.cells).find(cell => cell.courseCode === 'MCA1005')), /-LP-/);
});

test('invalid courses and offering IDs are rejected without changing registrations or seats', () => {
  let state = createState();
  const course = getCourseByCode('MCA1005');
  state = register(state, course, { ...course.offerings[0], offeringId: 'OFF_FAKE' });
  assert.equal(state.modal.title, 'Invalid offering');
  assert.equal(state.registeredCourses.length, 0);
  assert.deepEqual(state.seatCounts, getInitialSeatCounts());

  state = register(state, null, null);
  assert.equal(state.modal.title, 'Invalid offering');
  assert.equal(state.registeredCourses.length, 0);

  state = register(state, course, course.offerings[0]);
  const registered = state.registeredCourses[0];
  const seats = { ...state.seatCounts };
  state = dispatch(state, { type: 'UPDATE_SLOT', payload: { courseCode: registered.courseCode, offering: { ...course.offerings[1], offeringId: 'OFF_UNKNOWN' } } });
  assert.equal(state.modal.title, 'Invalid offering');
  assert.equal(state.registeredCourses[0].slot, course.offerings[0].slot);
  assert.deepEqual(state.seatCounts, seats);
});

test('unknown seats are displayed as unknown and are not invented or decremented', () => {
  const course = getCourseByCode('MCA1003');
  const offering = course.offerings.find(item => item.availableSeats === null);
  let state = createState();
  assert.equal(state.seatCounts[offering.offeringId], undefined);
  state = register(state, course, offering);
  assert.equal(state.registeredCourses.length, 1);
  assert.equal(state.seatCounts[offering.offeringId], undefined);
});

test('timetable exposes duplicate atomic periods and safely ignores invalid persisted slots', () => {
  const base = getCourseByCode('MCA1005');
  const a = { courseCode: 'MCA1005', courseTitle: base.courseTitle, courseType: base.courseType, slot: 'A11+A12+A13', venue: 'R1', faculty: 'F1' };
  const b = { ...a, courseCode: 'MCA1004', slot: 'A11+B11', venue: 'R2', faculty: 'F2' };
  const invalid = { ...a, courseCode: 'BAD', slot: 'UNKNOWN' };
  const timetable = generateTimetable([a, b, invalid]);
  const mondayFirstPeriod = timetable.find(row => row.day === 'MON').cells[0];
  assert.deepEqual(mondayFirstPeriod.conflictCourseCodes, ['MCA1005', 'MCA1004']);
  assert.equal(timetable.flatMap(row => row.cells).some(cell => cell.courseCode === 'BAD'), false);
});

test('persistence handles refresh hydration, malformed values, versioning, reset scope, and disabled storage', () => {
  const storage = sampleStorage();
  const course = getCourseByCode('MCA1005');
  let state = register(createState(), course, course.offerings[0]);
  const session = { demoRegisterNumber: 'DEMO123', studentName: 'DEMO STUDENT', programme: 'MAS', branch: 'Demo branch', degree: 'MTECH', loggedIn: true, registrationStarted: true, selectedRegistrationCategory: 'PC' };

  withStorage(storage, () => {
    persistence.saveSession(session);
    persistence.saveRegisteredCourses(state.registeredCourses);
    persistence.saveSeatCounts(state.seatCounts);
    const storedSession = JSON.parse(storage.getItem('vtop_ffcs_session'));
    assert.equal(storedSession.demoRegisterNumber, 'DEMO-SESSION');
    assert.equal('password' in storedSession, false);
    assert.equal('captcha' in storedSession, false);
    assert.equal(storage.getItem('vtop_ffcs_storage_version'), '1');
    assert.equal(persistence.loadSession().loggedIn, true);
    assert.equal(persistence.loadRegisteredCourses().length, 1);
    assert.equal(persistence.loadSeatCounts()[course.offerings[0].offeringId], course.offerings[0].availableSeats - 1);

    const restoredSession = persistence.loadSession();
    state = dispatch(createState(), { type: 'HYDRATE', payload: { session: restoredSession, registeredCourses: persistence.loadRegisteredCourses(), seatCounts: persistence.loadSeatCounts() } });
    assert.equal(state.currentScreen, 'courseList');
    assert.equal(state.registeredCourses.length, 1);

    storage.setItem('unrelated_app_key', 'keep');
    storage.setItem('vtop_ffcs_session', '{bad json');
    assert.equal(persistence.loadSession(), null);
    storage.setItem('vtop_ffcs_registered', '{bad json');
    assert.deepEqual(persistence.loadRegisteredCourses(), []);
    storage.setItem('vtop_ffcs_seats', JSON.stringify({ [course.offerings[0].offeringId]: -2, wrongId: 30 }));
    assert.deepEqual(persistence.loadSeatCounts(), {});

    storage.setItem('vtop_ffcs_storage_version', 'old-version');
    storage.setItem('vtop_ffcs_registered', '[]');
    assert.equal(persistence.loadRegisteredCourses().length, 0);
    assert.equal(storage.getItem('unrelated_app_key'), 'keep');

    state = dispatch(state, { type: 'RESET_DEMO' });
    assert.equal(state.currentScreen, 'home');
    assert.equal(state.registeredCourses.length, 0);
    assert.deepEqual(state.seatCounts, getInitialSeatCounts());
    assert.equal(storage.getItem('vtop_ffcs_session'), null);
    assert.equal(storage.getItem('vtop_ffcs_registered'), null);
    assert.equal(storage.getItem('vtop_ffcs_seats'), null);
    assert.equal(storage.getItem('unrelated_app_key'), 'keep');
  });

  const previous = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');
  Object.defineProperty(globalThis, 'localStorage', { configurable: true, get() { throw new Error('storage disabled'); } });
  try {
    assert.doesNotThrow(() => persistence.loadSession());
    assert.doesNotThrow(() => persistence.loadRegisteredCourses());
    assert.deepEqual(persistence.loadSeatCounts(), {});
    assert.doesNotThrow(() => persistence.saveSession(session));
    assert.doesNotThrow(() => persistence.clearAllData());
    assert.doesNotThrow(() => dispatch(createState(), { type: 'RESET_DEMO' }));
  } finally {
    if (previous) Object.defineProperty(globalThis, 'localStorage', previous);
    else delete globalThis.localStorage;
  }
});

test('configured categories may be empty and malformed seat data is bounded to known offerings', () => {
  assert.deepEqual(getCoursesByCategory('EMPTY-TEST-CATEGORY'), []);
  const ids = Object.keys(getInitialSeatCounts());
  assert.equal(ids.length, ALL_COURSES.reduce((count, course) => count + course.offerings.filter(offering => offering.availableSeats !== null).length, 0));
});
