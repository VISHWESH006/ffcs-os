// ============================================================
// Timetable Generation Logic
// ============================================================

import type { RegisteredCourse } from '../types';
import { DAYS, TIME_PERIODS, TIMETABLE_GRID, expandSlot, isValidSlot } from './slotMapping.ts';

export interface TimetableCell {
  slotCode: string;
  courseCode?: string;
  courseType?: string;
  venue?: string;
  faculty?: string;
  occupied: boolean;
  conflictCourseCodes?: string[];
}

export interface TimetableRow {
  day: string;
  cells: TimetableCell[];
}

/**
 * Generate a complete timetable from registered courses
 */
export function generateTimetable(registeredCourses: RegisteredCourse[]): TimetableRow[] {
  // Build a map of atomic slot -> registered course
  const slotToCourses = new Map<string, RegisteredCourse[]>();
  for (const rc of registeredCourses) {
    if (!isValidSlot(rc.slot)) continue;
    const atomicSlots = expandSlot(rc.slot);
    for (const atomSlot of atomicSlots) {
      const matching = slotToCourses.get(atomSlot) ?? [];
      matching.push(rc);
      slotToCourses.set(atomSlot, matching);
    }
  }

  const rows: TimetableRow[] = [];

  for (const day of DAYS) {
    const slotCodes = TIMETABLE_GRID[day];
    const cells: TimetableCell[] = slotCodes.map(slotCode => {
      const matches = slotToCourses.get(slotCode) ?? [];
      const rc = matches[0];
      if (rc) {
        return {
          slotCode,
          courseCode: rc.courseCode,
          courseType: rc.courseType,
          venue: rc.venue,
          faculty: rc.faculty,
          occupied: true,
          ...(matches.length > 1 ? { conflictCourseCodes: matches.map(course => course.courseCode) } : {}),
        };
      }
      return {
        slotCode,
        occupied: false,
      };
    });

    rows.push({ day, cells });
  }

  return rows;
}

/**
 * Format cell display text like the reference: "A11-MCA1005-LP-CR-022"
 */
export function formatCellText(cell: TimetableCell): string {
  if (!cell.occupied || !cell.courseCode) return cell.slotCode;
  // Match the format: SlotCode-CourseCode-TypeAbbr-Venue
  const typeAbbr = getTypeAbbr(cell.courseType || '');
  return `${cell.slotCode}-${cell.courseCode}-${typeAbbr}-${cell.venue || ''}`;
}

function getTypeAbbr(courseType: string): string {
  const normalizedType = courseType.toLowerCase();
  if (normalizedType.includes('lecture') && normalizedType.includes('tutorial') && normalizedType.includes('practical')) return 'LTP';
  if (normalizedType.includes('lecture') && normalizedType.includes('practical')) return 'LP';
  if (normalizedType.includes('lecture') && normalizedType.includes('tutorial')) return 'LT';
  if (normalizedType.includes('practical')) return 'P';
  if (normalizedType.includes('project')) return 'PJ';
  if (normalizedType.includes('lecture')) return 'L';
  return 'LT';
}

export { DAYS, TIME_PERIODS, TIMETABLE_GRID };

