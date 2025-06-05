import { useWeekendsForm } from '@/components/hooks/useWeekendsForm';
import {
	formatDateNoTZ,
	getWeekStartIndex,
	parseDateNoTZ,
	WEEK_DAYS
} from '@/utils/calendar-utils';
import { HEADERS } from '@/utils/get-headers';
import { lazy, Suspense, useEffect, useState } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import { FaAnglesLeft, FaAnglesRight } from 'react-icons/fa6';
const CurrentMonthsDays = lazy(
	() => import('@/components/CurrentMonthsDays')
);
const OtherMonthDays = lazy(
	() => import('@/components/OtherMonthDays')
);

const Calendar = () => {
	const [currentDate, setCurrentDate] = useState(new Date());
	const [hoveredDate, setHoveredDate] = useState<string | null>(null);
	const [tooltipPosition, setTooltipPosition] = useState({
		x: 0,
		y: 0
	});
	const [holidays, setHolidays] = useState<HolidaysProps[]>([]);
	let hideTimeout: NodeJS.Timeout | null = null;
	const apiUrl = `${window.zettaSettingsData.api_url}`;
	const { weekends } = useWeekendsForm();
	const effectiveWeekends =
		weekends && weekends.length ? weekends : ['Friday', 'Saturday'];
	const weekStartIndex = getWeekStartIndex(effectiveWeekends);
	useEffect(() => {
		const fetchHolidays = async () => {
			try {
				const monthNames = [
					'January',
					'February',
					'March',
					'April',
					'May',
					'June',
					'July',
					'August',
					'September',
					'October',
					'November',
					'December'
				];
				const currentMonthIndex = currentDate.getMonth();
				const previousMonthIndex =
					currentMonthIndex === 0 ? 11 : currentMonthIndex - 1;
				const nextMonthIndex =
					currentMonthIndex === 11 ? 0 : currentMonthIndex + 1;
				const response = await fetch(
					`${apiUrl}hrm/holidays-monthly?months=${monthNames[previousMonthIndex]},${monthNames[currentMonthIndex]},${monthNames[nextMonthIndex]}`,
					{
						method: 'GET',
						headers: HEADERS,
						credentials: 'include'
					}
				);

				const data = await response.json();
				setHolidays(data || []);
			} catch (error) {
				console.error('Error fetching holidays:', error);
			}
		};

		fetchHolidays();
	}, [currentDate]);
	const getDaysInMonth = (date: Date) => {
		return new Date(
			date.getFullYear(),
			date.getMonth() + 1,
			0
		).getDate();
	};
	const getFirstDayOffset = (date: Date, weekStartIndex: number) => {
		const actualFirstDayIndex = new Date(
			date.getFullYear(),
			date.getMonth(),
			1
		).getDay();
		return (actualFirstDayIndex - weekStartIndex + 7) % 7;
	};
	const getHolidaysForDate = (dateString: string) => {
		const targetDate = parseDateNoTZ(dateString);
		return holidays.filter(holiday => {
			const holidayStart = parseDateNoTZ(holiday.start_date);
			const holidayEnd = parseDateNoTZ(holiday.end_date);
			return (
				holidayStart.getTime() <= targetDate.getTime() &&
				holidayEnd.getTime() >= targetDate.getTime()
			);
		});
	};
	const isWeekend = (dateString: string) => {
		const targetDate = parseDateNoTZ(dateString);
		const dayOfWeek = targetDate.toLocaleDateString('en-US', {
			weekday: 'long'
		});
		return effectiveWeekends.includes(dayOfWeek);
	};
	const navigateMonth = (direction: 'prev' | 'next') => {
		setCurrentDate(
			new Date(
				currentDate.setMonth(
					currentDate.getMonth() + (direction === 'next' ? 1 : -1)
				)
			)
		);
	};
	const handleMouseEnter = (e: React.MouseEvent, date: string) => {
		e.preventDefault();
		const holidaysOnDate = getHolidaysForDate(date);
		if (!holidaysOnDate.length) return;

		const rect = e.currentTarget.getBoundingClientRect();
		const calendarContainer = document.getElementById(
			'calendar-container'
		);
		if (!calendarContainer) return;

		const containerRect = calendarContainer.getBoundingClientRect();
		const tooltipWidth = 220;
		const tooltipHeight = 100;
		const padding = 8;

		let x = rect.left - containerRect.left;
		let y = rect.top - containerRect.top + rect.height + padding;
		if (x + tooltipWidth > containerRect.width)
			x = containerRect.width - tooltipWidth - padding;
		if (x < 0) x = padding;
		if (y + tooltipHeight > containerRect.height)
			y = rect.top - containerRect.top - tooltipHeight - padding;
		if (y < 0) y = padding;

		setTooltipPosition({ x, y });
		setHoveredDate(date);
	};
	const handleMouseLeave = () => {
		hideTimeout = setTimeout(() => {
			setHoveredDate(null);
		}, 200);
	};
	const renderCalendar = () => {
		const days = [];
		const daysInMonth = getDaysInMonth(currentDate);
		const firstDayOffset = getFirstDayOffset(
			currentDate,
			weekStartIndex
		);
		const prevMonth = new Date(
			currentDate.getFullYear(),
			currentDate.getMonth(),
			0
		);
		const daysInPrevMonth = getDaysInMonth(prevMonth);

		for (let i = firstDayOffset - 1; i >= 0; i--) {
			const day = daysInPrevMonth - i;
			const date = new Date(
				Date.UTC(
					currentDate.getFullYear(),
					currentDate.getMonth() - 1,
					day
				)
			);
			const dateStr = formatDateNoTZ(date);
			const holidaysOnDate = getHolidaysForDate(dateStr);
			const isHoliday = holidaysOnDate.length > 0;

			days.push(
				<OtherMonthDays
					key={`prev-${day}`}
					{...{
						isHoliday,
						handleMouseEnter,
						handleMouseLeave,
						day,
						dateStr,
						holidaysOnDate,
						isWeekend: isWeekend(dateStr)
					}}
				/>
			);
		}
		for (let day = 1; day <= daysInMonth; day++) {
			const date = new Date(
				Date.UTC(
					currentDate.getUTCFullYear(),
					currentDate.getUTCMonth(),
					day
				)
			);
			const dateStr = formatDateNoTZ(date);
			const holidaysOnDate = getHolidaysForDate(dateStr);
			const isHoliday = holidaysOnDate.length > 0;
			const isToday = formatDateNoTZ(new Date()) === dateStr;

			days.push(
				<CurrentMonthsDays
					key={day}
					{...{
						isHoliday,
						handleMouseEnter,
						handleMouseLeave,
						day,
						dateStr,
						holidaysOnDate,
						isToday,
						isWeekend: isWeekend(dateStr)
					}}
				/>
			);
		}

		return days;
	};
	const orderedWeekDays = [
		...WEEK_DAYS.slice(weekStartIndex),
		...WEEK_DAYS.slice(0, weekStartIndex)
	];

	return (
		<div className='h-auto w-auto py-8 no-scrollbar'>
			<div
				id='calendar-container'
				className='relative max-w-5xl h-fit mx-auto no-scrollbar'
			>
				<div className='relative rounded-xl shadow-lg overflow-hidden'>
					<div className='bg-gradient-to-r from-sky-500 to-sky-600 p-4'>
						<div className='flex items-center justify-between text-white'>
							<button
								onClick={() => navigateMonth('prev')}
								className='p-2 hover:bg-sky-700 rounded-lg transition-colors'
							>
								<FaAnglesLeft />
							</button>
							<div className='flex items-center space-x-2'>
								<FaCalendarAlt className='w-6 h-6' />
								<h2 className='text-lg text-white font-semibold'>
									{currentDate.toLocaleString('default', {
										month: 'long',
										year: 'numeric'
									})}
								</h2>
							</div>
							<button
								onClick={() => navigateMonth('next')}
								className='p-2 hover:bg-sky-700 rounded-lg transition-colors'
							>
								<FaAnglesRight />
							</button>
						</div>
					</div>
					<div className='p-4'>
						<div className='sm:hidden grid grid-cols-7 mb-4 text-sky-600'>
							{orderedWeekDays.map(day => (
								<div
									key={day}
									className='text-center text-sm font-semibold py-2 min-w-fit'
								>
									{day === 'Thursday'
										? day.slice(0, 5)
										: day.slice(0, 3)}
								</div>
							))}
						</div>
						<div className='hidden sm:grid grid-cols-7 mb-4 text-sky-600'>
							{orderedWeekDays.map(day => (
								<div
									key={day}
									className='text-center text-sm font-semibold py-2 min-w-[5rem]'
								>
									{day}
								</div>
							))}
						</div>
						<div className='grid grid-cols-7 gap-1'>
							{renderCalendar()}
						</div>
					</div>
				</div>
				<Suspense fallback={null}>
					{hoveredDate && (
						<div
							className='absolute rounded-lg shadow-xl p-4 w-80 h-auto min-h-fit border bg-gray-100 border-gray-200 z-50'
							style={{
								left: `${tooltipPosition.x}px`,
								top: `${tooltipPosition.y}px`,
								transition:
									'top 0.15s ease-in-out, left 0.15s ease-in-out'
							}}
							onMouseLeave={handleMouseLeave}
						>
							{getHolidaysForDate(hoveredDate).map(holiday => (
								<div key={holiday.id} className='mb-4 last:mb-0'>
									<h3 className='text-lg font-semibold text-gray-900 mb-2'>
										{holiday.holiday_name}
									</h3>
									<div className='space-y-2'>
										<div className='flex items-center justify-between text-sm'>
											<span className='text-gray-600'>Date:</span>
											<span className='font-medium'>
												{new Date(
													holiday.start_date
												).toLocaleDateString()}
												{holiday.start_date !== holiday.end_date &&
													` - ${new Date(
														holiday.end_date
													).toLocaleDateString()}`}
											</span>
										</div>
										<div className='flex items-center justify-between text-sm'>
											<span className='text-gray-600'>Type:</span>
											<span
												className={`px-2 py-1 rounded-full text-xs font-medium ${
													holiday.holiday_type === 'Govt Holiday'
														? 'bg-sky-100 text-sky-800'
														: 'bg-blue-100 text-blue-800'
												}`}
											>
												{holiday.holiday_type}
											</span>
										</div>
										<div className='flex items-center justify-between text-sm'>
											<span className='text-gray-600'>Status:</span>
											<span
												className={`px-2 py-1 rounded-full text-xs font-medium ${
													holiday.holiday_status === 'Approved'
														? 'bg-green-100 text-green-800'
														: holiday.holiday_status === 'Pending'
														? 'bg-yellow-100 text-yellow-800'
														: 'bg-sky-100 text-sky-800'
												}`}
											>
												{holiday.holiday_status}
											</span>
										</div>
										{holiday.description && (
											<div className='pt-2 border-t border-gray-100 mt-2'>
												<p className='text-sm text-gray-600'>
													{holiday.description}
												</p>
											</div>
										)}
									</div>
								</div>
							))}
							<span className='flex items-center justify-center text-red-600 uppercase text-xs font-bold w-full'>
								<span>Hover to close</span>
							</span>
						</div>
					)}
				</Suspense>
			</div>
		</div>
	);
};

export default Calendar;
