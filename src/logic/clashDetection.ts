// ============================================================
// Clash Detection Logic
// ============================================================

import type { RegisteredCourse, SlotClash } from '../types';
import { expandSlot, isValidSlot } from './slotMapping.ts';

/**
 * Check if an offering's slot conflicts with any registered course.
 * Optionally exclude a specific course code (for modification scenarios).
 */
export function detectSlotClashes(
  offeringSlot: string,
  registeredCourses: RegisteredCourse[],
  excludeCourseCode?: string
): SlotClash[] {
  const clashes: SlotClash[] = [];
  if (!isValidSlot(offeringSlot)) return clashes;
  const newAtomicSlots = expandSlot(offeringSlot);

  for (const rc of registeredCourses) {
    if (excludeCourseCode && rc.courseCode === excludeCourseCode) continue;

    if (!isValidSlot(rc.slot)) continue;
    const registeredAtomicSlots = expandSlot(rc.slot);
    const overlapping = newAtomicSlots.filter(s => registeredAtomicSlots.includes(s));

    if (overlapping.length > 0) {
      clashes.push({
        conflictingCourseCode: rc.courseCode,
        conflictingCourseTitle: rc.courseTitle,
        conflictingSlot: rc.slot,
        clashingAtomicSlots: overlapping,
      });
    }
  }

  return clashes;
}

/**
 * Get clash status text for display in offering table
 */
export function getClashStatusText(
  offeringSlot: string,
  registeredCourses: RegisteredCourse[],
  excludeCourseCode?: string
): string {
  const clashes = detectSlotClashes(offeringSlot, registeredCourses, excludeCourseCode);
  if (clashes.length === 0) return 'NONE';

  return clashes
    .map(c => `Clashed with ${c.clashingAtomicSlots.join('/ ')}`)
    .join('; ');
}

/**
 * Check if a specific offering's slot is the currently registered slot for a course
 */
export function isRegisteredSlot(
  offeringSlot: string,
  courseCode: string,
  registeredCourses: RegisteredCourse[]
): boolean {
  const rc = registeredCourses.find(r => r.courseCode === courseCode);
  if (!rc) return false;
  return rc.slot === offeringSlot;
}

