/**
 * Parse a date string (YYYY-MM-DD) as UTC midnight
 * so that there's no local TZ shift.
 */
export const parseDateNoTZ = (dateString: string): Date => {
	const [year, month, day] = dateString.split('-').map(Number);
	// Create date in UTC at 00:00 so that local time won't shift the day.
	return new Date(Date.UTC(year, month - 1, day));
};

/**
 * Return 'YYYY-MM-DD' for a Date object, always in UTC (no shift).
 */
export const formatDateNoTZ = (date: Date): string => {
	const year = date.getUTCFullYear();
	const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
	const day = date.getUTCDate().toString().padStart(2, '0');
	return `${year}-${month}-${day}`;
};

export const WEEK_DAYS = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday'
];

/**
 * Decide the start of the week dynamically based on weekends.
 * - If weekends are "Saturday & Sunday", assume Monday is the week start.
 * - If weekends are "Friday & Saturday", assume Sunday is the week start.
 * - Otherwise, default to Sunday.
 */
export const getWeekStartIndex = (weekends: string[]): number => {
	const weekendIndexes = weekends
		.map(day => WEEK_DAYS.indexOf(day))
		.sort((a, b) => a - b);

	const hasFriday = weekendIndexes.includes(5);
	const hasSaturday = weekendIndexes.includes(6);
	const hasSunday = weekendIndexes.includes(0);

	// Case: Saturday & Sunday → Week should start on Monday (1)
	if (hasSaturday && hasSunday) {
		return 1; // Monday
	}

	// Case: Friday & Saturday → Week should start on Sunday (0)
	if (hasFriday && hasSaturday) {
		return 0; // Sunday
	}

	// ✅ NEW: Case where ONLY Friday is a holiday → Week should start on Saturday (6)
	if (weekendIndexes.length === 1 && hasFriday) {
		return 6; // Saturday
	}

	// ✅ NEW: Case where ONLY Sunday is a holiday → Week should start on Monday (1)
	if (weekendIndexes.length === 1 && hasSunday) {
		return 1; // Monday
	}

	// Default: Start on Sunday (0)
	return 0;
};

