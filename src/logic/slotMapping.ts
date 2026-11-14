// ============================================================
// Official VIT Bhopal Slot Mapping
// ============================================================

export interface SlotInfo {
  day: string;
  startTime: string;
  endTime: string;
}

// Complete official slot mapping
export const SLOT_MAPPING: Record<string, SlotInfo> = {
  // Monday
  A11: { day: 'MON', startTime: '08:30', endTime: '10:00' },
  B11: { day: 'MON', startTime: '10:05', endTime: '11:35' },
  C11: { day: 'MON', startTime: '11:40', endTime: '13:10' },
  A21: { day: 'MON', startTime: '13:15', endTime: '14:45' },
  A14: { day: 'MON', startTime: '14:50', endTime: '16:20' },
  B21: { day: 'MON', startTime: '16:25', endTime: '17:55' },
  C21: { day: 'MON', startTime: '18:00', endTime: '19:30' },

  // Tuesday
  D11: { day: 'TUE', startTime: '08:30', endTime: '10:00' },
  E11: { day: 'TUE', startTime: '10:05', endTime: '11:35' },
  F11: { day: 'TUE', startTime: '11:40', endTime: '13:10' },
  D21: { day: 'TUE', startTime: '13:15', endTime: '14:45' },
  E14: { day: 'TUE', startTime: '14:50', endTime: '16:20' },
  E21: { day: 'TUE', startTime: '16:25', endTime: '17:55' },
  F21: { day: 'TUE', startTime: '18:00', endTime: '19:30' },

  // Wednesday
  A12: { day: 'WED', startTime: '08:30', endTime: '10:00' },
  B12: { day: 'WED', startTime: '10:05', endTime: '11:35' },
  C12: { day: 'WED', startTime: '11:40', endTime: '13:10' },
  A22: { day: 'WED', startTime: '13:15', endTime: '14:45' },
  B14: { day: 'WED', startTime: '14:50', endTime: '16:20' },
  B22: { day: 'WED', startTime: '16:25', endTime: '17:55' },
  A24: { day: 'WED', startTime: '18:00', endTime: '19:30' },

  // Thursday
  D12: { day: 'THU', startTime: '08:30', endTime: '10:00' },
  E12: { day: 'THU', startTime: '10:05', endTime: '11:35' },
  F12: { day: 'THU', startTime: '11:40', endTime: '13:10' },
  D22: { day: 'THU', startTime: '13:15', endTime: '14:45' },
  F14: { day: 'THU', startTime: '14:50', endTime: '16:20' },
  E22: { day: 'THU', startTime: '16:25', endTime: '17:55' },
  F22: { day: 'THU', startTime: '18:00', endTime: '19:30' },

  // Friday
  A13: { day: 'FRI', startTime: '08:30', endTime: '10:00' },
  B13: { day: 'FRI', startTime: '10:05', endTime: '11:35' },
  C13: { day: 'FRI', startTime: '11:40', endTime: '13:10' },
  A23: { day: 'FRI', startTime: '13:15', endTime: '14:45' },
  C14: { day: 'FRI', startTime: '14:50', endTime: '16:20' },
  B23: { day: 'FRI', startTime: '16:25', endTime: '17:55' },
  B24: { day: 'FRI', startTime: '18:00', endTime: '19:30' },

  // Saturday
  D13: { day: 'SAT', startTime: '08:30', endTime: '10:00' },
  E13: { day: 'SAT', startTime: '10:05', endTime: '11:35' },
  F13: { day: 'SAT', startTime: '11:40', endTime: '13:10' },
  D23: { day: 'SAT', startTime: '13:15', endTime: '14:45' },
  D14: { day: 'SAT', startTime: '14:50', endTime: '16:20' },
  D24: { day: 'SAT', startTime: '16:25', endTime: '17:55' },
  E23: { day: 'SAT', startTime: '18:00', endTime: '19:30' },
};

// Days in order for timetable
export const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'] as const;

// Time periods in order
export const TIME_PERIODS = [
  { start: '08:30', end: '10:00' },
  { start: '10:05', end: '11:35' },
  { start: '11:40', end: '13:10' },
  { start: '13:15', end: '14:45' },
  { start: '14:50', end: '16:20' },
  { start: '16:25', end: '17:55' },
  { start: '18:00', end: '19:30' },
] as const;

// Timetable grid: for each day, which slot code goes in each period
export const TIMETABLE_GRID: Record<string, string[]> = {
  MON: ['A11', 'B11', 'C11', 'A21', 'A14', 'B21', 'C21'],
  TUE: ['D11', 'E11', 'F11', 'D21', 'E14', 'E21', 'F21'],
  WED: ['A12', 'B12', 'C12', 'A22', 'B14', 'B22', 'A24'],
  THU: ['D12', 'E12', 'F12', 'D22', 'F14', 'E22', 'F22'],
  FRI: ['A13', 'B13', 'C13', 'A23', 'C14', 'B23', 'B24'],
  SAT: ['D13', 'E13', 'F13', 'D23', 'D14', 'D24', 'E23'],
};

/**
 * Expand a combined slot string like "A11+A12+A13" into individual atomic slots
 */
export function expandSlot(slotString: string): string[] {
  if (typeof slotString !== 'string' || !slotString) return [];
  return [...new Set(slotString.split('+').map(s => s.trim()).filter(s => s in SLOT_MAPPING))];
}

export function isValidSlot(slotString: unknown): slotString is string {
  if (typeof slotString !== 'string' || !slotString.trim()) return false;
  const slots = slotString.split('+').map(slot => slot.trim());
  return slots.every(Boolean) && slots.every(slot => slot in SLOT_MAPPING) && new Set(slots).size === slots.length;
}

/**
 * Check if two slot strings conflict (share any atomic slot)
 */
export function slotsConflict(slot1: string, slot2: string): boolean {
  const atoms1 = expandSlot(slot1);
  const atoms2 = expandSlot(slot2);
  return atoms1.some(a => atoms2.includes(a));
}

