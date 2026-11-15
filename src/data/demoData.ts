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

// Synthetic extraction, clash, and timetable fixtures. These generated records
// are test data only and do not represent verified VIT Bhopal offerings.
const SYNTHETIC_FACULTY = [
  'SUCHISMITA PATRA', 'ARUNA J', 'DIP MUKHERJEE', 'HARISH CHANDRA', 'ENAGANDULA PRASAD',
  'DILEEP KUMAR', 'MAYANK SHARMA', 'DONDHU HARISH BABU', 'ANUPAM SEN', 'ANIL KUMAR SHUKLA',
  'PRASHANT KUMAR PANDEY', 'MUNIYAPPAN M', 'ANKIT FARKYA', 'DHARMALINGAMM', 'SANTOSH KUMAR BHAL',
  'SUPRIYA KUMAR PAUL', 'HEMANTA KALITA', 'THILAGAVATHI A', 'ANANT KANT SHUKLA', 'EZHILARASAN P',
  'GIRU P', 'SAURABH KUMAR MAURYA', 'AJAY KUMAR BHURJEE', 'SUMAN MAITI', 'ABHISHEK',
  'PRIYANKA', 'KUMAR ABHISHEK', 'ADNAN ABBASI', 'BUVANESWARI P R', 'MITHUN SINGH AHIRWAR',
  'TRAPTI SHARMA', 'JAY PRAKASH MAURYA', 'ABDUL RAHMAN', 'DEVENDRA KUMAR VEDI',
  'SHELENDRA KUMAR JAIN', 'MOHD RAFI LONE', 'R. SENTHILKUMAR', 'MOSES DIAN S', 'KOMARASAMY G',
  'PRAVINDRA SHEKHAR SHAKUNT', 'M. SURESH', 'ASHFAQ AHMAD NAJAR', 'VIKASH SHAW', 'DAWOOD SALEEM',
];

const SYNTHETIC_VENUES = [
  'AB02-415', 'AB02-417', 'AB-403', 'AB02-103', 'AB-415', 'AB-429', 'AB-420', 'AB-501',
  'AB02-419', 'AB02-324', 'AB-303', 'AB-331', 'AB-101', 'AB02-320', 'AB-128', 'AB02-423',
  'AB-431', 'AB-513', 'AB-502', 'AB-317', 'AB02-418', 'AB-503', 'AB-023', 'AR-102',
  'AB02-017', 'AB-230', 'AB02-019', 'CR-011', 'CR-015', 'AB-127', 'CR-003', 'CR-012',
  'AB-117', 'CR-007', 'CR-023', 'CR-013', 'CR-006', 'AB02-325', 'AB02-401', 'AB02-403',
  'AB02-301', 'AB02-404', 'AB02-316', 'AB02-402', 'AB02-306', 'AB02-409', 'AB02-408', 'AB02-414',
];

const TWO_PERIOD_SLOTS = [
  'A11+A12', 'A14+D11', 'A21+A22', 'A21+A23', 'A24+E21', 'B11+B12', 'B14+B23',
  'B14+D21', 'B21+E14', 'B21+E22', 'B22+B24', 'B22+F21', 'B23+D21', 'C11+C12',
  'D11+D12', 'E11+E12', 'F11+F12',
];

const THREE_PERIOD_SLOTS = [
  'A11+A12+A13', 'A14+D11+D12', 'A21+A22+A23', 'A24+E21+F22', 'B11+B12+B13',
  'B14+B23+D21', 'B21+E14+E22', 'B22+B24+F21', 'C11+C12+C13', 'C21+F11+F12',
];

const SYNTHETIC_COURSE_DEFINITIONS = [
  { courseCode: 'CSE7001', courseTitle: 'Data Structures and Algorithms', courseType: 'Lecture and Practical Hours Only', ltpj: '3 0 2 0', credits: 4 },
  { courseCode: 'CSE7002', courseTitle: 'Database Management Systems', courseType: 'Lecture and Practical Hours Only', ltpj: '3 0 2 0', credits: 4 },
  { courseCode: 'CSE7003', courseTitle: 'Operating Systems', courseType: 'Lecture and Practical Hours Only', ltpj: '3 0 2 0', credits: 4 },
  { courseCode: 'CSE7004', courseTitle: 'Computer Networks', courseType: 'Lecture and Practical Hours Only', ltpj: '3 0 2 0', credits: 4 },
  { courseCode: 'CSE7005', courseTitle: 'Computer Architecture', courseType: 'Theory', ltpj: '3 0 0 0', credits: 3 },
  { courseCode: 'MAT7001', courseTitle: 'Applied Mathematics', courseType: 'Lecture and Tutorial Hours Only', ltpj: '3 1 0 0', credits: 4 },
  { courseCode: 'MAT7002', courseTitle: 'Linear Algebra', courseType: 'Lecture and Tutorial Hours Only', ltpj: '3 1 0 0', credits: 4 },
  { courseCode: 'CSE7006', courseTitle: 'Artificial Intelligence', courseType: 'Lecture and Practical Hours Only', ltpj: '3 0 2 0', credits: 4 },
  { courseCode: 'CSE7007', courseTitle: 'Machine Learning', courseType: 'Lecture and Practical Hours Only', ltpj: '3 0 2 0', credits: 4 },
  { courseCode: 'CSE7008', courseTitle: 'Software Engineering', courseType: 'Theory', ltpj: '3 0 0 0', credits: 3 },
  { courseCode: 'CSE7009', courseTitle: 'Object-Oriented Programming', courseType: 'Lecture and Practical Hours Only', ltpj: '3 0 2 0', credits: 4 },
  { courseCode: 'CSE7010', courseTitle: 'Cloud Computing', courseType: 'Lecture and Practical Hours Only', ltpj: '3 0 2 0', credits: 4 },
  { courseCode: 'CSE7011', courseTitle: 'Cyber Security', courseType: 'Lecture and Practical Hours Only', ltpj: '3 0 2 0', credits: 4 },
  { courseCode: 'CSE7012', courseTitle: 'Data Science', courseType: 'Lecture and Practical Hours Only', ltpj: '3 0 2 0', credits: 4 },
  { courseCode: 'MAT7003', courseTitle: 'Discrete Mathematics', courseType: 'Lecture and Tutorial Hours Only', ltpj: '3 1 0 0', credits: 4 },
];

const SEAT_SCENARIOS: Array<number | null> = [75, 24, 8, 0, null, 46, 18, 5];

const SYNTHETIC_COURSES: Course[] = SYNTHETIC_COURSE_DEFINITIONS.map((definition, courseIndex) => {
  const slots = [
    TWO_PERIOD_SLOTS[courseIndex % TWO_PERIOD_SLOTS.length],
    THREE_PERIOD_SLOTS[courseIndex % THREE_PERIOD_SLOTS.length],
    TWO_PERIOD_SLOTS[(courseIndex + 1) % TWO_PERIOD_SLOTS.length],
    THREE_PERIOD_SLOTS[(courseIndex + 1) % THREE_PERIOD_SLOTS.length],
    TWO_PERIOD_SLOTS[(courseIndex + 4) % TWO_PERIOD_SLOTS.length],
    THREE_PERIOD_SLOTS[(courseIndex + 3) % THREE_PERIOD_SLOTS.length],
    TWO_PERIOD_SLOTS[(courseIndex + 6) % TWO_PERIOD_SLOTS.length],
    TWO_PERIOD_SLOTS[courseIndex % TWO_PERIOD_SLOTS.length],
  ];
  const offerings: Offering[] = slots.map((slot, offeringIndex) => ({
    offeringId: oid(),
    courseCode: definition.courseCode,
    slot,
    venue: SYNTHETIC_VENUES[(courseIndex * 13 + offeringIndex * 9) % SYNTHETIC_VENUES.length],
    faculty: SYNTHETIC_FACULTY[(courseIndex * 7 + offeringIndex * 11) % SYNTHETIC_FACULTY.length],
    availableSeats: SEAT_SCENARIOS[offeringIndex],
    courseType: definition.courseType,
    courseCategory: 'PC',
  }));

  return {
    ...definition,
    category: 'PC',
    preRequisite: '',
    coRequisite: '',
    antiRequisite: '',
    offerings,
  };
});

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
  ...SYNTHETIC_COURSES,
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

