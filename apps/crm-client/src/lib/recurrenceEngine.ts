import { addWeeks, addMonths } from 'date-fns';

export type RecurrenceFrequency = 'WEEKLY' | 'BIWEEKLY' | 'MONTHLY';

interface RecurrenceRule {
  frequency: RecurrenceFrequency;
  occurrences?: number; // Create X sessions
  endDate?: string; // OR create until date YYYY-MM-DD
}

/**
 * Generates an array of future dates based on a start date and a recurrence rule.
 * TITANIUM STANDARD: Pure function, zero side effects.
 *
 * @param startDateStr ISO Date string YYYY-MM-DD
 * @param rule Configuration for recurrence
 * @param maxLimit Safety cap to prevent infinite loops (Default 50 for Batch limit)
 * @returns Array of ISO Date strings
 */
export const generateRecurringDates = (
  startDateStr: string,
  rule: RecurrenceRule,
  maxLimit: number = 50,
): string[] => {
  const dates: string[] = [];
  const currentDate = new Date(startDateStr);

  // Safety: If invalid date, return empty to prevent crash
  if (isNaN(currentDate.getTime())) return [];

  // We start from the *next* occurrence, assuming the first one is created by the main form
  // BUT usually users expect the first one + repetitions.
  // The requirement says "Generate X future sessions".
  // Let's generate the *additional* dates.

  let loopDate = currentDate;
  let count = 0;

  // Determine loop condition
  // Priority: occurrences > endDate > default limit
  const targetCount = rule.occurrences || maxLimit;
  const targetDate = rule.endDate ? new Date(rule.endDate) : null;

  while (count < targetCount) {
    // Calculate next date based on frequency
    if (rule.frequency === 'WEEKLY') {
      loopDate = addWeeks(loopDate, 1);
    } else if (rule.frequency === 'BIWEEKLY') {
      loopDate = addWeeks(loopDate, 2);
    } else if (rule.frequency === 'MONTHLY') {
      loopDate = addMonths(loopDate, 1);
    }

    // Check Date Limit (if exists)
    if (targetDate && loopDate > targetDate) {
      break;
    }

    // Add to result
    dates.push(loopDate.toISOString().split('T')[0]);
    count++;

    // Hard Safety Break
    if (count >= maxLimit) break;
  }

  return dates;
};
