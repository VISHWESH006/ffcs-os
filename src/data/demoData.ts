// ============================================================
// Demo Data — Realistic simulated course & offering data
// ============================================================
// This data is FICTIONAL and for demonstration purposes only.
// It does NOT represent actual VIT Bhopal course offerings.

import type { Course, RegistrationCategory, DemoConfig, Offering } from '../types';

export const DEMO_CONFIG: DemoConfig = {
  sessionHeading: 'FALL SEMESTER 2024-25 COURSE REGISTRATION (MCA/MTECH - FRESHERS)',
  registrationPeriod: '24-05-2024 06:00 PM to 26-05-2024 11:00 PM',
  maxCredits: 27,
  minCredits: 16,
};

export const REGISTRATION_CATEGORIES: RegistrationCategory[] = [
  { id: 'PC', label: 'Programme Core (PC)' },
  { id: 'UC', label: 'Natural Science, Humanities and Management (UC)' },
  { id: 'PE', label: 'Programme Elective (PE)' },
  { id: 'UCNSE', label: 'University Core - Natural Science Electives (UCNSE)' },
  { id: 'UCNSC', label: 'University Core - Natural Science Core (UCNSC)' },
  { id: 'UCHME', label: 'University Core - Humanities and Management Electives (UCHME)' },
  { id: 'UCBESC', label: 'University Core - Basic Engineering Sciences Core (UCBESC)' },
  { id: 'UCSDC', label: 'University Core - Skill Development Courses (UCSDC)' },
  { id: 'UCHSSMC', label: 'University Core - Humanities Social Science and Management Core (UCHSSMC)' },
  { id: 'UCPI', label: 'University Core - Project and Internships (UCPI)' },
  { id: 'UENSE', label: 'University Elective - Natural Science Electives (UENSE)' },
  { id: 'UEME', label: 'University Elective - Multidisciplinary Electives (UEME)' },
  { id: 'UEHSSME', label: 'University Elective - Humanities, Social Sciences and Management Electives (UEHSSME)' },
  { id: 'UEOE', label: 'University Elective - Open Electives (UEOE)' },
  { id: 'OE', label: 'Open Elective' },
  { id: 'NCC', label: 'Non Credit Course' },
  { id: 'BC', label: 'Bridge Course' },
  { id: 'RR', label: 'Re - Registration' },
];

// Helper to create unique offering IDs
let offeringCounter = 0;
function oid(): string {
  return `OFF_${++offeringCounter}`;
}

// ============================================================
// Programme Core (PC) courses — this is the main demo category
// ============================================================
const PC_COURSES: Course[] = [
  {
    courseCode: 'MCA1002',
    courseTitle: 'Problem Solving using Data structures and Algorithms',
    courseType: 'Lecture and Tutorial, practical hours only',
    ltpj: '0 0 0 0',
    credits: 4.0,
    category: 'PC',
    preRequisite: '',
    coRequisite: '',
    antiRequisite: '',
    offerings: [
      {
        offeringId: oid(), courseCode: 'MCA1002', slot: 'A14+E14+F14',
        venue: 'CR-032', faculty: 'DAOOD SALEEM - SCSE',
        availableSeats: 75, courseType: 'Lecture and Tutorial, practical hours only', courseCategory: 'PC',
      },
      {
        offeringId: oid(), courseCode: 'MCA1002', slot: 'A11+A12+A13',
        venue: 'CR-015', faculty: 'PRIYA SHARMA - SCSE',
        availableSeats: 50, courseType: 'Lecture and Tutorial, practical hours only', courseCategory: 'PC',
      },
      {
        offeringId: oid(), courseCode: 'MCA1002', slot: 'D11+D12+D13',
        venue: 'CR-020', faculty: 'RAHUL VERMA - SCSE',
        availableSeats: 0, courseType: 'Lecture and Tutorial, practical hours only', courseCategory: 'PC',
      },
    ],
  },
  {
    courseCode: 'MCA1003',
    courseTitle: 'Object Oriented Programming using Java',
    courseType: 'Lecture and Tutorial, practical hours only',
    ltpj: '0 0 0 0',
    credits: 4.0,
    category: 'PC',
    preRequisite: '',
    coRequisite: '',
    antiRequisite: '',
    offerings: [
      {
        offeringId: oid(), courseCode: 'MCA1003', slot: 'C13+D11+D12',
        venue: 'CR-010', faculty: 'JITENDRA - SCAI',
        availableSeats: 75, courseType: 'Lecture and Tutorial, practical hours only', courseCategory: 'PC',
      },
      {
        offeringId: oid(), courseCode: 'MCA1003', slot: 'B11+B12+B13',
        venue: 'CR-018', faculty: 'ANKIT KUMAR - SCSE',
        availableSeats: 60, courseType: 'Lecture and Tutorial, practical hours only', courseCategory: 'PC',
      },
      {
        offeringId: oid(), courseCode: 'MCA1003', slot: 'A21+A22+A23',
        venue: 'CR-024', faculty: 'SIMRAN KAUR - SCSE',
        availableSeats: null, courseType: 'Lecture and Tutorial, practical hours only', courseCategory: 'PC',
      },
    ],
  },
  {
    courseCode: 'MCA1004',
    courseTitle: 'Advanced Operating System',
    courseType: 'Lecture and Practical Hours Only',
    ltpj: '0 0 0 0',
    credits: 3.0,
    category: 'PC',
    preRequisite: '',
    coRequisite: '',
    antiRequisite: '',
    offerings: [
      {
        offeringId: oid(), courseCode: 'MCA1004', slot: 'A11+A12',
        venue: 'AB305', faculty: 'NF-1(SCSE) - SCSE',
        availableSeats: 75, courseType: 'Lecture and Practical Hours Only', courseCategory: 'PC',
      },
      {
        offeringId: oid(), courseCode: 'MCA1004', slot: 'D21+D22',
        venue: 'CR-013', faculty: 'NF-1(SCSE) - SCSE',
        availableSeats: 75, courseType: 'Lecture and Practical Hours Only', courseCategory: 'PC',
      },
    ],
  },
  {
    courseCode: 'MCA1005',
    courseTitle: 'Database Technologies',
    courseType: 'Lecture and Practical Hours Only',
    ltpj: '3 0 1 0',
    credits: 4.0,
    category: 'PC',
    preRequisite: '',
    coRequisite: '',
    antiRequisite: '',
    offerings: [
      {
        offeringId: oid(), courseCode: 'MCA1005', slot: 'A11+A12+A13',
        venue: 'CR-022', faculty: 'VIVEK - SCSE',
        availableSeats: 75, courseType: 'Lecture and Practical Hours Only', courseCategory: 'PC',
      },
      {
        offeringId: oid(), courseCode: 'MCA1005', slot: 'D11+D12+B14',
        venue: 'CR-027', faculty: 'VIVEK - SCSE',
        availableSeats: 75, courseType: 'Lecture and Practical Hours Only', courseCategory: 'PC',
      },
    ],
  },
  {
    courseCode: 'MCA2006',
    courseTitle: 'Data Communications And Networks',
    courseType: 'Lecture and Practical Hours Only',
    ltpj: '2 0 1 0',
    credits: 3.0,
    category: 'PC',
    preRequisite: '',
    coRequisite: '',
    antiRequisite: '',
    offerings: [
      {
        offeringId: oid(), courseCode: 'MCA2006', slot: 'E11+E12',
        venue: 'CR-009', faculty: 'SANJAY MISHRA - SCSE',
        availableSeats: 50, courseType: 'Lecture and Practical Hours Only', courseCategory: 'PC',
      },
      {
        offeringId: oid(), courseCode: 'MCA2006', slot: 'F11+F12',
        venue: 'CR-008', faculty: 'VIVEK - SCSE',
        availableSeats: 50, courseType: 'Lecture and Practical Hours Only', courseCategory: 'PC',
      },
    ],
  },
];

// ============================================================
// UCNSC courses
// ============================================================
const UCNSC_COURSES: Course[] = [
  {
    courseCode: 'MAT4001',
    courseTitle: 'Applied Mathematics and Statistical Methods',
    courseType: 'Lecture and Tutorial Hours Only',
    ltpj: '0 0 0 0',
    credits: 4.0,
    category: 'UCNSC',
    preRequisite: '',
    coRequisite: '',
    antiRequisite: '',
    offerings: [
      {
        offeringId: oid(), courseCode: 'MAT4001', slot: 'B11+B12+B13',
        venue: 'CR-022', faculty: 'ZAHEER KAREEM - SASL',
        availableSeats: 75, courseType: 'Lecture and Tutorial Hours Only', courseCategory: 'UCNSC',
      },
      {
        offeringId: oid(), courseCode: 'MAT4001', slot: 'E11+E12+E13',
        venue: 'CR-030', faculty: 'SUNIL KUMAR - SASL',
        availableSeats: 60, courseType: 'Lecture and Tutorial Hours Only', courseCategory: 'UCNSC',
      },
    ],
  },
];

// ============================================================
// UCHSSMC courses
// ============================================================
const UCHSSMC_COURSES: Course[] = [
  {
    courseCode: 'ENG5001',
    courseTitle: 'Introduction to Communication Skills',
    courseType: 'Lecture and Tutorial Hours Only',
    ltpj: '0 0 0 0',
    credits: 2.0,
    category: 'UCHSSMC',
    preRequisite: '',
    coRequisite: '',
    antiRequisite: '',
    offerings: [
      {
        offeringId: oid(), courseCode: 'ENG5001', slot: 'A22',
        venue: 'CR-005', faculty: 'RAJEEV SAXENA - SASL',
        availableSeats: 75, courseType: 'Lecture and Tutorial Hours Only', courseCategory: 'UCHSSMC',
      },
      {
        offeringId: oid(), courseCode: 'ENG5001', slot: 'D21',
        venue: 'CR-011', faculty: 'MEENA SINGH - SASL',
        availableSeats: 50, courseType: 'Lecture and Tutorial Hours Only', courseCategory: 'UCHSSMC',
      },
    ],
  },
];

// ============================================================
// UCPI courses (Project)
// ============================================================
const UCPI_COURSES: Course[] = [
  {
    courseCode: 'MAS5003',
    courseTitle: 'Research Oriented Project-I',
    courseType: 'PJ',
    ltpj: '0 0 0 2',
    credits: 2.0,
    category: 'UCPI',
    preRequisite: '',
    coRequisite: '',
    antiRequisite: '',
    offerings: [
      {
        offeringId: oid(), courseCode: 'MAS5003', slot: 'F11+F12',
        venue: 'CR-008', faculty: 'VIVEK - SCSE',
        availableSeats: 50, courseType: 'PJ', courseCategory: 'UCPI',
      },
    ],
  },
];

// ============================================================
// UCSDC courses
// ============================================================
const UCSDC_COURSES: Course[] = [
  {
    courseCode: 'SST5002',
    courseTitle: 'Soft Skills - II',
    courseType: 'Practical Hours Only',
    ltpj: '0 0 2 0',
    credits: 1.0,
    category: 'UCSDC',
    preRequisite: '',
    coRequisite: '',
    antiRequisite: '',
    offerings: [
      {
        offeringId: oid(), courseCode: 'SST5002', slot: 'E13',
        venue: 'CR-007', faculty: 'RAVI KUMAR - SASL',
        availableSeats: 40, courseType: 'Practical Hours Only', courseCategory: 'UCSDC',
      },
      {
        offeringId: oid(), courseCode: 'SST5002', slot: 'C11',
        venue: 'CR-002', faculty: 'NEHA GUPTA - SASL',
        availableSeats: 35, courseType: 'Practical Hours Only', courseCategory: 'UCSDC',
      },
    ],
  },
];

// ============================================================
// SST5001 under UCSDC
// ============================================================
const UCSDC_EXTRA: Course[] = [
  {
    courseCode: 'SST5001',
    courseTitle: 'Soft Skills - I',
    courseType: 'Practical Hours Only',
    ltpj: '0 0 2 0',
    credits: 1.0,
    category: 'UCSDC',
    preRequisite: '',
    coRequisite: '',
    antiRequisite: '',
    offerings: [
      {
        offeringId: oid(), courseCode: 'SST5001', slot: 'C11',
        venue: 'CR-002', faculty: 'NEHA GUPTA - SASL',
        availableSeats: 35, courseType: 'Practical Hours Only', courseCategory: 'UCSDC',
      },
    ],
  },
];

// ============================================================
// All courses aggregated
// ============================================================
export const ALL_COURSES: Course[] = [
  ...PC_COURSES,
  ...UCNSC_COURSES,
  ...UCHSSMC_COURSES,
  ...UCPI_COURSES,
  ...UCSDC_COURSES,
  ...UCSDC_EXTRA,
];

/**
 * Get courses for a specific category
 */
export function getCoursesByCategory(categoryId: string): Course[] {
  return ALL_COURSES.filter(c => c.category === categoryId);
}

/**
 * Get a specific course by code
 */
export function getCourseByCode(code: string): Course | undefined {
  return ALL_COURSES.find(c => c.courseCode === code);
}

/**
 * Get initial seat counts map (offeringId -> seats)
 */
export function getInitialSeatCounts(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const course of ALL_COURSES) {
    for (const off of course.offerings) {
      if (off.availableSeats !== null) counts[off.offeringId] = off.availableSeats;
    }
  }
  return counts;
}

/**
 * Get an offering by its ID across all courses
 */
export function getOfferingById(offeringId: string): Offering | undefined {
  for (const course of ALL_COURSES) {
    const off = course.offerings.find(o => o.offeringId === offeringId);
    if (off) return off;
  }
  return undefined;
}

